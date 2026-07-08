import { useState } from "react";

/**
 * useReports — UI state + analytics data seam.
 *
 * Ships empty (no mock data). Wire to Redux/JSON Server later, scoped by role
 * (global / workspace / team / personal). Keep shapes stable.
 */
export default function useReports() {
  const [range, setRange] = useState("30d");

  // Server state — all empty until wired.
  const kpis = {}; // { totalConversations: { value, deltaLabel, deltaType }, ... }
  const conversationVolume = []; // [{ label, count }]
  const aiPerformance = []; // [{ label, resolved, handoff }]
  const responseTimes = []; // [{ label, firstResponse, resolution }]
  const satisfaction = []; // [{ label, csat }]
  const teamPerformance = []; // [{ label, resolved }]

  return {
    range,
    setRange,
    kpis,
    conversationVolume,
    aiPerformance,
    responseTimes,
    satisfaction,
    teamPerformance,
  };
}
