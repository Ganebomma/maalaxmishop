import React, { useState } from 'react';
import {
  Users,
  Search,
  Phone,
  MapPin,
  Receipt,
  CreditCard,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminCustomers: React.FC = () => {
  const { invoices, emiPlans, emiEnquiries } = useApp();
  const [search, setSearch] = useState('');

  // Extract unique customer records from invoices, EMI plans, and enquiries
  const customerMap = new Map<string, any>();

  invoices.forEach((inv) => {
    const key = inv.customerPhone.replace(/\D/g, '').slice(-10);
    if (!customerMap.has(key)) {
      customerMap.set(key, {
        name: inv.customerName,
        phone: inv.customerPhone,
        address: inv.customerAddress || 'Surat, Gujarat',
        totalInvoices: 0,
        totalSpent: 0,
        activeEmi: 0,
      });
    }
    const c = customerMap.get(key);
    c.totalInvoices += 1;
    c.totalSpent += inv.totalAmount;
  });

  emiPlans.forEach((plan) => {
    const key = plan.customerPhone.replace(/\D/g, '').slice(-10);
    if (!customerMap.has(key)) {
      customerMap.set(key, {
        name: plan.customerName,
        phone: plan.customerPhone,
        address: 'Keshav Nagar / Godadara, Surat',
        totalInvoices: 1,
        totalSpent: plan.phonePrice,
        activeEmi: 0,
      });
    }
    const c = customerMap.get(key);
    if (plan.status === 'Active') {
      c.activeEmi += 1;
    }
  });

  const customerList = Array.from(customerMap.values()).filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Customer Database & Ledger</h1>
          <p className="text-xs text-slate-400">
            Directory of buyers, purchase frequency, lifetime value, and active EMI plans in Surat
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customer by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <div className="text-xs text-slate-400">
          Showing <strong className="text-white">{customerList.length}</strong> registered shoppers
        </div>
      </div>

      {/* Grid of Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customerList.map((cust, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-rose-400 flex items-center justify-center font-extrabold text-sm">
                  {cust.name.charAt(0)}
                </div>
                {cust.activeEmi > 0 && (
                  <span className="text-[10px] font-black uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    Active EMI Loan
                  </span>
                )}
              </div>

              <h3 className="font-extrabold text-white text-sm mt-3">{cust.name}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>{cust.phone}</span>
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span className="truncate">{cust.address}</span>
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block">Total Invoices</span>
                <span className="font-bold text-slate-200">{cust.totalInvoices} Bills</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">Lifetime Purchase</span>
                <span className="font-black text-rose-400">₹{cust.totalSpent.toLocaleString('en-IN')}</span>
              </div>
              <a
                href={`tel:${cust.phone.replace(/\D/g, '')}`}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl transition"
                title="Call Customer"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
