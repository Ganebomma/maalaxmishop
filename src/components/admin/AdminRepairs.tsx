import React, { useState } from 'react';
import {
  Wrench,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  Edit2,
  X,
  Layers,
  BatteryCharging,
  Cpu,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RepairJob } from '../../types';

export const AdminRepairs: React.FC = () => {
  const { repairJobs, updateRepairStatus, staffUser, staffList } = useApp();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<RepairJob | null>(null);

  // Edit status modal state
  const [newStatus, setNewStatus] = useState<RepairJob['status']>('In Repair');
  const [partsUsed, setPartsUsed] = useState('');
  const [finalAmount, setFinalAmount] = useState<number>(0);

  const filteredJobs = repairJobs.filter((job) => {
    if (filterStatus !== 'all' && job.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        job.jobNumber.toLowerCase().includes(q) ||
        job.customerName.toLowerCase().includes(q) ||
        job.customerPhone.includes(q) ||
        job.phoneModel.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenEdit = (job: RepairJob) => {
    setSelectedJob(job);
    setNewStatus(job.status);
    setPartsUsed(job.partsUsed || '');
    setFinalAmount(job.finalAmount || job.estimatedCost);
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    updateRepairStatus(selectedJob.repairId, newStatus, partsUsed, finalAmount);
    setSelectedJob(null);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Repair Bench & Service Job Cards</h1>
          <p className="text-xs text-slate-400">
            Track micro-soldering, screen replacements, parts consumption, and technician job cards
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Job #, customer, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {['all', 'Received', 'In Repair', 'Ready', 'Delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer ${
                filterStatus === st
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Repair Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map((job) => (
          <div
            key={job.repairId}
            className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold bg-slate-950 text-amber-400 px-2.5 py-1 rounded-lg border border-slate-800">
                  {job.jobNumber}
                </span>
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    job.status === 'Ready'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : job.status === 'In Repair'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <div className="mt-3">
                <h3 className="font-extrabold text-white text-base">
                  {job.phoneBrand} {job.phoneModel}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Customer: <strong className="text-slate-200">{job.customerName}</strong> ({job.customerPhone})
                </p>
              </div>

              <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5">
                <div className="text-slate-300">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Issue Reported:</span>
                  <span>{job.problem}</span>
                </div>
                {job.partsUsed && (
                  <div className="text-amber-300 text-[11px] pt-1 border-t border-slate-800">
                    <strong>Parts Used:</strong> {job.partsUsed}
                  </div>
                )}
                <div className="flex justify-between pt-1 border-t border-slate-800 text-slate-400">
                  <span>Est: ₹{job.estimatedCost}</span>
                  <span className="text-emerald-400 font-bold">
                    Adv: ₹{job.advancePaid}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800">
              <button
                onClick={() => handleOpenEdit(job)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Update Status</span>
              </button>

              <a
                href={`https://wa.me/91${job.customerPhone.replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(
                  `Namaste ${job.customerName}, update from Maa Lakshmi Mobile Surat regarding your ${job.phoneBrand} ${job.phoneModel} (Job #${job.jobNumber}): Status is now ${job.status}!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition"
                title="Send WhatsApp Update"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Update Job Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-white mb-1">
              Update Repair Job #{selectedJob.jobNumber}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {selectedJob.phoneBrand} {selectedJob.phoneModel} • {selectedJob.customerName}
            </p>

            <form onSubmit={handleSaveStatus} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Job Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                >
                  <option value="Received">Received at Store</option>
                  <option value="Diagnosing">Diagnosing Board & Parts</option>
                  <option value="Waiting for Parts">Waiting for Parts</option>
                  <option value="In Repair">In Repair (Work in Progress)</option>
                  <option value="Ready">Ready for Customer Pickup</option>
                  <option value="Delivered">Delivered & Closed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Parts & IC Used</label>
                <input
                  type="text"
                  placeholder="e.g. Original AMOLED Combo + Frame + Adhesive"
                  value={partsUsed}
                  onChange={(e) => setPartsUsed(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Final Amount (₹)</label>
                <input
                  type="number"
                  value={finalAmount}
                  onChange={(e) => setFinalAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl"
                >
                  Save & Notify Customer
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
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
