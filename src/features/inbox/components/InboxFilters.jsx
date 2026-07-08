import { INBOX_FILTERS } from "../constants/inboxConfig";

/**
 * InboxFilters — scrollable pill row for filtering the conversation list.
 */
export default function InboxFilters({ active = "all", onChange }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {INBOX_FILTERS.map((f) => {
        const isActive = f.id === active;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onChange?.(f.id)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
