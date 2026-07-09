import { useState, useEffect } from "react";

import StudioSection from "../StudioSection";
import FormField from "../../../../shared/components/ui/FormField";
import Input from "../../../../shared/components/ui/Input";
import Textarea from "../../../../shared/components/ui/Textarea";
import { useUpdateAiAgentMutation } from "../../../../services/api";

/**
 * InstructionsSection — the agent's behavior instructions and canned messages.
 */
export default function InstructionsSection({ canEdit, agent }) {
  const [instructions, setInstructions] = useState("");
  const [greeting, setGreeting] = useState("");
  const [fallback, setFallback] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [updateAiAgent, { isLoading, isSuccess, isError }] = useUpdateAiAgentMutation();

  // Sync state with incoming agent prop
  useEffect(() => {
    if (agent) {
      setInstructions(agent.instructions || "");
      setGreeting(agent.greeting || "");
      setFallback(agent.fallback || "");
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
        instructions,
        greeting,
        fallback,
      }).unwrap();
    } catch (err) {
      console.error("Failed to save instructions config:", err);
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
      description="Asistanın nasıl davranacağını belirleyen talimatları yazın."
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
              <span className="font-medium">Talimatlar başarıyla kaydedildi!</span>
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

        <FormField
          label="Sistem Talimatları"
          hint="Asistanın rolünü, sınırlarını ve yanıt tarzını tanımlayın."
          htmlFor="instructions"
        >
          <Textarea
            id="instructions"
            rows={8}
            placeholder="Örn. Sen bir müşteri destek asistanısın. Kibar ve yardımsever bir dille yanıt ver..."
            disabled={!canEdit || isLoading}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </FormField>

        <FormField label="Karşılama Mesajı" htmlFor="greeting">
          <Textarea
            id="greeting"
            rows={2}
            placeholder="Örn. Merhaba! Size nasıl yardımcı olabilirim?"
            disabled={!canEdit || isLoading}
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
          />
        </FormField>

        <FormField
          label="Yedek (Fallback) Mesajı"
          hint="Asistan yanıt üretemediğinde gösterilir."
          htmlFor="fallback"
        >
          <Input
            id="fallback"
            placeholder="Örn. Bu konuda bir temsilciye aktarıyorum."
            disabled={!canEdit || isLoading}
            value={fallback}
            onChange={(e) => setFallback(e.target.value)}
          />
        </FormField>
      </div>
    </StudioSection>
  );
}

