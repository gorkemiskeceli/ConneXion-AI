import {
  SlidersHorizontal,
  FileText,
  BookOpen,
  ShieldCheck,
  GitBranch,
  FlaskConical,
  ScrollText,
} from "lucide-react";

// Left-hand section tabs of the studio.
export const STUDIO_TABS = [
  { id: "general", label: "Genel", icon: SlidersHorizontal },
  { id: "instructions", label: "Talimatlar", icon: FileText },
  { id: "knowledge", label: "Bilgi Kaynakları", icon: BookOpen },
  { id: "guardrails", label: "Guardrails", icon: ShieldCheck },
  { id: "handoff", label: "Aktarım Kuralları", icon: GitBranch },
  { id: "playground", label: "Test Alanı", icon: FlaskConical },
  { id: "logs", label: "AI Kayıtları", icon: ScrollText },
];

// General settings — select options (UI options, not seeded data).
export const LANGUAGE_OPTIONS = [
  { value: "tr", label: "Türkçe" },
  { value: "en", label: "İngilizce" },
  { value: "auto", label: "Otomatik Algıla" },
];

export const TONE_OPTIONS = [
  { value: "professional", label: "Profesyonel" },
  { value: "friendly", label: "Samimi" },
  { value: "formal", label: "Resmi" },
  { value: "concise", label: "Kısa ve Net" },
];

// Guardrail toggles.
export const GUARDRAIL_OPTIONS = [
  {
    id: "restrictToKnowledge",
    label: "Yalnızca bilgi tabanından yanıtla",
    description: "Asistan yalnızca bilgi kaynaklarındaki içerikleri kullanır.",
  },
  {
    id: "piiMasking",
    label: "Kişisel veri (PII) maskeleme",
    description: "E-posta, telefon gibi hassas veriler yanıtlarda gizlenir.",
  },
  {
    id: "profanityFilter",
    label: "Küfür ve hakaret filtresi",
    description: "Uygunsuz dil içeren girdiler engellenir.",
  },
  {
    id: "blockOffTopic",
    label: "Konu dışı soruları engelle",
    description: "Destek kapsamı dışındaki isteklere yanıt verilmez.",
  },
];

// Handoff (human transfer) conditions.
export const HANDOFF_CONDITIONS = [
  {
    id: "lowConfidence",
    label: "Düşük güven skorunda aktar",
    description: "Asistan emin olmadığında konuşma temsilciye devredilir.",
  },
  {
    id: "customerRequest",
    label: "Müşteri talep ettiğinde aktar",
    description: "Müşteri temsilci istediğinde otomatik aktarılır.",
  },
  {
    id: "negativeSentiment",
    label: "Olumsuz duygu algılandığında aktar",
    description: "Öfke veya memnuniyetsizlik algılanırsa aktarım yapılır.",
  },
];

// AI logs table columns.
export const LOG_COLUMNS = ["Zaman", "Olay", "Güven Skoru", "Aksiyon"];
