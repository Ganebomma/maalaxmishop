import React, { useState, useEffect } from 'react';
import {
  X,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Edit2,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomerAuthModal: React.FC = () => {
  const {
    showCustomerAuthModal,
    setShowCustomerAuthModal,
    loginCustomerWithOtp,
    settings,
    language,
    t,
  } = useApp();

  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('Godadara Road, Surat');
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  if (!showCustomerAuthModal) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setErrorMsg('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setTimer(60);
      setIsTimerActive(true);
    }, 600);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next box
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otp.join('');
    if (entered.length !== 6) {
      setErrorMsg('Please enter the 6-digit OTP');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      setLoading(false);
      // For smooth onboarding, if new user, ask name/address
      setStep('profile');
    }, 600);
  };

  const handleCompleteProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    loginCustomerWithOtp(phoneNumber, name, address);
  };

  const handleResend = () => {
    if (isTimerActive) return;
    setTimer(60);
    setIsTimerActive(true);
    setErrorMsg('');
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150 text-left">
        
        {/* Close Button */}
        <button
          onClick={() => setShowCustomerAuthModal(false)}
          className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base leading-tight">
              {settings.shopName}
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              {t('Customer Mobile Login • Surat', 'ग्राहक मोबाइल लॉगिन • सूरत')}
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
            {errorMsg}
          </div>
        )}

        {/* STEP 1: Enter Mobile Number */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <h4 className="text-xl font-black text-slate-900">
                {t('Enter Mobile Number', 'मोबाइल नंबर दर्ज करें')}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                {t(
                  'We will send a 6-digit OTP to verify your account and track your EMI & repairs.',
                  'आपके खाते के सत्यापन एवं ईएमआई/रिपेयर ट्रैकिंग के लिए 6 अंकों का OTP भेजा जाएगा।'
                )}
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t('Indian Mobile Number (+91)', 'भारतीय मोबाइल नंबर (+91)')}
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-rose-500 focus-within:bg-white transition">
                <span className="px-3.5 py-3 text-xs font-black text-slate-600 bg-slate-100 border-r border-slate-200">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="99131 02050"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3 py-3 text-sm font-bold text-slate-900 bg-transparent focus:outline-hidden"
                  autoFocus
                />
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-center gap-2 text-[11px] text-amber-900 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Fast OTP verification powered by Firebase Phone Auth.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || phoneNumber.length < 10}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-2xl shadow-md shadow-rose-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span>Sending OTP...</span>
              ) : (
                <>
                  <span>{t('Send Verification OTP', 'OTP प्राप्त करें')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setShowCustomerAuthModal(false)}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
              >
                {t('Continue as Guest (Browse Only)', 'अतिथि के रूप में जारी रखें')}
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Enter 6-digit OTP */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-black text-slate-900">
                  {t('Verify OTP Code', 'OTP कोड सत्यापित करें')}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sent to <span className="font-bold text-slate-900">+91 {phoneNumber}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-xs text-rose-600 font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Edit2 className="w-3 h-3" />
                <span>Change</span>
              </button>
            </div>

            {/* Test OTP Hint */}
            <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-[11px] text-emerald-800 font-medium flex items-center justify-between">
              <span>Instant Test OTP: <strong>123456</strong></span>
              <button
                type="button"
                onClick={() => setOtp(['1', '2', '3', '4', '5', '6'])}
                className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded font-bold hover:bg-emerald-800 cursor-pointer"
              >
                Auto-fill
              </button>
            </div>

            {/* 6 Digit Input Boxes */}
            <div className="flex justify-between gap-2 my-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-13 text-center text-xl font-black bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white text-slate-900"
                />
              ))}
            </div>

            {/* Timer and Resend */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              {isTimerActive ? (
                <span>Resend OTP in <strong>{timer}s</strong></span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-rose-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Resend OTP Now</span>
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || otp.join('').length < 6}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-2xl shadow-md transition cursor-pointer"
            >
              {loading ? 'Verifying...' : t('Verify & Login', 'सत्यापित करें और लॉग इन करें')}
            </button>
          </form>
        )}

        {/* STEP 3: Setup Customer Profile */}
        {step === 'profile' && (
          <form onSubmit={handleCompleteProfile} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mb-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Phone Verified!</span>
              </div>
              <h4 className="text-xl font-black text-slate-900">
                {t('Complete Your Profile', 'अपनी प्रोफाइल पूरी करें')}
              </h4>
              <p className="text-xs text-slate-500">
                {t('This information is used for GST invoices and store delivery in Surat.', 'इस जानकारी का उपयोग जीएसटी बिल और डिलीवरी के लिए किया जाएगा।')}
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t('Your Full Name *', 'आपका पूरा नाम *')}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mukesh Patel"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-rose-500"
                autoFocus
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t('Area / Street Address (Surat)', 'पता (सूरत)')}
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-100 p-2.5 rounded-xl text-slate-700">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">City</span>
                <span className="font-bold">Surat, Gujarat</span>
              </div>
              <div className="bg-slate-100 p-2.5 rounded-xl text-slate-700">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">PIN Code</span>
                <span className="font-bold">395012</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-slate-900 hover:bg-rose-600 text-white font-extrabold text-xs rounded-2xl shadow-md transition cursor-pointer"
            >
              {t('Save Profile & Open My Account', 'प्रोफाइल सहेजें व खाता खोलें')}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
