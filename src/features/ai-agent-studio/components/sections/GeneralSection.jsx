import { useState } from "react";

import StudioSection from "../StudioSection";
import FormField from "../../../../shared/components/ui/FormField";
import Input from "../../../../shared/components/ui/Input";
import Textarea from "../../../../shared/components/ui/Textarea";
import Select from "../../../../shared/components/ui/Select";
import Toggle from "../../../../shared/components/ui/Toggle";
import { LANGUAGE_OPTIONS, TONE_OPTIONS } from "../../constants/aiStudioConfig";

/**
 * GeneralSection — agent name, description, language, tone and status.
 */
export default function GeneralSection({ canEdit }) {
  const [active, setActive] = useState(false);

  return (
    <StudioSection
      title="Genel"
      description="Asistanın temel kimliğini ve davranış tonunu tanımlayın."
      canEdit={canEdit}
      onSave={() => {}}
    >
      <div className="max-w-2xl space-y-5">
        <FormField label="Asistan Adı" htmlFor="agent-name">
          <Input
            id="agent-name"
            placeholder="Örn. Destek Asistanı"
            disabled={!canEdit}
          />
        </FormField>

        <FormField label="Açıklama" htmlFor="agent-desc">
          <Textarea
            id="agent-desc"
            rows={3}
            placeholder="Asistanın görevini kısaca açıklayın"
            disabled={!canEdit}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Dil" htmlFor="agent-lang">
            <Select id="agent-lang" defaultValue="" disabled={!canEdit}>
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
            <Select id="agent-tone" defaultValue="" disabled={!canEdit}>
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
            disabled={!canEdit}
            label="Asistanı etkinleştir"
            description="Etkin olduğunda asistan widget üzerinde yanıt verir."
          />
        </div>
      </div>
    </StudioSection>
  );
}
