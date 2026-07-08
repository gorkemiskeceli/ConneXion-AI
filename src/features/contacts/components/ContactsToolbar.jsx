import { Search, ChevronDown, ListFilter } from "lucide-react";

import { CONTACT_STATUS_FILTERS } from "../constants/contactsConfig";

/**
 * ContactsToolbar — search + status filter above the table.
 */
export default function ContactsToolbar({
  search = "",
  onSearch,
  statusFilter = "all",
  onStatusFilter,
  total = 0,
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch?.(e.target.value)}
          placeholder="İsim veya e-posta ara..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden font-mono text-xs text-slate-400 sm:inline">
          {total} kişi
        </span>

        <div className="relative">
          <ListFilter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilter?.(e.target.value)}
            className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-8 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-100"
          >
            {CONTACT_STATUS_FILTERS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
