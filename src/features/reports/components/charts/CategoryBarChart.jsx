import { BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import EmptyState from "../../../../shared/components/ui/EmptyState";

/**
 * CategoryBarChart — bar chart over categories/time buckets.
 * data: [{ label, ...barKeys }]
 * bars: [{ key, label, color }]
 */
export default function CategoryBarChart({
  data = [],
  bars = [],
  height = 240,
  layout = "horizontal",
}) {
  if (data.length === 0) {
    return (
      <EmptyState
        icon={BarChart3}
        title="Grafik verisi yok"
        description="Veriler geldiğinde dağılım burada görünür."
        className="py-10"
      />
    );
  }

  const vertical = layout === "vertical";

  return (
    <>
      {bars.length > 1 && (
        <div className="mb-3 flex flex-wrap items-center gap-4">
          {bars.map((b) => (
            <span
              key={b.key}
              className="flex items-center gap-2 text-xs font-medium text-slate-500"
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: b.color }}
              />
              {b.label}
            </span>
          ))}
        </div>
      )}
      <div style={{ height }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout={vertical ? "vertical" : "horizontal"}
            margin={{ top: 4, right: 8, bottom: 0, left: vertical ? 8 : -18 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F6" vertical={vertical} horizontal={!vertical} />
            {vertical ? (
              <>
                <XAxis type="number" tick={{ fill: "#94A3B8", fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="label" tick={{ fill: "#94A3B8", fontSize: 11 }} tickLine={false} axisLine={false} width={90} />
              </>
            ) : (
              <>
                <XAxis dataKey="label" tick={{ fill: "#94A3B8", fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} tickLine={false} axisLine={false} />
              </>
            )}
            <Tooltip
              cursor={{ fill: "#F1F5F9" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E2E8F0",
                boxShadow: "0 6px 20px rgba(16,24,40,0.08)",
                fontSize: 12,
              }}
            />
            {bars.map((b) => (
              <Bar
                key={b.key}
                dataKey={b.key}
                name={b.label}
                fill={b.color}
                radius={vertical ? [0, 6, 6, 0] : [6, 6, 0, 0]}
                maxBarSize={38}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
