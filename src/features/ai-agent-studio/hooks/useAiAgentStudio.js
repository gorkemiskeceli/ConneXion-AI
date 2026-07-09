import { useState, useEffect } from "react";
import {
  useGetAiAgentsQuery,
  useGetKnowledgeSourcesQuery,
  useGetHandoffRulesQuery,
  useGetAiLogsQuery,
} from "../../../services/api";

/**
 * useAiAgentStudio — UI state + data seam for the studio.
 *
 * Fetches agents, sources, handoff rules, and AI logs from RTK Query.
 * Defaults the selected agent to the first available agent.
 */
export default function useAiAgentStudio() {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedAgentId, setSelectedAgentId] = useState(null);

  const { data: agents = [], isLoading: agentsLoading, error } = useGetAiAgentsQuery();
  const { data: knowledgeSources = [] } = useGetKnowledgeSourcesQuery();
  const { data: handoffRules = [] } = useGetHandoffRulesQuery();
  const { data: logs = [] } = useGetAiLogsQuery();

  // Automatically select the first agent once data finishes loading
  useEffect(() => {
    if (agents.length > 0 && !selectedAgentId) {
      setSelectedAgentId(agents[0].id);
    }
  }, [agents, selectedAgentId]);

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) ?? null;

  return {
    activeTab,
    setActiveTab,
    agents,
    selectedAgent,
    selectedAgentId,
    setSelectedAgentId,
    knowledgeSources,
    handoffRules,
    logs,
    isLoading: agentsLoading,
    error,
  };
}
