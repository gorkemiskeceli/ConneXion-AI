import { useState } from "react";
import { Plus, GitBranch, Trash2 } from "lucide-react";

import StudioSection from "../StudioSection";
import FormField from "../../../../shared/components/ui/FormField";
import Input from "../../../../shared/components/ui/Input";
import Select from "../../../../shared/components/ui/Select";
import Toggle from "../../../../shared/components/ui/Toggle";
import EmptyState from "../../../../shared/components/ui/EmptyState";
import { HANDOFF_CONDITIONS } from "../../constants/aiStudioConfig";
import { useAddHandoffRuleMutation, useDeleteHandoffRuleMutation } from "../../../../services/api";
import { useToast } from "../../../../shared/components/ui/Toast";

/**
 * HandoffRulesSection — when and how to transfer to a human agent.
 * rules: { id, condition, target }
 */
export default function HandoffRulesSection({ canEdit, rules = [], agent, queues = [], onChange, onSave, onReset }) {
  const { showToast } = useToast();
  const [confirmData, setConfirmData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Custom rule form state
  const [isAdding, setIsAdding] = useState(false);
  const [condition, setCondition] = useState("");
  const [target, setTarget] = useState("");

  const [addHandoffRule] = useAddHandoffRuleMutation();
  const [deleteHandoffRule] = useDeleteHandoffRuleMutation();

  if (!agent) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-slate-400">
        Yükleniyor veya seçili asistan bulunamadı...
      </div>
    );
  }

  const flags = agent.handoffFlags || {};
  const confidence = agent.handoffConfidence || "";
  const targetTeam = agent.handoffTargetTeam || "";

  const setFlag = (id, value) => {
    onChange({
      handoffFlags: {
        ...flags,
        [id]: value,
      },
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave({
        handoffFlags: flags,
        handoffConfidence: confidence !== "" ? Number(confidence) : "",
        handoffTargetTeam: targetTeam,
      });
      showToast("Aktarım ayarları başarıyla kaydedildi.", "success");
    } catch (err) {
      showToast("Ayarlar kaydedilirken hata oluştu.", "error");
      console.error("Failed to save handoff rules config:", err);
    } finally {
      setIsSaving(false);
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
                disabled={!canEdit || isSaving}
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
              disabled={!canEdit || isSaving}
              value={confidence}
              onChange={(e) => onChange({ handoffConfidence: e.target.value })}
            />
          </FormField>

          <FormField label="Hedef Ekip" htmlFor="target-team">
            <Select
              id="target-team"
              value={targetTeam}
              onChange={(e) => onChange({ handoffTargetTeam: e.target.value })}
              disabled={!canEdit || isSaving}
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
                  className="rounded-lg bg-primary px-3 py-1.5 font-semibold text-white hover:bg-primary-600 transition-colors"
                >
                  Ekle
                </button>
              </div>
            </form>
          )}

          {rules.length === 0 ? (
            <EmptyState
              icon={GitBranch}
              title="Özel kural bulunamadı"
              description="Belirli durumlar veya tetikleyiciler için özel insan temsilciye aktarım kuralları oluşturun."
            />
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50/50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <th className="px-4 py-2">Koşul</th>
                    <th className="px-4 py-2">Hedef Ekip</th>
                    {canEdit && <th className="px-4 py-2 text-right">İşlemler</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                  {rules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-slate-50/30">
                      <td className="px-4 py-3 font-medium">{rule.condition}</td>
                      <td className="px-4 py-3">{rule.target}</td>
                      {canEdit && (
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteRule(rule.id)}
                            className="text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog overlay */}
      {confirmData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-in scale-in duration-200">
            <h3 className="text-sm font-bold text-slate-800 mb-2">Emin misiniz?</h3>
            <p className="text-xs text-slate-500 mb-5">{confirmData.message}</p>
            <div className="flex justify-end gap-3 text-xs">
              <button
                type="button"
                onClick={() => setConfirmData(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={async () => {
                  await confirmData.onConfirm();
                  setConfirmData(null);
                }}
                className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 transition-colors"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </StudioSection>
  );
}
