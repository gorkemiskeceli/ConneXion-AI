import { useState } from "react";
import { Plus, X } from "lucide-react";

import useKnowledgeBase from "../hooks/useKnowledgeBase";
import CategorySidebar from "../components/CategorySidebar";
import ArticleToolbar from "../components/ArticleToolbar";
import ArticleList from "../components/ArticleList";
import ArticleDrawer from "../components/ArticleDrawer";
import { ROLES } from "../../../constants/navigation";
import { canKnowledgeBase, KB_ACTION } from "../../../constants/permissions";
import { useToast } from "../../../shared/components/ui/Toast";
import {
  useCreateKnowledgeArticleMutation,
  useUpdateKnowledgeArticleMutation,
  useDeleteKnowledgeArticleMutation,
} from "../../../services/api";

/**
 * KnowledgeBasePage — content library.
 * Fully wired with Create, Update, and Delete operations.
 */
export default function KnowledgeBasePage({ role = ROLES.PLATFORM_ADMIN }) {
  const { showToast } = useToast();
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [confirmData, setConfirmData] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general",
    status: "published",
  });

  const [createArticle] = useCreateKnowledgeArticleMutation();
  const [updateArticle] = useUpdateKnowledgeArticleMutation();
  const [deleteArticle] = useDeleteKnowledgeArticleMutation();

  const canCreate = canKnowledgeBase(role, KB_ACTION.CREATE);
  const canOrganize = canKnowledgeBase(role, KB_ACTION.ORGANIZE);

  const openCreateModal = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      content: "",
      category: activeCategory !== "all" ? activeCategory : "general",
      status: "published",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title || "",
      content: article.content || "",
      category: article.category || "general",
      status: article.status || "published",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setConfirmData({
      message: "Bu makaleyi silmek istediğinizden emin misiniz?",
      onConfirm: async () => {
        try {
          await deleteArticle(id).unwrap();
          showToast("Makale başarıyla silindi.", "success");
          if (selectedArticle && selectedArticle.id === id) {
            setSelectedArticleId(null);
          }
        } catch (err) {
          showToast("Makale silinirken hata oluştu.", "error");
          console.error("Silme hatası:", err);
        }
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      updatedAt: new Date().toLocaleDateString("tr-TR"),
    };

    try {
      if (editingArticle) {
        await updateArticle({ id: editingArticle.id, ...data }).unwrap();
        showToast("Makale başarıyla güncellendi.", "success");
      } else {
        await createArticle({
          ...data,
          views: 0,
          helpfulCount: 0,
        }).unwrap();
        showToast("Makale başarıyla oluşturuldu.", "success");
      }
      setIsModalOpen(false);
    } catch (err) {
      showToast("Makale kaydedilirken hata oluştu.", "error");
      console.error("Submit hatası:", err);
    }
  };

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
            onClick={openCreateModal}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/10 transition-all hover:bg-primary-600 active:scale-95"
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
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Article drawer */}
      <ArticleDrawer
        role={role}
        article={selectedArticle}
        onClose={() => setSelectedArticleId(null)}
      />

      {/* Glassmorphic Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl border border-white/40 bg-white/80 backdrop-blur-xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="font-heading text-lg font-extrabold text-slate-900">
                {editingArticle ? "Makaleyi Düzenle" : "Yeni Makale Ekle"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Makale Başlığı
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Örn. E-posta şifremi nasıl yenilerim?"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                  >
                    <option value="general">Genel (general)</option>
                    <option value="billing">Ödeme &amp; Faturalandırma (billing)</option>
                    <option value="tech">Teknik Destek (tech)</option>
                    <option value="account">Hesap Yönetimi (account)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Durum
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                  >
                    <option value="published">Yayınlandı (published)</option>
                    <option value="draft">Taslak (draft)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  İçerik
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Makale içeriğini buraya girin..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-md shadow-primary/10 hover:bg-primary-600 active:scale-95 transition-all"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Custom Confirmation Modal */}
      {confirmData && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/20 backdrop-blur-xs p-4 animate-in fade-in duration-100">
          <div className="w-full max-w-sm rounded-3xl border border-white/40 bg-white/80 backdrop-blur-xl p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="font-heading text-lg font-extrabold text-slate-900 mb-2">
              Emin misiniz?
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              {confirmData.message}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmData(null)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={() => {
                  confirmData.onConfirm();
                  setConfirmData(null);
                }}
                className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-red-600/10 hover:bg-red-700 active:scale-95 transition-all"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
