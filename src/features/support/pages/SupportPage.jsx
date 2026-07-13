import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  HelpCircle, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Inbox, 
  ArrowRight,
  BookOpen,
  X,
  FileText
} from "lucide-react";
import useSupport from "../hooks/useSupport";

export default function SupportPage({ role }) {
  const navigate = useNavigate();
  const {
    tickets,
    kpis,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    isModalOpen,
    setIsModalOpen,
    onCreateTicket,
    defaultCompany,
  } = useSupport(role);

  // New ticket modal fields
  const [customer, setCustomer] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Genel");
  const [priority, setPriority] = useState("medium");
  const [lastMessage, setLastMessage] = useState("");

  // Auto-fill customer info based on admin role context
  useEffect(() => {
    if (isModalOpen) {
      setCustomer(defaultCompany || "");
    }
  }, [isModalOpen, defaultCompany]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer || !subject || !lastMessage) return;
    onCreateTicket({
      customer,
      subject,
      category,
      priority,
      lastMessage,
    });
    // Reset form
    setCustomer("");
    setSubject("");
    setCategory("Genel");
    setPriority("medium");
    setLastMessage("");
  };

  const statusColors = {
    open: "bg-red-50 text-red-700 border-red-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-amber-100 text-amber-800",
    low: "bg-slate-100 text-slate-800",
  };

  const statusLabels = {
    open: "Açık",
    pending: "Beklemede",
    resolved: "Çözüldü",
  };

  const priorityLabels = {
    high: "Yüksek",
    medium: "Orta",
    low: "Düşük",
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary-500" />
            Destek Yönetimi
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Platform destek taleplerini izleyin, önceliklendirin ve müşterilerinize yardım edin.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-500 cursor-pointer w-max"
        >
          <Plus className="h-4 w-4" />
          Yeni Destek Talebi
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="rounded-lg bg-slate-50 p-3 text-slate-500">
            <Inbox className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Toplam Talep</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">{kpis.total}</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="rounded-lg bg-red-50 p-3 text-red-500">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Açık Talepler</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">{kpis.open}</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="rounded-lg bg-amber-50 p-3 text-amber-500">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Bekleyenler</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">{kpis.pending}</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="rounded-lg bg-emerald-50 p-3 text-emerald-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Çözülenler</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">{kpis.resolved}</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Ticket List + FAQ Helper Sidebar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Ticket List and Filters */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
            {/* Filter and Search Bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Status Tab Filters */}
              <div className="flex gap-1 border-b border-slate-100 pb-2 sm:border-none sm:pb-0">
                {["all", "open", "pending", "resolved"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      statusFilter === status
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {status === "all" ? "Hepsi" : statusLabels[status]}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Talep veya müşteri ara..."
                  className="w-48 bg-transparent text-xs text-slate-800 outline-none pl-2 placeholder:text-slate-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Ticket Cards List */}
            <div className="space-y-3">
              {tickets.length > 0 ? (
                tickets.map((t) => (
                  <div
                    key={t.id}
                    className="group rounded-xl border border-slate-150 p-4 transition-all hover:border-primary-300 hover:shadow-md bg-white hover:scale-[1.005] duration-200"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      {/* Left: Ticket ID, Category, Subject */}
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">
                            {t.id}
                          </span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full font-mono uppercase">
                            {t.category}
                          </span>
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${priorityColors[t.priority]}`}>
                            {priorityLabels[t.priority]} Öncelik
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-950 group-hover:text-primary-600 transition-colors">
                          {t.subject}
                        </h4>
                      </div>

                      {/* Right: Status Tag */}
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold w-max h-max ${statusColors[t.status]}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {statusLabels[t.status]}
                      </span>
                    </div>

                    <div className="mt-3 bg-slate-50/50 rounded-lg p-2.5 border border-slate-100/50 leading-relaxed text-xs text-slate-600">
                      <span className="font-semibold text-slate-800">Müşteri:</span> {t.customer}
                      <p className="mt-1 text-slate-500 italic">"{t.lastMessage}"</p>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Oluşturulma: {t.date}</span>
                      <button 
                        onClick={() => navigate(`/dashboard/inbox?id=${t.id}`)}
                        className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-bold tracking-wider uppercase cursor-pointer"
                      >
                        Detaya Git
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Inbox className="mx-auto h-8 w-8 text-slate-300" />
                  <p className="text-xs font-medium">Eşleşen aktif destek talebi bulunmamaktadır.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Help Corner FAQ Panel */}
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <BookOpen className="h-4.5 w-4.5 text-slate-400" />
              Yardım Kılavuzu & SSS
            </h3>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800">API Latency Sorunları Nasıl Çözülür?</h4>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  Model gecikmelerini düşürmek için API entegrasyon ayarlarınızda "Gemini Flash" modelini tercih edin ve token limitlerini optimize edin.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800">Workspace Logo Boyut Sınırı</h4>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  Logo yüklemeleri maksimum 2MB boyutunda ve JPG, PNG, SVG formatlarında olmalıdır. Limit aşımı alanları WorkspaceSection modülünde yapılandırılabilir.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800">SLA İhlalleri ve Bildirimler</h4>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  Müşteri taleplerine ilk yanıt verilme süresi SLA aşımına girdiğinde sistem otomatik olarak e-posta ve Slack bildirimi fırlatır.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-150/80">
              <span className="text-[9px] font-bold text-slate-400 font-mono block tracking-wider uppercase mb-1">// DOKÜMANTASYON</span>
              <a href="#" className="inline-flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 font-bold transition-all">
                <FileText className="h-3.5 w-3.5" />
                Geliştirici Portalına Git
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-950 font-heading">Yeni Destek Talebi Oluştur</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-655 p-1 rounded-lg cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">// MÜŞTERİ / KURUM *</label>
                <input
                  type="text"
                  required
                  disabled={!!defaultCompany}
                  placeholder="Örn. Ahmet Kaya (TrendSoft)"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-primary-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">// KONU BAŞLIĞI *</label>
                <input
                  type="text"
                  required
                  placeholder="Talep konusunu özetleyin..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-primary-500 transition-colors"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">// KATEGORİ</label>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-primary-500 transition-colors cursor-pointer"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Integration">Entegrasyon</option>
                    <option value="Notifications">Bildirimler</option>
                    <option value="Branding">Branding / Logo</option>
                    <option value="Security">Güvenlik</option>
                    <option value="Billing">Fatura / Ödeme</option>
                    <option value="Genel">Diğer / Genel</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">// ÖNCELİK</label>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-primary-500 transition-colors cursor-pointer"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="low">Düşük</option>
                    <option value="medium">Orta</option>
                    <option value="high">Yüksek</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">// DETAYLI AÇIKLAMA *</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Yaşanılan teknik problemi detaylandırın..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-primary-500 transition-colors resize-none"
                  value={lastMessage}
                  onChange={(e) => setLastMessage(e.target.value)}
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white hover:bg-primary-500 cursor-pointer shadow-lg shadow-primary-500/20"
                >
                  Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
