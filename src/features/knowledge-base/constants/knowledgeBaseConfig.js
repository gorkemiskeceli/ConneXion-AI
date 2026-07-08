import { HelpCircle, Package, Briefcase, Scale, FileText } from "lucide-react";

// Content categories defined by the product (FAQs, Products, Services,
// Policies, Documents). These are structural, not seeded data.
export const KB_CATEGORIES = [
  { id: "faq", label: "SSS", icon: HelpCircle },
  { id: "products", label: "Ürünler", icon: Package },
  { id: "services", label: "Hizmetler", icon: Briefcase },
  { id: "policies", label: "Politikalar", icon: Scale },
  { id: "documents", label: "Dökümanlar", icon: FileText },
];

export const categoryLabel = (id) =>
  KB_CATEGORIES.find((c) => c.id === id)?.label ?? "—";

// Article status → Badge variant + label.
export const ARTICLE_STATUS = {
  published: { label: "Yayında", variant: "success" },
  draft: { label: "Taslak", variant: "warning" },
  archived: { label: "Arşivlendi", variant: "neutral" },
};

// Status filter options.
export const ARTICLE_STATUS_FILTERS = [
  { id: "all", label: "Tüm Durumlar" },
  { id: "published", label: "Yayında" },
  { id: "draft", label: "Taslak" },
  { id: "archived", label: "Arşivlendi" },
];

// Article table columns.
export const ARTICLE_COLUMNS = [
  { id: "title", label: "Başlık" },
  { id: "category", label: "Kategori" },
  { id: "status", label: "Durum" },
  { id: "updatedAt", label: "Son Güncelleme" },
];
