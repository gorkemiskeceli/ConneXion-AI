import { useState } from "react";
import {
  useGetUsersQuery,
  useGetQueuesQuery,
  useGetTeamPerformanceQuery,
} from "../../../services/api";

/**
 * useTeamQueues — UI state + data seam for Team & Queues.
 *
 * Fetches users/members, queues, and performance from the RTK Query API.
 * Supports filtering members list by search.
 */
export default function useTeamQueues() {
  const [activeTab, setActiveTab] = useState("members");
  const [search, setSearch] = useState("");

  const { data: rawUsers = [], isLoading: usersLoading, error } = useGetUsersQuery();
  const { data: queues = [], isLoading: queuesLoading } = useGetQueuesQuery();
  const { data: performance = [], isLoading: perfLoading } = useGetTeamPerformanceQuery();

  // Filter members locally by search text
  const members = rawUsers.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    members,
    queues,
    performance,
    isLoading: usersLoading || queuesLoading || perfLoading,
    error,
  };
}
