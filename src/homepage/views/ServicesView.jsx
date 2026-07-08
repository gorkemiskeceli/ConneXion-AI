import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDemoModal, setSelectedServiceId } from '../store/uiSlice.js';
import { SECTOR_ASSISTANTS } from '../data.js';
import { 
  Activity, Briefcase, DollarSign, ShieldAlert, CheckCircle, 
  HelpCircle, ArrowRight, Zap, Play, ShieldCheck, MailOpen
} from 'lucide-react';

export default function ServicesView() {
  const dispatch = useDispatch();
  const selectedServiceId = useSelector((state) => state.ui.selectedServiceId);

  // Helper function to return icon component dynamically
  const renderIcon = (iconName, id) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="h-5 w-5 text-sky-600" />;
      case 'Briefcase':
        return <Briefcase className="h-5 w-5 text-slate-700" />;
      case 'DollarSign':
        return <DollarSign className="h-5 w-5 text-sky-500" />;
      default:
        return <HelpCircle className="h-5 w-5" />;
    }
  };

  const getBorderColor = (id) => {
    if (id === 'saglik') return 'hover:border-sky-300 hover:shadow-sky-500/5';
    if (id === 'hukuk') return 'hover:border-slate-400 hover:shadow-slate-500/5';
    return 'hover:border-sky-300 hover:shadow-sky-500/5';
  };

  const getBgBadgeColor = (id) => {
    if (id === 'saglik') return 'bg-sky-50 text-sky-800 border-sky-100';
    if (id === 'hukuk') return 'bg-slate-100 text-slate-800 border-slate-200';
    return 'bg-sky-50 text-sky-800 border-sky-100';
  };

  const commonFeatures = [
    "AES-256 durağan ve TLS 1.3 aktarım düzeyi şifreleme",
    "Otomatik kişisel veri (PII) ve KVKK maskeleme",
    "Sektörel bilgi tabanı ve bağlamsal RAG beslemesi",
    "Çift yönlü Webhook'lar ve REST API desteği",
    "200+ kurumsal uygulamaya hazır bağlantı kütüphanesi",
    "Eşzamanlı çoklu konuşma yönetimi"
  ];

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-8 sm:py-12" id="services-view-container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center space-x-1 rounded bg-sky-50 px-2 py-0.5 text-[11px] font-mono font-bold text-sky-800 border border-sky-150">// SEKTÖREL ÇÖZÜMLER</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2.5">
            Sektörünüze Özel AI Müşteri Hizmetleri
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Hata kabul etmeyen ve regülasyona tabi olan sağlık, hukuk ve finans dikey alanları için en doğru, güvenli ve hızlı dikey dil modelleri.
          </p>
        </div>

        {/* Sector Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {SECTOR_ASSISTANTS.map((assistant) => (
            <div
              key={assistant.id}
              className={`border border-slate-200 bg-white rounded-lg p-5 flex flex-col justify-between shadow-2xs transition-all duration-300 ${getBorderColor(assistant.id)} hover:shadow-xs`}
              id={`service-card-${assistant.id}`}
            >
              <div className="space-y-4">
                
                {/* Card Header */}
                <div className="flex justify-between items-start">
                  <div className={`flex h-10 w-10 items-center justify-center rounded ${
                    assistant.id === 'saglik' ? 'bg-sky-50' : assistant.id === 'hukuk' ? 'bg-slate-100' : 'bg-sky-50'
                  }`}>
                    {renderIcon(assistant.icon, assistant.id)}
                  </div>
                  <span className={`text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded border ${getBgBadgeColor(assistant.id)}`}>
                    AKTİF MODEL
                  </span>
                </div>

                {/* Card Titles */}
                <div>
                  <h3 className="text-base font-bold text-slate-900">{assistant.name}</h3>
                  <p className="text-[11px] text-slate-400 font-mono font-bold mt-0.5 uppercase tracking-wider">// {assistant.subtitle}</p>
                </div>

                {/* Visual Benefits Grid */}
                <div className="grid grid-cols-3 gap-1.5 py-2.5 border-y border-slate-100 text-center">
                  {assistant.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="bg-slate-50/50 p-1 rounded border border-slate-100">
                      <span className="text-xs font-black text-slate-900 block">{benefit.value}</span>
                      <span className="text-[9px] text-slate-400 font-bold block leading-tight mt-0.5 uppercase">{benefit.label}</span>
                    </div>
                  ))}
                </div>

                {/* Features Bulletpoints */}
                <div>
                  <h4 className="text-[10px] font-mono font-bold text-slate-900 uppercase tracking-wider mb-2">// MODEL YETENEKLERİ</h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {assistant.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2">
                        <CheckCircle className={`h-4 w-4 shrink-0 mt-0.5 ${
                          assistant.id === 'saglik' ? 'text-sky-500' : assistant.id === 'hukuk' ? 'text-slate-500' : 'text-sky-500'
                        }`} />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Warning note */}
                <div className="flex items-start space-x-2 p-2.5 bg-amber-50/70 border border-amber-100 rounded">
                  <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-amber-800 leading-normal">{assistant.warning}</p>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Tüm Hizmetlerde Ortak Özellikler Pills */}
        <section className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 mb-12 shadow-2xs" id="common-features-section">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600">// STANDART DONANIM</span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">Tüm Çözümlerimizde Ortak Özellikler</h2>
            <p className="text-xs text-slate-500 mt-1">
              Hangi asistanı seçerseniz seçin, kurumsal güvenlik ve uyumluluk altyapısı standart olarak sunulur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonFeatures.map((feat, idx) => (
              <div key={idx} className="bg-slate-50/50 border border-slate-100 p-3 rounded flex items-start space-x-2.5">
                <div className="h-7 w-7 rounded bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{feat}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5 uppercase font-mono tracking-wider">// PLATFORM STANDART</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1e293b] text-white rounded border border-slate-800 p-8 text-center relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950/20 to-transparent" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl font-bold tracking-tight">Regülasyona Tabi Bir Sektörde Misiniz?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Özel denetim, KVKK/GDPR uyumluluğu ve kurum içi veri izolasyon gereksinimleriniz için satış ve teknik ekibimizle özel bir toplantı planlayabilirsiniz.
            </p>
            <div className="flex justify-center pt-2">
              <button
                onClick={() => dispatch(setDemoModal({ open: true, service: 'Özel Sektör Entegrasyonu' }))}
                className="inline-flex items-center space-x-1.5 rounded bg-sky-500 text-white px-4 py-2.5 text-xs font-bold hover:bg-sky-600 transition-colors shadow-xs"
                id="services-cta-demo"
              >
                <MailOpen className="h-3.5 w-3.5" />
                <span>Teknik Ekiple Görüşün</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
