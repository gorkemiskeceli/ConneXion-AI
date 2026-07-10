import React from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage, setDemoModal, setFloatingChatOpen } from '../store/uiSlice.js';
import { 
  ArrowRight, Activity, Briefcase, DollarSign, Zap, Shield, 
  Layers, CheckCircle2, Globe, Database, Cpu, Play
} from 'lucide-react';
import { motion } from 'motion/react';

export default function HomeView() {
  const dispatch = useDispatch();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans text-slate-900" id="home-view-container">
      
      {/* Hero Section (High Density snug padding) */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-[#f0f2f5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            
            {/* Left Column Content */}
            <div className="space-y-6 lg:col-span-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 rounded bg-sky-50 px-2.5 py-1 text-[11px] font-mono font-bold text-sky-800 border border-sky-150 shadow-2xs">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>CONNEXION-AI ENGINE v1.0 // PRODUCTION READY</span>
              </div>
              
              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1e293b] leading-tight">
                Sektörünüze Özel<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
                  Hassas Yapay Zeka
                </span><br />
                Müşteri Hizmetleri
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Sağlık, hukuk ve finans gibi hassasiyet ve regülasyon gerektiren sektörler için özel tasarlanmış, %99.4 doğruluk oranına sahip operasyonel otomasyon platformu.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => {
                    dispatch(setActivePage('playground'));
                    dispatch(setFloatingChatOpen(true));
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 rounded bg-[#1e293b] text-white hover:bg-sky-600 px-5 py-3 text-xs font-bold transition-all shadow-xs"
                  id="hero-cta-playground"
                >
                  <Play className="h-3.5 w-3.5 fill-current text-sky-400" />
                  <span>Ücretsiz Test Sürüşü</span>
                </button>
                <button
                  onClick={() => dispatch(setDemoModal({ open: true, service: 'Genel Tanıtım' }))}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-1 rounded bg-white border border-slate-200 px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                  id="hero-cta-demo"
                >
                  <span>Demo Talebi</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Badges / Metrics in high-density layout */}
              <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <h4 className="text-xl font-bold font-mono text-[#1e293b]">%99.4</h4>
                  <p className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-tight">Accuracy</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold font-mono text-[#1e293b]">&lt;250ms</h4>
                  <p className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-tight">Latency</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold font-mono text-[#1e293b]">200+</h4>
                  <p className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-tight">Integrations</p>
                </div>
              </div>
            </div>

            {/* Right Column Dashboard Mockup */}
            <div className="mt-8 lg:mt-0 lg:col-span-6 relative">
              <div className="absolute -inset-1 rounded bg-gradient-to-r from-sky-500 to-indigo-500 opacity-10 blur-xl"></div>
              <div className="relative border border-slate-700 bg-[#1e293b] rounded shadow-xl overflow-hidden text-slate-400 font-mono text-[11px]">
                
                {/* Visual Window Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#0f172a] border-b border-slate-800">
                  <div className="flex space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" />
                  </div>
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider">CONNEXION-AI-SYSTEM-DASHBOARD.SH</span>
                  <span className="w-10" />
                </div>

                {/* Dashboard Screen */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-sky-400 font-semibold flex items-center space-x-1.5">
                      <Cpu className="h-3.5 w-3.5 animate-spin text-sky-400" />
                      <span>MOTOR_STATUS: OPTIMAL</span>
                    </span>
                    <span className="text-slate-500 text-[10px]">PING: 42ms</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0f172a] p-2.5 rounded border border-slate-850">
                      <div className="text-slate-500 text-[9px] uppercase tracking-wider font-bold">Gelen İstekler</div>
                      <div className="text-base font-bold text-white mt-0.5">48,901</div>
                      <div className="text-[9px] text-emerald-400 mt-0.5">▲ %12.4 (Aylık)</div>
                    </div>
                    <div className="bg-[#0f172a] p-2.5 rounded border border-slate-850">
                      <div className="text-slate-500 text-[9px] uppercase tracking-wider font-bold">Hata Oranı</div>
                      <div className="text-base font-bold text-white mt-0.5">0.02%</div>
                      <div className="text-[9px] text-emerald-400 mt-0.5">▼ 0.05% İyileşme</div>
                    </div>
                  </div>

                  {/* Simulated Terminal Lines */}
                  <div className="bg-black/30 p-2.5 rounded border border-slate-850 space-y-1 font-mono text-[10px] leading-relaxed">
                    <p className="text-slate-500">$ curl -X POST https://api.saasprecise.com/v1/analyze</p>
                    <p className="text-sky-400">{"{"} status: "success", accuracy: 0.994, latency: "218ms" {"}"}</p>
                    <p className="text-slate-500">$ loading legal-compliance-model-v2...</p>
                    <p className="text-indigo-400">⚡ Model initialized. SOC2 compliant verification active.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sektörel Başarı (Industry Success Cards) */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 mb-1">
              // SEKTOREL UZMANLIK
            </h2>
            <p className="text-2xl font-black tracking-tight text-slate-900">
              Genel Yapay Zeka Yerine Sektörel Dikey Çözümler
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Her sektöre özel regülasyonlar, uyumluluk standartları ve terminolojiler göz önünde bulundurularak eğitilmiş yapay zeka asistanları.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Health Card */}
            <div 
              onClick={() => { dispatch(setActivePage('services')); window.scrollTo({ top: 0 }); }}
              className="group border border-slate-200 rounded-lg p-5 bg-[#f8fafc] hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer hover:border-sky-300"
              id="sector-success-health"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-sky-50 text-sky-600 mb-4 group-hover:bg-sky-500 group-hover:text-white transition-all">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">Sağlık AI Asistanı</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Hasta triyajı, randevu yönetimi ve HIPAA uyumlu form doldurma otomasyonu.
              </p>
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono font-bold text-sky-600">
                <span>%99.4 HIPAA Uyumu</span>
                <span className="group-hover:translate-x-1 transition-transform">Incele →</span>
              </div>
            </div>

            {/* Legal Card */}
            <div 
              onClick={() => { dispatch(setActivePage('services')); window.scrollTo({ top: 0 }); }}
              className="group border border-slate-200 rounded-lg p-5 bg-[#f8fafc] hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer hover:border-sky-300"
              id="sector-success-legal"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-sky-50 text-sky-600 mb-4 group-hover:bg-sky-500 group-hover:text-white transition-all">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">Hukuk AI Asistanı</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Sözleşme analizi, emsal karar taramaları ve GDPR riskli madde tespiti.
              </p>
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono font-bold text-sky-600">
                <span>10x Daha Hızlı Analiz</span>
                <span className="group-hover:translate-x-1 transition-transform">Incele →</span>
              </div>
            </div>

            {/* Finance Card */}
            <div 
              onClick={() => { dispatch(setActivePage('services')); window.scrollTo({ top: 0 }); }}
              className="group border border-slate-200 rounded-lg p-5 bg-[#f8fafc] hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer hover:border-sky-300"
              id="sector-success-finance"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-sky-50 text-sky-600 mb-4 group-hover:bg-sky-500 group-hover:text-white transition-all">
                <DollarSign className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">Finans AI Asistanı</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Olağandışı hareket tespiti, mutabakat otomasyonu ve denetim raporlaması.
              </p>
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono font-bold text-sky-600">
                <span>%99.1 Fraud Tespiti</span>
                <span className="group-hover:translate-x-1 transition-transform">Incele →</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bento Grid (Dynamic features section) */}
      <section className="py-12 bg-[#f0f2f5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 mb-1">// PLATFORM GÜÇLERI</h2>
            <p className="text-2xl font-black tracking-tight text-slate-900">
              Operasyonel Hassasiyet için Tasarlanmış Altyapı
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="bento-grid">
            
            {/* Bento item 1: Real-time intelligence */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between shadow-xs hover:shadow-sm transition-shadow">
              <div className="max-w-md">
                <div className="flex h-9 w-9 items-center justify-center rounded bg-sky-50 text-sky-600 mb-3.5">
                  <Zap className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Gerçek Zamanlı Karar Destek Motoru</h3>
                <p className="text-xs text-slate-500 mt-1.5">
                  İş akışlarınızı anlık olarak analiz edin. ConneXion-AI milisaniyeler içinde bağlamı sorgular, güvenlik kontrollerini yapar ve en doğru aksiyon planını sunar.
                </p>
              </div>
              <div className="mt-5 pt-5 border-t border-slate-100 flex items-center space-x-6 text-[11px] font-mono text-slate-500">
                <span className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mr-1.5" /> LATENCY &lt;250ms</span>
                <span className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mr-1.5" /> REAL-TIME PROCESS</span>
              </div>
            </div>

            {/* Bento item 2: Enterprise security */}
            <div className="bg-[#1e293b] border border-slate-800 text-white rounded-lg p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded bg-slate-800 text-sky-400 mb-3.5">
                  <Shield className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-base font-bold">Kurumsal Düzey Güvenlik</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  SOC 2 Tip II standartları, HIPAA uyumluluğu ve askeri düzey AES-256 şifreleme ile kurum verilerinizin gizliliği güvence altındadır.
                </p>
              </div>
              <div className="mt-5 space-y-1.5">
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-sky-400" />
                </div>
                <span className="text-[10px] text-slate-400 block text-right font-mono font-bold uppercase tracking-wider">100% SECURE VERIFICATION ACTIVE</span>
              </div>
            </div>

            {/* Bento item 3: 200+ Integrations */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded bg-sky-50 text-sky-600 mb-3.5">
                  <Layers className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">200+ Entegrasyon</h3>
                <p className="text-xs text-slate-500 mt-1.5">
                  SAP, Salesforce, Slack, HubSpot ve şirket içi ERP veritabanlarınızla sorunsuz, çift yönlü senkronizasyon.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-1">
                {['SAP', 'Salesforce', 'Slack', 'Oracle', 'HubSpot', 'Jira'].map((tool) => (
                  <span key={tool} className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Alternating Automation Section */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="md:flex md:items-center md:justify-between md:space-x-12 mb-10">
            <div className="max-w-xl">
              <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 mb-1">// OTOMASYON GÜCÜ</h2>
              <h3 className="text-2xl font-black text-slate-900">En Karmaşık İş Akışlarınızı Otomatikleştirin</h3>
              <p className="text-xs text-slate-500 mt-2">
                ConneXion-AI sadece soruları yanıtlamakla kalmaz, aynı zamanda API'ler üzerinden sistemlerinizde işlem yapabilir.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Visual Steps representation */}
            <div className="space-y-4">
              
              <div className="flex items-start space-x-3.5 border-l-2 border-sky-500 pl-4">
                <div className="font-mono text-sky-500 font-bold text-xs">01</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Bağlam Algılama</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Gelen e-posta veya doküman yapay zeka tarafından analiz edilir ve niyet tam doğrulukla saptanır.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 border-l-2 border-slate-200 pl-4 hover:border-sky-400 transition-colors">
                <div className="font-mono text-slate-400 font-bold text-xs">02</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Mevzuat ve Güvenlik Filtresi</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Hassas kişisel veriler (TC Kimlik, tıbbi veri, kredi kartı vb.) maskelenir ve regülasyon uyumluluğu kontrol edilir.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 border-l-2 border-slate-200 pl-4 hover:border-sky-400 transition-colors">
                <div className="font-mono text-slate-400 font-bold text-xs">03</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">API Akışı Tetikleme</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Sistem, ERP veya CRM üzerindeki API'yi güvenli bir şekilde tetikleyerek kaydı günceller veya randevuyu onaylar.</p>
                </div>
              </div>

            </div>

            {/* Visual Mock Card representing a task action */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded-lg p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
                <div className="flex items-center space-x-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-slate-800 uppercase">// ACTIVE_FLOW_PIPELINE</span>
                </div>
                <span className="text-[9px] font-mono bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded font-bold">RUNNING</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Asistan Tipi:</span>
                  <span className="font-bold text-slate-900">Sağlık AI Asistanı</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tetiklenen Olay:</span>
                  <span className="font-mono text-slate-900">Randevu Onay Talebi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Maskelenen Veri:</span>
                  <span className="font-mono text-slate-400">** ** 1234 (Kişisel Veri)</span>
                </div>
                <div className="border-t border-slate-200 pt-2.5 flex items-center justify-between">
                  <span className="font-bold text-slate-900">İşlem Durumu:</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span>
                    CRM Güncellendi
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Unified Data Management / Governance section */}
      <section className="py-12 bg-[#1e293b] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-400">// KÜRESEL YÖNETİŞİM</span>
              <h3 className="text-2xl font-black tracking-tight mt-1.5">
                Bölgeler Arası Birleşik Veri Yönetişimi
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Verilerinizin nerede barındırılacağına siz karar verin. ConneXion-AI, AB (GDPR), ABD (HIPAA) ve Türkiye yerel sunucu mevzuatlarına uygun bağımsız veri lokasyonları sunarak regülatif riskleri sıfırlar.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-start space-x-2.5">
                  <div className="h-7 w-7 rounded bg-slate-800 flex items-center justify-center text-sky-400 shrink-0">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs">Çoklu Bölge Desteği</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Sunucu konumunu özgürce seçin.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <div className="h-7 w-7 rounded bg-slate-800 flex items-center justify-center text-sky-400 shrink-0">
                    <Database className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs">Yerel Depolama</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Sektörel mevzuatlarla %100 uyum.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Globe Icon / Mapping card */}
            <div className="border border-slate-700 bg-slate-800/40 p-6 rounded-lg relative shadow-md">
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-700 pb-2">
                  <span>VERİ BÖLGESİ ROTASYONU</span>
                  <span className="text-emerald-400 animate-pulse">● BAĞLI</span>
                </div>
                
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between items-center bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-300">AB Sunucusu (Frankfurt)</span>
                    <span className="text-emerald-400 text-[10px] font-bold">AKTİF</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-300">Türkiye Sunucusu (İstanbul)</span>
                    <span className="text-emerald-400 text-[10px] font-bold">AKTİF</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-300">ABD Sunucusu (Virginia)</span>
                    <span className="text-slate-500 text-[10px]">İsteğe Bağlı</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Dark CTA section */}
      <section className="py-12 bg-[#f0f2f5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1e293b] border border-slate-800 rounded-lg p-8 sm:p-10 relative overflow-hidden shadow-lg text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-950/20 to-transparent" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Tam Operasyonel Hassasiyete Ulaşmaya Hazır Mısınız?
              </h2>
              <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                ConneXion-AI yapay zeka modelleriyle müşteri memnuniyetinizi artırın, operasyonel yüklerinizi hafifletin ve hata payını sıfıra indirin.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => { dispatch(setActivePage('playground')); dispatch(setFloatingChatOpen(true)); }}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 rounded bg-sky-500 px-5 py-3 text-xs font-bold text-white hover:bg-sky-600 transition-colors shadow-xs"
                  id="cta-bottom-playground"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Hemen Test Sürüşü Yapın</span>
                </button>
                <button
                  onClick={() => dispatch(setDemoModal({ open: true, service: 'Genel Tanıtım' }))}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 rounded bg-slate-800 hover:bg-slate-750 text-slate-300 px-5 py-3 text-xs font-bold border border-slate-700 transition-colors shadow-2xs"
                  id="cta-bottom-demo"
                >
                  <span>Bir Danışmanla Görüşün</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
