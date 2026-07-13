import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage, setDemoModal, setFloatingChatOpen } from '../store/uiSlice.js';
import { 
  Cpu, Shield, Terminal, Code, Layers, 
  Check, Play, ArrowRight, Copy, CheckSquare, Zap, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FeaturesView() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('curl');
  const [copied, setCopied] = useState(false);
  const [isMasked, setIsMasked] = useState(false);
  const [telemetryStep, setTelemetryStep] = useState(0);

  // Masking telemetry interval (every 3.5s)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsMasked((prev) => !prev);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // RAG Telemetry interval (every 4s)
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryStep((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const codeSnippets = {
    curl: `curl -X POST "https://api.saasprecise.com/v1/analyze" \\
  -H "Authorization: Bearer $PRECISE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sector": "hukuk",
    "document_text": "Sözleşme bedeli 14 gün içinde ödenmezse %2 faiz uygulanacaktır.",
    "mask_pii": true
  }'`,
    node: `import { ConneXionClient } from '@connexion-ai/sdk';

const connexion = new ConneXionClient({
  apiKey: process.env.CONNEXION_API_KEY
});

const result = await connexion.analyze({
  sector: 'hukuk',
  documentText: 'Sözleşme bedeli 14 gün içinde ödenmezse %2 faiz uygulanacaktır.',
  maskPii: true
});

console.log(result.accuracy); // -> 0.994`,
    python: `from connexion_ai import ConneXion

connexion = ConneXion(api_key="your_api_key")

response = connexion.analyze(
    sector="hukuk",
    document_text="Sözleşme bedeli 14 gün içinde ödenmezse %2 faiz uygulanacaktır.",
    mask_pii=True
)

print(response.get('accuracy')) # -> 0.994`
  };

  const highlightedSnippets = {
    curl: `<span class="text-indigo-400 font-bold">curl</span> -X POST <span class="text-emerald-400">"https://api.saasprecise.com/v1/analyze"</span> \\
  -H <span class="text-emerald-400">"Authorization: Bearer $PRECISE_API_KEY"</span> \\
  -H <span class="text-emerald-400">"Content-Type: application/json"</span> \\
  -d <span class="text-amber-400">'{
    "sector": "hukuk",
    "document_text": "Sözleşme bedeli 14 gün içinde ödenmezse %2 faiz uygulanacaktır.",
    "mask_pii": true
  }'</span>`,
    node: `<span class="text-purple-400 font-semibold">import</span> { ConneXionClient } <span class="text-purple-400 font-semibold">from</span> <span class="text-emerald-400">'@connexion-ai/sdk'</span>;

<span class="text-purple-400 font-semibold">const</span> connexion = <span class="text-purple-400 font-semibold">new</span> <span class="text-cyan-400">ConneXionClient</span>({
  apiKey: process.env.CONNEXION_API_KEY
});

<span class="text-purple-400 font-semibold">const</span> result = <span class="text-purple-400 font-semibold">await</span> connexion.analyze({
  sector: <span class="text-emerald-400">'hukuk'</span>,
  documentText: <span class="text-emerald-400">'Sözleşme bedeli 14 gün içinde ödenmezse %2 faiz uygulanacaktır.'</span>,
  maskPii: <span class="text-amber-400">true</span>
});

console.log(result.accuracy); <span class="text-slate-500">// -> 0.994</span>`,
    python: `<span class="text-purple-400 font-semibold">from</span> connexion_ai <span class="text-purple-400 font-semibold">import</span> ConneXion

connexion = <span class="text-cyan-400">ConneXion</span>(api_key=<span class="text-emerald-400">"your_api_key"</span>)

response = connexion.analyze(
    sector=<span class="text-emerald-400">"hukuk"</span>,
    document_text=<span class="text-emerald-400">"Sözleşme bedeli 14 gün içinde ödenmezse %2 faiz uygulanacaktır."</span>,
    mask_pii=<span class="text-amber-400">True</span>
)

print(response.get(<span class="text-emerald-400">'accuracy'</span>)) <span class="text-slate-500"># -> 0.994</span>`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 100 }
    }
  };

  return (
    <div 
      className="bg-[#030712] text-white min-h-screen py-16 sm:py-24 relative overflow-hidden font-sans select-none" 
      id="features-view-container"
      style={{
        backgroundImage: 'radial-gradient(rgba(244, 244, 255, 0.015) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {/* Glow Backdrop Lights */}
      <div className="absolute top-[5%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Styled Scanlines effect */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_50%,rgba(0,0,0,1)_50%)] bg-[size:100%_4px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-24"
        >
          <span className="inline-flex items-center space-x-2 rounded-full bg-cyan-500/10 px-4 py-1 text-[11px] font-mono font-bold tracking-widest text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)] mb-4">
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>YETENEKLER &amp; ALTYAPI</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Tam Operasyonel Hassasiyet <br />İçin Tasarlandı
          </h1>
          <p className="text-sm text-slate-400 mt-4 leading-relaxed max-w-2xl mx-auto">
            Platformumuz, yüksek regülasyonlu endüstrilerde sıfır hata, maksimum veri güvenliği ve üstün işletimsel verimlilik sağlamak üzere özel mühendislik mimarisiyle inşa edilmiştir.
          </p>
        </motion.div>

        {/* Dynamic Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12 sm:space-y-16"
        >
          
          {/* SECTION 1: Real-time RAG Engine */}
          <motion.div 
            variants={cardVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Card Left: Real-Time Engine Info */}
            <div className="lg:col-span-5 bg-white/[0.01] border border-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/25 hover:bg-white/[0.02] transition-all duration-500 group shadow-xl">
              <div className="space-y-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300">
                  <Cpu className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    Gerçek Zamanlı Öngörü Motoru
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Gelen veriyi anında analiz eden, yapay zeka halüsinasyonlarını ortadan kaldıran özel doğrulama katmanımızdır. ConneXion-AI, genel amaçlı bir asistan değildir; sektörel bilgi tabanı ve mantıksal doğrulama mekanizmalarıyla çalışır.
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 mt-6 border-t border-white/5 pt-5">
                <li className="flex items-start space-x-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5 border border-emerald-500/20">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span><strong>Özel Doğrulama Katmanı:</strong> Üretilen tüm yanıtlar bilgi tabanı süzgecinden geçirilir.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5 border border-emerald-500/20">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span><strong>Semantik RAG Motoru:</strong> Şirket içi dokümanlarınızı milisaniyeler içinde tarayıp bağlamı hazırlar.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5 border border-emerald-500/20">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span><strong>Hata Ayıklama Sistemi:</strong> Olası çelişkili veya yanlış ifadeler model tarafından gönderilmeden elenir.</span>
                </li>
              </ul>
            </div>

            {/* Card Right: Real-time Telemetry Simulator */}
            <div className="lg:col-span-7 bg-[#05080e]/60 border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
              {/* Corner tech highlights */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-tr-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 border-b border-white/5 pb-3 mb-5 font-mono">
                <span className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>// DOĞRULAMA TELEMETRİSİ // LIVE</span>
                </span>
                <span className="text-emerald-400 font-bold tracking-wider">● ÇEVRİMİÇİ</span>
              </div>

              <div className="space-y-4 font-mono text-xs flex-grow flex flex-col justify-center">
                {/* Girdi Analizi */}
                <div className={`transition-all duration-500 p-3.5 rounded-xl border ${telemetryStep === 0 ? 'bg-cyan-950/20 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.08)]' : 'bg-white/[0.01] border-white/5 opacity-60'}`}>
                  <span className="text-slate-500 block uppercase text-[8px] font-bold tracking-wider">Girdi Analizi</span>
                  <span className="text-white block mt-1 font-semibold">"Sözleşme fesih süresi nedir?"</span>
                </div>

                {/* Flow indicator */}
                <div className="flex justify-center relative h-8">
                  <div className="w-px h-full bg-slate-800/80 border-dashed" />
                  <div className={`absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-[1200ms] ${
                    telemetryStep === 0 ? 'top-0 opacity-0' : telemetryStep === 1 ? 'top-1/2 opacity-100 scale-125' : 'top-full opacity-0'
                  }`} />
                </div>

                {/* Telemetry processing / matched */}
                <div className={`transition-all duration-500 p-4 rounded-xl border ${
                  telemetryStep === 0 
                    ? 'bg-white/[0.01] border-white/5 opacity-30' 
                    : telemetryStep === 1 
                    ? 'bg-amber-950/20 border-amber-500/30 text-amber-300 animate-pulse'
                    : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.08)]'
                }`}>
                  <span className="text-slate-500 block uppercase text-[8px] font-bold tracking-wider">RAG Doğrulama Filtresi (SOC-2)</span>
                  {telemetryStep === 0 && <span className="block mt-1 text-slate-500 italic">Bekliyor...</span>}
                  {telemetryStep === 1 && <span className="block mt-1 flex items-center gap-2">🔍 Dahili bilgi tabanı taranıyor...</span>}
                  {telemetryStep === 2 && (
                    <div className="space-y-1.5">
                      <span className="text-white block mt-1 font-semibold text-xs sm:text-sm">✓ Eşleşen Sözleşme Maddesi: "Madde 12.4 - Fesih ihbar süresi 30 gündür."</span>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-emerald-400/90 font-bold border-t border-emerald-500/10 pt-1.5 mt-1.5">
                        <span>Doğruluk Puanı: 0.998</span>
                        <span>Halüsinasyon Riski: Sıfır</span>
                        <span>Doğrulama Modeli: V2.1_LEGAL</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* SECTION 2: Encrypted Infrastructure & Data Masking */}
          <motion.div 
            variants={cardVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Card Left: Encrypted Infrastructure */}
            <div className="lg:col-span-5 bg-white/[0.01] border border-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/25 hover:bg-white/[0.02] transition-all duration-500 group shadow-xl">
              <div className="space-y-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Güvenli ve Şifreli Altyapı
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Verilerinize saygı duyuyoruz. ConneXion-AI üzerinde işlenen hiçbir veri üçüncü taraf modellerin eğitimi amacıyla kullanılmaz. Tüm süreçler tamamen izole edilmiş kurumsal alanlarda çalışır.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5 mt-8">
                <div className="bg-[#05080e]/40 border border-white/5 p-4 rounded-xl hover:border-emerald-500/20 transition-colors">
                  <span className="font-mono text-base font-bold text-white">AES-256</span>
                  <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-wider font-bold">Veri Şifrelemesi</p>
                </div>
                <div className="bg-[#05080e]/40 border border-white/5 p-4 rounded-xl hover:border-emerald-500/20 transition-colors">
                  <span className="font-mono text-base font-bold text-white">SOC 2 Tip II</span>
                  <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-wider font-bold">Güvenlik Standardı</p>
                </div>
                <div className="bg-[#05080e]/40 border border-white/5 p-4 rounded-xl hover:border-emerald-500/20 transition-colors">
                  <span className="font-mono text-base font-bold text-white">KVKK / GDPR</span>
                  <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-wider font-bold">Veri Maskeleme</p>
                </div>
                <div className="bg-[#05080e]/40 border border-white/5 p-4 rounded-xl hover:border-emerald-500/20 transition-colors">
                  <span className="font-mono text-base font-bold text-white">HIPAA Hazır</span>
                  <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-wider font-bold">Sağlık Regülasyonu</p>
                </div>
              </div>
            </div>

            {/* Card Right: Live PII Masking Simulator */}
            <div className="lg:col-span-7 bg-[#05080e]/60 border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-tr-2xl pointer-events-none" />

              <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 border-b border-white/5 pb-3 mb-5 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>// PRECISE_SECURITY_SHIELD://ACTIVE</span>
                </span>
                <span className="text-emerald-400 font-bold tracking-wider">● MASKELENİYOR</span>
              </div>

              <div className="space-y-4 flex-grow flex flex-col justify-center">
                <h3 className="text-base font-bold text-white">Dinamik Veri Maskeleme Sistemi</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                  Platformumuz, harici büyük dil modellerine sorgu göndermeden önce tüm hassas kişisel verileri (İsim, TC Kimlik, E-posta, Telefon vb.) otomatik algılar, maskeler veya takma isimlerle değiştirir.
                </p>

                {/* Masking telemetry representation */}
                <div className="bg-[#0b1329]/60 border border-white/5 p-4 sm:p-5 rounded-xl space-y-4 font-mono text-xs min-h-[145px] flex flex-col justify-center relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  <div className="relative z-10 transition-all duration-500">
                    <span className="text-rose-400 block uppercase text-[8px] font-bold tracking-wider mb-1">Girdi Metni (Sunucuya Gelen)</span>
                    <p className="text-slate-300 leading-relaxed">
                      "Hasta <span className={`transition-colors duration-500 ${isMasked ? 'text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded font-bold' : 'text-white'}`}>Ahmet Yılmaz</span> (TC: <span className={`transition-colors duration-500 ${isMasked ? 'text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded font-bold' : 'text-white'}`}>12345678901</span>) için randevu oluşturun."
                    </p>
                  </div>
                  
                  <div className="h-px bg-white/5 my-1" />
                  
                  <div className="relative z-10 transition-all duration-500">
                    <span className="text-emerald-400 block uppercase text-[8px] font-bold tracking-wider mb-1">Maskelenmiş Çıktı (Model Gönderilen)</span>
                    <p className="text-slate-300 leading-relaxed">
                      "Hasta <span className={`transition-all duration-500 px-1.5 py-0.5 rounded font-bold ${isMasked ? 'text-emerald-400 bg-emerald-500/15' : 'text-slate-500'}`}>
                        {isMasked ? '[MASK_NAME_1]' : 'Ahmet Yılmaz'}
                      </span> (TC: <span className={`transition-all duration-500 px-1.5 py-0.5 rounded font-bold ${isMasked ? 'text-emerald-400 bg-emerald-500/15' : 'text-slate-500'}`}>
                        {isMasked ? '[MASK_ID_1]' : '12345678901'}
                      </span>) için randevu oluşturun."
                    </p>
                  </div>
                  
                  {/* Pulse scanline overlay */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent animate-[pulse_2.5s_infinite]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* SECTION 3: API Integration block */}
          <motion.div 
            variants={cardVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            id="api-integration-section"
          >
            {/* Card Left: API Integration Info */}
            <div className="lg:col-span-5 bg-white/[0.01] border border-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-500/25 hover:bg-white/[0.02] transition-all duration-500 group shadow-xl">
              <div className="space-y-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-indigo-400 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300">
                  <Code className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    Sorunsuz API Entegrasyonu
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Geliştiriciler tarafından, geliştiriciler için tasarlandı. Basit REST mimarimiz ve hafif SDK'larımız sayesinde, sistemlerinize ConneXion-AI asistanlarını entegre etmek birkaç satır koddan ibarettir.
                  </p>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 mt-6 border-t border-white/5 pt-5">
                <li className="flex items-center space-x-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-indigo-500/10 text-indigo-400 shrink-0 border border-indigo-500/20 text-xs font-bold font-mono">✓</span>
                  <span><strong>Güvenli Webhook'lar:</strong> Olay tabanlı anlık bildirimler.</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-indigo-500/10 text-indigo-400 shrink-0 border border-indigo-500/20 text-xs font-bold font-mono">✓</span>
                  <span><strong>SDK Desteği:</strong> Node.js, Python ve cURL protokolleri.</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-indigo-500/10 text-indigo-400 shrink-0 border border-indigo-500/20 text-xs font-bold font-mono">✓</span>
                  <span><strong>API Key Rotasyonu:</strong> Güvenli ve hızlı anahtar yönetimi.</span>
                </li>
              </ul>
            </div>

            {/* Card Right: Interactive IDE Terminal */}
            <div className="lg:col-span-7 bg-[#05080e]/60 border border-white/5 rounded-2xl overflow-hidden flex flex-col shadow-xl group hover:border-indigo-500/10 transition-colors">
              
              {/* Tab Selector & Copy Button */}
              <div className="flex items-center justify-between border-b border-white/5 bg-[#090f1d] px-4 py-3">
                <div className="flex space-x-1.5">
                  {['curl', 'node', 'python'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                        activeTab === tab
                          ? 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.1)]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02] border border-transparent'
                      }`}
                    >
                      {tab === 'curl' ? 'cURL' : tab === 'node' ? 'Node.js' : 'Python'}
                    </button>
                  ))}
                </div>

                {/* Copy Button */}
                <button 
                  onClick={handleCopy}
                  className="flex items-center space-x-1.5 text-[11px] font-mono font-semibold bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg transition-all"
                >
                  {copied ? (
                    <>
                      <CheckSquare className="h-3.5 w-3.5 text-emerald-400 animate-scale" />
                      <span className="text-emerald-400">Kopyalandı!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Kopyala</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Panel */}
              <div className="p-5 font-mono text-[11px] sm:text-xs text-slate-300 overflow-x-auto bg-[#070b13]/80 leading-relaxed min-h-[190px] flex items-center shadow-inner">
                <pre className="w-full">
                  <code dangerouslySetInnerHTML={{ __html: highlightedSnippets[activeTab] }} />
                </pre>
              </div>

            </div>
          </motion.div>

        </motion.div>

        {/* Bottom CTA Block */}
        <motion.section 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-slate-950 via-[#070b16] to-slate-950 border border-white/5 hover:border-cyan-500/20 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl mt-16 sm:mt-24 group transition-all duration-500"
        >
          {/* Subtle cyan glow inside CTA */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Kendi Entegrasyonunuzu <br />Hemen Başlatın
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
              Hemen bir geliştirici hesabı açın veya asistanlarımızın API yeteneklerini test etmek için Test Sürüşü modülümüzü kullanın.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-3">
              <button
                onClick={() => { dispatch(setActivePage('playground')); dispatch(setFloatingChatOpen(true)); }}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-cyan-500 text-white px-6 py-3.5 text-xs sm:text-sm font-bold hover:bg-cyan-600 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:-translate-y-0.5"
              >
                <Play className="h-3.5 w-3.5 fill-current text-white" />
                <span>Test Sürüşünü Başlat</span>
              </button>
              <button
                onClick={() => dispatch(setDemoModal({ open: true, service: 'Yetenekler API Entegrasyonu' }))}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-slate-900 border border-white/5 text-slate-300 px-6 py-3.5 text-xs sm:text-sm font-bold hover:bg-slate-850 hover:text-white transition-all hover:border-white/10"
              >
                <span>Demo Talebi Gönder</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
