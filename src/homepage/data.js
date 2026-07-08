export const FAQ_ITEMS = [
  {
    question: "SaaSPrecise verilerimizi nasıl koruyor?",
    answer: "Verileriniz aktarılırken ve durağan durumdayken AES-256 ve TLS 1.3 standartlarında uçtan uca şifrelenir. Verileriniz sunucularımızda asla kalıcı olarak saklanmaz veya temel yapay zeka modellerinin eğitimi için kullanılmaz.",
  },
  {
    question: "Hangi sektörel uyumluluk standartlarını destekliyorsunuz?",
    answer: "Sağlık için HIPAA, finans için SOC 2 Tip II ve genel veri güvenliği için GDPR uyumluluğunu tam olarak destekliyoruz. Tüm hassas veri maskeleme süreçleri otomatik olarak çalışır.",
  },
  {
    question: "Mevcut sistemlerimizle entegrasyon süreci ne kadar sürer?",
    answer: "Gelişmiş REST API'miz, hazır SDK'larımız ve Webhook altyapımız sayesinde Salesforce, HubSpot, Slack gibi 200'den fazla kurumsal araca entegrasyon sadece birkaç saat sürer.",
  },
  {
    question: "Model doğruluğu nasıl bu kadar yüksek?",
    answer: "Modellerimiz genel amaçlı yanıtlar üretmek yerine, sektörünüze özel olarak eğitilmiş özel bilgi tabanları (RAG - Retrieval-Augmented Generation) ve gelişmiş doğrulama katmanları kullanarak halüsinasyonları %99.4 oranında sıfıra indirir.",
  },
  {
    question: "Kurumsal planlarda SLA ve özel model desteği var mı?",
    answer: "Evet, Kurumsal plan kapsamında %99.9 çalışma süresi garantili (SLA) özel sunucular, özel ince ayar (fine-tuning) süreçleri ve 24/7 telefonla teknik destek sağlıyoruz.",
  }
];

export const PRICING_PLANS = [
  {
    name: "Başlangıç",
    price: {
      monthly: 19,
      yearly: 15,
    },
    description: "Yapay zeka asistanlarını test etmek ve küçük ekipler için temel otomasyon.",
    features: [
      "Tek bir sektörel model seçimi",
      "Aylık 5,000 istek limiti",
      "Standart gecikme süresi (~1.2s)",
      "Temel web paneli",
      "E-posta ile destek (24 saatte dönüş)",
      "AES-256 standart veri güvenliği"
    ],
    ctaText: "Hemen Başlayın"
  },
  {
    name: "Profesyonel",
    price: {
      monthly: 49,
      yearly: 39,
    },
    description: "Büyüyen şirketler için tüm modeller, gelişmiş entegrasyonlar ve API erişimi.",
    features: [
      "Tüm sektörel yapay zeka asistanları",
      "Aylık 50,000 istek limiti",
      "Ultra düşük gecikme süresi (~250ms)",
      "200+ kurumsal entegrasyon",
      "Tam REST API ve Webhook erişimi",
      "Öncelikli destek (Canlı sohbet - 2 saatte dönüş)"
    ],
    isPopular: true,
    ctaText: "En Popüler Planı Seçin"
  },
  {
    name: "Kurumsal",
    price: {
      monthly: 199,
      yearly: 159,
    },
    description: "Büyük ölçekli operasyonlar için limitsiz kapasite, özel modeller ve SLA garantisi.",
    features: [
      "Limitsiz aylık istek",
      "Kurumunuza özel fine-tune edilmiş modeller",
      "Özel bulut (Private Cloud) dağıtım seçeneği",
      "Özel müşteri temsilcisi ve 24/7 SLA",
      "HIPAA, GDPR ve SOC 2 Tip II sertifikasyon paketi",
      "Özel entegrasyon geliştirme desteği"
    ],
    ctaText: "Satış Ekibiyle Görüşün"
  }
];

export const SECTOR_ASSISTANTS = [
  {
    id: "saglik",
    name: "Sağlık AI Asistanı",
    subtitle: "Hasta İletişimi ve Raporlama Otomasyonu",
    icon: "Activity",
    features: [
      "Hasta ön kabul ve triyaj sorularının otomatik yönetilmesi",
      "HIPAA uyumlu veri maskeleme ile hasta gizliliği koruması",
      "Laboratuvar sonuçlarının hasta için anlaşılır dillere çevrilmesi",
      "Randevu planlama ve hatırlatma akışlarının tam entegrasyonu",
      "Tıbbi terminolojiye %99.4 doğrulukla hakim özel dil modelleri"
    ],
    warning: "Bu asistan teşhis koymaz veya tıbbi tedavi önermez; hekimlere idari süreçlerde karar destek ve zaman tasarrufu sağlar.",
    benefits: [
      { label: "Hasta Memnuniyeti", value: "+42%" },
      { label: "İdari Zaman Tasarrufu", value: "Saniyede 4 saat" },
      { label: "Doğruluk Oranı", value: "%99.4" }
    ],
    accentColor: "emerald"
  },
  {
    id: "hukuk",
    name: "Hukuk AI Asistanı",
    subtitle: "Sözleşme Analizi ve Mevzuat Uyumluluğu",
    icon: "Briefcase",
    features: [
      "Sözleşmelerdeki riskli maddelerin ve boşlukların anında tespiti",
      "GDPR/KVKK uyumluluğu için veri sızıntısı taramaları",
      "Dava dilekçeleri ve emsal kararlar için anında özet çıkartma",
      "Hukuk terminolojisine özel geliştirilmiş RAG semantik arama",
      "Çok dilli sözleşme ve hukuki yazışma çevirileri"
    ],
    warning: "Bu asistan resmi bir hukuki danışmanlık veya avukatlık hizmeti vermez; hukuki belgelerin ön inceleme sürecini hızlandırır.",
    benefits: [
      { label: "İnceleme Hızı", value: "10x Kat Daha Hızlı" },
      { label: "Risk Yakalama", value: "%98.7" },
      { label: "Haftalık Zaman Kazancı", value: "12 Saat" }
    ],
    accentColor: "indigo"
  },
  {
    id: "finans",
    name: "Finans AI Asistanı",
    subtitle: "Dolandırıcılık Tespiti ve Raporlama",
    icon: "DollarSign",
    features: [
      "Gerçek zamanlı işlem ve mutabakat eşleştirme otomasyonu",
      "Olağandışı harcama kalıpları ve fraud (sahtekarlık) tespiti",
      "BDDK, SPK ve küresel finans mevzuatlarına uygun denetim",
      "Finansal tablolardan otomatik trend ve risk raporu üretimi",
      "Banka ve ERP sistemleriyle (SAP, Oracle) anlık senkronizasyon"
    ],
    warning: "Yatırım tavsiyesi içermez; muhasebe, risk yönetimi ve mevzuat uyumluluğu süreçlerinde operasyonel doğruluk sağlar.",
    benefits: [
      { label: "Fraud Yakalama Oranı", value: "%99.1" },
      { label: "Raporlama Süresi", value: "3 Dakika" },
      { label: "Verimlilik Artışı", value: "3.5 Kat" }
    ],
    accentColor: "sky"
  }
];
