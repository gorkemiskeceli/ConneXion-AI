import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const DELTA_STYLE = {
  up: "text-emerald-600 bg-emerald-500/10 border border-emerald-500/10",
  down: "text-rose-600 bg-rose-500/10 border border-rose-500/10",
  neutral: "text-slate-500 bg-slate-500/10 border border-slate-500/10",
};

/**
 * KpiCard — one "daily operation summary" tile.
 *
 * Designed to look like a clean frosted-glass card:
 * - Glass background (bg-white/65 + backdrop-blur-xl)
 * - Increased corner radius (rounded-[20px])
 * - Soft rounded icon badges (rounded-full + translucent background)
 * - Fully rounded trend chips
 */
export default function KpiCard({ label, icon: Icon, tint, metric }) {
  const deltaType = metric?.deltaType ?? "neutral";
  const DeltaIcon = deltaType === "down" ? ArrowDownRight : ArrowUpRight;

  return (
    <div className="rounded-[20px] border border-white/30 bg-white/65 backdrop-blur-xl p-5 shadow-[0_8px_32px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)] hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between min-h-[150px]">
      <div className="flex justify-between items-start">
        <div className="leading-tight">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">{label}</p>
          <p className="mt-2 font-heading text-2xl font-extrabold text-[#0F172A]">
            {metric?.value ?? "—"}
          </p>
        </div>
        <span
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tint}`}
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
          <span className="text-slate-350 font-medium text-xs">—</span>
        )}
      </div>
    </div>
  );
}
