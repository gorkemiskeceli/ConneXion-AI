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
import { X, CheckCircle, Loader2, Sparkles, Mail, Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AuthModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginOpen = useSelector((state) => state.auth.loginModalOpen);
  const registerOpen = useSelector((state) => state.auth.registerModalOpen);
  const authError = useSelector((state) => state.auth.authError);
  const currentUser = useSelector((state) => state.auth.user);

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register' | 'forgot_password'
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Forgot password form state
  const [forgotEmail, setForgotEmail] = useState('');
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [isForgotSubmitted, setIsForgotSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Sync tab with Redux triggers
  useEffect(() => {
    if (loginOpen) {
      setActiveTab('login');
    } else if (registerOpen) {
      setActiveTab('register');
    }
  }, [loginOpen, registerOpen]);

  // Clear errors and form when modal state changes
  useEffect(() => {
    dispatch(clearAuthError());
    setFormData({ name: '', email: '', password: '' });
    setForgotEmail('');
    setIsForgotSubmitted(false);
    setIsForgotLoading(false);
    setIsLoading(false);
    setIsLoggingIn(false);
  }, [loginOpen, registerOpen, activeTab, dispatch]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(clearAuthError());
    setIsLoggingIn(true);

    // Simulate small latency for premium feels
    setTimeout(() => {
      if (activeTab === 'login') {
        dispatch(loginUser({ email: formData.email, password: formData.password }));
      } else {
        dispatch(registerUser({ name: formData.name, email: formData.email, password: formData.password }));
      }
      setIsLoading(false);
    }, 600);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    setIsForgotLoading(true);
    dispatch(clearAuthError());
    
    // Simulate API request delay
    setTimeout(() => {
      setIsForgotLoading(false);
      setIsForgotSubmitted(true);
    }, 800);
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
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
            id="auth-modal-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden w-full max-w-md z-10"
            id="auth-modal-container"
          >
            {/* Ambient Top Glow */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-60" />

            {/* Header */}
            <div className="px-6 pt-6 pb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4.5 w-4.5 text-sky-400" />
                <span className="font-mono text-xs font-bold text-slate-300 tracking-wider uppercase">
                  ConneXion-AI v1.0.0
                </span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-slate-500 hover:text-slate-200 transition-colors p-1.5 hover:bg-slate-800/50 rounded-lg cursor-pointer"
                id="close-auth-modal-btn"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="px-6 pb-8">
              
              {/* Modern Segmented Control Tab Switcher */}
              {activeTab !== 'forgot_password' && (
                <div className="flex p-1 bg-slate-950/50 rounded-xl border border-slate-800/80 mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('login');
                      dispatch(clearAuthError());
                    }}
                    className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                      activeTab === 'login'
                        ? 'bg-slate-800 text-sky-400 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    // GİRİŞ YAP
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('register');
                      dispatch(clearAuthError());
                    }}
                    className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                      activeTab === 'register'
                        ? 'bg-slate-800 text-sky-400 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    // KAYIT OL
                  </button>
                </div>
              )}

              {/* Error Notification */}
              {authError && (
                <div className="mb-4 p-3 bg-red-950/30 border border-red-500/20 rounded-xl text-red-300 text-[11px] flex items-start space-x-2 font-mono shadow-md shadow-red-950/20">
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <span>[HATA] {authError}</span>
                </div>
              )}

              {/* FORGOT PASSWORD FORM */}
              {activeTab === 'forgot_password' ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="inline-flex items-center text-[10px] font-mono font-bold text-slate-400 hover:text-sky-400 mb-6 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-3 w-3 mr-1.5" /> // GİRİŞ EKRANINA DÖN
                  </button>

                  {!isForgotSubmitted ? (
                    <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-slate-100 font-sans">Şifrenizi mi Unuttunuz?</h4>
                        <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                          ConneXion-AI hesabınızla ilişkili e-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <label htmlFor="forgot-email" className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">// KURUMSAL E-POSTA *</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-sky-400 transition-colors">
                            <Mail className="h-4 w-4" />
                          </div>
                          <input
                            type="email"
                            id="forgot-email"
                            required
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="ad.soyad@sirket.com"
                            className="w-full border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-950/40 transition-all font-sans"
                            disabled={isForgotLoading}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isForgotLoading || !forgotEmail}
                        className="w-full mt-4 inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-650 text-white hover:from-sky-400 hover:to-indigo-550 py-2.5 text-xs font-bold transition-all shadow-lg hover:shadow-sky-500/20 hover:scale-[1.01] disabled:opacity-40 disabled:scale-100 cursor-pointer"
                      >
                        {isForgotLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin text-white" />
                            <span>GÖNDERİLİYOR...</span>
                          </>
                        ) : (
                          <span>ŞİFRE SIFIRLAMA BAĞLANTISI GÖNDER</span>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-6 space-y-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-slate-100 font-sans">E-posta Gönderildi!</h4>
                        <p className="text-[11px] text-slate-400 font-sans leading-relaxed px-4">
                          Şifre sıfırlama talimatları <span className="text-slate-200 font-mono font-bold">{forgotEmail}</span> adresine gönderildi.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('login');
                          setIsForgotSubmitted(false);
                          setForgotEmail('');
                        }}
                        className="mt-6 w-full inline-flex items-center justify-center rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white py-2.5 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Giriş Ekranına Dön
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* LOGIN & SIGN UP FORMS */
                <form onSubmit={handleSubmit} className="space-y-4.5" id="auth-form">
                  
                  {activeTab === 'register' && (
                    <div className="space-y-1.5">
                      <label htmlFor="auth-name" className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">// AD SOYAD *</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-sky-400 transition-colors">
                          <User className="h-4 w-4" />
                        </div>
                        <input
                          type="text"
                          id="auth-name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Adınız Soyadınız"
                          className="w-full border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-950/40 transition-all font-sans"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label htmlFor="auth-email" className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">// KURUMSAL E-POSTA *</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-sky-400 transition-colors">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        id="auth-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ad.soyad@sirket.com"
                        className="w-full border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-950/40 transition-all font-sans"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="auth-password" className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">// ŞİFRE *</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-sky-400 transition-colors">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        type="password"
                        id="auth-password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-950/40 transition-all font-sans"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {activeTab === 'login' && (
                    <div className="text-right pt-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('forgot_password');
                          dispatch(clearAuthError());
                        }}
                        className="text-[10px] font-mono font-bold text-slate-500 hover:text-sky-400 transition-colors cursor-pointer"
                      >
                        // ŞİFREMİ UNUTTUM?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || !formData.email || !formData.password || (activeTab === 'register' && !formData.name)}
                    className="w-full mt-4 inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-650 text-white hover:from-sky-400 hover:to-indigo-550 py-2.5 text-xs font-bold transition-all shadow-lg hover:shadow-sky-500/20 hover:scale-[1.01] disabled:opacity-40 disabled:scale-100 cursor-pointer"
                    id="auth-submit-btn"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>{activeTab === 'login' ? 'GİRİŞ YAPILIYOR...' : 'KAYDEDİLİYOR...'}</span>
                      </>
                    ) : (
                      <span>{activeTab === 'login' ? 'GİRİŞ YAP' : 'KAYIT OL'}</span>
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
