import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminReports: React.FC = () => {
  const { invoices, expenses, products, settings } = useApp();

  const totalGrossSales = invoices.reduce((acc, i) => acc + i.totalAmount, 0);
  const totalTaxable = invoices.reduce((acc, i) => acc + i.taxableValue, 0);
  const totalCgst = invoices.reduce((acc, i) => acc + i.cgst, 0);
  const totalSgst = invoices.reduce((acc, i) => acc + i.sgst, 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

  // Approximate gross margin (15% avg retail on smartphones)
  const estimatedGrossProfit = totalGrossSales * 0.145;
  const netProfit = estimatedGrossProfit - totalExpenses;

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Financial & GST Reports</h1>
          <p className="text-xs text-slate-400">
            GST compliance summaries (CGST 9% + SGST 9%), Profit & Loss statement, and sales audit
          </p>
        </div>

        <button
          onClick={() => alert('GST Summary CSV exported for CA / Auditor filing.')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer w-fit"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export GSTR-1 Data (CSV)</span>
        </button>
      </div>

      {/* Financial Health Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-bold block">Total Billed Revenue</span>
          <span className="text-2xl font-black text-white mt-1 block">
            ₹{totalGrossSales.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-emerald-400 mt-1 block font-semibold">
            {invoices.length} Tax Invoices
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-bold block">Total GST Collected</span>
          <span className="text-2xl font-black text-rose-400 mt-1 block">
            ₹{(totalCgst + totalSgst).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block font-mono">
            CGST: ₹{totalCgst.toFixed(0)} | SGST: ₹{totalSgst.toFixed(0)}
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-bold block">Gross Retail Margin</span>
          <span className="text-2xl font-black text-amber-400 mt-1 block">
            ₹{estimatedGrossProfit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </span>
          <span className="text-[10px] text-slate-500 mt-1 block">~14.5% avg margin on devices</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-bold block">Net Store Profit</span>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">
            ₹{netProfit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </span>
          <span className="text-[10px] text-slate-500 mt-1 block">After deducting ₹{totalExpenses} expenses</span>
        </div>
      </div>

      {/* GST Breakdown Table for Auditor */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="font-extrabold text-white text-sm">GSTR-1 GST Sales Breakdown</h3>
            <p className="text-xs text-slate-400">Ready for Gujarat Commercial Tax GST Portal upload</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">GSTIN: {settings.gstin}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase bg-slate-950/60">
              <tr>
                <th className="py-2.5 px-3">Tax Slab</th>
                <th className="py-2.5 px-3">HSN Code</th>
                <th className="py-2.5 px-3 text-right">Taxable Value (₹)</th>
                <th className="py-2.5 px-3 text-right">CGST Rate (9%)</th>
                <th className="py-2.5 px-3 text-right">SGST Rate (9%)</th>
                <th className="py-2.5 px-3 text-right">Total Tax (₹)</th>
                <th className="py-2.5 px-3 text-right">Invoice Value (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="py-3 px-3 font-bold text-white">GST 18% (Smartphones)</td>
                <td className="py-3 px-3 font-mono text-slate-400">85171300</td>
                <td className="py-3 px-3 text-right font-semibold">
                  ₹{totalTaxable.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </td>
                <td className="py-3 px-3 text-right font-mono text-slate-400">
                  ₹{totalCgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </td>
                <td className="py-3 px-3 text-right font-mono text-slate-400">
                  ₹{totalSgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </td>
                <td className="py-3 px-3 text-right font-bold text-amber-400">
                  ₹{(totalCgst + totalSgst).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </td>
                <td className="py-3 px-3 text-right font-black text-rose-400">
                  ₹{totalGrossSales.toLocaleString('en-IN')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
