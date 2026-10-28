import React, { useState } from 'react';
import {
  Receipt,
  Search,
  Plus,
  Trash2,
  Printer,
  Barcode,
  CheckCircle,
  CreditCard,
  DollarSign,
  User,
  Phone,
  MapPin,
  Smartphone,
  Eye,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InvoiceItem, Product, Invoice } from '../../types';

interface AdminPOSProps {
  onViewInvoice: (invoice: Invoice) => void;
}

export const AdminPOS: React.FC<AdminPOSProps> = ({ onViewInvoice }) => {
  const {
    products,
    imeiStock,
    invoices,
    createInvoice,
    staffUser,
  } = useApp();

  // Cart / Items
  const [cartItems, setCartItems] = useState<InvoiceItem[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [selectedImei, setSelectedImei] = useState('');

  // Customer Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('Surat, Gujarat');
  const [customerGstin, setCustomerGstin] = useState('');

  // Payment Details
  const [paymentMode, setPaymentMode] = useState<Invoice['paymentMode']>('UPI');
  const [paymentRef, setPaymentRef] = useState('');
  const [discount, setDiscount] = useState<number>(0);

  const [createdInvoiceSuccess, setCreatedInvoiceSuccess] = useState<Invoice | null>(null);

  // Available stock items for search
  const filteredProducts = products.filter(
    (p) =>
      p.isActive &&
      p.stockQuantity > 0 &&
      (p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.barcode.includes(productSearch))
  );

  const availableImeis = imeiStock.filter((im) => im.status === 'In Stock');

  const handleAddItem = (prod: Product, imeiValue?: string) => {
    // 18% GST backward calculation
    // Total = Base * 1.18 => Base = Total / 1.18
    const unitPrice = prod.sellingPrice / 1.18;
    const taxableAmount = unitPrice * 1;
    const totalTax = prod.sellingPrice - unitPrice;
    const cgst = totalTax / 2;
    const sgst = totalTax / 2;

    const newItem: InvoiceItem = {
      productId: prod.productId,
      name: prod.name,
      imei: imeiValue || (prod.category === 'phone' ? 'IMEI-AUTO-ASSIGNED' : undefined),
      quantity: 1,
      unitPrice,
      hsnCode: prod.hsnCode,
      gstRate: prod.gstRate,
      taxableAmount,
      cgst,
      sgst,
      total: prod.sellingPrice,
    };

    setCartItems((prev) => [...prev, newItem]);
    setProductSearch('');
    setSelectedImei('');
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Calculations
  const grossTotal = cartItems.reduce((acc, item) => acc + item.total, 0);
  const finalTotal = Math.max(0, grossTotal - discount);
  const taxableValue = finalTotal / 1.18;
  const totalTax = finalTotal - taxableValue;
  const cgst = totalTax / 2;
  const sgst = totalTax / 2;

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0 || !customerName || !customerPhone) return;

    const inv = createInvoice({
      invoiceType: 'Tax Invoice',
      customerName,
      customerPhone,
      customerAddress,
      customerGstin,
      items: cartItems,
      subtotal: grossTotal,
      discount,
      taxableValue,
      cgst,
      sgst,
      roundOff: 0,
      totalAmount: finalTotal,
      paidAmount: finalTotal,
      balanceDue: 0,
      paymentMode,
      paymentReference: paymentRef || `POS-${Date.now().toString().slice(-6)}`,
      staffUid: staffUser?.uid || 'staff_01',
      staffName: staffUser?.name || 'Store Cashier',
      invoiceDate: new Date().toISOString().split('T')[0],
      status: 'Paid',
    });

    setCreatedInvoiceSuccess(inv);
    // Reset form
    setCartItems([]);
    setCustomerName('');
    setCustomerPhone('');
    setDiscount(0);
    setPaymentRef('');
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div>
          <h1 className="text-2xl font-black text-white">Point of Sale (POS) & GST Billing</h1>
          <p className="text-xs text-slate-400">
            Generate official GST compliant tax invoice with automatic IMEI allocation & stock deduction
          </p>
        </div>
      </div>

      {createdInvoiceSuccess && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-2xl flex items-center justify-between text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="font-extrabold text-sm block">Invoice #{createdInvoiceSuccess.invoiceNumber} Generated!</span>
              <span className="text-xs text-emerald-400/80">Stock and IMEI records updated synchronously.</span>
            </div>
          </div>
          <button
            onClick={() => {
              onViewInvoice(createdInvoiceSuccess);
              setCreatedInvoiceSuccess(null);
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>
        </div>
      )}

      {/* POS Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Product Search & Cart Table */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5">
          
          {/* Search Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              Scan Barcode / Search Phone Model / IMEI
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Scan barcode or type iPhone 16, S24, Vivo, Buds..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Live Search Results Dropdown */}
            {productSearch && (
              <div className="bg-slate-950 border border-slate-700 rounded-2xl max-h-56 overflow-y-auto divide-y divide-slate-800 p-2 shadow-xl">
                {filteredProducts.length === 0 ? (
                  <div className="p-3 text-xs text-slate-500 text-center">No matching products in stock</div>
                ) : (
                  filteredProducts.map((p) => (
                    <div
                      key={p.productId}
                      onClick={() => handleAddItem(p)}
                      className="p-2.5 hover:bg-slate-800 rounded-xl flex items-center justify-between cursor-pointer transition"
                    >
                      <div>
                        <span className="font-bold text-white text-xs block">{p.name}</span>
                        <span className="text-[10px] text-slate-400">
                          {p.brand} • In Stock: {p.stockQuantity} • HSN: {p.hsnCode}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-rose-400 text-xs block">
                          ₹{p.sellingPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold">+ Add to Cart</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Cart Items Table */}
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400 font-bold">
              <span>Billed Items ({cartItems.length})</span>
              <span>Total: ₹{grossTotal.toLocaleString('en-IN')}</span>
            </div>

            {cartItems.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                No items added to billing cart yet. Search or scan barcode above.
              </div>
            ) : (
              <div className="divide-y divide-slate-800 max-h-72 overflow-y-auto">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="min-w-0 flex-1">
                      <span className="font-extrabold text-white block truncate">{item.name}</span>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span>HSN: {item.hsnCode}</span>
                        <span>•</span>
                        <span className="text-amber-400 font-mono">IMEI: {item.imei || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-xs font-bold text-slate-300">Qty: {item.quantity}</span>
                      <span className="font-black text-rose-400 text-xs">
                        ₹{item.total.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => handleRemoveItem(idx)}
                        className="p-1 text-slate-500 hover:text-rose-400 rounded cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right: Customer & Checkout Info */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <form onSubmit={handleGenerateInvoice} className="space-y-4">
            <h3 className="font-extrabold text-white text-sm pb-2 border-b border-slate-800">
              Customer & Payment Details
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Customer Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Bhai Patel"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Mobile Number (+91) *</label>
              <input
                type="tel"
                required
                placeholder="+91 99131 02050"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Customer Address (Surat)</label>
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Payment Mode Selection */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Payment Mode</label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-rose-500"
              >
                <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
                <option value="Cash">Cash at Counter</option>
                <option value="Card">Debit / Credit Card (POS Terminal)</option>
                <option value="Bajaj Finance">Bajaj Finserv 0% EMI</option>
                <option value="IDFC First">IDFC FIRST Bank Consumer Loan</option>
                <option value="Store EMI">Store Direct Easy EMI</option>
              </select>
            </div>

            {/* Discount */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Special Discount (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Transaction Ref / UTR</label>
                <input
                  type="text"
                  placeholder="Optional UPI Ref"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* Bill Summary */}
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Taxable Value:</span>
                <span>₹{taxableValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CGST (9%) + SGST (9%):</span>
                <span>₹{(cgst + sgst).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-base font-black text-white">
                <span>Final Payable:</span>
                <span className="text-rose-400">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={cartItems.length === 0}
              className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 disabled:opacity-50 text-white font-black text-xs rounded-2xl shadow-lg shadow-rose-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Receipt className="w-4 h-4" />
              <span>Complete Sale & Generate Tax Bill</span>
            </button>
          </form>
        </div>

      </div>

      {/* Recent Invoices Table */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
        <h3 className="font-extrabold text-white text-sm">Recent Store Invoices</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase">
              <tr>
                <th className="py-2">Invoice #</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Items</th>
                <th className="py-2">Payment</th>
                <th className="py-2 text-right">Amount</th>
                <th className="py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {invoices.slice(0, 8).map((inv) => (
                <tr key={inv.invoiceId}>
                  <td className="py-3 font-mono font-bold text-rose-400">{inv.invoiceNumber}</td>
                  <td className="py-3 font-semibold text-white">{inv.customerName}</td>
                  <td className="py-3 text-slate-400">{inv.customerPhone}</td>
                  <td className="py-3 text-slate-300">
                    {inv.items.map((i) => i.name).join(', ')}
                  </td>
                  <td className="py-3">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] font-bold text-amber-300">
                      {inv.paymentMode}
                    </span>
                  </td>
                  <td className="py-3 text-right font-black text-white">
                    ₹{inv.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 text-center">
                    <button
                      onClick={() => onViewInvoice(inv)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition flex items-center gap-1 mx-auto"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Print</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
