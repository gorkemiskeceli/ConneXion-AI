import { Inbox } from "lucide-react";

/**
 * EmptyState — shown wherever a section has no data.
 * Since this build ships without mock data, every list/table/chart
 * renders through this until a data source is wired in.
 */
export default function EmptyState({
  icon: Icon = Inbox,
  title = "Henüz veri yok",
  description = "Veriler yüklendiğinde burada görünecek.",
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center px-6 py-10 text-center ${className}`}
    >
      <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <p className="font-heading text-sm font-semibold text-slate-700">{title}</p>
      <p className="mt-1 max-w-xs text-xs text-slate-400">{description}</p>
    </div>
  );
}
