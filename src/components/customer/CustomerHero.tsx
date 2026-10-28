import React from 'react';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  BadgePercent,
  Wrench,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomerHero: React.FC = () => {
  const { navigateTo, settings, t } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/60 via-white to-slate-50 pt-8 pb-16 border-b border-slate-200">
      {/* Decorative gradient blur background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Brand Pitch & Highlights */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-rose-100/80 border border-rose-300 text-rose-800 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs">
              <Sparkles className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>
                {t(
                  'Exclusive Festive 0% EMI Schemes in Surat',
                  'सूरत में विशेष उत्सव 0% ईएमआई योजनाएं'
                )}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {t('Upgrade to Latest 5G Phones With', 'लेटेस्ट 5G फोन खरीदें')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-amber-600 to-rose-700">
                {t('Zero Down Payment & 0% EMI', 'शून्य डाउन पेमेंट और 0% ईएमआई पर')}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {t(
                'Welcome to Maa Lakshmi Mobile And Electronics, Surat’s premier multi-brand showroom. Authorized sales for Apple, Samsung, OnePlus, Vivo, Oppo & Realme. Instant finance with Bajaj Finserv & IDFC FIRST Bank.',
                'माँ लक्ष्मी मोबाइल एंड इलेक्ट्रॉनिक्स में आपका स्वागत है। एप्पल, सैमसंग, वनप्लस, वीवो, ओप्पो और रियलमी का आधिकारिक शोरूम। बजाज फिनसर्व और IDFC बैंक से तुरंत आसान ईएमआई उपलब्ध।'
              )}
            </p>

            {/* Value Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">
                  {t('100% Genuine Box Pack', '100% असली सीलबंद बॉक्स')}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                <BadgePercent className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">
                  {t('Bajaj & IDFC 0% EMI', 'बजाज और IDFC 0% ब्याज')}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
                <Clock className="w-5 h-5 text-rose-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">
                  {t('45-Min Express Repairs', '45 मिनट में त्वरित रिपेयरिंग')}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigateTo('/phones')}
                className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-rose-600/25 transition cursor-pointer"
              >
                <span>{t('Browse 5G Smartphones', '5G स्मार्टफोन देखें')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('/emi-calculator')}
                className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm px-5 py-3.5 rounded-xl shadow-xs transition cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>{t('Calculate EMI Plan', 'ईएमआई किस्त जानें')}</span>
              </button>

              <button
                onClick={() => navigateTo('/repair-enquiry')}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-5 py-3.5 rounded-xl shadow-xs transition cursor-pointer"
              >
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>{t('Book Phone Repair', 'फोन रिपेयर कराएं')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Featured Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-tr from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden border border-slate-700">
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-rose-500/20 rounded-full blur-2xl" />
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <span className="bg-rose-500/30 text-rose-300 text-xs font-extrabold uppercase px-3 py-1 rounded-full border border-rose-500/40">
                  {t('Store Hot Deal', 'स्टोर हॉट डील')}
                </span>
                <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t('In Stock in Surat', 'सूरत में उपलब्ध')}
                </span>
              </div>

              <div className="pt-5 pb-4 flex items-center gap-5">
                <div className="relative w-28 h-32 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80"
                    alt="iPhone 16"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 bg-amber-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded">
                    NEW
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <span className="text-xs text-slate-400 font-medium">Apple India</span>
                  <h3 className="text-xl font-extrabold text-white">iPhone 16 128GB</h3>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-black text-rose-400">₹74,900</span>
                    <span className="text-xs text-slate-400 line-through">₹79,900</span>
                  </div>
                  <p className="text-xs text-amber-300 font-medium">
                    {t('Zero Down Payment • EMI from ₹3,120/mo', 'शून्य डाउन पेमेंट • ₹3,120/माह से ईएमआई')}
                  </p>
                </div>
              </div>

              {/* Finance partners badges */}
              <div className="bg-slate-800/90 rounded-2xl p-3 border border-slate-700/60 my-4 space-y-2 text-left">
                <span className="text-[11px] text-slate-300 uppercase tracking-wider font-bold block">
                  {t('Official Finance Partners On Spot', 'स्पॉट फाइनेंस पार्टनर्स')}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {settings.emiPartners.map((partner) => (
                    <span
                      key={partner}
                      className="bg-slate-700 text-slate-200 text-[11px] font-semibold px-2 py-0.5 rounded-md"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons inside card */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => navigateTo('/emi-enquiry')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black py-2.5 px-3 rounded-xl transition text-center"
                >
                  {t('Apply for 0% EMI', '0% EMI आवेदन')}
                </button>
                <a
                  href={`https://wa.me/919913102050?text=${encodeURIComponent(
                    'Namaste, I want to book iPhone 16 on 0% EMI from Maa Lakshmi Mobile Surat.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition text-center"
                >
                  {t('WhatsApp Deal', 'व्हाट्सएप डील')}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
