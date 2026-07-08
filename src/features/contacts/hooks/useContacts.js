import { useState } from "react";

import { CONTACTS_PAGE_SIZE } from "../constants/contactsConfig";

/**
 * useContacts — data + table-state seam for the Contacts page.
 *
 * Ships empty (no mock data). Wire to Redux + JSON Server later; keep the
 * contact shape stable so the table and profile drawer keep working.
 *
 * contact: {
 *   id, name, email, phone, location, company, status, since,
 *   tags: [], conversations, lastActivity, aiSummary,
 *   notes: [{ id, author, text, timestamp }],
 *   conversationHistory: [{ id, subject, status, date }]
 * }
 */
export default function useContacts() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState({ key: "name", dir: "asc" });
  const [page, setPage] = useState(1);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const contacts = []; // ← server state goes here

  const pageSize = CONTACTS_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(contacts.length / pageSize));
  const selectedContact =
    contacts.find((c) => c.id === selectedContactId) ?? null;

  const toggleSort = (key) =>
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sort,
    toggleSort,
    page,
    setPage,
    pageSize,
    totalPages,
    contacts,
    selectedContact,
    selectedContactId,
    setSelectedContactId,
  };
}
