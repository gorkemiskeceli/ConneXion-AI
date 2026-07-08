import {
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Sparkles,
  StickyNote,
  UserRound,
} from "lucide-react";

import Avatar from "../../../shared/components/ui/Avatar";
import EmptyState from "../../../shared/components/ui/EmptyState";

function PanelSection({ title, icon: Icon, children }) {
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
 * CustomerPanel — Column 3.
 * customer: { name, email, phone, location, since, tags: [] }
 * notes: [{ id, author, text, timestamp }]
 * aiSummary: string
 */
export default function CustomerPanel({
  customer,
  notes = [],
  aiSummary = "",
  className = "",
}) {
  if (!customer) {
    return (
      <div className={`flex h-full flex-col ${className}`}>
        <div className="border-b border-slate-200 px-5 py-3">
          <h3 className="font-heading text-sm font-bold text-slate-900">
            Müşteri Bilgileri
          </h3>
        </div>
        <EmptyState
          icon={UserRound}
          title="Müşteri seçilmedi"
          description="Bir konuşma açtığınızda müşteri detayları burada görünür."
          className="flex-1"
        />
      </div>
    );
  }

  return (
    <div className={`flex h-full flex-col overflow-y-auto ${className}`}>
      {/* Profile */}
      <div className="flex flex-col items-center border-b border-slate-200 px-5 py-6 text-center">
        <Avatar name={customer.name} size="lg" className="h-16 w-16 text-lg" />
        <p className="mt-3 font-heading text-base font-bold text-slate-900">
          {customer.name}
        </p>
        <p className="text-xs text-slate-400">{customer.email}</p>
      </div>

      <PanelSection title="İletişim Bilgileri" icon={Mail}>
        <InfoRow icon={Mail} value={customer.email} empty="E-posta yok" />
        <InfoRow icon={Phone} value={customer.phone} empty="Telefon yok" />
        <InfoRow icon={MapPin} value={customer.location} empty="Konum yok" />
        <InfoRow
          icon={CalendarDays}
          value={customer.since && `Müşteri: ${customer.since}`}
          empty="Kayıt tarihi yok"
        />
      </PanelSection>

      <PanelSection title="Etiketler">
        {customer.tags?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {customer.tags.map((tag) => (
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
      </PanelSection>

      <PanelSection title="AI Özeti" icon={Sparkles}>
        {aiSummary ? (
          <p className="text-sm leading-relaxed text-slate-600">{aiSummary}</p>
        ) : (
          <p className="text-sm text-slate-300">Özet henüz oluşturulmadı</p>
        )}
      </PanelSection>

      <PanelSection title="Dahili Notlar" icon={StickyNote}>
        {notes.length ? (
          <ul className="space-y-3">
            {notes.map((note) => (
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
      </PanelSection>
    </div>
  );
}
