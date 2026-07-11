import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTicket } from "../../../homepage/store/supportSlice";

export default function useSupport(role) {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.support.tickets);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter tickets by role context so Acme Corp / TrendSoft admins only see their own tickets
  const roleFilteredTickets = useMemo(() => {
    if (!role || role === "platform_admin" || role === "support_agent") {
      return tickets;
    }
    if (role === "workspace_admin") {
      return tickets.filter((t) => t.customer.includes("Acme Corp"));
    }
    if (role === "manager") {
      return tickets.filter((t) => t.customer.includes("TrendSoft"));
    }
    return [];
  }, [tickets, role]);

  const kpis = useMemo(() => {
    const total = roleFilteredTickets.length;
    const open = roleFilteredTickets.filter((t) => t.status === "open").length;
    const pending = roleFilteredTickets.filter((t) => t.status === "pending").length;
    const resolved = roleFilteredTickets.filter((t) => t.status === "resolved").length;
    return { total, open, pending, resolved };
  }, [roleFilteredTickets]);

  const filteredTickets = useMemo(() => {
    return roleFilteredTickets.filter((t) => {
      const matchesSearch =
        t.customer.toLowerCase().includes(search.toLowerCase()) ||
        t.subject.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus =
        statusFilter === "all" ? true : t.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [roleFilteredTickets, search, statusFilter]);

  const defaultCompany = useMemo(() => {
    if (role === "workspace_admin") return "Acme Corp";
    if (role === "manager") return "TrendSoft";
    return "";
  }, [role]);

  const handleCreateTicket = (newTicket) => {
    const ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const dateStr = new Date().toLocaleDateString("tr-TR");
    
    // Autofill company name based on active tenant role context
    const customerName = defaultCompany || newTicket.customer;

    dispatch(
      addTicket({
        id: ticketId,
        date: dateStr,
        status: "open",
        ...newTicket,
        customer: customerName,
      })
    );
    setIsModalOpen(false);
  };

  return {
    tickets: filteredTickets,
    kpis,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    isModalOpen,
    setIsModalOpen,
    onCreateTicket: handleCreateTicket,
    defaultCompany,
  };
}
