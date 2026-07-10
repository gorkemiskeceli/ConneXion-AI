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
 * GeneralSection — main settings (identity, active state).
 */
export default function GeneralSection({ canEdit, agent, onReset }) {
  const [name, setName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [language, setLanguage] = useState("tr");
  const [tone, setTone] = useState("friendly");
  const [active, setActive] = useState(false);
  const [themeColor, setThemeColor] = useState("#5b63f0");
  const [themeTextColor, setThemeTextColor] = useState("#ffffff");
  const [showSuccess, setShowSuccess] = useState(false);

  const [updateAiAgent, { isLoading, isSuccess, isError }] = useUpdateAiAgentMutation();

  // Sync state with selected agent
  useEffect(() => {
    if (agent) {
      setName(agent.name || "");
      setCompanyDescription(agent.companyDescription || agent.description || "");
      setKeywords(agent.keywords ? agent.keywords.join(", ") : "");
      setLanguage(agent.language || "tr");
      setTone(agent.tone || "friendly");
      setActive(agent.active || false);
      setThemeColor(agent.themeColor || "#5b63f0");
      setThemeTextColor(agent.themeTextColor || "#ffffff");
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
        description: companyDescription, // for legacy fallback
        companyDescription,
        language,
        tone,
        active,
        status: active ? "active" : "paused",
        keywords: keywords.split(",").map(k => k.trim()).filter(Boolean),
        themeColor,
        themeTextColor,
      }).unwrap();
    } catch (err) {
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
      onReset={onReset}
    >
      <div className="max-w-2xl space-y-5">
        {/* Success Alert Banner */}
        {showSuccess && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-sm text-emerald-800 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Genel ayarlar başarıyla kaydedildi!</span>
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
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
          />
        </FormField>

        <FormField 
          label="Odak Anahtar Kelimeler" 
          hint="Asistanın odaklanmasını istediğiniz konular için anahtar kelimeleri virgülle ayırarak girin." 
          htmlFor="agent-keywords"
        >
          <Input
            id="agent-keywords"
            placeholder="Örn. iade, kargo, fiyat, indirim, teknik sorun"
            disabled={!canEdit || isLoading}
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
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

        <div className="border-t border-slate-100 pt-5">
          <h4 className="text-sm font-bold text-slate-900 mb-4">Görünüm Ayarları</h4>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Tema Rengi (Primary)" htmlFor="theme-color" hint="Widget buton ve başlık arka plan rengi.">
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="color"
                  id="theme-color"
                  disabled={!canEdit || isLoading}
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="h-10 w-20 cursor-pointer rounded-lg border border-slate-200 bg-white p-1 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <span className="text-xs font-mono uppercase text-slate-500">{themeColor}</span>
              </div>
            </FormField>

            <FormField label="Başlık ve Buton Yazı Rengi" htmlFor="theme-text-color" hint="Tema rengi üzerindeki yazı rengi.">
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="color"
                  id="theme-text-color"
                  disabled={!canEdit || isLoading}
                  value={themeTextColor}
                  onChange={(e) => setThemeTextColor(e.target.value)}
                  className="h-10 w-20 cursor-pointer rounded-lg border border-slate-200 bg-white p-1 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <span className="text-xs font-mono uppercase text-slate-500">{themeTextColor}</span>
              </div>
            </FormField>
          </div>
        </div>
      </div>
    </StudioSection>
  );
}
