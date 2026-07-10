import StudioSection from "../StudioSection";
import FormField from "../../../../shared/components/ui/FormField";
import Input from "../../../../shared/components/ui/Input";
import Textarea from "../../../../shared/components/ui/Textarea";

/**
 * InstructionsSection — the agent's behavior instructions and canned messages.
 */
export default function InstructionsSection({ canEdit, onSave }) {
  return (
    <StudioSection
      title="Talimatlar"
      description="Asistanın nasıl davranacağını belirleyen talimatları yazın."
      canEdit={canEdit}
      onSave={onSave}
    >
      <div className="max-w-2xl space-y-5">
        <FormField
          label="Sistem Talimatları"
          hint="Asistanın rolünü, sınırlarını ve yanıt tarzını tanımlayın."
          htmlFor="instructions"
        >
          <Textarea
            id="instructions"
            rows={8}
            placeholder="Örn. Sen bir müşteri destek asistanısın. Kibar ve yardımsever bir dille yanıt ver..."
            disabled={!canEdit}
          />
        </FormField>

        <FormField label="Karşılama Mesajı" htmlFor="greeting">
          <Textarea
            id="greeting"
            rows={2}
            placeholder="Örn. Merhaba! Size nasıl yardımcı olabilirim?"
            disabled={!canEdit}
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
            disabled={!canEdit}
          />
        </FormField>
      </div>
    </StudioSection>
  );
}
