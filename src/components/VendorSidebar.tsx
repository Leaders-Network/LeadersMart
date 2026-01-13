'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  return (
    <aside className="self-start lg:sticky lg:top-28">
      <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
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
                className={`flex items-center gap-4 rounded-2xl border px-4 py-3 text-left transition ${
                  isActive
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-100 text-slate-700 hover:border-blue-200 hover:bg-blue-50/50'
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    isActive ? 'bg-white text-blue-600' : 'bg-slate-50 text-slate-500'
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

        <div className="mt-8 rounded-2xl bg-linear-to-r from-blue-600 to-sky-500 px-4 py-5 text-white">
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

