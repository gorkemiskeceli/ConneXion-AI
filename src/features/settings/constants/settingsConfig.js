import {
  Building2,
  Users,
  Shield,
  Clock,
  LayoutTemplate,
  Bell,
  Puzzle,
  ScrollText,
} from "lucide-react";

import { ROLES } from "../../../constants/navigation";

// Left-hand settings sections.
export const SETTINGS_NAV = [
  { id: "workspace", label: "Workspace", icon: Building2 },
  { id: "users", label: "Kullanıcılar", icon: Users },
  { id: "roles", label: "Roller", icon: Shield },
  { id: "hours", label: "Çalışma Saatleri", icon: Clock },
  { id: "widget", label: "Widget Yapılandırması", icon: LayoutTemplate },
  { id: "notifications", label: "Bildirimler", icon: Bell },
  { id: "integrations", label: "Entegrasyonlar", icon: Puzzle },
  { id: "audit", label: "Denetim Kayıtları", icon: ScrollText },
];

// Business hours — days of the week.
export const WEEK_DAYS = [
  { id: "mon", label: "Pazartesi" },
  { id: "tue", label: "Salı" },
  { id: "wed", label: "Çarşamba" },
  { id: "thu", label: "Perşembe" },
  { id: "fri", label: "Cuma" },
  { id: "sat", label: "Cumartesi" },
  { id: "sun", label: "Pazar" },
];

// Widget placement options.
export const WIDGET_POSITIONS = [
  { value: "bottom-right", label: "Sağ Alt" },
  { value: "bottom-left", label: "Sol Alt" },
];

// Notification toggles.
export const NOTIFICATION_OPTIONS = [
  { id: "newConversation", label: "Yeni konuşma", description: "Yeni bir müşteri konuşması başladığında bildirim al." },
  { id: "assignment", label: "Atama", description: "Size bir konuşma atandığında bildirim al." },
  { id: "mention", label: "Bahsetme", description: "Bir notta sizden bahsedildiğinde bildirim al." },
  { id: "slaBreach", label: "SLA ihlali", description: "Yanıt süresi hedefi aşıldığında bildirim al." },
  { id: "dailySummary", label: "Günlük özet", description: "Her gün performans özeti gönderilsin." },
];

// Predefined roles + short descriptions (RBAC is fixed).
export const ROLES_INFO = [
  { id: ROLES.PLATFORM_ADMIN, description: "Tüm platformu ve workspaceleri yönetir." },
  { id: ROLES.WORKSPACE_ADMIN, description: "Kendi workspace ayarlarını ve ekibini yönetir." },
  { id: ROLES.MANAGER, description: "Destek operasyonlarını denetler ve atamaları yönetir." },
  { id: ROLES.SUPPORT_AGENT, description: "Atanan müşteri konuşmalarını yanıtlar." },
];

// Future-ready integration placeholders (coming soon).
export const INTEGRATION_PLACEHOLDERS = [
  { id: "webhook", name: "Webhook", description: "Olayları kendi sistemlerinize iletin." },
  { id: "crm", name: "CRM", description: "Müşteri verilerini senkronize edin." },
  { id: "slack", name: "Slack", description: "Bildirimleri Slack'e gönderin." },
  { id: "email", name: "E-posta", description: "E-posta ile bildirim gönderin." },
];

// Users table columns.
export const USER_COLUMNS = [
  { id: "user", label: "Kullanıcı" },
  { id: "role", label: "Rol" },
  { id: "status", label: "Durum" },
  { id: "lastLogin", label: "Son Giriş" },
];

// Audit log table columns.
export const AUDIT_COLUMNS = ["Zaman", "Kullanıcı", "İşlem", "Detay"];
