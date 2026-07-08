import { Plus, Play, Save } from "lucide-react";

import WorkflowNode from "./WorkflowNode";
import Input from "../../../shared/components/ui/Input";
import Toggle from "../../../shared/components/ui/Toggle";
import { SKELETON_NODES } from "../constants/workflowsConfig";

/**
 * AddStep — connector line + gated "add step" button between nodes.
 */
function AddStep({ canEdit }) {
  return (
    <div className="flex flex-col items-center">
      <span className="h-5 w-px bg-slate-200" />
      {canEdit ? (
        <button
          type="button"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-slate-300 bg-white text-slate-400 transition-colors hover:border-primary-200 hover:text-primary-600"
          aria-label="Adım ekle"
        >
          <Plus className="h-4 w-4" />
        </button>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
      )}
      <span className="h-5 w-px bg-slate-200" />
    </div>
  );
}

/**
 * WorkflowBuilder — the visual canvas.
 *
 * Toolbar: workflow name, active toggle, Test (gated), Save (gated).
 * Canvas: the Trigger → Condition → Action flow. When no workflow is loaded it
 * shows the unconfigured skeleton so the builder is always visible.
 * Interface only — execution is simulated elsewhere, no automation engine.
 */
export default function WorkflowBuilder({
  workflow,
  canEdit = false,
  canTest = false,
}) {
  const nodes = workflow?.nodes?.length ? workflow.nodes : SKELETON_NODES;

  return (
    <div className="flex min-h-[600px] flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-card">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <Input
            defaultValue={workflow?.name ?? ""}
            placeholder="Workflow adı"
            disabled={!canEdit}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Aktif</span>
            <Toggle checked={false} disabled={!canEdit} />
          </div>

          {canTest && (
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              <Play className="h-4 w-4" />
              Test Et
            </button>
          )}

          {canEdit && (
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
            >
              <Save className="h-4 w-4" />
              Kaydet
            </button>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-auto bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] p-8 [background-size:16px_16px]">
        <div className="flex flex-col items-center">
          {nodes.map((node, i) => (
            <div key={node.id} className="flex w-full flex-col items-center">
              <WorkflowNode node={node} canEdit={canEdit} />
              {i < nodes.length - 1 && <AddStep canEdit={canEdit} />}
            </div>
          ))}

          {/* Trailing add-step */}
          <AddStep canEdit={canEdit} />
        </div>
      </div>
    </div>
  );
}
