import { Link } from "react-router-dom";
import {
  X,
  Pencil,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Building2,
  CalendarDays,
  Sparkles,
  MessageSquare,
  StickyNote,
} from "lucide-react";

import Avatar from "../../../shared/components/ui/Avatar";
import Badge from "../../../shared/components/ui/Badge";
import { PATHS } from "../../../constants/paths";
import { CONTACT_STATUS } from "../constants/contactsConfig";
import { canContacts, CONTACTS_ACTION } from "../../../constants/permissions";

function Section({ title, icon: Icon, children }) {
  return (
    <section className="border-b border-slate-100 px-5 py-4 last:border-b-0">
      <h4 className="mb-3 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {title}
      </h4>
      {children}
    </section>
  );
}

function InfoRow({ icon: Icon, value, empty }) {
  return (
    <div className="flex items-center gap-2.5 py-1 text-sm">
      <Icon className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.9} />
      <span className={value ? "text-slate-700" : "text-slate-300"}>
        {value || empty}
      </span>
    </div>
  );
}

/**
 * ContactProfileDrawer — right-hand slide-over for a single customer.
 * Renders nothing when no contact is selected.
 * Edit / delete controls are gated by role.
 */
export default function ContactProfileDrawer({ role, contact, onClose }) {
  const open = Boolean(contact);
  const canEdit = canContacts(role, CONTACTS_ACTION.EDIT);
  const canDelete = canContacts(role, CONTACTS_ACTION.DELETE);

  if (!open) return null;

  const status = CONTACT_STATUS[contact.status] ?? CONTACT_STATUS.inactive;

  return (
    <div className="fixed inset-0 z-40">
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Kapat"
        className="absolute inset-0 bg-slate-900/30"
      />

      {/* Panel */}
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
          <h3 className="font-heading text-sm font-bold text-slate-900">
            Müşteri Profili
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

        <div className="flex-1 overflow-y-auto">
          {/* Profile header */}
          <div className="flex flex-col items-center border-b border-slate-200 px-5 py-6 text-center">
            <Avatar name={contact.name} size="lg" className="h-16 w-16 text-lg" />
            <p className="mt-3 font-heading text-base font-bold text-slate-900">
              {contact.name}
            </p>
            <p className="text-xs text-slate-400">{contact.email}</p>
            <Badge variant={status.variant} className="mt-2">
              {status.label}
            </Badge>
          </div>

          <Section title="Genel Bilgiler" icon={Mail}>
            <InfoRow icon={Mail} value={contact.email} empty="E-posta yok" />
            <InfoRow icon={Phone} value={contact.phone} empty="Telefon yok" />
            <InfoRow icon={MapPin} value={contact.location} empty="Konum yok" />
            <InfoRow icon={Building2} value={contact.company} empty="Şirket yok" />
            <InfoRow
              icon={CalendarDays}
              value={contact.since && `Müşteri: ${contact.since}`}
              empty="Kayıt tarihi yok"
            />
          </Section>

          <Section title="Etiketler">
            {contact.tags?.length ? (
              <div className="flex flex-wrap gap-1.5">
                {contact.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-300">Etiket yok</p>
            )}
          </Section>

          <Section title="AI Özeti" icon={Sparkles}>
            {contact.aiSummary ? (
              <p className="text-sm leading-relaxed text-slate-600">
                {contact.aiSummary}
              </p>
            ) : (
              <p className="text-sm text-slate-300">Özet henüz oluşturulmadı</p>
            )}
          </Section>

          <Section title="Konuşma Geçmişi" icon={MessageSquare}>
            {contact.conversationHistory?.length ? (
              <ul className="space-y-2">
                {contact.conversationHistory.map((conv) => (
                  <li key={conv.id}>
                    <Link
                      to={PATHS.inbox}
                      className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2 text-sm transition-colors hover:bg-slate-50"
                    >
                      <span className="truncate text-slate-700">
                        {conv.subject}
                      </span>
                      <span className="ml-2 shrink-0 font-mono text-[11px] text-slate-400">
                        {conv.date}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-300">Geçmiş konuşma yok</p>
            )}
          </Section>

          <Section title="Dahili Notlar" icon={StickyNote}>
            {contact.notes?.length ? (
              <ul className="space-y-3">
                {contact.notes.map((note) => (
                  <li key={note.id} className="rounded-lg bg-amber-50/60 p-3">
                    <p className="text-sm text-slate-700">{note.text}</p>
                    <p className="mt-1 font-mono text-[10px] text-slate-400">
                      {note.author} · {note.timestamp}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-300">Not eklenmedi</p>
            )}
          </Section>
        </div>
      </aside>
    </div>
  );
}
