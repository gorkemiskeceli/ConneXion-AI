import { Eye, Pencil, Trash2, BookOpen } from "lucide-react";

import EmptyState from "../../../shared/components/ui/EmptyState";
import Badge from "../../../shared/components/ui/Badge";
import {
  ARTICLE_COLUMNS,
  ARTICLE_STATUS,
  categoryLabel,
} from "../constants/knowledgeBaseConfig";
import { canKnowledgeBase, KB_ACTION } from "../../../constants/permissions";

/**
 * ArticleList — the knowledge base articles table.
 * Rows open the article drawer; edit/delete are gated by role.
 * article: { id, title, category, status, updatedAt }
 */
export default function ArticleList({ role, articles = [], onSelect }) {
  const canEdit = canKnowledgeBase(role, KB_ACTION.EDIT);
  const canDelete = canKnowledgeBase(role, KB_ACTION.DELETE);
  const colSpan = ARTICLE_COLUMNS.length + 1;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-left font-mono text-[11px] uppercase tracking-wide text-slate-400">
            {ARTICLE_COLUMNS.map((col) => (
              <th key={col.id} className="px-5 py-3 font-medium">
                {col.label}
              </th>
            ))}
            <th className="px-5 py-3 text-right font-medium">İşlemler</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-50">
          {articles.length === 0 ? (
            <tr>
              <td colSpan={colSpan}>
                <EmptyState
                  icon={BookOpen}
                  title="Makale bulunmuyor"
                  description="Bilgi tabanına içerik eklendiğinde burada listelenir."
                />
              </td>
            </tr>
          ) : (
            articles.map((article) => {
              const status =
                ARTICLE_STATUS[article.status] ?? ARTICLE_STATUS.draft;
              return (
                <tr
                  key={article.id}
                  onClick={() => onSelect?.(article.id)}
                  className="cursor-pointer text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <td className="px-5 py-3">
                    <span className="font-medium text-slate-900">
                      {article.title}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-500">
                    {categoryLabel(article.category)}
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-400">
                    {article.updatedAt ?? "—"}
                  </td>
                  <td
                    className="px-5 py-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onSelect?.(article.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        aria-label="Görüntüle"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
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
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
