import React from 'react';
import { Home, Smartphone, Calculator, Percent, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomerBottomNav: React.FC = () => {
  const { currentPath, navigateTo, isCustomerLoggedIn, setShowCustomerAuthModal, t } = useApp();

  const navItems = [
    { label: t('Home', 'होम'), path: '/', icon: Home },
    { label: t('Phones', 'फोन'), path: '/phones', icon: Smartphone },
    { label: t('EMI Calc', 'ईएमआई'), path: '/emi-calculator', icon: Calculator },
    { label: t('Offers', 'ऑफ़र्स'), path: '/offers', icon: Percent },
    {
      label: isCustomerLoggedIn ? t('Account', 'खाता') : t('Login', 'लॉग इन'),
      path: '/my-account',
      icon: User,
      action: () => {
        if (isCustomerLoggedIn) {
          navigateTo('/my-account');
        } else {
          setShowCustomerAuthModal(true);
        }
      },
    },
  ];

  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => {
                if (item.action) {
                  item.action();
                } else {
                  navigateTo(item.path);
                }
              }}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition ${
                isActive
                  ? 'text-rose-600 font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[60px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
