import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/tr";

dayjs.locale("tr");

/**
 * DashboardHeader — page title area.
 * Shows a personalized greeting, a one-line summary subtitle, and today's date.
 * `userName` comes from the session (empty by default → clean greeting).
 */
export default function DashboardHeader({ userName = "" }) {
  const today = dayjs().format("D MMMM YYYY");

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">
          Merhaba{userName ? `, ${userName}` : ""} 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Platformun anlık özetine göz at.
        </p>
      </div>

      <button
        type="button"
        className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
      >
        <Calendar className="h-4 w-4 text-slate-400" strokeWidth={1.9} />
        Bugün, {today}
      </button>
    </div>
  );
}
