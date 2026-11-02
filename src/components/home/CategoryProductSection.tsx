'use client';

import Link from 'next/link';
import { useState, type CSSProperties } from 'react';
import SoftImg from '@/components/ui/Softimg';
import Stars from '@/components/ui/Stars';
import ProductHoverActions from '@/components/ui/ProductHoverActions';
import type { CategorySectionData, ProductTag, SectionProduct } from '@/data/categorySections';
import { products as allProducts } from '@/data/products';

const WRAP = 'mx-auto w-full max-w-[1920px] px-[15px]';
/* Brand accent (same gradient as the header) - using Leaders Mart logo colors */
const BRAND_BG = 'bg-gradient-to-r from-[#4B4FED] via-[#8B52D7] to-[#C7449A]';
const BRAND_TEXT = `${BRAND_BG} bg-clip-text text-transparent`;

const PAGE_SIZE = 10; // 5 columns x 2 rows on desktop
const money = (n: number) => `₦${n.toFixed(2)}`;

/* ------------------------------ pieces ---------------------------------- */

export function PagerButton({ dir, disabled, onClick }: { dir: 'left' | 'right'; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? 'Previous products' : 'Next products'}
      className="flex h-7 w-[29px] items-center justify-center border border-[#ddd] bg-white text-[#555] transition-colors hover:text-[color:var(--tab)] disabled:cursor-default disabled:text-[#bbb] disabled:hover:text-[#bbb]"
    >
      <svg className="h-[9px] w-[6px]" viewBox="0 0 7 10" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d={dir === 'left' ? 'M5.5 1l-4 4 4 4' : 'M1.5 1l4 4-4 4'} />
      </svg>
    </button>
  );
}

function Tag({ tag, side }: { tag: ProductTag; side: 'left' | 'right' }) {
  return (
    <span
      className={`absolute top-2 flex h-[18px] items-center rounded-[2px] px-[7px] text-[10px] font-bold uppercase leading-none text-white ${
        side === 'left' ? 'left-[10px]' : 'right-[19px]'
      }`}
      style={{ backgroundColor: tag.color }}
    >
      {tag.text}
    </span>
  );
}

/** Green "FREE" delivery truck */
function FreeTruck() {
  return (
    <svg
      className="absolute right-[17px] top-[143px] h-[23px] w-[30px]"
      viewBox="0 0 30 23"
      aria-label="Free shipping"
      role="img"
    >
      <rect x="0" y="1" width="18" height="14" rx="2" fill="#1da35b" />
      <path d="M19 5h5.5l4.5 5v5H19z" fill="#1da35b" />
      <path d="M21.5 7.5h2.6l2.4 2.9h-5z" fill="#fff" />
      <circle cx="7" cy="17.5" r="3" fill="#1da35b" stroke="#fff" strokeWidth="1.4" />
      <circle cx="23" cy="17.5" r="3" fill="#1da35b" stroke="#fff" strokeWidth="1.4" />
      <text x="9" y="11" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#fff" fontFamily="inherit">
        FREE
      </text>
    </svg>
  );
}

export function ProductCell({ p, bordered = true }: { p: SectionProduct; bordered?: boolean }) {
  const onSale = p.oldPrice !== undefined && p.oldPrice > p.price;
  const discount = onSale ? Math.round(((p.oldPrice! - p.price) / p.oldPrice!) * 100) : 0;

  // Find the matching product and get the image index
  const product = allProducts.find(prod => prod.id === p.id);
  const imageIndex = product?.images?.findIndex(img => img === p.image) ?? 0;
  const productUrl = imageIndex > 0 ? `${p.href}?img=${imageIndex}` : p.href;

  return (
    <article
      className={`relative pb-[26px] ${
        bordered ? 'border-b border-[#ececec] xl:[&:nth-child(n+6)]:border-b-0' : ''
      }`}
    >
      <Link href={productUrl} className="group/img relative block" aria-label={p.name}>
        <SoftImg src={p.image} alt="" className="h-[178px] w-full object-contain" />
        <ProductHoverActions product={p} />
      </Link>

      {p.freeShipping && <FreeTruck />}
      {p.tagLeft && <Tag tag={p.tagLeft} side="left" />}
      {p.tagRight ? (
        <Tag tag={p.tagRight} side="right" />
      ) : (
        onSale && (
          <span
            className={`absolute right-[19px] top-[9px] flex h-[21px] min-w-[42px] items-center justify-center rounded-[2px] px-2 text-[11px] font-bold leading-none text-white ${BRAND_BG}`}
          >
            -{discount}%
          </span>
        )
      )}

      <div className="px-[14px]">
        <h3 className="mt-[3px] line-clamp-2 min-h-[28px] text-[13px] font-normal leading-[14px] text-[#222]">
          <Link href={productUrl} className="transition-colors hover:text-[color:var(--tab)]">
            {p.name}
          </Link>
        </h3>
        <div className="mt-1 pl-[2px]">
          <Stars rating={p.rating ?? 0} />
        </div>
        <p className="mt-[10px] flex items-baseline gap-2 text-[14px] font-bold leading-5">
          <span className={onSale ? BRAND_TEXT : 'text-[#222]'}>{money(p.price)}</span>
          {onSale && <span className="text-[13px] font-medium text-[#999] line-through">{money(p.oldPrice!)}</span>}
        </p>
      </div>
    </article>
  );
}

