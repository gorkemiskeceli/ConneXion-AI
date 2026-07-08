import { REPORT_KPIS } from "../constants/reportsConfig";

/**
 * ReportsSummary — headline metrics row.
 * Values come from `kpis` keyed by id; blank ("—") until data is wired.
 */
export default function ReportsSummary({ kpis = {} }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {REPORT_KPIS.map(({ id, label, icon: Icon, tint }) => {
        const metric = kpis[id];
        return (
          <div key={id} className="rounded-2xl bg-white p-5 shadow-card">
            <span
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${tint}`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.9} />
            </span>
            <p className="mt-3 text-xs text-slate-500">{label}</p>
            <p className="mt-1 font-heading text-2xl font-extrabold text-slate-900">
              {metric?.value ?? "—"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
