'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import SoftImg from '@/components/ui/Softimg';
import { useScrollStrip } from '@/hooks/Usescrollstrip';
import { PagerButton, ProductCell } from '@/components/home/CategoryProductSection';
import type { CompactSectionData } from '@/data/categorySections';

const WRAP = 'mx-auto w-full max-w-[1920px] px-[15px]';

function CompactBlock({ data }: { data: CompactSectionData }) {
  const { ref, canPrev, canNext, scrollByItem } = useScrollStrip<HTMLDivElement>();

  return (
    <section
      style={
        {
          '--accent': data.color,
          '--tab': data.tabColor ?? data.color,
          '--line': data.lineColor ?? data.color,
        } as CSSProperties
      }
      aria-labelledby={`${data.id}-title`}
    >
      {/* header: coloured title block + pager, line underneath */}
      <div className="flex h-[47px] items-end border-b border-[color:var(--line)]">
        <div className="relative flex h-[38px] items-center bg-[var(--accent)] px-[18px]">
          <span
            className="absolute -top-[9px] left-0 h-[9px] w-[13px] bg-[var(--accent)] brightness-[.78] [clip-path:polygon(0_0,100%_100%,0_100%)]"
            aria-hidden="true"
          />
          <h2 id={`${data.id}-title`} className="whitespace-nowrap text-[16px] font-normal uppercase leading-none text-white">
            {data.title}
          </h2>
        </div>

        <div className="mb-2 ml-auto flex gap-[3px] pl-3">
          <PagerButton dir="left" disabled={!canPrev} onClick={() => scrollByItem(-1)} />
          <PagerButton dir="right" disabled={!canNext} onClick={() => scrollByItem(1)} />
        </div>
      </div>

      {/* body */}
      <div className="border border-t-0 border-[#e8e8e8] pb-[5px]">
        <div className="px-[34px] pt-[19px]">
          <Link href={data.banner.href} className="block aspect-[531/135] w-full overflow-hidden">
            <SoftImg src={data.banner.image} alt={data.banner.alt} className="h-full w-full object-cover" />
          </Link>
        </div>

        <div className="mt-[22px] px-[18px]">
          <div
            ref={ref}
            className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {data.products.map((p) => (
              <div key={p.id} className="shrink-0 basis-1/2 snap-start sm:basis-1/3">
                <ProductCell p={p} bordered={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Two blocks side by side on desktop, stacked on smaller screens */
export default function CompactCategoryRow({ sections }: { sections: CompactSectionData[] }) {
  return (
    <div className={`${WRAP} mt-[28px] grid grid-cols-1 items-start gap-x-[27px] gap-y-[28px] lg:grid-cols-2`}>
      {sections.map((s) => (
        <CompactBlock key={s.id} data={s} />
      ))}
    </div>
  );
}