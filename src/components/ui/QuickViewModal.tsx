'use client';

// src/components/ui/QuickViewModal.tsx
// Opens from the eye icon. Layout copied from the template screenshot:
// 900px wide, 339px image column, 188px dashed info box, 180px buttons.

import { useState } from 'react';
import SoftImg from '@/components/ui/Softimg';
import Stars from '@/components/ui/Stars';
import { formatMoney, type QuickViewProduct } from '@/types/product';
import { roboto } from '@/lib/fonts';

/* Template colours. Swap these three lines if you want your brand gradient instead. */
const PRICE_TEXT = 'text-[#ff3b4e]';
const ADD_BG = 'bg-[#ff3b4e] hover:bg-[#e6333e]';
const BUY_BG = 'bg-[#b1cf0e] hover:bg-[#9db90c]';

type Props = {
  product: QuickViewProduct;
  onClose: () => void;
  onAddToCart: (qty: number) => void;
  onBuyNow: (qty: number) => void;
};

export default function QuickViewModal({ product, onClose, onAddToCart, onBuyNow }: Props) {
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false); // TODO: connect to a wishlist context
  const [active, setActive] = useState(0);

  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];
  const mainImage = gallery[active] ?? product.image;
  const onSale = product.oldPrice !== undefined && product.oldPrice > product.price;

  return (
    <div
      className={`${roboto.className} fixed inset-0 z-[100] flex overflow-y-auto bg-black/55 p-4`}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        className="relative m-auto w-full max-w-[900px] bg-white px-6 pb-[38px] pt-[18px] shadow-2xl"
      >
        {/* close button: 32px grey square, 9px from the corner */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-[9px] top-[9px] z-10 flex h-8 w-8 items-center justify-center bg-[#8a8a8a] text-white transition-colors hover:bg-[#222]"
        >
          <svg className="h-[13px] w-[13px]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
            <path strokeLinecap="round" d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>

        <div className="grid gap-x-[27px] gap-y-6 md:grid-cols-[339px_minmax(0,1fr)]">
          {/* ======================= LEFT: images ======================= */}
          <div>
            <div className="flex aspect-square items-center justify-center border border-[#e5e5e5] bg-white">
              <SoftImg src={mainImage} alt={product.name} className="h-full w-full object-contain" />
            </div>

            <div className="mt-[10px] grid grid-cols-4 gap-[10px]">
              {gallery.slice(0, 4).map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`aspect-[76/75] border bg-white p-1 transition-colors ${
                    i === active ? 'border-[#ff3b4e]' : 'border-[#ddd] hover:border-[#aaa]'
                  }`}
                >
                  <SoftImg src={src} alt="" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* ======================= RIGHT: details ====================== */}
          <div className="min-w-0">
            {/* title / stars / price on the left, dashed info box on the right */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-[30px]">
              <div className="min-w-0 flex-1">
                <h2 className="text-[16px] font-normal leading-[18px] text-[#222]">{product.name}</h2>

                <div className="mt-[11px] flex items-center gap-1">
                  <Stars rating={product.rating ?? 0} />
                  <span className="text-[11px] text-[#666]">(0)</span>
                </div>

                <p className="mt-5 flex items-baseline gap-[10px]">
                  <span className={`text-[24px] font-bold leading-none ${PRICE_TEXT}`}>{formatMoney(product.price)}</span>
                  {onSale && (
                    <span className="text-[12px] font-bold text-[#555] line-through">{formatMoney(product.oldPrice!)}</span>
                  )}
                </p>
              </div>

              <dl className="grid shrink-0 grid-cols-[108px_1fr] content-start items-center self-start border border-dashed border-[#ddd] p-[10px] text-[11px] italic leading-[23px] text-[#888] sm:w-[188px]">
                {product.brand && (
                  <>
                    <dt>Brand:</dt>
                    <dd className="text-[#555]">{product.brand}</dd>
                  </>
                )}

                <dt>Product Code:</dt>
                <dd className="text-[#777]">{product.code ?? `LM-${product.id}`}</dd>

                <dt>Stock</dt>
                <dd className="flex items-center gap-1 text-[#777]">
                  {product.inStock === false ? (
                    'Out of stock'
                  ) : (
                    <>
                      <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12.5l3 3L17 9" />
                      </svg>
                      In stock
                    </>
                  )}
                </dd>

                {product.views !== undefined && (
                  <>
                    <dt>Viewed</dt>
                    <dd className="flex items-center gap-1 text-[#777]">
                      <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 5c-4.5 0-8.3 2.9-9.5 7 1.2 4.1 5 7 9.5 7s8.3-2.9 9.5-7c-1.2-4.1-5-7-9.5-7zm0 11a4 4 0 110-8 4 4 0 010 8zm0-6a2 2 0 100 4 2 2 0 000-4z" />
                      </svg>
                      {product.views}
                    </dd>
                    <dt>times</dt>
                    <dd />
                  </>
                )}
              </dl>
            </div>

            {/* overview */}
            {product.description && (
              <div className="mt-[30px]">
                <h3 className="text-[12px] font-bold uppercase leading-[18px] text-[#444]">Overview</h3>
                <p className="mt-[6px] line-clamp-4 text-[13px] leading-6 text-[#666]">{product.description}</p>
              </div>
            )}

            {/* qty */}
            <div className="mt-5">
              <p className="text-[12px] font-bold leading-4 text-[#444]">Qty</p>
              <div className="mt-[6px] inline-flex border border-[#ddd]">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-[29px] w-[31px] items-center justify-center bg-[#f4f4f4] text-[18px] font-bold leading-none text-[#888] transition-colors hover:bg-[#e8e8e8]"
                >
                  −
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  aria-label="Quantity"
                  value={qty}
                  onChange={(e) => {
                    const n = parseInt(e.target.value.replace(/\D/g, ''), 10);
                    setQty(Number.isFinite(n) && n > 0 ? Math.min(n, 99) : 1);
                  }}
                  className="h-[29px] w-[33px] border-x border-[#ddd] text-center text-[13px] text-[#333] outline-none"
                />
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  className="flex h-[29px] w-[31px] items-center justify-center bg-[#f4f4f4] text-[18px] font-bold leading-none text-[#888] transition-colors hover:bg-[#e8e8e8]"
                >
                  +
                </button>
              </div>
            </div>

            {/* buttons: 180 x 40, 17px apart */}
            <div className="mt-6 flex flex-wrap gap-[17px]">
              <button
                type="button"
                onClick={() => onAddToCart(qty)}
                className={`h-10 w-[180px] text-[12px] font-bold uppercase text-white transition-colors ${ADD_BG}`}
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={() => onBuyNow(qty)}
                className={`h-10 w-[180px] text-[12px] font-bold uppercase text-white transition-colors ${BUY_BG}`}
              >
                Buy now
              </button>
            </div>

            {/* wishlist */}
            <button
              type="button"
              onClick={() => setWished((v) => !v)}
              aria-pressed={wished}
              className="mt-4 flex items-center gap-[13px] text-[12px] uppercase text-[#666] transition-colors hover:text-[#ff3b4e]"
            >
              <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#fde3e6]">
                <svg
                  className={`h-3 w-3 ${wished ? 'text-[#ff3b4e]' : 'text-[#555]'}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>
              Add to wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}