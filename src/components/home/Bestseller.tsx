'use client';

import Link from 'next/link';
import { useState } from 'react';
import SoftImg from '@/components/ui/Softimg';
import Stars from '@/components/ui/Stars';
import { bestSellers } from '@/data/categorySections';
import type { SectionProduct } from '@/data/categorySections';
import { products as allProducts } from '@/data/products';

const WRAP = 'mx-auto w-full max-w-[1920px] px-[15px]';
/* Brand accent (same gradient as the header) - using Leaders Mart logo colors */
const BRAND_BG = 'bg-gradient-to-r from-[#4B4FED] via-[#8B52D7] to-[#C7449A]';
const BRAND_TEXT = `${BRAND_BG} bg-clip-text text-transparent`;

const PAGE_SIZE = 5; // 3 in the left column, 2 in the right
const money = (n: number) => `₦${n.toFixed(2)}`;

function Row({ p }: { p: SectionProduct }) {
  const onSale = p.oldPrice !== undefined && p.oldPrice > p.price;

  // Find the matching product and get the image index
  const product = allProducts.find(prod => prod.id === p.id);
  const imageIndex = product?.images?.findIndex(img => img === p.image) ?? 0;
  const productUrl = imageIndex > 0 ? `${p.href}?img=${imageIndex}` : p.href;

  return (
    <article className="flex items-start pb-[23px]">
      <Link href={productUrl} className="mr-[25px] block h-[62px] w-[60px] shrink-0" aria-label={p.name}>
        <SoftImg src={p.image} alt="" className="h-full w-full object-contain" />
      </Link>

      <div className="-mt-[6px] min-w-0 flex-1">
        <h3 className="truncate text-[13px] font-normal leading-[14px] text-[#222]">
          <Link href={productUrl} className="transition-colors hover:text-indigo-600">
            {p.name}
          </Link>
        </h3>
        <div className="mt-[6px]">
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

export default function BestSeller() {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(bestSellers.length / PAGE_SIZE));
  const visible = bestSellers.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <section className={`${WRAP} mt-[27px]`} aria-labelledby="best-seller-title">
      <h2
        id="best-seller-title"
        className={`flex h-[38px] items-center rounded-t-[4px] px-[18px] text-[16px] font-normal uppercase leading-none text-white ${BRAND_BG}`}
      >
        Best Seller
      </h2>

      <div className="rounded-b-[4px] border border-t-0 border-[#e8e8e8] pb-6 pt-[29px]">
        {/* fills the left column first (3 rows), then the right */}
        <div className="grid grid-cols-1 px-[18px] md:grid-flow-col md:grid-cols-2 md:grid-rows-3">
          {visible.map((p) => (
            <Row key={p.id} p={p} />
          ))}
        </div>

        <div className="mx-[18px] -mt-[5px] border-t border-[#e8e8e8] pt-[9px]">
          <div className="flex justify-center gap-[9px]" role="tablist" aria-label="Best seller pages">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === page}
                aria-label={`Page ${i + 1}`}
                onClick={() => setPage(i)}
                className={`h-[9px] w-[9px] rounded-full transition-colors ${i === page ? BRAND_BG : 'bg-[#e2e2e2] hover:bg-[#ccc]'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}