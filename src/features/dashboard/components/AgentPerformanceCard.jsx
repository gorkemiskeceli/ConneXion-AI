import { Star, BarChart3 } from "lucide-react";

import SectionCard from "../../../shared/components/ui/SectionCard";
import EmptyState from "../../../shared/components/ui/EmptyState";
import Avatar from "../../../shared/components/ui/Avatar";
import { PATHS } from "../../../constants/paths";

function CsatStars({ value }) {
  const full = Math.round(value ?? 0);
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              i <= full ? "fill-amber-400 text-amber-400" : "text-slate-200"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-slate-700">
        {value?.toFixed(1) ?? "—"}
      </span>
    </div>
  );
}

/**
 * AgentPerformanceCard — "Temsilci Performansı".
 * row shape: { id, name, assigned, resolved, aiResolutionRate, csat }
 */
export default function AgentPerformanceCard({ rows = [] }) {
  return (
    <SectionCard
      title="Temsilci Performansı"
      footerLink={{ label: "Tüm Performansı Gör", to: `${PATHS.team}?tab=performance` }}
    >
      {rows.length === 0 ? (
        <EmptyState
          icon={BarChart3}
          title="Performans verisi yok"
          description="Temsilcilerin atanan, çözülen ve CSAT metrikleri burada listelenir."
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left font-mono text-[11px] uppercase tracking-wide text-slate-400">
                <th className="pb-3 font-medium">Temsilci</th>
                <th className="pb-3 font-medium">Atanan</th>
                <th className="pb-3 font-medium">Çözülen</th>
                <th className="pb-3 font-medium">AI Çözüm Oranı</th>
                <th className="pb-3 font-medium">CSAT Puanı</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {rows.map((row) => (
                <tr key={row.id} className="text-slate-700">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={row.name} size="sm" />
                      <span className="font-medium text-slate-900">
                        {row.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">{row.assigned}</td>
                  <td className="py-3">{row.resolved}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${row.aiResolutionRate ?? 0}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-500">
                        %{row.aiResolutionRate ?? 0}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <CsatStars value={row.csat} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
}
