import { Zap, GitBranch, Play } from "lucide-react";

// The three node categories a workflow is built from.
export const NODE_TYPES = {
  trigger: {
    label: "Tetikleyici",
    icon: Zap,
    tint: "bg-primary-50 text-primary-600",
    accent: "border-l-primary",
  },
  condition: {
    label: "Koşul",
    icon: GitBranch,
    tint: "bg-amber-50 text-amber-600",
    accent: "border-l-amber-400",
  },
  action: {
    label: "Aksiyon",
    icon: Play,
    tint: "bg-green-50 text-green-600",
    accent: "border-l-green-500",
  },
};

// Empty builder skeleton — the canonical Trigger → Condition → Action flow
// shown as unconfigured placeholders when no workflow is loaded.
export const SKELETON_NODES = [
  { id: "n-trigger", type: "trigger" },
  { id: "n-condition", type: "condition" },
  { id: "n-action", type: "action" },
];

// Workflow status → Badge variant + label.
export const WORKFLOW_STATUS = {
  active: { label: "Aktif", variant: "success" },
  paused: { label: "Duraklatıldı", variant: "neutral" },
  draft: { label: "Taslak", variant: "warning" },
};

// Configuration option lists (UI options, not seeded data).
export const TRIGGER_OPTIONS = [
  "Konuşma başladığında",
  "Yeni mesaj alındığında",
  "Anahtar kelime eşleştiğinde",
  "Çalışma saatleri dışında",
];

export const CONDITION_OPTIONS = [
  "Müşteri VIP ise",
  "Duygu olumsuz ise",
  "Güven skoru düşükse",
  "Mesaj sayısı belirli değeri aşarsa",
];

export const ACTION_OPTIONS = [
  "Temsilciye aktar",
  "Otomatik yanıt gönder",
  "Etiket ekle",
  "Kuyruğa ekle",
  "E-posta ile bildir",
];
