import { STUDIO_TABS } from "../constants/aiStudioConfig";

/**
 * StudioTabs — vertical section nav (Genel, Talimatlar, …).
 */
export default function StudioTabs({ active, onChange }) {
  return (
    <nav className="flex gap-1 overflow-x-auto p-3 md:w-56 md:flex-col md:overflow-visible md:border-r md:border-slate-100">
      {STUDIO_TABS.map(({ id, label, icon: Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange?.(id)}
            className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary-50 text-primary-700"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={1.9} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
