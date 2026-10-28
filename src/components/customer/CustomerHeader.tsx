import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  User,
  Heart,
  Smartphone,
  Percent,
  Calculator,
  Wrench,
  Languages,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomerHeader: React.FC = () => {
  const {
    currentPath,
    navigateTo,
    customerUser,
    isCustomerLoggedIn,
    setShowCustomerAuthModal,
    language,
    setLanguage,
    t,
    wishlist,
    settings,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t('Home', 'होम'), path: '/' },
    { label: t('Phones', 'स्मार्टफोन'), path: '/phones' },
    { label: t('Accessories', 'एक्सेसरीज़'), path: '/accessories' },
    { label: t('Offers', 'ऑफ़र्स'), path: '/offers' },
    { label: t('EMI Calculator', 'ईएमआई कैलकुलेटर'), path: '/emi-calculator' },
    { label: t('Repairs', 'रिपेयर सेवा'), path: '/repair-enquiry' },
    { label: t('Contact', 'संपर्क'), path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-rose-600 via-amber-600 to-rose-700 text-white py-1 px-4 text-xs font-medium text-center flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2 mx-auto">
          <span className="bg-amber-300 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase">
            Surat Special
          </span>
          <span>
            {t(
              '0% Down Payment EMI available on Bajaj Finserv & IDFC FIRST Bank at Godadara Shop!',
              'गोडादरा शॉप पर बजाज फिनसर्व और IDFC बैंक पर 0% डाउन पेमेंट EMI उपलब्ध!'
            )}
          </span>
        </div>
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <span className="sm:hidden text-[11px] truncate font-semibold">
            {t('Maa Lakshmi Mobile • Nilgiri, Surat', 'माँ लक्ष्मी मोबाइल • नीलगिरि, सूरत')}
          </span>
          <div className="flex items-center gap-2 text-[11px] ml-auto">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded transition cursor-pointer"
              title="Toggle Language"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Store Identity */}
          <div
            onClick={() => navigateTo('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-base sm:text-lg leading-tight tracking-tight flex items-center gap-1">
                <span>{settings.shopName}</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {t('Keshav Nagar, Godadara Road, Surat', 'केशव नगर, गोडादरा रोड, सूरत')}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => navigateTo(link.path)}
                  className={`text-sm font-semibold transition cursor-pointer relative py-1 ${
                    isActive
                      ? 'text-rose-600'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Wishlist quick count */}
            <button
              onClick={() => {
                if (isCustomerLoggedIn) {
                  navigateTo('/my-account');
                } else {
                  setShowCustomerAuthModal(true);
                }
              }}
              className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account / Login button */}
            {isCustomerLoggedIn ? (
              <button
                onClick={() => navigateTo('/my-account')}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer border border-slate-200"
              >
                <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">
                  {customerUser?.name.charAt(0) || 'U'}
                </div>
                <span className="max-w-[100px] truncate">{customerUser?.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                onClick={() => setShowCustomerAuthModal(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-rose-600 bg-slate-100 hover:bg-slate-200/80 px-3 py-2 rounded-xl transition cursor-pointer"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>{t('Login / My Account', 'लॉग इन / खाता')}</span>
              </button>
            )}

            {/* Direct Call Button */}
            <a
              href={`tel:${settings.shopPhone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('Call Now', 'कॉल करें')}</span>
            </a>

            {/* Direct WhatsApp Button */}
            <a
              href={`https://wa.me/919913102050?text=${encodeURIComponent(
                'Namaste Maa Lakshmi Mobile, I want to inquire about smartphones and 0% EMI options at your Surat shop.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href={`tel:${settings.shopPhone.replace(/\s+/g, '')}`}
              className="p-2 bg-slate-900 text-amber-400 rounded-lg"
              title="Call Store"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/919913102050?text=${encodeURIComponent(
                'Namaste Maa Lakshmi Mobile, I want to inquire about phone models and 0% EMI.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-emerald-600 text-white rounded-lg"
              title="WhatsApp Store"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigateTo(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                  currentPath === link.path
                    ? 'bg-rose-50 text-rose-600 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {isCustomerLoggedIn ? (
              <button
                onClick={() => {
                  navigateTo('/my-account');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-100 rounded-xl text-sm font-bold text-slate-800"
              >
                <span>{t('Go to My Account', 'मेरे खाते पर जाएं')}</span>
                <span className="text-xs bg-rose-600 text-white px-2 py-0.5 rounded-full">
                  {customerUser?.name}
                </span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowCustomerAuthModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-rose-600 text-white font-bold text-sm rounded-xl text-center shadow-xs"
              >
                {t('Login with Mobile OTP', 'मोबाइल OTP से लॉग इन करें')}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
