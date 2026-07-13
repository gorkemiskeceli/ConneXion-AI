import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDemoModal, setSelectedServiceId } from '../store/uiSlice.js';
import { SECTOR_ASSISTANTS } from '../data.js';
import { 
  Activity, Briefcase, DollarSign, ShieldAlert, Check, 
  HelpCircle, ArrowRight, Zap, Play, ShieldCheck, MailOpen
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ServicesView() {
  const dispatch = useDispatch();
  const selectedServiceId = useSelector((state) => state.ui.selectedServiceId);

  // Helper function to return icon component dynamically
  const renderIcon = (iconName, id) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="h-5 w-5 text-emerald-600" />;
      case 'Briefcase':
        return <Briefcase className="h-5 w-5 text-indigo-600" />;
      case 'DollarSign':
        return <DollarSign className="h-5 w-5 text-sky-600" />;
      default:
        return <HelpCircle className="h-5 w-5 text-slate-500" />;
    }
  };

  const getAccentColors = (id) => {
    if (id === 'saglik') return {
      border: 'hover:border-emerald-500/30 hover:shadow-[0_20px_50px_rgba(16,185,129,0.06)]',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      iconBg: 'bg-emerald-50 border border-emerald-100 text-emerald-600',
      check: 'text-emerald-500 bg-emerald-50 border-emerald-100',
      tag: 'bg-emerald-50/50 border-emerald-100/50 text-emerald-800'
    };
    if (id === 'hukuk') return {
      border: 'hover:border-indigo-500/30 hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)]',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      iconBg: 'bg-indigo-50 border border-indigo-100 text-indigo-600',
      check: 'text-indigo-500 bg-indigo-50 border-indigo-100',
      tag: 'bg-indigo-50/50 border-indigo-100/50 text-indigo-800'
    };
    return {
      border: 'hover:border-sky-500/30 hover:shadow-[0_20px_50px_rgba(14,165,233,0.06)]',
      badge: 'bg-sky-50 text-sky-700 border-sky-100',
      iconBg: 'bg-sky-50 border border-sky-100 text-sky-600',
      check: 'text-sky-500 bg-sky-50 border-sky-100',
      tag: 'bg-sky-50/50 border-sky-100/50 text-sky-800'
    };
  };

  const commonFeatures = [
    "AES-256 durağan ve TLS 1.3 aktarım düzeyi şifreleme",
    "Otomatik kişisel veri (PII) ve KVKK maskeleme",
    "Sektörel bilgi tabanı ve bağlamsal RAG beslemesi",
    "Çift yönlü Webhook'lar ve REST API desteği",
    "200+ kurumsal uygulamaya hazır bağlantı kütüphanesi",
    "Eşzamanlı çoklu konuşma yönetimi"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 100 }
    }
  };

  return (
    <div 
      className="bg-[#f8fafc] min-h-screen py-16 sm:py-24 relative overflow-hidden font-sans select-none" 
      id="services-view-container"
      style={{
        backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.015) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Soft Ambient Blurs */}
      <div className="absolute top-[5%] left-[-5%] w-[400px] h-[400px] bg-sky-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[45%] right-[-5%] w-[450px] h-[450px] bg-indigo-400/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center space-x-2 rounded-full bg-sky-500/10 px-4 py-1 text-[11px] font-mono font-bold tracking-widest text-sky-700 border border-sky-500/20 shadow-2xs mb-4">
            <span className="flex h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
            <span>SEKTÖREL ÇÖZÜMLER</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-2.5 leading-tight">
            Sektörünüze Özel <br />AI Müşteri Hizmetleri
          </h1>
          <p className="text-sm text-slate-500 mt-4 leading-relaxed max-w-2xl mx-auto">
            Hata kabul etmeyen ve regülasyona tabi olan sağlık, hukuk ve finans dikey alanları için en doğru, güvenli ve hızlı dikey dil modelleri.
          </p>
        </motion.div>

        {/* Sector Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {SECTOR_ASSISTANTS.map((assistant) => {
            const colors = getAccentColors(assistant.id);
            return (
              <motion.div
                key={assistant.id}
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.005 }}
                className={`border border-slate-100 bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-all duration-500 ${colors.border}`}
                id={`service-card-${assistant.id}`}
              >
                <div className="space-y-6">
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-center">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.iconBg}`}>
                      {renderIcon(assistant.icon, assistant.id)}
                    </div>
                    <span className={`text-[9px] uppercase font-mono font-bold px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${colors.badge}`}>
                      <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>AKTİF MODEL</span>
                    </span>
                  </div>

                  {/* Card Titles */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{assistant.name}</h3>
                    <p className="text-[10px] text-slate-400 font-mono font-bold mt-1 uppercase tracking-widest">// {assistant.subtitle}</p>
                  </div>

                  {/* Visual Benefits Grid */}
                  <div className="grid grid-cols-3 gap-2.5 py-3.5 border-y border-slate-100 text-center">
                    {assistant.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="bg-slate-50/50 p-2.5 rounded-xl border border-slate-100 flex flex-col justify-center">
                        <span className="text-sm font-black text-slate-900 block">{benefit.value}</span>
                        <span className="text-[8px] text-slate-400 font-bold block leading-tight mt-1 uppercase tracking-tight">{benefit.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Features Bulletpoints */}
                  <div>
                    <h4 className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">// MODEL YETENEKLERİ</h4>
                    <ul className="space-y-2.5 text-xs text-slate-650">
                      {assistant.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2.5">
                          <span className={`flex h-4 w-4 items-center justify-center rounded bg-slate-50 text-emerald-500 border border-slate-100 shrink-0 mt-0.5 ${colors.check}`}>
                            <Check className="h-3 w-3" />
                          </span>
                          <span className="leading-relaxed text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Warning note */}
                  <div className="flex items-start space-x-3 p-3.5 bg-amber-50/40 border border-amber-100/60 rounded-xl">
                    <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-amber-800 leading-relaxed font-medium">{assistant.warning}</p>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Common Features Cards */}
        <motion.section 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-10 mb-16 shadow-[0_8px_30px_rgba(0,0,0,0.01)]" 
          id="common-features-section"
        >
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-600">// STANDART DONANIM</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">Tüm Çözümlerimizde Ortak Özellikler</h2>
            <p className="text-xs text-slate-500 mt-2">
              Hangi asistanı seçerseniz seçin, kurumsal güvenlik, hız ve uyumluluk altyapısı standart olarak sunulur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {commonFeatures.map((feat, idx) => (
              <div key={idx} className="bg-slate-50/40 border border-slate-100 p-4 rounded-xl flex items-start space-x-3.5 hover:bg-slate-50/80 transition-colors">
                <div className="h-8 w-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{feat}</p>
                  <p className="text-[8px] text-slate-400 mt-1 uppercase font-mono tracking-widest font-bold">// PLATFORM STANDART</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-slate-950 via-[#070b16] to-slate-950 text-white rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04)_0%,transparent_70%)] pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h3 className="text-2xl font-bold tracking-tight">Regülasyona Tabi Bir Sektörde Misiniz?</h3>
            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed">
              Özel denetim, KVKK/GDPR uyumluluğu ve kurum içi veri izolasyon gereksinimleriniz için satış ve teknik ekibimizle özel bir toplantı planlayabilirsiniz.
            </p>
            <div className="flex justify-center pt-2">
              <button
                onClick={() => dispatch(setDemoModal({ open: true, service: 'Özel Sektör Entegrasyonu' }))}
                className="inline-flex items-center space-x-2 rounded-xl bg-sky-500 text-white px-5 py-3 text-xs font-bold hover:bg-sky-600 transition-all shadow-[0_0_15px_rgba(14,165,233,0.15)] hover:shadow-[0_0_20px_rgba(14,165,233,0.25)] hover:-translate-y-0.5"
                id="services-cta-demo"
              >
                <MailOpen className="h-4 w-4" />
                <span>Teknik Ekiple Görüşün</span>
              </button>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
