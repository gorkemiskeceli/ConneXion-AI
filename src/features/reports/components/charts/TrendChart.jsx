import { LineChart as LineIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import EmptyState from "../../../../shared/components/ui/EmptyState";

/**
 * TrendChart — multi-series line chart over time.
 * data: [{ label, ...seriesKeys }]
 * series: [{ key, label, color }]
 */
export default function TrendChart({ data = [], series = [], height = 240 }) {
  if (data.length === 0) {
    return (
      <EmptyState
        icon={LineIcon}
        title="Grafik verisi yok"
        description="Veriler geldiğinde trend burada görünür."
        className="py-10"
      />
    );
  }

  return (
    <>
      <div className="mb-3 flex flex-wrap items-center gap-4">
        {series.map((s) => (
          <span
            key={s.key}
            className="flex items-center gap-2 text-xs font-medium text-slate-500"
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            {s.label}
          </span>
        ))}
      </div>
      <div style={{ height }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -18 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F6" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "#94A3B8", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "#94A3B8", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E2E8F0",
                boxShadow: "0 6px 20px rgba(16,24,40,0.08)",
                fontSize: 12,
              }}
            />
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
