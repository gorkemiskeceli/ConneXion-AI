import { useState } from "react";
import { useGetCustomersQuery } from "../../../services/api";
import { CONTACTS_PAGE_SIZE } from "../constants/contactsConfig";

/**
 * useContacts — data + table-state seam for the Contacts page.
 *
 * Reads all customers from JSON Server and implements local search,
 * filtering, sorting, and pagination.
 */
export default function useContacts() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState({ key: "name", dir: "asc" });
  const [page, setPage] = useState(1);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const { data: rawContacts = [], isLoading, error } = useGetCustomersQuery();

  // 1. Filter
  const filteredContacts = rawContacts.filter((contact) => {
    const matchesSearch =
      !search ||
      contact.name?.toLowerCase().includes(search.toLowerCase()) ||
      contact.email?.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone?.includes(search) ||
      contact.company?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || contact.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 2. Sort
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    let aVal = a[sort.key] ?? "";
    let bVal = b[sort.key] ?? "";

    if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return sort.dir === "asc" ? -1 : 1;
    if (aVal > bVal) return sort.dir === "asc" ? 1 : -1;
    return 0;
  });

  // 3. Paginate
  const pageSize = CONTACTS_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(sortedContacts.length / pageSize));
  
  // Ensure current page does not exceed totalPages
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const contacts = sortedContacts.slice(startIndex, startIndex + pageSize);

  const selectedContact =
    rawContacts.find((c) => c.id === selectedContactId) ?? null;

  const toggleSort = (key) =>
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );

  return {
    search,
    setSearch: (val) => {
      setSearch(val);
      setPage(1); // reset to page 1 on search
    },
    statusFilter,
    setStatusFilter: (val) => {
      setStatusFilter(val);
      setPage(1); // reset to page 1 on filter
    },
    sort,
    toggleSort,
    page: currentPage,
    setPage,
    pageSize,
    totalPages,
    contacts,
    selectedContact,
    selectedContactId,
    setSelectedContactId,
    isLoading,
    error,
  };
}
