import { useState } from "react";

/**
 * useKnowledgeBase — UI state + data seam for the Knowledge Base.
 *
 * Ships empty (no mock data). Wire articles + category counts to
 * Redux/JSON Server later; keep the article shape stable.
 *
 * article: {
 *   id, title, excerpt, content, category, status, author, updatedAt
 * }
 */
export default function useKnowledgeBase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  // Server state — replace later.
  const articles = [];
  const categoryCounts = {}; // { faq: 0, products: 0, ... }

  const selectedArticle =
    articles.find((a) => a.id === selectedArticleId) ?? null;

  return {
    activeCategory,
    setActiveCategory,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedArticleId,
    setSelectedArticleId,
    articles,
    categoryCounts,
    selectedArticle,
  };
}
