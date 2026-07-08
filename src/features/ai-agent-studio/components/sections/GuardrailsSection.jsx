import { useState } from "react";

import StudioSection from "../StudioSection";
import FormField from "../../../../shared/components/ui/FormField";
import Textarea from "../../../../shared/components/ui/Textarea";
import Input from "../../../../shared/components/ui/Input";
import Toggle from "../../../../shared/components/ui/Toggle";
import { GUARDRAIL_OPTIONS } from "../../constants/aiStudioConfig";

/**
 * GuardrailsSection — safety limits for the agent.
 */
export default function GuardrailsSection({ canEdit }) {
  const [flags, setFlags] = useState({});

  const setFlag = (id, value) =>
    setFlags((prev) => ({ ...prev, [id]: value }));

  return (
    <StudioSection
      title="Guardrails"
      description="Asistanın uyması gereken güvenlik ve içerik sınırlarını belirleyin."
      canEdit={canEdit}
      onSave={() => {}}
    >
      <div className="max-w-2xl space-y-5">
        <div className="divide-y divide-slate-100 rounded-xl border border-slate-100">
          {GUARDRAIL_OPTIONS.map((opt) => (
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

        <FormField
          label="Yasaklı Konular / Kelimeler"
          hint="Virgülle ayırarak girin."
          htmlFor="blocked-terms"
        >
          <Textarea
            id="blocked-terms"
            rows={3}
            placeholder="Örn. rakip firmalar, fiyat pazarlığı, ..."
            disabled={!canEdit}
          />
        </FormField>

        <FormField
          label="Maksimum Yanıt Uzunluğu (karakter)"
          htmlFor="max-length"
        >
          <Input
            id="max-length"
            type="number"
            min={0}
            placeholder="Örn. 500"
            className="max-w-[200px]"
            disabled={!canEdit}
          />
        </FormField>
      </div>
    </StudioSection>
  );
}
