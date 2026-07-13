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
import { ROLES, ROLE_LABELS } from "./constants/navigation";

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
    return localStorage.getItem("saasprecise_active_role") || ROLES.PLATFORM_ADMIN;
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

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <ToastProvider>
        <div className="relative">
          {/* Floating Role Switcher Widget - Premium Preview Feature */}
          <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-white p-2.5 shadow-2xl border border-slate-200 transition-all hover:scale-105 duration-300">
            <span className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-wider">Rol Seçimi:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-800 outline-none focus:border-primary transition-all cursor-pointer"
            >
              <option value={ROLES.PLATFORM_ADMIN}>{ROLE_LABELS[ROLES.PLATFORM_ADMIN]}</option>
              <option value={ROLES.WORKSPACE_ADMIN}>{ROLE_LABELS[ROLES.WORKSPACE_ADMIN]}</option>
              <option value={ROLES.MANAGER}>{ROLE_LABELS[ROLES.MANAGER]}</option>
              <option value={ROLES.SUPPORT_AGENT}>{ROLE_LABELS[ROLES.SUPPORT_AGENT]}</option>
            </select>
          </div>

          <DashboardLayout
            role={role}
            userName={currentUser?.name || "Ahmet Yılmaz"}
            userRoleLabel={ROLE_LABELS[role]}
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
  return <Component role={role} {...props} />;
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
