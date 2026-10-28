import React, { useState } from 'react';
import { Smartphone, Phone, MapPin, Mail, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CustomerFooterProps {
  onOpenPolicy: (type: 'privacy' | 'terms' | 'refund' | 'warranty') => void;
}

export const CustomerFooter: React.FC<CustomerFooterProps> = ({ onOpenPolicy }) => {
  const { settings, navigateTo, t } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 xl:pb-12 border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight">
                  {settings.shopName}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {t('Surat, Gujarat, India', 'सूरत, गुजरात, भारत')}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t(
                'Surat’s trusted mobile destination for genuine brand smartphones, electronics, genuine accessories, certified repairs, and on-spot 0% EMI finance from Bajaj Finserv & IDFC Bank.',
                'सूरत का भरोसेमंद मोबाइल शोरूम जहां मिलते हैं असली ब्रांड स्मार्टफोन, इलेक्ट्रॉनिक्स, प्रमाणित रिपेयरिंग और बजाज फिनसर्व व IDFC बैंक से 0% ईएमआई।'
              )}
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{settings.shopAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${settings.shopPhone.replace(/\s+/g, '')}`} className="hover:text-white font-bold">
                  {settings.shopPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{settings.shopEmail}</span>
              </div>
            </div>
          </div>

          {/* Customer Navigation */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              {t('Store Sections', 'स्टोर विभाग')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('/')} className="hover:text-white transition cursor-pointer">
                  {t('Home & Showcase', 'मुख्य पृष्ठ')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/phones')} className="hover:text-white transition cursor-pointer">
                  {t('5G Mobile Phones', '5G मोबाइल फोन्स')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/accessories')} className="hover:text-white transition cursor-pointer">
                  {t('Chargers & Accessories', 'चार्जर व एक्सेसरीज़')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/emi-calculator')} className="hover:text-white transition cursor-pointer">
                  {t('0% EMI Calculator', '0% ईएमआई कैलकुलेटर')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/repair-enquiry')} className="hover:text-white transition cursor-pointer">
                  {t('Mobile Repairs Service', 'मोबाइल रिपेयर सेवा')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/offers')} className="hover:text-white transition cursor-pointer">
                  {t('Festive Offers', 'उत्सव ऑफ़र्स')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/contact')} className="hover:text-white transition cursor-pointer">
                  {t('Contact & Store Map', 'संपर्क व स्टोर मैप')}
                </button>
              </li>
            </ul>
          </div>

          {/* Major Brands */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              {t('Official Brands', 'अधिकृत ब्रांड्स')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {settings.mobileBrands.slice(0, 6).map((brand) => (
                <li key={brand}>
                  <button
                    onClick={() => navigateTo('/phones')}
                    className="hover:text-white transition cursor-pointer"
                  >
                    {brand} Smartphones
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Protection & Policies */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              {t('Policies & Trust', 'नीतियां व सुरक्षा')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onOpenPolicy('warranty')} className="hover:text-white transition cursor-pointer">
                  {t('1-Year Warranty Policy', '1 वर्ष की वारंटी नीति')}
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('refund')} className="hover:text-white transition cursor-pointer">
                  {t('Return & Refund Policy', 'वापसी एवं रिफंड नीति')}
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('terms')} className="hover:text-white transition cursor-pointer">
                  {t('Terms & Conditions', 'नियम व शर्तें')}
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('privacy')} className="hover:text-white transition cursor-pointer">
                  {t('Customer Privacy Policy', 'गोपनीयता नीति')}
                </button>
              </li>
            </ul>

            <div className="pt-3 border-t border-slate-800">
              <span className="text-[11px] text-amber-400 font-bold block">
                GSTIN: {settings.gstin}
              </span>
              <span className="text-[10px] text-slate-500">
                100% Tax Compliant Store
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {settings.shopName}. All Rights Reserved. Nilgiri, Surat, Gujarat.</p>
          <div className="flex items-center gap-3 text-[11px]">
            <span>Crafted for Surat Mobile Shoppers</span>
            <span>•</span>
            <button
              onClick={() => {
                window.location.hash = '/admin';
              }}
              className="text-slate-500 hover:text-amber-400 font-semibold transition cursor-pointer"
            >
              🔒 Staff Portal (/admin)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
