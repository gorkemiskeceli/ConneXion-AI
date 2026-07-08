import { useState } from "react";

/**
 * useWorkflows — UI state + data seam for the workflow builder.
 *
 * Ships empty (no mock data, interface only — execution is simulated later).
 * Wire workflows to Redux/JSON Server; keep the shape stable.
 *
 * workflow: {
 *   id, name, status, lastRun,
 *   nodes: [{ id, type: "trigger"|"condition"|"action", title }]
 * }
 */
export default function useWorkflows() {
  const [search, setSearch] = useState("");
  const [selectedWorkflowId, setSelectedWorkflowId] = useState(null);

  const workflows = []; // ← server state

  const selectedWorkflow =
    workflows.find((w) => w.id === selectedWorkflowId) ?? null;

  return {
    search,
    setSearch,
    workflows,
    selectedWorkflowId,
    setSelectedWorkflowId,
    selectedWorkflow,
  };
}
