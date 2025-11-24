'use client';

import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  const { addToCart } = useCart();

  if (!product) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Home
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-xl">Product Image</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-gray-900 mb-4">${product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
