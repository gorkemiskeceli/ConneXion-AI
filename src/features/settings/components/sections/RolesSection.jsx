import { Shield } from "lucide-react";

import SettingsSection from "../SettingsSection";
import { ROLES_INFO } from "../../constants/settingsConfig";
import { ROLE_LABELS } from "../../../../constants/navigation";

/**
 * RolesSection — overview of the predefined roles (RBAC is fixed).
 */
export default function RolesSection() {
  return (
    <SettingsSection
      title="Roller"
      description="Platform rollerini ve sorumluluklarını inceleyin."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ROLES_INFO.map((role) => (
          <div
            key={role.id}
            className="rounded-xl border border-slate-100 p-4"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <Shield className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <h4 className="font-heading text-sm font-bold text-slate-900">
                {ROLE_LABELS[role.id]}
              </h4>
            </div>
            <p className="mt-2 text-sm text-slate-500">{role.description}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs text-slate-400">
        Roller sistem tarafından tanımlanmıştır. Özel rol izinleri ileride
        eklenebilir.
      </p>
    </SettingsSection>
  );
}
