import { useState, useEffect } from "react";

import StudioSection from "../StudioSection";
import FormField from "../../../../shared/components/ui/FormField";
import Textarea from "../../../../shared/components/ui/Textarea";
import { useUpdateAiAgentMutation } from "../../../../services/api";
import { useToast } from "../../../../shared/components/ui/Toast";

/**
 * InstructionsSection — behavioral rules & canned messages.
 */
export default function InstructionsSection({ canEdit, agent }) {
  const { showToast } = useToast();
  const [instructions, setInstructions] = useState("");
  const [greeting, setGreeting] = useState("");
  const [fallback, setFallback] = useState("");

  const [updateAiAgent, { isLoading }] = useUpdateAiAgentMutation();

  // Sync state with selected agent
  useEffect(() => {
    if (agent) {
      setInstructions(agent.instructions || "");
      setGreeting(agent.greeting || "");
      setFallback(agent.fallback || "");
    }
  }, [agent]);

  const handleSave = async () => {
    if (!agent) return;
    try {
      await updateAiAgent({
        id: agent.id,
        instructions,
        greeting,
        fallback,
      }).unwrap();
      showToast("Talimatlar başarıyla kaydedildi.", "success");
    } catch (err) {
      showToast("Ayarlar kaydedilirken hata oluştu.", "error");
      console.error("Failed to update instructions:", err);
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
      title="Talimatlar"
      description="Asistanınızın nasıl davranacağını, konuşacağını ve yanıtlayacağını tanımlayın."
      canEdit={canEdit}
      onSave={handleSave}
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
            disabled={!canEdit || isLoading}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
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
            disabled={!canEdit || isLoading}
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
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
            disabled={!canEdit || isLoading}
            value={fallback}
            onChange={(e) => setFallback(e.target.value)}
          />
        </FormField>
      </div>
    </StudioSection>
  );
}
