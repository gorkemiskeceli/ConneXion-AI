import { useState } from "react";

/**
 * useAiAgentStudio — UI state + data seam for the studio.
 *
 * Ships empty (no mock data, interface only). Wire the config + lists to
 * Redux/JSON Server later; keep shapes stable.
 */
export default function useAiAgentStudio() {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedAgentId, setSelectedAgentId] = useState(null);

  // Server state — replace later.
  const agents = []; // [{ id, name, status }]
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
  };
}
