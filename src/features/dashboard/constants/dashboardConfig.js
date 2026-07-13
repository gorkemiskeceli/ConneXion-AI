import {
  MessagesSquare,
  Clock,
  Cpu,
  Timer,
  Smile,
  Users,
  Sparkles,
} from "lucide-react";

// "Operasyonun anlık özeti" — the six KPI tiles.
// This is layout config (label + icon + color), not data. Numeric values are
// looked up from the dashboard data by `id` and left blank when absent.
export const KPI_CARDS = [
  {
    id: "activeConversations",
    label: "Aktif Konuşma",
    icon: MessagesSquare,
    tint: "bg-blue-50 text-blue-600",
  },
  {
    id: "waitingConversations",
    label: "Bekleyen Konuşma",
    icon: Clock,
    tint: "bg-amber-50 text-amber-600",
  },
  {
    id: "aiResolutionRate",
    label: "AI Çözüm Oranı",
    icon: Cpu,
    tint: "bg-green-50 text-green-600",
  },
  {
    id: "avgFirstResponse",
    label: "Ortalama İlk Yanıt Süresi",
    icon: Timer,
    tint: "bg-sky-50 text-sky-600",
  },
  {
    id: "csatScore",
    label: "CSAT Puanı",
    icon: Smile,
    tint: "bg-rose-50 text-rose-600",
  },
  {
    id: "agentLoad",
    label: "Temsilci Yükü",
    icon: Users,
    tint: "bg-indigo-50 text-indigo-600",
  },
  {
    id: "totalTokensUsed",
    label: "Kalan AI Token Limiti",
    icon: Sparkles,
    tint: "bg-violet-50 text-violet-600",
  },
];

// Priority pill mapping for the urgent queue.
export const PRIORITY_VARIANTS = {
  high: { label: "Yüksek", variant: "danger" },
  medium: { label: "Orta", variant: "warning" },
  low: { label: "Düşük", variant: "neutral" },
};

// Presence dot mapping for active agents.
export const PRESENCE = {
  online: { label: "Çevrimiçi", dot: "bg-green-500" },
  busy: { label: "Meşgul", dot: "bg-amber-500" },
  offline: { label: "Çevrimdışı", dot: "bg-slate-300" },
};
