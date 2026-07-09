import { Download } from "lucide-react";

import useReports from "../hooks/useReports";
import RangeFilter from "../components/RangeFilter";
import ReportsSummary from "../components/ReportsSummary";
import ReportCard from "../components/ReportCard";
import TrendChart from "../components/charts/TrendChart";
import CategoryBarChart from "../components/charts/CategoryBarChart";
import { SCOPE_LABELS, CHART_COLORS } from "../constants/reportsConfig";
import { ROLES } from "../../../constants/navigation";
import {
  canReports,
  getReportsScope,
  REPORTS_ACTION,
} from "../../../constants/permissions";

/**
 * ReportsPage — business analytics dashboard.
 *
 * Header (scope subtitle + range filter + gated export) → KPI summary → a grid
 * of charts: conversation volume, AI performance, response times, customer
 * satisfaction, and (team+ scopes) team performance.
 *
 * Scope + visibility come from the role: Platform Admin sees global analytics,
 * Manager team, Support Agent personal-only (no team performance). Empty by
 * design — every chart shows its empty state until data is wired in.
 */
export default function ReportsPage({ role = ROLES.PLATFORM_ADMIN }) {
  const {
    range,
    setRange,
    kpis,
    conversationVolume,
    aiPerformance,
    responseTimes,
    satisfaction,
    teamPerformance,
  } = useReports();

  const scope = getReportsScope(role);
  const canExport = canReports(role, REPORTS_ACTION.EXPORT);
  const canViewTeam = canReports(role, REPORTS_ACTION.VIEW_TEAM);

  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900">
            Reports
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {SCOPE_LABELS[scope]} · performans ve trend analizleri
          </p>
        </div>

        <div className="flex items-center gap-3">
          <RangeFilter value={range} onChange={setRange} />
          {canExport && (
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-primary/45 bg-white/20 backdrop-blur-md px-4 py-2 text-sm font-semibold text-primary shadow-xs transition-all hover:bg-primary/10 active:scale-95"
            >
              <Download className="h-4 w-4" />
              Dışa Aktar
            </button>
          )}
        </div>
      </div>

      {/* KPI summary */}
      <ReportsSummary kpis={kpis} />

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ReportCard
          title="Konuşma Hacmi"
          subtitle="Zaman içinde toplam konuşma sayısı"
        >
          <CategoryBarChart
            data={conversationVolume}
            bars={[
              { key: "count", label: "Konuşma", color: CHART_COLORS.primary },
            ]}
          />
        </ReportCard>

        <ReportCard
          title="AI Performansı"
          subtitle="AI tarafından çözülen ve aktarılan konuşmalar"
        >
          <TrendChart
            data={aiPerformance}
            series={[
              { key: "resolved", label: "Çözülen", color: CHART_COLORS.success },
              { key: "handoff", label: "Aktarılan", color: CHART_COLORS.amber },
            ]}
          />
        </ReportCard>

        <ReportCard
          title="Yanıt Süreleri"
          subtitle="Ortalama ilk yanıt ve çözüm süresi"
        >
          <TrendChart
            data={responseTimes}
            series={[
              { key: "firstResponse", label: "İlk Yanıt", color: CHART_COLORS.primary },
              { key: "resolution", label: "Çözüm", color: CHART_COLORS.sky },
            ]}
          />
        </ReportCard>

        <ReportCard
          title="Müşteri Memnuniyeti"
          subtitle="CSAT puanı trendi"
        >
          <TrendChart
            data={satisfaction}
            series={[
              { key: "csat", label: "CSAT", color: CHART_COLORS.success },
            ]}
          />
        </ReportCard>

        {/* Team performance — hidden for personal scope (Support Agent) */}
        {canViewTeam && (
          <ReportCard
            title="Ekip Performansı"
            subtitle="Temsilci bazında çözülen konuşmalar"
            headerRight={null}
          >
            <CategoryBarChart
              data={teamPerformance}
              layout="vertical"
              height={280}
              bars={[
                { key: "resolved", label: "Çözülen", color: CHART_COLORS.primary },
              ]}
            />
          </ReportCard>
        )}
      </div>
    </div>
  );
}
