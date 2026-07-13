import React, { createContext, useContext, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./homepage/store/index.js";
import { ToastProvider } from "./shared/components/ui/Toast";
import { AuthProvider } from "./context/AuthContext";

// Layout and Core Pages
import DashboardLayout from "./layouts/DashboardLayout";
import PlatformAdminDashboard from "./features/dashboard/pages/PlatformAdminDashboard";
import InboxPage from "./features/inbox/pages/InboxPage";
import ContactsPage from "./features/contacts/pages/ContactsPage";
import AiAgentStudioPage from "./features/ai-agent-studio/pages/AiAgentStudioPage";
import KnowledgeBasePage from "./features/knowledge-base/pages/KnowledgeBasePage";
import WorkflowsPage from "./features/workflows/pages/WorkflowsPage";
import TeamQueuesPage from "./features/team-queues/pages/TeamQueuesPage";
import ReportsPage from "./features/reports/pages/ReportsPage";
import SupportPage from "./features/support/pages/SupportPage";
import SettingsPage from "./features/settings/pages/SettingsPage";
import LandingPage from "./homepage/LandingPage";

import EmbedChatWidget from "./components/widget/EmbedChatWidget";
import { ROLES } from "./constants/navigation";

// Context for dynamic role management
const RoleContext = createContext();

export function useActiveRole() {
  return useContext(RoleContext);
}

// Wrapper to manage dynamic role switching and user state
function DashboardWrapper() {
  const currentUser = useSelector((state) => state.auth.user);
  const [role, setRole] = useState(() => {
    if (currentUser && currentUser.role) {
      return currentUser.role;
    }
    return localStorage.getItem("saasprecise_active_role") || "user";
  });

  useEffect(() => {
    if (currentUser && currentUser.role) {
      setRole(currentUser.role);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("saasprecise_active_role", role);
  }, [role]);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  const roleLabels = {
    admin: "Platform Yöneticisi",
    user: "Kullanıcı",
    [ROLES.PLATFORM_ADMIN]: "Platform Admin",
    [ROLES.WORKSPACE_ADMIN]: "Workspace Admin",
    [ROLES.MANAGER]: "Manager",
    [ROLES.SUPPORT_AGENT]: "Support Agent",
  };

  const mappedRole = role === "admin" ? ROLES.PLATFORM_ADMIN : ROLES.WORKSPACE_ADMIN;

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <ToastProvider>
        <div className="relative">
          <DashboardLayout
            role={mappedRole}
            userName={currentUser?.name || "Ahmet Yılmaz"}
            userRoleLabel={roleLabels[role] || "Kullanıcı"}
            workspaceName="ConneXion-AI Corp"
            workspacePlan="Enterprise"
          />
          <EmbedChatWidget />
        </div>
      </ToastProvider>
    </RoleContext.Provider>
  );
}

// Route adapter to inject the dynamically active role into page props
function RoleRoute({ Component, ...props }) {
  const { role } = useActiveRole();
  const mappedRole = role === "admin" ? ROLES.PLATFORM_ADMIN : ROLES.WORKSPACE_ADMIN;
  return <Component role={mappedRole} {...props} />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardWrapper />,
    children: [
      { index: true, element: <RoleRoute Component={PlatformAdminDashboard} /> },
      { path: "inbox", element: <RoleRoute Component={InboxPage} /> },
      { path: "contacts", element: <RoleRoute Component={ContactsPage} /> },
      { path: "ai-agent", element: <RoleRoute Component={AiAgentStudioPage} /> },
      { path: "knowledge-base", element: <RoleRoute Component={KnowledgeBasePage} /> },
      { path: "workflows", element: <RoleRoute Component={WorkflowsPage} /> },
      { path: "team", element: <RoleRoute Component={TeamQueuesPage} /> },
      { path: "reports", element: <RoleRoute Component={ReportsPage} /> },
      { path: "support", element: <RoleRoute Component={SupportPage} /> },
      { path: "settings", element: <RoleRoute Component={SettingsPage} initialSection="workspace" /> },
      { path: "settings/audit-logs", element: <RoleRoute Component={SettingsPage} initialSection="audit" /> },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  );
}
