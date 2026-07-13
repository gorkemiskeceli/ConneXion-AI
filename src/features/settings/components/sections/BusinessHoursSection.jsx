import { useState } from "react";

import SettingsSection from "../SettingsSection";
import FormField from "../../../../shared/components/ui/FormField";
import Select from "../../../../shared/components/ui/Select";
import Toggle from "../../../../shared/components/ui/Toggle";
import { WEEK_DAYS } from "../../constants/settingsConfig";

/**
 * BusinessHoursSection — weekly availability schedule.
 */
export default function BusinessHoursSection({ canEdit, onSave }) {
  const [open, setOpen] = useState({});
  const setDay = (id, value) => setOpen((prev) => ({ ...prev, [id]: value }));

  return (
    <SettingsSection
      title="Çalışma Saatleri"
      description="Ekibinizin destek verdiği saatleri belirleyin."
      canEdit={canEdit}
      onSave={onSave}
    >
      <div className="max-w-2xl space-y-5">
        <FormField label="Zaman Dilimi" htmlFor="bh-tz">
          <Select id="bh-tz" defaultValue="" disabled={!canEdit}>
            <option value="" disabled>
              Zaman dilimi seçin
            </option>
            <option value="Europe/Istanbul">İstanbul (GMT+3)</option>
            <option value="Europe/London">Londra (GMT+0)</option>
            <option value="America/New_York">New York (GMT-5)</option>
          </Select>
        </FormField>

        <div className="divide-y divide-slate-100 rounded-xl border border-slate-100">
          {WEEK_DAYS.map((day) => {
            const isOpen = Boolean(open[day.id]);
            return (
              <div
                key={day.id}
                className="flex items-center justify-between gap-4 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <Toggle
                    checked={isOpen}
                    onChange={(v) => setDay(day.id, v)}
                    disabled={!canEdit}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {day.label}
                  </span>
                </div>

                {isOpen ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      disabled={!canEdit}
                      className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slate-700 focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:bg-slate-50"
                    />
                    <span className="text-slate-400">–</span>
                    <input
                      type="time"
                      disabled={!canEdit}
                      className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slate-700 focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:bg-slate-50"
                    />
                  </div>
                ) : (
                  <span className="text-sm text-slate-400">Kapalı</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SettingsSection>
  );
}
