import { useState } from "react";
import { Plus, UserPlus, X } from "lucide-react";

import useTeamQueues from "../hooks/useTeamQueues";
import TeamQueuesTabs from "../components/TeamQueuesTabs";
import TeamMembersTab from "../components/TeamMembersTab";
import QueuesTab from "../components/QueuesTab";
import TeamPerformanceTab from "../components/TeamPerformanceTab";
import { ROLES } from "../../../constants/navigation";
import { useToast } from "../../../shared/components/ui/Toast";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateQueueMutation,
  useUpdateQueueMutation,
  useDeleteQueueMutation,
} from "../../../services/api";

/**
 * TeamQueuesPage — support team management.
 * Wired with fully functioning CRUD operations for both Users/Members and Queues.
 */
export default function TeamQueuesPage({ role = ROLES.PLATFORM_ADMIN }) {
  const { showToast } = useToast();
  const { activeTab, setActiveTab, search, setSearch, members, queues, performance } =
    useTeamQueues();

  // RTK Query Mutations
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [createQueue] = useCreateQueueMutation();
  const [updateQueue] = useUpdateQueueMutation();
  const [deleteQueue] = useDeleteQueueMutation();

  // Modal States
  const [confirmData, setConfirmData] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    role: "support_agent",
    availability: "offline",
    queue: "Genel",
  });

  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [editingQueue, setEditingQueue] = useState(null);
  const [queueFormData, setQueueFormData] = useState({
    name: "",
    description: "",
    status: "active",
  });

  // User Actions
  const openInviteUserModal = () => {
    setEditingUser(null);
    setUserFormData({
      name: "",
      email: "",
      role: "support_agent",
      availability: "online",
      queue: queues[0]?.name || "Genel",
    });
    setIsUserModalOpen(true);
  };

  const openEditUserModal = (user) => {
    setEditingUser(user);
    setUserFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "support_agent",
      availability: user.availability || "offline",
      queue: user.queue || "Genel",
    });
    setIsUserModalOpen(true);
  };

  const handleDeleteUser = (id) => {
    setConfirmData({
      message: "Bu ekip üyesini kaldırmak istediğinizden emin misiniz?",
      onConfirm: async () => {
        try {
          await deleteUser(id).unwrap();
          showToast("Ekip üyesi başarıyla kaldırıldı.", "success");
        } catch (err) {
          showToast("Ekip üyesi kaldırılırken hata oluştu.", "error");
          console.error("Üye kaldırma hatası:", err);
        }
      },
    });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser({ id: editingUser.id, ...userFormData }).unwrap();
        showToast("Üye bilgileri güncellendi.", "success");
      } else {
        await createUser({
          ...userFormData,
          activeCount: 0,
        }).unwrap();
        showToast("Ekip üyesi başarıyla davet edildi.", "success");
      }
      setIsUserModalOpen(false);
    } catch (err) {
      showToast("Üye kaydedilirken hata oluştu.", "error");
      console.error("Üye kaydetme hatası:", err);
    }
  };

  // Queue Actions
  const openCreateQueueModal = () => {
    setEditingQueue(null);
    setQueueFormData({
      name: "",
      description: "",
      status: "active",
    });
    setIsQueueModalOpen(true);
  };

  const openEditQueueModal = (q) => {
    setEditingQueue(q);
    setQueueFormData({
      name: q.name || "",
      description: q.description || "",
      status: q.status || "active",
    });
    setIsQueueModalOpen(true);
  };

  const handleDeleteQueue = (id) => {
    setConfirmData({
      message: "Bu kuyruğu silmek istediğinizden emin misiniz?",
      onConfirm: async () => {
        try {
          await deleteQueue(id).unwrap();
          showToast("Kuyruk başarıyla silindi.", "success");
        } catch (err) {
          showToast("Kuyruk silinirken hata oluştu.", "error");
          console.error("Kuyruk silme hatası:", err);
        }
      },
    });
  };

  const handleQueueSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingQueue) {
        await updateQueue({
          id: editingQueue.id,
          ...queueFormData,
          agents: editingQueue.agents || [],
          waiting: editingQueue.waiting || 0,
        }).unwrap();
        showToast("Kuyruk bilgileri güncellendi.", "success");
      } else {
        await createQueue({
          ...queueFormData,
          waiting: 0,
          agents: [],
        }).unwrap();
        showToast("Kuyruk başarıyla oluşturuldu.", "success");
      }
      setIsQueueModalOpen(false);
    } catch (err) {
      showToast("Kuyruk kaydedilirken hata oluştu.", "error");
      console.error("Kuyruk kaydetme hatası:", err);
    }
  };

  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">
          Team &amp; Queues
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Destek ekibinizi, kuyruklarınızı ve atamaları yönetin.
        </p>
      </div>

      <TeamQueuesTabs active={activeTab} onChange={setActiveTab} />

      {activeTab === "members" && (
        <TeamMembersTab
          role={role}
          members={members}
          search={search}
          onSearch={setSearch}
          onInvite={openInviteUserModal}
          onEdit={openEditUserModal}
          onDelete={handleDeleteUser}
        />
      )}
      {activeTab === "queues" && (
        <QueuesTab
          role={role}
          queues={queues}
          onCreate={openCreateQueueModal}
          onEdit={openEditQueueModal}
          onDelete={handleDeleteQueue}
        />
      )}
      {activeTab === "performance" && (
        <TeamPerformanceTab performance={performance} />
      )}

      {/* User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/80 backdrop-blur-xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="font-heading text-lg font-extrabold text-slate-900">
                {editingUser ? "Üye Bilgilerini Düzenle" : "Yeni Ekip Üyesi Davet Et"}
              </h3>
              <button
                type="button"
                onClick={() => setIsUserModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUserSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  required
                  value={userFormData.name}
                  onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                  placeholder="Ahmet Yılmaz"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  E-posta
                </label>
                <input
                  type="email"
                  required
                  value={userFormData.email}
                  onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                  placeholder="ahmet@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Rol
                </label>
                <select
                  value={userFormData.role}
                  onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                >
                  <option value="support_agent">Support Agent</option>
                  <option value="manager">Manager</option>
                  <option value="workspace_admin">Workspace Admin</option>
                  {role === ROLES.PLATFORM_ADMIN && (
                    <option value="platform_admin">Platform Admin</option>
                  )}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Durum (Availability)
                  </label>
                  <select
                    value={userFormData.availability}
                    onChange={(e) => setUserFormData({ ...userFormData, availability: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                  >
                    <option value="online">Aktif (online)</option>
                    <option value="busy">Meşgul (busy)</option>
                    <option value="offline">Çevrimdışı (offline)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Kuyruk
                  </label>
                  <select
                    value={userFormData.queue}
                    onChange={(e) => setUserFormData({ ...userFormData, queue: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                  >
                    {queues.map((q) => (
                      <option key={q.id} value={q.name}>
                        {q.name}
                      </option>
                    ))}
                    <option value="Genel">Genel</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
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

      {/* Queue Modal */}
      {isQueueModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/80 backdrop-blur-xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="font-heading text-lg font-extrabold text-slate-900">
                {editingQueue ? "Kuyruğu Düzenle" : "Yeni Kuyruk Oluştur"}
              </h3>
              <button
                type="button"
                onClick={() => setIsQueueModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleQueueSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Kuyruk Adı
                </label>
                <input
                  type="text"
                  required
                  value={queueFormData.name}
                  onChange={(e) => setQueueFormData({ ...queueFormData, name: e.target.value })}
                  placeholder="Örn. VIP Destek, İptaller"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Açıklama
                </label>
                <input
                  type="text"
                  value={queueFormData.description}
                  onChange={(e) => setQueueFormData({ ...queueFormData, description: e.target.value })}
                  placeholder="Örn. Öncelikli destek talepleri kuyruğu"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Durum
                </label>
                <select
                  value={queueFormData.status}
                  onChange={(e) => setQueueFormData({ ...queueFormData, status: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                >
                  <option value="active">Aktif (active)</option>
                  <option value="inactive">Pasif (inactive)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsQueueModalOpen(false)}
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
