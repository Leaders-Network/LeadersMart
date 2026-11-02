'use client';

// src/app/best-selling/page.tsx

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/types';
import { products } from '@/data/products';
import SoftImg from '@/components/ui/Softimg';
import Stars from '@/components/ui/Stars';
import ProductHoverActions from '@/components/ui/ProductHoverActions';
import { formatMoney } from '@/types/product';
import { roboto } from '@/lib/fonts';

/* ==========================================================================
   SETTINGS
   ========================================================================== */
const BEST_SELLERS_COUNT = 20;
const PAGE_SIZE = 12;

/* Colours: same neutral set as the product page, one accent */
const ACCENT = 'bg-[#4B4FED] hover:bg-[#3d41d9]';
const INK = 'text-[#1c1b22]';
const MUTED = 'text-[#6f6d78]';
const FAINT = 'text-[#9a98a3]';
const LINE = 'border-[#e7e5df]';

type SortKey = 'best' | 'low' | 'high';

/** `sold` is optional: add a real "units sold" number to your product data and this page
 *  will rank by it and show it on each card. Until then, nothing is invented. */
type RichProduct = Product & { sold?: number; rating?: number; oldPrice?: number };

const HAS_SALES_DATA = (products as RichProduct[]).some((p) => p.sold !== undefined);

/* Rank by real sales when the data has them, otherwise keep the list order */
const RANKED: RichProduct[] = (HAS_SALES_DATA
  ? [...(products as RichProduct[])].sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0))
  : (products as RichProduct[])
).slice(0, BEST_SELLERS_COUNT);

/* Category list built from the real data, with counts */
const CATEGORY_COUNTS = RANKED.reduce<Record<string, number>>((acc, p) => {
  const c = p.category || 'Other';
  acc[c] = (acc[c] ?? 0) + 1;
  return acc;
}, {});
const CATEGORY_NAMES = Object.keys(CATEGORY_COUNTS).sort();

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

