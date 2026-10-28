import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Navigation,
  CheckCircle,
  Smartphone,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContactAndMap: React.FC = () => {
  const { settings, t } = useApp();

  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormName('');
      setFormPhone('');
      setFormMsg('');
    }, 4000);
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t('Visit Store In Surat', 'सूरत में स्टोर पर पधारें')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('Contact Us & Store Location', 'हमसे संपर्क करें व स्टोर लोकेशन')}
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            {t(
              'Located conveniently on Godadara Road. Walk in anytime to test the latest demo smartphones and get instant 0% EMI finance approval.',
              'गोडादरा रोड पर स्थित। कभी भी पधारें, नए स्मार्टफोन का लाइव डेमो देखें और तुरंत 0% ईएमआई प्राप्त करें।'
            )}
          </p>
        </div>

        {/* Info & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Store Details */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-5">
              
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Store Address</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {settings.shopAddress}
                  </p>
                  <span className="text-[11px] font-bold text-rose-600 block mt-1">
                    Near Nilgiri Circle, Surat, Gujarat
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Direct Store Calling</h4>
                  <a
                    href={`tel:${settings.shopPhone.replace(/\s+/g, '')}`}
                    className="text-sm font-black text-rose-600 hover:underline block mt-0.5"
                  >
                    {settings.shopPhone}
                  </a>
                  <span className="text-[11px] text-slate-500">
                    Instant phone stock & EMI enquiry
                  </span>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Showroom Timings</h4>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">
                    Monday to Sunday: 10:00 AM – 10:00 PM
                  </p>
                  <span className="text-[11px] font-bold text-emerald-600 block mt-0.5">
                    Open All 7 Days (Including Sundays & Holidays)
                  </span>
                </div>
              </div>

              {/* WhatsApp & Call CTAs */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${settings.shopPhone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Store</span>
                </a>
                <a
                  href={`https://wa.me/919913102050?text=${encodeURIComponent(
                    'Namaste Maa Lakshmi Mobile, please send store location and 0% EMI details.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Open in Google Maps */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Shop+No+35+Keshav+Nagar+Godadara+Road+Nilgiri+Surat+Gujarat+395012"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition"
              >
                <Navigation className="w-3.5 h-3.5 text-rose-600" />
                <span>Open in Google Maps App</span>
              </a>

            </div>

            {/* Quick Inquiry Form */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
              <h4 className="font-extrabold text-slate-900 text-sm mb-1">
                {t('Send Quick Message to Store', 'दुकान को त्वरित संदेश भेजें')}
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Have questions about phone models or EMI? Drop your number below.
              </p>

              {sent ? (
                <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Message sent! Our store executive will call you shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleSend} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-rose-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number (+91)"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-rose-500"
                  />
                  <textarea
                    rows={2}
                    placeholder="Which phone or repair are you looking for?"
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-rose-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                  >
                    Submit Quick Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Google Maps Location Embed */}
          <div className="lg:col-span-7">
            <div className="bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-md h-[480px] relative">
              <iframe
                title="Maa Lakshmi Mobile Store Surat Location"
                src="https://maps.google.com/maps?q=Keshav+Nagar+Godadara+Road+Nilgiri+Surat+Gujarat+395012&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />

              {/* Floating Address Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-extrabold text-slate-900 text-xs">Maa Lakshmi Mobile Showroom</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Shop No. 35, Keshav Nagar, Godadara Road, Nilgiri, Surat, Gujarat 395012
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px] font-bold text-rose-600">
                  <span>Open Today till 10:00 PM</span>
                  <span>Free Customer Parking</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
