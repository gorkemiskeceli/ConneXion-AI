import { useState } from "react";
import { useGetReportsQuery } from "../../../services/api";

/**
 * useReports — UI state + analytics data seam.
 *
 * Reads from the RTK Query API, matching the contract every chart expects.
 */
export default function useReports() {
  const [range, setRange] = useState("30d");
  const { data, isLoading, error } = useGetReportsQuery();

  // Server state — all empty until loaded.
  const kpis = data?.kpis || {};
  const conversationVolume = data?.conversationVolume || [];
  const aiPerformance = data?.aiPerformance || [];
  const responseTimes = data?.responseTimes || [];
  const satisfaction = data?.satisfaction || [];
  const teamPerformance = data?.teamPerformance || [];

  return {
    range,
    setRange,
    kpis,
    conversationVolume,
    aiPerformance,
    responseTimes,
    satisfaction,
    teamPerformance,
    isLoading,
    error,
  };
}
