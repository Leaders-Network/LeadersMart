'use client';

// src/context/ProductModalContext.tsx
// One provider, two pop-ups. Every product card just calls openQuickView(p) or addToCartAndShow(p).

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';
import type { QuickViewProduct } from '@/types/product';
import QuickViewModal from '@/components/ui/QuickViewModal';
import AddedToCartModal from '@/components/ui/Addedtocartmodal';

type ModalContextValue = {
  openQuickView: (product: QuickViewProduct) => void;
  addToCartAndShow: (product: QuickViewProduct, qty?: number) => void;
};

const ProductModalContext = createContext<ModalContextValue | null>(null);

export function useProductModal() {
  const ctx = useContext(ProductModalContext);
  if (!ctx) throw new Error('useProductModal must be used inside <ProductModalProvider>');
  return ctx;
}

/* ==========================================================================
   CART BRIDGE  -  connects to your CartContext
   addToCart(product) adds ONE unit, so for qty > 1 it is called qty times
   (your context uses functional updates, so every call counts).
   Ids are converted to strings because CartContext works with string ids.
   ========================================================================== */
function useCartBridge() {
  const { addToCart, totalItems, totalPrice } = useCart();

  const add = (p: QuickViewProduct, qty: number) => {
    // Matches your Product type in @/types (category and description are required there)
    const item: Product = {
      id: String(p.id),
      name: p.name,
      price: p.price,
      image: p.image,
      images: p.images,
      category: p.category ?? '',
      description: p.description ?? '',
      brand: p.brand,
      stock: p.inStock === false ? 0 : undefined,
    };

    for (let i = 0; i < qty; i++) addToCart(item);
  };

  return { add, subtotal: totalPrice, totalItems };
}
/* ======================================================================== */

export function ProductModalProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const cart = useCartBridge();

  const [quickView, setQuickView] = useState<QuickViewProduct | null>(null);
  const [added, setAdded] = useState<{ product: QuickViewProduct; qty: number } | null>(null);

  const closeAll = () => {
    setQuickView(null);
    setAdded(null);
  };

  const openQuickView = (product: QuickViewProduct) => {
    setAdded(null);
    setQuickView(product);
  };

  const addToCartAndShow = (product: QuickViewProduct, qty = 1) => {
    cart.add(product, qty);
    setQuickView(null);
    setAdded({ product, qty });
  };

  const buyNow = (product: QuickViewProduct, qty: number) => {
    cart.add(product, qty);
    closeAll();
    router.push('/checkout');
  };

  /* Esc closes, and the page behind stops scrolling while a pop-up is open */
  const open = quickView !== null || added !== null;
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickView(null);
        setAdded(null);
      }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <ProductModalContext.Provider value={{ openQuickView, addToCartAndShow }}>
      {children}

      {quickView && (
        <QuickViewModal
          key={quickView.id}
          product={quickView}
          onClose={closeAll}
          onAddToCart={(qty) => addToCartAndShow(quickView, qty)}
          onBuyNow={(qty) => buyNow(quickView, qty)}
        />
      )}

      {added && (
        <AddedToCartModal
          product={added.product}
          qty={added.qty}
          subtotal={cart.subtotal || added.product.price * added.qty}
          totalItems={cart.totalItems || added.qty}
          onClose={closeAll}
        />
      )}
    </ProductModalContext.Provider>
  );
}