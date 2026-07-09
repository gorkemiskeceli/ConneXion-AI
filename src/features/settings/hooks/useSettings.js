import { useState } from "react";
import { useGetUsersQuery, useGetAuditLogsQuery } from "../../../services/api";

/**
 * useSettings — UI state + data seam for Settings.
 *
 * Fetches users list and audit logs from the RTK Query API.
 */
export default function useSettings({ initialSection = "workspace" } = {}) {
  const [activeSection, setActiveSection] = useState(initialSection);

  const { data: users = [], isLoading: usersLoading, error } = useGetUsersQuery();
  const { data: auditLogs = [], isLoading: auditLoading } = useGetAuditLogsQuery();

  return {
    activeSection,
    setActiveSection,
    users,
    auditLogs,
    isLoading: usersLoading || auditLoading,
    error,
  };
}
