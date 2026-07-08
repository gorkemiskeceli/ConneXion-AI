/**
 * ReportCard — white card wrapper for a single analytics chart.
 */
export default function ReportCard({ title, subtitle, headerRight, children }) {
  return (
    <section className="rounded-2xl bg-white shadow-card">
      <header className="flex items-start justify-between gap-3 px-5 pt-5">
        <div>
          <h3 className="font-heading text-base font-bold text-slate-900">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
          )}
        </div>
        {headerRight}
      </header>
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}
