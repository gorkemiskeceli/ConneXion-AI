import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addMessageToTicket, updateTicketStatus } from "../../../homepage/store/supportSlice";

/**
 * useInbox — data + UI-state seam for the Inbox.
 */
export default function useInbox(role) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const ticketIdFromUrl = searchParams.get("id");

  // UI state (stays local even after data is wired).
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activeConversationId, setActiveConversationId] = useState(ticketIdFromUrl || null);

  // Sync state if URL changes
  useEffect(() => {
    if (ticketIdFromUrl) {
      setActiveConversationId(ticketIdFromUrl);
    }
  }, [ticketIdFromUrl]);

  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
    if (id) {
      setSearchParams({ id });
    } else {
      setSearchParams({});
    }
  };

  // Read support tickets from Redux
  const tickets = useSelector((state) => state.support.tickets);
  const currentUser = useSelector((state) => state.auth.user);

  // Filter tickets by active user role to prevent cross-workspace visibility
  const roleFilteredTickets = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === "admin") {
      return tickets;
    }
    // Non-admin (role !== "admin") users only see tickets matching their tenantId
    return tickets.filter((t) => t.tenantId === currentUser.tenantId);
  }, [tickets, currentUser]);

  // Map tickets to conversation format
  // { id, name, preview, time, unread, status, priority, channel }
  const ticketConversations = useMemo(() => {
    return roleFilteredTickets.map((t) => ({
      id: t.id,
      name: t.customer,
      preview: `${t.category}: ${t.subject}`,
      time: t.date,
      unread: t.status === "open" ? 1 : 0,
      status: t.status === "resolved" ? "closed" : t.status,
      priority: t.priority,
      channel: "ticket",
    }));
  }, [roleFilteredTickets]);

  // Combined conversations list
  const conversations = useMemo(() => {
    return ticketConversations.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.preview.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "closed"
          ? c.status === "closed"
          : filter === "pending"
          ? c.status === "pending"
          : c.status !== "closed"; // "mine" and "unassigned" fallback to open tickets

      return matchesSearch && matchesFilter;
    });
  }, [ticketConversations, search, filter]);

  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === activeConversationId) ?? null;
  }, [conversations, activeConversationId]);

  // Construct messages dynamically based on Redux ticket messages
  const messages = useMemo(() => {
    if (!activeConversation) return [];
    const ticketObj = tickets.find((t) => t.id === activeConversation.id);
    if (!ticketObj) return [];
    
    return ticketObj.messages || [
      {
        id: `msg-${activeConversation.id}-init`,
        sender: "customer",
        type: "text",
        text: ticketObj.lastMessage,
        timestamp: `${ticketObj.date} 10:00`,
      }
    ];
  }, [activeConversation, tickets]);

  const customer = useMemo(() => {
    if (!activeConversation) return null;
    const ticketObj = tickets.find((t) => t.id === activeConversation.id);
    if (!ticketObj) return null;
    return {
      name: activeConversation.name,
      email: `${normalizeEmailName(activeConversation.name)}@customer.com`,
      phone: "+90 555 123 45 67",
      location: "İstanbul, TR",
      since: activeConversation.time,
      tags: ["Teknik Destek", activeConversation.priority.toUpperCase()],
    };
  }, [activeConversation, tickets]);

  function normalizeEmailName(name) {
    return name
      .toLowerCase()
      .replace(/ı/g, "i")
      .replace(/ş/g, "s")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/\s+/g, "")
      .replace(/[^\w]/g, "");
  }

  const handleSendMessage = (text) => {
    if (!activeConversationId) return;
    
    // Support Agent writes as "agent". Platform/Workspace Admins write as "customer" (ticket creator).
    const sender = role === "support_agent" ? "agent" : "customer";

    dispatch(
      addMessageToTicket({
        ticketId: activeConversationId,
        text,
        sender,
      })
    );
  };

  const handleResolveTicket = (ticketId) => {
    const id = ticketId || activeConversationId;
    if (!id) return;
    dispatch(
      updateTicketStatus({
        id,
        status: "resolved",
      })
    );
  };

  const notes = [];
  const aiSummary = activeConversation
    ? `Müşteri platform üzerinde ${activeConversation.preview} ile ilgili teknik problem bildirdi. Destek temsilcisi ataması bekliyor.`
    : "";
  const aiSuggestions = useMemo(() => {
    if (role === "support_agent") {
      return [
        "Merhaba, talebinizi aldık. Detayları inceleyip hemen dönüyorum.",
        "Destek kaydınız oluşturuldu, ekibimiz üzerinde çalışıyor.",
        "Sorunu çözdük, sistemi kontrol edebilir misiniz?"
      ];
    } else {
      return [
        "Sorun hala devam ediyor, kontrol edebilir misiniz?",
        "Dosya boyutu sınırını 10MB seviyesine çekebilir miyiz?",
        "Teşekkürler, sorunumuz çözüldü.",
        "Güncel hata loglarını buraya ekliyorum."
      ];
    }
  }, [role]);

  return {
    filter,
    setFilter,
    search,
    setSearch,
    activeConversationId,
    setActiveConversationId: handleSelectConversation,
    conversations,
    activeConversation,
    messages,
    customer,
    notes,
    aiSummary,
    aiSuggestions,
    onSendMessage: handleSendMessage,
    onResolveTicket: handleResolveTicket,
  };
}
