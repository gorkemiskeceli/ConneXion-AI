import useDashboardData from "../hooks/useDashboardData";
import DashboardHeader from "../components/DashboardHeader";
import KpiSummary from "../components/KpiSummary";
import RecentActivityCard from "../components/RecentActivityCard";
import ConversationTrendCard from "../components/ConversationTrendCard";
import UrgentQueueCard from "../components/UrgentQueueCard";
import AgentPerformanceCard from "../components/AgentPerformanceCard";
import ActiveAgentsCard from "../components/ActiveAgentsCard";

/**
 * PlatformAdminDashboard — the first page of the admin area.
 *
 * Layout:
 *   1. Greeting + date               (DashboardHeader)
 *   2. Daily operation summary       (KpiSummary — 6 tiles)
 *   3. Recent activity · Trend · Urgent queue   (3-column row)
 *   4. Agent performance (2/3) · Active agents (1/3)
 *
 * All data comes from useDashboardData(), which currently returns empty
 * structures — every panel renders its empty state until a source is wired in.
 *
 * `userName` would come from the session layer; left empty here (no mock data).
 */
export default function PlatformAdminDashboard({ userName = "" }) {
  const {
    kpis,
    recentActivity,
    conversationTrend,
    urgentQueue,
    agentPerformance,
    activeAgents,
  } = useDashboardData();

  return (
    <div className="mx-auto max-w-[1600px]">
      <DashboardHeader userName={userName} />

      <KpiSummary kpis={kpis} />

      {/* Row: recent activity · trend · urgent queue */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RecentActivityCard items={recentActivity} />
        <ConversationTrendCard data={conversationTrend} />
        <UrgentQueueCard items={urgentQueue} />
      </div>

      {/* Row: agent performance (wide) · active agents */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AgentPerformanceCard rows={agentPerformance} />
        </div>
        <ActiveAgentsCard items={activeAgents} />
      </div>
    </div>
  );
}
