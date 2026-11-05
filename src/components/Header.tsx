'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/categories';
import Image from 'next/image';

/* ------------------------------ settings -------------------------------- */

/* EDIT THESE: shown in the thin strip at the top. Use your real offer and number. */
const TRUST_MESSAGE = 'Free delivery on orders over ₦50,000 · Pay on delivery available';
const HOTLINE_LABEL = '+234 8124106198';
const HOTLINE_HREF = 'tel:+8884344600';

/* Colours. NAVY is the header background; BRAND is used on the white nav row. */
const NAVY = '#05052b';
const BRAND = '#7544cf';
const MAGENTA = '#C7449A';
const BTN_GRADIENT = 'bg-gradient-to-r from-[#4B4FED] via-[#6a48e0] to-[#9b4bd6]';

const WRAP = 'mx-auto w-full max-w-[1920px] px-[15px]';

type NavItem = { label: string; href: string };

/* NOTE: /new-arrivals and /best-selling must exist as pages, or change these links. */
const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Best Selling', href: '/best-selling' },
  { label: 'Help', href: '/help' },
];

/* ------------------------------- icons ---------------------------------- */

function Caret({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-2 h-1 shrink-0 ${className}`} viewBox="0 0 10 5" fill="currentColor" aria-hidden="true">
      <path d="M0 0h10L5 5z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="w-[26px] h-[26px]" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 32 32" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h4l3.5 15h14L28 10H9" />
      <circle cx="12" cy="26" r="2" />
      <circle cx="23" cy="26" r="2" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24" aria-hidden="true">
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
    <svg className="w-[26px] h-[26px]" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="11" r="5.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 27c0-5.5 4.9-9 11-9s11 3.5 11 9" />
    </svg>
  );
}

function MenuIcon({ className = 'w-[16px] h-[16px]' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

/* --------------------------- header background -------------------------- */

/* Thin flowing ribbon lines (blue to violet to magenta) drawn on the navy background.
   Pure SVG, so there is no image file to download or add to the project. */
const WAVE_FROM = [18, -30, 92, 28, 74, 8];
const WAVE_TO = [96, 74, 14, 86, 14, 74];
const WAVE_COUNT = 38;

const WAVE_PATHS = Array.from({ length: WAVE_COUNT }, (_, i) => {
  const t = i / (WAVE_COUNT - 1);
  const v = WAVE_FROM.map((a, k) => (a + (WAVE_TO[k] - a) * t).toFixed(1));
  return `M-20 ${v[0]} C 360 ${v[1]}, 700 ${v[2]}, 1000 ${v[3]} S 1300 ${v[4]}, 1460 ${v[5]}`;
});

function HeaderBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" style={{ backgroundColor: NAVY }}>
      {/* soft blue glow top-left, magenta glow bottom-right */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_-30%,rgba(75,79,237,0.5),transparent_55%),radial-gradient(ellipse_at_88%_140%,rgba(199,68,154,0.38),transparent_55%)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 108" preserveAspectRatio="none">
        <defs>
          <linearGradient id="header-wave-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor="#4B4FED" />
            <stop offset="55%" stopColor="#8B52D7" />
            <stop offset="100%" stopColor="#C7449A" />
          </linearGradient>
        </defs>
        {WAVE_PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="url(#header-wave-grad)"
            strokeWidth={0.7}
            strokeOpacity={0.5}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}

/* Background for the All Categories button: same navy-to-violet flow as the header,
   with a few of the same ribbon lines so the two pieces feel like one design. */
function CategoryBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[linear-gradient(100deg,#07073a_0%,#2b2fc9_55%,#8B52D7_100%)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_92%_130%,rgba(199,68,154,0.5),transparent_60%)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 108" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cat-wave-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor="#8f9bff" />
            <stop offset="100%" stopColor="#f0abfc" />
          </linearGradient>
        </defs>
        {WAVE_PATHS.filter((_, i) => i % 2 === 0).map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="url(#cat-wave-grad)"
            strokeWidth={0.7}
            strokeOpacity={0.35}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
    </div>
  );
}

/* ------------------------------ component ------------------------------- */

export default function Header() {
  const { totalItems } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  /* How far the top strip has been scrolled out of view (0 to 32px) */
  const [topBarOffset, setTopBarOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setTopBarOffset(Math.min(window.scrollY, 32));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // TODO: connect to a wishlist context when you have one
  const wishlistCount = 0;

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  };

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  /* hover colour on the dark header vs. on the white nav row */
  const hoverLight = 'hover:text-[#d8b4fe] transition-colors';

  return (
    <>
    {/* Spacer: the header is fixed, so this reserves its height.
        mobile: main 64 + search 52 + border 1 | md: strip 32 + main 76 + border 1 | lg: + nav 41 */}
    <div aria-hidden="true" className="h-[117px] md:h-[109px] lg:h-[150px]" />

    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-[#e5e5e5] bg-white text-[#222] md:translate-y-[var(--topbar-offset)] font-sans"
      style={{ '--topbar-offset': `-${topBarOffset}px` } as CSSProperties}
    >
      {/* ===== DARK AREA: top strip + main row share one navy background ===== */}
      <div className="relative text-white">
        <HeaderBackground />

        <div className="relative">
          {/* ============================ TOP STRIP ========================== */}
          <div className="hidden md:block h-[32px] border-b border-white/10 bg-[#020218]/55 text-[12px] leading-none text-white/90">
            <div className={`${WRAP} h-full flex items-center justify-between`}>
              <p>{TRUST_MESSAGE}</p>
              <div className="flex items-center gap-5">
                <Link href="/help" className="hover:text-[#d8b4fe] transition-colors">Help Center</Link>
                <a href={HOTLINE_HREF} className="hidden sm:inline hover:text-[#d8b4fe] transition-colors">
                  Call us: {HOTLINE_LABEL}
                </a>
              </div>
            </div>
          </div>

          {/* ============================ MAIN ROW =========================== */}
          <div className={`${WRAP} flex items-center h-[64px] md:h-[76px]`}>
            {/* Your logo has a white background, so it sits on a small white tile */}
            <Link
              href="/"
              aria-label="LeadersMart home"
              className="shrink-0 flex items-center rounded-md bg-white px-2 py-1 md:mr-[clamp(16px,3vw,48px)]"
            >
              <Image
                src="/images/leaders_mart_logo.png"
                alt="LeadersMart"
                width={200}
                height={80}
                priority
                className="h-[40px] md:h-[52px] w-auto"
              />
            </Link>

            {/* Search: white bar, gradient button */}
            <form
              onSubmit={handleSearch}
              role="search"
              className="hidden md:flex mx-auto flex-1 min-w-0 max-w-[680px] h-[44px] overflow-hidden rounded-[6px] bg-white"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands and categories"
                aria-label="Search products"
                className="flex-1 min-w-0 px-4 text-[14px] text-[#333] placeholder-[#8a8a8a] outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className={`flex shrink-0 items-center justify-center gap-2 px-6 text-[14px] font-medium text-white transition hover:brightness-110 ${BTN_GRADIENT}`}
              >
                <SearchIcon />
                <span className="hidden lg:inline">Search</span>
              </button>
            </form>

            {/* Account / Wish list / Cart */}
            <div className="shrink-0 ml-auto md:ml-[clamp(16px,3vw,40px)] flex items-center gap-5 lg:gap-8 text-[14px]">
              <div className="hidden sm:flex items-center gap-2">
                <UserIcon />
                <div className="hidden lg:flex flex-col whitespace-nowrap leading-[18px]">
                  <span className="text-[12px] text-white/70">Hello, Guest</span>
                  <span className="font-medium">
                    <Link href="/login" className={hoverLight}>Login</Link>
                    <span className="mx-1.5 text-white/40">/</span>
                    <Link href="/signup" className={hoverLight}>Register</Link>
                  </span>
                </div>
              </div>

              <Link
                href="/wishlist"
                aria-label={`Wish list (${wishlistCount})`}
                className={`relative hidden sm:flex items-center ${hoverLight}`}
              >
                <HeartIcon />
                {wishlistCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[11px] font-medium text-white"
                    style={{ backgroundColor: MAGENTA }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link href="/cart" aria-label={`Cart (${totalItems} items)`} className={`flex items-center gap-2 ${hoverLight}`}>
                <span className="relative flex">
                  <CartIcon />
                  <span
                    className="absolute -top-2 -right-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[11px] font-medium text-white"
                    style={{ backgroundColor: MAGENTA }}
                  >
                    {totalItems}
                  </span>
                </span>
                <span className="hidden lg:inline font-medium">Cart</span>
              </Link>

              <button
                type="button"
                className="lg:hidden p-1"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <form onSubmit={handleSearch} role="search" className="md:hidden px-4 pb-3">
            <div className="flex h-10 overflow-hidden rounded-[6px] bg-white">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                aria-label="Search products"
                className="flex-1 min-w-0 px-3 text-sm text-[#333] outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className={`flex w-12 items-center justify-center text-white ${BTN_GRADIENT}`}
              >
                <SearchIcon />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ========================== NAVIGATION ROW ======================= */}
      <div className="hidden lg:block">
        <div className={`${WRAP} relative h-[40px] flex items-stretch`}>
          {/* All Categories: flat button with a dropdown */}
          <div className="relative group w-[clamp(210px,19.8vw,270px)] shrink-0">
            <button
              type="button"
              className="relative flex h-full w-full items-center gap-3 overflow-hidden px-5 text-[14px] font-medium text-white"
            >
              <CategoryBackground />
              <span className="relative flex items-center gap-3">
                <MenuIcon />
                <span>All Categories</span>
              </span>
            </button>

            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity absolute left-0 top-full z-50 w-full border border-[#e5e5e5] bg-white shadow-md">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/categories/${c.slug}`}
                  className="block border-b border-[#f0f0f0] px-5 py-2.5 text-[14px] text-[#333] last:border-b-0 hover:bg-[#f7f4fd] hover:text-[#7544cf] transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Main links: plain text, sentence case */}
          <nav
            className="ml-[clamp(20px,3.4vw,46px)] flex items-stretch gap-[clamp(20px,2.6vw,36px)] whitespace-nowrap"
            aria-label="Main"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center border-b-2 text-[14px] transition-colors ${
                    active
                      ? 'border-[#7544cf] font-medium text-[#7544cf]'
                      : 'border-transparent text-[#333] hover:text-[#7544cf]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Special offers: plain text link */}
          <div className="ml-auto flex items-center pl-4">
            <Link href="/deals" className="text-[14px] font-medium hover:underline" style={{ color: MAGENTA }}>
              Special Offers
            </Link>
          </div>
        </div>
      </div>

      {/* Thin brand-gradient line along the bottom edge of the whole header */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#4B4FED] via-[#8B52D7] to-[#C7449A]" />

      {/* ============================ MOBILE MENU ======================== */}
      {mobileOpen && (
        <nav className="lg:hidden max-h-[70vh] overflow-y-auto border-t border-[#e5e5e5] bg-white" aria-label="Mobile">
          <ul className="px-4 py-1 divide-y divide-[#f0f0f0]">
            <li>
              <details className="group/m">
                <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-[15px] font-medium text-[#222]">
                  All Categories
                  <Caret className="transition-transform group-open/m:rotate-180" />
                </summary>
                <ul className="pb-3 pl-3">
                  {categories.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/categories/${c.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1.5 text-[14px] text-[#666]"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 text-[15px] ${isActive(item.href) ? 'font-medium text-[#7544cf]' : 'text-[#222]'}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/deals"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-[15px] font-medium"
                style={{ color: MAGENTA }}
              >
                Special Offers
              </Link>
            </li>
            <li>
              <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="block py-3 text-[15px] text-[#222]">
                Wish List{wishlistCount > 0 ? ` (${wishlistCount})` : ''}
              </Link>
            </li>
            <li>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="block py-3 text-[15px] text-[#222]">
                Login / Register
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
    </>
  );
}