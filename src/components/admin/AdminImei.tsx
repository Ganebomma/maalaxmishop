import React, { useState } from 'react';
import {
  Barcode,
  Search,
  Plus,
  CheckCircle,
  Clock,
  ShieldCheck,
  X,
  Smartphone,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ImeiStock } from '../../types';

export const AdminImei: React.FC = () => {
  const { imeiStock, addImeiStock, updateImeiStatus, products } = useApp();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.productId || '');
  const [imei1, setImei1] = useState('');
  const [imei2, setImei2] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [boxNumber, setBoxNumber] = useState('');

  const filteredItems = imeiStock.filter((item) => {
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        item.imei1.includes(q) ||
        (item.imei2 && item.imei2.includes(q)) ||
        item.productName.toLowerCase().includes(q) ||
        (item.serialNumber && item.serialNumber.toLowerCase().includes(q)) ||
        (item.boxNumber && item.boxNumber.toLowerCase().includes(q)) ||
        (item.customerName && item.customerName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleAddImei = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imei1) return;

    const matchedProd = products.find((p) => p.productId === selectedProductId);

    addImeiStock({
      productId: selectedProductId,
      productName: matchedProd?.name || 'Smartphone',
      brand: matchedProd?.brand || 'Apple',
      imei1,
      imei2: imei2 || undefined,
      serialNumber: serialNumber || undefined,
      boxNumber: boxNumber || `BOX-${Date.now().toString().slice(-4)}`,
      status: 'In Stock',
      purchaseDate: new Date().toISOString().split('T')[0],
    });

    setImei1('');
    setImei2('');
    setSerialNumber('');
    setBoxNumber('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">IMEI & Serial Number Inventory</h1>
          <p className="text-xs text-slate-400">
            Track individual smartphone boxes, dual-IMEI barcodes, warranty dates, and linked tax invoices
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Register New IMEI Stock</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Scan / Search IMEI1, IMEI2, Serial, Box..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['all', 'In Stock', 'Sold', 'In Repair', 'Reserved'].map((st) => (
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

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase bg-slate-950/60">
              <tr>
                <th className="py-3 px-4">Device Model</th>
                <th className="py-3 px-4">IMEI 1</th>
                <th className="py-3 px-4">IMEI 2 / Serial</th>
                <th className="py-3 px-4">Box #</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Sale / Customer Info</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredItems.map((item) => (
                <tr key={item.imeiId} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4">
                    <span className="font-extrabold text-white text-xs block">{item.productName}</span>
                    <span className="text-[10px] text-slate-500">{item.brand}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-amber-400 text-xs">
                    {item.imei1}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                    <div>{item.imei2 || 'N/A'}</div>
                    {item.serialNumber && (
                      <div className="text-[10px] text-slate-500">SN: {item.serialNumber}</div>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400">{item.boxNumber || '-'}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        item.status === 'In Stock'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : item.status === 'Sold'
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs">
                    {item.customerName ? (
                      <div>
                        <span className="text-white font-bold block">{item.customerName}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{item.invoiceId}</span>
                      </div>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <select
                      value={item.status}
                      onChange={(e) => updateImeiStatus(item.imeiId, e.target.value as any)}
                      className="bg-slate-800 text-slate-300 border border-slate-700 text-[11px] rounded-lg px-2 py-1"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Sold">Sold</option>
                      <option value="Reserved">Reserved</option>
                      <option value="In Repair">In Repair</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-white mb-4">Register New Box & IMEI</h3>

            <form onSubmit={handleAddImei} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Select Phone Model *</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                >
                  {products
                    .filter((p) => p.category === 'phone')
                    .map((p) => (
                      <option key={p.productId} value={p.productId}>
                        {p.name} ({p.color})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Primary IMEI (IMEI 1) *</label>
                <input
                  type="text"
                  required
                  maxLength={15}
                  placeholder="15-digit number e.g. 354892019283741"
                  value={imei1}
                  onChange={(e) => setImei1(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Secondary IMEI (IMEI 2)</label>
                <input
                  type="text"
                  maxLength={15}
                  placeholder="Optional 15-digit e.g. 354892019283742"
                  value={imei2}
                  onChange={(e) => setImei2(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Box Barcode #</label>
                  <input
                    type="text"
                    placeholder="BOX-IP16-09"
                    value={boxNumber}
                    onChange={(e) => setBoxNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Serial Number</label>
                  <input
                    type="text"
                    placeholder="DNPG9928KV"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl"
                >
                  Save In Stock
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
