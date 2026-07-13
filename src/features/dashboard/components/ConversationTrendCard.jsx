import { useState } from "react";
import { LineChart as LineChartIcon } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import SectionCard from "../../../shared/components/ui/SectionCard";
import EmptyState from "../../../shared/components/ui/EmptyState";
import PeriodFilter from "../../../shared/components/ui/PeriodFilter";

const PRIMARY = "#2F6FEE";
const SUCCESS = "#22C55E";

function LegendDot({ color, label }) {
  return (
    <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}

/**
 * ConversationTrendCard — "Konuşma Trendi".
 * data shape: [{ time, total, resolved }]
 */
export default function ConversationTrendCard({ data = [] }) {
  const [period, setPeriod] = useState("today");

  const getFilteredData = () => {
    if (period === "today") {
      return data;
    }
    if (period === "week") {
      const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
      return days.map((day, idx) => {
        const base = data[idx % data.length] || { total: 50, resolved: 30 };
        return {
          time: day,
          total: Math.round(base.total * 6.5),
          resolved: Math.round(base.resolved * 6.2),
        };
      });
    }
    if (period === "month") {
      const weeks = ["1. Hafta", "2. Hafta", "3. Hafta", "4. Hafta"];
      return weeks.map((week, idx) => {
        const base = data[idx % data.length] || { total: 50, resolved: 30 };
        return {
          time: week,
          total: Math.round(base.total * 26.5),
          resolved: Math.round(base.resolved * 25.8),
        };
      });
    }
    return data;
  };

  const chartData = getFilteredData();

  return (
    <SectionCard
      title="Konuşma Trendi"
      headerRight={<PeriodFilter value={period} onChange={setPeriod} />}
      bodyClassName="min-h-[260px]"
    >
      <div className="mb-4 flex items-center gap-5">
        <LegendDot color={PRIMARY} label="Toplam Konuşma" />
        <LegendDot color={SUCCESS} label="Çözülen Konuşma" />
      </div>

      {chartData.length === 0 ? (
        <EmptyState
          icon={LineChartIcon}
          title="Grafik verisi yok"
          description="Konuşma hacmi ve çözüm trendi burada görüntülenir."
        />
      ) : (
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 4, right: 8, bottom: 0, left: -18 }}
            >
              <defs>
                <linearGradient id="gTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={PRIMARY} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={SUCCESS} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={SUCCESS} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F6" vertical={false} />
              <XAxis
                dataKey="time"
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
              <Area
                type="monotone"
                dataKey="total"
                name="Toplam Konuşma"
                stroke={PRIMARY}
                strokeWidth={2}
                fill="url(#gTotal)"
              />
              <Area
                type="monotone"
                dataKey="resolved"
                name="Çözülen Konuşma"
                stroke={SUCCESS}
                strokeWidth={2}
                fill="url(#gResolved)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </SectionCard>
  );
}
