import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDemoModal } from '../store/uiSlice.js';
import { X, CheckCircle, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DemoModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.demoModalOpen);
  const selectedService = useSelector((state) => state.ui.demoModalService);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    sector: 'Genel',
    notes: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Synchronize sector select with service requested in Redux
  useEffect(() => {
    if (selectedService) {
      if (selectedService.includes('Sağlık')) {
        setFormData(f => ({ ...f, sector: 'Sağlık', notes: `${selectedService} için detaylı demo talebi.` }));
      } else if (selectedService.includes('Hukuk')) {
        setFormData(f => ({ ...f, sector: 'Hukuk', notes: `${selectedService} için detaylı demo talebi.` }));
      } else if (selectedService.includes('Finans')) {
        setFormData(f => ({ ...f, sector: 'Finans', notes: `${selectedService} için detaylı demo talebi.` }));
      } else {
        setFormData(f => ({ ...f, sector: 'Genel', notes: `${selectedService} hakkında görüşme talebi.` }));
      }
    }
  }, [selectedService]);

  const handleClose = () => {
    dispatch(setDemoModal({ open: false }));
    setIsSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        sector: 'Genel',
        notes: ''
      });
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-gray-950/60 backdrop-blur-xs"
            id="modal-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.15 }}
            className="relative bg-white rounded shadow-2xl overflow-hidden border border-slate-200 w-full max-w-md"
            id="demo-modal-container"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-sky-400" />
                <h3 className="font-mono font-bold text-xs tracking-wider uppercase">// DEMO TALEBİ</h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                id="close-modal-btn"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              {isSuccess ? (
                <div className="text-center py-6 space-y-3" id="modal-success-screen">
                  <div className="mx-auto h-12 w-12 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center border border-sky-100">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Talebiniz Kaydedildi!</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Demo ve toplantı talebiniz başarıyla oluşturulmuştur. Teknik ekibimiz ve sektörel danışmanlarımız, kayıtlı kurumsal e-posta adresiniz üzerinden sizinle iletişime geçecektir.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-4 inline-flex items-center justify-center rounded bg-slate-900 text-white px-4 py-2 text-xs font-bold hover:bg-sky-500 transition-colors cursor-pointer"
                  >
                    KAPAT
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5" id="modal-form">
                  <div className="text-[11px] font-mono font-bold text-sky-800 bg-sky-50 p-2.5 rounded border border-sky-150 mb-1">
                    // TALEP EDİLEN HİZMET: <strong className="text-sky-950 font-sans">{selectedService || 'Genel Tanıtım'}</strong>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="modal-name" className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">// AD SOYAD *</label>
                    <input
                      type="text"
                      id="modal-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Adınız Soyadınız"
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 bg-slate-50/50"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="modal-email" className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">// KURUMSAL E-POSTA *</label>
                    <input
                      type="email"
                      id="modal-email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ad.soyad@sirket.com"
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 bg-slate-50/50"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="modal-company" className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">// ŞİRKET ADI</label>
                      <input
                        type="text"
                        id="modal-company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Şirket A.Ş."
                        className="w-full border border-slate-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 bg-slate-50/50"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="modal-sector" className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">// İLGİ ALANI</label>
                      <select
                        id="modal-sector"
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full border border-slate-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 bg-slate-50/50 cursor-pointer"
                        disabled={isLoading}
                      >
                        <option value="Genel">Genel Tanıtım</option>
                        <option value="Sağlık">Sağlık AI</option>
                        <option value="Hukuk">Hukuk AI</option>
                        <option value="Finans">Finans AI</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="modal-notes" className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">// ÖZEL NOTLAR</label>
                    <textarea
                      id="modal-notes"
                      rows={2.5}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Beklentileriniz veya eklemek istediğiniz detaylar..."
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 bg-slate-50/50 resize-none"
                      disabled={isLoading}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !formData.name || !formData.email}
                    className="w-full mt-3 inline-flex items-center justify-center space-x-2 rounded bg-slate-900 text-white hover:bg-sky-500 px-4 py-2.5 text-xs font-bold transition-all disabled:opacity-40 cursor-pointer"
                    id="modal-submit-btn"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>KAYDEDİLİYOR...</span>
                      </>
                    ) : (
                      <span>DEMO RANDEVUSU OLUŞTUR</span>
                    )}
                  </button>
                </form>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
