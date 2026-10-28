import React from 'react';
import { Star, CheckCircle, MapPin, Quote } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomerReviews: React.FC = () => {
  const { t } = useApp();

  const reviews = [
    {
      name: 'Rajeshbhai Patel',
      area: 'Keshav Nagar, Godadara, Surat',
      rating: 5,
      date: '2 days ago',
      product: 'Apple iPhone 16 (128GB)',
      text: 'Got my iPhone 16 on 0% EMI with Bajaj Finserv in just 20 minutes! Ganesh bhai and the staff explained everything clearly without hidden charges. Original bill and seal pack box.',
    },
    {
      name: 'Pooja Chudasama',
      area: 'Nilgiri Society, Surat',
      rating: 5,
      date: '1 week ago',
      product: 'Samsung Galaxy A54 Screen Replacement',
      text: 'My phone screen cracked badly. Ramesh bhai technician replaced it within 40 minutes with original Super AMOLED display. Touch is buttery smooth and they gave 90 days warranty.',
    },
    {
      name: 'Amit Dhumal',
      area: 'Parvat Patiya, Surat',
      rating: 5,
      date: '2 weeks ago',
      product: 'OnePlus 12R 5G + Buds 3',
      text: 'Best mobile showroom in Godadara area. They gave free 11D tempered glass and back cover with phone. Highly recommend for zero down payment finance.',
    },
    {
      name: 'Imran Ansari',
      area: 'Dindoli Road, Surat',
      rating: 5,
      date: '3 weeks ago',
      product: 'Vivo V40 5G',
      text: 'IDFC first bank paperless loan approved with only Aadhaar and PAN card. Very respectful behavior and instant WhatsApp assistance whenever needed.',
    },
  ];

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            <Star className="w-3.5 h-3.5 fill-rose-600" />
            <span>{t('4.9/5 Star Surat Customer Trust', '4.9/5 स्टार सूरत ग्राहकों का भरोसा')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('What Our Surat Customers Say', 'हमारे सूरत के ग्राहकों के अनुभव')}
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            {t(
              'Over 8,500 happy mobile owners in Nilgiri, Godadara, Dindoli and Parvat Patiya trust Maa Lakshmi Mobile.',
              'नीलगिरि, गोडादरा, डिंडोली और पर्वत पाटिया के 8,500 से अधिक खुश ग्राहक।'
            )}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1">
                  <span>{rev.name}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{rev.area}</span>
                </div>
                <div className="text-[10px] text-rose-600 font-bold mt-1 bg-rose-50 px-2 py-0.5 rounded-md inline-block">
                  Verified Buyer: {rev.product}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
