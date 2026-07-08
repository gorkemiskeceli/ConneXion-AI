import { useState } from "react";

import SettingsSection from "../SettingsSection";
import Toggle from "../../../../shared/components/ui/Toggle";
import { NOTIFICATION_OPTIONS } from "../../constants/settingsConfig";

/**
 * NotificationsSection — per-event notification toggles.
 */
export default function NotificationsSection({ canEdit }) {
  const [flags, setFlags] = useState({});
  const setFlag = (id, value) => setFlags((prev) => ({ ...prev, [id]: value }));

  return (
    <SettingsSection
      title="Bildirimler"
      description="Hangi olaylarda bildirim almak istediğinizi seçin."
      canEdit={canEdit}
      onSave={() => {}}
    >
      <div className="max-w-2xl divide-y divide-slate-100 rounded-xl border border-slate-100">
        {NOTIFICATION_OPTIONS.map((opt) => (
          <div key={opt.id} className="p-4">
            <Toggle
              checked={Boolean(flags[opt.id])}
              onChange={(v) => setFlag(opt.id, v)}
              disabled={!canEdit}
              label={opt.label}
              description={opt.description}
            />
          </div>
        ))}
      </div>
    </SettingsSection>
  );
}
