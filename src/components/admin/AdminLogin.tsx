import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  CheckCircle,
  Smartphone,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const AdminLogin: React.FC = () => {
  const { loginStaff, navigateTo, settings } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const success = loginStaff(email);
      if (success) {
        navigateTo('/admin/dashboard');
      } else {
        setErrorMsg('Invalid staff email credentials or account inactive.');
      }
    }, 500);
  };

  const handleQuickDemo = (role: UserRole, demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('admin@123');
    loginStaff(demoEmail, role);
    navigateTo('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-left relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-rose-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 space-y-6">
          {/* Logo & Security Alert */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-rose-400 font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Restricted Management ERP</span>
              </div>
              <h2 className="text-xl font-black text-white">{settings.shopName}</h2>
            </div>
          </div>

          <div className="p-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl text-xs text-slate-300">
            Internal administrative portal for Owner, Store Manager, Cashier, and Service Technicians.
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-950/50 border border-rose-800 text-rose-300 text-xs font-semibold rounded-xl flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Authorized Staff Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="owner@maalakshmi.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white focus:ring-2 focus:ring-rose-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-rose-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In To Admin Console'}</span>
            </button>
          </form>

          {/* Quick Demo Role Logins */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 block">
              1-Click Instant Role Sign-in (For Evaluation):
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemo('owner', 'owner@maalakshmi.com')}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-left transition cursor-pointer"
              >
                <div className="font-extrabold text-rose-400">1. Owner</div>
                <div className="text-[10px] text-slate-400">Full ERP & Settings</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('manager', 'manager@maalakshmi.com')}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-left transition cursor-pointer"
              >
                <div className="font-extrabold text-amber-400">2. Manager</div>
                <div className="text-[10px] text-slate-400">Stock, POS, Repairs</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('cashier', 'cashier@maalakshmi.com')}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-left transition cursor-pointer"
              >
                <div className="font-extrabold text-emerald-400">3. Cashier</div>
                <div className="text-[10px] text-slate-400">Billing & POS Only</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('technician', 'tech@maalakshmi.com')}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-left transition cursor-pointer"
              >
                <div className="font-extrabold text-blue-400">4. Technician</div>
                <div className="text-[10px] text-slate-400">Repairs Queue Only</div>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigateTo('/')}
              className="text-xs text-slate-500 hover:text-slate-400"
            >
              ← Back to Customer Website
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
