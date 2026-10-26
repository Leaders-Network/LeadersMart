'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Roboto } from 'next/font/google';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/categories';
import {
  featuresMenu,
  featuresBanners,
  collectionsMenu,
  pagesMenu,
  type BadgeType,
} from '@/data/megaMenu';
import Image from 'next/image';

/* The template uses Roboto at 400 weight everywhere */
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

/* Full-width wrapper: 15px side padding, exactly like the template */
const WRAP = 'mx-auto w-full max-w-[1920px] px-[15px]';

const GRADIENT = 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600';
const RED = `${GRADIENT} bg-clip-text text-transparent`;
/* Same gradient text, but only while the parent `.group` is hovered / focused */
const RED_ON_GROUP_HOVER =
  'group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent group-focus-within:bg-gradient-to-r group-focus-within:from-blue-600 group-focus-within:via-indigo-600 group-focus-within:to-purple-600 group-focus-within:bg-clip-text group-focus-within:text-transparent';
const RED_BG = 'bg-[#ff3b4e]';

type MenuKey = 'features' | 'collections' | 'pages';
type NavItem = { label: string; href: string; hasDropdown?: boolean; menu?: MenuKey };

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/categories', hasDropdown: true },
  { label: 'Features', href: '/shop', hasDropdown: true, menu: 'features' },
  { label: 'Collections', href: '/categories', hasDropdown: true, menu: 'collections' },
  { label: 'Pages', href: '/about', hasDropdown: true, menu: 'pages' },
  { label: 'Blog', href: '/blog', hasDropdown: true },
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

