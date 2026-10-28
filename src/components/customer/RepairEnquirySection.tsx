import React, { useState } from 'react';
import {
  Wrench,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  Search,
  ArrowRight,
  BatteryCharging,
  Layers,
  Volume2,
  Camera,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RepairJob } from '../../types';

export const RepairEnquirySection: React.FC = () => {
  const { customerUser, repairJobs, submitRepairJob, settings, t } = useApp();

  // Booking Form State
  const [customerName, setCustomerName] = useState(customerUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(customerUser?.phone || '');
  const [phoneBrand, setPhoneBrand] = useState('Samsung');
  const [phoneModel, setPhoneModel] = useState('');
  const [problemType, setProblemType] = useState('Broken Screen / Touch Combo');
  const [remarks, setRemarks] = useState('');
  const [createdJob, setCreatedJob] = useState<RepairJob | null>(null);

  // Status Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedJob, setSearchedJob] = useState<RepairJob | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const repairProblems = [
    { name: 'Broken Screen / Touch Combo', icon: Layers, priceEst: '₹1,200 - ₹4,800', time: '30-45 Mins' },
    { name: 'Battery Replacement / Fast Drain', icon: BatteryCharging, priceEst: '₹750 - ₹2,400', time: '20-30 Mins' },
    { name: 'Charging Port / Cable Loose', icon: Wrench, priceEst: '₹350 - ₹850', time: '25 Mins' },
    { name: 'Water Damage / Dead Phone Clean', icon: Cpu, priceEst: '₹800 - ₹2,200', time: '2-4 Hours' },
    { name: 'Camera Glass / Lens Blurry', icon: Camera, priceEst: '₹600 - ₹1,800', time: '30 Mins' },
    { name: 'Speaker / Mic / Earpiece Distortion', icon: Volume2, priceEst: '₹350 - ₹750', time: '20 Mins' },
  ];

  const handleBookRepair = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !phoneModel) return;

    const estCost = problemType.includes('Screen') ? 2500 : problemType.includes('Battery') ? 1400 : 800;

    const newJob = submitRepairJob({
      customerUid: customerUser?.uid,
      customerName,
      customerPhone,
      phoneBrand,
      phoneModel,
      problem: `${problemType} - ${remarks || 'Standard repair request'}`,
      accessoriesReceived: 'Handset without SIM',
      estimatedCost: estCost,
      advancePaid: 0,
      expectedDeliveryDate: new Date(Date.now() + 86400000).toISOString(),
    });

    setCreatedJob(newJob);
  };

  const handleTrackJob = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    const q = searchQuery.trim().toLowerCase();
    const found = repairJobs.find(
      (j) =>
        j.jobNumber.toLowerCase() === q ||
        j.customerPhone.replace(/\D/g, '').includes(q.replace(/\D/g, '')) ||
        (j.imei && j.imei.includes(q))
    );
    setSearchedJob(found || null);
  };

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            <Wrench className="w-3.5 h-3.5" />
            <span>{t('Certified Mobile Service Center', 'प्रमाणित मोबाइल सर्विस सेंटर')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('Express Smartphone Repair & Screen Replacement', 'एक्सप्रेस स्मार्टफोन रिपेयर व स्क्रीन रिप्लेसमेंट')}
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            {t(
              'Get your smartphone repaired by senior micro-soldering technicians in 45 minutes. Original spare parts, transparent pricing, and 90-day guarantee at Keshav Nagar, Surat.',
              'वरिष्ठ तकनीशियन द्वारा 45 मिनट में फोन रिपेयर। ओरिजिनल पार्ट्स, स्पष्ट कीमत और केशव नगर, सूरत में 90 दिन की वारंटी।'
            )}
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">45-Minute Quick Service</h4>
              <p className="text-xs text-slate-500">Screen, battery & charging repairs done in front of you</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">90-Day Warranty on Parts</h4>
              <p className="text-xs text-slate-500">Free replacement if replaced screen or battery shows issue</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">Free Diagnosis & Estimate</h4>
              <p className="text-xs text-slate-500">Zero charges for checking problem before repair approval</p>
            </div>
          </div>
        </div>

        {/* Repair Cards and Booking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Common Services List */}
          <div className="lg:col-span-6 space-y-3">
            <h3 className="text-base font-extrabold text-slate-900 text-left mb-2">
              {t('Common Problems & Approximate Estimates:', 'सामान्य समस्याएं एवं अनुमानित खर्च:')}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {repairProblems.map((item) => {
                const Icon = item.icon;
                const isSelected = problemType === item.name;
                return (
                  <div
                    key={item.name}
                    onClick={() => setProblemType(item.name)}
                    className={`p-4 rounded-2xl border transition-all text-left cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center mb-2">
                        <Icon className="w-4 h-4 text-rose-600" />
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{item.name}</h4>
                      <span className="text-[11px] text-slate-500 block mt-0.5">{item.time} service</span>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-black text-rose-600">{item.priceEst}</span>
                      <span className="text-[10px] font-bold text-slate-400">Select</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Job Card Tracker */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-left mt-6 shadow-xs">
              <h4 className="font-extrabold text-slate-900 text-sm mb-1 flex items-center gap-2">
                <Search className="w-4 h-4 text-rose-600" />
                <span>{t('Already Submitted Your Phone? Track Status', 'फोन रिपेयर स्टेटस ट्रैक करें')}</span>
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                {t('Enter your Job Number (e.g. JOB-2024-089) or mobile number', 'अपना जॉब नंबर या मोबाइल नंबर दर्ज करें')}
              </p>

              <form onSubmit={handleTrackJob} className="flex gap-2">
                <input
                  type="text"
                  placeholder="JOB-2024-089 or 9913102050"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-rose-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition"
                >
                  {t('Track', 'ट्रैक')}
                </button>
              </form>

              {searchAttempted && searchedJob && (
                <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{searchedJob.jobNumber}</span>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        searchedJob.status === 'Ready'
                          ? 'bg-emerald-100 text-emerald-800'
                          : searchedJob.status === 'In Repair'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {searchedJob.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700">
                    <strong>Device:</strong> {searchedJob.phoneBrand} {searchedJob.phoneModel}
                  </p>
                  <p className="text-xs text-slate-600">
                    <strong>Issue:</strong> {searchedJob.problem}
                  </p>
                  <div className="pt-2 border-t border-slate-200 flex justify-between text-xs">
                    <span className="text-slate-500">Estimate: ₹{searchedJob.estimatedCost}</span>
                    <span className="text-slate-500">Tech: {searchedJob.technicianName || 'Assigned'}</span>
                  </div>
                </div>
              )}

              {searchAttempted && !searchedJob && (
                <div className="mt-3 text-xs text-rose-600 font-semibold">
                  No repair job found for this number. Please check the job card given at the store.
                </div>
              )}
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs text-left">
            {createdJob ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-slate-900">Repair Ticket Booked!</h4>
                <div className="inline-block bg-slate-900 text-amber-400 font-mono font-bold text-sm px-3.5 py-1.5 rounded-xl">
                  {createdJob.jobNumber}
                </div>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Please bring your {createdJob.phoneBrand} {createdJob.phoneModel} to our store at Keshav Nagar, Godadara Road. Show this Job Number for priority service.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setCreatedJob(null)}
                    className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl"
                  >
                    Book Another Device
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookRepair} className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                    {t('Online Service Token', 'ऑनलाइन सर्विस टोकन')}
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    {t('Book Express Repair at Godadara Shop', 'गोडादरा शॉप पर एक्सप्रेस रिपेयर बुक करें')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t('Avoid waiting in queue. Reserve replacement parts in advance.', 'कतार में इंतजार से बचें। रिप्लेसमेंट पार्ट्स पहले से सुरक्षित करें।')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {t('Customer Name *', 'ग्राहक का नाम *')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mukesh Bhai"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {t('Mobile Number *', 'मोबाइल नंबर *')}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 99131 02050"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {t('Phone Brand', 'फोन का ब्रांड')}
                    </label>
                    <select
                      value={phoneBrand}
                      onChange={(e) => setPhoneBrand(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-rose-500"
                    >
                      {settings.mobileBrands.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {t('Phone Model *', 'मॉडल नाम *')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Galaxy A54 5G / iPhone 13"
                      value={phoneModel}
                      onChange={(e) => setPhoneModel(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t('Issue Selected:', 'चयनित समस्या:')}
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={problemType}
                    className="w-full bg-rose-50/50 border border-rose-200 text-rose-900 rounded-xl px-3 py-2 text-xs font-bold cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t('Problem Details / Symptoms:', 'समस्या का संक्षिप्त विवरण:')}
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Phone fell down, display is black but ringing, back glass intact"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 hover:bg-rose-600 text-white font-extrabold text-xs rounded-xl shadow-md transition"
                >
                  {t('Generate Repair Job Ticket & Priority Token', 'जॉब टिकट बनाएं व प्राथमिकता प्राप्त करें')}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
