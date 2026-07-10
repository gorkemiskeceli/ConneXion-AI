import { useState } from "react";
import { X } from "lucide-react";

import useSettings from "../hooks/useSettings";
import SettingsNav from "../components/SettingsNav";
import WorkspaceSection from "../components/sections/WorkspaceSection";
import UsersSection from "../components/sections/UsersSection";
import RolesSection from "../components/sections/RolesSection";
import BusinessHoursSection from "../components/sections/BusinessHoursSection";
import WidgetSection from "../components/sections/WidgetSection";
import NotificationsSection from "../components/sections/NotificationsSection";
import IntegrationsSection from "../components/sections/IntegrationsSection";
import AuditLogsSection from "../components/sections/AuditLogsSection";
import { ROLES } from "../../../constants/navigation";
import { canSettings, SETTINGS_ACTION } from "../../../constants/permissions";
import { useToast } from "../../../shared/components/ui/Toast";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../../services/api";

/**
 * SettingsPage — workspace configuration hub.
 * Wired with fully functioning user management (CRUD) and premium confirm overlays.
 */
export default function SettingsPage({
  role = ROLES.PLATFORM_ADMIN,
  initialSection = "workspace",
}) {
  const { showToast } = useToast();
  const { activeSection, setActiveSection, users, auditLogs } = useSettings({
    initialSection,
  });

  const canEdit = canSettings(role, SETTINGS_ACTION.EDIT);

  // RTK Query mutations
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // User form modal states
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    role: "support_agent",
    status: "active",
  });

  // Custom confirmation state
  const [confirmData, setConfirmData] = useState(null);

  const handleSave = () => {
    showToast("Ayarlar başarıyla kaydedildi.", "success");
  };

  // User CRUD Handlers
  const openInviteModal = () => {
    setEditingUser(null);
    setUserFormData({
      name: "",
      email: "",
      role: "support_agent",
      status: "active",
    });
    setIsUserModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setUserFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "support_agent",
      status: user.status || "active",
    });
    setIsUserModalOpen(true);
  };

  const handleDeleteUser = (id) => {
    setConfirmData({
      message: "Bu kullanıcıyı kaldırmak istediğinizden emin misiniz?",
      onConfirm: async () => {
        try {
          await deleteUser(id).unwrap();
          showToast("Kullanıcı başarıyla kaldırıldı.", "success");
        } catch (err) {
          showToast("Kullanıcı kaldırılırken hata oluştu.", "error");
          console.error("Kaldırma hatası:", err);
        }
      },
    });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser({ id: editingUser.id, ...userFormData }).unwrap();
        showToast("Kullanıcı bilgileri güncellendi.", "success");
      } else {
        await createUser({
          ...userFormData,
          lastLogin: new Date().toLocaleDateString("tr-TR"),
          availability: "offline",
        }).unwrap();
        showToast("Kullanıcı başarıyla davet edildi.", "success");
      }
      setIsUserModalOpen(false);
    } catch (err) {
      showToast("Kullanıcı kaydedilirken hata oluştu.", "error");
      console.error("Kaydetme hatası:", err);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "workspace":
        return <WorkspaceSection canEdit={canEdit} onSave={handleSave} />;
      case "users":
        return (
          <UsersSection
            canEdit={canEdit}
            users={users}
            onInvite={openInviteModal}
            onEdit={openEditModal}
            onDelete={handleDeleteUser}
          />
        );
      case "roles":
        return <RolesSection />;
      case "hours":
        return <BusinessHoursSection canEdit={canEdit} onSave={handleSave} />;
      case "widget":
        return <WidgetSection canEdit={canEdit} onSave={handleSave} />;
      case "notifications":
        return <NotificationsSection canEdit={canEdit} onSave={handleSave} />;
      case "integrations":
        return <IntegrationsSection />;
      case "audit":
        return <AuditLogsSection logs={auditLogs} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Workspace yapılandırmanızı yönetin.
        </p>
      </div>

      {/* Settings card */}
      <div className="flex min-h-[560px] flex-col overflow-hidden rounded-2xl bg-white shadow-card md:flex-row">
        <SettingsNav active={activeSection} onChange={setActiveSection} />
        <div className="min-w-0 flex-1">{renderSection()}</div>
      </div>

      {/* User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/80 backdrop-blur-xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="font-heading text-lg font-extrabold text-slate-900">
                {editingUser ? "Kullanıcıyı Düzenle" : "Yeni Kullanıcı Davet Et"}
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
                  <option value="platform_admin">Platform Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Durum
                </label>
                <select
                  value={userFormData.status}
                  onChange={(e) => setUserFormData({ ...userFormData, status: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                >
                  <option value="active">Aktif (active)</option>
                  <option value="pending">Beklemede (pending)</option>
                </select>
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
                Kaldır
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
