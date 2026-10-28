export type Language = 'en' | 'hi';

export type UserRole = 'customer' | 'owner' | 'manager' | 'cashier' | 'technician';

export interface CustomerProfile {
  uid: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  profileImageUrl?: string;
  preferredLanguage: Language;
  role: 'customer';
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string;
}

export interface StaffUser {
  uid: string;
  name: string;
  email: string;
  phone: string;
  role: 'owner' | 'manager' | 'cashier' | 'technician';
  isActive: boolean;
  permissions: string[];
  createdAt: string;
  lastLoginAt: string;
}

export interface Product {
  productId: string;
  name: string;
  brand: string;
  model: string;
  category: 'phone' | 'accessory' | 'audio' | 'wearable';
  variant: string;
  color: string;
  ram?: string;
  storage?: string;
  description: string;
  hsnCode: string;
  gstRate: number; // e.g. 18
  mrp: number;
  sellingPrice: number;
  purchasePrice: number;
  wholesalePrice?: number;
  stockQuantity: number;
  lowStockAlert: number;
  images: string[];
  barcode: string;
  isEMIAvailable: boolean;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  specs?: {
    screen?: string;
    processor?: string;
    battery?: string;
    camera?: string;
    network?: string;
  };
}

export interface ImeiStock {
  imeiId: string;
  productId: string;
  productName: string;
  brand: string;
  imei1: string;
  imei2?: string;
  serialNumber?: string;
  boxNumber?: string;
  status: 'In Stock' | 'Sold' | 'Reserved' | 'In Repair';
  purchaseDate: string;
  soldDate?: string;
  customerUid?: string;
  customerName?: string;
  invoiceId?: string;
  warrantyStartDate?: string;
  warrantyEndDate?: string;
  createdAt: string;
}

export interface InvoiceItem {
  productId: string;
  name: string;
  imei?: string;
  quantity: number;
  unitPrice: number;
  hsnCode: string;
  gstRate: number;
  taxableAmount: number;
  cgst: number;
  sgst: number;
  total: number;
}

export interface Invoice {
  invoiceId: string;
  invoiceNumber: string;
  invoiceType: 'Tax Invoice' | 'Estimate' | 'Repair Bill';
  customerUid?: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  customerGstin?: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  taxableValue: number;
  cgst: number;
  sgst: number;
  roundOff: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  paymentMode: 'Cash' | 'UPI' | 'Card' | 'Bajaj Finance' | 'IDFC First' | 'Store EMI' | 'Split';
  paymentReference?: string;
  staffUid: string;
  staffName: string;
  invoiceDate: string;
  status: 'Paid' | 'Partial' | 'Pending' | 'Cancelled';
  createdAt: string;
}

export interface EmiPlan {
  emiPlanId: string;
  invoiceId?: string;
  customerUid: string;
  customerName: string;
  customerPhone: string;
  productId: string;
  productName: string;
  imeiId?: string;
  phonePrice: number;
  downPayment: number;
  loanAmount: number;
  emiAmount: number;
  totalMonths: number;
  paidMonths: number;
  firstEmiDate: string;
  monthlyDueDate: number; // Day of month (e.g., 5th)
  emiType: 'Zero Interest (0% Scheme)' | 'Standard Finance (IDFC/Bajaj)' | 'Store Direct EMI';
  interestRate: number;
  totalPayable: number;
  outstandingAmount: number;
  status: 'Active' | 'Closed' | 'Defaulted';
  createdAt: string;
  installments?: {
    installmentNo: number;
    dueDate: string;
    amount: number;
    status: 'Paid' | 'Pending' | 'Overdue';
    paidDate?: string;
    receiptNo?: string;
  }[];
}

export interface EmiPayment {
  paymentId: string;
  emiPlanId: string;
  customerUid: string;
  customerName: string;
  installmentNumber: number;
  dueDate: string;
  paidDate: string;
  amount: number;
  paidAmount: number;
  lateFee: number;
  paymentMode: 'Cash' | 'UPI' | 'Bank Transfer';
  paymentReference?: string;
  status: 'Completed' | 'Pending';
  collectedByUid: string;
  collectedByName: string;
  receiptNumber: string;
  createdAt: string;
}

export interface EmiEnquiry {
  enquiryId: string;
  customerUid?: string;
  customerName: string;
  mobileNumber: string;
  productId: string;
  productName: string;
  monthlyIncome: number;
  employmentType: 'Salaried' | 'Self-Employed' | 'Business' | 'Student';
  preferredDownPayment: number;
  preferredTenure: number;
  aadhaarAvailable: boolean;
  panAvailable: boolean;
  bankAccountAvailable: boolean;
  remarks?: string;
  status: 'Under Review' | 'Verified' | 'Approved' | 'Ready for Pickup' | 'Rejected';
  createdAt: string;
}

export interface RepairJob {
  repairId: string;
  jobNumber: string;
  customerUid?: string;
  customerName: string;
  customerPhone: string;
  phoneBrand: string;
  phoneModel: string;
  imei?: string;
  problem: string;
  accessoriesReceived?: string;
  estimatedCost: number;
  advancePaid: number;
  technicianUid?: string;
  technicianName?: string;
  expectedDeliveryDate: string;
  status: 'Received' | 'Diagnosing' | 'Waiting for Parts' | 'In Repair' | 'Ready' | 'Delivered' | 'Cancelled';
  partsUsed?: string;
  finalAmount?: number;
  repairInvoiceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  expenseId: string;
  category: 'Rent' | 'Electricity' | 'Staff Salary' | 'Tea & Refreshment' | 'Marketing' | 'Tools & Parts' | 'Maintenance' | 'Miscellaneous';
  amount: number;
  description: string;
  paymentMode: 'Cash' | 'UPI' | 'Bank';
  expenseDate: string;
  addedByUid: string;
  addedByName: string;
  createdAt: string;
}

export interface Offer {
  offerId: string;
  title: string;
  badge: string;
  description: string;
  discountValue: string;
  bannerImageUrl: string;
  category: string;
  validTill: string;
  isActive: boolean;
  createdAt: string;
}

export interface AppSettings {
  settingsId: string;
  shopName: string;
  tagline: string;
  shopAddress: string;
  shopPhone: string;
  shopEmail: string;
  gstin: string;
  upiId: string;
  logoUrl?: string;
  primaryColor: string;
  mobileBrands: string[];
  emiPartners: string[];
  showZeroEmiBanner: boolean;
  maintenanceMode: boolean;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  targetUid: string;
  title: string;
  message: string;
  type: 'emi' | 'repair' | 'offer' | 'system';
  isRead: boolean;
  createdAt: string;
}
