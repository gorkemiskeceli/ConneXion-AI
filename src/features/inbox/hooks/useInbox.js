import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  useGetConversationsQuery,
  useGetCustomersQuery,
  useGetMessagesQuery,
  useUpdateConversationMutation,
  useCreateMessageMutation
} from "../../../services/api";
import { useToast } from "../../../shared/components/ui/Toast";

/**
 * useInbox — data + UI-state seam for the Inbox.
 */
export default function useInbox(role) {
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

  const currentUser = useSelector((state) => state.auth.user);

  // Read live conversations, customers from database via RTK Query
  const { data: dbConversations = [] } = useGetConversationsQuery(undefined, {
    pollingInterval: 3000, // Poll every 3 seconds for live dashboard updates!
  });
  const { data: dbCustomers = [] } = useGetCustomersQuery();

  // 1. Filter conversations by tenant access rules
  const roleFilteredDbConversations = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === "admin") {
      return dbConversations;
    }
    // Filter to tenant if standard user
    return dbConversations.filter((c) => c.tenantId === currentUser.tenantId);
  }, [dbConversations, currentUser]);

  // 2. Map database conversations to workspace format
  const mappedDbConversations = useMemo(() => {
    return roleFilteredDbConversations.map((c) => {
      const cust = dbCustomers.find((cus) => String(cus.id) === String(c.customerId));
      const customerName = c.name || (cust ? cust.name : "İsimsiz");
      
      return {
        id: c.id,
        customerId: c.customerId,
        name: customerName,
        preview: c.preview || (c.channel === "ticket" ? "Destek Talebi" : "Sohbet başladı..."),
        time: c.lastActivity || c.time || "Bugün",
        unread: c.status === "open" ? 1 : 0,
        status: c.status || "open",
        priority: c.priority || "medium",
        channel: c.channel || "chat", // "ticket" or "web" etc.
      };
    });
  }, [roleFilteredDbConversations, dbCustomers]);

  // 3. Combined conversations list
  const conversations = useMemo(() => {
    const all = [...mappedDbConversations];
    
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
          ? c.status === "closed" || c.status === "resolved"
          : filter === "pending"
          ? c.status === "pending"
          : c.status !== "closed" && c.status !== "resolved"; // Show unresolved open chats

      return matchesSearch && matchesFilter;
    });
  }, [mappedDbConversations, search, filter]);

  // 4. Find Active Conversation
  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === activeConversationId) ?? null;
  }, [conversations, activeConversationId]);

  // 5. DB Messages query for active conversation (works for both tickets and chats now!)
  const { data: dbMessages = [] } = useGetMessagesQuery(activeConversationId, {
    skip: !activeConversationId,
    pollingInterval: 3000,
  });

  const [updateConversation] = useUpdateConversationMutation();
  const [createMessage] = useCreateMessageMutation();

  // Construct messages dynamically based on DB messages
  const messages = useMemo(() => {
    if (!activeConversation) return [];
    
    return dbMessages.map(msg => ({
      id: msg.id,
      sender: msg.sender === "user" ? "customer" : (msg.sender === "agent" ? "agent" : msg.sender),
      type: "text",
      text: msg.text,
      timestamp: msg.timestamp || "00:00"
    }));
  }, [activeConversation, dbMessages]);

  const customer = useMemo(() => {
    if (!activeConversation) return null;
    
    const custObj = dbCustomers.find((cus) => String(cus.id) === String(activeConversation.customerId));
    
    if (activeConversation.channel === "ticket") {
      return {
        name: activeConversation.name,
        email: custObj?.email || `${normalizeEmailName(activeConversation.name)}@customer.com`,
        phone: custObj?.phone || "+90 555 123 45 67",
        location: custObj?.location || "İstanbul, TR",
        since: activeConversation.time,
        tags: ["Teknik Destek", activeConversation.priority.toUpperCase()],
      };
    } else {
      return {
        name: activeConversation.name,
        email: custObj?.email || "bilinmiyor@ziyaretci.com",
        phone: custObj?.phone || "+90 212 555 01 23",
        location: custObj?.location || "İstanbul, TR",
        since: activeConversation.time || "Bugün",
        tags: ["Web Chat", "Canlı Destek"],
      };
    }
  }, [activeConversation, dbCustomers]);

  function normalizeEmailName(name) {
    if (!name) return "";
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

  const handleSendMessage = async (text) => {
    if (!activeConversationId || !activeConversation) return;

    // Both tickets and live chats now use the exact same logic.
    // However, if the user role is not "admin" or "support_agent", they are a customer replying.
    const isAgent = role === "support_agent" || role === "admin" || currentUser?.role === "admin";
    const senderType = isAgent ? "agent" : "customer";

    const newMessage = {
      conversationId: activeConversationId,
      sender: senderType,
      text,
      timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      tenantId: currentUser?.tenantId || "tnt_standard"
    };

    try {
      await createMessage(newMessage).unwrap();

      await updateConversation({
        id: activeConversationId,
        preview: text,
        lastActivity: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        unread: 1, // mark as unread for the other party
      }).unwrap();
    } catch (err) {
      console.error("Failed to send message via useInbox", err);
      showToast("Mesaj gönderilirken hata oluştu.", "error");
    }
  };

  const handleResolveTicket = async (ticketId) => {
    const id = ticketId || activeConversationId;
    if (!id) return;
    
    try {
      await updateConversation({
        id,
        status: "closed", // both tickets and chats map to 'closed' in db
      }).unwrap();
      showToast("Görüşme durumu başarıyla güncellendi.", "success");
    } catch (err) {
      console.error("Failed to update status:", err);
      showToast("Durum güncellenirken hata oluştu.", "error");
    }
  };

  const notes = [];
  const aiSummary = activeConversation
    ? activeConversation.channel === "ticket"
      ? `Müşteri platform üzerinde ${activeConversation.preview} ile ilgili teknik problem bildirdi.`
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
