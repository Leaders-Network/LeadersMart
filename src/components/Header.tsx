'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import Brand from './Brand';

export default function Header() {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50" style={{ boxShadow: '0 1px 0 #E6E8F1' }}>
      {/* Announcement strip */}
      <div className="text-white text-[12px] font-medium py-2 px-4" style={{ background: 'linear-gradient(90deg, #3658ED 0%, #8644E4 100%)' }}>
        <div className="max-w-[1312px] mx-auto flex justify-between items-center">
          <span>A little extra joy: free delivery on orders ₦50+</span>
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/seller/register" className="flex items-center gap-1 hover:opacity-80">
              Become a seller
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <span className="opacity-40">·</span>
            <Link href="#" className="hover:opacity-80">Help center</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-[1312px] mx-auto px-4 lg:px-0 py-3.5 flex items-center gap-4 lg:gap-6">
        <Brand variant="dark" />

        {/* Search */}
        <div className="flex-1 hidden md:flex items-center relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for keyboards, headphones, everyday upgrades…"
            className="w-full h-11 pl-4 pr-24 rounded-xl border text-[14px] outline-none focus:border-[#4353EC] text-[#171C36] placeholder:text-[#9DA3B4]"
            style={{ background: '#F7F8FC', border: '1.5px solid #E6E8F1' }}
          />
          <button
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-4 rounded-lg text-white text-[13px] font-600"
            style={{ background: '#4353EC', fontWeight: 600 }}
          >
            Search
          </button>
        </div>

        {/* Account + Cart */}
        <div className="flex items-center gap-4 ml-auto md:ml-0">
          <Link href="/orders" className="hidden sm:flex items-center gap-1.5 hover:opacity-80">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="#171C36" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[13px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>Orders</span>
          </Link>

          <Link href="/sign-in" className="hidden sm:flex flex-col items-end leading-tight">
            <span className="text-[11px] text-[#6F7489]">Hello, shopper</span>
            <span className="text-[13px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>Sign in / Register</span>
          </Link>

          <Link href="/cart" className="flex items-center gap-1.5 relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#171C36" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="3" y1="6" x2="21" y2="6" stroke="#171C36" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M16 10a4 4 0 01-8 0" stroke="#171C36" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[13px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>Cart</span>
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-700 text-white"
              style={{ background: '#4353EC', fontWeight: 700, minWidth: 20 }}
            >
              {totalItems}
            </span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="#171C36" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Category nav */}
      <div className="border-t hidden md:block" style={{ borderColor: '#E6E8F1' }}>
        <div className="max-w-[1312px] mx-auto px-4 lg:px-0 flex items-center gap-0">
          <button
            className="flex items-center gap-1.5 text-[13px] font-600 text-[#171C36] px-4 py-3 border-r hover:text-[#4353EC]"
            style={{ borderColor: '#E6E8F1', fontWeight: 600 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
            All categories
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {[
            { label: 'Flash sales', href: '#flash-sales' },
            { label: 'Tech & gadgets', href: '/categories/tech-gadgets' },
            { label: 'Home & living', href: '/categories/home-living' },
            { label: 'Style & accessories', href: '/categories/style-accessories' },
            { label: 'New arrivals', href: '#' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] text-[#6F7489] px-4 py-3 hover:text-[#4353EC] whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/seller/sign-in"
            className="ml-auto text-[13px] font-600 flex items-center gap-1 px-4 py-3 hover:opacity-80"
            style={{ color: '#4353EC', fontWeight: 600 }}
          >
            Seller center
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white" style={{ borderColor: '#E6E8F1' }}>
          <div className="p-4">
            <input
              type="text"
              placeholder="Search for products…"
              className="w-full h-10 px-3 rounded-lg border text-[14px] outline-none mb-3"
              style={{ background: '#F7F8FC', border: '1.5px solid #E6E8F1' }}
            />
            <div className="flex flex-col gap-1">
              {['Flash sales', 'Tech & gadgets', 'Home & living', 'Style & accessories', 'New arrivals'].map((item) => (
                <button
                  key={item}
                  className="text-left text-[14px] text-[#171C36] py-2 border-b"
                  style={{ borderColor: '#E6E8F1' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </button>
              ))}
              <Link
                href="/sign-in"
                className="text-[14px] font-600 text-[#4353EC] py-2 mt-1"
                style={{ fontWeight: 600 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign in / Register
              </Link>
              <Link
                href="/orders"
                className="text-[14px] font-600 text-[#4353EC] py-1"
                style={{ fontWeight: 600 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                My orders
              </Link>
              <Link
                href="/seller/sign-in"
                className="text-[14px] font-600 text-[#4353EC] py-1"
                style={{ fontWeight: 600 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Seller center ↗
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
