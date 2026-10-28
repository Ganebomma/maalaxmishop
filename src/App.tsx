import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { CustomerHeader } from './components/customer/CustomerHeader';
import { CustomerBottomNav } from './components/customer/CustomerBottomNav';
import { CustomerHero } from './components/customer/CustomerHero';
import { ProductCatalog } from './components/customer/ProductCatalog';
import { ProductDetailModal } from './components/customer/ProductDetailModal';
import { EmiCalculatorSection } from './components/customer/EmiCalculatorSection';
import { EmiEnquiryModal } from './components/customer/EmiEnquiryModal';
import { RepairEnquirySection } from './components/customer/RepairEnquirySection';
import { OffersSection } from './components/customer/OffersSection';
import { CustomerReviews } from './components/customer/CustomerReviews';
import { ContactAndMap } from './components/customer/ContactAndMap';
import { CustomerFooter } from './components/customer/CustomerFooter';
import { PolicyModals, PolicyType } from './components/customer/PolicyModals';
import { CustomerAuthModal } from './components/customer/CustomerAuthModal';
import { CustomerAccountView } from './components/customer/CustomerAccountView';

import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminPOS } from './components/admin/AdminPOS';
import { AdminProducts } from './components/admin/AdminProducts';
import { AdminImei } from './components/admin/AdminImei';
import { AdminCustomers } from './components/admin/AdminCustomers';
import { AdminEmi } from './components/admin/AdminEmi';
import { AdminRepairs } from './components/admin/AdminRepairs';
import { AdminExpenses } from './components/admin/AdminExpenses';
import { AdminReports } from './components/admin/AdminReports';
import { AdminStaff } from './components/admin/AdminStaff';
import { AdminSettings } from './components/admin/AdminSettings';
import { PrintableInvoice } from './components/admin/PrintableInvoice';
import { Invoice } from './types';

