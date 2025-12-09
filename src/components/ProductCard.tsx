'use client';

import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-[450px]"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full bg-white border rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow flex flex-col"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/400x400/e0e7ff/3b82f6?text=Product';
              }}
            />
          </div>
          <h3 className="font-semibold text-base mb-2 line-clamp-2 h-12">{product.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex text-yellow-400 text-sm">
              {'★'.repeat(4)}{'☆'}
            </div>
            <span className="text-xs text-gray-500">(128)</span>
          </div>
          <div className="mt-auto">
            <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ${product.price}
            </p>
            <p className="text-xs text-gray-400 line-through mb-3">${(product.price * 1.3).toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 border rounded-lg p-6 shadow-xl flex flex-col justify-center items-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="text-center mb-4">
            <p className="text-lg leading-relaxed font-semibold text-gray-900 line-clamp-6">{product.description}</p>
          </div>
          <Link
            href={`/products/${product.id}`}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
