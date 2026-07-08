import { Link } from "react-router-dom";
import { Plus, BookOpen, Database, Trash2 } from "lucide-react";

import StudioSection from "../StudioSection";
import EmptyState from "../../../../shared/components/ui/EmptyState";
import Badge from "../../../../shared/components/ui/Badge";
import { PATHS } from "../../../../constants/paths";

/**
 * KnowledgeSourcesSection — which knowledge sources the agent draws on.
 * source: { id, name, type, itemCount, status }
 */
export default function KnowledgeSourcesSection({ canEdit, sources = [] }) {
  return (
    <StudioSection
      title="Bilgi Kaynakları"
      description="Asistanın yanıtlarken kullanacağı bilgi kaynaklarını bağlayın."
    >
      <div className="mb-4 flex items-center justify-between">
        <Link
          to={PATHS.knowledgeBase}
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Bilgi Tabanını Yönet →
        </Link>
        {canEdit && (
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
            Kaynak Ekle
          </button>
        )}
      </div>

      {sources.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Bağlı kaynak yok"
          description="Bilgi tabanından kaynak bağladığınızda burada listelenir."
        />
      ) : (
        <ul className="space-y-2">
          {sources.map((source) => (
            <li
              key={source.id}
              className="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <Database className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">
                  {source.name}
                </p>
                <p className="text-xs text-slate-400">
                  {source.type} · {source.itemCount} öğe
                </p>
              </div>
              <Badge variant={source.status === "active" ? "success" : "neutral"}>
                {source.status === "active" ? "Aktif" : "Pasif"}
              </Badge>
              {canEdit && (
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                  aria-label="Kaldır"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </StudioSection>
  );
}
