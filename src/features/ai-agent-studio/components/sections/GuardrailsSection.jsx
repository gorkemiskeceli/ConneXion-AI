import { useState, useEffect } from "react";

import StudioSection from "../StudioSection";
import FormField from "../../../../shared/components/ui/FormField";
import Textarea from "../../../../shared/components/ui/Textarea";
import Input from "../../../../shared/components/ui/Input";
import Toggle from "../../../../shared/components/ui/Toggle";
import { GUARDRAIL_OPTIONS } from "../../constants/aiStudioConfig";
import { useUpdateAiAgentMutation } from "../../../../services/api";

/**
 * GuardrailsSection — safety limits for the agent.
 */
export default function GuardrailsSection({ canEdit, agent }) {
  const [flags, setFlags] = useState({});
  const [blockedTerms, setBlockedTerms] = useState("");
  const [maxLength, setMaxLength] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [updateAiAgent, { isLoading, isSuccess, isError }] = useUpdateAiAgentMutation();

  // Sync state with incoming agent prop
  useEffect(() => {
    if (agent) {
      setFlags(agent.guardrailFlags || {});
      setBlockedTerms(agent.blockedTerms || "");
      setMaxLength(agent.maxLength || "");
    }
  }, [agent]);

  // Show success alert temporarily
  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

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
    } catch (err) {
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
    >
      <div className="max-w-2xl space-y-5">
        {/* Success Alert Banner */}
        {showSuccess && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-sm text-emerald-800 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Güvenlik sınırları (Guardrails) başarıyla kaydedildi!</span>
            </div>
          </div>
        )}

        {/* Error Alert Banner */}
        {isError && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-sm text-rose-800 animate-in fade-in">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-rose-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-medium">Kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.</span>
            </div>
          </div>
        )}

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

