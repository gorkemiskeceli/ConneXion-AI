import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../homepage/store/authSlice";
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  LogOut,
  X,
  BookOpen,
  Puzzle,
  FileText,
  LifeBuoy,
  Activity,
  Check,
  CheckCheck,
  Trash2,
} from "lucide-react";

import Avatar from "../../shared/components/ui/Avatar";

const searchItems = [
  // Dashboard
  { label: "Dashboard / Ana Sayfa", path: "/dashboard", keywords: ["dashboard", "ana", "sayfa", "home", "ozet", "kontrol", "paneli"] },
  { label: "Konuşma Trendleri (Dashboard)", path: "/dashboard", keywords: ["konusma", "trend", "trendleri", "grafik", "analiz", "dashboard"] },
  { label: "Acil Kuyruk (Dashboard)", path: "/dashboard", keywords: ["acil", "kuyruk", "bekleyen", "kuyruklar", "dashboard", "oncelikli"] },
  { label: "Son Etkinlikler (Dashboard)", path: "/dashboard", keywords: ["son", "etkinlik", "etkinlikler", "aktivite", "logs", "dashboard"] },
  { label: "Temsilci Performansı (Dashboard)", path: "/dashboard", keywords: ["temsilci", "performans", "performansi", "skor", "dashboard"] },
  { label: "Aktif Temsilciler (Dashboard)", path: "/dashboard", keywords: ["aktif", "temsilci", "temsilciler", "cevrimici", "online", "dashboard"] },
  
  // Gelen Kutusu (Inbox)
  { label: "Gelen Kutusu (Inbox)", path: "/dashboard/inbox", keywords: ["inbox", "gelen", "kutusu", "mesaj", "destek", "sohbet", "chat", "bilet", "ticket"] },
  { label: "Konuşma Listesi (Inbox)", path: "/dashboard/inbox", keywords: ["konusma", "listesi", "inbox", "mesajlar", "aktif", "sohbetler"] },
  { label: "Müşteri Bilgi Paneli (Inbox)", path: "/dashboard/inbox", keywords: ["musteri", "bilgi", "paneli", "detay", "karti", "inbox", "telefon", "email"] },
  { label: "Yapay Zeka Destek Özeti (Inbox)", path: "/dashboard/inbox", keywords: ["yapay", "zeka", "ozet", "ai", "summary", "inbox", "tavsiye"] },
  { label: "Müşteri Notları (Inbox)", path: "/dashboard/inbox", keywords: ["musteri", "not", "notlar", "notlari", "inbox", "ajanda"] },

  // Kişiler (Contacts)
  { label: "Kişiler & Rehber (Contacts)", path: "/dashboard/contacts", keywords: ["contacts", "kisi", "rehber", "musteri", "user", "kullanici", "listesi"] },
  { label: "Yeni Kişi Oluştur (Contacts)", path: "/dashboard/contacts", keywords: ["yeni", "kisi", "ekle", "olustur", "contacts", "rehber"] },
  { label: "Kişileri İçe/Dışa Aktar (Contacts)", path: "/dashboard/contacts", keywords: ["ice", "aktar", "disa", "csv", "excel", "contacts", "rehber"] },

  // AI Agent Studio
  { label: "AI Agent Studio (Asistanlar)", path: "/dashboard/ai-agent", keywords: ["agent", "studio", "yapay", "zeka", "asistan", "bot", "tanimlama", "prompt"] },
  { label: "Model Seçimi (AI Agent)", path: "/dashboard/ai-agent", keywords: ["model", "secimi", "llm", "gpt", "gemini", "agent", "asistan"] },
  { label: "Sistem Talimatı / Prompt (AI Agent)", path: "/dashboard/ai-agent", keywords: ["sistem", "talimati", "prompt", "editoru", "agent", "asistan"] },
  { label: "Test Konsolu / Playground (AI Agent)", path: "/dashboard/ai-agent", keywords: ["test", "konsolu", "playground", "deneme", "agent", "asistan"] },

  // Bilgi Tabanı (Knowledge Base)
  { label: "Bilgi Tabanı (Knowledge Base)", path: "/dashboard/knowledge-base", keywords: ["knowledge", "base", "bilgi", "tabani", "dokuman", "veri", "kaynak", "makale"] },
  { label: "Dosya & Veri Kaynağı Yükle (Knowledge Base)", path: "/dashboard/knowledge-base", keywords: ["dosya", "yukle", "pdf", "text", "knowledge", "dokuman"] },
  { label: "Soru-Cevap / FAQ (Knowledge Base)", path: "/dashboard/knowledge-base", keywords: ["soru", "cevap", "faq", "sss", "knowledge", "base"] },

  // İş Akışları (Workflows)
  { label: "İş Akışları (Workflows)", path: "/dashboard/workflows", keywords: ["workflows", "akis", "otomasyon", "tetikleyici", "kural"] },
  { label: "Yeni Otomasyon Kuralı Ekle (Workflows)", path: "/dashboard/workflows", keywords: ["yeni", "otomasyon", "kural", "ekle", "workflows", "tetikleyici"] },
  { label: "Olay Tetikleyicileri (Workflows)", path: "/dashboard/workflows", keywords: ["olay", "tetikleyici", "tetikleyiciler", "rules", "workflows"] },

  // Takım & Kuyruklar (Team & Queues)
  { label: "Takım & Kuyruk Yönetimi", path: "/dashboard/team", keywords: ["team", "takim", "kuyruk", "departman", "atama", "yonetimi"] },
  { label: "Destek Kuyruğu Dağılımı (Team & Queues)", path: "/dashboard/team", keywords: ["destek", "kuyrugu", "dagilim", "atama", "yonlendirme", "team"] },

  // Raporlar (Reports)
  { label: "Raporlar & Analitik (Reports)", path: "/dashboard/reports", keywords: ["reports", "rapor", "analiz", "istatistik", "grafik", "performans"] },
  { label: "Müşteri Memnuniyeti / CSAT (Reports)", path: "/dashboard/reports", keywords: ["musteri", "memnuniyeti", "csat", "skor", "reports", "rapor"] },
  { label: "Ortalama Yanıt Süresi (Reports)", path: "/dashboard/reports", keywords: ["ortalama", "yanit", "sureleri", "cozum", "reports", "rapor"] },
  
  // Destek (Support)
  { label: "Destek Yönetimi (Support)", path: "/dashboard/support", keywords: ["support", "destek", "yardim", "talep", "bilet", "ticket"] },
  { label: "Yeni Destek Talebi (Support)", path: "/dashboard/support", keywords: ["yeni", "destek", "talebi", "ac", "ekle", "olustur", "ticket", "support"] },
  { label: "Yardım SSS Kılavuzu (Support)", path: "/dashboard/support", keywords: ["sss", "faq", "kilavuz", "yardim", "makale", "support"] },
  
  // Ayarlar (Settings)
  { label: "Workspace Ayarları (Settings)", path: "/dashboard/settings?section=workspace", keywords: ["settings", "ayarlar", "workspace", "profil", "logo", "marka"] },
  { label: "Kullanıcı Yönetimi (Settings)", path: "/dashboard/settings?section=users", keywords: ["settings", "ayarlar", "kullanici", "kullanicilar", "davet", "users"] },
  { label: "Rol Yetkilendirme (Settings)", path: "/dashboard/settings?section=roles", keywords: ["settings", "ayarlar", "rol", "roller", "yetki", "roles"] },
  { label: "Çalışma Saatleri (Settings)", path: "/dashboard/settings?section=hours", keywords: ["settings", "ayarlar", "saat", "saatleri", "calisma", "tatil", "hours"] },
  { label: "Widget Yapılandırması (Settings)", path: "/dashboard/settings?section=widget", keywords: ["settings", "ayarlar", "widget", "sohbet", "tasarim", "renk"] },
  { label: "Bildirim Ayarları (Settings)", path: "/dashboard/settings?section=notifications", keywords: ["settings", "ayarlar", "bildirim", "e-posta", "notifications"] },
  { label: "API Entegrasyonları (Settings)", path: "/dashboard/settings?section=integrations", keywords: ["settings", "ayarlar", "slack", "webhook", "api", "entegrasyon", "integrations"] },
  { label: "Denetim Günlükleri (Audit Logs)", path: "/dashboard/settings?section=audit", keywords: ["settings", "ayarlar", "audit", "logs", "denetim", "islem", "gecmisi"] },
];

