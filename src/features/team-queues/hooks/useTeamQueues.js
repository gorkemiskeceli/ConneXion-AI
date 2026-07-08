import { useState } from "react";

/**
 * useTeamQueues — UI state + data seam for Team & Queues.
 *
 * Ships empty (no mock data). Wire to Redux/JSON Server later; keep shapes
 * stable.
 *
 * member: { id, name, email, role, availability, queue, activeCount }
 * queue:  { id, name, description, status, waiting, agents: [{ id, name }] }
 * perf:   { id, name, assigned, resolved, avgResponse, aiRate, csat }
 */
export default function useTeamQueues() {
  const [activeTab, setActiveTab] = useState("members");
  const [search, setSearch] = useState("");

  const members = [];
  const queues = [];
  const performance = [];

  return {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    members,
    queues,
    performance,
  };
}
