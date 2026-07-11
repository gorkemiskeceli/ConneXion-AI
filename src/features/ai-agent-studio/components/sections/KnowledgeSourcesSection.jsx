import { useState } from "react";
import { Trash2, Plus, Database } from "lucide-react";

import StudioSection from "../StudioSection";
import EmptyState from "../../../../shared/components/ui/EmptyState";
import { useAddKnowledgeSourceMutation, useDeleteKnowledgeSourceMutation } from "../../../../services/api";

/**
 * KnowledgeSourcesSection — manages indexed context files.
 * sources: { id, name, type, itemCount, status }
 */
export default function KnowledgeSourcesSection({ canEdit, sources = [], onReset }) {
  const [addKnowledgeSource] = useAddKnowledgeSourceMutation();
  const [deleteKnowledgeSource] = useDeleteKnowledgeSourceMutation();

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("FAQ");
  const [itemCount, setItemCount] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await addKnowledgeSource({
        id: `ks_${Date.now()}`,
        name: name.trim(),
        type,
        itemCount: itemCount ? Number(itemCount) : 0,
        status: "active",
      }).unwrap();

      setName("");
      setType("FAQ");
      setItemCount("");
      setIsAdding(false);
    } catch (err) {
      console.error("Failed to add knowledge source:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu bilgi kaynağını silmek istediğinize emin misiniz?")) {
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
      description="Asistanın yanıt verirken kullanacağı bilgi tabanlarını ve dokümanları bağlayın."
      canEdit={canEdit}
      onReset={onReset}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-semibold text-slate-700">Aktif Kaynaklar</h4>
          {canEdit && !isAdding && (
            <button
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
          <form onSubmit={handleAdd} className="mb-4 space-y-3 rounded-xl border border-slate-200 p-4 bg-slate-50/50 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Kaynak Adı</label>
                <input
                  type="text"
                  required
                  placeholder="Örn. SSS Belgesi"
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
                  <option value="FAQ">FAQ (Sıkça Sorulanlar)</option>
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
                  placeholder="Örn. 24"
                  value={itemCount}
                  onChange={(e) => setItemCount(e.target.value)}
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
                Kaydet
              </button>
            </div>
          </form>
        )}

        {sources.length === 0 ? (
          <EmptyState
            icon={Database}
            title="Bilgi kaynağı yok"
            description="Bu asistan için tanımlanmış bilgi kaynağı bulunamadı."
          />
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
            <table className="w-full border-collapse text-left text-sm text-slate-500">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Kaynak Adı</th>
                  <th className="px-6 py-3">Tür</th>
                  <th className="px-6 py-3 text-right">Öğe Sayısı</th>
                  <th className="px-6 py-3 text-center">Durum</th>
                  {canEdit && <th className="px-6 py-3 text-right">İşlem</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sources.map((src) => (
                  <tr key={src.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{src.name}</td>
                    <td className="px-6 py-4">{src.type}</td>
                    <td className="px-6 py-4 text-right font-mono text-xs">{src.itemCount}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        src.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                      }`}>
                        {src.status === "active" ? "Aktif" : "Devre Dışı"}
                      </span>
                    </td>
                    {canEdit && (
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(src.id)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </StudioSection>
  );
}
