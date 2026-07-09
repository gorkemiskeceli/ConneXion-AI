<<<<<<< Updated upstream
import { useState } from "react";
=======
import { useState, useEffect } from "react";
import {
  useGetAiAgentsQuery,
  useGetKnowledgeSourcesQuery,
  useGetHandoffRulesQuery,
  useGetAiLogsQuery,
  useGetQueuesQuery,
} from "../../../services/api";
>>>>>>> Stashed changes

/**
 * useAiAgentStudio — UI state + data seam for the studio.
 *
 * Ships empty (no mock data, interface only). Wire the config + lists to
 * Redux/JSON Server later; keep shapes stable.
 */
export default function useAiAgentStudio() {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedAgentId, setSelectedAgentId] = useState(null);

<<<<<<< Updated upstream
  // Server state — replace later.
  const agents = []; // [{ id, name, status }]
=======
  const { data: agents = [], isLoading: agentsLoading, error } = useGetAiAgentsQuery();
  const { data: knowledgeSources = [] } = useGetKnowledgeSourcesQuery();
  const { data: handoffRules = [] } = useGetHandoffRulesQuery();
  const { data: logs = [] } = useGetAiLogsQuery();
  const { data: queues = [] } = useGetQueuesQuery();

  // Automatically select the first agent once data finishes loading
  useEffect(() => {
    if (agents.length > 0 && !selectedAgentId) {
      setSelectedAgentId(agents[0].id);
    }
  }, [agents, selectedAgentId]);

>>>>>>> Stashed changes
  const selectedAgent = agents.find((a) => a.id === selectedAgentId) ?? null;

  const knowledgeSources = []; // [{ id, name, type, itemCount, status }]
  const handoffRules = []; // [{ id, condition, target }]
  const logs = []; // [{ id, time, event, confidence, action }]

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
<<<<<<< Updated upstream
=======
    queues,
    isLoading: agentsLoading,
    error,
>>>>>>> Stashed changes
  };
}
