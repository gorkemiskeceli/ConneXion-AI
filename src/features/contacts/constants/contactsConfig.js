// Contact status → Badge variant + label.
export const CONTACT_STATUS = {
  active: { label: "Aktif", variant: "success" },
  lead: { label: "Potansiyel", variant: "primary" },
  inactive: { label: "Pasif", variant: "neutral" },
};

// Status filter options for the toolbar.
export const CONTACT_STATUS_FILTERS = [
  { id: "all", label: "Tüm Durumlar" },
  { id: "active", label: "Aktif" },
  { id: "lead", label: "Potansiyel" },
  { id: "inactive", label: "Pasif" },
];

// Table columns. `sortable` drives the clickable header + arrow.
export const CONTACT_COLUMNS = [
  { id: "name", label: "Müşteri", sortable: true },
  { id: "email", label: "E-posta", sortable: false },
  { id: "tags", label: "Etiketler", sortable: false },
  { id: "conversations", label: "Konuşma", sortable: true },
  { id: "lastActivity", label: "Son Aktivite", sortable: true },
  { id: "status", label: "Durum", sortable: false },
];

export const CONTACTS_PAGE_SIZE = 10;
