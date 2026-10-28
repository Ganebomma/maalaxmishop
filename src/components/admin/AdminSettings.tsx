import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, ShieldCheck, Smartphone } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useApp();

  const [shopName, setShopName] = useState(settings.shopName);
  const [shopAddress, setShopAddress] = useState(settings.shopAddress);
  const [shopPhone, setShopPhone] = useState(settings.shopPhone);
  const [shopEmail, setShopEmail] = useState(settings.shopEmail);
  const [gstin, setGstin] = useState(settings.gstin);
  const [upiId, setUpiId] = useState(settings.upiId);
  const [zeroEmi, setZeroEmi] = useState(settings.showZeroEmiBanner);

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      shopName,
      shopAddress,
      shopPhone,
      shopEmail,
      gstin,
      upiId,
      showZeroEmiBanner: zeroEmi,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      <div className="flex items-center justify-between pb-2">
        <div>
          <h1 className="text-2xl font-black text-white">Showroom & Business Settings</h1>
          <p className="text-xs text-slate-400">
            Configure store business details, tax identification, and customer portal banners
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-950 border border-emerald-800 rounded-2xl flex items-center gap-2 text-emerald-300 text-xs font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Store settings saved successfully across storefront and tax invoices!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 text-xs">
        
        {/* Basic Store Info */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-white text-sm pb-2 border-b border-slate-800">
            Store Identity & Location
          </h3>

          <div>
            <label className="text-slate-300 font-bold block mb-1">Store / Legal Trade Name</label>
            <input
              type="text"
              required
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-black text-sm"
            />
          </div>

          <div>
            <label className="text-slate-300 font-bold block mb-1">Physical Showroom Address</label>
            <textarea
              rows={2}
              required
              value={shopAddress}
              onChange={(e) => setShopAddress(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-bold block mb-1">Contact Phone (Voice & WhatsApp)</label>
              <input
                type="text"
                required
                value={shopPhone}
                onChange={(e) => setShopPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Official Email</label>
              <input
                type="email"
                required
                value={shopEmail}
                onChange={(e) => setShopEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>
          </div>
        </div>

        {/* Tax & Financial Info */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="font-extrabold text-white text-sm pb-2 border-b border-slate-800">
            Tax & Payment Credentials
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-bold block mb-1">GSTIN Number (Gujarat State)</label>
              <input
                type="text"
                required
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono font-bold"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Store Official Merchant UPI ID</label>
              <input
                type="text"
                required
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-amber-400 font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h3 className="font-extrabold text-white text-sm pb-2 border-b border-slate-800">
            Customer Portal Scheme Banners
          </h3>

          <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-950 rounded-2xl border border-slate-800">
            <input
              type="checkbox"
              checked={zeroEmi}
              onChange={(e) => setZeroEmi(e.target.checked)}
              className="accent-rose-600 w-4 h-4 rounded"
            />
            <div>
              <span className="font-bold text-white text-xs block">
                Show 0% Down Payment EMI Banner on Customer Website
              </span>
              <span className="text-[11px] text-slate-500">
                Displays festive promotional banner for Bajaj Finserv and IDFC FIRST Bank in Surat
              </span>
            </div>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-2xl shadow-lg shadow-rose-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes & Sync Across Store</span>
        </button>
      </form>
    </div>
  );
};
