import { useGetDashboardQuery } from "../../../services/api";

/**
 * useDashboardData — the single data seam for the Platform Admin dashboard.
 *
 * Reads from the RTK Query API, matching the contract every dashboard panel expects.
 */
export default function useDashboardData() {
  const { data, isLoading, error } = useGetDashboardQuery();

  return {
    // KPI values keyed by the ids in dashboardConfig → KPI_CARDS.
    kpis: data?.kpis || {},

    // Recent platform changes / events / logs.
    recentActivity: data?.recentActivity || [],

    // Conversation trend series for the area chart.
    conversationTrend: data?.conversationTrend || [],

    // Urgent queue items.
    urgentQueue: data?.urgentQueue || [],

    // Agent performance rows.
    agentPerformance: data?.agentPerformance || [],

    // Active agents.
    activeAgents: data?.activeAgents || [],

    isLoading,
    error,
  };
}
