import React from 'react';
import { X, ShieldCheck, RotateCcw, FileText, Lock } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'refund' | 'warranty' | null;

interface PolicyModalsProps {
  policyType: PolicyType;
  onClose: () => void;
}

export const PolicyModals: React.FC<PolicyModalsProps> = ({ policyType, onClose }) => {
  if (!policyType) return null;

  const contentMap = {
    warranty: {
      title: 'Store & Brand Warranty Policy',
      icon: ShieldCheck,
      body: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed text-left">
          <p>
            <strong>1. 100% Brand India Warranty:</strong> Every mobile phone sold at Maa Lakshmi Mobile And Electronics comes with the official manufacturer warranty (1 Year for Handset, 6 Months for Box Accessories) valid across all authorized service centers in India.
          </p>
          <p>
            <strong>2. Repair Service Warranty:</strong> Replaced screens, batteries, and charging ports done at our Godadara service center carry a <strong>90-Day Free Replacement Warranty</strong> against manufacturing touch or charging defects.
          </p>
          <p>
            <strong>3. Physical / Water Damage Exclusion:</strong> Physical breakage, screen cracks occurring after delivery, and liquid ingress are not covered under standard manufacturer or store warranty.
          </p>
          <p>
            <strong>4. Warranty Claim Assistance:</strong> If you face any trouble claiming brand warranty with Apple, Samsung, OnePlus, Vivo or Oppo in Surat, visit our shop with your invoice and our team will coordinate the service for you free of cost.
          </p>
        </div>
      ),
    },
    refund: {
      title: 'Return & Refund Policy',
      icon: RotateCcw,
      body: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed text-left">
          <p>
            <strong>1. 7-Day In-Store Defect Replacement:</strong> If a newly purchased handset has any hardware manufacturing defect within 7 days of purchase, visit our store with the original invoice, box, and all accessories for immediate inspection and replacement assistance.
          </p>
          <p>
            <strong>2. Opened Box Return Policy:</strong> In accordance with Indian electronics retail standards, opened or activated smartphones without manufacturing defects cannot be returned for cash refund.
          </p>
          <p>
            <strong>3. Accessories & Peripherals:</strong> Unopened chargers, cables, and cases can be exchanged within 48 hours with receipt.
          </p>
          <p>
            <strong>4. EMI Cancellations:</strong> For purchases made on Bajaj Finserv or IDFC FIRST Bank EMI, cancellation must follow the respective finance company’s cooling-off terms and verification.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms & Conditions',
      icon: FileText,
      body: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed text-left">
          <p>
            <strong>1. Store Ownership:</strong> Maa Lakshmi Mobile And Electronics is located at Shop No. 35, Keshav Nagar, Godadara Road, Nilgiri, Surat, Gujarat 395012.
          </p>
          <p>
            <strong>2. Pricing & GST:</strong> All displayed retail prices include applicable Goods and Services Tax (GST 18%). Official GST Tax Invoices are issued with serial numbers and IMEI 1/2 tracking.
          </p>
          <p>
            <strong>3. EMI Schemes:</strong> 0% interest schemes are subject to approval by financing partners (Bajaj Finserv, IDFC FIRST Bank, TVS Credit, Home Credit, HDB). Down payments and processing fees, if any, are determined by the finance partner's eligibility criteria.
          </p>
          <p>
            <strong>4. Repair Job Cards:</strong> Customers are advised to backup all personal data before leaving devices for repair. The store is not liable for data loss during micro-soldering or software flashing.
          </p>
        </div>
      ),
    },
    privacy: {
      title: 'Customer Privacy Policy',
      icon: Lock,
      body: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed text-left">
          <p>
            <strong>1. Data Collection:</strong> We collect your name, phone number, and address strictly for invoice generation, GST compliance, warranty tracking, and SMS/WhatsApp EMI reminders.
          </p>
          <p>
            <strong>2. No Third-Party Selling:</strong> Your contact details and KYC documents (Aadhaar, PAN copies submitted for EMI) are never sold, rented, or shared with unauthorized commercial third parties.
          </p>
          <p>
            <strong>3. Security:</strong> All digital records, IMEI tracking, and invoice copies are stored securely in encrypted cloud storage with role-based access control.
          </p>
          <p>
            <strong>4. Contact:</strong> For any privacy-related queries, reach out to our shop manager at maalakshmimobile35@gmail.com or call +91 99131 02050.
          </p>
        </div>
      ),
    },
  };

  const active = contentMap[policyType];
  const Icon = active.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 text-left">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">{active.title}</h3>
            <span className="text-[11px] text-slate-500">Maa Lakshmi Mobile And Electronics, Surat</span>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto pr-1">
          {active.body}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
