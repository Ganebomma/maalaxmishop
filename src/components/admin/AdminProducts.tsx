import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  AlertTriangle,
  Smartphone,
  CheckCircle,
  Eye,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

export const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, staffUser } = useApp();

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Apple');
  const [model, setModel] = useState('');
  const [category, setCategory] = useState<Product['category']>('phone');
  const [ram, setRam] = useState('8 GB');
  const [storage, setStorage] = useState('128 GB');
  const [color, setColor] = useState('Midnight Black');
  const [mrp, setMrp] = useState<number>(49999);
  const [sellingPrice, setSellingPrice] = useState<number>(44999);
  const [purchasePrice, setPurchasePrice] = useState<number>(39000);
  const [stockQuantity, setStockQuantity] = useState<number>(5);
  const [lowStockAlert, setLowStockAlert] = useState<number>(2);
  const [hsnCode, setHsnCode] = useState('85171300');
  const [isEmi, setIsEmi] = useState(true);
  const [description, setDescription] = useState('');

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.model.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName('');
    setModel('');
    setDescription('');
    setShowAddModal(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setBrand(p.brand);
    setModel(p.model);
    setCategory(p.category);
    setRam(p.ram || '');
    setStorage(p.storage || '');
    setColor(p.color);
    setMrp(p.mrp);
    setSellingPrice(p.sellingPrice);
    setPurchasePrice(p.purchasePrice);
    setStockQuantity(p.stockQuantity);
    setLowStockAlert(p.lowStockAlert);
    setHsnCode(p.hsnCode);
    setIsEmi(p.isEMIAvailable);
    setDescription(p.description);
    setShowAddModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    if (editingProduct) {
      updateProduct(editingProduct.productId, {
        name,
        brand,
        model,
        category,
        ram,
        storage,
        color,
        mrp,
        sellingPrice,
        purchasePrice,
        stockQuantity,
        lowStockAlert,
        hsnCode,
        isEMIAvailable: isEmi,
        description,
      });
    } else {
      addProduct({
        name,
        brand,
        model,
        category,
        variant: `${ram} / ${storage}`,
        color,
        ram,
        storage,
        description: description || `${brand} ${model} 5G smartphone with official warranty.`,
        hsnCode,
        gstRate: 18,
        mrp,
        sellingPrice,
        purchasePrice,
        stockQuantity,
        lowStockAlert,
        images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'],
        barcode: `890${Date.now().toString().slice(-9)}`,
        isEMIAvailable: isEmi,
        isActive: true,
        isFeatured: false,
      });
    }

    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Products Catalog & Pricing</h1>
          <p className="text-xs text-slate-400">
            Manage device inventory, purchase costs, selling prices, and HSN tax codes
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search & Stats */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search brand, model, SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>Total Products: <strong className="text-white">{products.length}</strong></span>
          <span>•</span>
          <span>In Stock: <strong className="text-emerald-400">{products.filter((p) => p.stockQuantity > 0).length}</strong></span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase bg-slate-950/60">
              <tr>
                <th className="py-3 px-4">Product Details</th>
                <th className="py-3 px-4">HSN Code</th>
                <th className="py-3 px-4">Purchase Cost</th>
                <th className="py-3 px-4">Selling Price</th>
                <th className="py-3 px-4 text-center">Stock</th>
                <th className="py-3 px-4 text-center">0% EMI</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProducts.map((p) => (
                <tr key={p.productId} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-800 shrink-0"
                      />
                      <div>
                        <span className="font-extrabold text-white text-xs block">{p.name}</span>
                        <span className="text-[10px] text-slate-400">
                          {p.brand} • {p.color} • {p.variant}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{p.hsnCode}</td>
                  <td className="py-3 px-4 text-slate-400 font-medium">
                    ₹{p.purchasePrice.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 font-black text-rose-400">
                    ₹{p.sellingPrice.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                        p.stockQuantity <= p.lowStockAlert
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {p.stockQuantity} Left
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {p.isEMIAvailable ? (
                      <span className="text-emerald-400 font-bold text-[11px]">Enabled</span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">No</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      {staffUser?.role === 'owner' && (
                        <button
                          onClick={() => deleteProduct(p.productId)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-left">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-white mb-4">
              {editingProduct ? 'Edit Product Details' : 'Add New Product to Store'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Product Display Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OnePlus 13 5G (16GB RAM, 512GB)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold"
                  >
                    <option value="phone">Smartphone</option>
                    <option value="audio">Audio / Earbuds</option>
                    <option value="accessory">Charger / Cable</option>
                    <option value="wearable">Smartwatch</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">RAM</label>
                  <input
                    type="text"
                    placeholder="8 GB"
                    value={ram}
                    onChange={(e) => setRam(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Storage</label>
                  <input
                    type="text"
                    placeholder="256 GB"
                    value={storage}
                    onChange={(e) => setStorage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Color</label>
                  <input
                    type="text"
                    placeholder="Black"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Purchase Price (₹)</label>
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    value={mrp}
                    onChange={(e) => setMrp(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Low Stock Alert</label>
                  <input
                    type="number"
                    value={lowStockAlert}
                    onChange={(e) => setLowStockAlert(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">HSN Code</label>
                  <input
                    type="text"
                    value={hsnCode}
                    onChange={(e) => setHsnCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="emi-check"
                  checked={isEmi}
                  onChange={(e) => setIsEmi(e.target.checked)}
                  className="accent-rose-600 rounded"
                />
                <label htmlFor="emi-check" className="text-slate-300 font-bold cursor-pointer">
                  Available for 0% EMI Scheme (Bajaj / IDFC)
                </label>
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition"
                >
                  Save Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
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
