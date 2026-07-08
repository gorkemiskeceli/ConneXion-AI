import { AVAILABILITY } from "../constants/teamQueuesConfig";

/**
 * AvailabilityBadge — presence indicator (dot + label).
 */
export default function AvailabilityBadge({ status = "offline" }) {
  const meta = AVAILABILITY[status] ?? AVAILABILITY.offline;
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
      <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}
