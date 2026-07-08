import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";

import SectionCard from "../../../shared/components/ui/SectionCard";
import EmptyState from "../../../shared/components/ui/EmptyState";
import Avatar from "../../../shared/components/ui/Avatar";
import { PATHS } from "../../../constants/paths";
import { PRESENCE } from "../constants/dashboardConfig";

/**
 * ActiveAgentsCard — "Aktif Temsilciler" (replaces the active-channels panel).
 * item shape: { id, name, roleLabel, presence: "online"|"busy"|"offline" }
 */
export default function ActiveAgentsCard({ items = [] }) {
  return (
    <SectionCard
      title="Aktif Temsilciler"
      headerRight={
        <Link
          to={PATHS.team}
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Yönet
        </Link>
      }
      footerLink={{ label: "Tüm Temsilcileri Gör", to: PATHS.team }}
    >
      {items.length === 0 ? (
        <EmptyState
          icon={UserRound}
          title="Aktif temsilci yok"
          description="Çevrimiçi temsilciler ve durumları burada görünür."
        />
      ) : (
        <ul className="divide-y divide-slate-100">
          {items.map((item) => {
            const presence = PRESENCE[item.presence] ?? PRESENCE.offline;
            return (
              <li key={item.id} className="flex items-center gap-3 py-3 first:pt-0">
                <Avatar name={item.name} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {item.roleLabel}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <span className={`h-2 w-2 rounded-full ${presence.dot}`} />
                  {presence.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </SectionCard>
  );
}