/* ------------------------------- section -------------------------------- */

export default function CategoryProductSection({ data }: { data: CategorySectionData }) {
  const showAll = data.showAllTab ?? true;
  const tabs = showAll ? [{ id: 'all', label: 'All' }, ...data.tabs] : data.tabs;

  const [active, setActive] = useState(tabs[0].id);
  const [page, setPage] = useState(0);

  const filtered = active === 'all' ? data.products : data.products.filter((p) => p.tabs?.includes(active));
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const choose = (id: string) => {
    setActive(id);
    setPage(0);
  };

  return (
    <section
      className={`${WRAP} mt-[28px]`}
      style={
        {
          '--accent': data.color,
          '--tab': data.tabColor ?? data.color,
          '--line': data.lineColor ?? data.color,
        } as CSSProperties
      }
      aria-labelledby={`${data.id}-title`}
    >
      {/* ===== header: coloured title block, tabs, pager, line ===== */}
      <div className="flex h-[47px] items-end border-b border-[color:var(--line)]">
        {/* on desktop the title column has a fixed share of the width, so tabs line up between sections */}
        <div className="shrink-0 lg:w-[24.2%]">
          <div className="relative flex h-[38px] w-fit items-center bg-[var(--accent)] px-[18px]">
            {/* folded corner */}
            <span
              className="absolute -top-[9px] left-0 h-[9px] w-[13px] bg-[var(--accent)] brightness-[.78] [clip-path:polygon(0_0,100%_100%,0_100%)]"
              aria-hidden="true"
            />
            <h2
              id={`${data.id}-title`}
              className="whitespace-nowrap text-[14px] font-normal uppercase leading-none text-white sm:text-[16px]"
            >
              {data.title}
            </h2>
          </div>
        </div>

        <div
          role="tablist"
          aria-label={`${data.title} categories`}
          className="hidden min-w-0 flex-1 items-center gap-[29px] self-stretch overflow-x-auto whitespace-nowrap pb-[10px] pt-[9px] [scrollbar-width:none] md:ml-5 md:flex lg:ml-0 [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((t) => {
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => choose(t.id)}
                className={`text-[13px] uppercase leading-[19px] transition-colors hover:text-[color:var(--tab)] ${
                  isActive ? 'text-[color:var(--tab)]' : 'text-[#444]'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mb-[9px] ml-auto flex gap-1 pl-3">
          <PagerButton dir="left" disabled={page === 0} onClick={() => setPage((n) => n - 1)} />
          <PagerButton dir="right" disabled={page >= pages - 1} onClick={() => setPage((n) => n + 1)} />
        </div>
      </div>

      {/* mobile: tabs sit under the header */}
      <div
        role="presentation"
        className="flex gap-5 overflow-x-auto whitespace-nowrap border-x border-[#e8e8e8] px-4 py-3 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => choose(t.id)}
            className={`text-[13px] uppercase ${t.id === active ? 'text-[color:var(--tab)]' : 'text-[#444]'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ===== body: side banner + 5 x 2 grid ===== */}
      <div className="flex flex-col gap-[9px] border border-t-0 border-[#e8e8e8] p-[18px] pb-[29px] lg:flex-row">
        <Link
          href={data.banner.href}
          className="block aspect-[16/7] w-full shrink-0 self-start overflow-hidden lg:aspect-[252/518] lg:w-[21.1%]"
        >
          <SoftImg src={data.banner.image} alt={data.banner.alt} className="h-full w-full object-cover" />
        </Link>

        <div className="grid min-w-0 flex-1 grid-cols-2 content-start gap-y-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visible.map((p) => (
            <ProductCell key={p.id} p={p} />
          ))}
          {visible.length === 0 && <p className="col-span-full py-10 text-center text-sm text-[#888]">No products yet.</p>}
        </div>
      </div>
    </section>
  );
}