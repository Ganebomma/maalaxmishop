import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppSettings,
  CustomerProfile,
  EmiEnquiry,
  EmiPayment,
  EmiPlan,
  Expense,
  ImeiStock,
  Invoice,
  Language,
  NotificationItem,
  Offer,
  Product,
  RepairJob,
  StaffUser,
  UserRole,
} from '../types';
import {
  initialEmiEnquiries,
  initialEmiPlans,
  initialExpenses,
  initialImeiStock,
  initialInvoices,
  initialOffers,
  initialProducts,
  initialRepairJobs,
  initialSettings,
  initialStaff,
} from '../data/seedData';

interface AppContextType {
  // Navigation & Route state
  currentPath: string;
  navigateTo: (path: string) => void;
  isAdminRoute: boolean;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, hindiOverride?: string) => string;

  // Customer Auth
  customerUser: CustomerProfile | null;
  isCustomerLoggedIn: boolean;
  loginCustomerWithOtp: (phone: string, name?: string, address?: string) => void;
  updateCustomerProfile: (data: Partial<CustomerProfile>) => void;
  logoutCustomer: () => void;
  showCustomerAuthModal: boolean;
  setShowCustomerAuthModal: (show: boolean) => void;

  // Admin Auth
  staffUser: StaffUser | null;
  isAdminLoggedIn: boolean;
  loginStaff: (email: string, role?: UserRole) => boolean;
  logoutStaff: () => void;

  // Store Data & Actions
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;

  products: Product[];
  addProduct: (product: Omit<Product, 'productId' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;

  imeiStock: ImeiStock[];
  addImeiStock: (item: Omit<ImeiStock, 'imeiId' | 'createdAt'>) => void;
  updateImeiStatus: (imeiId: string, status: ImeiStock['status'], customerName?: string, invoiceId?: string) => void;

  invoices: Invoice[];
  createInvoice: (invoiceData: Omit<Invoice, 'invoiceId' | 'invoiceNumber' | 'createdAt'>) => Invoice;

  emiPlans: EmiPlan[];
  createEmiPlan: (plan: Omit<EmiPlan, 'emiPlanId' | 'createdAt'>) => void;
  collectEmiPayment: (planId: string, installmentNo: number, amount: number, mode: 'Cash' | 'UPI' | 'Bank Transfer') => void;

  emiEnquiries: EmiEnquiry[];
  submitEmiEnquiry: (enquiry: Omit<EmiEnquiry, 'enquiryId' | 'status' | 'createdAt'>) => void;
  updateEmiEnquiryStatus: (enquiryId: string, status: EmiEnquiry['status']) => void;

  repairJobs: RepairJob[];
  submitRepairJob: (job: Omit<RepairJob, 'repairId' | 'jobNumber' | 'status' | 'createdAt' | 'updatedAt'>) => RepairJob;
  updateRepairStatus: (repairId: string, status: RepairJob['status'], partsUsed?: string, finalAmount?: number) => void;

  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'expenseId' | 'createdAt'>) => void;

  offers: Offer[];
  addOffer: (offer: Omit<Offer, 'offerId' | 'createdAt'>) => void;

  staffList: StaffUser[];
  addStaff: (staff: Omit<StaffUser, 'uid' | 'createdAt' | 'lastLoginAt'>) => void;

  // Customer Wishlist & Notifications
  wishlist: string[]; // productIds
  toggleWishlist: (productId: string) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;

  // Selected product modal
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Direct checkout / invoice viewing
  viewingInvoice: Invoice | null;
  setViewingInvoice: (inv: Invoice | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Sync URL hash or path
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      return hash || window.location.pathname || '/';
    }
    return '/';
  });

  const [language, setLanguage] = useState<Language>('en');

  // Customer State
  const [customerUser, setCustomerUser] = useState<CustomerProfile | null>(() => {
    try {
      const saved = localStorage.getItem('mlm_customer_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [showCustomerAuthModal, setShowCustomerAuthModal] = useState(false);

  // Admin State
  const [staffUser, setStaffUser] = useState<StaffUser | null>(() => {
    try {
      const saved = localStorage.getItem('mlm_staff_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Store Entities with localStorage backup
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('mlm_settings');
      return saved ? JSON.parse(saved) : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('mlm_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [imeiStock, setImeiStock] = useState<ImeiStock[]>(() => {
    try {
      const saved = localStorage.getItem('mlm_imei_stock');
      return saved ? JSON.parse(saved) : initialImeiStock;
    } catch {
      return initialImeiStock;
    }
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      const saved = localStorage.getItem('mlm_invoices');
      return saved ? JSON.parse(saved) : initialInvoices;
    } catch {
      return initialInvoices;
    }
  });

  const [emiPlans, setEmiPlans] = useState<EmiPlan[]>(() => {
    try {
      const saved = localStorage.getItem('mlm_emi_plans');
      return saved ? JSON.parse(saved) : initialEmiPlans;
    } catch {
      return initialEmiPlans;
    }
  });

  const [emiEnquiries, setEmiEnquiries] = useState<EmiEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem('mlm_emi_enquiries');
      return saved ? JSON.parse(saved) : initialEmiEnquiries;
    } catch {
      return initialEmiEnquiries;
    }
  });

  const [repairJobs, setRepairJobs] = useState<RepairJob[]>(() => {
    try {
      const saved = localStorage.getItem('mlm_repair_jobs');
      return saved ? JSON.parse(saved) : initialRepairJobs;
    } catch {
      return initialRepairJobs;
    }
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
      const saved = localStorage.getItem('mlm_expenses');
      return saved ? JSON.parse(saved) : initialExpenses;
    } catch {
      return initialExpenses;
    }
  });

  const [offers, setOffers] = useState<Offer[]>(() => {
    try {
      const saved = localStorage.getItem('mlm_offers');
      return saved ? JSON.parse(saved) : initialOffers;
    } catch {
      return initialOffers;
    }
  });

  const [staffList, setStaffList] = useState<StaffUser[]>(() => {
    try {
      const saved = localStorage.getItem('mlm_staff_list');
      return saved ? JSON.parse(saved) : initialStaff;
    } catch {
      return initialStaff;
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mlm_wishlist');
      return saved ? JSON.parse(saved) : ['prod_ip16_128', 'prod_op12r_256'];
    } catch {
      return ['prod_ip16_128', 'prod_op12r_256'];
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif_1',
      targetUid: 'all',
      title: 'Festival 0% EMI Scheme is Live!',
      message: 'Bajaj Finserv & IDFC 0% EMI available on iPhone 16 & Galaxy S24 with zero down payment at our Godadara shop.',
      type: 'emi',
      isRead: false,
      createdAt: 'Just now',
    },
    {
      id: 'notif_2',
      targetUid: 'all',
      title: 'Express Mobile Repair Service',
      message: 'Get your broken phone screen or battery replaced within 45 minutes with genuine parts and 90-day warranty.',
      type: 'repair',
      isRead: false,
      createdAt: '2 hours ago',
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mlm_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mlm_imei_stock', JSON.stringify(imeiStock));
  }, [imeiStock]);

  useEffect(() => {
    localStorage.setItem('mlm_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('mlm_emi_plans', JSON.stringify(emiPlans));
  }, [emiPlans]);

  useEffect(() => {
    localStorage.setItem('mlm_emi_enquiries', JSON.stringify(emiEnquiries));
  }, [emiEnquiries]);

  useEffect(() => {
    localStorage.setItem('mlm_repair_jobs', JSON.stringify(repairJobs));
  }, [repairJobs]);

  useEffect(() => {
    localStorage.setItem('mlm_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('mlm_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Handle URL changes
  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentPath(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isAdminRoute = currentPath.startsWith('/admin');

  // Customer Auth functions
  const loginCustomerWithOtp = (phone: string, name?: string, address?: string) => {
    const formattedPhone = phone.startsWith('+91') ? phone : `+91 ${phone}`;
    const profile: CustomerProfile = {
      uid: `cust_${phone.replace(/\D/g, '').slice(-10)}`,
      name: name || 'Valued Surat Customer',
      phone: formattedPhone,
      address: address || 'Shop No. 35, Keshav Nagar, Godadara Road',
      city: 'Surat',
      state: 'Gujarat',
      pincode: '395012',
      preferredLanguage: language,
      role: 'customer',
      isActive: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    setCustomerUser(profile);
    localStorage.setItem('mlm_customer_user', JSON.stringify(profile));
    setShowCustomerAuthModal(false);
  };

  const updateCustomerProfile = (data: Partial<CustomerProfile>) => {
    if (!customerUser) return;
    const updated = { ...customerUser, ...data };
    setCustomerUser(updated);
    localStorage.setItem('mlm_customer_user', JSON.stringify(updated));
  };

  const logoutCustomer = () => {
    setCustomerUser(null);
    localStorage.removeItem('mlm_customer_user');
  };

  // Admin Auth functions
  const loginStaff = (email: string, roleOverride?: UserRole): boolean => {
    const matched = staffList.find((s) => s.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setStaffUser(matched);
      localStorage.setItem('mlm_staff_user', JSON.stringify(matched));
      return true;
    }
    // If not matched directly, create temporary mock staff from demo role
    if (roleOverride) {
      const demoStaff: StaffUser = {
        uid: `staff_${roleOverride}`,
        name: `${roleOverride.toUpperCase()} User`,
        email,
        phone: '+91 99131 02050',
        role: roleOverride as StaffUser['role'],
        isActive: true,
        permissions: ['all'],
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
      setStaffUser(demoStaff);
      localStorage.setItem('mlm_staff_user', JSON.stringify(demoStaff));
      return true;
    }
    return false;
  };

  const logoutStaff = () => {
    setStaffUser(null);
    localStorage.removeItem('mlm_staff_user');
    navigateTo('/admin/login');
  };

  // Products
  const addProduct = (productData: Omit<Product, 'productId' | 'createdAt' | 'updatedAt'>) => {
    const newProd: Product = {
      ...productData,
      productId: `prod_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProd, ...prev]);
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.productId === productId ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.productId !== productId));
  };

  // IMEI Stock
  const addImeiStock = (item: Omit<ImeiStock, 'imeiId' | 'createdAt'>) => {
    const newImei: ImeiStock = {
      ...item,
      imeiId: `imei_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setImeiStock((prev) => [newImei, ...prev]);
  };

  const updateImeiStatus = (imeiId: string, status: ImeiStock['status'], customerName?: string, invoiceId?: string) => {
    setImeiStock((prev) =>
      prev.map((item) =>
        item.imeiId === imeiId
          ? {
              ...item,
              status,
              soldDate: status === 'Sold' ? new Date().toISOString().split('T')[0] : item.soldDate,
              customerName: customerName || item.customerName,
              invoiceId: invoiceId || item.invoiceId,
            }
          : item
      )
    );
  };

  // Invoices & POS
  const createInvoice = (invoiceData: Omit<Invoice, 'invoiceId' | 'invoiceNumber' | 'createdAt'>): Invoice => {
    const nextNum = invoices.length + 1083;
    const invoiceNumber = `MLM-INV-${new Date().getFullYear()}-${nextNum}`;
    const newInvoice: Invoice = {
      ...invoiceData,
      invoiceId: `inv_${Date.now()}`,
      invoiceNumber,
      createdAt: new Date().toISOString(),
    };

    // Update stock counts & IMEI statuses
    newInvoice.items.forEach((item) => {
      // Reduce product stock count
      setProducts((prev) =>
        prev.map((p) => (p.productId === item.productId ? { ...p, stockQuantity: Math.max(0, p.stockQuantity - item.quantity) } : p))
      );
      // Mark IMEI as sold if matched
      if (item.imei) {
        setImeiStock((prev) =>
          prev.map((im) =>
            im.imei1 === item.imei || im.imei2 === item.imei
              ? {
                  ...im,
                  status: 'Sold',
                  soldDate: new Date().toISOString().split('T')[0],
                  customerName: newInvoice.customerName,
                  invoiceId: invoiceNumber,
                }
              : im
          )
        );
      }
    });

    setInvoices((prev) => [newInvoice, ...prev]);
    return newInvoice;
  };

  // EMI Plans
  const createEmiPlan = (planData: Omit<EmiPlan, 'emiPlanId' | 'createdAt'>) => {
    const newPlan: EmiPlan = {
      ...planData,
      emiPlanId: `emi_plan_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setEmiPlans((prev) => [newPlan, ...prev]);
  };

  const collectEmiPayment = (planId: string, installmentNo: number, amount: number, mode: 'Cash' | 'UPI' | 'Bank Transfer') => {
    setEmiPlans((prev) =>
      prev.map((plan) => {
        if (plan.emiPlanId !== planId) return plan;
        const newPaidMonths = plan.paidMonths + 1;
        const newOutstanding = Math.max(0, plan.outstandingAmount - amount);
        const newStatus = newPaidMonths >= plan.totalMonths ? 'Closed' : 'Active';
        return {
          ...plan,
          paidMonths: newPaidMonths,
          outstandingAmount: newOutstanding,
          status: newStatus,
        };
      })
    );
  };

  // EMI Enquiries
  const submitEmiEnquiry = (enquiryData: Omit<EmiEnquiry, 'enquiryId' | 'status' | 'createdAt'>) => {
    const newEnq: EmiEnquiry = {
      ...enquiryData,
      enquiryId: `enq_${Date.now()}`,
      status: 'Under Review',
      createdAt: new Date().toISOString(),
    };
    setEmiEnquiries((prev) => [newEnq, ...prev]);
  };

  const updateEmiEnquiryStatus = (enquiryId: string, status: EmiEnquiry['status']) => {
    setEmiEnquiries((prev) =>
      prev.map((e) => (e.enquiryId === enquiryId ? { ...e, status } : e))
    );
  };

  // Repairs
  const submitRepairJob = (jobData: Omit<RepairJob, 'repairId' | 'jobNumber' | 'status' | 'createdAt' | 'updatedAt'>): RepairJob => {
    const jobNum = `JOB-${new Date().getFullYear()}-${String(repairJobs.length + 91).padStart(3, '0')}`;
    const newJob: RepairJob = {
      ...jobData,
      repairId: `rep_${Date.now()}`,
      jobNumber: jobNum,
      status: 'Received',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setRepairJobs((prev) => [newJob, ...prev]);
    return newJob;
  };

  const updateRepairStatus = (repairId: string, status: RepairJob['status'], partsUsed?: string, finalAmount?: number) => {
    setRepairJobs((prev) =>
      prev.map((j) =>
        j.repairId === repairId
          ? {
              ...j,
              status,
              partsUsed: partsUsed ?? j.partsUsed,
              finalAmount: finalAmount ?? j.finalAmount,
              updatedAt: new Date().toISOString(),
            }
          : j
      )
    );
  };

  // Expenses
  const addExpense = (expData: Omit<Expense, 'expenseId' | 'createdAt'>) => {
    const newExp: Expense = {
      ...expData,
      expenseId: `exp_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setExpenses((prev) => [newExp, ...prev]);
  };

  // Offers
  const addOffer = (offerData: Omit<Offer, 'offerId' | 'createdAt'>) => {
    const newOffer: Offer = {
      ...offerData,
      offerId: `off_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setOffers((prev) => [newOffer, ...prev]);
  };

  // Staff
  const addStaff = (staffData: Omit<StaffUser, 'uid' | 'createdAt' | 'lastLoginAt'>) => {
    const newStaff: StaffUser = {
      ...staffData,
      uid: `staff_${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    setStaffList((prev) => [...prev, newStaff]);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings, updatedAt: new Date().toISOString() };
      localStorage.setItem('mlm_settings', JSON.stringify(updated));
      return updated;
    });
  };

  // Localization helper
  const t = (key: string, hindiOverride?: string) => {
    if (language === 'hi' && hindiOverride) return hindiOverride;
    return key;
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigateTo,
        isAdminRoute,
        language,
        setLanguage,
        t,
        customerUser,
        isCustomerLoggedIn: !!customerUser,
        loginCustomerWithOtp,
        updateCustomerProfile,
        logoutCustomer,
        showCustomerAuthModal,
        setShowCustomerAuthModal,
        staffUser,
        isAdminLoggedIn: !!staffUser,
        loginStaff,
        logoutStaff,
        settings,
        updateSettings,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        imeiStock,
        addImeiStock,
        updateImeiStatus,
        invoices,
        createInvoice,
        emiPlans,
        createEmiPlan,
        collectEmiPayment,
        emiEnquiries,
        submitEmiEnquiry,
        updateEmiEnquiryStatus,
        repairJobs,
        submitRepairJob,
        updateRepairStatus,
        expenses,
        addExpense,
        offers,
        addOffer,
        staffList,
        addStaff,
        wishlist,
        toggleWishlist,
        notifications,
        markNotificationRead,
        selectedProduct,
        setSelectedProduct,
        viewingInvoice,
        setViewingInvoice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
