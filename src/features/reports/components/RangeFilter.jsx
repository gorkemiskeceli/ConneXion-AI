import { Calendar, ChevronDown } from "lucide-react";

import { RANGE_OPTIONS } from "../constants/reportsConfig";

/**
 * RangeFilter — date range selector.
 */
export default function RangeFilter({ value = "30d", onChange }) {
  return (
    <div className="relative">
      <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-8 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-100"
      >
        {RANGE_OPTIONS.map((r) => (
          <option key={r.id} value={r.id}>
            {r.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}
