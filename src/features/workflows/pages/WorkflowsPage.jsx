import { useState } from "react";
import { Plus, Workflow as WorkflowIcon } from "lucide-react";

import useWorkflows from "../hooks/useWorkflows";
import WorkflowList from "../components/WorkflowList";
import WorkflowBuilder from "../components/WorkflowBuilder";
import { ROLES } from "../../../constants/navigation";
import { canWorkflows, WORKFLOW_ACTION } from "../../../constants/permissions";
import { useToast } from "../../../shared/components/ui/Toast";
import {
  useCreateWorkflowMutation,
  useUpdateWorkflowMutation,
  useDeleteWorkflowMutation,
} from "../../../services/api";

/**
 * WorkflowsPage — the visual automation builder.
 * Wired with fully functioning Create, Update, and Delete operations using RTK mutations.
 */
export default function WorkflowsPage({ role = ROLES.PLATFORM_ADMIN }) {
  const { showToast } = useToast();
  const [confirmData, setConfirmData] = useState(null);
  const { search, setSearch, workflows, selectedWorkflowId, setSelectedWorkflowId, selectedWorkflow } =
    useWorkflows();

  const [createWorkflow] = useCreateWorkflowMutation();
  const [updateWorkflow] = useUpdateWorkflowMutation();
  const [deleteWorkflow] = useDeleteWorkflowMutation();

  const canCreate = canWorkflows(role, WORKFLOW_ACTION.CREATE);
  const canEdit = canWorkflows(role, WORKFLOW_ACTION.EDIT);
  const canTest = canWorkflows(role, WORKFLOW_ACTION.TEST);

  const handleCreate = async () => {
    const defaultNodes = [
      {
        id: "wfn_" + Date.now() + "_1",
        type: "trigger",
        title: "Yeni mesaj alındığında",
      },
      {
        id: "wfn_" + Date.now() + "_2",
        type: "condition",
        title: "Güven skoru düşükse",
      },
      {
        id: "wfn_" + Date.now() + "_3",
        type: "action",
        title: "Temsilciye aktar",
      },
    ];

    const newWorkflow = {
      name: "Yeni İş Akışı",
      status: "draft",
      lastRun: null,
      nodes: defaultNodes,
    };

    try {
      const result = await createWorkflow(newWorkflow).unwrap();
      setSelectedWorkflowId(result.id);
    } catch (err) {
      console.error("Yeni workflow oluşturma hatası:", err);
    }
  };

  const handleSave = async (updatedWorkflow) => {
    try {
      if (updatedWorkflow.id) {
        await updateWorkflow(updatedWorkflow).unwrap();
      } else {
        // Fallback (shouldn't happen because we create on click)
        const result = await createWorkflow(updatedWorkflow).unwrap();
        setSelectedWorkflowId(result.id);
      }
      showToast("Workflow başarıyla kaydedildi.", "success");
    } catch (err) {
      showToast("Kaydetme sırasında bir hata oluştu.", "error");
      console.error("Kaydetme hatası:", err);
    }
  };

  const handleDelete = (id) => {
    setConfirmData({
      message: "Bu workflowu silmek istediğinizden emin misiniz?",
      onConfirm: async () => {
        try {
          await deleteWorkflow(id).unwrap();
          showToast("Workflow başarıyla silindi.", "success");
          setSelectedWorkflowId("");
        } catch (err) {
          showToast("Workflow silinirken hata oluştu.", "error");
          console.error("Silme hatası:", err);
        }
      },
    });
  };

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
            onClick={handleCreate}
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
          onSave={handleSave}
          onDelete={handleDelete}
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
      {/* Custom Confirmation Modal */}
      {confirmData && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/20 backdrop-blur-xs p-4 animate-in fade-in duration-100">
          <div className="w-full max-w-sm rounded-3xl border border-white/40 bg-white/80 backdrop-blur-xl p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="font-heading text-lg font-extrabold text-slate-900 mb-2">
              Emin misiniz?
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              {confirmData.message}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmData(null)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={() => {
                  confirmData.onConfirm();
                  setConfirmData(null);
                }}
                className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-red-600/10 hover:bg-red-700 active:scale-95 transition-all"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
