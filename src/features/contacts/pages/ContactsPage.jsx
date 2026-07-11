import { useState } from "react";
import { UserPlus, X } from "lucide-react";

import useContacts from "../hooks/useContacts";
import ContactsToolbar from "../components/ContactsToolbar";
import ContactsTable from "../components/ContactsTable";
import ContactProfileDrawer from "../components/ContactProfileDrawer";
import { ROLES } from "../../../constants/navigation";
import { canContacts, CONTACTS_ACTION } from "../../../constants/permissions";
import { useToast } from "../../../shared/components/ui/Toast";
import {
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} from "../../../services/api";

/**
 * ContactsPage — customer management.
 * Wired with fully functioning CRUD operations using Redux Toolkit mutations.
 */
export default function ContactsPage({ role = ROLES.PLATFORM_ADMIN }) {
  const { showToast } = useToast();
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sort,
    toggleSort,
    page,
    setPage,
    totalPages,
    contacts,
    selectedContact,
    setSelectedContactId,
  } = useContacts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [confirmData, setConfirmData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    status: "active",
    tags: "",
  });

  const [createCustomer] = useCreateCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const canCreate = canContacts(role, CONTACTS_ACTION.CREATE);

  const openCreateModal = () => {
    setEditingContact(null);
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      status: "active",
      tags: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name || "",
      email: contact.email || "",
      company: contact.company || "",
      phone: contact.phone || "",
      status: contact.status || "active",
      tags: contact.tags ? contact.tags.join(", ") : "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setConfirmData({
      message: "Bu kişiyi silmek istediğinizden emin misiniz?",
      onConfirm: async () => {
        try {
          await deleteCustomer(id).unwrap();
          showToast("Kişi başarıyla silindi.", "success");
          if (selectedContact && selectedContact.id === id) {
            setSelectedContactId(null);
          }
        } catch (err) {
          showToast("Kişi silinirken hata oluştu.", "error");
          console.error("Silme hatası:", err);
        }
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      tags: formData.tags
        ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    };

    try {
      if (editingContact) {
        await updateCustomer({ id: editingContact.id, ...data }).unwrap();
        showToast("Kişi bilgileri güncellendi.", "success");
      } else {
        await createCustomer({
          ...data,
          conversations: 0,
          lastActivity: new Date().toLocaleDateString("tr-TR"),
        }).unwrap();
        showToast("Kişi başarıyla eklendi.", "success");
      }
      setIsModalOpen(false);
    } catch (err) {
      showToast("Kişi kaydedilirken hata oluştu.", "error");
      console.error("Submit hatası:", err);
    }
  };

  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900">
            Contacts
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Müşterilerinizi görüntüleyin ve yönetin.
          </p>
        </div>

        {canCreate && (
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/10 transition-all hover:bg-primary-600 active:scale-95"
          >
            <UserPlus className="h-4 w-4" strokeWidth={2} />
            Yeni Kişi
          </button>
        )}
      </div>

      {/* Table card */}
      <div className="rounded-2xl bg-white shadow-card">
        <ContactsToolbar
          search={search}
          onSearch={setSearch}
          statusFilter={statusFilter}
          onStatusFilter={setStatusFilter}
          total={contacts.length}
        />
        <ContactsTable
          role={role}
          contacts={contacts}
          sort={sort}
          onSort={toggleSort}
          onSelect={setSelectedContactId}
          onEdit={openEditModal}
          onDelete={handleDelete}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* Profile drawer */}
      <ContactProfileDrawer
        role={role}
        contact={selectedContact}
        onClose={() => setSelectedContactId(null)}
      />

      {/* Glassmorphic Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/80 backdrop-blur-xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="font-heading text-lg font-extrabold text-slate-900">
                {editingContact ? "Kişiyi Düzenle" : "Yeni Kişi Ekle"}
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
                  Ad Soyad
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ahmet@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Telefon
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0555 123 4567"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Şirket
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Precise Corp"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Etiketler (Virgülle ayırın)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="VIP, Destek, Kurumsal"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                />
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
                  <option value="active">Aktif (active)</option>
                  <option value="inactive">Pasif (inactive)</option>
                </select>
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
