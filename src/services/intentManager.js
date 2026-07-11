/**
 * Intent Manager Module
 * Classifies incoming user messages into distinct categories based on keywords.
 */

// Intent keyword definitions (multiplied/expanded for sales, support, technical and human handoff)
const INTENT_KEYWORDS = {
  SALES: [
    "fiyat", "fiyatı", "paket", "paketler", "ücret", "ucret", "ücreti", "ucreti", "indirim", "indirimler", 
    "kampanya", "satın al", "satinal", "satış", "satis", "satın almak", "premium", "pro", "plan", "planlar", 
    "lisans", "ne kadar", "fiyat listesi", "cost", "price", "pricing", "buy", "purchase", "discount", "sale", 
    "upgrade", "subscription", "subscribe", "payment", "ödeme", "odeme", "taksit", "fatura", "fatura kes", 
    "ödeme yap", "ödeme yöntemi", "fiyatlandırma"
  ],
  SUPPORT: [
    "yardım", "yardim", "destek", "kargo", "teslimat", "iade", "iptal", "hesap", "sorun", "help", 
    "support", "refund", "return", "cancel", "delivery", "shipping", "account", "issue", "complain", 
    "şikayet", "sikayet", "öneri", "oneri", "bilgi", "nasıl", "nasil", "soru", "iletişim", "iletisim", 
    "adres", "telefon", "mail", "e-posta", "eposta", "nerede", "takip", "sipariş", "siparis", "sipariş takibi"
  ],
  TECHNICAL: [
    "hata", "çalışmıyor", "calismiyor", "api", "entegrasyon", "bug", "kod", "error", "failed", 
    "bozuk", "çöktü", "coktu", "bağlantı", "baglanti", "giriş", "giris", "sistem", "sunucu", "server", 
    "integration", "crash", "login", "password", "şifre", "sifre", "yavaş", "yavas", "slow", 
    "donuyor", "açılmıyor", "acilmiyor", "yüklenmiyor", "yuklenmiyor", "hata kodu", "error code"
  ],
  HUMAN_HANDOFF: [
    "yetkili", "canlı destek", "canli destek", "insan", "müşteri temsilcisi", "musteri temsilcisi", "aktar", 
    "bağlan", "baglan", "görüşmek istiyorum", "gorusmek istiyorum", "operatör", "operator", "temsilci", 
    "canlı kişi", "canli kisi", "human", "agent", "handoff", "talk to human", "live agent", "real person", 
    "support staff", "insanla görüşmek", "müşteri hizmetleri", "musteri hizmetleri", "bağlar mısın", "baglar misin"
  ]
};

/**
 * Normalizes Turkish characters to their English/standard counterparts
 * to make keyword matching more robust.
 * @param {string} text 
 * @returns {string}
 */
const normalizeText = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ç/g, "c")
    .replace(/ö/g, "o");
};

/**
 * Detects the intent of a user message based on defined keywords.
 * 
 * @param {string} userMessage - The incoming message from the user.
 * @returns {string} The detected intent ("SALES", "SUPPORT", "TECHNICAL", "HUMAN_HANDOFF", or "GENERAL").
 */
export const detectIntent = (userMessage) => {
  if (!userMessage || typeof userMessage !== "string") {
    return "GENERAL";
  }

  const normalizedMessage = normalizeText(userMessage);

  // Check for HUMAN_HANDOFF first as it's typically highest priority
  const handoffMatch = INTENT_KEYWORDS.HUMAN_HANDOFF.some(keyword => 
    normalizedMessage.includes(normalizeText(keyword))
  );
  if (handoffMatch) return "HUMAN_HANDOFF";

  // Check for TECHNICAL
  const techMatch = INTENT_KEYWORDS.TECHNICAL.some(keyword => 
    normalizedMessage.includes(normalizeText(keyword))
  );
  if (techMatch) return "TECHNICAL";

  // Check for SALES
  const salesMatch = INTENT_KEYWORDS.SALES.some(keyword => 
    normalizedMessage.includes(normalizeText(keyword))
  );
  if (salesMatch) return "SALES";

  // Check for SUPPORT
  const supportMatch = INTENT_KEYWORDS.SUPPORT.some(keyword => 
    normalizedMessage.includes(normalizeText(keyword))
  );
  if (supportMatch) return "SUPPORT";

  // Fallback to GENERAL
  return "GENERAL";
};
