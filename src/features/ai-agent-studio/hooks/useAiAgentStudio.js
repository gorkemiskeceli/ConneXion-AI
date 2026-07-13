import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  useGetAiAgentsQuery,
  useCreateAiAgentMutation,
  useUpdateAiAgentMutation,
  useGetKnowledgeSourcesQuery,
  useGetHandoffRulesQuery,
  useGetAiLogsQuery,
  useGetQueuesQuery,
} from "../../../services/api";

/**
 * useAiAgentStudio — UI state + data seam for the studio.
 * Enforces a single global agent architecture, isolated by tenant.
 */
export default function useAiAgentStudio() {
  const currentUser = useSelector((state) => state.auth.user);

  const [activeTab, setActiveTab] = useState("general");
  const [draftAgent, setDraftAgent] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  const { data: allAgents = [], isLoading: agentsLoading, error } = useGetAiAgentsQuery();
  const [createAiAgent] = useCreateAiAgentMutation();
  const [updateAiAgent, { isLoading: isUpdating }] = useUpdateAiAgentMutation();
  
  const { data: allKnowledgeSources = [] } = useGetKnowledgeSourcesQuery();
  const { data: allHandoffRules = [] } = useGetHandoffRulesQuery();
  const { data: allLogs = [] } = useGetAiLogsQuery();
  const { data: queues = [] } = useGetQueuesQuery();

  const filterByTenant = (items) => {
    if (!currentUser || currentUser.role === "platform_admin") return items;
    return items.filter((item) => item.tenantId === currentUser.tenantId);
  };

  const agents = useMemo(() => filterByTenant(allAgents), [allAgents, currentUser]);
  const knowledgeSources = allKnowledgeSources;
  const handoffRules = allHandoffRules;
  const logs = allLogs;


  const [localKnowledgeSources, setLocalKnowledgeSources] = useState([]);
  const [localHandoffRules, setLocalHandoffRules] = useState([]);
  const [localLogs, setLocalLogs] = useState([]);

  // Sync draft agent once agents load or update (e.g. after saving/mutation)
  useEffect(() => {
    if (agents.length > 0) {
      setDraftAgent(agents[0]);
    }
  }, [agents]);

  // Sync other local collections
  useEffect(() => {
    if (knowledgeSources.length > 0) setLocalKnowledgeSources(knowledgeSources);
  }, [knowledgeSources]);

  useEffect(() => {
    if (handoffRules.length > 0) setLocalHandoffRules(handoffRules);
  }, [handoffRules]);

  useEffect(() => {
    if (logs.length > 0) setLocalLogs(logs);
  }, [logs]);

  // If no agent configuration exists, create a default config implicitly
  useEffect(() => {
    if (!agentsLoading && agents.length === 0) {
      const createDefaultAgent = async () => {
        try {
          await createAiAgent({
            id: `agt_${Date.now()}`,
            tenantId: currentUser?.tenantId || "tnt_default",
            name: "ConneXion Assistant",
            status: "active",
            description: "Varsayılan müşteri destek asistanı.",
            language: "tr",
            tone: "friendly",
            active: true,
            instructions: "Kibar, kısa ve yardımsever yanıtlar ver.",
            greeting: "Merhaba! Size nasıl yardımcı olabilirim?",
            fallback: "Bu konuda sizi bir temsilciye aktarıyorum.",
            guardrailFlags: {
              profanityFilter: true
            },
            blockedTerms: "",
            maxLength: "",
            keywords: ["yardım", "fiyat", "destek"],
            themeColor: "",
            themeTextColor: ""
          }).unwrap();
        } catch (err) {
          console.error("Failed to create default AI Agent:", err);
        }
      };
      createDefaultAgent();
    }
  }, [agents, agentsLoading, createAiAgent, currentUser]);

  const selectedAgent = draftAgent || agents[0] || null;

  const updateDraftAgent = (updatedFields) => {
    setDraftAgent((prev) => {
      const base = prev || agents[0] || {};
      return {
        ...base,
        ...updatedFields,
      };
    });
  };

  const handleSaveAgent = async (updatedFields = {}) => {
    const currentAgent = draftAgent || agents[0];
    if (!currentAgent) return;
    try {
      const payload = {
        ...currentAgent,
        ...updatedFields,
      };
      await updateAiAgent(payload).unwrap();
    } catch (err) {
      console.error("Failed to save AI agent settings:", err);
      throw err;
    }
  };

  const handleGlobalReset = () => {
    // 1. Reset agent config to absolute factory defaults (fully cleared)
    setDraftAgent({
      id: selectedAgent?.id || "agt_default",
      name: "",
      status: "paused",
      description: "",
      companyDescription: "",
      keywords: [],
      language: "tr",
      tone: "friendly",
      active: false,
      instructions: "",
      customInstructions: "",
      greeting: "",
      fallback: "",
      guardrailFlags: {
        profanityFilter: false,
        restrictToKnowledge: false,
        piiMasking: false,
        blockOffTopic: false
      },
      blockedTerms: "",
      maxLength: "",
      handoffFlags: {
        lowConfidence: false,
        customerRequest: false,
        negativeSentiment: false
      },
      handoffConfidence: "",
      handoffTargetTeam: "",
      themeColor: "",
      themeTextColor: ""
    });

    // 2. Clear collections
    setLocalKnowledgeSources([]);
    setLocalHandoffRules([]);
    setLocalLogs([]);

    // 3. Trigger remount for local components (like playground)
    setResetKey((prev) => prev + 1);
  };

  return {
    activeTab,
    setActiveTab,
    agents,
    selectedAgent,
    selectedAgentId: selectedAgent?.id || null,
    knowledgeSources: localKnowledgeSources,
    handoffRules: localHandoffRules,
    logs: localLogs,
    queues,
    resetKey,
    isLoading: agentsLoading || isUpdating,
    error,
    handleGlobalReset,
    updateDraftAgent,
    handleSaveAgent,
  };
}
