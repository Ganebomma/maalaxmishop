import React, { useState } from 'react';
import {
  LayoutDashboard,
  Receipt,
  Smartphone,
  Boxes,
  Barcode,
  Users,
  CreditCard,
  Wrench,
  TrendingDown,
  BarChart3,
  UserCog,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeSection,
  setActiveSection,
}) => {
  const { staffUser, logoutStaff, navigateTo, settings } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!staffUser) {
    return null;
  }

  const role = staffUser.role; // 'owner' | 'manager' | 'cashier' | 'technician'

  const allMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['owner', 'manager', 'cashier', 'technician'] },
    { id: 'billing', label: 'Billing / POS', icon: Receipt, roles: ['owner', 'manager', 'cashier'] },
    { id: 'products', label: 'Products', icon: Smartphone, roles: ['owner', 'manager'] },
    { id: 'stock', label: 'Stock / Inventory', icon: Boxes, roles: ['owner', 'manager'] },
    { id: 'imei', label: 'IMEI Management', icon: Barcode, roles: ['owner', 'manager'] },
    { id: 'customers', label: 'Customers', icon: Users, roles: ['owner', 'manager', 'cashier'] },
    { id: 'emi', label: 'EMI Management', icon: CreditCard, roles: ['owner', 'manager'] },
    { id: 'repairs', label: 'Repair Jobs', icon: Wrench, roles: ['owner', 'manager', 'technician'] },
    { id: 'expenses', label: 'Expenses', icon: TrendingDown, roles: ['owner', 'manager'] },
    { id: 'reports', label: 'Financial Reports', icon: BarChart3, roles: ['owner', 'manager'] },
    { id: 'staff', label: 'Staff Management', icon: UserCog, roles: ['owner'] },
    { id: 'settings', label: 'Shop Settings', icon: Settings, roles: ['owner'] },
  ];

  const visibleMenuItems = allMenuItems.filter((item) => item.roles.includes(role));

  const roleColor = {
    owner: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    manager: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    cashier: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    technician: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  }[role];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col xl:flex-row">
      
      {/* Top Mobile Bar */}
      <div className="xl:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center font-bold text-white text-xs">
            ML
          </div>
          <div>
            <span className="font-extrabold text-sm text-white block leading-tight">Admin ERP</span>
            <span className="text-[10px] text-slate-400 capitalize">{role} Account</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Sidebar & Mobile Drawer */}
      <aside
        className={`w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 z-30 transition-all ${
          mobileMenuOpen ? 'block' : 'hidden xl:flex'
        }`}
      >
        {/* Brand Banner */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center font-black text-white text-sm shadow-md">
              MLM
            </div>
            <div className="text-left">
              <h2 className="font-black text-white text-sm leading-tight truncate max-w-[150px]">
                {settings.shopName}
              </h2>
              <p className="text-[10px] text-slate-400">Nilgiri, Surat</p>
            </div>
          </div>

          {/* User Role Badge */}
          <div className="mt-4 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-left">
            <div className="min-w-0">
              <span className="text-xs font-bold text-white block truncate">{staffUser.name}</span>
              <span className={`text-[10px] font-black uppercase px-1.5 py-0.2 rounded border inline-block mt-0.5 ${roleColor}`}>
                {role}
              </span>
            </div>
            <Shield className="w-4 h-4 text-slate-500 shrink-0" />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto text-left">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          <button
            onClick={() => {
              window.location.hash = '/';
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition cursor-pointer border border-slate-700"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Customer Storefront</span>
          </button>
          <button
            onClick={() => {
              logoutStaff();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-rose-400 hover:bg-rose-950/40 rounded-xl transition cursor-pointer border border-rose-900/40"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950 overflow-y-auto">
        <header className="hidden xl:flex items-center justify-between px-8 py-4 bg-slate-900/60 border-b border-slate-800 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Maa Lakshmi Mobile ERP</span>
            <span className="text-slate-700">/</span>
            <span className="font-bold text-white capitalize">{activeSection.replace('_', ' ')}</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400">
              GSTIN: <strong className="text-white">{settings.gstin}</strong>
            </span>
            <span className="text-slate-400">
              UPI: <strong className="text-amber-400">{settings.upiId}</strong>
            </span>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </div>
      </main>

    </div>
  );
};
