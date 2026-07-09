import { Plus, Workflow as WorkflowIcon } from "lucide-react";

import useWorkflows from "../hooks/useWorkflows";
import WorkflowList from "../components/WorkflowList";
import WorkflowBuilder from "../components/WorkflowBuilder";
import { ROLES } from "../../../constants/navigation";
import { canWorkflows, WORKFLOW_ACTION } from "../../../constants/permissions";

/**
 * WorkflowsPage — the visual automation builder.
 *
 * Header (title + gated "Yeni Workflow") → workflow list on the left and the
 * builder canvas on the right. The canvas always shows the Trigger → Condition
 * → Action structure (skeleton when nothing is loaded).
 *
 * Permissions: Workspace Admin manages fully; Manager can view + test;
 * Platform Admin is view-only; Support Agent has no access. Empty by design.
 */
export default function WorkflowsPage({ role = ROLES.PLATFORM_ADMIN }) {
  const { search, setSearch, workflows, selectedWorkflowId, setSelectedWorkflowId, selectedWorkflow } =
    useWorkflows();

  const canCreate = canWorkflows(role, WORKFLOW_ACTION.CREATE);
  const canEdit = canWorkflows(role, WORKFLOW_ACTION.EDIT);
  const canTest = canWorkflows(role, WORKFLOW_ACTION.TEST);

  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900">
            Workflows
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Destek süreçlerinizi otomatikleştirin.
          </p>
        </div>

        {canCreate && (
          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/10 transition-all hover:bg-primary-600 active:scale-95"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Yeni Workflow
          </button>
        )}
      </div>

      {/* List + builder */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <WorkflowList
          workflows={workflows}
          activeId={selectedWorkflowId}
          onSelect={setSelectedWorkflowId}
          search={search}
          onSearch={setSearch}
        />
        <WorkflowBuilder
          workflow={selectedWorkflow}
          canEdit={canEdit}
          canTest={canTest}
        />
      </div>

      {/* View-only hint */}
      {!canEdit && (
        <p className="mt-3 flex items-center gap-2 text-xs text-slate-400">
          <WorkflowIcon className="h-3.5 w-3.5" />
          {canTest
            ? "Workflowları görüntüleyebilir ve test edebilirsiniz, ancak değiştiremezsiniz."
            : "Workflowları yalnızca görüntüleyebilirsiniz."}
        </p>
      )}
    </div>
  );
}
