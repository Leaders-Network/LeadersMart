'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Roboto } from 'next/font/google';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/categories';

/* The template uses Roboto at 400 weight everywhere */
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

/* Full-width wrapper: 15px side padding, exactly like the template */
const WRAP = 'mx-auto w-full max-w-[1920px] px-[15px]';

const RED = 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent';
const RED_BG = 'bg-[#ff3b4e]';

type NavItem = { label: string; href: string; hasDropdown?: boolean };

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/categories', hasDropdown: true },
  { label: "Today's Deals", href: '/deals' },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Blog', href: '/blog', hasDropdown: true },
  { label: 'Help', href: '/help' },
  { label: 'About Us', href: '/about' },
];

/* ------------------------------- icons ---------------------------------- */

function Caret({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-2 h-1 shrink-0 ${className}`} viewBox="0 0 10 5" fill="currentColor" aria-hidden="true">
      <path d="M0 0h10L5 5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className={`w-[14px] h-[14px] ${RED}`} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className={`w-[14px] h-[14px] ${RED}`} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h2.3a1 1 0 01.95.68l1.1 3.3a1 1 0 01-.5 1.2l-1.5.75a11 11 0 005.4 5.4l.75-1.5a1 1 0 011.2-.5l3.3 1.1a1 1 0 01.68.95V19a2 2 0 01-2 2A16 16 0 013 5z"
      />
    </svg>
  );
}

function UKFlag() {
  return (
    <svg className="w-4 h-[11px]" viewBox="0 0 60 40" aria-hidden="true">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#c8102e" strokeWidth="3" />
      <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="13" />
      <path d="M30 0v40M0 20h60" stroke="#c8102e" strokeWidth="8" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function BasketIcon() {
  return (
    <svg className="w-[26px] h-[26px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 32 32" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h26l-2.5 14a2 2 0 01-2 1.6H7.5a2 2 0 01-2-1.6L3 12z" />
      <path strokeLinecap="round" d="M10 12l4-7M22 12l-4-7M11 17v6M16 17v6M21 17v6" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20.5s-7.5-4.6-9.3-9.3C1.5 8 3.4 4.8 6.6 4.8c1.9 0 3.6 1 4.6 2.6l.8 1.2.8-1.2c1-1.6 2.7-2.6 4.6-2.6 3.2 0 5.1 3.2 3.9 6.4-1.8 4.7-9.3 9.3-9.3 9.3z"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-[26px] h-[26px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="13" cy="10" r="5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 27c0-5.5 4.5-9 10-9 2 0 3.8.5 5.3 1.3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 24l3 3 6-6" />
    </svg>
  );
}

function LogoMark() {
  return (
    <svg className="w-[31px] h-[45px] text-[#2f2e4a]" viewBox="0 0 36 44" fill="currentColor" aria-hidden="true">
      <path d="M18 2c6 4 9.5 11 9.5 19 0 3-.6 5.6-1.6 8H10.1c-1-2.4-1.6-5-1.6-8C8.5 13 12 6 18 2z" />
      <circle cx="18" cy="16" r="4" fill="white" />
      <path d="M8 22l-5 8 7-1zM28 22l5 8-7-1z" />
      <path stroke="#ff3b4e" strokeWidth="2" strokeLinecap="round" d="M13 36v6M18 36v7M23 36v6" />
    </svg>
  );
}

/* ------------------------------ component ------------------------------- */

export default function Header() {
  const { totalItems } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  // TODO: connect to a wishlist context when you have one
  const wishlistCount = 0;

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (category) params.set('category', category);
    router.push(`/search?${params.toString()}`);
  };

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className={`${roboto.className} sticky top-0 z-50 bg-white text-[#222]`}>
      {/* ============================ TOP BAR ============================ */}
      {/* 46px tall grey strip, text row sits at the top (34px) like the template */}
      <div className="hidden md:block h-[46px] bg-[#f8f8f8] text-[13px] leading-none text-[#222]">
        <div className={`${WRAP} h-[34px] flex items-center justify-between`}>
          <div className="flex items-center gap-6">
            <span>Welcome to our online store!</span>

            <a href="mailto:design@domain.com" className="flex items-center gap-1 hover:text-[#ff3b4e] transition-colors">
              <MailIcon />
              <span className="ml-0.5">Email: design@domain.com</span>
            </a>

            <a href="tel:+8884344600" className="hidden lg:flex items-center gap-1 hover:text-[#ff3b4e] transition-colors">
              <PhoneIcon />
              <span className="ml-1">Hotline: (888) 4344 6000 - (888) 1338 8193</span>
            </a>
          </div>

          <div className="flex items-center gap-[17px]">
            <button type="button" className="flex items-center gap-1.5 hover:text-[#ff3b4e] transition-colors">
              <UKFlag />
              <span>English</span>
              <Caret />
            </button>
            <button type="button" className="flex items-center gap-1.5 hover:text-[#ff3b4e] transition-colors">
              <span>$ US Dollar</span>
              <Caret />
            </button>
          </div>
        </div>
      </div>

      {/* ============================ MAIN ROW =========================== */}
      <div className="border-b border-[#e8e8e8]">
        <div className={`${WRAP} flex items-center h-[72px] md:h-[116px]`}>
          {/* Logo (its column is 301px wide on desktop so the search starts at the template position) */}
          <Link href="/" aria-label="ShopHub home" className="shrink-0 flex items-center gap-[6px] lg:w-[clamp(240px,22vw,301px)]">
            <LogoMark />
            <span className="text-[36px] leading-none font-black tracking-[-0.02em]">
              <span className={RED}>Leaders</span>
              <span className="text-[#2f2e4a]">Mart</span>
            </span>
          </Link>

          {/* Search pill: 514 x 44 */}
          <form
            onSubmit={handleSearch}
            role="search"
            className="hidden md:flex md:ml-6 lg:ml-0 shrink w-[clamp(320px,37.6vw,514px)] h-[44px] rounded-full border-2 border-[#2563eb] overflow-hidden bg-white"
          >
            <div className="relative w-[35%] min-w-[130px] shrink-0 border-r border-[#e5e5e5] my-[2px]">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="Search category"
                className="appearance-none w-full h-full bg-transparent pl-[14px] pr-8 text-[13px] text-[#333] outline-none cursor-pointer"
              >
                <option value="">All Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
              <Caret className="text-[#999] absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 min-w-0 px-[20px] text-[14px] text-[#333] placeholder-[#999] outline-none"
            />

            <button
              type="submit"
              aria-label="Search"
              className={`w-[68px] shrink-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center hover:bg-[#e62e41] transition-colors`}
            >
              <SearchIcon />
            </button>
          </form>

          {/* Cart / Wish list / Account */}
          <div className="ml-auto flex items-center gap-5 lg:gap-[34px] lg:pr-[clamp(0px,2vw,28px)] text-[14px]">
            {/* Cart */}
            <Link href="/cart" className="relative flex items-center gap-3 hover:text-[#ff3b4e] transition-colors">
              <BasketIcon />
              {/* small badge on icon (below lg) */}
              <span
                className={`lg:hidden absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full ${RED_BG} text-white text-[11px] font-medium flex items-center justify-center`}
              >
                {totalItems}
              </span>
              {/* badge above text (lg and up) */}
              <span className="hidden lg:flex flex-col items-start gap-[3px] pt-[2px]">
                <span
                  className={`min-w-[27px] h-[17px] px-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-[11px] font-medium leading-none flex items-center justify-center`}
                >
                  {totalItems}
                </span>
                <span className="leading-[20px] text-[#222]">Your cart</span>
              </span>
            </Link>

            {/* Wish list */}
            <Link href="/wishlist" className="hidden sm:flex items-center gap-[15px] hover:text-[#ff3b4e] transition-colors">
              <HeartIcon />
              <span className="hidden lg:inline whitespace-nowrap">Wish List ({wishlistCount})</span>
            </Link>

            {/* Account */}
            <div className="hidden sm:flex items-center gap-[15px]">
              <UserIcon />
              <div className="hidden lg:flex flex-col leading-[20px] whitespace-nowrap">
                <span className="text-[13px] leading-[18px]">Hello Guest</span>
                <span>
                  <Link href="/login" className="hover:text-[#ff3b4e] transition-colors">Login</Link>
                  <span className="mx-2.5">/</span>
                  <Link href="/signup" className="hover:text-[#ff3b4e] transition-colors">Register</Link>
                </span>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="lg:hidden p-1"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <form onSubmit={handleSearch} className="md:hidden px-4 py-3 border-b border-[#e8e8e8]">
        <div className="flex h-10 rounded-full border-2 border-[#ff3b4e] overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 min-w-0 px-4 text-sm outline-none"
          />
          <button type="submit" aria-label="Search" className={`w-12 ${RED_BG} text-white flex items-center justify-center`}>
            <SearchIcon />
          </button>
        </div>
      </form>

      {/* ========================== NAVIGATION ROW ======================= */}
      <div className="hidden lg:block border-b border-[#e8e8e8]">
        <div className={`${WRAP} h-[40px] flex items-stretch`}>
          {/* All Categories box: 270px wide, red underline */}
          <div className="relative group w-[clamp(210px,19.8vw,270px)] shrink-0">
            <button
              type="button"
              className="w-full h-full px-5 flex items-center justify-between bg-[#f8f8f8] border-b-2 border-[#ff3b4e] text-[14px] uppercase text-[#222]"
            >
              <span>All Categories</span>
              <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>

            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-opacity absolute left-0 top-full w-full bg-white border border-[#e8e8e8] shadow-lg z-50">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/categories/${c.slug}`}
                  className="block px-5 py-2.5 text-[14px] text-[#333] border-b last:border-b-0 border-  hover:text-[#ff3b4e] hover:bg-[#fafafa] transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Main links: 14px uppercase, 32px apart, never wrap */}
          <nav
            className="ml-[clamp(20px,3.4vw,46px)] flex items-center gap-[clamp(16px,2.34vw,32px)] whitespace-nowrap"
            aria-label="Main"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-[6px] text-[14px] uppercase leading-none transition-colors hover:text-[#ff3b4e] ${
                  isActive(item.href) ? RED : 'text-[#222]'
                }`}
              >
                {item.label}
                {item.hasDropdown && <Caret />}
              </Link>
            ))}
          </nav>

          {/* Special offers: 140 x 30, dashed border */}
          <div className="ml-auto flex items-center pl-4">
            <Link
              href="/deals"
              className={`h-[30px] px-4 flex items-center whitespace-nowrap border border-dashed border-[#cfcfcf] text-[14px] uppercase leading-none ${RED} hover:border-[#ff3b4e] transition-colors`}
            >
              Special Offers
            </Link>
          </div>
        </div>
      </div>

      {/* ============================ MOBILE MENU ======================== */}
      {mobileOpen && (
        <nav className="lg:hidden border-b border-[#e8e8e8] bg-white" aria-label="Mobile">
          <ul className="px-4 py-2 divide-y divide-[#f0f0f0]">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 text-sm uppercase ${isActive(item.href) ? RED : 'text-[#222]'}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="block py-3 text-sm uppercase">
                Login / Register
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}