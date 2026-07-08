import { Settings2 } from "lucide-react";

import { NODE_TYPES } from "../constants/workflowsConfig";

/**
 * WorkflowNode — one step in the builder canvas.
 * node: { type: "trigger"|"condition"|"action", title? }
 * Shows a placeholder ("yapılandırılmadı") when the step isn't configured.
 */
export default function WorkflowNode({ node, canEdit = false }) {
  const meta = NODE_TYPES[node.type] ?? NODE_TYPES.action;
  const Icon = meta.icon;

  return (
    <div
      className={`flex w-full max-w-md items-center gap-3 rounded-xl border border-l-4 border-slate-200 bg-white px-4 py-3 shadow-card ${meta.accent}`}
    >
      <span
        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${meta.tint}`}
      >
        <Icon className="h-4 w-4" strokeWidth={1.9} />
      </span>

      <div className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-wide text-slate-400">
          {meta.label}
        </span>
        <span
          className={`block truncate text-sm ${
            node.title ? "font-medium text-slate-900" : "text-slate-400"
          }`}
        >
          {node.title || "Yapılandırılmadı"}
        </span>
      </div>

      {canEdit && (
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Adımı yapılandır"
        >
          <Settings2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
