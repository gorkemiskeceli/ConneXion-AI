import { useState, useEffect } from "react";

import StudioSection from "../StudioSection";
import FormField from "../../../../shared/components/ui/FormField";
import Input from "../../../../shared/components/ui/Input";
import Textarea from "../../../../shared/components/ui/Textarea";
import Select from "../../../../shared/components/ui/Select";
import Toggle from "../../../../shared/components/ui/Toggle";
import { LANGUAGE_OPTIONS, TONE_OPTIONS } from "../../constants/aiStudioConfig";
import { useUpdateAiAgentMutation } from "../../../../services/api";
import { useToast } from "../../../../shared/components/ui/Toast";

/**
 * GeneralSection — main settings (identity, active state).
 */
export default function GeneralSection({ canEdit, agent }) {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("tr");
  const [tone, setTone] = useState("friendly");
  const [active, setActive] = useState(false);

  const [updateAiAgent, { isLoading }] = useUpdateAiAgentMutation();

  // Sync state with selected agent
  useEffect(() => {
    if (agent) {
      setName(agent.name || "");
      setDescription(agent.description || "");
      setLanguage(agent.language || "tr");
      setTone(agent.tone || "friendly");
      setActive(agent.active || false);
    }
  }, [agent]);

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
      showToast("Genel ayarlar başarıyla kaydedildi.", "success");
    } catch (err) {
      showToast("Ayarlar kaydedilirken hata oluştu.", "error");
      console.error("Failed to update AI Agent:", err);
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
      title="Genel Ayarlar"
      description="Asistanın kimliğini, dil ayarlarını ve durumunu yönetin."
      canEdit={canEdit}
      onSave={handleSave}
    >
      <div className="max-w-2xl space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Asistan Adı" htmlFor="agent-name">
            <Input
              id="agent-name"
              placeholder="Örn. Destek Asistanı"
              disabled={!canEdit || isLoading}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>

          <FormField label="Durum" htmlFor="agent-status" hint="Asistanı etkinleştirin.">
            <div className="pt-2">
              <Toggle
                id="agent-status"
                label={active ? "Asistan Etkin" : "Asistan Devre Dışı"}
                checked={active}
                onChange={setActive}
                disabled={!canEdit || isLoading}
              />
            </div>
          </FormField>
        </div>

        <FormField label="Açıklama" htmlFor="agent-desc">
          <Textarea
            id="agent-desc"
            placeholder="Asistanın ne işe yaradığını kısaca açıklayın..."
            rows={3}
            disabled={!canEdit || isLoading}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Dil" htmlFor="agent-lang">
            <Select
              id="agent-lang"
              disabled={!canEdit || isLoading}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANGUAGE_OPTIONS.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Ton" htmlFor="agent-tone">
            <Select
              id="agent-tone"
              disabled={!canEdit || isLoading}
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              {TONE_OPTIONS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </Select>
          </FormField>
        </div>
      </div>
    </StudioSection>
  );
}
