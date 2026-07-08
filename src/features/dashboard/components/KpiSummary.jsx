import KpiCard from "./KpiCard";
import { KPI_CARDS } from "../constants/dashboardConfig";

/**
 * KpiSummary — "Operasyonun anlık özeti" row.
 * Renders the six configured KPI tiles, pulling each value from `kpis` by id.
 */
export default function KpiSummary({ kpis = {} }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {KPI_CARDS.map(({ id, label, icon, tint }) => (
        <KpiCard
          key={id}
          label={label}
          icon={icon}
          tint={tint}
          metric={kpis[id]}
        />
      ))}
    </div>
  );
}
