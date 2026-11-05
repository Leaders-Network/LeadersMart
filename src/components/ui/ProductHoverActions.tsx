'use client';

// src/components/ui/ProductHoverActions.tsx
// Dark overlay + cart / eye buttons that appear when the image is hovered.
// The parent element MUST have the classes:  group/img relative
// On touch screens (no hover) the two buttons sit in the image corner instead.

import { useProductModal } from '@/components/context/ProductModalContext';
import type { QuickViewProduct } from '@/types/product';

const BRAND_BG = 'bg-gradient-to-r from-[#4B4FED] via-[#8B52D7] to-[#C7449A]';

export default function ProductHoverActions({ product }: { product: QuickViewProduct }) {
  const { openQuickView, addToCartAndShow } = useProductModal();

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCartAndShow(product);
  };

  const handleEyeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center [@media(hover:none)]:items-end [@media(hover:none)]:justify-end [@media(hover:none)]:p-2">
      {/* dark overlay so the icons stand out */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-200 group-hover/img:opacity-100 group-focus-within/img:opacity-100 [@media(hover:none)]:hidden"
      />

      <div className="relative flex gap-px opacity-0 transition-opacity duration-200 group-hover/img:pointer-events-auto group-hover/img:opacity-100 group-focus-within/img:pointer-events-auto group-focus-within/img:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100">
        <button
          type="button"
          aria-label={`Add ${product.name} to cart`}
          title="Add to cart"
          onClick={handleCartClick}
          className={`flex h-[34px] w-[34px] items-center justify-center text-white transition-opacity hover:opacity-85 ${BRAND_BG}`}
        >
          <svg className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3c-.6.6-.2 1.7.7 1.7H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>

        <button
          type="button"
          aria-label={`Quick view ${product.name}`}
          title="Quick view"
          onClick={handleEyeClick}
          className="flex h-[34px] w-[34px] items-center justify-center bg-white text-[#222] transition-colors hover:text-indigo-600"
        >
          <svg className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}