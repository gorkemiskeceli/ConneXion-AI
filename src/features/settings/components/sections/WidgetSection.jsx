import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, X, ImagePlus, Trash2 } from "lucide-react";

import SettingsSection from "../SettingsSection";
import WidgetPreview from "../WidgetPreview";
import FormField from "../../../../shared/components/ui/FormField";
import Input from "../../../../shared/components/ui/Input";
import Textarea from "../../../../shared/components/ui/Textarea";
import Select from "../../../../shared/components/ui/Select";
import Toggle from "../../../../shared/components/ui/Toggle";
import { WIDGET_POSITIONS } from "../../constants/settingsConfig";
import { useToast } from "../../../../shared/components/ui/Toast";
import { setCustomLogo } from "../../../../homepage/store/uiSlice";
import { useGetWidgetSettingsQuery, useUpdateWidgetSettingsMutation } from "../../../../services/api";

/**
 * WidgetSection — configure the embedded website chat widget.
 */
export default function WidgetSection({ canEdit, onSave }) {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const customLogo = useSelector((state) => state.ui.customLogo);
  const fileInputRef = useRef(null);

  const { data: settings } = useGetWidgetSettingsQuery();
  const [updateWidgetSettings] = useUpdateWidgetSettingsMutation();

  const [brandColor, setBrandColor] = useState("#5B63F0");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [questions, setQuestions] = useState([""]);
  const [showHours, setShowHours] = useState(false);
  const [position, setPosition] = useState("bottom-right");

  // Sync with fetched data
  useEffect(() => {
    if (settings) {
      setBrandColor(settings.brandColor || "#5B63F0");
      setWelcomeMessage(settings.welcomeMessage || "");
      setQuestions(settings.suggestedQuestions && settings.suggestedQuestions.length > 0 ? settings.suggestedQuestions : [""]);
      setShowHours(settings.showBusinessHours || false);
      setPosition(settings.position || "bottom-right");
      if (settings.logo) {
        dispatch(setCustomLogo(settings.logo));
      }
    }
  }, [settings, dispatch]);

  const setQuestion = (i, value) =>
    setQuestions((prev) => prev.map((q, idx) => (idx === i ? value : q)));
  const addQuestion = () => setQuestions((prev) => [...prev, ""]);
  const removeQuestion = (i) =>
    setQuestions((prev) => prev.filter((_, idx) => idx !== i));

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setCustomLogo(reader.result));
        showToast("Logo başarıyla yüklendi.", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    dispatch(setCustomLogo(null));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    showToast("Logo kaldırıldı.", "info");
  };

  const handleSave = async () => {
    try {
      await updateWidgetSettings({
        logo: customLogo,
        brandColor,
        welcomeMessage,
        suggestedQuestions: questions.filter(q => q.trim()),
        showBusinessHours: showHours,
        position
      }).unwrap();
      showToast("Widget ayarları başarıyla kaydedildi.", "success");
      if (onSave) onSave();
    } catch (err) {
      showToast("Ayarlar kaydedilirken hata oluştu.", "error");
      console.error("Failed to save widget settings:", err);
    }
  };

  return (
    <SettingsSection
      title="Widget Yapılandırması"
      description="Web sitenize gömülü sohbet widget'ını özelleştirin."
      canEdit={canEdit}
      onSave={handleSave}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        {/* Form */}
        <div className="max-w-xl space-y-5">
          <FormField label="Logo">
            <div className="flex items-center gap-4">
              <button
                type="button"
                disabled={!canEdit}
                onClick={() => fileInputRef.current?.click()}
                className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 text-slate-400 transition-colors hover:border-primary-200 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {customLogo ? (
                  <img src={customLogo} alt="Logo" className="h-full w-full object-contain p-1" />
                ) : (
                  <ImagePlus className="h-5 w-5" />
                )}
              </button>

              {customLogo && canEdit && (
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Logoyu Kaldır
                </button>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleLogoUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </FormField>

          <FormField label="Marka Rengi" htmlFor="brand-color">
            <div className="flex items-center gap-3">
              <input
                id="brand-color"
                type="color"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                disabled={!canEdit}
                className="h-10 w-14 cursor-pointer rounded-lg border border-slate-200 bg-white disabled:cursor-not-allowed"
              />
              <Input
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                disabled={!canEdit}
                className="max-w-[140px] font-mono"
              />
            </div>
          </FormField>

          <FormField label="Karşılama Mesajı" htmlFor="welcome">
            <Textarea
              id="welcome"
              rows={2}
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              placeholder="Örn. Merhaba! Size nasıl yardımcı olabilirim?"
              disabled={!canEdit}
            />
          </FormField>

          <FormField label="Önerilen Sorular">
            <div className="space-y-2">
              {questions.map((q, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    value={q}
                    onChange={(e) => setQuestion(i, e.target.value)}
                    placeholder="Örn. Siparişim nerede?"
                    disabled={!canEdit}
                  />
                  {canEdit && questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(i)}
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                      aria-label="Kaldır"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              {canEdit && (
                <button
                  type="button"
                  onClick={addQuestion}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  <Plus className="h-4 w-4" />
                  Soru Ekle
                </button>
              )}
            </div>
          </FormField>

          <FormField label="Widget Konumu" htmlFor="position">
            <Select 
              id="position" 
              value={position} 
              onChange={(e) => setPosition(e.target.value)} 
              disabled={!canEdit}
            >
              {WIDGET_POSITIONS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </Select>
          </FormField>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <Toggle
              checked={showHours}
              onChange={setShowHours}
              disabled={!canEdit}
              label="Çalışma saatlerini göster"
              description="Widget üzerinde müsaitlik durumunu görüntüle."
            />
          </div>
        </div>

        {/* Live preview */}
        <WidgetPreview
          brandColor={brandColor}
          welcomeMessage={welcomeMessage}
          suggestedQuestions={questions}
        />
      </div>
    </SettingsSection>
  );
}
