// src/types/product.ts
// The shape the hover buttons and both pop-ups need.
// DealProduct and SectionProduct already match it, so you can pass them in directly.

export type QuickViewProduct = {
  id: number | string;
  name: string;
  href: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating?: number; // 0 - 5
  /** Shown under OVERVIEW in the quick view (hidden when missing) */
  description?: string;
  /** Saved on the cart item (your Product type requires a category) */
  category?: string;
  /** Optional extras for the info box in the quick view */
  brand?: string;
  code?: string;
  inStock?: boolean;
  views?: number;
  /** Extra thumbnails. When there is more than one image, the thumbnail row appears. */
  images?: string[];
};

export const formatMoney = (n: number) => `₦${n.toFixed(2)}`;