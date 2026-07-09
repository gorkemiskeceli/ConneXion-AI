import { useState } from "react";
import { useGetWorkflowsQuery } from "../../../services/api";

/**
 * useWorkflows — UI state + data seam for the workflow builder.
 *
 * Fetches workflows using RTK Query and filters by search.
 */
export default function useWorkflows() {
  const [search, setSearch] = useState("");
  const [selectedWorkflowId, setSelectedWorkflowId] = useState(null);

  const { data: rawWorkflows = [], isLoading, error } = useGetWorkflowsQuery();

  // Filter workflows locally by search text
  const workflows = rawWorkflows.filter((w) =>
    w.name?.toLowerCase().includes(search.toLowerCase())
  );

  const selectedWorkflow =
    rawWorkflows.find((w) => w.id === selectedWorkflowId) ?? null;

  return {
    search,
    setSearch,
    workflows,
    selectedWorkflowId,
    setSelectedWorkflowId,
    selectedWorkflow,
    isLoading,
    error,
  };
}
