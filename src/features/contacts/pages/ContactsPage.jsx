import { UserPlus } from "lucide-react";

import useContacts from "../hooks/useContacts";
import ContactsToolbar from "../components/ContactsToolbar";
import ContactsTable from "../components/ContactsTable";
import ContactProfileDrawer from "../components/ContactProfileDrawer";
import { ROLES } from "../../../constants/navigation";
import { canContacts, CONTACTS_ACTION } from "../../../constants/permissions";

/**
 * ContactsPage — customer management.
 *
 * Page header (title + gated "Yeni Kişi") → one card holding the toolbar
 * (search + status filter) and the sortable, paginated table → a slide-over
 * profile drawer opened by selecting a row.
 *
 * `role` gates create/edit/delete. Empty by design: the table shows its empty
 * state and the drawer stays closed until `useContacts()` returns data.
 */
export default function ContactsPage({ role = ROLES.PLATFORM_ADMIN }) {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sort,
    toggleSort,
    page,
    setPage,
    totalPages,
    contacts,
    selectedContact,
    setSelectedContactId,
  } = useContacts();

  const canCreate = canContacts(role, CONTACTS_ACTION.CREATE);

  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900">
            Contacts
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Müşterilerinizi görüntüleyin ve yönetin.
          </p>
        </div>

        {canCreate && (
          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-600"
          >
            <UserPlus className="h-4 w-4" strokeWidth={2} />
            Yeni Kişi
          </button>
        )}
      </div>

      {/* Table card */}
      <div className="rounded-2xl bg-white shadow-card">
        <ContactsToolbar
          search={search}
          onSearch={setSearch}
          statusFilter={statusFilter}
          onStatusFilter={setStatusFilter}
          total={contacts.length}
        />
        <ContactsTable
          role={role}
          contacts={contacts}
          sort={sort}
          onSort={toggleSort}
          onSelect={setSelectedContactId}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* Profile drawer */}
      <ContactProfileDrawer
        role={role}
        contact={selectedContact}
        onClose={() => setSelectedContactId(null)}
      />
    </div>
  );
}
