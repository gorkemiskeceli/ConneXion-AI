import { useState } from "react";

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
  const [activeSection, setActiveSection] = useState(initialSection);

  const users = [];
  const auditLogs = [];

  return {
    activeSection,
    setActiveSection,
    users,
    auditLogs,
  };
}
