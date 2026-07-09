import { useState } from "react";
import {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useGetCustomersQuery,
} from "../../../services/api";

/**
 * useInbox — data + UI-state seam for the Inbox.
 *
 * Reads conversations, messages, and customers from the RTK Query API.
 * Integrates search, status tab filters, message threads, and customer notes.
 */
export default function useInbox() {
  // UI state (stays local even after data is wired).
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activeConversationId, setActiveConversationId] = useState(null);

  const { data: rawConversations = [], isLoading: isConvLoading, error: convError } = useGetConversationsQuery();
  const { data: rawCustomers = [] } = useGetCustomersQuery();

  const { data: messages = [], isLoading: isMsgLoading } = useGetMessagesQuery(
    activeConversationId,
    { skip: !activeConversationId }
  );

  // 1. Filter conversations by tab (filter) and search query
  const conversations = rawConversations.filter((c) => {
    const matchesSearch =
      !search ||
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.preview?.toLowerCase().includes(search.toLowerCase());

    const matchesTab =
      filter === "all" ||
      (filter === "open" && c.status === "open") ||
      (filter === "pending" && c.status === "pending") ||
      (filter === "closed" && c.status === "closed");

    return matchesSearch && matchesTab;
  });

  const activeConversation =
    rawConversations.find((c) => c.id === activeConversationId) ?? null;

  // Retrieve full customer object (including notes) from the customers array
  const fullCustomer = activeConversation
    ? rawCustomers.find((cus) => cus.id === activeConversation.customerId)
    : null;

  // Use embedded customer details if full customer is not loaded yet
  const customer = fullCustomer || activeConversation?.customer || null;
  const notes = fullCustomer?.notes || [];

  const aiSummary = activeConversation?.aiSummary || "";
  const aiSuggestions = activeConversation?.aiSuggestions || [];

  return {
    filter,
    setFilter,
    search,
    setSearch: (val) => {
      setSearch(val);
      // Optional: you can clear selected conversation on search if desired
    },
    activeConversationId,
    setActiveConversationId,
    conversations,
    activeConversation,
    messages,
    customer,
    notes,
    aiSummary,
    aiSuggestions,
    isLoading: isConvLoading || isMsgLoading,
    error: convError,
  };
}
