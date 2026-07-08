import { Plus } from "lucide-react";

import useKnowledgeBase from "../hooks/useKnowledgeBase";
import CategorySidebar from "../components/CategorySidebar";
import ArticleToolbar from "../components/ArticleToolbar";
import ArticleList from "../components/ArticleList";
import ArticleDrawer from "../components/ArticleDrawer";
import { ROLES } from "../../../constants/navigation";
import { canKnowledgeBase, KB_ACTION } from "../../../constants/permissions";

/**
 * KnowledgeBasePage — content management system used by the AI.
 *
 * Header (title + gated "Yeni Makale") → category sidebar + a card with the
 * article toolbar and table → an article drawer opened from a row.
 *
 * Permissions: Workspace Admin has full management; Manager can edit existing
 * articles; Platform Admin and Support Agent are view-only. Empty by design.
 */
export default function KnowledgeBasePage({ role = ROLES.PLATFORM_ADMIN }) {
  const {
    activeCategory,
    setActiveCategory,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    articles,
    categoryCounts,
    selectedArticle,
    setSelectedArticleId,
  } = useKnowledgeBase();

  const canCreate = canKnowledgeBase(role, KB_ACTION.CREATE);
  const canOrganize = canKnowledgeBase(role, KB_ACTION.ORGANIZE);

  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900">
            Knowledge Base
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Yapay zekanın kullandığı içerik kütüphanesini yönetin.
          </p>
        </div>

        {canCreate && (
          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-600"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Yeni Makale
          </button>
        )}
      </div>

      {/* Sidebar + articles */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <CategorySidebar
          active={activeCategory}
          onSelect={setActiveCategory}
          counts={categoryCounts}
          canOrganize={canOrganize}
        />

        <div className="min-w-0 flex-1 rounded-2xl bg-white shadow-card">
          <ArticleToolbar
            search={search}
            onSearch={setSearch}
            statusFilter={statusFilter}
            onStatusFilter={setStatusFilter}
            total={articles.length}
          />
          <ArticleList
            role={role}
            articles={articles}
            onSelect={setSelectedArticleId}
          />
        </div>
      </div>

      {/* Article drawer */}
      <ArticleDrawer
        role={role}
        article={selectedArticle}
        onClose={() => setSelectedArticleId(null)}
      />
    </div>
  );
}
