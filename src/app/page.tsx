'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import StarRating from '@/components/StarRating';
import { flashSaleProducts, popularProducts } from '@/data/products';
import { categories } from '@/data/categories';

// ─── Category icon SVGs ─────────────────────────────────────────────────────
function CategoryIcon({ type, color }: { type: string; color: string }) {
  const p = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: '1.6', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (type) {
    case 'keyboard': return <svg {...p}><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="10" x2="6" y2="10"/><line x1="10" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="14" y2="10"/><line x1="18" y1="10" x2="18" y2="10"/><line x1="6" y1="14" x2="6" y2="14"/><line x1="18" y1="14" x2="18" y2="14"/><line x1="10" y1="14" x2="14" y2="14"/></svg>;
    case 'tag': return <svg {...p}><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>;
    case 'watch': return <svg {...p}><circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/><path d="M16.51 17.35l-.35 3.83a2 2 0 01-1.99 1.82H9.83a2 2 0 01-1.99-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 019.83 1h4.35a2 2 0 011.99 1.82l.35 3.83"/></svg>;
    case 'headphones': return <svg {...p}><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>;
    case 'briefcase': return <svg {...p}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>;
    case 'heart': return <svg {...p}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
    default: return null;
  }
}

// ─── Countdown timer ─────────────────────────────────────────────────────────
function useCountdown() {
  const [time, setTime] = useState({ h: 8, m: 42, s: 16 });
  useEffect(() => {
    const id = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ─── Newsletter strip ─────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) { setError('Please enter a valid email address.'); return; }
    setError('');
    setSubmitted(true);
  }

  return (
    <section style={{ background: '#EEEDFF' }}>
      <div className="max-w-[1312px] mx-auto px-4 lg:px-0 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-[22px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>Good things. Straight to your inbox.</h3>
          <p className="text-[14px] mt-1" style={{ color: '#6F7489' }}>Fresh finds, first dibs, and a little inspiration. No noise, we promise.</p>
        </div>
        {submitted ? (
          <div className="flex items-center gap-2 px-5 py-3 rounded-xl" style={{ background: '#E7F6EF' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4" stroke="#167A59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="#167A59" strokeWidth="2"/>
            </svg>
            <span className="text-[14px] font-600" style={{ color: '#167A59', fontWeight: 600 }}>You&apos;re in! Welcome to the good stuff.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#9DA3B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="#9DA3B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="Your email address"
                className="h-11 pl-9 pr-4 rounded-xl border outline-none text-[14px] w-full sm:w-72"
                style={{ background: 'white', border: error ? '1.5px solid #C0392B' : '1.5px solid #E6E8F1', color: '#171C36' }}
              />
              {error && <p className="text-[11px] mt-1 absolute" style={{ color: '#C0392B' }}>{error}</p>}
            </div>
            <button
              type="submit"
              className="h-11 px-5 rounded-xl text-white text-[14px] font-600 hover:opacity-90"
              style={{ background: '#4353EC', fontWeight: 600 }}
            >
              Count me in
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Home() {
  const { h, m, s } = useCountdown();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = activeFilter === 'all'
    ? popularProducts
    : popularProducts.filter(p => p.category === activeFilter);

  return (
    <>
      <Header />

      <main>
        {/* ── A. Hero ── */}
        <section className="max-w-[1312px] mx-auto px-4 lg:px-0 py-6">
          <div
            className="relative overflow-hidden flex flex-col md:flex-row"
            style={{ borderRadius: 28, minHeight: 380, background: 'linear-gradient(100deg, #3658ED 0%, #8644E4 100%)' }}
          >
            {/* Left copy */}
            <div className="flex-1 px-8 md:px-12 py-10 md:py-12 flex flex-col justify-center z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#DEFA87' }} />
                <span className="text-[11px] font-700 tracking-widest text-white/80 uppercase" style={{ fontWeight: 700 }}>The Everyday Upgrade</span>
              </div>
              <h1 className="text-white leading-tight mb-4" style={{ fontSize: 'clamp(38px, 4.5vw, 56px)', fontWeight: 800, lineHeight: 1.06 }}>
                Great finds.<br />Better everyday.
              </h1>
              <p className="text-white/80 text-[15px] mb-7 max-w-sm leading-relaxed">
                Tech you&apos;ll love. Little things that make a big difference. Discover it all, from sellers you can trust.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-5">
                <Link
                  href="/categories"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-600 text-[14px] hover:opacity-90"
                  style={{ background: 'white', color: '#171C36', fontWeight: 600 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="#171C36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Find your next favorite
                </Link>
                <span className="text-white/70 text-[14px]">Fresh finds from ₦19</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#DEFA87">
                      <path d="M8 1l1.854 3.757L14 5.52l-3 2.924.708 4.13L8 10.5l-3.708 2.073L5 8.443 2 5.52l4.146-.763L8 1z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-white/80 text-[13px]">Loved by 20,000+ happy shoppers</span>
              </div>
            </div>

            {/* Right image */}
            <div className="relative md:w-[48%] min-h-[260px] md:min-h-0">
              <Image
                src="/images/Featured product still life.png"
                alt="Featured workday collection products"
                fill
                className="object-cover object-center"
                priority
              />
              {/* Lime discount badge */}
              <div
                className="absolute top-5 right-5 w-20 h-20 rounded-full flex flex-col items-center justify-center text-center"
                style={{ background: '#DEFA87' }}
              >
                <span className="text-[10px] font-700 text-[#2D3A00] uppercase leading-tight" style={{ fontWeight: 700 }}>UP TO</span>
                <span className="text-[24px] font-800 text-[#2D3A00] leading-none" style={{ fontWeight: 800 }}>40%</span>
                <span className="text-[10px] font-700 text-[#2D3A00] uppercase leading-tight" style={{ fontWeight: 700 }}>OFF</span>
              </div>
              {/* Small white overlay card */}
              <div className="absolute bottom-5 left-5 bg-white px-4 py-3 flex items-center gap-2.5" style={{ borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#EEEDFF' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="6" width="20" height="12" rx="2" stroke="#4353EC" strokeWidth="1.8"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[12px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>Your desk, but better.</p>
                  <p className="text-[11px]" style={{ color: '#4353EC' }}>Meet the workday collection ↗</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Benefits bar ── */}
        <section className="max-w-[1312px] mx-auto px-4 lg:px-0 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: 'check', title: 'Verified sellers', sub: 'Real people. Quality products.' },
              { icon: 'truck', title: 'Fast, reliable delivery', sub: 'Free shipping on orders ₦50+' },
              { icon: 'shield', title: 'Secure checkout', sub: 'Your purchases, protected.' },
              { icon: 'return', title: 'Easy 30-day returns', sub: 'Not quite right? No worries.' },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: '#EEEDFF' }}>
                  {icon === 'check' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#4353EC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="#4353EC" strokeWidth="1.8"/></svg>}
                  {icon === 'truck' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="1" y="3" width="15" height="13" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="5.5" cy="18.5" r="2.5" stroke="#4353EC" strokeWidth="1.8"/><circle cx="18.5" cy="18.5" r="2.5" stroke="#4353EC" strokeWidth="1.8"/></svg>}
                  {icon === 'shield' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  {icon === 'return' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><polyline points="1 4 1 10 7 10" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <div>
                  <p className="text-[13px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>{title}</p>
                  <p className="text-[12px]" style={{ color: '#6F7489' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── B. Categories ── */}
        <section className="max-w-[1312px] mx-auto px-4 lg:px-0 py-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-[30px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>Find your kind of thing.</h2>
              <p className="text-[15px] mt-1" style={{ color: '#6F7489' }}>Big possibilities, neatly sorted.</p>
            </div>
            <Link href="/categories" className="text-[14px] font-600 flex items-center gap-1 hover:opacity-80" style={{ color: '#4353EC', fontWeight: 600 }}>
              Explore all categories
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#4353EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map(cat => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex flex-col items-center gap-3 py-5 px-3 rounded-2xl text-center hover:shadow-md transition-shadow"
                style={{ background: cat.bg, border: '1px solid transparent' }}
              >
                <CategoryIcon type={cat.icon} color={cat.iconColor} />
                <div>
                  <p className="text-[13px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>{cat.name}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: '#9DA3B4' }}>{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── C. Flash sales ── */}
        <section id="flash-sales" style={{ background: '#F7F8FC' }}>
          <div className="max-w-[1312px] mx-auto px-4 lg:px-0 py-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#4353EC" stroke="#4353EC" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h2 className="text-[28px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>Good finds. Gone in a flash.</h2>
                </div>
                <p className="text-[14px]" style={{ color: '#6F7489' }}>Today&apos;s best deals. A little less spend, a lot more joy.</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[13px]" style={{ color: '#6F7489' }}>Ends in</span>
                {[
                  { val: String(h).padStart(2, '0'), label: 'HRS' },
                  { val: String(m).padStart(2, '0'), label: 'MIN' },
                  { val: String(s).padStart(2, '0'), label: 'SEC' },
                ].map(({ val, label }) => (
                  <div key={label} className="w-14 h-14 rounded-xl flex flex-col items-center justify-center" style={{ background: '#171C36' }}>
                    <span className="text-[20px] font-700 text-white leading-none" style={{ fontWeight: 700 }}>{val}</span>
                    <span className="text-[9px] font-600 text-white/50 uppercase tracking-widest mt-0.5" style={{ fontWeight: 600 }}>{label}</span>
                  </div>
                ))}
                <Link href="#" className="text-[13px] font-600 ml-2 whitespace-nowrap flex items-center gap-1" style={{ color: '#4353EC', fontWeight: 600 }}>
                  All deals
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#4353EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {flashSaleProducts.map(product => (
                <ProductCard key={product.id} product={product} variant="flash" />
              ))}
            </div>
          </div>
        </section>

        {/* ── D. Popular products ── */}
        <section className="max-w-[1312px] mx-auto px-4 lg:px-0 py-12">
          <div className="mb-2">
            <span className="text-[11px] font-700 tracking-widest uppercase" style={{ color: '#4353EC', fontWeight: 700 }}>The crowd has good taste</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-[30px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>Current favorites. Future essentials.</h2>
              <p className="text-[15px] mt-1" style={{ color: '#6F7489' }}>A few things our community can&apos;t get enough of.</p>
            </div>
            <Link href="#" className="text-[14px] font-600 flex items-center gap-1 hover:opacity-80 shrink-0" style={{ color: '#4353EC', fontWeight: 600 }}>
              Shop bestsellers
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#4353EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-7">
            {[
              { key: 'all', label: 'All favorites' },
              { key: 'tech-gadgets', label: 'Tech & gadgets' },
              { key: 'home-living', label: 'Home & living' },
              { key: 'style-accessories', label: 'Style & accessories' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className="px-4 py-1.5 rounded-full text-[13px] font-500 transition-colors"
                style={{
                  fontWeight: 500,
                  background: activeFilter === f.key ? '#171C36' : 'white',
                  color: activeFilter === f.key ? 'white' : '#6F7489',
                  border: `1.5px solid ${activeFilter === f.key ? '#171C36' : '#E6E8F1'}`,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(filteredProducts.length ? filteredProducts : popularProducts).map(product => (
              <ProductCard key={product.id} product={product} variant="popular" />
            ))}
          </div>
        </section>

        {/* ── E. Collection banners ── */}
        <section className="max-w-[1312px] mx-auto px-4 lg:px-0 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Workspace collection */}
            <div className="flex overflow-hidden" style={{ borderRadius: 22, border: '1px solid #E6E8F1' }}>
              <div className="flex-1 p-8 flex flex-col justify-between" style={{ background: '#EEEDFF', minWidth: 0 }}>
                <div>
                  <span className="text-[10px] font-700 tracking-widest uppercase block mb-3" style={{ color: '#4353EC', fontWeight: 700 }}>Curated for your 9–5</span>
                  <h3 className="text-[24px] font-700 text-[#171C36] leading-tight mb-3" style={{ fontWeight: 700 }}>Make room for better workdays.</h3>
                  <p className="text-[13px] mb-5" style={{ color: '#6F7489' }}>Small desk upgrades.<br />Big main-character energy.</p>
                </div>
                <button
                  className="self-start px-5 py-2.5 rounded-xl text-white text-[13px] font-600 hover:opacity-90"
                  style={{ background: '#4353EC', fontWeight: 600 }}
                >
                  Shop the desk edit
                </button>
              </div>
              <div className="relative w-[200px] md:w-[220px] shrink-0">
                <Image
                  src="/images/Workspace photography.png"
                  alt="Workspace collection"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Audio collection */}
            <div className="flex overflow-hidden" style={{ borderRadius: 22, border: '1px solid #E6E8F1' }}>
              <div className="flex-1 p-8 flex flex-col justify-between" style={{ background: '#E7F6F3', minWidth: 0 }}>
                <div>
                  <span className="text-[10px] font-700 tracking-widest uppercase block mb-3" style={{ color: '#167A59', fontWeight: 700 }}>Turn up the everyday</span>
                  <h3 className="text-[24px] font-700 text-[#171C36] leading-tight mb-3" style={{ fontWeight: 700 }}>Your world.<br />Better sound.</h3>
                  <p className="text-[13px] mb-5" style={{ color: '#6F7489' }}>From deep-focus playlists to weekend adventures.</p>
                </div>
                <button
                  className="self-start px-5 py-2.5 rounded-xl text-white text-[13px] font-600 hover:opacity-90"
                  style={{ background: '#171C36', fontWeight: 600 }}
                >
                  Explore audio
                </button>
              </div>
              <div className="relative w-[200px] md:w-[220px] shrink-0">
                <Image
                  src="/images/Lifestyle still life.png"
                  alt="Audio collection"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── F. Trust section ── */}
        <section style={{ background: '#F7F8FC' }}>
          <div className="max-w-[1312px] mx-auto px-4 lg:px-0 py-14 text-center">
            <span className="text-[11px] font-700 tracking-widest uppercase block mb-3" style={{ color: '#4353EC', fontWeight: 700 }}>A marketplace with your back</span>
            <h2 className="text-[32px] font-700 text-[#171C36] mb-2" style={{ fontWeight: 700 }}>Good shopping starts with trust.</h2>
            <p className="text-[15px] mb-10 max-w-lg mx-auto" style={{ color: '#6F7489' }}>From the first click to the last unboxing, we make it feel easy.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: 'check', title: 'Sellers worth knowing', body: 'Every seller is verified. Discover thoughtfully chosen products from real, passionate businesses.' },
                { icon: 'shield', title: 'Protected from click to door', body: 'Secure payments and buyer protection on every order. Shop with a little extra peace of mind.' },
                { icon: 'return', title: 'A happier kind of returns', body: "Changed your mind? Our simple 30-day return policy keeps the experience refreshingly fuss-free." },
                { icon: 'chat', title: 'Real humans. Real help.', body: 'Friendly support that listens. Get help with your order, delivery, or finding that perfect thing.' },
              ].map(({ icon, title, body }) => (
                <div key={title} className="bg-white p-6 text-left" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: '#EEEDFF' }}>
                    {icon === 'check' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#4353EC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="#4353EC" strokeWidth="1.8"/></svg>}
                    {icon === 'shield' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    {icon === 'return' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><polyline points="1 4 1 10 7 10" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    {icon === 'chat' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <h4 className="text-[14px] font-700 text-[#171C36] mb-1.5" style={{ fontWeight: 700 }}>{title}</h4>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#6F7489' }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── G. Testimonials ── */}
        <section className="max-w-[1312px] mx-auto px-4 lg:px-0 py-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div>
              <h2 className="text-[28px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>Don&apos;t just take our word for it.</h2>
              <p className="text-[14px] mt-1" style={{ color: '#6F7489' }}>Real finds. Real people. Really happy.</p>
            </div>
            <Link href="#" className="text-[14px] font-600 flex items-center gap-1 shrink-0 hover:opacity-80" style={{ color: '#4353EC', fontWeight: 600 }}>
              Read shopper stories
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#4353EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { initials: 'MR', name: 'Maya R.', sub: 'Desk setup enthusiast', quote: '"The keyboard is even better in person. Arrived in two days, beautifully packed. Officially my new favorite place to shop."', purchased: 'Nova K75 Mechanical Keyboard', color: '#EEEDFF', textColor: '#4353EC' },
              { initials: 'AC', name: 'Alex C.', sub: 'Music everywhere person', quote: '"Great quality without the crazy price tag. I love knowing I\'m buying from a real, verified seller. Already back for more."', purchased: 'CloudSound Wireless Headphones', color: '#FFF0EA', textColor: '#C1622A' },
              { initials: 'JT', name: 'Jamie T.', sub: 'Small details, big difference', quote: '"Found the perfect lamp for my home office. Easy checkout, helpful updates, and zero drama. That\'s my kind of shopping."', purchased: 'Halo Soft Glow Desk Lamp', color: '#E7F6EF', textColor: '#167A59' },
            ].map(({ initials, name, sub, quote, purchased, color, textColor }) => (
              <div key={name} className="p-6 bg-white" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={5} />
                  <div className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#167A59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#167A59" strokeWidth="2"/></svg>
                    <span className="text-[11px]" style={{ color: '#167A59' }}>Verified purchase</span>
                  </div>
                </div>
                <p className="text-[14px] leading-relaxed mb-5" style={{ color: '#171C36' }}>{quote}</p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-700" style={{ background: color, color: textColor, fontWeight: 700 }}>
                    {initials}
                  </div>
                  <div>
                    <p className="text-[13px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>{name}</p>
                    <p className="text-[11px]" style={{ color: '#9DA3B4' }}>{sub}</p>
                  </div>
                </div>
                <p className="text-[11px]" style={{ color: '#9DA3B4' }}>Purchased: {purchased}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── H. Seller CTA ── */}
        <section className="max-w-[1312px] mx-auto px-4 lg:px-0 pb-12">
          <div
            className="relative overflow-hidden flex flex-col md:flex-row"
            style={{ borderRadius: 28, background: 'linear-gradient(100deg, #18285E 0%, #483084 100%)' }}
          >
            <div className="flex-1 px-8 md:px-12 py-12 flex flex-col justify-center z-10">
              <span className="text-[10px] font-700 tracking-widest uppercase block mb-4" style={{ color: '#DEFA87', fontWeight: 700 }}>Small businesses. Big possibilities.</span>
              <h2 className="text-white leading-tight mb-4" style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700 }}>
                You bring the good stuff.<br />We&apos;ll bring the shoppers.
              </h2>
              <p className="text-white/70 text-[15px] mb-7 max-w-sm">
                Your brand deserves a bigger stage. Open your store and grow with us.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/seller/register"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-[14px] font-600 hover:opacity-90"
                  style={{ background: 'white', color: '#171C36', fontWeight: 600 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#171C36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Start selling
                </Link>
                <Link href="/seller/sign-in" className="text-[14px] text-white/70 hover:text-white">
                  Already a seller? Sign in →
                </Link>
              </div>
            </div>
            <div className="relative md:w-[42%] min-h-[240px] md:min-h-0 shrink-0">
              <Image
                src="/images/Business owner portrait.png"
                alt="Small business owner"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* ── I. Newsletter ── */}
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
