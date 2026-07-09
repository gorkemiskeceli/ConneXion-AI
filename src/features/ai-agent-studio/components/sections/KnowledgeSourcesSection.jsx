import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, BookOpen, Database, Trash2 } from "lucide-react";

import StudioSection from "../StudioSection";
import EmptyState from "../../../../shared/components/ui/EmptyState";
import Badge from "../../../../shared/components/ui/Badge";
import { PATHS } from "../../../../constants/paths";
import { useAddKnowledgeSourceMutation, useDeleteKnowledgeSourceMutation } from "../../../../services/api";

/**
 * KnowledgeSourcesSection — which knowledge sources the agent draws on.
 * source: { id, name, type, itemCount, status }
 */
export default function KnowledgeSourcesSection({ canEdit, sources = [] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("FAQ");
  const [itemCount, setItemCount] = useState(0);

  const [addKnowledgeSource] = useAddKnowledgeSourceMutation();
  const [deleteKnowledgeSource] = useDeleteKnowledgeSourceMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await addKnowledgeSource({
        id: `ks_${Date.now()}`,
        name: name.trim(),
        type,
        itemCount: Number(itemCount),
        status: "active",
      }).unwrap();
      
      // Reset form
      setName("");
      setType("FAQ");
      setItemCount(0);
      setIsAdding(false);
    } catch (err) {
      console.error("Failed to add knowledge source:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu bilgi kaynağını kaldırmak istediğinize emin misiniz?")) {
      try {
        await deleteKnowledgeSource(id).unwrap();
      } catch (err) {
        console.error("Failed to delete knowledge source:", err);
      }
    }
  };

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
        {canEdit && !isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
            Kaynak Ekle
          </button>
        )}
      </div>

      {/* Inline Add Source Form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="mb-4 space-y-3 rounded-xl border border-slate-200 p-4 bg-slate-50/50 animate-in fade-in duration-250">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Kaynak Adı</label>
              <input
                type="text"
                required
                placeholder="Örn. Ürün SSS"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Tür</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="FAQ">FAQ</option>
                <option value="Doküman">Doküman</option>
                <option value="Ürün">Ürün</option>
                <option value="Hizmet">Hizmet</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Öğe Sayısı</label>
              <input
                type="number"
                min={0}
                required
                value={itemCount}
                onChange={(e) => setItemCount(parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 text-xs">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-3 py-1.5 font-medium text-white hover:bg-primary-600 transition-colors"
            >
              Ekle
            </button>
          </div>
        </form>
      )}

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
                  onClick={() => handleDelete(source.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
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

