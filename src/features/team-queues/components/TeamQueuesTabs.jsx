import { TEAM_TABS } from "../constants/teamQueuesConfig";

/**
 * TeamQueuesTabs — page-level underline tabs.
 */
export default function TeamQueuesTabs({ active, onChange }) {
  return (
    <div className="mb-6 flex gap-1 border-b border-slate-200">
      {TEAM_TABS.map(({ id, label, icon: Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange?.(id)}
            className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "border-primary text-primary-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={1.9} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
