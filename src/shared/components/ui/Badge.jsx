const VARIANTS = {
  neutral: "bg-slate-500/10 text-slate-600 border border-slate-500/10",
  primary: "bg-[#2F6FEE]/10 text-[#2F6FEE] border border-[#2F6FEE]/10",
  success: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/10",
  warning: "bg-amber-500/10 text-amber-700 border border-amber-500/10",
  danger: "bg-rose-500/10 text-rose-600 border border-rose-500/10",
};

/**
 * Badge — small pill for status, priority, counts.
 *
 * Re-designed to be soft-filled translucent tags with no hard borders.
 */
export default function Badge({ children, variant = "neutral", className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
