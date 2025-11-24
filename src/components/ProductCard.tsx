'use client';

import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import ProductModal from './ProductModal';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="relative h-[400px] perspective-1000"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          {/* Front of card */}
          <div className="absolute w-full h-full backface-hidden bg-white border rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow">
            <div className="cursor-pointer" onClick={() => setShowModal(true)}>
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <span className="text-blue-300 text-4xl">📦</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                  {'★'.repeat(4)}{'☆'}
                </div>
                <span className="text-sm text-gray-500">(128)</span>
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ${product.price}
              </p>
              <p className="text-sm text-gray-400 line-through">${(product.price * 1.3).toFixed(2)}</p>
            </div>
          </div>

          {/* Back of card */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-600 to-indigo-600 border rounded-lg p-4 shadow-xl rotate-y-180 flex flex-col justify-between text-white">
            <div>
              <h3 className="font-bold text-xl mb-3">{product.name}</h3>
              <p className="text-sm mb-4 opacity-90">{product.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Verified Seller</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Ships in 24hrs</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
              >
                View Details
              </button>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-indigo-500 text-white py-3 rounded-lg font-bold hover:bg-indigo-600 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>
      </div>

      {showModal && <ProductModal product={product} onClose={() => setShowModal(false)} />}
    </>
  );
}

