/**
 * useDashboardData — the single data seam for the Platform Admin dashboard.
 *
 * Ships empty by design (no mock data). When you're ready, replace the body
 * with a Redux selector + JSON Server thunk, e.g.:
 *
 *   const data = useSelector(selectDashboard);
 *   useEffect(() => { dispatch(fetchDashboard()); }, [dispatch]);
 *   return data;
 *
 * The shape below is the contract every panel expects — keep it stable.
 */
export default function useDashboardData() {
  return {
    // KPI values keyed by the ids in dashboardConfig → KPI_CARDS.
    // e.g. { activeConversations: { value: "28", deltaLabel: "12% dünden", deltaType: "up" } }
    kpis: {},

    // Recent platform changes / events / logs (replaces channel breakdown).
    // [{ id, type, actor, action, target, timestamp }]
    recentActivity: [],

    // Conversation trend series for the area chart.
    // [{ time: "00:00", total: 0, resolved: 0 }]
    conversationTrend: [],

    // Urgent queue items.
    // [{ id, name, message, waitLabel, priority }]
    urgentQueue: [],

    // Agent performance rows.
    // [{ id, name, assigned, resolved, aiResolutionRate, csat }]
    agentPerformance: [],

    // Active agents (replaces active channels).
    // [{ id, name, roleLabel, presence }]
    activeAgents: [],
  };
}
