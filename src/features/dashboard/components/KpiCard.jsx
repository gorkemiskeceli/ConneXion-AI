import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const DELTA_STYLE = {
  up: "text-green-600",
  down: "text-red-600",
  neutral: "text-slate-400",
};

/**
 * KpiCard — one "daily operation summary" tile.
 * `metric` may be undefined (template with no data) → shows a placeholder.
 * metric shape: { value, deltaLabel, deltaType: "up" | "down" | "neutral" }
 */
export default function KpiCard({ label, icon: Icon, tint, metric }) {
  const deltaType = metric?.deltaType ?? "neutral";
  const DeltaIcon = deltaType === "down" ? ArrowDownRight : ArrowUpRight;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card">
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${tint}`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.9} />
      </span>

      <p className="mt-4 text-sm text-slate-500">{label}</p>

      <p className="mt-1 font-heading text-3xl font-extrabold text-slate-900">
        {metric?.value ?? "—"}
      </p>

      <p
        className={`mt-2 flex items-center gap-1 text-xs font-medium ${DELTA_STYLE[deltaType]}`}
      >
        {metric?.deltaLabel ? (
          <>
            <DeltaIcon className="h-3.5 w-3.5" strokeWidth={2.2} />
            {metric.deltaLabel}
          </>
        ) : (
          <span className="text-slate-300">—</span>
        )}
      </p>
    </div>
  );
}
