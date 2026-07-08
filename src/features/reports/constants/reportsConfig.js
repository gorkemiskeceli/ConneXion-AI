import { MessagesSquare, Cpu, Timer, Smile, CheckCircle2 } from "lucide-react";

// Scope → subtitle label (scope comes from permissions.getReportsScope).
export const SCOPE_LABELS = {
  global: "Global Analitik",
  workspace: "İşletme Analitiği",
  team: "Ekip Analitiği",
  personal: "Kişisel Analitik",
};

// Date range options for the header filter.
export const RANGE_OPTIONS = [
  { id: "7d", label: "Son 7 Gün" },
  { id: "30d", label: "Son 30 Gün" },
  { id: "month", label: "Bu Ay" },
  { id: "quarter", label: "Bu Çeyrek" },
];

// Summary KPI tiles.
export const REPORT_KPIS = [
  { id: "totalConversations", label: "Toplam Konuşma", icon: MessagesSquare, tint: "bg-blue-50 text-blue-600" },
  { id: "aiResolutionRate", label: "AI Çözüm Oranı", icon: Cpu, tint: "bg-green-50 text-green-600" },
  { id: "avgResponse", label: "Ort. Yanıt Süresi", icon: Timer, tint: "bg-sky-50 text-sky-600" },
  { id: "csat", label: "CSAT Puanı", icon: Smile, tint: "bg-rose-50 text-rose-600" },
  { id: "resolved", label: "Kapanan Konuşma", icon: CheckCircle2, tint: "bg-indigo-50 text-indigo-600" },
];

// Shared chart palette.
export const CHART_COLORS = {
  primary: "#5B63F0",
  success: "#22C55E",
  amber: "#F59E0B",
  sky: "#0EA5E9",
  slate: "#94A3B8",
};
