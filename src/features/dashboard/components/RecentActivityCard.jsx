import { useState } from "react";
import { History, Activity } from "lucide-react";

import SectionCard from "../../../shared/components/ui/SectionCard";
import EmptyState from "../../../shared/components/ui/EmptyState";
import PeriodFilter from "../../../shared/components/ui/PeriodFilter";
import { PATHS } from "../../../constants/paths";

/**
 * RecentActivityCard — "Son Etkinlikler".
 * A timeline of recent platform changes, events and logs.
 * item shape: { id, actor, action, target, timestamp }
 */
export default function RecentActivityCard({ items = [] }) {
  const [period, setPeriod] = useState("today");

  const filteredItems = items.filter((item) => {
    if (period === "today") {
      return item.timestamp?.includes("bugün");
    }
    if (period === "week") {
      return item.timestamp?.includes("bugün") || item.timestamp?.includes("dün");
    }
    return true;
  });

  return (
    <SectionCard
      title="Son Etkinlikler"
      headerRight={<PeriodFilter value={period} onChange={setPeriod} />}
      footerLink={{ label: "Tümünü Gör", to: PATHS.auditLogs }}
      bodyClassName="min-h-[260px]"
    >
      {filteredItems.length === 0 ? (
        <EmptyState
          icon={History}
          title="Kayıt bulunmuyor"
          description="Platformda yapılan değişiklikler ve olaylar burada listelenir."
        />
      ) : (
        <ul className="space-y-4">
          {filteredItems.map((item) => (
            <li key={item.id} className="flex gap-3">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <Activity className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">
                    {item.actor}
                  </span>{" "}
                  {item.action}{" "}
                  <span className="font-medium text-slate-900">
                    {item.target}
                  </span>
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-slate-400">
                  {item.timestamp}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>

  );
}
