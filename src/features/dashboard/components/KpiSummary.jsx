import KpiCard from "./KpiCard";
import { KPI_CARDS } from "../constants/dashboardConfig";

/**
 * KpiSummary — "Operasyonun anlık özeti" row.
 * Renders the configured KPI tiles, pulling each value from `kpis` by id.
 */
export default function KpiSummary({ kpis = {} }) {
  const TOKEN_LIMIT = 500000; // Define maximum AI token limit

  // Helper to format KPI values
  const formatValue = (id, metric) => {
    if (!metric || metric.value === undefined || metric.value === null) return "—";
    if (id === "totalTokensUsed") {
      const used = parseInt(metric.value) || 0;
      const remaining = Math.max(0, TOKEN_LIMIT - used);
      const percentage = ((remaining / TOKEN_LIMIT) * 100).toFixed(1);
      return `%${percentage}`;
    }
    return metric.value;
  };

  // Helper to format KPI delta subtext
  const formatDeltaLabel = (id, metric) => {
    if (!metric) return "";
    if (id === "totalTokensUsed") {
      const used = parseInt(metric.value) || 0;
      const remaining = Math.max(0, TOKEN_LIMIT - used);
      if (remaining >= 1000) {
        return `${(remaining / 1000).toFixed(1)}K limit kaldı`;
      }
      return `${remaining} limit kaldı`;
    }
    return metric.deltaLabel || "";
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
      {KPI_CARDS.map(({ id, label, icon, tint }) => (
        <KpiCard
          key={id}
          label={label}
          icon={icon}
          tint={tint}
          metric={{
            ...kpis[id],
            value: formatValue(id, kpis[id]),
            deltaLabel: formatDeltaLabel(id, kpis[id]),
            deltaType: id === "totalTokensUsed" ? "neutral" : (kpis[id]?.deltaType || "neutral")
          }}
        />
      ))}
    </div>
  );
}
