import React, { useState } from 'react';
import {
  User,
  Heart,
  Zap,
  Wrench,
  Bell,
  Percent,
  LogOut,
  Edit2,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Trash2,
  Eye,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomerAccountView: React.FC = () => {
  const {
    customerUser,
    updateCustomerProfile,
    logoutCustomer,
    emiEnquiries,
    repairJobs,
    products,
    wishlist,
    toggleWishlist,
    setSelectedProduct,
    notifications,
    markNotificationRead,
    offers,
    language,
    setLanguage,
    navigateTo,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'emi' | 'repairs' | 'wishlist' | 'notifications' | 'offers'
  >('profile');

  // Edit Profile States
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(customerUser?.name || '');
  const [editAddress, setEditAddress] = useState(customerUser?.address || '');
  const [editEmail, setEditEmail] = useState(customerUser?.email || '');

  if (!customerUser) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-800">
          {t('Please login to view your account', 'कृपया अपने खाते को देखने के लिए लॉगिन करें')}
        </h3>
        <p className="text-xs text-slate-500 mt-2">
          Track your EMI approvals, repair progress, and wishlist items.
        </p>
        <button
          onClick={() => navigateTo('/login')}
          className="mt-6 px-6 py-2.5 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md"
        >
          {t('Login with Mobile OTP', 'मोबाइल OTP से लॉगिन')}
        </button>
      </div>
    );
  }

  // Filtered customer items
  const myEnquiries = emiEnquiries.filter(
    (e) =>
      (e.customerUid && e.customerUid === customerUser.uid) ||
      e.mobileNumber.replace(/\D/g, '') === customerUser.phone.replace(/\D/g, '')
  );

  const myRepairs = repairJobs.filter(
    (r) =>
      (r.customerUid && r.customerUid === customerUser.uid) ||
      r.customerPhone.replace(/\D/g, '') === customerUser.phone.replace(/\D/g, '')
  );

  const myWishlistProducts = products.filter((p) => wishlist.includes(p.productId));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile({
      name: editName,
      address: editAddress,
      email: editEmail,
    });
    setIsEditing(false);
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-rose-600/20">
              {customerUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {customerUser.name}
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Verified Customer
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5 font-medium">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{customerUser.phone}</span>
                <span>•</span>
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Surat, Gujarat</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => {
                logoutCustomer();
                navigateTo('/');
              }}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('Logout', 'लॉग आउट')}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'profile', label: t('My Profile', 'मेरी प्रोफाइल'), icon: User },
            { id: 'emi', label: t(`EMI Enquiries (${myEnquiries.length})`, `ईएमआई आवेदन (${myEnquiries.length})`), icon: Zap },
            { id: 'repairs', label: t(`Repair Tickets (${myRepairs.length})`, `रिपेयर टिकट (${myRepairs.length})`), icon: Wrench },
            { id: 'wishlist', label: t(`Wishlist (${myWishlistProducts.length})`, `विशलिस्ट (${myWishlistProducts.length})`), icon: Heart },
            { id: 'notifications', label: t(`Notifications (${notifications.length})`, `सूचनाएं (${notifications.length})`), icon: Bell },
            { id: 'offers', label: t('Store Offers', 'स्टोर ऑफ़र्स'), icon: Percent },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENTS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs text-left">
          
          {/* TAB 1: Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Personal Information</h3>
                  <p className="text-xs text-slate-500">Managed for invoices and store communication</p>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => {
                      setEditName(customerUser.name);
                      setEditAddress(customerUser.address);
                      setEditEmail(customerUser.email || '');
                      setIsEditing(true);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Street Address</label>
                    <input
                      type="text"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Mobile</span>
                    <span className="font-extrabold text-slate-900 text-sm">{customerUser.phone}</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Address</span>
                    <span className="font-semibold text-slate-800 text-xs">{customerUser.address}</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">City & State</span>
                    <span className="font-semibold text-slate-800 text-xs">Surat, Gujarat - 395012</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Language</span>
                    <span className="font-semibold text-slate-800 text-xs">
                      {language === 'hi' ? 'हिंदी (Hindi)' : 'English'}
                    </span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Account Role</span>
                    <span className="font-bold text-rose-600 text-xs">Store Customer</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EMI Enquiries */}
          {activeTab === 'emi' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-900">Your EMI Applications</h3>
                <button
                  onClick={() => navigateTo('/emi-calculator')}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  + New EMI Calculator
                </button>
              </div>

              {myEnquiries.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No EMI applications submitted yet. Browse phones and tap "Apply for EMI".
                </div>
              ) : (
                <div className="space-y-3">
                  {myEnquiries.map((enq) => (
                    <div
                      key={enq.enquiryId}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-slate-900 text-sm">{enq.productName}</h4>
                          <span
                            className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                              enq.status === 'Approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : enq.status === 'Ready for Pickup'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {enq.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-3">
                          <span>Down Payment: <strong>₹{enq.preferredDownPayment.toLocaleString('en-IN')}</strong></span>
                          <span>Tenure: <strong>{enq.preferredTenure} Months</strong></span>
                          <span>Income: <strong>₹{enq.monthlyIncome.toLocaleString('en-IN')}</strong></span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">{new Date(enq.createdAt).toLocaleDateString()}</span>
                        <a
                          href={`https://wa.me/919913102050?text=Hi, regarding my EMI application for ${enq.productName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-xs font-bold text-emerald-700 hover:underline"
                        >
                          Chat on WhatsApp
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Repair Tickets */}
          {activeTab === 'repairs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-900">Your Repair Job Cards</h3>
                <button
                  onClick={() => navigateTo('/repair-enquiry')}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  + Book New Repair
                </button>
              </div>

              {myRepairs.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No repair jobs on record for this mobile number.
                </div>
              ) : (
                <div className="space-y-3">
                  {myRepairs.map((rep) => (
                    <div
                      key={rep.repairId}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold bg-slate-900 text-amber-400 px-2 py-0.5 rounded">
                            {rep.jobNumber}
                          </span>
                          <h4 className="font-extrabold text-slate-900 text-sm">
                            {rep.phoneBrand} {rep.phoneModel}
                          </h4>
                          <span
                            className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                              rep.status === 'Ready'
                                ? 'bg-emerald-100 text-emerald-800'
                                : rep.status === 'In Repair'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-200 text-slate-800'
                            }`}
                          >
                            {rep.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1"><strong>Problem:</strong> {rep.problem}</p>
                        <div className="text-xs text-slate-500 mt-1 flex gap-4">
                          <span>Est. Cost: <strong>₹{rep.estimatedCost}</strong></span>
                          <span>Advance: <strong>₹{rep.advancePaid}</strong></span>
                          {rep.partsUsed && <span>Parts: <strong>{rep.partsUsed}</strong></span>}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">
                          Expected: {new Date(rep.expectedDeliveryDate).toLocaleDateString()}
                        </span>
                        <span className="text-xs font-semibold text-rose-600">
                          {rep.status === 'Ready' ? '🎉 Ready for pickup at store!' : 'Technician working'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Wishlist */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
                Saved Devices & Accessories
              </h3>

              {myWishlistProducts.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  Your wishlist is empty. Tap the heart icon on any phone to save it.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myWishlistProducts.map((p) => (
                    <div
                      key={p.productId}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex gap-4 items-center justify-between"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-white"
                      />
                      <div className="flex-1 min-w-0 text-left">
                        <h4 className="font-extrabold text-slate-900 text-xs truncate">{p.name}</h4>
                        <span className="text-sm font-black text-rose-600 block mt-0.5">
                          ₹{p.sellingPrice.toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => setSelectedProduct(p)}
                          className="text-[11px] font-bold text-slate-700 hover:text-rose-600 mt-1 cursor-pointer"
                        >
                          View Details & EMI
                        </button>
                      </div>
                      <button
                        onClick={() => toggleWishlist(p.productId)}
                        className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
                Customer Notifications
              </h3>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-4 rounded-2xl border transition text-left cursor-pointer ${
                      n.isRead ? 'bg-slate-50 border-slate-200' : 'bg-rose-50/60 border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 text-xs">{n.title}</h4>
                      <span className="text-[10px] text-slate-400">{n.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Store Offers */}
          {activeTab === 'offers' && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
                Active Store Offers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {offers.map((off) => (
                  <div key={off.offerId} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left">
                    <span className="text-[10px] font-black uppercase text-rose-600 bg-rose-100 px-2 py-0.5 rounded">
                      {off.badge}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-sm mt-2">{off.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{off.description}</p>
                    <div className="mt-3 pt-2 border-t border-slate-200 flex justify-between text-xs">
                      <span className="font-black text-emerald-600">{off.discountValue}</span>
                      <span className="text-slate-400">Valid: {off.validTill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
