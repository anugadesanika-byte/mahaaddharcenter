// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { categories, servicesData } from '../data/data';

export default function Navbar({ activePage, setActivePage, onOpenServiceModal }) {
  const { lang, setLang, t } = useLanguage();
  const { user, isAdmin, isCustomer, logout } = useAuth();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const langRef = useRef(null);
  const megaRef = useRef(null);

  // Group services by category for mega-menu
  const servicesByCategory = categories.reduce((acc, cat) => {
    acc[cat] = servicesData.filter((s) => s.category === cat);
    return acc;
  }, {});

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setMegaMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (service) => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    onOpenServiceModal(service);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-t-4 border-primary" id="header">
      {/* Top Helpline & Portal Status Strip */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 hidden md:block border-b border-slate-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>
              <i className="fas fa-map-marker-alt text-primary mr-1"></i> Akurdi, PCMC, Pune – 411035
            </span>
            <span>·</span>
            <span>
              <i className="fas fa-clock text-secondary mr-1"></i> Mon–Sat: 10:00 AM – 8:00 PM
            </span>
            <span>·</span>
            <span>
              <i className="fas fa-phone-alt text-primary mr-1"></i> Helpline:{' '}
              <a href="tel:+917620346620" className="text-white hover:underline font-semibold">+91 7620346620</a>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Aaple Sarkar & UIDAI Portal Active
            </span>
            <span>·</span>
            <button
              onClick={() => handleNavClick(isAdmin ? 'admin' : 'auth')}
              className="hover:text-white transition font-medium flex items-center gap-1"
            >
              <i className="fas fa-user-shield text-primary"></i>
              <span>Staff / Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center relative">
        {/* Brand Logo & Name */}
        <div
          className="flex items-center gap-3.5 cursor-pointer py-1"
          onClick={() => handleNavClick('home')}
        >
          <img
            src="images/logo.jpeg"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/120x120?text=logo';
            }}
            alt="Arya Enterprises Logo"
            className="h-16 md:h-20 w-auto object-contain transition-transform hover:scale-105"
          />
          <div>
            <h1 className="text-xl md:text-3xl font-extrabold leading-none text-3d-tri tracking-wide">
              {t('siteTitle')}
            </h1>
            <p className="text-[11px] md:text-xs text-secondary font-bold tracking-wider mt-1">
              {t('siteSubtitle')}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 font-medium h-full text-chakra text-sm">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition py-4 focus:outline-none border-b-2 hover:text-primary hover:border-primary ${
              activePage === 'home' ? 'text-primary border-primary font-bold' : 'border-transparent'
            }`}
          >
            {t('navHome')}
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`transition py-4 focus:outline-none border-b-2 hover:text-primary hover:border-primary ${
              activePage === 'about' ? 'text-primary border-primary font-bold' : 'border-transparent'
            }`}
          >
            {t('navAbout')}
          </button>

          {/* Mega Menu Trigger */}
          <div
            className="group py-4"
            ref={megaRef}
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            <button
              onClick={() => handleNavClick('services')}
              className={`transition flex items-center gap-1 focus:outline-none cursor-pointer border-b-2 hover:text-primary hover:border-primary ${
                activePage === 'services' ? 'text-primary border-primary font-bold' : 'border-transparent'
              }`}
            >
              <span>{t('navServices')}</span>
              <i className="fas fa-chevron-down text-xs ml-1"></i>
            </button>

            {/* Mega Menu Dropdown */}
            <div
              className={`mega-menu absolute left-0 top-full w-full bg-white shadow-xl rounded-b-xl border-t-4 border-secondary p-8 transition-all duration-200 z-50 ${
                megaMenuOpen
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map((cat) => (
                  <div key={cat} className="space-y-2">
                    <h5 className="font-bold text-primary mb-3 border-b border-gray-100 pb-2 text-xs uppercase tracking-wide">
                      {cat}
                    </h5>
                    <ul className="space-y-2 text-xs text-gray-600">
                      {(servicesByCategory[cat] || []).slice(0, 6).map((s) => (
                        <li key={s.id}>
                          <button
                            onClick={() => handleServiceClick(s)}
                            className="hover:text-secondary block truncate font-medium cursor-pointer transition text-left w-full hover:underline"
                            title={s.title[lang] || s.title.en}
                          >
                            {s.title[lang] || s.title.en}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center bg-gray-50 -mx-8 -mb-8 p-4 rounded-b-xl">
                <span className="text-xs text-gray-500 font-medium">
                  Over 30+ Official Maharashtra Government & Legal Services
                </span>
                <button
                  onClick={() => handleNavClick('services')}
                  className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition"
                >
                  View Complete Service Catalog →
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleNavClick('gallery')}
            className={`transition py-4 focus:outline-none border-b-2 hover:text-primary hover:border-primary ${
              activePage === 'gallery' ? 'text-primary border-primary font-bold' : 'border-transparent'
            }`}
          >
            {t('navGallery')}
          </button>

          <button
            onClick={() => handleNavClick('blog')}
            className={`transition py-4 focus:outline-none border-b-2 hover:text-primary hover:border-primary ${
              activePage === 'blog' ? 'text-primary border-primary font-bold' : 'border-transparent'
            }`}
          >
            {t('navBlog')}
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`transition py-4 focus:outline-none border-b-2 hover:text-primary hover:border-primary ${
              activePage === 'contact' ? 'text-primary border-primary font-bold' : 'border-transparent'
            }`}
          >
            {t('navContact')}
          </button>
        </nav>

        {/* Right Side Actions: Language + Auth State */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 text-xs font-bold text-chakra hover:text-primary transition border border-gray-200 px-2.5 py-1.5 rounded-full hover:border-primary focus:outline-none"
              aria-label="Change Language"
            >
              <i className="fas fa-globe text-primary"></i>
              <span>{lang.toUpperCase()}</span>
              <i className="fas fa-caret-down text-[10px]"></i>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border overflow-hidden z-50 animate-fade-in text-xs font-medium">
                <button
                  onClick={() => {
                    setLang('en');
                    setLangMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-light hover:text-primary transition ${
                    lang === 'en' ? 'font-bold text-primary bg-light' : ''
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    setLang('mr');
                    setLangMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-light hover:text-primary transition ${
                    lang === 'mr' ? 'font-bold text-primary bg-light' : ''
                  }`}
                >
                  मराठी
                </button>
                <button
                  onClick={() => {
                    setLang('hi');
                    setLangMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-light hover:text-primary transition ${
                    lang === 'hi' ? 'font-bold text-primary bg-light' : ''
                  }`}
                >
                  हिंदी
                </button>
              </div>
            )}
          </div>

          {/* User Auth Buttons / Portals */}
          {isAdmin ? (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => handleNavClick('analytics')}
                className="bg-primary hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow flex items-center gap-1.5 transition"
              >
                <i className="fas fa-chart-pie"></i>
                <span>{t('navAnalytics')}</span>
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="bg-chakra hover:bg-blue-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow flex items-center gap-1.5 transition"
              >
                <i className="fas fa-tasks text-emerald-400"></i>
                <span>{t('navRequestMenu')}</span>
              </button>
            </div>
          ) : isCustomer ? (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => handleNavClick('portal')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow flex items-center gap-1.5 transition"
              >
                <i className="fas fa-user-check"></i>
                <span>{t('navCitizenPortal')}</span>
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => handleNavClick('auth')}
                className="bg-primary hover:bg-orange-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow flex items-center gap-1.5 transition"
              >
                <i className="fas fa-user-circle"></i>
                <span>{t('navSignIn')}</span>
              </button>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-xl text-chakra p-1 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t p-4 flex flex-col gap-2 shadow-lg border-b-4 border-secondary max-h-[85vh] overflow-y-auto animate-fade-in text-sm font-semibold">
          {/* Mobile User Status Strip */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-2 flex items-center justify-between">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-chakra text-white flex items-center justify-center font-bold text-xs">
                  {user.name[0]}
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-800">{user.name}</div>
                  <div className="text-[10px] text-slate-500 capitalize">{user.role} Account</div>
                </div>
              </div>
            ) : (
              <span className="text-xs text-slate-600">Citizen Services Portal</span>
            )}

            {user ? (
              <button
                onClick={logout}
                className="text-xs text-red-600 font-bold hover:underline"
              >
                {t('btnLogout')}
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('auth')}
                className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-lg"
              >
                {t('navSignIn')}
              </button>
            )}
          </div>

          {/* Admin / Portal quick links on mobile */}
          {isAdmin && (
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                onClick={() => handleNavClick('analytics')}
                className="text-center py-2.5 px-3 rounded-lg font-bold bg-primary text-white text-xs"
              >
                <i className="fas fa-chart-pie mr-1"></i> {t('navAnalytics')}
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="text-center py-2.5 px-3 rounded-lg font-bold bg-chakra text-white text-xs"
              >
                <i className="fas fa-tasks mr-1 text-emerald-400"></i> {t('navRequestMenu')}
              </button>
            </div>
          )}

          {isCustomer && (
            <button
              onClick={() => handleNavClick('portal')}
              className="text-left w-full py-2.5 px-3 rounded-lg font-bold bg-emerald-600 text-white mb-1"
            >
              <i className="fas fa-clipboard-list mr-2"></i> {t('tabMyRequests')}
            </button>
          )}

          <button
            onClick={() => handleNavClick('home')}
            className={`text-left w-full py-2.5 px-2 border-b border-gray-100 ${
              activePage === 'home' ? 'text-primary' : 'text-chakra'
            }`}
          >
            {t('navHome')}
          </button>

          {/* Mobile Services Accordion */}
          <div className="border-b border-gray-100">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex justify-between items-center w-full py-2.5 px-2 text-chakra"
            >
              <span>{t('navServices')}</span>
              <i
                className={`fas fa-chevron-down text-xs transition-transform ${
                  mobileServicesOpen ? 'rotate-180 text-primary' : ''
                }`}
              ></i>
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 pb-3 space-y-2 bg-slate-50 rounded-lg mb-2 pt-2 animate-fade-in text-xs font-medium">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleNavClick('services')}
                    className="block w-full text-left py-1 text-slate-700 hover:text-primary pl-2"
                  >
                    {cat}
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick('services')}
                  className="block w-full text-left py-1 text-xs font-bold text-primary pl-2"
                >
                  View All Services →
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('gallery')}
            className={`text-left w-full py-2.5 px-2 border-b border-gray-100 ${
              activePage === 'gallery' ? 'text-primary' : 'text-chakra'
            }`}
          >
            {t('navGallery')}
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`text-left w-full py-2.5 px-2 border-b border-gray-100 ${
              activePage === 'about' ? 'text-primary' : 'text-chakra'
            }`}
          >
            {t('navAbout')}
          </button>

          <button
            onClick={() => handleNavClick('blog')}
            className={`text-left w-full py-2.5 px-2 border-b border-gray-100 ${
              activePage === 'blog' ? 'text-primary' : 'text-chakra'
            }`}
          >
            {t('navBlog')}
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`text-left w-full py-2.5 px-2 ${
              activePage === 'contact' ? 'text-primary' : 'text-chakra'
            }`}
          >
            {t('navContact')}
          </button>
        </div>
      )}
    </header>
  );
}
