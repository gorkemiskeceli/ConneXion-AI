import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsLoading(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    }, 1200);
  };

  return (
    <div 
      className="bg-[#f8fafc] min-h-screen pt-28 pb-16 sm:pt-36 sm:pb-24 relative overflow-hidden font-sans select-none" 
      id="contact-view-container"
      style={{
        backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.015) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Soft Ambient Blurs */}
      <div className="absolute top-[5%] left-[-5%] w-[400px] h-[400px] bg-sky-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-5%] w-[450px] h-[450px] bg-indigo-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <span className="inline-flex items-center space-x-2 rounded-full bg-sky-500/10 px-4 py-1 text-[11px] font-mono font-bold tracking-widest text-sky-700 border border-sky-500/20 shadow-2xs mb-4">
            <span className="flex h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
            <span>BİZİMLE İLETİŞİME GEÇİN</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-2.5 leading-tight">
            Sizinle Tanışmak İçin <br />Sabırsızlanıyoruz
          </h1>
          <p className="text-sm text-slate-500 mt-4 leading-relaxed max-w-2xl mx-auto">
            Platform entegrasyonu, kurumsal fiyat planları veya özel sunucu kurulumları hakkında bilgi almak için formu doldurabilirsiniz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.025)] relative overflow-hidden pt-8 sm:pt-10"
          >
            {/* Top Gradient Bar for Premium Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-550 to-indigo-600" />
            
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-12 space-y-5" 
                  id="contact-success-notification"
                >
                  <div className="mx-auto h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100 shadow-[0_4px_15px_rgba(16,185,129,0.1)]">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">Mesajınız Başarıyla İletildi!</h3>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                      ConneXion-AI destek ekibine ulaştınız. Sorunuza veya demo talebinize kurumsal e-posta adresiniz üzerinden 2 saat içinde yanıt vereceğiz.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="inline-flex items-center space-x-2 text-xs font-bold text-sky-650 hover:text-sky-700 pt-4"
                  >
                    <span>Yeni bir mesaj gönder</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-[10px] font-mono font-bold text-slate-550 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
                        <span>AD SOYAD *</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ahmet Yılmaz"
                        className="w-full border border-slate-200/80 rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all bg-slate-50/40 text-slate-800 font-semibold placeholder-slate-400/80 hover:bg-slate-50/80 focus:bg-white"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-[10px] font-mono font-bold text-slate-550 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
                        <span>E-POSTA ADRESİ *</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ahmet@sirketiniz.com"
                        className="w-full border border-slate-200/80 rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all bg-slate-50/40 text-slate-800 font-semibold placeholder-slate-400/80 hover:bg-slate-50/80 focus:bg-white"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-company" className="text-[10px] font-mono font-bold text-slate-550 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
                        <span>ŞİRKET ADI</span>
                      </label>
                      <input
                        type="text"
                        id="contact-company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Şirket A.Ş."
                        className="w-full border border-slate-200/80 rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all bg-slate-50/40 text-slate-800 font-semibold placeholder-slate-400/80 hover:bg-slate-50/80 focus:bg-white"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-subject" className="text-[10px] font-mono font-bold text-slate-550 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
                        <span>KONU</span>
                      </label>
                      <input
                        type="text"
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Genel Bilgi, Fiyatlandırma, Demo"
                        className="w-full border border-slate-200/80 rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all bg-slate-50/40 text-slate-800 font-semibold placeholder-slate-400/80 hover:bg-slate-50/80 focus:bg-white"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-[10px] font-mono font-bold text-slate-550 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
                      <span>MESAJINIZ *</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Nasıl yardımcı olabiliriz? Sektörünüz ve entegrasyon hedefleriniz hakkında kısa bilgi verebilirsiniz."
                      className="w-full border border-slate-200/80 rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all bg-slate-50/40 text-slate-800 font-semibold resize-none leading-relaxed placeholder-slate-400/80 hover:bg-slate-50/80 focus:bg-white"
                      disabled={isLoading}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !formData.name || !formData.email || !formData.message}
                    className="w-full inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-650 text-white px-5 py-4 text-xs font-bold transition-all shadow-[0_4px_20px_rgba(14,165,233,0.2)] hover:shadow-[0_6px_25px_rgba(14,165,233,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:from-slate-100 disabled:to-slate-200 disabled:text-slate-405 disabled:shadow-none disabled:pointer-events-none"
                    id="contact-submit-btn"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>GÖNDERİLİYOR...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>MESAJ GÖNDER</span>
                      </>
                    )}
                  </button>

                </form>
              )}
            </AnimatePresence>

          </motion.div>

          {/* Right Column: Contact info & Radar Map */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col justify-between gap-6"
          >
            
            {/* Contact Details Card */}
            <div className="space-y-6 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.025)] relative overflow-hidden pt-8">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-550 to-indigo-600" />
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">// İLETİŞİM BİLGİLERİ</h3>
              
              <div className="space-y-5">
                
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-650 flex items-center justify-center shrink-0 border border-sky-100/50 shadow-2xs">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[9px] font-mono font-bold text-slate-450 uppercase tracking-wider">// GENEL MERKEZ</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                      Maslak Finans Merkezi, A Blok No: 42/8 Sarıyer, İstanbul / Türkiye
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-650 flex items-center justify-center shrink-0 border border-sky-100/50 shadow-2xs">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[9px] font-mono font-bold text-slate-450 uppercase tracking-wider">// E-POSTA</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">info@saasprecise.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-650 flex items-center justify-center shrink-0 border border-sky-100/50 shadow-2xs">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[9px] font-mono font-bold text-slate-450 uppercase tracking-wider">// TELEFON</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">+90 (212) 345 67 89</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Stylized Lively Radar Telemetry Map Mockup */}
            <div className="border border-slate-100 bg-white rounded-2xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.025)] flex-grow flex flex-col justify-between relative overflow-hidden pt-8" id="contact-map-card">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-550 to-indigo-600" />
              <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">// OFİS TELEMETRİSİ // LIVE</h4>
              
              <div className="relative h-48 w-full bg-[#050914] border border-slate-900 rounded-xl overflow-hidden flex flex-col justify-center items-center p-4">
                
                {/* CSS Radar Animation */}
                <style>{`
                  @keyframes radar-sweep {
                    0% { transform: scale(0.6); opacity: 0.8; }
                    100% { transform: scale(1.8); opacity: 0; }
                  }
                  .animate-radar {
                    animation: radar-sweep 3s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
                  }
                `}</style>

                {/* Radar target backdrop lines */}
                <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(rgba(14,165,233,0.5)_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
                
                <div className="absolute w-28 h-28 border border-sky-500/10 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 border border-sky-500/15 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 border border-sky-500/20 rounded-full" />
                  </div>
                </div>

                {/* Sweeping radar wave */}
                <div className="absolute w-28 h-28 border-2 border-sky-400/35 rounded-full animate-radar pointer-events-none" />
                <div className="absolute w-28 h-28 border-2 border-cyan-400/20 rounded-full animate-radar pointer-events-none" style={{ animationDelay: '1.5s' }} />

                {/* Office node pointer details */}
                <div className="relative z-10 space-y-2.5">
                  <div className="mx-auto h-9 w-9 bg-sky-500 text-white rounded-full flex items-center justify-center animate-bounce shadow-[0_0_15px_rgba(14,165,233,0.5)] border border-sky-400">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-white text-xs block tracking-wide">ConneXion-AI Maslak</span>
                    <span className="text-[9px] font-mono text-cyan-400 block font-bold tracking-wider">LAT: 41.1121 // LON: 29.0210</span>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
}
