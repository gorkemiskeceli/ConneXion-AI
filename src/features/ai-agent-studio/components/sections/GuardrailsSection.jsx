import { useState, useEffect } from "react";

import StudioSection from "../StudioSection";
import FormField from "../../../../shared/components/ui/FormField";
import Textarea from "../../../../shared/components/ui/Textarea";
import Input from "../../../../shared/components/ui/Input";
import Toggle from "../../../../shared/components/ui/Toggle";
import { GUARDRAIL_OPTIONS } from "../../constants/aiStudioConfig";
import { useUpdateAiAgentMutation } from "../../../../services/api";
import { useToast } from "../../../../shared/components/ui/Toast";

/**
 * GuardrailsSection — safety limits for the agent.
 */
export default function GuardrailsSection({ canEdit, agent, onReset }) {
  const { showToast } = useToast();
  const [flags, setFlags] = useState({});
  const [blockedTerms, setBlockedTerms] = useState("");
  const [maxLength, setMaxLength] = useState("");

  const [updateAiAgent, { isLoading }] = useUpdateAiAgentMutation();

  // Sync state with incoming agent prop
  useEffect(() => {
    if (agent) {
      setFlags(agent.guardrailFlags || {});
      setBlockedTerms(agent.blockedTerms || "");
      setMaxLength(agent.maxLength || "");
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
        guardrailFlags: flags,
        blockedTerms,
        maxLength: maxLength !== "" ? Number(maxLength) : "",
      }).unwrap();
      showToast("Güvenlik sınırları (Guardrails) başarıyla kaydedildi.", "success");
    } catch (err) {
      showToast("Ayarlar kaydedilirken hata oluştu.", "error");
      console.error("Failed to save guardrails config:", err);
    }
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
                disabled={!canEdit || isLoading}
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
            disabled={!canEdit || isLoading}
            value={blockedTerms}
            onChange={(e) => setBlockedTerms(e.target.value)}
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
            disabled={!canEdit || isLoading}
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value)}
          />
        </FormField>
      </div>
    </StudioSection>
  );
}
