import React, { useState } from 'react';
import { TrendingDown, Plus, Calendar, DollarSign, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Expense } from '../../types';

export const AdminExpenses: React.FC = () => {
  const { expenses, addExpense, staffUser } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [category, setCategory] = useState<Expense['category']>('Tea & Refreshment');
  const [amount, setAmount] = useState<number>(200);
  const [description, setDescription] = useState('');
  const [paymentMode, setPaymentMode] = useState<Expense['paymentMode']>('UPI');

  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0 || !description) return;

    addExpense({
      category,
      amount,
      description,
      paymentMode,
      expenseDate: new Date().toISOString().split('T')[0],
      addedByUid: staffUser?.uid || 'staff_01',
      addedByName: staffUser?.name || 'Manager',
    });

    setDescription('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Daily Shop Expenses & Outflow</h1>
          <p className="text-xs text-slate-400">
            Track operational store expenses, staff tea/refreshments, utility bills, and maintenance
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Record New Expense</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-bold block">Total Recorded Expenses</span>
          <span className="text-2xl font-black text-rose-400 mt-1 block">
            ₹{totalExpenses.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-slate-500 mt-1 block">Accounted in Net P&L</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-bold block">Primary Expense Category</span>
          <span className="text-xl font-extrabold text-white mt-1 block">
            Tools & Repair Spares
          </span>
          <span className="text-[10px] text-slate-500 mt-1 block">Service bench consumables</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-bold block">Total Expense Records</span>
          <span className="text-xl font-extrabold text-white mt-1 block">
            {expenses.length} Vouchers
          </span>
          <span className="text-[10px] text-slate-500 mt-1 block">Verified by store owner</span>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase bg-slate-950/60">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Payment Mode</th>
                <th className="py-3 px-4">Added By</th>
                <th className="py-3 px-4 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {expenses.map((exp) => (
                <tr key={exp.expenseId} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{exp.expenseDate}</td>
                  <td className="py-3 px-4">
                    <span className="bg-slate-800 text-slate-200 text-[11px] font-bold px-2 py-0.5 rounded">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-white font-medium">{exp.description}</td>
                  <td className="py-3 px-4 text-slate-400">{exp.paymentMode}</td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">{exp.addedByName}</td>
                  <td className="py-3 px-4 text-right font-black text-rose-400">
                    ₹{exp.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-white mb-4">Record Store Expense</h3>

            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Expense Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                >
                  <option value="Tea & Refreshment">Tea & Refreshment (Chai/Nasta)</option>
                  <option value="Tools & Parts">Tools & Spare Parts</option>
                  <option value="Electricity">Electricity Bill</option>
                  <option value="Staff Salary">Staff Advance / Salary</option>
                  <option value="Rent">Shop Rent</option>
                  <option value="Marketing">Marketing / Pamphlets</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Amount (₹) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-black text-sm"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Description / Reason *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solder wire and display tape for bench"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Paid Via</label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                >
                  <option value="UPI">UPI (Google Pay / PhonePe)</option>
                  <option value="Cash">Counter Cash</option>
                  <option value="Bank">Bank Account</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl"
                >
                  Save Expense
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
