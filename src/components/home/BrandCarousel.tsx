'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import SoftImg from '@/components/ui/Softimg';
import { useScrollStrip } from '@/hooks/Usescrollstrip';
import { brands } from '@/data/home';

const WRAP = 'mx-auto w-full max-w-[1920px] px-[15px]';
const AUTOPLAY_MS = 3500;

function EdgeArrow({ dir, disabled, onClick }: { dir: 'left' | 'right'; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? 'Previous brands' : 'Next brands'}
      className={`absolute top-1/2 z-10 flex h-[70px] w-[37px] -translate-y-1/2 items-center justify-center border text-[#222] transition-colors disabled:cursor-default disabled:opacity-50 enabled:hover:border-transparent enabled:hover:text-white ${
        dir === 'left' ? 'left-0 rounded-r-[3px] border-[#e5e5e5]' : 'right-0 rounded-l-[3px] border-[#e5e5e5]'
      } bg-white enabled:hover:bg-gradient-to-r enabled:hover:from-[#4B4FED] enabled:hover:via-[#8B52D7] enabled:hover:to-[#C7449A]`}
    >
      <svg className="h-[13px] w-2" viewBox="0 0 8 13" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d={dir === 'left' ? 'M6.5 1.5L2 6.5l4.5 5' : 'M1.5 1.5L6 6.5l-4.5 5'} />
      </svg>
    </button>
  );
}

export default function BrandCarousel() {
  const { ref, canPrev, canNext, scrollByItem } = useScrollStrip<HTMLUListElement>();
  const [paused, setPaused] = useState(false);

  /* gentle autoplay: moves on every few seconds, loops back to the start, pauses on hover */
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      const el = ref.current;
      if (!el) return;
      if (el.scrollLeft + el.clientWidth < el.scrollWidth - 1) scrollByItem(1);
      else el.scrollTo({ left: 0, behavior: 'smooth' });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, ref, scrollByItem]);

  return (
    <section className={`${WRAP} mb-[31px] mt-[63px]`} aria-label="Our brands">
      <div
        className="relative h-[130px] overflow-hidden rounded-[4px] border border-[#e8e8e8] bg-white"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <ul
          ref={ref}
          className="flex h-full snap-x snap-mandatory items-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {brands.map((b) => (
            <li key={b.name} className="shrink-0 basis-1/2 snap-start sm:basis-1/3 md:basis-1/4 lg:basis-1/6 xl:basis-[12.5%]">
              <Link href={b.href} aria-label={b.name} className="flex h-[100px] items-center justify-center px-4">
                {/* Every logo gets the same fixed-size box and scales to fit it, so small files are enlarged
                    and big ones shrunk. object-contain keeps each logo's proportions. */}
                <SoftImg src={b.image} alt={b.name} className="h-[76px] w-full max-w-[170px] object-contain" />
              </Link>
            </li>
          ))}
        </ul>

        <EdgeArrow dir="left" disabled={!canPrev} onClick={() => scrollByItem(-1)} />
        <EdgeArrow dir="right" disabled={!canNext} onClick={() => scrollByItem(1)} />
      </div>
    </section>
  );
}