function ChevronRight() {
  return (
    <svg className="w-[7px] h-[10px] shrink-0 text-[#999]" viewBox="0 0 7 10" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M1.5 1l4 4-4 4" />
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

/* ---------------------------- mega menu pieces -------------------------- */

const BADGE_COLOR: Record<BadgeType, string> = {
  HOT: '#f57c00',
  NEW: '#1b8db5',
};

/* Small speech-bubble tag that sits at the top-right of the link text */
function Badge({ type }: { type: BadgeType }) {
  return (
    <span
      className="relative -top-[7px] ml-[3px] inline-block rounded-[2px] px-[5px] py-[1px] text-[8px] font-bold leading-[11px] text-white"
      style={{ backgroundColor: BADGE_COLOR[type] }}
      aria-hidden="true"
    >
      {type}
      <span
        className="absolute left-[3px] -bottom-[3px] h-0 w-0 border-x-[3px] border-t-[4px] border-x-transparent"
        style={{ borderTopColor: BADGE_COLOR[type] }}
      />
    </span>
  );
}

/* Shared panel shell: hidden until the parent `.group` is hovered or focused */
const PANEL_BASE =
  'invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity duration-150 absolute top-full z-50 bg-white border border-[#e8e8e8] shadow-[0_6px_18px_rgba(0,0,0,0.08)]';

const MENU_LINK = 'text-[13.5px] text-[#777] hover:text-[#222] transition-colors';

function FeaturesPanel() {
  return (
    <div className={`${PANEL_BASE} right-[15px] w-[min(918px,calc(100%-300px))] px-[35px] pt-[30px] pb-[22px]`}>
      <div className="grid grid-cols-4 gap-x-[30px]">
        {featuresMenu.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-[16px] font-medium uppercase leading-[24px] text-[#222]">{col.title}</h3>
            <ul>
              {col.links.map((l) => (
                <li key={l.label} className="flex h-[34px] items-center justify-between">
                  <Link href={l.href} className={`${MENU_LINK} whitespace-nowrap`}>
                    {l.label}
                    {l.badge && <Badge type={l.badge} />}
                  </Link>
                  {l.hasSub && <ChevronRight />}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Two promo banners (pure CSS, no images needed) */}
      <div className="mt-[22px] grid grid-cols-2 gap-[30px]">
        {featuresBanners.map((b, i) => (
          <Link
            key={i}
            href={b.href}
            className="relative flex h-[68px] items-center overflow-hidden bg-[#f1c40f] pl-5"
          >
            <span className="relative z-10 flex flex-col items-start gap-1">
              <span className="text-[16px] font-bold leading-none text-white">{b.title}</span>
              <span className="rounded-full bg-[#1b8db5] px-4 py-[3px] text-[9px] font-bold leading-none text-white">
                {b.cta}
              </span>
            </span>
            <span className="absolute inset-y-0 right-0 w-[48%] skew-x-[-18deg] translate-x-6 bg-gradient-to-r from-[#2b9fb0] to-[#2a7f8f]" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function CollectionsPanel() {
  return (
    <div className={`${PANEL_BASE} right-[15px] w-[min(868px,calc(100%-300px))] p-[30px]`}>
      <div className="grid grid-cols-4 gap-x-[30px]">
        {collectionsMenu.map((col) => (
          <div key={col.title}>
            <Link href={col.href} className="block">
              {/* grey box shows until the image file exists */}
              <div className="aspect-[360/252] w-full overflow-hidden bg-[#ececec]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={col.image}
                  alt={col.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="mt-5 border-b border-[#e8e8e8] pb-3 text-[14px] font-medium uppercase leading-none text-[#222]">
                {col.title}
              </h3>
            </Link>
            <ul className="mt-3">
              {col.links.map((l) => (
                <li key={l.label} className="py-[5px]">
                  <Link href={l.href} className={MENU_LINK}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function PagesPanel() {
  return (
    <div className={`${PANEL_BASE} left-[-14px] w-[358px] px-[30px] py-[30px]`}>
      <div className="grid grid-cols-2 gap-x-[30px]">
        {pagesMenu.map((col, i) => (
          <ul key={i}>
            {col.map((l) => (
              <li key={l.label} className="flex h-[30px] items-center">
                <Link href={l.href} className={`${MENU_LINK} whitespace-nowrap`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function MenuPanel({ menu }: { menu: MenuKey }) {
  if (menu === 'features') return <FeaturesPanel />;
  if (menu === 'collections') return <CollectionsPanel />;
  return <PagesPanel />;
}

/* Mobile: collapsible lists built from the same data */
function MobileSub({ menu, onNavigate }: { menu: MenuKey; onNavigate: () => void }) {
  const groups: { title: string; links: { label: string; href: string }[] }[] =
    menu === 'features'
      ? featuresMenu
      : menu === 'collections'
        ? collectionsMenu.map((c) => ({ title: c.title, links: c.links }))
        : [{ title: 'Pages', links: pagesMenu.flat() }];

  return (
    <div className="pb-3 pl-3">
      {groups.map((g) => (
        <div key={g.title} className="mb-2">
          <p className="py-1 text-xs font-medium uppercase text-[#222]">{g.title}</p>
          <ul>
            {g.links.map((l) => (
              <li key={`${g.title}-${l.label}`}>
                <Link href={l.href} onClick={onNavigate} className="block py-1.5 text-[13px] text-[#777]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
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
      <div className="hidden md:block h-[46px] bg-[#f8f8f8] text-[13px] leading-none text-[#222]">
        <div className={`${WRAP} h-[34px] flex items-center justify-between`}>
          <div className="flex items-center gap-6">
            <span>Welcome to our online store!</span>

            <a href="mailto:design@domain.com" className="flex items-center gap-1 hover:text-[#ff3b4e] transition-colors">
              <MailIcon />
              <span className="ml-0.5">Email: eleadersmart@gmail.com</span>
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
              <span>₦ Nigeria Naira</span>
              <Caret />
            </button>
          </div>
        </div>
      </div>

      {/* ============================ MAIN ROW =========================== */}
      <div className="border-b border-[#e8e8e8]">
        <div className={`${WRAP} flex items-center h-[72px] md:h-[116px]`}>
         <Link href="/" aria-label="LeadersMart home" className="shrink-0 flex items-center lg:w-[clamp(240px,22vw,301px)]">
            <Image
              src="/images/leaders_mart_logo.png"
              alt="LeadersMart"
              width={300}
              height={100}
              priority
              className="h-[80px] w-auto"
            />
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
              className={`w-[68px] shrink-0 ${GRADIENT} text-white flex items-center justify-center hover:opacity-90 transition-opacity`}
            >
              <SearchIcon />
            </button>
          </form>

          {/* Cart / Wish list / Account */}
          <div className="ml-auto flex items-center gap-5 lg:gap-[34px] lg:pr-[clamp(0px,2vw,28px)] text-[14px]">
            <Link href="/cart" className="relative flex items-center gap-3 hover:text-[#ff3b4e] transition-colors">
              <BasketIcon />
              <span
                className={`lg:hidden absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full ${RED_BG} text-white text-[11px] font-medium flex items-center justify-center`}
              >
                {totalItems}
              </span>
              <span className="hidden lg:flex flex-col items-start gap-[3px] pt-[2px]">
                <span
                  className={`min-w-[27px] h-[17px] px-2 rounded-full ${GRADIENT} text-white text-[11px] font-medium leading-none flex items-center justify-center`}
                >
                  {totalItems}
                </span>
                <span className="leading-[20px] text-[#222]">Your cart</span>
              </span>
            </Link>

            <Link href="/wishlist" className="hidden sm:flex items-center gap-[15px] hover:text-[#ff3b4e] transition-colors">
              <HeartIcon />
              <span className="hidden lg:inline whitespace-nowrap">Wish List ({wishlistCount})</span>
            </Link>

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
        <div className="flex h-10 rounded-full border-2 border-[#2563eb] overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 min-w-0 px-4 text-sm outline-none"
          />
          <button type="submit" aria-label="Search" className={`w-12 ${GRADIENT} text-white flex items-center justify-center`}>
            <SearchIcon />
          </button>
        </div>
      </form>

      {/* ========================== NAVIGATION ROW ======================= */}
      <div className="hidden lg:block border-b border-[#e8e8e8]">
        {/* `relative` here is what Features / Collections panels anchor to */}
        <div className={`${WRAP} relative h-[40px] flex items-stretch`}>
          {/* All Categories box */}
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
                  className="block px-5 py-2.5 text-[14px] text-[#333] border-b last:border-b-0 border-[#f0f0f0] hover:text-[#ff3b4e] hover:bg-[#fafafa] transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Main links: items are full row height so the pointer never leaves the hover area */}
          <nav
            className="ml-[clamp(20px,3.4vw,46px)] flex items-stretch gap-[clamp(16px,2.34vw,32px)] whitespace-nowrap"
            aria-label="Main"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              const isPages = item.menu === 'pages';
              return (
                <div
                  key={item.label}
                  /* Pages panel anchors to its own link; the other two anchor to the row */
                  className={`group flex items-stretch ${isPages ? 'relative' : ''}`}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-[6px] text-[14px] uppercase leading-none transition-colors ${
                      active ? RED : `text-[#222] ${RED_ON_GROUP_HOVER} hover:text-[#ff3b4e]`
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && <Caret />}
                  </Link>
                  {item.menu && <MenuPanel menu={item.menu} />}
                </div>
              );
            })}
          </nav>

          {/* Special offers */}
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
        <nav className="lg:hidden max-h-[70vh] overflow-y-auto border-b border-[#e8e8e8] bg-white" aria-label="Mobile">
          <ul className="px-4 py-2 divide-y divide-[#f0f0f0]">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.menu ? (
                  <details className="group/m">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm uppercase text-[#222]">
                      {item.label}
                      <Caret className="transition-transform group-open/m:rotate-180" />
                    </summary>
                    <MobileSub menu={item.menu} onNavigate={() => setMobileOpen(false)} />
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 text-sm uppercase ${isActive(item.href) ? RED : 'text-[#222]'}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Link href="/deals" onClick={() => setMobileOpen(false)} className="block py-3 text-sm uppercase">
                Special Offers
              </Link>
            </li>
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