import React, { useState } from 'react';
import {
  X,
  Heart,
  MessageCircle,
  Phone,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ProductDetailModalProps {
  onOpenEmiEnquiry: (productName: string, productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ onOpenEmiEnquiry }) => {
  const {
    selectedProduct,
    setSelectedProduct,
    wishlist,
    toggleWishlist,
    isCustomerLoggedIn,
    setShowCustomerAuthModal,
    settings,
    t,
  } = useApp();

  const [selectedTenure, setSelectedTenure] = useState<number>(12);
  const [downPayment, setDownPayment] = useState<number>(0);

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.includes(selectedProduct.productId);
  const principal = Math.max(0, selectedProduct.sellingPrice - downPayment);
  const monthlyEmi = Math.round(principal / selectedTenure);

  const handleWishlist = () => {
    if (!isCustomerLoggedIn) {
      setShowCustomerAuthModal(true);
      return;
    }
    toggleWishlist(selectedProduct.productId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Images & Badges */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-square">
              <img
                src={selectedProduct.images[0] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleWishlist}
                className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition shadow-md ${
                  isWishlisted ? 'bg-rose-600 text-white' : 'bg-white/80 hover:bg-white text-slate-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1-Year Official Brand India Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Original GST Invoice with Box & IMEI</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
                <span>7 Days Store Replacement for Defect</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & EMI Calculator */}
          <div className="md:col-span-7 space-y-5 text-left">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
                <span>{selectedProduct.brand}</span>
                <span>•</span>
                <span>{selectedProduct.model}</span>
                <span>•</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                  {selectedProduct.stockQuantity > 0 ? 'In Stock in Surat' : 'Out of Stock'}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">{selectedProduct.name}</h2>
              <p className="text-xs text-slate-500 mt-1">{selectedProduct.description}</p>
            </div>

            {/* Pricing Section */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900">
                  ₹{selectedProduct.sellingPrice.toLocaleString('en-IN')}
                </span>
                {selectedProduct.mrp > selectedProduct.sellingPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ₹{selectedProduct.mrp.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md ml-auto">
                  Save ₹{(selectedProduct.mrp - selectedProduct.sellingPrice).toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                HSN: {selectedProduct.hsnCode} • Inclusive of 18% GST (CGST 9% + SGST 9%)
              </p>
            </div>

            {/* Hardware Specifications */}
            {selectedProduct.specs && (
              <div className="grid grid-cols-2 gap-2 text-xs">
                {selectedProduct.specs.screen && (
                  <div className="p-2.5 bg-slate-100/70 rounded-xl">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Display</span>
                    <span className="font-semibold text-slate-800">{selectedProduct.specs.screen}</span>
                  </div>
                )}
                {selectedProduct.specs.processor && (
                  <div className="p-2.5 bg-slate-100/70 rounded-xl">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Processor</span>
                    <span className="font-semibold text-slate-800">{selectedProduct.specs.processor}</span>
                  </div>
                )}
                {selectedProduct.specs.camera && (
                  <div className="p-2.5 bg-slate-100/70 rounded-xl">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Camera</span>
                    <span className="font-semibold text-slate-800">{selectedProduct.specs.camera}</span>
                  </div>
                )}
                {selectedProduct.specs.battery && (
                  <div className="p-2.5 bg-slate-100/70 rounded-xl">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Battery</span>
                    <span className="font-semibold text-slate-800">{selectedProduct.specs.battery}</span>
                  </div>
                )}
              </div>
            )}

            {/* Instant Model-Specific 0% EMI Calculator */}
            {selectedProduct.isEMIAvailable && (
              <div className="bg-amber-50/70 border border-amber-300/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-extrabold text-amber-950 text-xs">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>0% Interest EMI Scheme Calculator</span>
                  </div>
                  <span className="text-[11px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                    Bajaj / IDFC / TVS
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Tenure:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[3, 6, 9, 12, 18, 24].map((tenure) => (
                      <button
                        key={tenure}
                        onClick={() => setSelectedTenure(tenure)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg transition cursor-pointer ${
                          selectedTenure === tenure
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {tenure} Mo
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[11px] text-slate-600 block">Calculated Monthly Installment</span>
                    <span className="text-2xl font-black text-rose-700">
                      ₹{monthlyEmi.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500 font-medium ml-1">/ month</span>
                  </div>
                  <button
                    onClick={() => {
                      onOpenEmiEnquiry(selectedProduct.name, selectedProduct.productId);
                      setSelectedProduct(null);
                    }}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition"
                  >
                    Apply For This EMI
                  </button>
                </div>
              </div>
            )}

            {/* Direct Connect Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${settings.shopPhone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition shadow-xs"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Shop (Surat)</span>
              </a>

              <a
                href={`https://wa.me/919913102050?text=${encodeURIComponent(
                  `Namaste Maa Lakshmi Mobile, I want to inquire about availability and best price for ${selectedProduct.name} at your Surat shop.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
