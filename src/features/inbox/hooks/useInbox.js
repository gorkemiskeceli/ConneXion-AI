import { useState } from "react";

/**
 * useInbox — data + UI-state seam for the Inbox.
 *
 * Ships empty (no mock data). Replace the empty consts with a Redux selector
 * + JSON Server thunk later; keep every shape below stable so the three
 * columns keep working.
 */
export default function useInbox() {
  // UI state (stays local even after data is wired).
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activeConversationId, setActiveConversationId] = useState(null);

  // Server state — swap for real data later.
  const conversations = [];
  // { id, name, preview, time, unread, status, priority, channel }

  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) ?? null;

  const messages = [];
  // { id, sender: SENDER, type: MESSAGE_TYPE, text, duration, transcript, timestamp }

  const customer = null;
  // { name, email, phone, location, since, tags: [] }

  const notes = [];
  // { id, author, text, timestamp }

  const aiSummary = "";
  const aiSuggestions = [];
  // ["Önerilen yanıt 1", ...]

  return {
    filter,
    setFilter,
    search,
    setSearch,
    activeConversationId,
    setActiveConversationId,
    conversations,
    activeConversation,
    messages,
    customer,
    notes,
    aiSummary,
    aiSuggestions,
  };
}
