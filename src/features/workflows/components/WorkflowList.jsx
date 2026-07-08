import { Search, Workflow as WorkflowIcon } from "lucide-react";

import EmptyState from "../../../shared/components/ui/EmptyState";
import Badge from "../../../shared/components/ui/Badge";
import { WORKFLOW_STATUS } from "../constants/workflowsConfig";

/**
 * WorkflowList — left panel listing saved workflows.
 * workflow: { id, name, status, lastRun }
 */
export default function WorkflowList({
  workflows = [],
  activeId,
  onSelect,
  search = "",
  onSearch,
}) {
  return (
    <div className="flex flex-col rounded-2xl bg-white shadow-card md:w-72 md:shrink-0">
      <div className="space-y-3 border-b border-slate-100 px-4 pb-3 pt-4">
        <h3 className="font-heading text-base font-bold text-slate-900">
          Workflowlar
        </h3>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Workflow ara..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>
      </div>

      <div className="max-h-[520px] flex-1 overflow-y-auto p-2">
        {workflows.length === 0 ? (
          <EmptyState
            icon={WorkflowIcon}
            title="Workflow yok"
            description="Oluşturduğunuz otomasyonlar burada görünür."
          />
        ) : (
          <ul className="space-y-1">
            {workflows.map((wf) => {
              const status = WORKFLOW_STATUS[wf.status] ?? WORKFLOW_STATUS.draft;
              const isActive = wf.id === activeId;
              return (
                <li key={wf.id}>
                  <button
                    type="button"
                    onClick={() => onSelect?.(wf.id)}
                    className={`w-full rounded-lg px-3 py-2.5 text-left transition-colors ${
                      isActive ? "bg-primary-50" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium text-slate-900">
                        {wf.name}
                      </span>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                    {wf.lastRun && (
                      <span className="mt-1 block font-mono text-[11px] text-slate-400">
                        Son çalışma: {wf.lastRun}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
