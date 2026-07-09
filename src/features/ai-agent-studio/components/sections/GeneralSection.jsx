import { useState, useEffect } from "react";

import StudioSection from "../StudioSection";
import FormField from "../../../../shared/components/ui/FormField";
import Input from "../../../../shared/components/ui/Input";
import Textarea from "../../../../shared/components/ui/Textarea";
import Select from "../../../../shared/components/ui/Select";
import Toggle from "../../../../shared/components/ui/Toggle";
import { LANGUAGE_OPTIONS, TONE_OPTIONS } from "../../constants/aiStudioConfig";
import { useUpdateAiAgentMutation } from "../../../../services/api";

/**
 * GeneralSection — agent name, description, language, tone and status.
 */
export default function GeneralSection({ canEdit, agent }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [tone, setTone] = useState("");
  const [active, setActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [updateAiAgent, { isLoading, isSuccess, isError }] = useUpdateAiAgentMutation();

  // Sync state with incoming agent prop
  useEffect(() => {
    if (agent) {
      setName(agent.name || "");
      setDescription(agent.description || "");
      setLanguage(agent.language || "");
      setTone(agent.tone || "");
      setActive(!!agent.active);
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

  const handleSave = async () => {
    if (!agent) return;
    try {
      await updateAiAgent({
        id: agent.id,
        name,
        description,
        language,
        tone,
        active,
        status: active ? "active" : "paused",
      }).unwrap();
    } catch (err) {
      console.error("Failed to save agent config:", err);
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
      title="Genel"
      description="Asistanın temel kimliğini ve davranış tonunu tanımlayın."
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
              <span className="font-medium">Değişiklikler başarıyla kaydedildi!</span>
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

        <FormField label="Asistan Adı" htmlFor="agent-name">
          <Input
            id="agent-name"
            placeholder="Örn. Destek Asistanı"
            disabled={!canEdit || isLoading}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormField>

        <FormField label="Açıklama" htmlFor="agent-desc">
          <Textarea
            id="agent-desc"
            rows={3}
            placeholder="Asistanın görevini kısaca açıklayın"
            disabled={!canEdit || isLoading}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Dil" htmlFor="agent-lang">
            <Select
              id="agent-lang"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={!canEdit || isLoading}
            >
              <option value="" disabled>
                Dil seçin
              </option>
              {LANGUAGE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Ton" htmlFor="agent-tone">
            <Select
              id="agent-tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              disabled={!canEdit || isLoading}
            >
              <option value="" disabled>
                Ton seçin
              </option>
              {TONE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </FormField>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
          <Toggle
            checked={active}
            onChange={setActive}
            disabled={!canEdit || isLoading}
            label="Asistanı etkinleştir"
            description="Etkin olduğunda asistan widget üzerinde yanıt verir."
          />
        </div>
      </div>
    </StudioSection>
  );
}

