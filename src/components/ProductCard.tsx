'use client';

import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
  variant?: 'flash' | 'popular';
}

export default function ProductCard({ product, variant = 'popular' }: ProductCardProps) {
  const { addToCart, toggleFavorite, favorites } = useCart();
  const isFav = favorites.includes(product.id);
  const claimedPct = product.claimed ?? 0;
  const totalStock = product.stock ? Math.round(product.stock / (1 - claimedPct / 100)) : 0;

  return (
    <div
      className="bg-white flex flex-col overflow-hidden hover:shadow-md transition-shadow"
      style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}
    >
      {/* Image area */}
      <div className="relative" style={{ aspectRatio: '1/1', background: '#F7F8FC' }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Discount badge */}
        {product.discount && (
          <span
            className="absolute top-3 left-3 text-[11px] font-700 px-2 py-0.5 rounded-md"
            style={{ background: '#DEFA87', color: '#2D3A00', fontWeight: 700 }}
          >
            −{product.discount}%
          </span>
        )}

        {/* Badge (BESTSELLER / NEW FIND / STAFF PICK) */}
        {product.badge && (
          <span
            className="absolute top-3 left-3 text-[10px] font-700 px-2 py-0.5 rounded-md text-white"
            style={{ background: product.badge === 'BESTSELLER' ? '#171C36' : product.badge === 'NEW FIND' ? '#167A59' : '#4353EC', fontWeight: 700 }}
          >
            {product.badge}
          </span>
        )}

        {/* Favorite button */}
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
          style={{ background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={isFav ? '#4353EC' : 'none'}>
            <path
              d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              stroke={isFav ? '#4353EC' : '#9DA3B4'}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        {/* Seller / category */}
        <span className="text-[10px] font-600 tracking-wider" style={{ color: '#9DA3B4', fontWeight: 600, letterSpacing: '0.06em' }}>
          {product.seller} · {product.categoryLabel}
        </span>

        {/* Name */}
        <h3 className="text-[14px] font-600 text-[#171C36] line-clamp-2 leading-snug" style={{ fontWeight: 600 }}>
          {product.name}
        </h3>

        {/* Stars */}
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-[22px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>
            ₦{product.price.toLocaleString('en', { minimumFractionDigits: 2 })}
          </span>
          {product.originalPrice && (
            <span className="text-[13px] line-through" style={{ color: '#9DA3B4' }}>
              ₦{product.originalPrice.toLocaleString('en', { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>

        {/* Stock progress (flash variant) */}
        {variant === 'flash' && product.stock !== undefined && (
          <div className="mt-1">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#EEEDFF' }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${claimedPct}%`, background: '#4353EC' }}
              />
            </div>
            <span className="text-[11px] mt-1 block" style={{ color: '#6F7489' }}>
              {product.stock} left · {claimedPct}% claimed
            </span>
          </div>
        )}

        {/* Add to cart button */}
        <button
          onClick={() => addToCart(product)}
          className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-600 hover:opacity-90 transition-opacity"
          style={{ background: '#EEEDFF', color: '#4353EC', fontWeight: 600, marginTop: 'auto' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="3" y1="6" x2="21" y2="6" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M16 10a4 4 0 01-8 0" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
}
