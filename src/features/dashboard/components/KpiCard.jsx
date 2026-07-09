import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const DELTA_STYLE = {
  up: "text-green-600 bg-green-50/50 border border-green-200/50",
  down: "text-red-600 bg-red-50/50 border border-red-200/50",
  neutral: "text-slate-500 bg-slate-50/50 border border-slate-200/50",
};

/**
 * KpiCard — one "daily operation summary" tile.
 *
 * Re-designed to follow a glassmorphic style matching the reference image.
 */
export default function KpiCard({ label, icon: Icon, tint, metric }) {
  const deltaType = metric?.deltaType ?? "neutral";
  const DeltaIcon = deltaType === "down" ? ArrowDownRight : ArrowUpRight;

  return (
    <div className="rounded-[22px] border border-white/45 bg-white/45 backdrop-blur-lg p-5 shadow-card hover:shadow-card-hover hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between min-h-[150px]">
      <div className="flex justify-between items-start">
        <div className="leading-tight">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">{label}</p>
          <p className="mt-2 font-heading text-3xl font-extrabold text-slate-800">
            {metric?.value ?? "—"}
          </p>
        </div>
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl shadow-inner ${tint}`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.9} />
        </span>
      </div>

      <div className="mt-4">
        {metric?.deltaLabel ? (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${DELTA_STYLE[deltaType]}`}
          >
            <DeltaIcon className="h-3 w-3" strokeWidth={2.5} />
            {metric.deltaLabel}
          </span>
        ) : (
          <span className="text-slate-300 font-medium text-xs">—</span>
        )}
      </div>
    </div>
  );
}
