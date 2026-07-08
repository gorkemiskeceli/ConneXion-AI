import { Star, BarChart3 } from "lucide-react";

import Avatar from "../../../shared/components/ui/Avatar";
import EmptyState from "../../../shared/components/ui/EmptyState";
import { PERFORMANCE_COLUMNS } from "../constants/teamQueuesConfig";

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
 * TeamPerformanceTab — per-agent performance metrics.
 * row: { id, name, assigned, resolved, avgResponse, aiRate, csat }
 */
export default function TeamPerformanceTab({ performance = [] }) {
  const colSpan = PERFORMANCE_COLUMNS.length;

  return (
    <div className="rounded-2xl bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left font-mono text-[11px] uppercase tracking-wide text-slate-400">
              {PERFORMANCE_COLUMNS.map((col) => (
                <th key={col.id} className="px-5 py-3 font-medium">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {performance.length === 0 ? (
              <tr>
                <td colSpan={colSpan}>
                  <EmptyState
                    icon={BarChart3}
                    title="Performans verisi yok"
                    description="Ekip metrikleri veriler geldiğinde burada görünür."
                  />
                </td>
              </tr>
            ) : (
              performance.map((row) => (
                <tr key={row.id} className="text-slate-700">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={row.name} size="sm" />
                      <span className="font-medium text-slate-900">
                        {row.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">{row.assigned ?? 0}</td>
                  <td className="px-5 py-3">{row.resolved ?? 0}</td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-500">
                    {row.avgResponse ?? "—"}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${row.aiRate ?? 0}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-500">
                        %{row.aiRate ?? 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <CsatStars value={row.csat} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
