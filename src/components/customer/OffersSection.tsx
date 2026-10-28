import React from 'react';
import { Percent, Sparkles, Clock, ArrowRight, Gift, Tag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OffersSection: React.FC = () => {
  const { offers, navigateTo, t } = useApp();

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            <Percent className="w-3.5 h-3.5" />
            <span>{t('Limited Period Store Offers', 'सीमित समय के स्टोर ऑफ़र्स')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('Festival Mega Savings & 0% EMI Mela', 'उत्सव महा बचत एवं 0% ईएमआई मेला')}
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            {t(
              'Grab genuine smartphone deals, exchange bonuses, and 100% free accessories at Maa Lakshmi Mobile Nilgiri, Surat.',
              'माँ लक्ष्मी मोबाइल नीलगिरि, सूरत पर स्मार्टफोन डील्स, एक्सचेंज बोनस और फ्री एक्सेसरीज़ प्राप्त करें।'
            )}
          </p>
        </div>

        {/* Offers Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.offerId}
              className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between text-left group"
            >
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={offer.bannerImageUrl}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-rose-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {offer.badge}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-2xl font-black text-amber-300">{offer.discountValue}</span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Valid: {offer.validTill}</span>
                  </div>
                  <button
                    onClick={() => navigateTo('/phones')}
                    className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
                  >
                    <span>{t('View Deals', 'डील्स देखें')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
