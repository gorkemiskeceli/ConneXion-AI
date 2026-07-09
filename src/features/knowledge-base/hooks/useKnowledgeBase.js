import { useState } from "react";
import {
  useGetKnowledgeArticlesQuery,
  useGetKbCategoryCountsQuery,
} from "../../../services/api";

/**
 * useKnowledgeBase — UI state + data seam for the Knowledge Base.
 *
 * Fetches articles and category counts using RTK Query.
 * Supports search, category filters, status filters, and active article viewing.
 */
export default function useKnowledgeBase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const { data: rawArticles = [], isLoading: articlesLoading, error } = useGetKnowledgeArticlesQuery();
  const { data: categoryCounts = {} } = useGetKbCategoryCountsQuery();

  // Filter articles locally based on selected options
  const articles = rawArticles.filter((article) => {
    const matchesCategory =
      activeCategory === "all" || article.category === activeCategory;

    const matchesSearch =
      !search ||
      article.title?.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
      article.content?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || article.status === statusFilter;

    return matchesCategory && matchesSearch && matchesStatus;
  });

  const selectedArticle =
    rawArticles.find((a) => a.id === selectedArticleId) ?? null;

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
    isLoading: articlesLoading,
    error,
  };
}
