import React from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage, setFloatingChatOpen } from '../store/uiSlice.js';
import { Sparkles, Linkedin, Twitter, Github, Mail, ShieldCheck } from 'lucide-react';
import Logo from '../../components/Logo';

export default function Footer() {
  const dispatch = useDispatch();

  const handleNavClick = (page) => {
    dispatch(setActivePage(page));
    if (page === 'playground') {
      dispatch(setFloatingChatOpen(true));
    }
  };

  return (
    <footer className="bg-[#1e293b] border-t border-slate-800 text-slate-300 py-10" id="site-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
          
          {/* Logo and Pitch */}
          <div className="md:col-span-1 space-y-4">
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2 text-base font-bold tracking-tight text-white cursor-pointer"
              id="footer-logo"
            >
              <Logo className="h-6 w-auto" />
              <span>ConneXion-<span className="text-sky-400 font-extrabold">AI</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              En karmaşık ve düzenlemeye tabi sektörel süreçleri, %99.4 doğruluk oranına sahip yapay zeka entegrasyonuyla otomatikleştirin.
            </p>
            <div className="flex items-center space-x-2 text-[10px] bg-slate-800/80 border border-slate-700 rounded-md p-2 w-max text-sky-400 font-mono font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>SOC 2 TYPE II & HIPAA UYUMU</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-3.5 font-mono">
              // Platform
            </h3>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-sky-400 transition-colors text-slate-400">
                  Ana Sayfa
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('features')} className="hover:text-sky-400 transition-colors text-slate-400">
                  Yetenekler
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-sky-400 transition-colors text-slate-400">
                  Sektörel Çözümler
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('pricing')} className="hover:text-sky-400 transition-colors text-slate-400">
                  Fiyatlandırma
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-3.5 font-mono">
              // Destek & Test
            </h3>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => handleNavClick('playground')} className="hover:text-sky-400 transition-colors text-sky-400 font-semibold">
                  Test Sürüşü (Playground)
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-sky-400 transition-colors text-slate-400">
                  İletişim & Destek
                </button>
              </li>
              <li>
                <a href="#doc" className="hover:text-sky-400 transition-colors text-slate-400 cursor-not-allowed">
                  API Dokümantasyonu
                </a>
              </li>
              <li>
                <a href="#status" className="hover:text-sky-400 transition-colors text-slate-400 cursor-not-allowed">
                  Sistem Durumu (99.98%)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-3.5 font-mono">
              // Genel Merkez
            </h3>
            <p className="text-slate-400 leading-relaxed text-[11px] mb-3">
              Maslak Finans Merkezi, A Blok No: 42/8<br />
              Sarıyer / İstanbul<br />
              <span className="flex items-center mt-2 font-mono">
                <Mail className="h-3.5 w-3.5 mr-1.5 text-sky-400" /> info@aichatbot.com
              </span>
            </p>
            <div className="flex space-x-2.5">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-sky-400">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-sky-400">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-sky-400">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-500 mb-6">
          <p>© {new Date().getFullYear()} ConneXion-AI Inc. Tüm hakları saklıdır.</p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <a href="#privacy" className="hover:text-slate-300 transition-colors cursor-not-allowed">Gizlilik Politikası</a>
            <a href="#terms" className="hover:text-slate-300 transition-colors cursor-not-allowed">Kullanım Şartları</a>
            <a href="#cookies" className="hover:text-slate-300 transition-colors cursor-not-allowed">Çerez Tercihleri</a>
          </div>
        </div>

        {/* Telemetry Status Bar (High Density Aesthetic) */}
        <div className="border-t border-slate-800/80 pt-4 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-wider">
          <div className="flex flex-wrap items-center gap-4">
            <span>MODEL LATENCY: &lt;250ms</span>
            <span>SYSTEM SLOTS: 48 ACTIVE</span>
            <span>SECURITY PIPELINE: SOC-2 ENFORCED</span>
            <span>API RE-RENDERS: OPTIMAL</span>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>WATCHING PRECISION PORT: 3000</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
