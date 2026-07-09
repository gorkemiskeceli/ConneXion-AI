import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActivePage, setFloatingChatOpen } from '../store/uiSlice.js';
import { 
  setLoginModalOpen, 
  setRegisterModalOpen, 
  logoutUser 
} from '../store/authSlice.js';
import { Sparkles, Menu, X, Play, LogOut, ChevronDown, User as UserIcon } from 'lucide-react';

import Logo from '../../components/Logo';

export default function Header() {
  const dispatch = useDispatch();
  const activePage = useSelector((state) => state.ui.activePage);
  const user = useSelector((state) => state.auth.user);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);

  const navItems = [
    { label: 'Ana Sayfa', page: 'home' },
    { label: 'Yetenekler', page: 'features' },
    { label: 'Sektörler', page: 'services' },
    { label: 'Fiyatlandırma', page: 'pricing' },
    { label: 'İletişim', page: 'contact' },
  ];

  const handleNavClick = (page) => {
    dispatch(setActivePage(page));
    if (page === 'playground') {
      dispatch(setFloatingChatOpen(true));
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-[#1e293b] text-white flex items-center justify-between border-b border-slate-800 shadow-md">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Connection Info */}
        <div className="flex items-center space-x-4">
          <div 
            onClick={() => handleNavClick('home')}
            className="flex cursor-pointer items-center space-x-2.5"
            id="brand-logo-container"
          >
            <Logo className="h-7 w-auto" />
            <span className="font-sans text-base font-semibold tracking-tight text-white">
              ConneXion-AI<span className="text-sky-400 font-mono text-xs ml-1.5">v1.0.0</span>
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium h-full items-center">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`transition-colors duration-200 h-full px-1 flex items-center border-b-2 text-xs font-semibold ${
                activePage === item.page
                  ? 'border-sky-500 text-sky-400'
                  : 'border-transparent text-slate-300 hover:text-white hover:border-slate-600'
              }`}
              id={`nav-item-${item.page}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center space-x-3.5">
          <button
            onClick={() => handleNavClick('playground')}
            className={`flex items-center space-x-1.5 rounded px-2.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              activePage === 'playground'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'bg-sky-600 text-white hover:bg-sky-500 shadow-xs'
            }`}
            id="nav-cta-test-drive"
          >
            <Play className="h-3 w-3 fill-current text-white" />
            <span>Test Sürüşü</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-700/80" />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded hover:bg-slate-800 text-xs font-mono font-bold text-sky-400 transition-colors cursor-pointer"
                id="header-user-menu"
              >
                <span>{user.name.toUpperCase()}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)} />
                  <div className="absolute right-0 mt-1.5 w-48 rounded bg-slate-800 border border-slate-700 shadow-lg py-1 z-50 text-xs text-slate-300 font-mono" id="user-dropdown-menu">
                    <div className="px-3 py-2 border-b border-slate-700 text-slate-400 font-sans break-all">
                      <div className="font-semibold text-slate-200 text-[11px] truncate">{user.name}</div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">{user.email}</div>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-700/50 hover:text-sky-400 flex items-center space-x-2 transition-colors font-bold text-[10px] cursor-pointer"
                      id="header-dashboard-btn"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                      <span>// YÖNETİM PANELİ</span>
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(logoutUser());
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-700/50 hover:text-red-400 flex items-center space-x-2 transition-colors font-bold text-[10px] cursor-pointer"
                      id="header-logout-btn"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>// ÇIKIŞ YAP</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              <button
                onClick={() => dispatch(setLoginModalOpen(true))}
                className="bg-gradient-to-r from-sky-500 to-indigo-650 hover:from-sky-400 hover:to-indigo-550 text-white rounded px-4 py-1.5 text-xs font-mono font-bold transition-all shadow-md hover:shadow-sky-550/20 hover:scale-[1.02] cursor-pointer"
                id="header-login-btn"
              >
                GİRİŞ YAP / KAYIT OL
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded p-1 text-slate-300 hover:bg-slate-800 hover:text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full md:hidden border-b border-slate-800 bg-[#1e293b] px-4 pt-2 pb-4 space-y-1 shadow-lg transition-all" id="mobile-navigation-panel">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`block w-full text-left rounded px-3 py-2 text-xs font-bold transition-colors ${
                activePage === item.page
                  ? 'bg-slate-800 text-sky-400'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
              id={`mobile-nav-item-${item.page}`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800 mt-2 space-y-2">
            <button
              onClick={() => handleNavClick('playground')}
              className="flex w-full items-center justify-center space-x-1.5 rounded bg-sky-600 px-4 py-2 text-center text-xs font-bold text-white shadow-xs hover:bg-sky-500 cursor-pointer"
              id="mobile-nav-cta-test-drive"
            >
              <Play className="h-3 w-3 fill-current text-white" />
              <span>Test Sürüşü</span>
            </button>

            {user ? (
              <div className="p-2.5 bg-slate-800/60 rounded border border-slate-700/80 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <UserIcon className="h-3.5 w-3.5 text-sky-400" />
                  <span className="text-slate-200 font-bold truncate">{user.name}</span>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 rounded border border-sky-900/60 bg-sky-950/20 px-4 py-1.5 text-center text-[10px] font-mono font-bold text-sky-400 hover:bg-sky-950/40 cursor-pointer"
                  id="mobile-dashboard-btn"
                >
                  <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                  <span>// YÖNETİM PANELİ</span>
                </Link>
                <button
                  onClick={() => {
                    dispatch(logoutUser());
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 rounded border border-red-900/60 bg-red-950/20 px-4 py-1.5 text-center text-[10px] font-mono font-bold text-red-400 hover:bg-red-950/40 cursor-pointer"
                  id="mobile-logout-btn"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>// ÇIKIŞ YAP</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  dispatch(setLoginModalOpen(true));
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center rounded bg-gradient-to-r from-sky-500 to-indigo-600 py-2.5 text-center text-xs font-mono font-bold text-white hover:opacity-95 shadow-md cursor-pointer"
                id="mobile-login-btn"
              >
                GİRİŞ YAP / KAYIT OL
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
