import { X, Pencil, Trash2, Clock, User } from "lucide-react";

import Badge from "../../../shared/components/ui/Badge";
import {
  ARTICLE_STATUS,
  categoryLabel,
} from "../constants/knowledgeBaseConfig";
import { canKnowledgeBase, KB_ACTION } from "../../../constants/permissions";

/**
 * ArticleDrawer — right-hand slide-over showing an article.
 * Renders nothing when no article is selected. Edit/delete gated by role.
 */
export default function ArticleDrawer({ role, article, onClose }) {
  if (!article) return null;

  const canEdit = canKnowledgeBase(role, KB_ACTION.EDIT);
  const canDelete = canKnowledgeBase(role, KB_ACTION.DELETE);
  const status = ARTICLE_STATUS[article.status] ?? ARTICLE_STATUS.draft;

  return (
    <div className="fixed inset-0 z-40">
      <button
        type="button"
        onClick={onClose}
        aria-label="Kapat"
        className="absolute inset-0 bg-slate-900/30"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[520px] flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
          <h3 className="font-heading text-sm font-bold text-slate-900">
            Makale
          </h3>
          <div className="flex items-center gap-1">
            {canEdit && (
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Düzenle"
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
            {canDelete && (
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                aria-label="Sil"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Kapat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Title + meta */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary">{categoryLabel(article.category)}</Badge>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
          <h2 className="mt-3 font-heading text-xl font-bold text-slate-900">
            {article.title}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            {article.author && (
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {article.author}
              </span>
            )}
            {article.updatedAt && (
              <span className="inline-flex items-center gap-1.5 font-mono">
                <Clock className="h-3.5 w-3.5" />
                {article.updatedAt}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="mt-5 border-t border-slate-100 pt-5">
            {article.content ? (
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {article.content}
              </div>
            ) : (
              <p className="text-sm text-slate-300">İçerik bulunmuyor.</p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
