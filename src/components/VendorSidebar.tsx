'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Brand from './Brand';

const navItems = [
  { label: 'Overview', href: '/seller/dashboard', badge: null, icon: 'grid' },
  { label: 'Orders', href: '/seller/dashboard/orders', badge: 12, icon: 'box' },
  { label: 'Products', href: '/seller/dashboard/products', badge: null, icon: 'tag' },
  { label: 'Inventory', href: '/seller/dashboard/inventory', badge: 3, icon: 'archive' },
  { label: 'Analytics', href: '/seller/dashboard/analytics', badge: null, icon: 'chart' },
  { label: 'Promotions', href: '/seller/dashboard/promotions', badge: null, icon: 'percent' },
  { label: 'Payouts', href: '/seller/dashboard/payouts', badge: null, icon: 'dollar' },
  { label: 'Messages', href: '/seller/dashboard/messages', badge: 4, icon: 'message' },
];

function NavIcon({ type }: { type: string }) {
  const props = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (type) {
    case 'grid': return <svg {...props}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case 'box': return <svg {...props}><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
    case 'tag': return <svg {...props}><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>;
    case 'archive': return <svg {...props}><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>;
    case 'chart': return <svg {...props}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
    case 'percent': return <svg {...props}><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>;
    case 'dollar': return <svg {...props}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>;
    case 'message': return <svg {...props}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
    default: return null;
  }
}

export default function VendorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] shrink-0 hidden lg:flex flex-col bg-white border-r min-h-screen" style={{ borderColor: '#E6E8F1' }}>
      {/* Brand */}
      <div className="px-5 py-5 border-b" style={{ borderColor: '#E6E8F1' }}>
        <Brand variant="dark" showSellerCenter href="/seller/dashboard" />
      </div>

      {/* Store card */}
      <div className="mx-3 mt-4 px-3 py-3 rounded-xl" style={{ background: '#F7F8FC', border: '1px solid #E6E8F1' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[13px] font-700 shrink-0" style={{ background: '#4353EC', fontWeight: 700 }}>
            NT
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-600 text-[#171C36] truncate" style={{ fontWeight: 600 }}>Nova Tech</div>
            <div className="flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="#167A59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="#167A59" strokeWidth="2"/>
              </svg>
              <span className="text-[10px]" style={{ color: '#167A59' }}>Verified seller</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="px-3 mt-5">
        <span className="text-[10px] font-700 tracking-widest px-2 mb-2 block" style={{ color: '#9DA3B4', fontWeight: 700 }}>
          YOUR WORKSPACE
        </span>
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/seller/dashboard' && pathname === '/seller/dashboard');
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-500 transition-colors"
                style={{
                  fontWeight: 500,
                  background: isActive ? '#EEEDFF' : 'transparent',
                  color: isActive ? '#4353EC' : '#6F7489',
                }}
              >
                <span style={{ color: isActive ? '#4353EC' : '#9DA3B4' }}>
                  <NavIcon type={item.icon} />
                </span>
                <span className="flex-1">{item.label}</span>
                {item.badge !== null && (
                  <span
                    className="text-[10px] font-700 px-1.5 py-0.5 rounded-full"
                    style={{
                      background: isActive ? '#4353EC' : '#E6E8F1',
                      color: isActive ? 'white' : '#6F7489',
                      fontWeight: 700,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Divider + extra links */}
      <div className="px-3 mt-4 pt-4 border-t" style={{ borderColor: '#E6E8F1' }}>
        {[
          { label: 'Store settings', href: '/seller/dashboard/settings', icon: 'settings' },
          { label: 'View storefront', href: '/', icon: 'external' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] hover:bg-gray-50 transition-colors"
            style={{ color: '#6F7489' }}
          >
            {item.icon === 'settings' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            )}
            {item.label}
          </Link>
        ))}
      </div>

      {/* Help card */}
      <div className="mx-3 mt-4 p-3 rounded-xl" style={{ background: '#EEEDFF' }}>
        <p className="text-[13px] font-600 text-[#171C36] mb-0.5" style={{ fontWeight: 600 }}>A little help to grow.</p>
        <p className="text-[12px] mb-2" style={{ color: '#6F7489' }}>Tips, guides, and real people on your side.</p>
        <a href="#" className="text-[12px] font-600" style={{ color: '#4353EC', fontWeight: 600 }}>Visit seller resources →</a>
      </div>

      {/* Profile */}
      <div className="mt-auto px-3 pb-4 pt-4 border-t" style={{ borderColor: '#E6E8F1' }}>
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-700 shrink-0" style={{ background: '#4353EC', fontWeight: 700 }}>
            JL
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-600 text-[#171C36] truncate" style={{ fontWeight: 600 }}>Jordan Lee</div>
            <div className="text-[11px]" style={{ color: '#9DA3B4' }}>Store owner</div>
          </div>
          <button className="hover:opacity-70" aria-label="Sign out">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9DA3B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