const MainAppContent: React.FC = () => {
  const {
    currentPath,
    isAdminRoute,
    isAdminLoggedIn,
    selectedProduct,
    setSelectedProduct,
    viewingInvoice,
    setViewingInvoice,
  } = useApp();

  // Modals state
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);
  const [emiEnquiryModalOpen, setEmiEnquiryModalOpen] = useState(false);
  const [emiEnquiryProductName, setEmiEnquiryProductName] = useState<string | undefined>(undefined);
  const [emiEnquiryProductId, setEmiEnquiryProductId] = useState<string | undefined>(undefined);

  // Admin section state
  const [adminSection, setAdminSection] = useState<string>('dashboard');

  const handleOpenEmiEnquiry = (prodName?: string, prodId?: string) => {
    setEmiEnquiryProductName(prodName);
    setEmiEnquiryProductId(prodId);
    setEmiEnquiryModalOpen(true);
  };

  // Keyboard shortcut (Alt + A) to toggle /admin
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && (e.key === 'a' || e.key === 'A')) || (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A'))) {
        e.preventDefault();
        if (isAdminRoute) {
          window.location.hash = '/';
        } else {
          window.location.hash = '/admin';
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminRoute]);

  // -------------------------------------------------------------
  // 1. ADMIN PANEL ROUTE (Completely separate, direct URL /admin)
  // -------------------------------------------------------------
  if (isAdminRoute) {
    if (!isAdminLoggedIn) {
      return <AdminLogin />;
    }

    return (
      <AdminLayout activeSection={adminSection} setActiveSection={setAdminSection}>
        {adminSection === 'dashboard' && <AdminDashboard onNavigateSection={setAdminSection} />}
        {adminSection === 'billing' && <AdminPOS onViewInvoice={(inv: Invoice) => setViewingInvoice(inv)} />}
        {adminSection === 'products' && <AdminProducts />}
        {adminSection === 'stock' && <AdminProducts />}
        {adminSection === 'imei' && <AdminImei />}
        {adminSection === 'customers' && <AdminCustomers />}
        {adminSection === 'emi' && <AdminEmi />}
        {adminSection === 'repairs' && <AdminRepairs />}
        {adminSection === 'expenses' && <AdminExpenses />}
        {adminSection === 'reports' && <AdminReports />}
        {adminSection === 'staff' && <AdminStaff />}
        {adminSection === 'settings' && <AdminSettings />}

        {/* Printable Tax Invoice Modal */}
        <PrintableInvoice
          invoice={viewingInvoice}
          onClose={() => setViewingInvoice(null)}
        />
      </AdminLayout>
    );
  }

  // -------------------------------------------------------------
  // 2. PUBLIC CUSTOMER WEBSITE (Strictly NO admin leaks)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Customer Header */}
      <CustomerHeader />

      <main className="flex-1">
        {/* Route views */}
        {currentPath === '/' && (
          <>
            <CustomerHero />
            <ProductCatalog
              title="Festive Smartphone & Electronics Showcase"
              subtitle="Latest 5G smartphones from Apple, Samsung, OnePlus, Vivo, Oppo & Realme in Surat"
            />
            <EmiCalculatorSection onOpenApplyModal={() => handleOpenEmiEnquiry()} />
            <RepairEnquirySection />
            <OffersSection />
            <CustomerReviews />
            <ContactAndMap />
          </>
        )}

        {currentPath === '/phones' && (
          <ProductCatalog
            initialCategory="phone"
            title="5G Smartphones Catalog (Surat)"
            subtitle="Original sealed-box phones with brand warranty, GST invoice, and instant 0% EMI finance"
          />
        )}

        {currentPath === '/accessories' && (
          <ProductCatalog
            initialCategory="audio"
            title="Genuine Accessories & Audio Gear"
            subtitle="Original Apple 20W adapters, OnePlus Buds 3, Fastrack smartwatches, and fast cables"
          />
        )}

        {currentPath === '/offers' && (
          <>
            <OffersSection />
            <ProductCatalog title="Special Offer Devices" />
          </>
        )}

        {currentPath === '/emi-calculator' && (
          <>
            <EmiCalculatorSection onOpenApplyModal={() => handleOpenEmiEnquiry()} />
            <ProductCatalog
              initialCategory="phone"
              title="Phones Eligible for 0% EMI"
              subtitle="Choose any model below to calculate customized monthly installments"
            />
          </>
        )}

        {currentPath === '/repair-enquiry' && (
          <>
            <RepairEnquirySection />
            <ContactAndMap />
          </>
        )}

        {currentPath === '/contact' && (
          <>
            <ContactAndMap />
            <CustomerReviews />
          </>
        )}

        {/* Customer Account Routes */}
        {(currentPath === '/my-account' ||
          currentPath === '/my-profile' ||
          currentPath === '/my-enquiries' ||
          currentPath === '/my-wishlist' ||
          currentPath === '/my-notifications') && (
          <CustomerAccountView />
        )}
      </main>

      {/* Customer Footer (No admin links) */}
      <CustomerFooter onOpenPolicy={(p) => setActivePolicy(p)} />

      {/* Mobile Bottom Navigation Bar */}
      <CustomerBottomNav />

      {/* Floating Staff & Admin Access Button (For store owner & previewing) */}
      <button
        onClick={() => {
          window.location.hash = '/admin';
        }}
        className="fixed bottom-18 xl:bottom-6 right-4 z-40 bg-slate-900/90 hover:bg-slate-950 text-white border border-slate-700 shadow-2xl px-3.5 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 cursor-pointer backdrop-blur-md"
        title="Open Admin ERP (/admin) • Press Alt+A"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Owner / Admin ERP</span>
        <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">/admin</span>
      </button>

      {/* Interactive Modals */}
      <ProductDetailModal
        onOpenEmiEnquiry={(name, id) => handleOpenEmiEnquiry(name, id)}
      />

      <EmiEnquiryModal
        isOpen={emiEnquiryModalOpen}
        onClose={() => setEmiEnquiryModalOpen(false)}
        defaultProductName={emiEnquiryProductName}
        defaultProductId={emiEnquiryProductId}
      />

      <CustomerAuthModal />

      <PolicyModals
        policyType={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
