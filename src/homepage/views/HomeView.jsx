import React from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage, setDemoModal, setFloatingChatOpen } from '../store/uiSlice.js';
import { 
  ArrowRight, Activity, Briefcase, DollarSign, Zap, Shield, 
  Layers, CheckCircle2, Globe, Database, Cpu, Play
} from 'lucide-react';
import { motion } from 'motion/react';
import TokenComparison from '../components/TokenComparison.jsx';

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
    <div 
      className="bg-[#f8fafc] min-h-screen font-sans text-slate-900 select-none relative overflow-hidden" 
      id="home-view-container"
      style={{
        backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.012) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Ambient Blurs */}
      <div className="absolute top-[5%] left-[-5%] w-[450px] h-[450px] bg-sky-400/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-[25%] right-[-5%] w-[500px] h-[500px] bg-indigo-400/5 rounded-full blur-[130px] pointer-events-none" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            
            {/* Left Column Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 lg:col-span-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center space-x-2 rounded-full bg-sky-500/10 px-3.5 py-1 text-[11px] font-mono font-bold text-sky-700 border border-sky-500/20 shadow-2xs">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>CONNEXION-AI ENGINE v1.0 // PRODUCTION READY</span>
              </div>
              
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1e293b] leading-tight">
                Sektörünüze Özel<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
                  Hassas Yapay Zeka
                </span><br />
                Müşteri Hizmetleri
              </h1>
              
              <p className="text-sm text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Sağlık, hukuk ve finans gibi hassasiyet ve regülasyon gerektiren sektörler için özel tasarlanmış, %99.4 doğruluk oranına sahip operasyonel otomasyon platformu.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => {
                    dispatch(setActivePage('playground'));
                    dispatch(setFloatingChatOpen(true));
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-[#1e293b] hover:bg-sky-600 text-white px-6 py-3.5 text-xs font-bold transition-all shadow-[0_4px_15px_rgba(15,23,42,0.08)] hover:-translate-y-0.5"
                  id="hero-cta-playground"
                >
                  <Play className="h-3.5 w-3.5 fill-current text-sky-400" />
                  <span>Ücretsiz Test Sürüşü</span>
                </button>
                <button
                  onClick={() => dispatch(setDemoModal({ open: true, service: 'Genel Tanıtım' }))}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 rounded-xl bg-white border border-slate-200 px-6 py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-2xs hover:-translate-y-0.5"
                  id="hero-cta-demo"
                >
                  <span>Demo Talebi</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Badges / Metrics */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <h4 className="text-2xl font-black font-mono text-[#1e293b]">%99.4</h4>
                  <p className="text-[9px] text-slate-400 font-mono uppercase font-bold tracking-wider">Accuracy</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black font-mono text-[#1e293b]">&lt;250ms</h4>
                  <p className="text-[9px] text-slate-400 font-mono uppercase font-bold tracking-wider">Latency</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black font-mono text-[#1e293b]">200+</h4>
                  <p className="text-[9px] text-slate-400 font-mono uppercase font-bold tracking-wider">Integrations</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column Dashboard Mockup */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-12 lg:mt-0 lg:col-span-6 relative flex justify-center items-center"
            >
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 opacity-[0.08] blur-2xl pointer-events-none"></div>
              <div className="w-full max-w-[550px] relative border border-slate-800/80 bg-[#1e293b] rounded-2xl shadow-[0_20px_50px_rgba(6,182,212,0.1)] overflow-hidden text-slate-400 font-mono text-[11px]">
                
                {/* Visual Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#0f172a] border-b border-slate-850">
                  <div className="flex space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" />
                  </div>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">CONNEXION-AI-SYSTEM-DASHBOARD.SH</span>
                  <span className="w-10" />
                </div>

                {/* Dashboard Screen */}
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800/50 pb-2.5">
                    <span className="text-sky-400 font-bold flex items-center space-x-2">
                      <Cpu className="h-4 w-4 animate-spin text-sky-400" />
                      <span>MOTOR_STATUS: OPTIMAL</span>
                    </span>
                    <span className="text-slate-500 text-[10px]">PING: 42ms</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-[#0f172a] p-3 rounded-xl border border-slate-800/50">
                      <div className="text-slate-500 text-[9px] uppercase tracking-wider font-bold">Gelen İstekler</div>
                      <div className="text-lg font-bold text-white mt-1">48,901</div>
                      <div className="text-[9px] text-emerald-450 mt-1 font-bold">▲ %12.4 (Aylık)</div>
                    </div>
                    <div className="bg-[#0f172a] p-3 rounded-xl border border-slate-800/50">
                      <div className="text-slate-500 text-[9px] uppercase tracking-wider font-bold">Hata Oranı</div>
                      <div className="text-lg font-bold text-white mt-1">0.02%</div>
                      <div className="text-[9px] text-emerald-450 mt-1 font-bold">▼ 0.05% İyileşme</div>
                    </div>
                  </div>

                  {/* Simulated Terminal Lines */}
                  <div className="bg-black/30 p-3.5 rounded-xl border border-slate-850 space-y-1.5 font-mono text-[10px] leading-relaxed">
                    <p className="text-slate-500">$ curl -X POST https://api.saasprecise.com/v1/analyze</p>
                    <p className="text-sky-400">{"{"} status: "success", accuracy: 0.994, latency: "218ms" {"}"}</p>
                    <p className="text-slate-500">$ loading legal-compliance-model-v2...</p>
                    <p className="text-indigo-400">⚡ Model initialized. SOC2 compliant verification active.</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Token Comparison section */}
      <TokenComparison />

      {/* Sektörel Başarı (Industry Success Cards) */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center space-x-2 rounded-full bg-sky-500/10 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-sky-700 border border-sky-500/20 shadow-2xs mb-3">
              <span className="flex h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span>SEKTÖREL UZMANLIK</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Genel Yapay Zeka Yerine Sektörel Dikey Çözümler
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Her sektöre özel regülasyonlar, uyumluluk standartları ve terminolojiler göz önünde bulundurularak eğitilmiş yapay zeka asistanları.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Health Card */}
            <div 
              onClick={() => { dispatch(setActivePage('services')); window.scrollTo({ top: 0 }); }}
              className="group border border-slate-100 rounded-2xl p-6 bg-slate-50/30 hover:bg-white hover:shadow-[0_15px_45px_rgba(0,0,0,0.02)] hover:border-emerald-500/30 transition-all duration-500 cursor-pointer"
              id="sector-success-health"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-5 group-hover:bg-emerald-500 group-hover:text-white border border-emerald-100/50 transition-all duration-300">
                <Activity className="h-5.5 w-5.5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Sağlık AI Asistanı</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Hasta triyajı, randevu yönetimi ve HIPAA uyumlu form doldurma otomasyonu.
              </p>
              <div className="mt-5 flex items-center justify-between text-[11px] font-mono font-bold text-emerald-600">
                <span>%99.4 HIPAA Uyumu</span>
                <span className="group-hover:translate-x-1.5 transition-transform flex items-center gap-1">İncele <ArrowRight className="h-3 w-3" /></span>
              </div>
            </div>

            {/* Legal Card */}
            <div 
              onClick={() => { dispatch(setActivePage('services')); window.scrollTo({ top: 0 }); }}
              className="group border border-slate-100 rounded-2xl p-6 bg-slate-50/30 hover:bg-white hover:shadow-[0_15px_45px_rgba(0,0,0,0.02)] hover:border-indigo-500/30 transition-all duration-500 cursor-pointer"
              id="sector-success-legal"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-5 group-hover:bg-indigo-500 group-hover:text-white border border-indigo-100/50 transition-all duration-300">
                <Briefcase className="h-5.5 w-5.5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Hukuk AI Asistanı</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Sözleşme analizi, emsal karar taramaları ve GDPR riskli madde tespiti.
              </p>
              <div className="mt-5 flex items-center justify-between text-[11px] font-mono font-bold text-indigo-600">
                <span>10x Daha Hızlı Analiz</span>
                <span className="group-hover:translate-x-1.5 transition-transform flex items-center gap-1">İncele <ArrowRight className="h-3 w-3" /></span>
              </div>
            </div>

            {/* Finance Card */}
            <div 
              onClick={() => { dispatch(setActivePage('services')); window.scrollTo({ top: 0 }); }}
              className="group border border-slate-100 rounded-2xl p-6 bg-slate-50/30 hover:bg-white hover:shadow-[0_15px_45px_rgba(0,0,0,0.02)] hover:border-sky-500/30 transition-all duration-500 cursor-pointer"
              id="sector-success-finance"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 mb-5 group-hover:bg-sky-500 group-hover:text-white border border-sky-100/50 transition-all duration-300">
                <DollarSign className="h-5.5 w-5.5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">Finans AI Asistanı</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Olağandışı hareket tespiti, mutabakat otomasyonu ve denetim raporlaması.
              </p>
              <div className="mt-5 flex items-center justify-between text-[11px] font-mono font-bold text-sky-655">
                <span>%99.1 Fraud Tespiti</span>
                <span className="group-hover:translate-x-1.5 transition-transform flex items-center gap-1">İncele <ArrowRight className="h-3 w-3" /></span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bento Grid (Dynamic features section) */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-flex items-center space-x-2 rounded-full bg-sky-500/10 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-sky-700 border border-sky-500/20 shadow-2xs mb-3">
              <span className="flex h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span>PLATFORM GÜÇLERİ</span>
            </span>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Operasyonel Hassasiyet için Tasarlanmış Altyapı
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="bento-grid">
            
            {/* Bento item 1: Real-time intelligence */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.03)] hover:border-sky-500/20 transition-all duration-500">
              <div className="max-w-md space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100/50">
                  <Zap className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">Gerçek Zamanlı Karar Destek Motoru</h3>
                  <p className="text-xs text-slate-550 leading-relaxed">
                    İş akışlarınızı anlık olarak analiz edin. ConneXion-AI milisaniyeler içinde bağlamı sorgular, güvenlik kontrollerini yapar ve en doğru aksiyon planını sunar.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center space-x-6 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                <span className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 shrink-0" /> LATENCY &lt;250ms</span>
                <span className="flex items-center"><CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 shrink-0" /> REAL-TIME PROCESS</span>
              </div>
            </div>

            {/* Bento item 2: Enterprise security (High-contrast dark accent) */}
            <div className="bg-[#0b1329] border border-slate-800 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-tr-2xl pointer-events-none" />
              <div className="space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-cyan-400 border border-white/10 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">Kurumsal Düzey Güvenlik</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    SOC 2 Tip II standartları, HIPAA uyumluluğu ve askeri düzey AES-256 şifreleme ile kurum verilerinizin gizliliği güvence altındadır.
                  </p>
                </div>
              </div>
              <div className="mt-8 space-y-2">
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-cyan-400" />
                </div>
                <span className="text-[9px] text-slate-500 block text-right font-mono font-bold uppercase tracking-widest">100% SECURE VERIFICATION ACTIVE</span>
              </div>
            </div>

            {/* Bento item 3: 200+ Integrations */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.03)] hover:border-sky-500/20 transition-all duration-500">
              <div className="space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100/50">
                  <Layers className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">200+ Entegrasyon</h3>
                  <p className="text-xs text-slate-550 leading-relaxed">
                    SAP, Salesforce, Slack, HubSpot ve şirket içi ERP veritabanlarınızla sorunsuz, çift yönlü senkronizasyon.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                {['SAP', 'Salesforce', 'Slack', 'Oracle', 'HubSpot', 'Jira'].map((tool) => (
                  <span key={tool} className="text-[9px] font-mono font-bold bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Alternating Automation Section */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="md:flex md:items-center md:justify-between md:space-x-12 mb-12">
            <div className="max-w-xl">
              <span className="inline-flex items-center space-x-2 rounded-full bg-sky-500/10 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-sky-700 border border-sky-500/20 shadow-2xs mb-3">
                <span className="flex h-1.5 w-1.5 rounded-full bg-sky-500" />
                <span>OTOMASYON GÜCÜ</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">En Karmaşık İş Akışlarınızı Otomatikleştirin</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                ConneXion-AI sadece soruları yanıtlamakla kalmaz, aynı zamanda API'ler üzerinden sistemlerinizde işlem yapabilir.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Visual Steps representation */}
            <div className="space-y-5 flex flex-col justify-center">
              
              <div className="flex items-start space-x-4 border-l-2 border-sky-500 pl-5 py-1">
                <div className="font-mono text-sky-500 font-bold text-xs mt-0.5">01</div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">Bağlam Algılama</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Gelen e-posta veya doküman yapay zeka tarafından analiz edilir ve niyet tam doğrulukla saptanır.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 border-l-2 border-slate-100 pl-5 py-1 hover:border-sky-450 transition-colors duration-300">
                <div className="font-mono text-slate-400 font-bold text-xs mt-0.5">02</div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">Mevzuat ve Güvenlik Filtresi</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Hassas kişisel veriler (TC Kimlik, tıbbi veri, kredi kartı vb.) maskelenir ve regülasyon uyumluluğu kontrol edilir.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 border-l-2 border-slate-100 pl-5 py-1 hover:border-sky-450 transition-colors duration-300">
                <div className="font-mono text-slate-400 font-bold text-xs mt-0.5">03</div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">API Akışı Tetikleme</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Sistem, ERP veya CRM üzerindeki API'yi güvenli bir şekilde tetikleyerek kaydı günceller veya randevuyu onaylar.</p>
                </div>
              </div>

            </div>

            {/* Visual Mock Card representing a task action */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-center">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-slate-800 uppercase tracking-wider">// ACTIVE_FLOW_PIPELINE</span>
                </div>
                <span className="text-[9px] font-mono bg-emerald-50 border border-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold">RUNNING</span>
              </div>

              <div className="space-y-3.5 text-xs text-slate-600 leading-normal">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400">Asistan Tipi:</span>
                  <span className="font-bold text-slate-900">Sağlık AI Asistanı</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400">Tetiklenen Olay:</span>
                  <span className="font-mono text-slate-900 font-bold">Randevu Onay Talebi</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400">Maskelenen Veri:</span>
                  <span className="font-mono text-slate-550">** ** 1234 (Kişisel Veri)</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-slate-900">İşlem Durumu:</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span>
                    CRM Güncellendi
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Floating Unified Data Management Card */}
      <section className="py-16 sm:py-20 relative overflow-hidden bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0b1329] border border-slate-800 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 h-96 w-96 bg-sky-500/10 rounded-full blur-3xl" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
              
              <div className="space-y-5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400 block">// KÜRESEL YÖNETİŞİM</span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Bölgeler Arası Birleşik <br />Veri Yönetişimi
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Verilerinizin nerede barındırılacağına siz karar verin. ConneXion-AI, AB (GDPR), ABD (HIPAA) ve Türkiye yerel sunucu mevzuatlarına uygun bağımsız veri lokasyonları sunarak regülatif riskleri sıfırlar.
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 shrink-0">
                      <Globe className="h-4.5 w-4.5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs text-white">Çoklu Bölge Desteği</h4>
                      <p className="text-[10px] text-slate-450">Sunucu konumunu seçin.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 shrink-0">
                      <Database className="h-4.5 w-4.5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs text-white">Yerel Depolama</h4>
                      <p className="text-[10px] text-slate-450">Mevzuatlarla %100 uyum.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Globe Icon / Mapping card */}
              <div className="border border-slate-800 bg-[#0f172a]/80 p-6 rounded-2xl relative shadow-md">
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-2">
                    <span>VERİ BÖLGESİ ROTASYONU</span>
                    <span className="text-emerald-400 animate-pulse font-bold">● BAĞLI</span>
                  </div>
                  
                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between items-center bg-[#05080e] p-2.5 rounded-lg border border-slate-850">
                      <span className="text-slate-300">AB Sunucusu (Frankfurt)</span>
                      <span className="text-emerald-400 text-[10px] font-bold">AKTİF</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#05080e] p-2.5 rounded-lg border border-slate-850">
                      <span className="text-slate-300">Türkiye Sunucusu (İstanbul)</span>
                      <span className="text-emerald-400 text-[10px] font-bold">AKTİF</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#05080e] p-2.5 rounded-lg border border-slate-850">
                      <span className="text-slate-350">ABD Sunucusu (Virginia)</span>
                      <span className="text-slate-500 text-[10px]">İsteğe Bağlı</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Floating Bottom CTA section */}
      <section className="py-16 sm:py-20 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-950 via-[#070b16] to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-5">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                Tam Operasyonel Hassasiyete Ulaşmaya Hazır Mısınız?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                ConneXion-AI yapay zeka modelleriyle müşteri memnuniyetinizi artırın, operasyonel yüklerinizi hafifletin ve hata payını sıfıra indirin.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => { dispatch(setActivePage('playground')); dispatch(setFloatingChatOpen(true)); }}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-sky-500 text-white px-6 py-3.5 text-xs sm:text-sm font-bold hover:bg-sky-600 transition-all shadow-[0_0_15px_rgba(14,165,233,0.2)] hover:-translate-y-0.5"
                  id="cta-bottom-playground"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Hemen Test Sürüşü Yapın</span>
                </button>
                <button
                  onClick={() => dispatch(setDemoModal({ open: true, service: 'Genel Tanıtım' }))}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 px-6 py-3.5 text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5"
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
