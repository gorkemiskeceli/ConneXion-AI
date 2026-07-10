import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetUsersQuery, useGetAuditLogsQuery } from "../../../services/api";

/**
 * useSettings — UI state + data seam for Settings.
 *
 * Fetches users list and audit logs from the RTK Query API.
 */
export default function useSettings({ initialSection = "workspace" } = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const querySection = searchParams.get("section");
  const [activeSection, setActiveSection] = useState(querySection || initialSection);

  useEffect(() => {
    const targetSection = querySection || initialSection;
    if (targetSection !== activeSection) {
      setActiveSection(targetSection);
    }
  }, [querySection, initialSection, activeSection]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSearchParams({ section });
  };

  const { data: users = [], isLoading: usersLoading, error } = useGetUsersQuery();
  const { data: auditLogs = [], isLoading: auditLoading } = useGetAuditLogsQuery();

  return {
    activeSection,
    setActiveSection: handleSectionChange,
    users,
    auditLogs,
    isLoading: usersLoading || auditLoading,
    error,
  };
}
