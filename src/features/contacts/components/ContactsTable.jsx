import {
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  Eye,
  Pencil,
  Trash2,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Avatar from "../../../shared/components/ui/Avatar";
import Badge from "../../../shared/components/ui/Badge";
import EmptyState from "../../../shared/components/ui/EmptyState";
import { CONTACT_COLUMNS, CONTACT_STATUS } from "../constants/contactsConfig";
import { canContacts, CONTACTS_ACTION } from "../../../constants/permissions";

function SortIcon({ active, dir }) {
  if (!active) return <ChevronsUpDown className="h-3.5 w-3.5 text-slate-300" />;
  return dir === "asc" ? (
    <ArrowUp className="h-3.5 w-3.5 text-slate-500" />
  ) : (
    <ArrowDown className="h-3.5 w-3.5 text-slate-500" />
  );
}

function TagCells({ tags = [] }) {
  if (!tags.length) return <span className="text-slate-300">—</span>;
  const shown = tags.slice(0, 2);
  const rest = tags.length - shown.length;
  return (
    <div className="flex flex-wrap gap-1">
      {shown.map((t) => (
        <span
          key={t}
          className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600"
        >
          {t}
        </span>
      ))}
      {rest > 0 && (
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">
          +{rest}
        </span>
      )}
    </div>
  );
}

/**
 * ContactsTable — the customer list.
 * Sortable headers, per-row view/edit/delete actions (gated by role),
 * empty state, and pagination. Clicking a row opens the profile drawer.
 */
export default function ContactsTable({
  role,
  contacts = [],
  sort,
  onSort,
  onSelect,
  onEdit,
  onDelete,
  page = 1,
  totalPages = 1,
  onPageChange,
}) {
  const canEdit = canContacts(role, CONTACTS_ACTION.EDIT);
  const canDelete = canContacts(role, CONTACTS_ACTION.DELETE);
  const colSpan = CONTACT_COLUMNS.length + 1;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left font-mono text-[11px] uppercase tracking-wide text-slate-400">
              {CONTACT_COLUMNS.map((col) => (
                <th key={col.id} className="px-5 py-3 font-medium">
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => onSort?.(col.id)}
                      className="inline-flex items-center gap-1 hover:text-slate-600"
                    >
                      {col.label}
                      <SortIcon active={sort?.key === col.id} dir={sort?.dir} />
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
              <th className="px-5 py-3 text-right font-medium">İşlemler</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={colSpan}>
                  <EmptyState
                    icon={Users}
                    title="Kişi bulunmuyor"
                    description="Müşteriler eklendiğinde burada listelenir."
                  />
                </td>
              </tr>
            ) : (
              contacts.map((contact) => {
                const status =
                  CONTACT_STATUS[contact.status] ?? CONTACT_STATUS.inactive;
                return (
                  <tr
                    key={contact.id}
                    onClick={() => onSelect?.(contact.id)}
                    className="cursor-pointer text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={contact.name} size="sm" />
                        <span className="font-medium text-slate-900">
                          {contact.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-500">{contact.email}</td>
                    <td className="px-5 py-3">
                      <TagCells tags={contact.tags} />
                    </td>
                    <td className="px-5 py-3">{contact.conversations ?? 0}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-400">
                      {contact.lastActivity ?? "—"}
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                    <td
                      className="px-5 py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onSelect?.(contact.id)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                          aria-label="Görüntüle"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {canEdit && (
                          <button
                            type="button"
                            onClick={() => onEdit?.(contact)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            aria-label="Düzenle"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        )}
                        {canDelete && (
                          <button
                            type="button"
                            onClick={() => onDelete?.(contact.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                            aria-label="Sil"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {contacts.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-sm text-slate-500">
          <span className="font-mono text-xs">
            Sayfa {page} / {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange?.(page - 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Önceki sayfa"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange?.(page + 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Sonraki sayfa"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
