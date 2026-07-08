import { Users, Layers, BarChart3 } from "lucide-react";

// Page tabs.
export const TEAM_TABS = [
  { id: "members", label: "Ekip Üyeleri", icon: Users },
  { id: "queues", label: "Kuyruklar", icon: Layers },
  { id: "performance", label: "Performans", icon: BarChart3 },
];

// Availability states → dot color + label.
export const AVAILABILITY = {
  online: { label: "Çevrimiçi", dot: "bg-green-500" },
  busy: { label: "Meşgul", dot: "bg-amber-500" },
  away: { label: "Uzakta", dot: "bg-yellow-400" },
  offline: { label: "Çevrimdışı", dot: "bg-slate-300" },
};

// Queue status → Badge variant + label.
export const QUEUE_STATUS = {
  active: { label: "Aktif", variant: "success" },
  paused: { label: "Duraklatıldı", variant: "neutral" },
};

// Team members table columns.
export const MEMBER_COLUMNS = [
  { id: "member", label: "Üye" },
  { id: "role", label: "Rol" },
  { id: "availability", label: "Durum" },
  { id: "queue", label: "Kuyruk" },
  { id: "active", label: "Aktif Konuşma" },
];

// Team performance table columns.
export const PERFORMANCE_COLUMNS = [
  { id: "agent", label: "Temsilci" },
  { id: "assigned", label: "Atanan" },
  { id: "resolved", label: "Çözülen" },
  { id: "avgResponse", label: "Ort. Yanıt" },
  { id: "aiRate", label: "AI Çözüm Oranı" },
  { id: "csat", label: "CSAT" },
];
