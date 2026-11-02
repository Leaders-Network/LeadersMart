'use client';

import Link from 'next/link';
import SoftImg from '@/components/ui/Softimg';
import { useScrollStrip } from '@/hooks/Usescrollstrip';
import { topCategories } from '@/data/home';

const WRAP = 'mx-auto w-full max-w-[1920px] px-[15px]';

function SmallArrow({ dir, disabled, onClick }: { dir: 'left' | 'right'; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? 'Previous categories' : 'Next categories'}
      className="flex h-6 w-[26px] items-center justify-center border border-[#e0e0e0] bg-white text-[#555] transition-colors hover:text-indigo-600 disabled:cursor-default disabled:text-[#bbb] disabled:hover:text-[#bbb]"
    >
      <svg className="h-[9px] w-[6px]" viewBox="0 0 7 10" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d={dir === 'left' ? 'M5.5 1l-4 4 4 4' : 'M1.5 1l4 4-4 4'} />
      </svg>
    </button>
  );
}

export default function TopCategories() {
  const { ref, canPrev, canNext, scrollByItem } = useScrollStrip<HTMLUListElement>();

  return (
    <section className={`${WRAP} mt-[22px]`} aria-labelledby="top-categories-title">
      <div className="border border-[#e8e8e8] bg-white">
        {/* title bar: 39px, grey */}
        <div className="flex h-[39px] items-center justify-between border-b border-[#e8e8e8] bg-[#f8f8f8] pl-[15px] pr-[6px]">
          <h2 id="top-categories-title" className="text-[14px] font-normal uppercase leading-none text-[#222]">
            Top Categories
          </h2>
          <div className="flex gap-[2px]">
            <SmallArrow dir="left" disabled={!canPrev} onClick={() => scrollByItem(-1)} />
            <SmallArrow dir="right" disabled={!canNext} onClick={() => scrollByItem(1)} />
          </div>
        </div>

        {/* 8 items visible on desktop, fewer on smaller screens */}
        <ul
          ref={ref}
          className="flex snap-x snap-mandatory overflow-x-auto pb-[28px] pt-[40px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {topCategories.map((c) => (
            <li key={c.slug} className="shrink-0 basis-1/2 snap-start sm:basis-1/4 md:basis-1/6 lg:basis-[12.5%]">
              <Link href={`/categories/${c.slug}`} className="group flex flex-col items-center">
                <div className="flex h-30 w-[120px] items-center justify-center">
                  <SoftImg src={c.image} alt="" className="h-60 w-[150px] object-contain" />
                </div>
                <span className="mt-[10px] text-[12px] uppercase leading-[14px] text-[#333] transition-colors group-hover:text-indigo-600">
                  {c.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}