import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage, setDemoModal, setFloatingChatOpen } from '../store/uiSlice.js';
import { 
  Cpu, Shield, Terminal, Code, Layers, RefreshCw, 
  Check, Play, ArrowRight, Server, Key, HelpCircle
} from 'lucide-react';

export default function FeaturesView() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('curl');

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

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-8 sm:py-12" id="features-view-container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center space-x-1 rounded bg-sky-50 px-2 py-0.5 text-[11px] font-mono font-bold text-sky-800 border border-sky-150">// YETENEKLER & ALTYAPI</span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1e293b] tracking-tight mt-2.5">
            Tam Operasyonel Hassasiyet için Tasarlandı
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Platformumuz, yüksek regülasyonlu endüstrilerde sıfır hata ve maksimum veri güvenliği sağlamak üzere özel mühendislik mimarisiyle inşa edilmiştir.
          </p>
        </div>

        {/* Features Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          
          {/* Card Left: Real-Time Engine */}
          <div className="space-y-4 bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-2xs">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-sky-50 text-sky-600">
              <Cpu className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Gerçek Zamanlı Öngörü Motoru</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Gelen veriyi anında analiz eden, yapay zeka halüsinasyonlarını ortadan kaldıran özel doğrulama katmanımızdır. ConneXion-AI, genel amaçlı bir asistan değildir; sektörel bilgi tabanı ve mantıksal doğrulama mekanizmalarıyla çalışır.
            </p>
            
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start space-x-2.5">
                <Check className="h-4 w-4 text-sky-500 mt-0.5 shrink-0" />
                <span><strong>Özel Doğrulama Katmanı:</strong> Üretilen tüm yanıtlar bilgi tabanı süzgecinden geçirilir.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="h-4 w-4 text-sky-500 mt-0.5 shrink-0" />
                <span><strong>Semantik RAG Motoru:</strong> Şirket içi dokümanlarınızı milisaniyeler içinde tarayıp bağlamı hazırlar.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Check className="h-4 w-4 text-sky-500 mt-0.5 shrink-0" />
                <span><strong>Hata Ayıklama Sistemi:</strong> Olası çelişkili veya yanlış ifadeler model tarafından gönderilmeden elenir.</span>
              </li>
            </ul>
          </div>

          {/* Visual Simulation for Real-Time telemetry */}
          <div className="border border-slate-200 bg-white rounded-lg p-5 relative overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-100 pb-2 mb-3.5 font-mono">
              <span>// DOĞRULAMA TELEMETRİSİ</span>
              <span className="text-emerald-600 font-bold animate-pulse">● BAĞLI</span>
            </div>

            <div className="space-y-3 font-mono text-[11px]">
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-slate-400 block uppercase text-[8px] font-bold">Girdi Analizi</span>
                <span className="text-slate-800 block mt-0.5 font-semibold">"Sözleşme fesih süresi nedir?"</span>
              </div>

              <div className="flex justify-center my-1.5">
                <div className="h-6 w-0.5 bg-dashed border-l border-sky-400" />
              </div>

              <div className="bg-[#1e293b] text-sky-300 p-3 rounded border border-slate-800">
                <span className="text-sky-400 block uppercase text-[8px] font-bold">RAG Doğrulama Filtresi (SOC-2)</span>
                <span className="text-white block mt-0.5 text-xs">✓ Eşleşen Sözleşme Maddesi: "Madde 12.4 - Fesih ihbar süresi 30 gündür."</span>
                <span className="text-[10px] text-sky-200 block mt-1">Doğruluk Puanı: 0.998 | Halüsinasyon Risk Seviyesi: Sıfır</span>
              </div>
            </div>
          </div>

        </div>

        {/* Encrypted Infrastructure Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          <div className="space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-sky-50 text-sky-600">
              <Shield className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Güvenli ve Şifreli Altyapı</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Verilerinize saygı duyuyoruz. ConneXion-AI üzerinde işlenen hiçbir veri üçüncü taraf modellerin eğitimi amacıyla kullanılmaz. Tüm süreçler tamamen izole edilmiş kurumsal alanlarda çalışır.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3.5 rounded border border-slate-200">
                <span className="font-mono text-base font-bold text-slate-900">AES-256</span>
                <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider font-bold">Veri Şifrelemesi</p>
              </div>
              <div className="bg-white p-3.5 rounded border border-slate-200">
                <span className="font-mono text-base font-bold text-slate-900">SOC 2 Tip II</span>
                <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider font-bold">Güvenlik Sertifikası</p>
              </div>
              <div className="bg-white p-3.5 rounded border border-slate-200">
                <span className="font-mono text-base font-bold text-slate-900">GDPR Uyumlu</span>
                <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider font-bold">KVKK Maskeleme</p>
              </div>
              <div className="bg-white p-3.5 rounded border border-slate-200">
                <span className="font-mono text-base font-bold text-slate-900">HIPAA Hazır</span>
                <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider font-bold">Sağlık Veri Koruması</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1e293b] text-white rounded border border-slate-800 p-5 sm:p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-sky-500/10 rounded-full blur-2xl" />
            
            <div className="space-y-3">
              <div className="flex items-center space-x-1.5 text-sky-400 text-xs font-mono font-bold">
                <Terminal className="h-4 w-4" />
                <span>// PRECISE_SECURITY_SHIELD://ACTIVE</span>
              </div>
              
              <h3 className="text-base font-bold">Veri Maskeleme Sistemi</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Platformumuz, harici modellere sorgu göndermeden önce tüm hassas kişisel verileri (TC Kimlik, e-posta, telefon, finansal tutar) otomatik algılar, maskeler veya takma isimlerle değiştirir.
              </p>

              <div className="bg-black/40 border border-slate-800 p-3 rounded space-y-2 font-mono text-[10px]">
                <div>
                  <span className="text-rose-400 block uppercase text-[8px] font-bold">Orijinal Metin (Sunucuya Gelen)</span>
                  <p className="text-slate-300 mt-0.5">"Hasta Ahmet Yılmaz (TC: 12345678901) için randevu oluşturun."</p>
                </div>
                <div className="border-t border-slate-800 my-1.5 pt-1.5">
                  <span className="text-emerald-400 block uppercase text-[8px] font-bold">Maskelenmiş Metin (Model Gönderilen)</span>
                  <p className="text-white mt-0.5">"Hasta [MASK_NAME_1] (TC: [MASK_ID_1]) için randevu oluşturun."</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Seamless API Integration */}
        <section className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 mb-12 shadow-2xs" id="api-integration-section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-sky-50 text-sky-600">
                <Code className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Sorunsuz API Entegrasyonu</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Geliştiriciler tarafından, geliştiriciler için tasarlandı. Basit REST mimarimiz ve hafif SDK'larımız sayesinde, sistemlerinize ConneXion-AI asistanlarını entegre etmek birkaç satır koddan ibarettir.
              </p>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center space-x-2.5">
                  <span className="h-4 w-4 rounded bg-sky-50 border border-sky-150 text-sky-600 flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                  <span><strong>Güvenli Webhook'lar:</strong> Olay tabanlı anlık bildirimler.</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="h-4 w-4 rounded bg-sky-50 border border-sky-150 text-sky-600 flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                  <span><strong>Hafif SDK Desteği:</strong> Node.js, Python, Go ve Java dilleri.</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="h-4 w-4 rounded bg-sky-50 border border-sky-150 text-sky-600 flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                  <span><strong>Kolay Token Yönetimi:</strong> Güvenli API anahtarı rotasyonu.</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Code Block Column */}
            <div className="lg:col-span-7 bg-[#1e293b] rounded border border-slate-800 shadow-sm overflow-hidden flex flex-col">
              
              {/* Tab Selector */}
              <div className="flex border-b border-slate-800 bg-[#151c2c] px-3 py-1.5">
                {['curl', 'node', 'python'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-colors mr-1.5 ${
                      activeTab === tab
                        ? 'bg-slate-800 text-sky-400'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab === 'curl' ? 'cURL' : tab === 'node' ? 'Node.js' : 'Python'}
                  </button>
                ))}
              </div>

              {/* Code Panel */}
              <div className="p-4 font-mono text-[11px] text-slate-300 overflow-x-auto bg-[#1e293b] leading-relaxed min-h-[160px]">
                <pre>{codeSnippets[activeTab]}</pre>
              </div>

            </div>

          </div>
        </section>

        {/* Bottom CTA Block */}
        <section className="bg-[#1e293b] text-white rounded border border-slate-800 p-8 text-center relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950/20 to-transparent" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl font-bold tracking-tight">Kendi Entegrasyonunuzu Başlatın</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hemen bir geliştirici hesabı açın veya asistanlarımızın API yeteneklerini test etmek için Test Sürüşü modülümüzü kullanın.
            </p>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                onClick={() => { dispatch(setActivePage('playground')); dispatch(setFloatingChatOpen(true)); }}
                className="inline-flex items-center space-x-1.5 rounded bg-sky-500 text-white px-4 py-2.5 text-xs font-bold hover:bg-sky-600 transition-colors shadow-xs"
              >
                <Play className="h-3 w-3 fill-current text-white" />
                <span>Test Sürüşünü Başlat</span>
              </button>
              <button
                onClick={() => dispatch(setDemoModal({ open: true, service: 'Yetenekler API Entegrasyonu' }))}
                className="inline-flex items-center space-x-1.5 rounded bg-slate-800 border border-slate-700 text-slate-300 px-4 py-2.5 text-xs font-bold hover:bg-slate-750 transition-colors"
              >
                <span>Demo Talebi Gönder</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
