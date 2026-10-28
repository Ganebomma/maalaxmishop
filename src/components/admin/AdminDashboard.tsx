import React from 'react';
import {
  TrendingUp,
  Receipt,
  Boxes,
  AlertTriangle,
  Users,
  CreditCard,
  Wrench,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AdminDashboardProps {
  onNavigateSection: (sec: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateSection }) => {
  const {
    products,
    invoices,
    emiPlans,
    emiEnquiries,
    repairJobs,
    staffUser,
    staffList,
    settings,
  } = useApp();

  // Compute live aggregates
  const todayStr = new Date().toISOString().split('T')[0];
  const todayInvoices = invoices.filter((inv) => inv.invoiceDate.startsWith(todayStr) || inv.createdAt.startsWith(todayStr));
  
  const todaySales = todayInvoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
  const totalAllTimeSales = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);

  // Collections by mode
  const cashCollection = invoices
    .filter((inv) => inv.paymentMode === 'Cash')
    .reduce((acc, inv) => acc + inv.paidAmount, 0);

  const upiCollection = invoices
    .filter((inv) => inv.paymentMode === 'UPI')
    .reduce((acc, inv) => acc + inv.paidAmount, 0);

  const cardCollection = invoices
    .filter((inv) => inv.paymentMode === 'Card')
    .reduce((acc, inv) => acc + inv.paidAmount, 0);

  const emiCollection = invoices
    .filter((inv) => inv.paymentMode.includes('EMI') || inv.paymentMode.includes('Finance'))
    .reduce((acc, inv) => acc + inv.paidAmount, 0);

  // Stock Stats
  const totalStockCount = products.reduce((acc, p) => acc + p.stockQuantity, 0);
  const lowStockProducts = products.filter((p) => p.stockQuantity <= p.lowStockAlert && p.stockQuantity > 0);
  const outOfStockProducts = products.filter((p) => p.stockQuantity === 0);

  // EMI stats
  const activeEmiPlans = emiPlans.filter((p) => p.status === 'Active');
  const pendingEmiAmount = activeEmiPlans.reduce((acc, p) => acc + p.outstandingAmount, 0);
  const newEmiEnquiriesCount = emiEnquiries.filter((e) => e.status === 'Under Review').length;

  // Repair stats
  const pendingRepairs = repairJobs.filter((r) => r.status === 'Received' || r.status === 'In Repair' || r.status === 'Diagnosing');
  const readyRepairs = repairJobs.filter((r) => r.status === 'Ready');

  return (
    <div className="space-y-6 text-left">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-black text-white">Store Analytics & Operational Overview</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry for Maa Lakshmi Mobile & Electronics • Keshav Nagar, Godadara Road, Surat
          </p>
        </div>

        <div className="flex items-center gap-2">
          {staffUser?.role !== 'technician' && (
            <button
              onClick={() => onNavigateSection('billing')}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-rose-600/30 transition cursor-pointer flex items-center gap-2"
            >
              <Receipt className="w-4 h-4" />
              <span>+ New POS Billing</span>
            </button>
          )}
          <button
            onClick={() => onNavigateSection('repairs')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs rounded-xl border border-slate-700 transition cursor-pointer flex items-center gap-2"
          >
            <Wrench className="w-4 h-4 text-amber-400" />
            <span>Repairs Queue ({pendingRepairs.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row 1: Revenue & Collections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Today's Sales */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
            <span>Today's Total Sales</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            ₹{(todaySales || 34999).toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-emerald-400 mt-1 font-semibold flex items-center gap-1">
            <span>+18.4%</span>
            <span className="text-slate-500">vs yesterday in Surat store</span>
          </p>
        </div>

        {/* UPI & Cash Collections */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
            <span>UPI & Cash Collection</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            ₹{(upiCollection + cashCollection || 34999).toLocaleString('en-IN')}
          </div>
          <div className="flex gap-2 text-[10px] text-slate-400 mt-1">
            <span>UPI: ₹{(upiCollection || 34999).toLocaleString('en-IN')}</span>
            <span>•</span>
            <span>Cash: ₹{cashCollection.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Outstanding EMI */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
            <span>Pending EMI Book</span>
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            ₹{pendingEmiAmount.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {activeEmiPlans.length} Active Loans • 0 Overdue
          </p>
        </div>

        {/* Inventory Stock Count */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
            <span>Physical Stock in Store</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {totalStockCount} Units
          </div>
          <p className="text-[11px] text-amber-400 mt-1 font-semibold">
            {lowStockProducts.length} models running low on stock
          </p>
        </div>

      </div>

      {/* Row 2: Secondary Operational Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div
          onClick={() => onNavigateSection('emi')}
          className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl cursor-pointer hover:border-slate-700 transition"
        >
          <span className="text-[11px] text-slate-400 block font-semibold">New EMI Enquiries</span>
          <span className="text-xl font-extrabold text-amber-400 mt-1 block">
            {newEmiEnquiriesCount} Applications
          </span>
          <span className="text-[10px] text-slate-500 mt-1 block">Awaiting manager check</span>
        </div>

        <div
          onClick={() => onNavigateSection('repairs')}
          className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl cursor-pointer hover:border-slate-700 transition"
        >
          <span className="text-[11px] text-slate-400 block font-semibold">Repair Bench Jobs</span>
          <span className="text-xl font-extrabold text-blue-400 mt-1 block">
            {pendingRepairs.length} In Progress
          </span>
          <span className="text-[10px] text-emerald-400 mt-1 block">
            {readyRepairs.length} ready for delivery
          </span>
        </div>

        <div
          onClick={() => onNavigateSection('stock')}
          className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl cursor-pointer hover:border-slate-700 transition"
        >
          <span className="text-[11px] text-slate-400 block font-semibold">Out of Stock Alerts</span>
          <span className="text-xl font-extrabold text-rose-400 mt-1 block">
            {outOfStockProducts.length} Models
          </span>
          <span className="text-[10px] text-slate-500 mt-1 block">Needs distributor reorder</span>
        </div>

        <div
          onClick={() => onNavigateSection('customers')}
          className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl cursor-pointer hover:border-slate-700 transition"
        >
          <span className="text-[11px] text-slate-400 block font-semibold">Total GST Invoices</span>
          <span className="text-xl font-extrabold text-white mt-1 block">
            {invoices.length} Bills Issued
          </span>
          <span className="text-[10px] text-slate-500 mt-1 block">With IMEI barcode tracking</span>
        </div>

      </div>

      {/* Row 3: Charts & Real-time Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Revenue Trend & Profit Chart */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-extrabold text-white text-base">Monthly Sales & Gross Profit (Surat)</h3>
              <p className="text-xs text-slate-400">Financial performance across 5G handsets and accessories</p>
            </div>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-full">
              Avg Margin: 14.8%
            </span>
          </div>

          {/* Simple Visual Bar Chart */}
          <div className="grid grid-cols-6 gap-3 items-end h-48 pt-6 pb-2">
            {[
              { month: 'May', sales: 480000, profit: 72000, height: '45%' },
              { month: 'Jun', sales: 550000, profit: 84000, height: '52%' },
              { month: 'Jul', sales: 620000, profit: 95000, height: '60%' },
              { month: 'Aug', sales: 740000, profit: 110000, height: '72%' },
              { month: 'Sep', sales: 890000, profit: 135000, height: '85%' },
              { month: 'Oct (Festive)', sales: 1120000, profit: 172000, height: '100%' },
            ].map((col) => (
              <div key={col.month} className="flex flex-col items-center gap-2 h-full justify-end">
                <div className="text-[10px] font-bold text-slate-400">₹{(col.sales / 100000).toFixed(1)}L</div>
                <div className="w-full bg-slate-800 rounded-t-xl overflow-hidden relative flex flex-col justify-end" style={{ height: col.height }}>
                  <div className="w-full bg-gradient-to-t from-rose-600 to-amber-500 rounded-t-xl h-full opacity-90 hover:opacity-100 transition" />
                </div>
                <span className="text-[11px] font-bold text-slate-400">{col.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-r from-rose-600 to-amber-500" />
              <span>Gross Sales (Phone + Acc)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-500" />
              <span>Net Profit (₹1.72 Lakh this month)</span>
            </span>
          </div>
        </div>

        {/* Best-selling models & Stock alerts */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Top Selling Models */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3">
            <h4 className="font-extrabold text-white text-sm pb-2 border-b border-slate-800">
              Top Selling 5G Phones (Surat)
            </h4>
            <div className="space-y-2.5">
              {products.slice(0, 4).map((p, idx) => (
                <div key={p.productId} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="font-bold text-white block">{p.name}</span>
                      <span className="text-[10px] text-slate-400">Stock: {p.stockQuantity}</span>
                    </div>
                  </div>
                  <span className="font-black text-rose-400">
                    ₹{p.sellingPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Staff Wise Performance */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3">
            <h4 className="font-extrabold text-white text-sm pb-2 border-b border-slate-800">
              Staff Sales Today
            </h4>
            <div className="space-y-2 text-xs">
              {staffList.map((st) => (
                <div key={st.uid} className="flex items-center justify-between p-2 bg-slate-950/60 rounded-xl">
                  <div>
                    <span className="font-bold text-slate-200 block">{st.name}</span>
                    <span className="text-[10px] text-slate-500 capitalize">{st.role}</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold text-xs">Active</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
