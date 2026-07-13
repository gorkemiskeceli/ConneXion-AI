import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { 
  useGetConversationsQuery,
  useCreateConversationMutation,
  useCreateMessageMutation
} from "../../../services/api";

export default function useSupport(role) {
  const currentUser = useSelector((state) => state.auth.user);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch conversations using RTK Query
  const { data: dbConversations = [] } = useGetConversationsQuery(undefined, {
    pollingInterval: 3000,
  });

  const [createConversation] = useCreateConversationMutation();
  const [createMessage] = useCreateMessageMutation();

  // 1. Filter to ONLY show conversations that are support tickets
  // and map them to the format the Support UI expects
  const rawTickets = useMemo(() => {
    return dbConversations
      .filter((c) => c.channel === "ticket")
      .map((c) => ({
        id: c.id,
        customer: c.name,
        subject: c.subject || c.preview || "Destek Talebi",
        status: c.status === "closed" ? "resolved" : c.status,
        priority: c.priority || "medium",
        category: c.category || "Genel",
        date: c.time || new Date().toLocaleDateString("tr-TR"),
        lastMessage: c.preview || "Talebiniz alındı.",
        tenantId: c.tenantId
      }));
  }, [dbConversations]);

  // 2. Filter tickets by role context so Acme Corp / TrendSoft admins only see their own tickets
  const roleFilteredTickets = useMemo(() => {
    if (!role || role === "platform_admin" || role === "support_agent") {
      return rawTickets;
    }
    if (role === "workspace_admin") {
      return rawTickets.filter((t) => t.customer.includes("Acme Corp"));
    }
    if (role === "manager") {
      return rawTickets.filter((t) => t.customer.includes("TrendSoft"));
    }
    // Also support standard tenant filtering if role context isn't one of the demo specific ones
    if (currentUser?.tenantId && currentUser.role !== "admin") {
      return rawTickets.filter((t) => t.tenantId === currentUser.tenantId);
    }
    return rawTickets;
  }, [rawTickets, role, currentUser]);

  const kpis = useMemo(() => {
    const total = roleFilteredTickets.length;
    const open = roleFilteredTickets.filter((t) => t.status === "open").length;
    const pending = roleFilteredTickets.filter((t) => t.status === "pending").length;
    const resolved = roleFilteredTickets.filter((t) => t.status === "resolved").length;
    return { total, open, pending, resolved };
  }, [roleFilteredTickets]);

  const filteredTickets = useMemo(() => {
    return roleFilteredTickets.filter((t) => {
      const custStr = t.customer || "";
      const subjStr = t.subject || "";
      const idStr = t.id || "";
      
      const matchesSearch =
        custStr.toLowerCase().includes(search.toLowerCase()) ||
        subjStr.toLowerCase().includes(search.toLowerCase()) ||
        idStr.toLowerCase().includes(search.toLowerCase());
      
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

  const handleCreateTicket = async (newTicket) => {
    const ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const dateStr = new Date().toLocaleDateString("tr-TR");
    
    // Autofill company name based on active tenant role context
    const customerName = defaultCompany || newTicket.customer || currentUser?.name || "Kullanıcı";
    
    const initialText = "Destek talebiniz başarıyla oluşturulmuştur. Destek ekibimiz en kısa sürede inceleyip dönüş sağlayacaktır.";

    try {
      // 1. Create the conversation in db.json
      await createConversation({
        id: ticketId,
        customerId: currentUser?.id || `cus_${Math.random().toString(36).substr(2, 9)}`,
        name: customerName,
        email: currentUser?.email || "user@example.com",
        subject: newTicket.subject,
        category: newTicket.category,
        preview: newTicket.lastMessage, // The user's initial message
        time: dateStr,
        unread: 1,
        status: "open",
        priority: newTicket.priority || "medium",
        channel: "ticket",
        assignedAgentId: "usr_005", // Default assignment
        aiSummary: "Kullanıcı yeni destek talebi oluşturdu.",
        aiSuggestions: [],
        tenantId: currentUser?.tenantId || "tnt_standard"
      }).unwrap();

      // 2. Post the user's initial message
      await createMessage({
        conversationId: ticketId,
        sender: "customer",
        text: newTicket.lastMessage,
        timestamp: `${dateStr} 10:00`,
        tenantId: currentUser?.tenantId || "tnt_standard"
      }).unwrap();

      // 3. Post the automated system reply
      await createMessage({
        conversationId: ticketId,
        sender: "agent",
        text: initialText,
        timestamp: `${dateStr} 10:01`,
        tenantId: currentUser?.tenantId || "tnt_standard"
      }).unwrap();
      
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to create support ticket", err);
    }
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
