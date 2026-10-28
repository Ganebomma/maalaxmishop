import React, { useState } from 'react';
import { UserCog, Plus, Shield, Phone, Mail, CheckCircle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StaffUser } from '../../types';

export const AdminStaff: React.FC = () => {
  const { staffList, addStaff, staffUser } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<StaffUser['role']>('cashier');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addStaff({
      name,
      email,
      phone: phone || '+91 99131 02050',
      role,
      isActive: true,
      permissions:
        role === 'owner'
          ? ['all']
          : role === 'manager'
          ? ['dashboard', 'products', 'stock', 'customers', 'billing', 'emi', 'repairs', 'reports']
          : role === 'cashier'
          ? ['dashboard', 'billing', 'customers']
          : ['repairs'],
    });

    setName('');
    setEmail('');
    setPhone('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Staff Management & Role Access</h1>
          <p className="text-xs text-slate-400">
            Define permissions and login access for Owner, Store Manager, Billing Cashier, and Technicians
          </p>
        </div>

        {staffUser?.role === 'owner' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Staff Member</span>
          </button>
        )}
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {staffList.map((member) => (
          <div
            key={member.uid}
            className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    member.role === 'owner'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : member.role === 'manager'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : member.role === 'cashier'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}
                >
                  {member.role}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Active
                </span>
              </div>

              <h3 className="font-extrabold text-white text-sm mt-3">{member.name}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                <Mail className="w-3 h-3 text-slate-500" />
                <span className="truncate">{member.email}</span>
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                <Phone className="w-3 h-3 text-slate-500" />
                <span>{member.phone}</span>
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500">
              <span className="block font-bold text-slate-400">Permissions:</span>
              <span className="truncate block mt-0.5">{member.permissions.join(', ')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-white mb-4">Add Staff Member</h3>

            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suresh Prajapati"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Email (Login ID) *</label>
                <input
                  type="email"
                  required
                  placeholder="suresh@maalakshmi.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="+91 99131 02050"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Assigned Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                >
                  <option value="manager">Store Manager (POS, Stock, EMI, Repairs)</option>
                  <option value="cashier">Billing Cashier (POS & Invoices Only)</option>
                  <option value="technician">Service Technician (Repairs Queue Only)</option>
                  <option value="owner">Co-Owner (Full Access)</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl"
                >
                  Create Staff Account
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
