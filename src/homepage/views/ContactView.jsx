import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, HelpCircle } from 'lucide-react';

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
    <div className="bg-[#f0f2f5] min-h-screen py-8 sm:py-12" id="contact-view-container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center space-x-1 rounded bg-sky-50 px-2 py-0.5 text-[11px] font-mono font-bold text-sky-800 border border-sky-150">// BİZİMLE İLETİŞİME GEÇİN</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2.5">
            Sizinle Tanışmak İçin Sabırsızlanıyoruz
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Platform entegrasyonu, kurumsal fiyat planları veya özel sunucu kurulumları hakkında bilgi almak için formu doldurabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded p-5 shadow-2xs">
            
            {isSuccess ? (
              <div className="text-center py-8 space-y-4" id="contact-success-notification">
                <div className="mx-auto h-12 w-12 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center border border-sky-100">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Mesajınız Başarıyla İletildi!</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  ConneXion-AI destek ekibine ulaştınız. Sorunuza veya demo talebinize kurumsal e-posta adresiniz üzerinden 2 saat içinde yanıt vereceğiz.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-sky-600 hover:text-sky-700 pt-2"
                >
                  <span>Yeni bir mesaj gönder</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">// AD SOYAD *</label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ahmet Yılmaz"
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 bg-slate-50/50"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">// KURUMSAL E-POSTA *</label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ahmet@sirketiniz.com"
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 bg-slate-50/50"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-company" className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">// ŞİRKET ADI</label>
                    <input
                      type="text"
                      id="contact-company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Şirket A.Ş."
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 bg-slate-50/50"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="contact-subject" className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">// KONU</label>
                    <input
                      type="text"
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Genel Bilgi, Fiyatlandırma, Demo vb."
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 bg-slate-50/50"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-message" className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">// MESAJINIZ *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Nasıl yardımcı olabiliriz? Sektörünüz ve entegrasyon hedefleriniz hakkında kısa bilgi verebilirsiniz."
                    className="w-full border border-slate-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 bg-slate-50/50 resize-none"
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !formData.name || !formData.email || !formData.message}
                  className="w-full inline-flex items-center justify-center space-x-2 rounded bg-slate-900 text-white hover:bg-sky-500 px-4 py-2.5 text-xs font-bold transition-all shadow-2xs disabled:opacity-40"
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

          </div>

          {/* Right Column: Address, Contact Info, Map */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">// İLETİŞİM BİLGİLERİ</h3>
              
              <div className="space-y-4">
                
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5 border border-sky-100">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-slate-900 uppercase tracking-wider">// GENEL MERKEZ</h4>
                    <p className="text-xs text-slate-500 leading-normal mt-0.5">
                      Maslak Finans Merkezi, A Blok No: 42/8 Sarıyer, İstanbul / Türkiye
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5 border border-sky-100">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-slate-900 uppercase tracking-wider">// E-POSTA</h4>
                    <p className="text-xs text-slate-500 leading-normal mt-0.5">info@aichatbot.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5 border border-sky-100">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-slate-900 uppercase tracking-wider">// TELEFON</h4>
                    <p className="text-xs text-slate-500 leading-normal mt-0.5">+90 (212) 345 67 89</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Stylized Visual Map overlay (Ofis Ofis Ziyareti) */}
            <div className="border border-slate-200 bg-white rounded p-3.5 shadow-2xs" id="contact-map-card">
              <h4 className="text-[10px] font-mono font-bold text-slate-900 uppercase tracking-wider mb-2">// OFİS KONUMUMUZ</h4>
              <div className="relative h-40 w-full bg-sky-50 border border-sky-100 rounded overflow-hidden flex flex-col justify-center items-center text-center p-3">
                
                {/* Decorative Map Pattern Grid overlay */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:12px_12px]" />
                
                <div className="relative z-10 space-y-1.5">
                  <div className="mx-auto h-7 w-7 bg-sky-500 text-white rounded-full flex items-center justify-center animate-bounce shadow-xs border border-sky-400">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-bold text-slate-900 text-xs block">ConneXion-AI Maslak Ofisi</span>
                  <span className="text-[10px] text-slate-400 block leading-tight">İstanbul Metro Maslak Durağına 2 Dk Yürüme Mesafesinde</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
