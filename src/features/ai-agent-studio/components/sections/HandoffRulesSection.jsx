import { useState } from "react";
import { Plus, GitBranch } from "lucide-react";

import StudioSection from "../StudioSection";
import FormField from "../../../../shared/components/ui/FormField";
import Input from "../../../../shared/components/ui/Input";
import Select from "../../../../shared/components/ui/Select";
import Toggle from "../../../../shared/components/ui/Toggle";
import EmptyState from "../../../../shared/components/ui/EmptyState";
import { HANDOFF_CONDITIONS } from "../../constants/aiStudioConfig";

/**
 * HandoffRulesSection — when and how to transfer to a human agent.
 * rules: { id, condition, target }
 */
export default function HandoffRulesSection({ canEdit, rules = [], onSave }) {
  const [flags, setFlags] = useState({});
  const setFlag = (id, value) =>
    setFlags((prev) => ({ ...prev, [id]: value }));

  return (
    <StudioSection
      title="Aktarım Kuralları"
      description="Konuşmanın ne zaman bir temsilciye devredileceğini tanımlayın."
      canEdit={canEdit}
      onSave={onSave}
    >
      <div className="max-w-2xl space-y-5">
        <div className="divide-y divide-slate-100 rounded-xl border border-slate-100">
          {HANDOFF_CONDITIONS.map((opt) => (
            <div key={opt.id} className="p-4">
              <Toggle
                checked={Boolean(flags[opt.id])}
                onChange={(v) => setFlag(opt.id, v)}
                disabled={!canEdit}
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
              disabled={!canEdit}
            />
          </FormField>

          <FormField label="Hedef Ekip" htmlFor="target-team">
            <Select id="target-team" defaultValue="" disabled={!canEdit}>
              <option value="" disabled>
                Ekip seçin
              </option>
            </Select>
          </FormField>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-700">
              Özel Kurallar
            </h4>
            {canEdit && (
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                <Plus className="h-4 w-4" />
                Kural Ekle
              </button>
            )}
          </div>

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
                  className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3 text-sm"
                >
                  <span className="text-slate-700">{rule.condition}</span>
                  <span className="font-mono text-xs text-slate-400">
                    → {rule.target}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </StudioSection>
  );
}
