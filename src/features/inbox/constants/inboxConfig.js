import { Globe } from "lucide-react";

// Conversation status → Badge variant + label.
export const CONVERSATION_STATUS = {
  open: { label: "Açık", variant: "primary" },
  pending: { label: "Bekliyor", variant: "warning" },
  closed: { label: "Kapalı", variant: "neutral" },
};

// List filter tabs.
export const INBOX_FILTERS = [
  { id: "all", label: "Tümü" },
  { id: "mine", label: "Bana Atanan" },
  { id: "unassigned", label: "Atanmamış" },
  { id: "pending", label: "Bekleyen" },
  { id: "closed", label: "Kapalı" },
];

// Who sent a message — drives bubble alignment/styling.
export const SENDER = {
  CUSTOMER: "customer",
  AGENT: "agent",
  AI: "ai",
};

// Message type — the widget supports text and voice only.
export const MESSAGE_TYPE = {
  TEXT: "text",
  VOICE: "voice",
};

// Website chat is the only channel in this platform.
export const CHANNEL = {
  web: { label: "Web Chat", icon: Globe },
};

// Composer modes.
export const COMPOSER_MODE = {
  REPLY: "reply",
  NOTE: "note",
};