const GridIcon = () => (
  <svg className="h-[18px] w-[18px]" {...svg}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" />
  </svg>
);
const ListIcon = () => (
  <svg className="h-[18px] w-[18px]" {...svg}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const FilterIcon = () => (
  <svg className="h-[18px] w-[18px]" {...svg}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);

/* -------------------------------- page ---------------------------------- */

export default function BestSellingPage() {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<SortKey>('best');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [showFilters, setShowFilters] = useState(false);

  /* any filter change goes back to the first page of results */
  const change = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setVisible(PAGE_SIZE);
  };
  const setCategoryF = change(setCategory);
  const setMinF = change(setMinPrice);
  const setMaxF = change(setMaxPrice);
  const setStockF = change(setInStockOnly);

  const min = parseFloat(minPrice);
  const max = parseFloat(maxPrice);

  const filtered = RANKED.filter(
    (p) =>
      (category === 'All' || (p.category || 'Other') === category) &&
      (Number.isNaN(min) || p.price >= min) &&
      (Number.isNaN(max) || p.price <= max) &&
      (!inStockOnly || p.stock !== 0),
  );

  const sorted = [...filtered].sort((a, b) => (sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : 0));
  const shown = sorted.slice(0, visible);
  const remaining = sorted.length - shown.length;

  const filtersActive = category !== 'All' || minPrice !== '' || maxPrice !== '' || inStockOnly;
  const clearFilters = () => {
    setCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setInStockOnly(false);
    setVisible(PAGE_SIZE);
  };

  const inputCls =
    'h-10 w-full rounded-md border border-[#d9d7d0] bg-white px-3 text-[14px] outline-none placeholder:text-[#a3a1ab] focus:border-[#4B4FED] focus:ring-2 focus:ring-[#4B4FED]/20';

  return (
    <main className={`${roboto.className} min-h-screen bg-[#f7f6f3] pb-20 pt-6`}>
      <div className="mx-auto w-full max-w-[1320px] px-4">
        {/* ---------- breadcrumb ---------- */}
        <nav aria-label="Breadcrumb" className={`mb-5 flex flex-wrap items-center gap-2 text-[13px] ${MUTED}`}>
          <Link href="/" className="hover:text-[#1c1b22]">Home</Link>
          <span aria-hidden="true">/</span>
          <span className={INK}>Best sellers</span>
        </nav>

        {/* ---------- title ---------- */}
        <header className="mb-6">
          <h1 className={`text-[28px] font-medium leading-[1.2] tracking-[-0.01em] sm:text-[32px] ${INK}`}>Best sellers</h1>
          <p className={`mt-1.5 text-[14px] ${MUTED}`}>Our most popular products, picked by customers like you.</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* ======================== FILTERS ======================== */}
          <aside className={`${showFilters ? 'block' : 'hidden'} h-fit rounded-xl border ${LINE} bg-white p-5 lg:block`} aria-label="Filters">
            <div className="flex items-center justify-between">
              <h2 className={`text-[15px] font-medium ${INK}`}>Filters</h2>
              {filtersActive && (
                <button type="button" onClick={clearFilters} className={`text-[13px] underline underline-offset-4 ${MUTED} hover:text-[#1c1b22]`}>
                  Clear all
                </button>
              )}
            </div>

            {/* category */}
            <div className={`mt-5 border-t ${LINE} pt-5`}>
              <h3 className={`text-[13px] font-medium uppercase tracking-wide ${FAINT}`}>Category</h3>
              <ul className="mt-3 space-y-0.5">
                {['All', ...CATEGORY_NAMES].map((name) => {
                  const active = category === name;
                  const n = name === 'All' ? RANKED.length : CATEGORY_COUNTS[name];
                  return (
                    <li key={name}>
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => setCategoryF(name)}
                        className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-[14px] transition-colors ${
                          active ? `bg-[#f1f0ec] font-medium ${INK}` : `${MUTED} hover:bg-[#f7f6f3] hover:text-[#1c1b22]`
                        }`}
                      >
                        <span className="line-clamp-1">{name}</span>
                        <span className={`ml-2 text-[12px] tabular-nums ${FAINT}`}>{n}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* price */}
            <div className={`mt-5 border-t ${LINE} pt-5`}>
              <h3 className={`text-[13px] font-medium uppercase tracking-wide ${FAINT}`}>Price</h3>
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  value={minPrice}
                  onChange={(e) => setMinF(e.target.value)}
                  placeholder="Min"
                  aria-label="Minimum price"
                  className={inputCls}
                />
                <span className={FAINT} aria-hidden="true">–</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  value={maxPrice}
                  onChange={(e) => setMaxF(e.target.value)}
                  placeholder="Max"
                  aria-label="Maximum price"
                  className={inputCls}
                />
              </div>
            </div>

            {/* availability */}
            <div className={`mt-5 border-t ${LINE} pt-5`}>
              <label className={`flex cursor-pointer items-center gap-3 text-[14px] ${INK}`}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setStockF(e.target.checked)}
                  className="h-4 w-4 rounded border-[#c9c7bf] accent-[#4B4FED]"
                />
                In stock only
              </label>
            </div>
          </aside>

          {/* ======================== RESULTS ======================== */}
          <section className="min-w-0" aria-label="Products">
            {/* toolbar */}
            <div className={`mb-5 flex flex-wrap items-center justify-between gap-3 border-b ${LINE} pb-4`}>
              <p className={`text-[14px] ${MUTED}`}>
                {sorted.length === 0 ? 'No products' : `Showing ${shown.length} of ${sorted.length} products`}
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowFilters((v) => !v)}
                  aria-expanded={showFilters}
                  className={`flex h-10 items-center gap-2 rounded-md border border-[#d9d7d0] bg-white px-3 text-[14px] ${INK} lg:hidden`}
                >
                  <FilterIcon /> Filters
                </button>

                <label className={`flex items-center gap-2 text-[13px] ${MUTED}`}>
                  <span className="hidden sm:inline">Sort by</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="h-10 rounded-md border border-[#d9d7d0] bg-white px-3 text-[14px] text-[#1c1b22] outline-none focus:border-[#4B4FED]"
                  >
                    <option value="best">Best selling</option>
                    <option value="low">Price: low to high</option>
                    <option value="high">Price: high to low</option>
                  </select>
                </label>

                <div className="hidden overflow-hidden rounded-md border border-[#d9d7d0] bg-white sm:flex" role="group" aria-label="View">
                  {(
                    [
                      ['grid', 'Grid view', <GridIcon key="g" />],
                      ['list', 'List view', <ListIcon key="l" />],
                    ] as const
                  ).map(([key, label, icon]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setView(key)}
                      aria-label={label}
                      aria-pressed={view === key}
                      className={`flex h-10 w-10 items-center justify-center transition-colors ${
                        view === key ? 'bg-[#1c1b22] text-white' : `${MUTED} hover:bg-[#f4f3ef]`
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* empty state */}
            {sorted.length === 0 && (
              <div className={`rounded-xl border ${LINE} bg-white px-6 py-16 text-center`}>
                <h2 className={`text-[18px] font-medium ${INK}`}>No products match your filters</h2>
                <p className={`mt-1.5 text-[14px] ${MUTED}`}>Try a different category or price range.</p>
                <button type="button" onClick={clearFilters} className={`mt-6 h-11 rounded-lg px-6 text-[14px] font-medium text-white transition-colors ${ACCENT}`}>
                  Clear filters
                </button>
              </div>
            )}

            {/* products */}
            {sorted.length > 0 && (
              <ul
                className={
                  view === 'grid'
                    ? 'grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4'
                    : 'grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-1 sm:gap-y-4'
                }
              >
                {shown.map((p) => {
                  const soldOut = p.stock === 0;
                  const onSale = p.oldPrice !== undefined && p.oldPrice > p.price;
                  const listView = view === 'list';
                  /* rank badge only when it is based on real sales data and the list is in best-selling order */
                  const rank = HAS_SALES_DATA && sort === 'best' ? RANKED.indexOf(p) + 1 : 0;

                  return (
                    <li key={p.id}>
                      <article
                        className={`group ${
                          listView ? 'sm:flex sm:gap-5 sm:rounded-xl sm:border sm:border-[#e7e5df] sm:bg-white sm:p-4' : ''
                        }`}
                      >
                        {/* image */}
                        <div
                          className={`relative aspect-square overflow-hidden rounded-xl bg-[#ecebe6] ${
                            listView ? 'sm:w-[180px] sm:shrink-0' : ''
                          }`}
                        >
                          <Link href={`/products/${p.id}`} aria-label={p.name} className="block h-full w-full">
                            <SoftImg
                              src={p.image}
                              alt=""
                              className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                          </Link>
                          {rank > 0 && rank <= 3 && (
                            <span className="absolute left-3 top-3 rounded-md bg-[#1c1b22] px-2 py-1 text-[12px] font-medium text-white">
                              #{rank} best seller
                            </span>
                          )}
                          {soldOut && (
                            <span className={`absolute right-3 top-3 rounded-md bg-white px-2 py-1 text-[12px] font-medium ${INK}`}>Sold out</span>
                          )}
                          <ProductHoverActions product={{ ...p, href: `/products/${p.id}` }} />
                        </div>

                        {/* details */}
                        <div className={`min-w-0 ${listView ? 'sm:flex sm:flex-1 sm:flex-col sm:py-1' : ''}`}>
                          {p.category && <p className={`mt-3 text-[12px] ${FAINT} ${listView ? 'sm:mt-0' : ''}`}>{p.category}</p>}
                          <h3 className={`mt-0.5 line-clamp-2 text-[14px] leading-5 ${INK}`}>
                            <Link href={`/products/${p.id}`} className="hover:underline">
                              {p.name}
                            </Link>
                          </h3>

                          {p.rating !== undefined && p.rating > 0 && (
                            <div className="mt-1.5">
                              <Stars rating={p.rating} />
                            </div>
                          )}

                          {listView && p.description && (
                            <p className={`mt-2 hidden max-w-[560px] line-clamp-2 text-[14px] leading-6 sm:block ${MUTED}`}>{p.description}</p>
                          )}

                          <p className={`mt-2 flex items-baseline gap-2 ${listView ? 'sm:mt-auto sm:pt-3' : ''}`}>
                            <span className={`text-[16px] font-medium tabular-nums ${INK}`}>{formatMoney(p.price)}</span>
                            {onSale && <span className={`text-[13px] line-through tabular-nums ${FAINT}`}>{formatMoney(p.oldPrice!)}</span>}
                          </p>

                          {p.sold !== undefined && (
                            <p className={`mt-1 text-[12px] ${MUTED}`}>{p.sold.toLocaleString()} sold</p>
                          )}
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* show more */}
            {remaining > 0 && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="h-11 min-w-[220px] rounded-lg border border-[#1c1b22] px-6 text-[14px] font-medium text-[#1c1b22] transition-colors hover:bg-[#1c1b22] hover:text-white"
                >
                  Show more ({remaining} left)
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}