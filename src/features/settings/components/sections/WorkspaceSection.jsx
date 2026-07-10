import { ImagePlus } from "lucide-react";

import SettingsSection from "../SettingsSection";
import FormField from "../../../../shared/components/ui/FormField";
import Input from "../../../../shared/components/ui/Input";
import Select from "../../../../shared/components/ui/Select";
import { useToast } from "../../../../shared/components/ui/Toast";

/**
 * WorkspaceSection — general workspace configuration.
 */
export default function WorkspaceSection({ canEdit, onSave }) {
  const { showToast } = useToast();

  return (
    <SettingsSection
      title="Workspace"
      description="Workspace kimliğinizi ve temel ayarlarınızı yapılandırın."
      canEdit={canEdit}
      onSave={onSave}
    >
      <div className="max-w-2xl space-y-5">
        <FormField label="Logo">
          <button
            type="button"
            disabled={!canEdit}
            onClick={() => showToast("Logo yükleme işlevi simüle edildi.", "info")}
            className="flex h-20 w-20 items-center justify-center rounded-xl border border-dashed border-slate-300 text-slate-400 transition-colors hover:border-primary-200 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ImagePlus className="h-5 w-5" />
          </button>
        </FormField>

        <FormField label="Workspace Adı" htmlFor="ws-name">
          <Input id="ws-name" placeholder="Örn. Acme Destek" disabled={!canEdit} />
        </FormField>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Sektör" htmlFor="ws-industry">
            <Select id="ws-industry" defaultValue="" disabled={!canEdit}>
              <option value="" disabled>
                Sektör seçin
              </option>
              <option value="ecommerce">E-ticaret</option>
              <option value="saas">SaaS</option>
              <option value="healthcare">Sağlık</option>
              <option value="education">Eğitim</option>
              <option value="other">Diğer</option>
            </Select>
          </FormField>

          <FormField label="Zaman Dilimi" htmlFor="ws-tz">
            <Select id="ws-tz" defaultValue="" disabled={!canEdit}>
              <option value="" disabled>
                Zaman dilimi seçin
              </option>
              <option value="Europe/Istanbul">İstanbul (GMT+3)</option>
              <option value="Europe/London">Londra (GMT+0)</option>
              <option value="America/New_York">New York (GMT-5)</option>
            </Select>
          </FormField>
        </div>

        <FormField label="Varsayılan Dil" htmlFor="ws-lang">
          <Select id="ws-lang" defaultValue="" disabled={!canEdit}>
            <option value="" disabled>
              Dil seçin
            </option>
            <option value="tr">Türkçe</option>
            <option value="en">İngilizce</option>
          </Select>
        </FormField>
      </div>
    </SettingsSection>
  );
}
