import { ROLES } from "./navigation";

// Centralized permission logic (mirrors permissions.md).
// Components ask `canInbox(role, action)` — they never hardcode role checks.

export const INBOX_ACTION = {
  REPLY: "reply",
  ASSIGN: "assign",
  REASSIGN: "reassign",
  CLOSE: "close",
  ADD_NOTE: "addNote",
  CHANGE_STATUS: "changeStatus",
  HANDOFF: "handoff",
};

const INBOX_MATRIX = {
  // Platform Admin — unrestricted.
  [ROLES.PLATFORM_ADMIN]: {
    reply: true,
    assign: true,
    reassign: true,
    close: true,
    addNote: true,
    changeStatus: true,
    handoff: true,
  },
  // Workspace Admin — full control within the workspace.
  [ROLES.WORKSPACE_ADMIN]: {
    reply: true,
    assign: true,
    reassign: true,
    close: true,
    addNote: true,
    changeStatus: true,
    handoff: true,
  },
  // Manager — supervises: reassigns, replies when needed, monitors.
  [ROLES.MANAGER]: {
    reply: true,
    assign: false,
    reassign: true,
    close: false,
    addNote: true,
    changeStatus: true,
    handoff: true,
  },
  // Support Agent — handles assigned conversations only.
  [ROLES.SUPPORT_AGENT]: {
    reply: true,
    assign: false,
    reassign: false,
    close: true,
    addNote: true,
    changeStatus: true,
    handoff: true,
  },
};

export const canInbox = (role, action) =>
  Boolean(INBOX_MATRIX[role]?.[action]);

// --- Contacts -------------------------------------------------------------

export const CONTACTS_ACTION = {
  VIEW: "view",
  CREATE: "create",
  EDIT: "edit",
  DELETE: "delete",
};

const CONTACTS_MATRIX = {
  // Platform Admin — full access.
  [ROLES.PLATFORM_ADMIN]: { view: true, create: true, edit: true, delete: true },
  // Workspace Admin — create, edit and manage contacts.
  [ROLES.WORKSPACE_ADMIN]: { view: true, create: true, edit: true, delete: true },
  // Manager — view and edit customer information.
  [ROLES.MANAGER]: { view: true, create: false, edit: true, delete: false },
  // Support Agent — view only (assigned customers); cannot delete.
  [ROLES.SUPPORT_AGENT]: { view: true, create: false, edit: false, delete: false },
};

export const canContacts = (role, action) =>
  Boolean(CONTACTS_MATRIX[role]?.[action]);

// --- AI Agent Studio ------------------------------------------------------

export const AI_STUDIO_ACTION = {
  VIEW: "view",
  EDIT: "edit", // configure instructions, guardrails, sources, handoff
  CREATE_AGENT: "createAgent",
  PLAYGROUND: "playground",
};

const AI_STUDIO_MATRIX = {
  // Platform Admin — full (sees platform-wide configuration).
  [ROLES.PLATFORM_ADMIN]: {
    view: true,
    edit: true,
    createAgent: true,
    playground: true,
  },
  // Workspace Admin — full access.
  [ROLES.WORKSPACE_ADMIN]: {
    view: true,
    edit: true,
    createAgent: true,
    playground: true,
  },
  // Manager — view configurations + use the Test Playground; cannot modify.
  [ROLES.MANAGER]: {
    view: true,
    edit: false,
    createAgent: false,
    playground: true,
  },
  // Support Agent — no access (also excluded from navigation).
  [ROLES.SUPPORT_AGENT]: {
    view: false,
    edit: false,
    createAgent: false,
    playground: false,
  },
};

export const canAiStudio = (role, action) =>
  Boolean(AI_STUDIO_MATRIX[role]?.[action]);

// --- Knowledge Base -------------------------------------------------------

export const KB_ACTION = {
  VIEW: "view",
  CREATE: "create",
  EDIT: "edit",
  DELETE: "delete",
  ORGANIZE: "organize", // manage categories
};

const KB_MATRIX = {
  // Platform Admin — view all knowledge bases (read-only).
  [ROLES.PLATFORM_ADMIN]: {
    view: true,
    create: false,
    edit: false,
    delete: false,
    organize: false,
  },
  // Workspace Admin — full management.
  [ROLES.WORKSPACE_ADMIN]: {
    view: true,
    create: true,
    edit: true,
    delete: true,
    organize: true,
  },
  // Manager — may edit existing content only.
  [ROLES.MANAGER]: {
    view: true,
    create: false,
    edit: true,
    delete: false,
    organize: false,
  },
  // Support Agent — view only.
  [ROLES.SUPPORT_AGENT]: {
    view: true,
    create: false,
    edit: false,
    delete: false,
    organize: false,
  },
};

export const canKnowledgeBase = (role, action) =>
  Boolean(KB_MATRIX[role]?.[action]);
