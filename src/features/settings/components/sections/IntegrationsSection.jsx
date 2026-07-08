import { Puzzle } from "lucide-react";

import SettingsSection from "../SettingsSection";
import Badge from "../../../../shared/components/ui/Badge";
import { INTEGRATION_PLACEHOLDERS } from "../../constants/settingsConfig";

/**
 * IntegrationsSection — planned third-party integrations.
 * These are future-ready placeholders (disabled, "Yakında").
 */
export default function IntegrationsSection() {
  return (
    <SettingsSection
      title="Entegrasyonlar"
      description="Üçüncü taraf servisleri bağlayın. Yeni entegrasyonlar yakında."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {INTEGRATION_PLACEHOLDERS.map((integration) => (
          <div
            key={integration.id}
            className="flex items-start justify-between gap-3 rounded-xl border border-slate-100 p-4"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                <Puzzle className="h-4 w-4" />
              </span>
              <div>
                <h4 className="font-heading text-sm font-bold text-slate-900">
                  {integration.name}
                </h4>
                <p className="mt-0.5 text-xs text-slate-500">
                  {integration.description}
                </p>
              </div>
            </div>
            <Badge variant="neutral">Yakında</Badge>
          </div>
        ))}
      </div>
    </SettingsSection>
  );
}
