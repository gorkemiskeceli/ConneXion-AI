import { useState, useEffect } from "react";
import { Plus, GitBranch, Trash2 } from "lucide-react";

import StudioSection from "../StudioSection";
import FormField from "../../../../shared/components/ui/FormField";
import Input from "../../../../shared/components/ui/Input";
import Select from "../../../../shared/components/ui/Select";
import Toggle from "../../../../shared/components/ui/Toggle";
import EmptyState from "../../../../shared/components/ui/EmptyState";
import { HANDOFF_CONDITIONS } from "../../constants/aiStudioConfig";
import { useUpdateAiAgentMutation, useAddHandoffRuleMutation, useDeleteHandoffRuleMutation } from "../../../../services/api";
import { useToast } from "../../../../shared/components/ui/Toast";

/**
 * HandoffRulesSection — when and how to transfer to a human agent.
 * rules: { id, condition, target }
 */
export default function HandoffRulesSection({ canEdit, rules = [], agent, queues = [], onReset }) {
  const { showToast } = useToast();
  const [confirmData, setConfirmData] = useState(null);
  const [flags, setFlags] = useState({});
  const [confidence, setConfidence] = useState("");
  const [targetTeam, setTargetTeam] = useState("");

  // Custom rule form state
  const [isAdding, setIsAdding] = useState(false);
  const [condition, setCondition] = useState("");
  const [target, setTarget] = useState("");

  const [updateAiAgent, { isLoading }] = useUpdateAiAgentMutation();
  const [addHandoffRule] = useAddHandoffRuleMutation();
  const [deleteHandoffRule] = useDeleteHandoffRuleMutation();

  // Sync state with incoming agent prop
  useEffect(() => {
    if (agent) {
      setFlags(agent.handoffFlags || {});
      setConfidence(agent.handoffConfidence || "");
      setTargetTeam(agent.handoffTargetTeam || "");
    }
  }, [agent]);

  const setFlag = (id, value) => {
    setFlags((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    if (!agent) return;
    try {
      await updateAiAgent({
        id: agent.id,
        handoffFlags: flags,
        handoffConfidence: confidence !== "" ? Number(confidence) : "",
        handoffTargetTeam: targetTeam,
      }).unwrap();
      showToast("Aktarım ayarları başarıyla kaydedildi.", "success");
    } catch (err) {
      showToast("Ayarlar kaydedilirken hata oluştu.", "error");
      console.error("Failed to save handoff rules config:", err);
    }
  };

  const handleAddRule = async (e) => {
    e.preventDefault();
    if (!condition.trim() || !target) return;

    try {
      await addHandoffRule({
        id: `hr_${Date.now()}`,
        condition: condition.trim(),
        target,
      }).unwrap();

      setCondition("");
      setTarget("");
      setIsAdding(false);
      showToast("Özel aktarım kuralı başarıyla eklendi.", "success");
    } catch (err) {
      showToast("Kural eklenirken hata oluştu.", "error");
      console.error("Failed to add custom rule:", err);
    }
  };

  const handleDeleteRule = (id) => {
    setConfirmData({
      message: "Bu özel aktarım kuralını silmek istediğinize emin misiniz?",
      onConfirm: async () => {
        try {
          await deleteHandoffRule(id).unwrap();
          showToast("Aktarım kuralı silindi.", "success");
        } catch (err) {
          showToast("Kural silinirken hata oluştu.", "error");
          console.error("Failed to delete custom rule:", err);
        }
      },
    });
  };

  if (!agent) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-slate-400">
        Yükleniyor veya seçili asistan bulunamadı...
      </div>
    );
  }

  return (
    <StudioSection
      title="Aktarım Kuralları"
      description="Konuşmanın ne zaman bir temsilciye devredileceğini tanımlayın."
      canEdit={canEdit}
      onSave={handleSave}
      onReset={onReset}
    >
      <div className="max-w-2xl space-y-5">
        <div className="divide-y divide-slate-100 rounded-xl border border-slate-100 bg-white">
          {HANDOFF_CONDITIONS.map((opt) => (
            <div key={opt.id} className="p-4">
              <Toggle
                checked={Boolean(flags[opt.id])}
                onChange={(v) => setFlag(opt.id, v)}
                disabled={!canEdit || isLoading}
                label={opt.label}
                description={opt.description}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            label="Güven Eşiği (%)"
            hint="Bu değerin altında aktarım yapılır."
            htmlFor="confidence"
          >
            <Input
              id="confidence"
              type="number"
              min={0}
              max={100}
              placeholder="Örn. 60"
              disabled={!canEdit || isLoading}
              value={confidence}
              onChange={(e) => setConfidence(e.target.value)}
            />
          </FormField>

          <FormField label="Hedef Ekip" htmlFor="target-team">
            <Select
              id="target-team"
              value={targetTeam}
              onChange={(e) => setTargetTeam(e.target.value)}
              disabled={!canEdit || isLoading}
            >
              <option value="" disabled>
                Ekip seçin
              </option>
              {queues.map((q) => (
                <option key={q.id} value={q.name}>
                  {q.name}
                </option>
              ))}
            </Select>
          </FormField>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-700">
              Özel Kurallar
            </h4>
            {canEdit && !isAdding && (
              <button
                type="button"
                onClick={() => setIsAdding(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                <Plus className="h-4 w-4" />
                Kural Ekle
              </button>
            )}
          </div>

          {/* Inline Add Rule Form */}
          {isAdding && (
            <form onSubmit={handleAddRule} className="mb-3 space-y-3 rounded-xl border border-slate-200 p-4 bg-slate-50/50 animate-in fade-in duration-250">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Koşul</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn. Kullanıcı iade dediğinde"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Hedef Ekip</label>
                  <select
                    required
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="" disabled>Ekip seçin</option>
                    {queues.map((q) => (
                      <option key={q.id} value={q.name}>
                        {q.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-3 py-1.5 font-medium text-white hover:bg-primary-600 transition-colors"
                >
                  Ekle
                </button>
              </div>
            </form>
          )}

          {rules.length === 0 ? (
            <EmptyState
              icon={GitBranch}
              title="Özel kural yok"
              description="Koşula bağlı aktarım kuralları burada listelenir."
            />
          ) : (
            <ul className="space-y-2">
              {rules.map((rule) => (
                <li
                  key={rule.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-2 bg-white"
                >
                  <div className="min-w-0 flex-1 flex items-center">
                    <span className="text-slate-700 text-sm font-medium">{rule.condition}</span>
                    <span className="ml-2 font-mono text-xs text-slate-400">
                      → {rule.target}
                    </span>
                  </div>
                  {canEdit && (
                    <button
                      type="button"
                      onClick={() => handleDeleteRule(rule.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      aria-label="Kuralı Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
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
    </StudioSection>
  );
}
