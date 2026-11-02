'use client';

// src/app/categories/page.tsx

import { useState } from 'react';
import Link from 'next/link';
import type { Category, Product } from '@/types';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import SoftImg from '@/components/ui/Softimg';
import { roboto } from '@/lib/fonts';

/* Colours: same neutral set as the other pages, one accent */
const ACCENT = 'bg-[#4B4FED] hover:bg-[#3d41d9]';
const INK = 'text-[#1c1b22]';
const MUTED = 'text-[#6f6d78]';
const FAINT = 'text-[#9a98a3]';
const LINE = 'border-[#e7e5df]';

type SortKey = 'featured' | 'az' | 'most';

/* ==========================================================================
   Work out, from your real data, which products belong to each category.
   A product matches when its `category` equals the category name or slug
   (ignoring case, "&" and dashes), e.g. "Home & Garden" = "home-garden".
   ========================================================================== */
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const belongs = (p: Product, c: Category) => {
  const pc = norm(p.category || '');
  return pc !== '' && (pc === norm(c.name) || pc === norm(c.slug));
};

const ITEMS = (categories as Category[]).map((c) => {
  const list = products.filter((p) => belongs(p, c));
  return {
    ...c,
    count: list.length,
    previews: list.slice(0, 4).map((p) => p.image),
    subNames: (c.subcategories ?? []).map((s) => s.name),
  };
});

const ANY_COUNTS = ITEMS.some((i) => i.count > 0);

/* ------------------------------- icons ---------------------------------- */

const svg = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

const SearchIcon = () => (
  <svg className="h-[18px] w-[18px]" {...svg}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-3.8-3.8" />
  </svg>
);
const ArrowIcon = () => (
  <svg className="h-4 w-4" {...svg} strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const GridIcon = () => (
  <svg className="h-9 w-9 text-[#bdbbc6]" {...svg} strokeWidth={1.4}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" />
  </svg>
);

/* ------------------------------ one card -------------------------------- */

function Preview({ images, name }: { images: string[]; name: string }) {
  if (images.length >= 4) {
    return (
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-px bg-[#e4e2dc]">
        {images.slice(0, 4).map((src, i) => (
          <span key={src + i} className="overflow-hidden bg-[#f3f2ee]">
            <SoftImg src={src} alt="" className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105" />
          </span>
        ))}
      </div>
    );
  }
  if (images.length > 0) {
    return <SoftImg src={images[0]} alt={name} className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105" />;
  }
  return (
    <span className="flex h-full w-full items-center justify-center">
      <GridIcon />
    </span>
  );
}

/* -------------------------------- page ---------------------------------- */

export default function CategoriesPage() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('featured');

  const q = query.trim().toLowerCase();

  const filtered = ITEMS.filter(
    (c) => q === '' || c.name.toLowerCase().includes(q) || c.subNames.some((s) => s.toLowerCase().includes(q)),
  );

  const list = [...filtered].sort((a, b) =>
    sort === 'az' ? a.name.localeCompare(b.name) : sort === 'most' ? b.count - a.count : 0,
  );

  return (
    <main className={`${roboto.className} min-h-screen bg-[#f7f6f3] pb-20 pt-6`}>
      <div className="mx-auto w-full max-w-[1320px] px-4">
        {/* ---------- breadcrumb ---------- */}
        <nav aria-label="Breadcrumb" className={`mb-5 flex flex-wrap items-center gap-2 text-[13px] ${MUTED}`}>
          <Link href="/" className="hover:text-[#1c1b22]">Home</Link>
          <span aria-hidden="true">/</span>
          <span className={INK}>Categories</span>
        </nav>

        {/* ---------- title ---------- */}
        <header className="mb-6">
          <h1 className={`text-[28px] font-medium leading-[1.2] tracking-[-0.01em] sm:text-[32px] ${INK}`}>All categories</h1>
          <p className={`mt-1.5 text-[14px] ${MUTED}`}>Browse products by category.</p>
        </header>

        {/* ---------- toolbar ---------- */}
        <div className={`mb-6 flex flex-wrap items-center justify-between gap-3 border-b ${LINE} pb-4`}>
          <div className="relative w-full sm:max-w-[360px]">
            <span className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${FAINT}`}>
              <SearchIcon />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search categories"
              aria-label="Search categories"
              className="h-11 w-full rounded-lg border border-[#d9d7d0] bg-white pl-10 pr-3 text-[14px] outline-none placeholder:text-[#a3a1ab] focus:border-[#4B4FED] focus:ring-2 focus:ring-[#4B4FED]/20"
            />
          </div>

          <div className="flex items-center gap-4">
            <p className={`hidden text-[14px] sm:block ${MUTED}`}>
              {list.length} {list.length === 1 ? 'category' : 'categories'}
            </p>
            <label className={`flex items-center gap-2 text-[13px] ${MUTED}`}>
              <span className="hidden sm:inline">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-10 rounded-md border border-[#d9d7d0] bg-white px-3 text-[14px] text-[#1c1b22] outline-none focus:border-[#4B4FED]"
              >
                <option value="featured">Featured</option>
                <option value="az">A to Z</option>
                {ANY_COUNTS && <option value="most">Most products</option>}
              </select>
            </label>
          </div>
        </div>

        {/* ---------- empty search ---------- */}
        {list.length === 0 && (
          <div className={`rounded-xl border ${LINE} bg-white px-6 py-16 text-center`}>
            <h2 className={`text-[18px] font-medium ${INK}`}>No categories match &ldquo;{query}&rdquo;</h2>
            <p className={`mt-1.5 text-[14px] ${MUTED}`}>Check the spelling or try a shorter word.</p>
            <button type="button" onClick={() => setQuery('')} className={`mt-6 h-11 rounded-lg px-6 text-[14px] font-medium text-white transition-colors ${ACCENT}`}>
              Show all categories
            </button>
          </div>
        )}

        {/* ---------- grid ---------- */}
        {list.length > 0 && (
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {list.map((c) => {
              const subs = c.subNames;
              return (
                <li key={c.id}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className={`group flex h-full flex-col overflow-hidden rounded-xl border ${LINE} bg-white transition-colors hover:border-[#c9c7bf]`}
                  >
                    <span className="block aspect-[4/3] overflow-hidden bg-[#ecebe6]">
                      <Preview images={c.previews} name={c.name} />
                    </span>

                    <span className="flex flex-1 flex-col p-4">
                      <span className="flex items-start justify-between gap-3">
                        <span className={`text-[16px] font-medium leading-[22px] ${INK}`}>{c.name}</span>
                        <span className={`mt-0.5 shrink-0 ${FAINT} transition-all group-hover:translate-x-0.5 group-hover:text-[#1c1b22]`}>
                          <ArrowIcon />
                        </span>
                      </span>

                      {subs.length > 0 && (
                        <span className={`mt-1.5 line-clamp-2 text-[13px] leading-[18px] ${MUTED}`}>
                          {subs.slice(0, 3).join(', ')}
                          {subs.length > 3 && ` +${subs.length - 3} more`}
                        </span>
                      )}

                      <span className={`mt-auto pt-3 text-[12px] ${FAINT}`}>
                        {ANY_COUNTS
                          ? `${c.count} ${c.count === 1 ? 'product' : 'products'}`
                          : `${subs.length} ${subs.length === 1 ? 'subcategory' : 'subcategories'}`}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}