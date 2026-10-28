import React from 'react';
import { Printer, X, Download } from 'lucide-react';
import { Invoice } from '../../types';
import { useApp } from '../../context/AppContext';

interface PrintableInvoiceProps {
  invoice: Invoice | null;
  onClose: () => void;
}

export const PrintableInvoice: React.FC<PrintableInvoiceProps> = ({ invoice, onClose }) => {
  const { settings } = useApp();

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl text-slate-900 text-left relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Controls (Not printed) */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-slate-900">Tax Invoice Preview</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
              Ready to Print
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print GST Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div id="printable-invoice" className="bg-white p-4 border border-slate-300 rounded-2xl space-y-5 text-xs text-slate-800">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-300 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                {settings.shopName}
              </h2>
              <p className="text-[11px] text-slate-600 mt-0.5">{settings.shopAddress}</p>
              <p className="text-[11px] text-slate-600">
                Phone: <strong>{settings.shopPhone}</strong> • Email: {settings.shopEmail}
              </p>
              <p className="text-[11px] font-bold text-rose-700 mt-1">
                GSTIN: {settings.gstin} • State: 24-Gujarat
              </p>
            </div>

            <div className="text-right">
              <span className="text-sm font-black uppercase text-slate-900 block bg-slate-100 px-3 py-1 rounded">
                TAX INVOICE
              </span>
              <span className="font-mono font-bold text-xs text-slate-900 block mt-1">
                {invoice.invoiceNumber}
              </span>
              <span className="text-[11px] text-slate-500 block">
                Date: {new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}
              </span>
            </div>
          </div>

          {/* Customer & Billing Info */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Billed To (Customer):</span>
              <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">{invoice.customerName}</h4>
              <p className="text-xs text-slate-600">{invoice.customerPhone}</p>
              {invoice.customerAddress && (
                <p className="text-xs text-slate-500">{invoice.customerAddress}</p>
              )}
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Payment Details:</span>
              <span className="font-black text-rose-600 text-sm block mt-0.5">
                {invoice.paymentMode}
              </span>
              {invoice.paymentReference && (
                <p className="text-[11px] font-mono text-slate-500">Ref: {invoice.paymentReference}</p>
              )}
              <p className="text-[11px] text-slate-500">Billed by: {invoice.staffName}</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-[10px] font-black uppercase text-slate-600 bg-slate-100">
                  <th className="py-2 px-2">#</th>
                  <th className="py-2 px-2">Description / Model</th>
                  <th className="py-2 px-2">HSN Code</th>
                  <th className="py-2 px-2">IMEI / Serial</th>
                  <th className="py-2 px-2 text-center">Qty</th>
                  <th className="py-2 px-2 text-right">Taxable (₹)</th>
                  <th className="py-2 px-2 text-right">GST (18%)</th>
                  <th className="py-2 px-2 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2.5 px-2 text-slate-500">{index + 1}</td>
                    <td className="py-2.5 px-2 font-bold text-slate-900">{item.name}</td>
                    <td className="py-2.5 px-2 font-mono text-slate-600">{item.hsnCode}</td>
                    <td className="py-2.5 px-2 font-mono text-[11px] text-rose-700">
                      {item.imei || 'N/A'}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold">{item.quantity}</td>
                    <td className="py-2.5 px-2 text-right">
                      {item.taxableAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-600">
                      {(item.cgst + item.sgst).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-2 text-right font-black text-slate-950">
                      {item.total.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Breakdown */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Taxable Amount:</span>
                <span className="font-semibold">₹{invoice.taxableValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>CGST (9.0%):</span>
                <span>₹{invoice.cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>SGST (9.0%):</span>
                <span>₹{invoice.sgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Special Discount:</span>
                  <span>-₹{invoice.discount}</span>
                </div>
              )}
              <div className="pt-2 border-t-2 border-slate-900 flex justify-between text-sm font-black text-slate-950">
                <span>Grand Total:</span>
                <span className="text-base text-rose-700">₹{invoice.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Terms & Authorization Stamp */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-300 text-[10px] text-slate-500">
            <div>
              <span className="font-bold uppercase text-slate-700 block mb-1">Terms of Sale:</span>
              <p>1. 1-Year Brand Warranty applicable as per manufacturer guidelines.</p>
              <p>2. Goods once sold cannot be returned without factory defect verification.</p>
              <p>3. Subject to Surat jurisdiction only.</p>
            </div>

            <div className="text-right flex flex-col justify-between items-end">
              <div>
                <span className="font-bold text-slate-800">For Maa Lakshmi Mobile And Electronics</span>
                <p className="text-[10px] text-slate-400">Keshav Nagar, Godadara Road, Surat</p>
              </div>
              <div className="pt-8">
                <span className="border-t border-slate-400 px-4 pt-1 font-bold text-slate-800">
                  Authorized Signatory / Stamp
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
