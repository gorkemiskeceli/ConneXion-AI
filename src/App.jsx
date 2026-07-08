import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import PlatformAdminDashboard from "./features/dashboard/pages/PlatformAdminDashboard";
import { ROLES } from "./constants/navigation";

import InboxPage from "./features/inbox/pages/InboxPage";
import ContactsPage from "./features/contacts/pages/ContactsPage";
import AiAgentStudioPage from "./features/ai-agent-studio/pages/AiAgentStudioPage";
import KnowledgeBasePage from "./features/knowledge-base/pages/KnowledgeBasePage";
import LandingPage from "./homepage/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout role={ROLES.PLATFORM_ADMIN} />,
    children: [
      { index: true, element: <PlatformAdminDashboard /> },
      { path: "inbox", element: <InboxPage role={ROLES.PLATFORM_ADMIN} /> },
      { path: "contacts", element: <ContactsPage role={ROLES.PLATFORM_ADMIN} /> },
      { path: "ai-agent", element: <AiAgentStudioPage role={ROLES.PLATFORM_ADMIN} /> },
      { path: "knowledge-base", element: <KnowledgeBasePage role={ROLES.PLATFORM_ADMIN} /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
