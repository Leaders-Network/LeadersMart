'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import SoftImg from  '@/components/ui/Softimg';
import { useScrollStrip } from '@/hooks/Usescrollstrip';
import ProductHoverActions from '@/components/ui/ProductHoverActions';
import { dealEndsAt, dealProducts, type DealProduct } from '@/data/home';
import { products as allProducts } from '@/data/products';

const WRAP = 'mx-auto w-full max-w-[1920px] px-[15px]';
/* Brand accent using Leaders Mart logo colors */
const BRAND_BG = 'bg-gradient-to-r from-[#4B4FED] via-[#8B52D7] to-[#C7449A]';
const BRAND_TEXT = `${BRAND_BG} bg-clip-text text-transparent`;

/* ----------------------------- countdown ------------------------------- */

function useCountdown(endISO: string) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const end = new Date(endISO).getTime();
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endISO]);

  if (left === null) return null; // not mounted yet, avoids a server/client mismatch
  const s = Math.floor(left / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

function Countdown() {
  const t = useCountdown(dealEndsAt);
  const units = [
    { label: 'Days', value: t?.days },
    { label: 'Hours', value: t?.hours },
    { label: 'Mins', value: t?.mins },
    { label: 'Secs', value: t?.secs },
  ];

  return (
    <div
      className={`grid grid-cols-4 gap-2 rounded-[4px] p-3 lg:flex lg:w-[82px] lg:shrink-0 lg:flex-col lg:items-center lg:gap-[6px] lg:px-0 lg:pb-0 lg:pt-[13px] ${BRAND_BG}`}
      role="timer"
      aria-label="Time left on the deal"
    >
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <span className="flex h-[34px] w-full items-center justify-center rounded-[4px] bg-white text-[20px] font-bold leading-none text-[#222] lg:w-[50px]">
            {u.value ?? '--'}
          </span>
          <span className="mt-[2px] text-[11px] font-bold uppercase leading-3 text-white">{u.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ product card --------------------------- */

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-[1px]" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= Math.round(rating);
        return (
          <svg
            key={n}
            className={`h-[9px] w-[9px] ${filled ? 'text-[#f5a623]' : 'text-[#ccc]'}`}
            viewBox="0 0 24 24"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      })}
    </div>
  );
}

const money = (n: number) => `₦${n.toFixed(2)}`;

function DealCard({ p }: { p: DealProduct }) {
  const discount = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);

  // Find the matching product and get the image index
  const product = allProducts.find(prod => prod.id === p.id);
  const imageIndex = product?.images?.findIndex(img => img === p.image) ?? 0;
  const productUrl = imageIndex > 0 ? `${p.href}?img=${imageIndex}` : p.href;

  return (
    <article className="flex h-[228px] shrink-0 basis-full snap-start overflow-hidden rounded-[4px] border border-[#e5e5e5] bg-white lg:basis-[calc(50%-3.5px)]">
      {/* image side */}
      <Link href={productUrl} className="relative flex w-[46%] shrink-0 items-center justify-center sm:w-[53%]" aria-label={p.name}>
        <SoftImg src={p.image} alt="" className="max-h-[165px] w-[75%] max-w-[170px] object-contain" />
        <span
          className={`absolute right-[14px] top-[23px] flex h-[17px] min-w-[33px] items-center justify-center rounded-[2px] px-1 text-[10px] font-bold leading-none text-white sm:right-5 ${BRAND_BG}`}
        >
          -{discount}%
        </span>
      </Link>

      {/* text side */}
      <div className="flex min-w-0 flex-1 flex-col pr-[14px] pt-[25px]">
        <h3 className="line-clamp-2 min-h-9 text-[15px] font-normal leading-[18px] text-[#222]">
          <Link href={productUrl} className="transition-colors hover:text-indigo-600">
            {p.name}
          </Link>
        </h3>
        <div className="mt-4">
          <Stars rating={p.rating} />
        </div>
        <p className="mt-[15px] flex items-baseline gap-[10px] leading-5">
          <span className={`text-[15px] font-bold ${BRAND_TEXT}`}>{money(p.price)}</span>
          <span className="text-[13px] text-[#999] line-through">{money(p.oldPrice)}</span>
        </p>
        <p className="mt-[13px] line-clamp-3 text-[11px] leading-4 text-[#888]">{p.description}</p>
      </div>
    </article>
  );
}

function CardArrow({ dir, disabled, onClick }: { dir: 'left' | 'right'; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? 'Previous deals' : 'Next deals'}
      className={`absolute top-1/2 z-10 flex h-[50px] w-7 -translate-y-1/2 items-center justify-center border border-[#e0e0e0] bg-white text-[#333] transition-colors hover:text-indigo-600 disabled:cursor-default disabled:text-[#bbb] disabled:hover:text-[#bbb] ${
        dir === 'left' ? 'left-0 rounded-r-[3px]' : 'right-0 rounded-l-[3px]'
      }`}
    >
      <svg className="h-[10px] w-[7px]" viewBox="0 0 7 10" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d={dir === 'left' ? 'M5.5 1l-4 4 4 4' : 'M1.5 1l4 4-4 4'} />
      </svg>
    </button>
  );
}

/* ------------------------------- section -------------------------------- */

export default function DealOfTheDay() {
  const { ref, canPrev, canNext, scrollByItem } = useScrollStrip<HTMLDivElement>();

  return (
    <section className={`${WRAP} mt-[22px]`} aria-label="Deals of the day">
      <div className="flex flex-col gap-[9px] lg:flex-row">
        <Countdown />

        <div className="relative min-w-0 flex-1">
          <div
            ref={ref}
            className="flex snap-x snap-mandatory gap-[7px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {dealProducts.map((p) => (
              <DealCard key={p.id} p={p} />
            ))}
          </div>
          <CardArrow dir="left" disabled={!canPrev} onClick={() => scrollByItem(-1)} />
          <CardArrow dir="right" disabled={!canNext} onClick={() => scrollByItem(1)} />
        </div>
      </div>
    </section>
  );
}