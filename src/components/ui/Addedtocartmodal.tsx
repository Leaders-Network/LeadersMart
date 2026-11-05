'use client';

// src/components/ui/AddedToCartModal.tsx
// "Added to cart successfully. What is next?"

import Link from 'next/link';
import SoftImg from '@/components/ui/Softimg';
import { formatMoney, type QuickViewProduct } from '@/types/product';
import { roboto } from '@/lib/fonts';

const BRAND_BG = 'bg-gradient-to-r from-[#4B4FED] via-[#8B52D7] to-[#C7449A]';
const BRAND_TEXT = `${BRAND_BG} bg-clip-text text-transparent`;

type Props = {
  product: QuickViewProduct;
  qty: number;
  subtotal: number;
  totalItems: number;
  onClose: () => void;
};

export default function AddedToCartModal({ product, qty, subtotal, totalItems, onClose }: Props) {
  return (
    <div
      className={`${roboto.className} fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-[8vh]`}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div role="dialog" aria-modal="true" aria-label="Added to cart" className="relative w-full max-w-[945px] bg-white shadow-2xl">
        {/* title bar */}
        <div className="flex items-center justify-between border-b border-[#e5e5e5] px-[14px] py-[11px]">
          <h2 className="text-[15px] font-normal text-[#555]">Added to cart successfully. What is next?</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-[#aaa] transition-colors hover:text-[#222]">
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
              <path strokeLinecap="round" d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        <div className="grid gap-6 p-[22px] md:grid-cols-[240px_1fr_212px]">
          {/* image */}
          <div className="flex h-[200px] items-center justify-center md:h-[240px]">
            <SoftImg src={product.image} alt={product.name} className="h-full w-full object-contain" />
          </div>

          {/* name + qty x price */}
          <div className="md:pt-8">
            <h3 className="text-[19px] font-normal leading-[22px] text-[#666]">{product.name}</h3>
            <p className="mt-1 text-[22px] leading-7 text-[#666]">
              {qty} x <span className={`font-bold ${BRAND_TEXT}`}>{formatMoney(product.price)}</span>
            </p>
          </div>

          {/* order summary */}
          <div className="self-start bg-[#f2f2f2] p-[14px] text-center">
            <Link
              href="/checkout"
              onClick={onClose}
              className={`block h-[33px] text-[12px] font-medium leading-[33px] text-white transition-opacity hover:opacity-90 ${BRAND_BG}`}
            >
              Checkout
            </Link>

            <p className="mt-[22px] text-[12px] text-[#666]">Order subtotal</p>
            <p className="mt-3 text-[24px] font-bold leading-none text-[#444]">{formatMoney(subtotal)}</p>
            <p className="mt-[18px] text-[12px] text-[#666]">
              Your cart contains {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 block h-[33px] w-full bg-[#4b5058] text-[12px] font-medium text-white transition-colors hover:bg-[#2f343a]"
            >
              Continue shopping
            </button>
            <Link
              href="/cart"
              onClick={onClose}
              className="mt-[9px] block h-[33px] bg-[#4b5058] text-[12px] font-medium leading-[33px] text-white transition-colors hover:bg-[#2f343a]"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}