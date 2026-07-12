import { useState } from "react";

import StudioSection from "../StudioSection";
import FormField from "../../../../shared/components/ui/FormField";
import Textarea from "../../../../shared/components/ui/Textarea";
import { useToast } from "../../../../shared/components/ui/Toast";

/**
 * InstructionsSection — behavioral rules & canned messages.
 */
export default function InstructionsSection({ canEdit, agent, onChange, onSave, onReset }) {
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  if (!agent) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-slate-400">
        Yükleniyor veya seçili asistan bulunamadı...
      </div>
    );
  }

  const customInstructions = agent.customInstructions || agent.instructions || "";
  const greeting = agent.greeting || "";
  const fallback = agent.fallback || "";

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave({
        instructions: customInstructions, // for legacy fallback
        customInstructions,
        greeting,
        fallback,
      });
      showToast("Talimatlar başarıyla kaydedildi.", "success");
    } catch (err) {
      showToast("Ayarlar kaydedilirken hata oluştu.", "error");
      console.error("Failed to update instructions:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <StudioSection
      title="Talimatlar"
      description="Asistanınızın nasıl davranacağını, konuşacağını ve yanıtlayacağını tanımlayın."
      canEdit={canEdit}
      onSave={handleSave}
      onReset={onReset}
    >
      <div className="max-w-2xl space-y-5">

        <FormField
          label="Sistem Talimatları"
          hint="Karakterini, kurallarını ve yanıt şablonlarını buraya yazın."
          htmlFor="sys-instructions"
        >
          <Textarea
            id="sys-instructions"
            placeholder="Sen bir müşteri destek temsilcisisin. Kibar ol..."
            rows={6}
            disabled={!canEdit || isSaving}
            value={customInstructions}
            onChange={(e) => onChange({ customInstructions: e.target.value })}
          />
        </FormField>

        <FormField
          label="Karşılama Mesajı"
          hint="Sohbet başladığında gönderilen ilk mesaj."
          htmlFor="greeting-msg"
        >
          <Textarea
            id="greeting-msg"
            placeholder="Merhaba! Size bugün nasıl yardımcı olabilirim?"
            rows={3}
            disabled={!canEdit || isSaving}
            value={greeting}
            onChange={(e) => onChange({ greeting: e.target.value })}
          />
        </FormField>

        <FormField
          label="Yedek Mesaj (Fallback)"
          hint="Sorunun cevabı bulunamadığında veya hata oluştuğunda gönderilecek mesaj."
          htmlFor="fallback-msg"
        >
          <Textarea
            id="fallback-msg"
            placeholder="Üzgünüm, bu konuda yeterli bilgiye sahip değilim. Sizi hemen canlı bir temsilciye aktarıyorum."
            rows={3}
            disabled={!canEdit || isSaving}
            value={fallback}
            onChange={(e) => onChange({ fallback: e.target.value })}
          />
        </FormField>
      </div>
    </StudioSection>
  );
}
