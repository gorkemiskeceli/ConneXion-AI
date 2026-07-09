import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetUsersQuery, useGetAuditLogsQuery } from "../../../services/api";

/**
 * useSettings — UI state + data seam for Settings.
 *
 * Ships empty (no mock data). Wire users + audit logs to Redux/JSON Server
 * later; keep shapes stable.
 *
 * user:  { id, name, email, role, status, lastLogin }
 * audit: { id, time, user, action, detail }
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

  const { data: users = [] } = useGetUsersQuery();
  const { data: auditLogs = [] } = useGetAuditLogsQuery();

  return {
    activeSection,
    setActiveSection: handleSectionChange,
    users,
    auditLogs,
  };
}
