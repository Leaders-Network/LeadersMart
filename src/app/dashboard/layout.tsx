'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';

type NavIconName = 'schedule' | 'orders' | 'products' | 'detail';

const navItems: { label: string; href: string; icon: NavIconName }[] = [
  { label: 'Schedule', href: '/dashboard/schedule', icon: 'schedule' },
  { label: 'Orders', href: '/dashboard/orders', icon: 'orders' },
  { label: 'Products', href: '/dashboard/products', icon: 'products' },
  { label: 'Product detail', href: '/dashboard/products/running-sneakers', icon: 'detail' },
];

function NavIcon({ name }: { name: NavIconName }) {
  const common = 'h-[18px] w-[18px]';

  if (name === 'schedule') {
    return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3.5" y="5" width="17" height="16" rx="2.5" /><path strokeLinecap="round" d="M7.5 3v4M16.5 3v4M4 9.5h16M8 13h2m4 0h2m-8 4h2" /></svg>;
  }
  if (name === 'orders') {
    return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 4.5h14v16H5zM8 8h8M8 12h8M8 16h5" /><path strokeLinecap="round" d="M8 4.5V3m8 1.5V3" /></svg>;
  }
  if (name === 'products') {
    return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m12 3 8.5 4.5v9L12 21l-8.5-4.5v-9L12 3Z" /><path strokeLinecap="round" strokeLinejoin="round" d="m3.8 7.7 8.2 4.5 8.2-4.5M12 12.2V21" /></svg>;
  }
  return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v16H6.5A2.5 2.5 0 0 1 4 17.5v-11Z" /><path strokeLinecap="round" d="M4 7h3v10H4m7-8h5m-5 4h5" /></svg>;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#f7f5fb] px-4 py-5 md:px-6 md:py-7">
        <div className="mx-auto grid max-w-[1600px] items-start gap-5 xl:grid-cols-[250px_minmax(0,1fr)] xl:gap-6">
          <aside className="rounded-[22px] border border-[#eee8f7] bg-white p-3 shadow-[0_8px_28px_rgba(47,25,85,0.06)] xl:sticky xl:top-[166px]">
            <div className="mb-3 flex items-center gap-3 px-3 py-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-linear-to-br from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-200">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4 19V9m5 10V5m5 14v-7m5 7V3" /></svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-600">Workspace</p>
                <p className="mt-0.5 text-base font-semibold text-slate-800">Store management</p>
              </div>
            </div>

            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Manage</p>
            <nav aria-label="Dashboard navigation" className="flex gap-1 overflow-x-auto pb-1 xl:flex-col xl:gap-1 xl:overflow-visible">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group flex min-w-max items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors xl:w-full ${
                      isActive
                        ? 'bg-violet-600 text-white shadow-[0_6px_16px_rgba(124,58,237,0.22)]'
                        : 'text-slate-600 hover:bg-violet-50 hover:text-violet-700'
                    }`}
                  >
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${isActive ? 'bg-white/15' : 'bg-slate-50 text-slate-500 group-hover:bg-white group-hover:text-violet-600'}`}>
                      <NavIcon name={item.icon} />
                    </span>
                    {item.label}
                    {isActive && <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-white xl:block" />}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-5 hidden rounded-2xl bg-[#f7f3ff] p-4 xl:block">
              <p className="text-sm font-semibold text-slate-800">Need a hand?</p>
              <p className="mt-1 text-sm leading-5 text-slate-500">Visit the help center for support with your store.</p>
              <Link href="/help" className="mt-3 inline-flex text-sm font-semibold text-violet-700 hover:text-violet-900">Get support <span aria-hidden="true" className="ml-1">→</span></Link>
            </div>
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
