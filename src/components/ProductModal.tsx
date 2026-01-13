'use client';

import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Product Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/800x800/e0e7ff/3b82f6?text=Product';
                  }}
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(product.images || [product.image]).slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-blue-500"
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/200x200/e0e7ff/3b82f6?text=Image';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex text-yellow-400 text-xl">
                  {'★'.repeat(4)}{'☆'}
                </div>
                <span className="text-gray-600">(128 reviews)</span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    ₦{product.price.toLocaleString()}
                  </span>
                  <span className="text-xl text-gray-400 line-through">₦{(product.price * 1.3).toLocaleString()}</span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -23%
                  </span>
                </div>
              </div>

              <div className="border-t border-b py-4 mb-6">
                <h3 className="font-semibold text-lg mb-3">Product Description</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Key Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700">High quality materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700">Free delivery nationwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700">30-day return policy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700">Verified seller guarantee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700">Ships within 24 hours</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
                >
                  Add to Cart
                </button>
                <button className="px-6 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
