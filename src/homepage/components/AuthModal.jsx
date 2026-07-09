import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  setLoginModalOpen, 
  setRegisterModalOpen, 
  loginUser, 
  registerUser, 
  clearAuthError 
} from '../store/authSlice.js';
import { X, CheckCircle, Loader2, Sparkles, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AuthModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginOpen = useSelector((state) => state.auth.loginModalOpen);
  const registerOpen = useSelector((state) => state.auth.registerModalOpen);
  const authError = useSelector((state) => state.auth.authError);
  const currentUser = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Clear errors and form when modals open/close
  useEffect(() => {
    dispatch(clearAuthError());
    setFormData({ name: '', email: '', password: '' });
    setIsSuccess(false);
    setIsLoading(false);
    setIsLoggingIn(false);
  }, [loginOpen, registerOpen, dispatch]);

  const handleClose = () => {
    dispatch(setLoginModalOpen(false));
    dispatch(setRegisterModalOpen(false));
  };

  // Redirect to dashboard on successful login/registration
  useEffect(() => {
    if (currentUser && isLoggingIn) {
      navigate('/dashboard');
      handleClose();
      setIsLoggingIn(false);
    }
  }, [currentUser, isLoggingIn, navigate]);

  useEffect(() => {
    if (authError) {
      setIsLoggingIn(false);
    }
  }, [authError]);

  const handleToggleMode = () => {
    if (loginOpen) {
      dispatch(setRegisterModalOpen(true));
    } else {
      dispatch(setLoginModalOpen(true));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(clearAuthError());
    setIsLoggingIn(true);

    // Simulate small latency for premium feels
    setTimeout(() => {
      if (loginOpen) {
        dispatch(loginUser({ email: formData.email, password: formData.password }));
      } else {
        dispatch(registerUser({ name: formData.name, email: formData.email, password: formData.password }));
      }
      setIsLoading(false);
    }, 600);
  };

  const isOpen = loginOpen || registerOpen;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" id="auth-modal-wrapper">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-gray-950/60 backdrop-blur-xs"
            id="auth-modal-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.15 }}
            className="relative bg-white rounded shadow-2xl overflow-hidden border border-slate-200 w-full max-w-sm z-10"
            id="auth-modal-container"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-sky-400" />
                <h3 className="font-mono font-bold text-xs tracking-wider uppercase">
                  {loginOpen ? '// GİRİŞ YAP' : '// KAYIT OL'}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                id="close-auth-modal-btn"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5">
              
              {/* Error Notification */}
              {authError && (
                <div className="mb-4 p-2.5 bg-red-50 border border-red-150 rounded text-red-800 text-[11px] flex items-start space-x-2 font-mono">
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>[HATA] {authError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5" id="auth-form">
                
                {registerOpen && (
                  <div className="space-y-1">
                    <label htmlFor="auth-name" className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">// AD SOYAD *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                        <User className="h-3.5 w-3.5" />
                      </div>
                      <input
                        type="text"
                        id="auth-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Adınız Soyadınız"
                        className="w-full border border-slate-200 rounded pl-8 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 bg-slate-50/50"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label htmlFor="auth-email" className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">// KURUMSAL E-POSTA *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <input
                      type="email"
                      id="auth-email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ad.soyad@sirket.com"
                      className="w-full border border-slate-200 rounded pl-8 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 bg-slate-50/50"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="auth-password" className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">// ŞİFRE *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="h-3.5 w-3.5" />
                    </div>
                    <input
                      type="password"
                      id="auth-password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full border border-slate-200 rounded pl-8 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 bg-slate-50/50"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {loginOpen && (
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 hover:text-sky-500 transition-colors cursor-not-allowed">
                      // ŞİFREMİ UNUTTUM
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !formData.email || !formData.password || (registerOpen && !formData.name)}
                  className="w-full mt-3 inline-flex items-center justify-center space-x-2 rounded bg-slate-900 text-white hover:bg-sky-500 px-4 py-2.5 text-xs font-bold transition-all disabled:opacity-40 cursor-pointer"
                  id="auth-submit-btn"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>{loginOpen ? 'GİRİŞ YAPILIYOR...' : 'KAYDEDİLİYOR...'}</span>
                    </>
                  ) : (
                    <span>{loginOpen ? 'GİRİŞ YAP' : 'KAYIT OL'}</span>
                  )}
                </button>
              </form>

              {/* Toggle Switch */}
              <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={handleToggleMode}
                  className="text-[11px] font-mono font-bold text-sky-600 hover:text-sky-700 transition-colors cursor-pointer"
                  id="toggle-auth-mode-btn"
                >
                  {loginOpen 
                    ? '// HESABINIZ YOK MU? YENİ HESAP OLUŞTURUN' 
                    : '// ZATEN ÜYE MİSİNİZ? GİRİŞ YAPIN'
                  }
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
