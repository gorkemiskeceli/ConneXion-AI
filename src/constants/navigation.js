import {
  LayoutDashboard,
  Inbox,
  Users,
  Bot,
  BookOpen,
  Workflow,
  UsersRound,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react";

import { PATHS } from "./paths";

// Role keys used across the app.
export const ROLES = {
  PLATFORM_ADMIN: "platform_admin",
  WORKSPACE_ADMIN: "workspace_admin",
  MANAGER: "manager",
  SUPPORT_AGENT: "support_agent",
};

// Single source of truth for the dashboard sidebar.
// `roles` controls visibility — the Sidebar filters by the active role, so
// components never decide navigation permissions themselves.
// Modules follow the project spec (no Channels / Voice).
export const NAV_ITEMS = [
  {
    label: "Dashboard",
    to: PATHS.dashboard,
    icon: LayoutDashboard,
    roles: [
      ROLES.PLATFORM_ADMIN,
      ROLES.WORKSPACE_ADMIN,
      ROLES.MANAGER,
      ROLES.SUPPORT_AGENT,
    ],
  },
  {
    label: "Inbox",
    to: PATHS.inbox,
    icon: Inbox,
    roles: [
      ROLES.PLATFORM_ADMIN,
      ROLES.WORKSPACE_ADMIN,
      ROLES.MANAGER,
      ROLES.SUPPORT_AGENT,
    ],
  },
  {
    label: "Contacts",
    to: PATHS.contacts,
    icon: Users,
    roles: [
      ROLES.PLATFORM_ADMIN,
      ROLES.WORKSPACE_ADMIN,
      ROLES.MANAGER,
      ROLES.SUPPORT_AGENT,
    ],
  },
  {
    label: "AI Agent Studio",
    to: PATHS.aiAgentStudio,
    icon: Bot,
    roles: [ROLES.PLATFORM_ADMIN, ROLES.WORKSPACE_ADMIN, ROLES.MANAGER],
  },
  {
    label: "Knowledge Base",
    to: PATHS.knowledgeBase,
    icon: BookOpen,
    roles: [
      ROLES.PLATFORM_ADMIN,
      ROLES.WORKSPACE_ADMIN,
      ROLES.MANAGER,
      ROLES.SUPPORT_AGENT,
    ],
  },
  {
    label: "Workflows",
    to: PATHS.workflows,
    icon: Workflow,
    roles: [ROLES.PLATFORM_ADMIN, ROLES.WORKSPACE_ADMIN, ROLES.MANAGER],
  },
  {
    label: "Team & Queues",
    to: PATHS.team,
    icon: UsersRound,
    roles: [ROLES.PLATFORM_ADMIN, ROLES.WORKSPACE_ADMIN, ROLES.MANAGER],
  },
  {
    label: "Reports",
    to: PATHS.reports,
    icon: BarChart3,
    roles: [
      ROLES.PLATFORM_ADMIN,
      ROLES.WORKSPACE_ADMIN,
      ROLES.MANAGER,
      ROLES.SUPPORT_AGENT,
    ],
  },
  {
    label: "Destek",
    to: PATHS.support,
    icon: HelpCircle,
    roles: [ROLES.PLATFORM_ADMIN, ROLES.WORKSPACE_ADMIN, ROLES.MANAGER],
  },
  {
    label: "Settings",
    to: PATHS.settings,
    icon: Settings,
    roles: [ROLES.PLATFORM_ADMIN, ROLES.WORKSPACE_ADMIN],
  },
];

// Helper to filter nav by the active role.
export const getNavForRole = (role) => {
  if (role === "admin" || role === "user") {
    return NAV_ITEMS;
  }
  return NAV_ITEMS.filter((item) => item.roles.includes(role));
};

export const ROLE_LABELS = {
  [ROLES.PLATFORM_ADMIN]: "Platform Yöneticisi",
  [ROLES.WORKSPACE_ADMIN]: "Workspace Yöneticisi",
  [ROLES.MANAGER]: "Yönetici",
  [ROLES.SUPPORT_AGENT]: "Destek Temsilcisi",
};

