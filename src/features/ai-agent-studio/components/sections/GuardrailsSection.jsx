import { useState } from "react";

import StudioSection from "../StudioSection";
import FormField from "../../../../shared/components/ui/FormField";
import Textarea from "../../../../shared/components/ui/Textarea";
import Input from "../../../../shared/components/ui/Input";
import Toggle from "../../../../shared/components/ui/Toggle";
import { GUARDRAIL_OPTIONS } from "../../constants/aiStudioConfig";
import { useToast } from "../../../../shared/components/ui/Toast";

/**
 * GuardrailsSection — safety limits for the agent.
 */
export default function GuardrailsSection({ canEdit, agent, onChange, onSave, onReset }) {
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  if (!agent) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-slate-400">
        Yükleniyor veya seçili asistan bulunamadı...
      </div>
    );
  }

  const flags = agent.guardrailFlags || {};
  const blockedTerms = agent.blockedTerms || "";
  const maxLength = agent.maxLength || "";

  const setFlag = (id, value) => {
    onChange({
      guardrailFlags: {
        ...flags,
        [id]: value,
      },
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave({
        guardrailFlags: flags,
        blockedTerms,
        maxLength: maxLength !== "" ? Number(maxLength) : "",
      });
      showToast("Güvenlik sınırları (Guardrails) başarıyla kaydedildi.", "success");
    } catch (err) {
      showToast("Ayarlar kaydedilirken hata oluştu.", "error");
      console.error("Failed to save guardrails config:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <StudioSection
      title="Guardrails"
      description="Asistanın uyması gereken güvenlik ve içerik sınırlarını belirleyin."
      canEdit={canEdit}
      onSave={handleSave}
      onReset={onReset}
    >
      <div className="max-w-2xl space-y-5">
        <div className="divide-y divide-slate-100 rounded-xl border border-slate-100 bg-white">
          {GUARDRAIL_OPTIONS.map((opt) => (
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

        <FormField
          label="Yasaklı Konular / Kelimeler"
          hint="Virgülle ayırarak girin."
          htmlFor="blocked-terms"
        >
          <Textarea
            id="blocked-terms"
            rows={3}
            placeholder="Örn. rakip firmalar, fiyat pazarlığı, ..."
            disabled={!canEdit || isSaving}
            value={blockedTerms}
            onChange={(e) => onChange({ blockedTerms: e.target.value })}
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
            disabled={!canEdit || isSaving}
            value={maxLength}
            onChange={(e) => onChange({ maxLength: e.target.value })}
          />
        </FormField>
      </div>
    </StudioSection>
  );
}
