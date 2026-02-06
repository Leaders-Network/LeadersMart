'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

type NavLink = {
  href: string;
  label: string;
  description: string;
  icon: ReactNode;
};

const navLinks: NavLink[] = [
  {
    href: '/vendor/dashboard',
    label: 'Dashboard',
    description: 'Overview & KPIs',
    icon: <DashboardIcon />,
  },
  {
    href: '/vendor/analytics',
    label: 'Analytics',
    description: 'Trends & insights',
    icon: <AnalyticsIcon />,
  },
  {
    href: '/vendor/orders',
    label: 'Orders',
    description: 'Fulfilment queue',
    icon: <OrdersIcon />,
  },
  {
    href: '/vendor/products',
    label: 'Products',
    description: 'Catalog manager',
    icon: <ProductsIcon />,
  },
  {
    href: '/vendor/settings',
    label: 'Settings',
    description: 'Team & billing',
    icon: <SettingsIcon />,
  },
];

export default function VendorSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        {/* User Info */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user?.businessName?.charAt(0).toUpperCase() || 'V'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.businessName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.contactName}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-600">Vendor</p>
          <h2 className="text-2xl font-bold text-slate-900">Navigation</h2>
        </div>

        <nav className="space-y-2">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 rounded-2xl border px-4 py-3 text-left transition ${isActive
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-100 text-slate-700 hover:border-blue-200 hover:bg-blue-50/50'
                  }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${isActive ? 'bg-white text-blue-600' : 'bg-slate-50 text-slate-500'
                    }`}
                >
                  {item.icon}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className="text-xs text-slate-500">{item.description}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={logout}
            className="flex items-center gap-4 rounded-2xl border border-red-200 px-4 py-3 text-left transition hover:border-red-300 hover:bg-red-50 w-full"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <LogoutIcon />
            </span>
            <span>
              <span className="block text-sm font-semibold text-red-700">Sign Out</span>
              <span className="text-xs text-red-500">End your session</span>
            </span>
          </button>
        </div>

        <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-5 text-white">
          <p className="text-sm font-semibold">Need help?</p>
          <p className="text-xs text-blue-100">Chat with a vendor specialist 24/7.</p>
          <Link href="/help" className="mt-3 inline-flex text-sm font-semibold text-white underline-offset-2 hover:underline">
            Contact support →
          </Link>
        </div>
      </div>
    </aside>
  );
}

function DashboardIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 13h6V3H3v10zm0 8h6v-6H3v6zm8 0h10V11H11v10zm0-18v6h10V3H11z" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 19h16M5 15l3-6 4 8 3-5 4 7" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h12" />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7l8-4 8 4-8 4-8-4zm0 6l8 4 8-4m-8 4v6" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 15a3 3 0 100-6 3 3 0 000 6zm7.03-3a7.031 7.031 0 01-.11 1.23l2.11 1.65a.5.5 0 01.12.63l-2 3.46a.5.5 0 01-.6.21l-2.49-1a7.086 7.086 0 01-1.07.62l-.38 2.65a.5.5 0 01-.5.43h-4a.5.5 0 01-.5-.43l-.38-2.65a7.086 7.086 0 01-1.07-.62l-2.49 1a.5.5 0 01-.6-.21l-2-3.46a.5.5 0 01.12-.63l2.11-1.65A7.031 7.031 0 014.97 12c0-.41.04-.81.11-1.23L3 9.12a.5.5 0 01-.12-.63l2-3.46a.5.5 0 01.6-.21l2.49 1a7.086 7.086 0 011.07-.62l.38-2.65A.5.5 0 0112 3h4a.5.5 0 01.5.43l.38 2.65c.37.17.73.38 1.07.62l2.49-1a.5.5 0 01.6.21l2 3.46a.5.5 0 01-.12.63l-2.11 1.65c.07.42.11.82.11 1.23z"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5-5-5m5 5H9" />
    </svg>
  );
}

