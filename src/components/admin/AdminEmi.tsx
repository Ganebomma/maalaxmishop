import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  CheckCircle,
  AlertCircle,
  Calendar,
  DollarSign,
  UserCheck,
  Zap,
  X,
  Printer,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EmiPlan, EmiEnquiry } from '../../types';

export const AdminEmi: React.FC = () => {
  const {
    emiPlans,
    collectEmiPayment,
    emiEnquiries,
    updateEmiEnquiryStatus,
    staffUser,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'plans' | 'enquiries'>('plans');
  const [search, setSearch] = useState('');

  // Payment modal state
  const [selectedPlan, setSelectedPlan] = useState<EmiPlan | null>(null);
  const [payAmount, setPayAmount] = useState<number>(0);
  const [payMode, setPayMode] = useState<'Cash' | 'UPI' | 'Bank Transfer'>('UPI');
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);

  const handleOpenPay = (plan: EmiPlan) => {
    setSelectedPlan(plan);
    setPayAmount(plan.emiAmount);
    setPaymentSuccess(null);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    collectEmiPayment(selectedPlan.emiPlanId, selectedPlan.paidMonths + 1, payAmount, payMode);
    setPaymentSuccess(`Receipt #${Date.now().toString().slice(-6)} generated! ₹${payAmount} collected via ${payMode}.`);
    setTimeout(() => {
      setSelectedPlan(null);
      setPaymentSuccess(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">EMI Loan Accounts & Inquiries</h1>
          <p className="text-xs text-slate-400">
            Manage store financed smartphones, monthly installment collection, and online inquiries
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'plans'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Active Loan Accounts ({emiPlans.length})
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'enquiries'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            New Web Enquiries ({emiEnquiries.length})
          </button>
        </div>
      </div>

      {/* TAB 1: ACTIVE EMI PLANS */}
      {activeTab === 'plans' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase bg-slate-950/60">
                  <tr>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Smartphone Model</th>
                    <th className="py-3 px-4">Loan Principal</th>
                    <th className="py-3 px-4">Monthly EMI</th>
                    <th className="py-3 px-4 text-center">Tenure Paid</th>
                    <th className="py-3 px-4">Outstanding</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Collect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {emiPlans.map((plan) => (
                    <tr key={plan.emiPlanId} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4">
                        <span className="font-extrabold text-white text-xs block">{plan.customerName}</span>
                        <span className="text-[10px] text-slate-500">{plan.customerPhone}</span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-200">
                        {plan.productName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        ₹{plan.loanAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 font-black text-rose-400">
                        ₹{plan.emiAmount.toLocaleString('en-IN')} / mo
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-extrabold text-white text-xs">
                          {plan.paidMonths} / {plan.totalMonths}
                        </span>
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full mx-auto mt-1 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${(plan.paidMonths / plan.totalMonths) * 100}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                        ₹{plan.outstandingAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            plan.status === 'Active'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {plan.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {plan.status === 'Active' ? (
                          <button
                            onClick={() => handleOpenPay(plan)}
                            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl transition cursor-pointer shadow-xs"
                          >
                            Collect EMI
                          </button>
                        ) : (
                          <span className="text-slate-500 text-xs font-semibold">Closed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EMI ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emiEnquiries.map((enq) => (
              <div
                key={enq.enquiryId}
                className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-white text-sm">{enq.customerName}</h3>
                    <p className="text-xs text-rose-400 font-semibold">{enq.mobileNumber}</p>
                  </div>
                  <select
                    value={enq.status}
                    onChange={(e) => updateEmiEnquiryStatus(enq.enquiryId, e.target.value as any)}
                    className="bg-slate-950 border border-slate-700 text-white text-xs font-bold rounded-xl px-2.5 py-1"
                  >
                    <option value="Under Review">Under Review</option>
                    <option value="Verified">Verified</option>
                    <option value="Approved">Approved</option>
                    <option value="Ready for Pickup">Ready for Pickup</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Selected Handset:</span>
                    <span className="font-bold text-white">{enq.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Monthly Income:</span>
                    <span className="font-semibold text-slate-200">₹{enq.monthlyIncome.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Employment:</span>
                    <span className="font-semibold text-slate-200">{enq.employmentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Down Payment & Months:</span>
                    <span className="font-bold text-amber-400">₹{enq.preferredDownPayment} • {enq.preferredTenure}M</span>
                  </div>
                </div>

                {enq.remarks && (
                  <p className="text-[11px] text-slate-400 bg-slate-800/40 p-2 rounded-lg">
                    Note: {enq.remarks}
                  </p>
                )}

                <div className="flex gap-2 pt-1">
                  <a
                    href={`tel:${enq.mobileNumber.replace(/\D/g, '')}`}
                    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white text-center text-xs font-bold rounded-xl"
                  >
                    Call Applicant
                  </a>
                  <a
                    href={`https://wa.me/91${enq.mobileNumber.replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(
                      `Namaste ${enq.customerName}, regarding your EMI application for ${enq.productName} at Maa Lakshmi Mobile Surat, your pre-approval is verified!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-center text-xs font-bold rounded-xl"
                  >
                    WhatsApp Pre-Approval
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collect Payment Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-white mb-1">
              Collect Installment #{selectedPlan.paidMonths + 1}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {selectedPlan.customerName} • {selectedPlan.productName}
            </p>

            {paymentSuccess ? (
              <div className="p-4 bg-emerald-950 border border-emerald-800 rounded-2xl text-emerald-300 text-xs font-bold text-center">
                {paymentSuccess}
              </div>
            ) : (
              <form onSubmit={handleConfirmPayment} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Installment Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={payAmount}
                    onChange={(e) => setPayAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-black text-sm"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Payment Channel</label>
                  <select
                    value={payMode}
                    onChange={(e) => setPayMode(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                  >
                    <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
                    <option value="Cash">Cash at Counter</option>
                    <option value="Bank Transfer">Direct Bank Transfer</option>
                  </select>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Remaining Balance After Payment:</span>
                    <span className="font-bold text-white">
                      ₹{Math.max(0, selectedPlan.outstandingAmount - payAmount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl shadow-md transition"
                >
                  Generate Official Receipt & Record Payment
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
