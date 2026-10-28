import React, { useState } from 'react';
import { X, CheckCircle, Smartphone, User, Phone, Briefcase, FileCheck, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface EmiEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProductName?: string;
  defaultProductId?: string;
}

export const EmiEnquiryModal: React.FC<EmiEnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultProductName,
  defaultProductId,
}) => {
  const { customerUser, products, submitEmiEnquiry, t } = useApp();

  const [customerName, setCustomerName] = useState(customerUser?.name || '');
  const [mobileNumber, setMobileNumber] = useState(customerUser?.phone || '');
  const [selectedProd, setSelectedProd] = useState(defaultProductName || (products[0]?.name ?? 'Apple iPhone 16 (128GB)'));
  const [monthlyIncome, setMonthlyIncome] = useState<number>(30000);
  const [employmentType, setEmploymentType] = useState<'Salaried' | 'Self-Employed' | 'Business' | 'Student'>('Salaried');
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [tenure, setTenure] = useState<number>(12);
  const [aadhaar, setAadhaar] = useState<boolean>(true);
  const [pan, setPan] = useState<boolean>(true);
  const [bankAccount, setBankAccount] = useState<boolean>(true);
  const [remarks, setRemarks] = useState<string>('');

  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !mobileNumber) return;

    submitEmiEnquiry({
      customerUid: customerUser?.uid,
      customerName,
      mobileNumber,
      productId: defaultProductId || 'prod_general',
      productName: selectedProd,
      monthlyIncome,
      employmentType,
      preferredDownPayment: downPayment,
      preferredTenure: tenure,
      aadhaarAvailable: aadhaar,
      panAvailable: pan,
      bankAccountAvailable: bankAccount,
      remarks,
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              {t('EMI Application Submitted!', 'ईएमआई आवेदन प्राप्त हुआ!')}
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              {t(
                `Thank you ${customerName}! Our finance manager at Maa Lakshmi Mobile Surat will review your application for ${selectedProd} and call you on ${mobileNumber} within 30 minutes.`,
                `धन्यवाद ${customerName}! माँ लक्ष्मी मोबाइल सूरत के फाइनेंस मैनेजर 30 मिनट में आपके नंबर ${mobileNumber} पर कॉल करके प्री-अप्रूवल की पुष्टि करेंगे।`
              )}
            </p>
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs text-amber-900 font-medium">
              📍 Shop No. 35, Keshav Nagar, Godadara Road, Nilgiri, Surat, Gujarat 395012
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              {t('Done', 'पूर्ण')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                {t('Fast Pre-Approval Check', 'तुरंत प्री-अप्रूवल जांच')}
              </span>
              <h3 className="text-xl font-black text-slate-900">
                {t('Apply for 0% Smartphone EMI', '0% स्मार्टफोन ईएमआई के लिए आवेदन करें')}
              </h3>
              <p className="text-xs text-slate-500">
                {t(
                  'No credit score required for basic evaluation. Get approval on Bajaj, IDFC or TVS Credit.',
                  'क्रेडिट स्कोर न होने पर भी आवेदन कर सकते हैं। बजाज, IDFC या TVS क्रेडिट से स्वीकृति।'
                )}
              </p>
            </div>

            {/* Selected Device */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t('Preferred Mobile Model:', 'पसंदीदा मोबाइल मॉडल:')}
              </label>
              <select
                value={selectedProd}
                onChange={(e) => setSelectedProd(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-rose-500"
              >
                {products
                  .filter((p) => p.category === 'phone')
                  .map((p) => (
                    <option key={p.productId} value={p.name}>
                      {p.name} - ₹{p.sellingPrice.toLocaleString('en-IN')}
                    </option>
                  ))}
              </select>
            </div>

            {/* Customer Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('Your Full Name *', 'आपका पूरा नाम *')}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Patel"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('Mobile Number *', 'मोबाइल नंबर *')}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 99131 00000"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* Income & Employment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('Employment Type', 'रोजगार का प्रकार')}
                </label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-rose-500"
                >
                  <option value="Salaried">Salaried (नौकरीपेशा)</option>
                  <option value="Self-Employed">Self-Employed (स्वयं का काम)</option>
                  <option value="Business">Business / Shop (व्यापार)</option>
                  <option value="Student">Student / Other (विद्यार्थी)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('Monthly Income (Approx)', 'मासिक आय')}
                </label>
                <input
                  type="number"
                  step="1000"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* Down Payment & Tenure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('Preferred Down Payment (₹)', 'पसंदीदा डाउन पेमेंट')}
                </label>
                <input
                  type="number"
                  step="500"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t('Preferred Months (Tenure)', 'किस्त के महीने')}
                </label>
                <select
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-rose-500"
                >
                  <option value={3}>3 Months</option>
                  <option value={6}>6 Months</option>
                  <option value={8}>8 Months</option>
                  <option value={12}>12 Months</option>
                  <option value={18}>18 Months</option>
                  <option value={24}>24 Months</option>
                </select>
              </div>
            </div>

            {/* KYC Checkbox list */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold text-slate-700 block">
                {t('Check Available Documents:', 'उपलब्ध दस्तावेज चुनें:')}
              </span>
              <div className="flex flex-wrap gap-4 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={aadhaar}
                    onChange={(e) => setAadhaar(e.target.checked)}
                    className="accent-rose-600 rounded"
                  />
                  <span>Aadhaar Card</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={pan}
                    onChange={(e) => setPan(e.target.checked)}
                    className="accent-rose-600 rounded"
                  />
                  <span>PAN Card</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={bankAccount}
                    onChange={(e) => setBankAccount(e.target.checked)}
                    className="accent-rose-600 rounded"
                  />
                  <span>Bank Passbook / Netbanking</span>
                </label>
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t('Any Special Request / Old Phone Exchange:', 'कोई विशेष अनुरोध / पुराना फोन एक्सचेंज:')}
              </label>
              <input
                type="text"
                placeholder="e.g. Want to exchange OnePlus Nord, need zero down payment"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-md transition"
            >
              {t('Submit Application & Get Instant Approval Call', 'आवेदन भेजें और स्वीकृति कॉल प्राप्त करें')}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
