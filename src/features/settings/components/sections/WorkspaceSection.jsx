import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImagePlus, Trash2 } from "lucide-react";

import SettingsSection from "../SettingsSection";
import FormField from "../../../../shared/components/ui/FormField";
import Input from "../../../../shared/components/ui/Input";
import Select from "../../../../shared/components/ui/Select";
import { setCustomLogo } from "../../../../homepage/store/uiSlice";

/**
 * WorkspaceSection — general workspace configuration.
 */
export default function WorkspaceSection({ canEdit }) {
  const dispatch = useDispatch();
  const customLogo = useSelector((state) => state.ui.customLogo);
  const fileInputRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setCustomLogo(reader.result));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    dispatch(setCustomLogo(null));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <SettingsSection
      title="Workspace"
      description="Workspace kimliğinizi ve temel ayarlarınızı yapılandırın."
      canEdit={canEdit}
      onSave={() => {}}
    >
      <div className="max-w-2xl space-y-5">
        <FormField label="Logo">
          <div className="flex items-center gap-4">
            <button
              type="button"
              disabled={!canEdit}
              onClick={() => fileInputRef.current?.click()}
              className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 text-slate-400 transition-colors hover:border-primary-200 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
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
