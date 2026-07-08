import { Siren } from "lucide-react";

import SectionCard from "../../../shared/components/ui/SectionCard";
import EmptyState from "../../../shared/components/ui/EmptyState";
import Avatar from "../../../shared/components/ui/Avatar";
import Badge from "../../../shared/components/ui/Badge";
import { PATHS } from "../../../constants/paths";
import { PRIORITY_VARIANTS } from "../constants/dashboardConfig";

/**
 * UrgentQueueCard — "Acil Kuyruk".
 * item shape: { id, name, message, waitLabel, priority: "high"|"medium"|"low" }
 */
export default function UrgentQueueCard({ items = [] }) {
  return (
    <SectionCard
      title="Acil Kuyruk"
      headerRight={
        items.length > 0 ? (
          <Badge variant="danger">{items.length}</Badge>
        ) : null
      }
      footerLink={{ label: "Tümünü Gör", to: PATHS.inbox }}
      bodyClassName="min-h-[260px]"
    >
      {items.length === 0 ? (
        <EmptyState
          icon={Siren}
          title="Bekleyen acil kayıt yok"
          description="Öncelikli müşteri talepleri burada görünür."
        />
      ) : (
        <ul className="divide-y divide-slate-100">
          {items.map((item) => {
            const priority = PRIORITY_VARIANTS[item.priority] ?? PRIORITY_VARIANTS.low;
            return (
              <li key={item.id} className="flex items-start gap-3 py-3 first:pt-0">
                <Avatar name={item.name} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {item.name}
                    </p>
                    <span className="font-mono text-[11px] text-slate-400">
                      {item.waitLabel}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {item.message}
                  </p>
                </div>
                <Badge variant={priority.variant}>{priority.label}</Badge>
              </li>
            );
          })}
        </ul>
      )}
    </SectionCard>
  );
}
