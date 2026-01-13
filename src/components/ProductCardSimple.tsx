'use client';

import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function ProductCardSimple({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow h-[420px] flex flex-col">
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/400x400/e0e7ff/3b82f6?text=Product';
            }}
          />
        </div>
      </Link>
      <Link href={`/products/${product.id}`}>
        <h3 className="font-semibold text-base mb-2 line-clamp-2 h-12 hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
      </Link>
      <div className="flex items-center gap-2 mb-2">
        <div className="flex text-yellow-400 text-sm">
          {'★'.repeat(4)}{'☆'}
        </div>
        <span className="text-xs text-gray-500">(128)</span>
      </div>
      <div className="mt-auto">
        <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          ₦{product.price.toLocaleString()}
        </p>
        <p className="text-xs text-gray-400 line-through mb-3">₦{(product.price * 1.3).toLocaleString()}</p>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
