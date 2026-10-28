import React, { useState } from 'react';
import {
  Calculator,
  Zap,
  CheckCircle,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  Percent,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface EmiCalculatorProps {
  onOpenApplyModal: () => void;
}

export const EmiCalculatorSection: React.FC<EmiCalculatorProps> = ({ onOpenApplyModal }) => {
  const { settings, t } = useApp();

  const [phonePrice, setPhonePrice] = useState<number>(45000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [tenureMonths, setTenureMonths] = useState<number>(12);
  const [isZeroInterest, setIsZeroInterest] = useState<boolean>(true);

  // Loan calculation
  const loanPrincipal = Math.max(0, phonePrice - downPayment);
  const interestRate = isZeroInterest ? 0 : 12; // Annual %
  
  let monthlyEmi = 0;
  let totalInterest = 0;

  if (isZeroInterest) {
    monthlyEmi = tenureMonths > 0 ? Math.round(loanPrincipal / tenureMonths) : 0;
    totalInterest = 0;
  } else {
    const monthlyRate = interestRate / 12 / 100;
    const emi =
      (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    monthlyEmi = Math.round(emi);
    totalInterest = Math.round(monthlyEmi * tenureMonths - loanPrincipal);
  }

  const totalPayable = downPayment + loanPrincipal + totalInterest;

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t('Instant Store EMI Finance', 'तुरंत स्टोर ईएमआई फाइनेंस')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('Smart EMI Calculator & 0% Finance Schemes', 'स्मार्ट ईएमआई कैलकुलेटर व 0% योजनाएं')}
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            {t(
              'Calculate your exact monthly installment in seconds. Instant approval on spot at our Keshav Nagar, Godadara Road shop with minimal documentation.',
              'अपनी सटीक मासिक किस्त की गणना करें। न्यूनतम दस्तावेजों के साथ हमारी गोडादरा रोड दुकान पर तुरंत स्वीकृति।'
            )}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Box */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-left">
            
            {/* Scheme Toggle */}
            <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700">
                {t('Select Finance Scheme:', 'फाइनेंस योजना चुनें:')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsZeroInterest(true)}
                  className={`text-xs font-extrabold px-3 py-1.5 rounded-xl transition cursor-pointer ${
                    isZeroInterest
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {t('0% Festive Scheme', '0% उत्सव योजना')}
                </button>
                <button
                  onClick={() => setIsZeroInterest(false)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer ${
                    !isZeroInterest
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {t('Standard (12% p.a.)', 'स्टैंडर्ड (12%)')}
                </button>
              </div>
            </div>

            {/* Slider 1: Phone Selling Price */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  {t('Device Price (MRP / Offer Price)', 'मोबाइल की कीमत')}
                </label>
                <span className="text-base font-black text-slate-900">
                  ₹{phonePrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="160000"
                step="1000"
                value={phonePrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setPhonePrice(val);
                  if (downPayment > val) setDownPayment(val);
                }}
                className="w-full accent-rose-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>₹10,000</span>
                <span>₹80,000</span>
                <span>₹1,60,000</span>
              </div>
            </div>

            {/* Slider 2: Down Payment */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  {t('Down Payment (Starting ₹0)', 'डाउन पेमेंट (₹0 से शुरू)')}
                </label>
                <span className="text-base font-black text-rose-600">
                  ₹{downPayment.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={Math.min(60000, phonePrice)}
                step="500"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-rose-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span className="text-emerald-600 font-black">₹0 (Zero Down Payment)</span>
                <span>₹30,000</span>
                <span>₹60,000</span>
              </div>
            </div>

            {/* Tenure Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                {t('Loan Tenure (Months)', 'किस्त की अवधि (महीने)')}
              </label>
              <div className="grid grid-cols-6 gap-2">
                {[3, 6, 8, 12, 18, 24].map((m) => (
                  <button
                    key={m}
                    onClick={() => setTenureMonths(m)}
                    className={`py-2 text-xs font-extrabold rounded-xl transition cursor-pointer border ${
                      tenureMonths === m
                        ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {m}M
                  </button>
                ))}
              </div>
            </div>

            {/* Partner Logos */}
            <div className="pt-2 border-t border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                {t('Approved Finance Companies At Store:', 'स्टोर पर अधिकृत फाइनेंस कम्पनियां:')}
              </span>
              <div className="flex flex-wrap gap-2">
                {settings.emiPartners.map((p) => (
                  <span
                    key={p}
                    className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-lg"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700 text-left space-y-6">
            <div>
              <span className="text-xs text-amber-400 font-extrabold uppercase tracking-widest block mb-1">
                {t('Monthly Installment Result', 'मासिक किस्त परिणाम')}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white">
                  ₹{monthlyEmi.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-slate-400 font-semibold">/ {t('month', 'महीना')}</span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                {t(
                  `For ${tenureMonths} monthly payments of ₹${monthlyEmi.toLocaleString('en-IN')} each.`,
                  `${tenureMonths} महीनों के लिए प्रत्येक माह ₹${monthlyEmi.toLocaleString('en-IN')} की किस्त।`
                )}
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">{t('Loan Amount (Principal):', 'लोन राशि:')}</span>
                <span className="font-bold text-white">₹{loanPrincipal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t('Down Payment:', 'डाउन पेमेंट:')}</span>
                <span className="font-bold text-amber-400">₹{downPayment.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t('Interest Scheme:', 'ब्याज योजना:')}</span>
                <span className="font-bold text-emerald-400">
                  {isZeroInterest ? t('0% Zero Cost EMI', '0% ब्याज') : `${interestRate}% p.a.`}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-700 flex justify-between text-sm">
                <span className="font-extrabold text-slate-200">{t('Total Payable:', 'कुल भुगतान:')}</span>
                <span className="font-black text-rose-400">₹{totalPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t('Instant approval within 15 minutes', '15 मिनट में तुरंत अप्रूवल')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t('Only Aadhaar Card & PAN Card needed', 'सिर्फ आधार कार्ड और पैन कार्ड आवश्यक')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t('Take phone home on the same day!', 'उसी दिन नया फोन घर ले जाएं!')}</span>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={onOpenApplyModal}
              className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-sm rounded-2xl shadow-lg shadow-rose-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t('Apply For EMI Approval Online', 'ऑनलाइन ईएमआई के लिए आवेदन करें')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