function normalizeText(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .trim();
}

/**
 * Topbar — fixed header above the workspace.
 */
export default function Topbar({
  onToggleSidebar,
  workspaceName = "",
  userName = "",
  userRoleLabel = "",
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const bellRef = useRef(null);
  const helpRef = useRef(null);

  // Pre-seed mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Yeni Destek Talebi #1409",
      description: "Hale Alacan tarafından yeni bir sohbet başlatıldı.",
      time: "5 dk önce",
      unread: true,
    },
    {
      id: 2,
      title: "Sistem Performans Uyarısı",
      description: "API yanıt süresi ortalama 120ms eşiğini aştı.",
      time: "2 saat önce",
      unread: true,
    },
    {
      id: 3,
      title: "Entegrasyon Tamamlandı",
      description: "Slack webhook entegrasyonu başarıyla güncellendi.",
      time: "1 gün önce",
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setHelpOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const showToast = (msg, targetPath) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
      if (targetPath) {
        navigate(targetPath);
      }
    }, 2000);
  };

  const handleNotificationClick = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleNotificationDelete = (e, id) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredResults = searchQuery
    ? searchItems.filter((item) => {
        const normalizedQuery = normalizeText(searchQuery);
        const normalizedLabel = normalizeText(item.label);
        return (
          normalizedLabel.includes(normalizedQuery) ||
          item.keywords.some((keyword) =>
            normalizeText(keyword).includes(normalizedQuery)
          )
        );
      })
    : [];

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 lg:px-6">
      {/* Toast Alert Notification Portal */}
      {toastMessage && (
        <div className="fixed right-6 top-20 z-50 flex items-center gap-2.5 rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-xs font-semibold text-primary-800 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
          </span>
          {toastMessage}
        </div>
      )}

      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 lg:hidden"
          aria-label="Menüyü aç/kapat"
        >
          <Menu className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:flex"
        >
          {workspaceName || "Workspace seç"}
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        {/* Keystroke Live Search */}
        <div className="relative flex items-center" ref={searchRef}>
          {searchOpen ? (
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 animate-in fade-in zoom-in-95 duration-150">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Menü veya sayfa arayın..."
                autoFocus
                className="w-44 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }
                }}
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-slate-655 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-slate-400 hover:text-slate-655 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 cursor-pointer"
              aria-label="Ara"
            >
              <Search className="h-5 w-5" strokeWidth={1.9} />
            </button>
          )}

          {searchOpen && searchQuery && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl z-50 top-full">
              <div className="px-2.5 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">// ARAMA SONUÇLARI</div>
              <div className="mt-1 space-y-0.5 max-h-60 overflow-y-auto">
                {filteredResults.length > 0 ? (
                  filteredResults.map((res, index) => (
                    <button
                      key={`${res.path}-${index}`}
                      onClick={() => {
                        navigate(res.path);
                        setSearchQuery("");
                        setSearchOpen(false);
                      }}
                      className="w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50 hover:text-primary-600 transition-colors font-medium cursor-pointer"
                    >
                      <span>{res.label}</span>
                      <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider font-bold">// GİT</span>
                    </button>
                  ))
                ) : (
                  <div className="px-2.5 py-3 text-center text-xs text-slate-400 font-medium">Eşleşen sonuç bulunamadı.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bell Notifications Dropdown */}
        <div className="relative" ref={bellRef}>
          <button
            type="button"
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 cursor-pointer"
            aria-label="Bildirimler"
          >
            <Bell className="h-5 w-5" strokeWidth={1.9} />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 inline-flex h-2.5 w-2.5 rounded-full bg-primary-605 ring-2 ring-white animate-pulse" />
            )}
          </button>

          {notificationOpen && (
            <div className="absolute right-0 mt-1.5 w-80 rounded-xl border border-slate-200 bg-white p-2 shadow-2xl animate-in fade-in slide-in-from-top-1 z-50">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 px-2">
                <span className="text-xs font-bold text-slate-800 font-heading">Bildirimler ({unreadCount})</span>
                {notifications.length > 0 && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleMarkAllAsRead}
                      className="text-[10px] font-semibold text-primary-600 hover:text-primary-700 cursor-pointer"
                    >
                      Tümünü Okundu Yap
                    </button>
                    <span className="text-slate-200">|</span>
                    <button
                      type="button"
                      onClick={handleClearAllNotifications}
                      className="text-[10px] font-semibold text-red-655 hover:text-red-700 cursor-pointer"
                    >
                      Temizle
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-1 max-h-64 overflow-y-auto space-y-1">
                {notifications.length > 0 ? (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleNotificationClick(item.id)}
                      className={`group flex items-start gap-2.5 rounded-lg p-2.5 transition-colors cursor-pointer text-left ${
                        item.unread ? "bg-primary-50/50 hover:bg-primary-50" : "hover:bg-slate-50"
                      }`}
                    >
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        item.unread ? "bg-primary" : "bg-transparent"
                      }`} />
                      <div className="flex-1 leading-normal">
                        <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
                        <p className="text-[9px] text-slate-400 font-medium mt-1 font-mono">{item.time}</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleNotificationDelete(e, item.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600 rounded transition-opacity cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-xs text-slate-400 font-medium">Bildiriminiz bulunmuyor.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Help Circle Resource Redirects */}
        <div className="relative" ref={helpRef}>
          <button
            type="button"
            onClick={() => setHelpOpen(!helpOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 cursor-pointer"
            aria-label="Yardım"
          >
            <HelpCircle className="h-5 w-5" strokeWidth={1.9} />
          </button>

          {helpOpen && (
            <div className="absolute right-0 mt-1.5 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl animate-in fade-in slide-in-from-top-1 z-50">
              <div className="px-2.5 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono border-b border-slate-150 mb-1">// DESTEK MERKEZİ</div>
              <button
                type="button"
                onClick={() => {
                  setHelpOpen(false);
                  showToast("Kullanım Kılavuzuna Yönlendiriliyorsunuz...", "/dashboard/knowledge-base");
                }}
                className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 hover:text-primary-600 transition-colors font-medium cursor-pointer"
              >
                <BookOpen className="h-4 w-4 text-slate-400" />
                Kullanım Kılavuzu
              </button>
              <button
                type="button"
                onClick={() => {
                  setHelpOpen(false);
                  showToast("API Dokümantasyonuna Yönlendiriliyorsunuz...", "/dashboard/settings?section=integrations");
                }}
                className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 hover:text-primary-600 transition-colors font-medium cursor-pointer"
              >
                <Puzzle className="h-4 w-4 text-slate-400" />
                API Referansı
              </button>
              <button
                type="button"
                onClick={() => {
                  setHelpOpen(false);
                  showToast("Destek Merkezine Yönlendiriliyorsunuz...", "/dashboard/inbox");
                }}
                className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 hover:text-primary-600 transition-colors font-medium cursor-pointer"
              >
                <LifeBuoy className="h-4 w-4 text-slate-400" />
                Destek Talebi Aç
              </button>
              <div className="h-px bg-slate-100 my-1" />
              <div className="flex items-center gap-2 px-2.5 py-1.5 text-[10px] font-bold text-slate-500 font-mono">
                <Activity className="h-3.5 w-3.5 text-emerald-505" />
                Sistem Durumu: %99.98
              </div>
            </div>
          )}
        </div>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-slate-100 cursor-pointer"
            id="user-profile-menu-btn"
          >
            <Avatar name={userName} size="md" />
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-sm font-semibold text-slate-800">
                {userName || "Kullanıcı"}
              </span>
              <span className="block text-xs text-slate-400">
                {userRoleLabel || "—"}
              </span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl animate-in fade-in slide-in-from-top-1 z-50">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-red-650 hover:bg-red-50 transition-colors cursor-pointer"
                id="logout-btn"
              >
                <LogOut className="h-4 w-4 text-red-500" />
                Çıkış Yap
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
