import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addMessageToTicket, updateTicketStatus } from "../../../homepage/store/supportSlice";
import {
  useGetConversationsQuery,
  useGetCustomersQuery,
  useGetMessagesQuery,
  useUpdateConversationMutation,
} from "../../../services/api";
import { useToast } from "../../../shared/components/ui/Toast";

/**
 * useInbox — data + UI-state seam for the Inbox.
 */
export default function useInbox(role) {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const ticketIdFromUrl = searchParams.get("id");

  // UI state
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

  // Read support tickets from Redux and current user from Auth
  const tickets = useSelector((state) => state.support.tickets);
  const currentUser = useSelector((state) => state.auth.user);

  // Read live conversations, customers from database via RTK Query
  const { data: dbConversations = [] } = useGetConversationsQuery(undefined, {
    pollingInterval: 3000, // Poll every 3 seconds for live dashboard updates!
  });
  const { data: dbCustomers = [] } = useGetCustomersQuery();

  // 1. Filter support tickets by active user role to prevent cross-workspace visibility
  const roleFilteredTickets = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === "admin") {
      return tickets;
    }
    // Non-admin (role !== "admin") users only see tickets matching their tenantId
    return tickets.filter((t) => t.tenantId === currentUser.tenantId);
  }, [tickets, currentUser]);

  // 2. Map tickets to conversation format
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

  // 3. Map database conversations to workspace format
  const mappedDbConversations = useMemo(() => {
    return dbConversations.map((c) => {
      const cust = dbCustomers.find((cus) => String(cus.id) === String(c.customerId));
      return {
        id: c.id,
        customerId: c.customerId,
        name: cust ? cust.name : "Canlı Sohbet",
        preview: c.preview || "Sohbet başladı...",
        time: c.lastActivity || c.time || "Bugün",
        unread: c.status === "open" ? 1 : 0,
        status: c.status || "open",
        priority: c.priority || "medium",
        channel: "chat",
      };
    });
  }, [dbConversations, dbCustomers]);

  // 4. Combined conversations list
  const conversations = useMemo(() => {
    const all = [...ticketConversations, ...mappedDbConversations];
    
    // Sort all by timestamp/time descending
    all.sort((a, b) => b.time.localeCompare(a.time));

    return all.filter((c) => {
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
          : c.status !== "closed"; // Show unresolved open chats

      return matchesSearch && matchesFilter;
    });
  }, [ticketConversations, mappedDbConversations, search, filter]);

  // 5. Find Active Conversation
  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === activeConversationId) ?? null;
  }, [conversations, activeConversationId]);

  // 6. DB Messages query for active live chat
  const isDbChat = activeConversation && activeConversation.channel === "chat";
  const { data: dbMessages = [] } = useGetMessagesQuery(activeConversationId, {
    skip: !activeConversationId || !isDbChat,
    pollingInterval: 3000,
  });

  const [updateConversation] = useUpdateConversationMutation();

  // Construct messages dynamically based on Redux ticket messages or DB messages
  const messages = useMemo(() => {
    if (!activeConversation) return [];
    
    if (activeConversation.channel === "ticket") {
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
    } else {
      // It's a live chat! Return database messages formatted correctly
      return dbMessages.map(msg => ({
        id: msg.id,
        sender: msg.sender === "user" ? "customer" : "agent",
        type: "text",
        text: msg.text,
        timestamp: msg.timestamp || "00:00"
      }));
    }
  }, [activeConversation, tickets, dbMessages]);

  const customer = useMemo(() => {
    if (!activeConversation) return null;
    
    if (activeConversation.channel === "ticket") {
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
    } else {
      // Live chat customer details
      const custObj = dbCustomers.find((cus) => String(cus.id) === String(activeConversation.customerId));
      return {
        name: custObj ? custObj.name : activeConversation.name,
        email: custObj?.email || "bilinmiyor@ziyaretci.com",
        phone: custObj?.phone || "+90 212 555 01 23",
        location: custObj?.location || "İstanbul, TR",
        since: activeConversation.time || "Bugün",
        tags: ["Web Chat", "Canlı Destek"],
      };
    }
  }, [activeConversation, tickets, dbCustomers]);

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
    
    if (activeConversation?.channel === "ticket") {
      const sender = role === "support_agent" ? "agent" : "customer";
      dispatch(
        addMessageToTicket({
          ticketId: activeConversationId,
          text,
          sender,
        })
      );
    }
    // Note: Live chat message creation and conversation updating is triggered on the InboxPage.jsx component
  };

  const handleResolveTicket = async (ticketId) => {
    const id = ticketId || activeConversationId;
    if (!id) return;
    
    if (activeConversation?.channel === "ticket") {
      dispatch(
        updateTicketStatus({
          id,
          status: "resolved",
        })
      );
    } else {
      // Resolve live chat conversation in database!
      try {
        await updateConversation({
          id,
          status: "closed",
        }).unwrap();
        showToast("Konuşma başarıyla kapatıldı.", "success");
      } catch (err) {
        console.error("Failed to close conversation:", err);
        showToast("Konuşma kapatılırken hata oluştu.", "error");
      }
    }
  };

  const notes = [];
  const aiSummary = activeConversation
    ? activeConversation.channel === "ticket"
      ? `Müşteri platform üzerinde ${activeConversation.preview} ile ilgili teknik problem bildirdi. Destek temsilcisi ataması bekliyor.`
      : `Müşteri ile yapay zeka asistanı arasında canlı sohbet devam ediyor. Son mesaj: "${activeConversation.preview}".`
    : "";
    
  const aiSuggestions = useMemo(() => {
    if (!activeConversation) return [];
    if (activeConversation.channel === "ticket") {
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
    } else {
      // Suggestions for live chat!
      return [
        "Size en yakın salonumuzda randevu oluşturabilirim.",
        "Saç kesimi ve boyama fiyat listemizi sizinle paylaşabilirim.",
        "Tabii ki, başka yardımcı olabileceğim bir konu var mı?",
        "Çalışma saatlerimiz hafta içi 08:00 - 18:00 arasındadır."
      ];
    }
  }, [role, activeConversation]);

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
