'use client';

import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';
import StarRating from './StarRating';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(23,28,54,0.55)' }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ borderRadius: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white flex justify-between items-center px-6 py-4 border-b" style={{ borderColor: '#E6E8F1', borderRadius: '20px 20px 0 0' }}>
          <h2 className="text-[17px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>Product details</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#6F7489" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="p-6 flex flex-col sm:flex-row gap-6">
          <div className="sm:w-48 shrink-0">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden" style={{ background: '#F7F8FC' }}>
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-600 tracking-wider block mb-1.5" style={{ color: '#9DA3B4', fontWeight: 600 }}>
              {product.seller} · {product.categoryLabel}
            </span>
            <h3 className="text-[20px] font-700 text-[#171C36] mb-2" style={{ fontWeight: 700 }}>{product.name}</h3>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
            <div className="flex items-baseline gap-2 my-3">
              <span className="text-[26px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>₦{product.price.toLocaleString('en', { minimumFractionDigits: 2 })}</span>
              {product.originalPrice && (
                <span className="text-[14px] line-through" style={{ color: '#9DA3B4' }}>₦{product.originalPrice.toLocaleString('en', { minimumFractionDigits: 2 })}</span>
              )}
              {product.discount && (
                <span className="text-[12px] font-700 px-2 py-0.5 rounded-md" style={{ background: '#DEFA87', color: '#2D3A00', fontWeight: 700 }}>
                  −{product.discount}%
                </span>
              )}
            </div>
            <p className="text-[13px] leading-relaxed mb-4" style={{ color: '#6F7489' }}>{product.description}</p>
            <button
              onClick={() => { addToCart(product); onClose(); }}
              className="w-full py-3 rounded-xl text-white text-[14px] font-600 hover:opacity-90"
              style={{ background: '#4353EC', fontWeight: 600 }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
