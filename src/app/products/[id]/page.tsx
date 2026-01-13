'use client';

import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { use, useState } from 'react';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Blue');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Medium');

  if (!product) notFound();

  const images = product.images || [product.image];
  const colors = product.colors || ['Blue', 'Black', 'Red', 'White'];
  const sizes = product.sizes || ['Small', 'Medium', 'Large', 'X-Large'];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block font-semibold">
          ← Back to Shopping
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-xl shadow-lg p-8">
          {/* Left: Images */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/500?text=Product+Image';
                }}
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedImage === index ? 'ring-4 ring-blue-500' : 'hover:ring-2 ring-blue-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/150?text=Image';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex text-yellow-400 text-xl">
                {'★'.repeat(4)}{'☆'}
              </div>
              <span className="text-gray-600">4.0 out of 5</span>
              <span className="text-blue-600 hover:underline cursor-pointer">(2,847 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-blue-900">₦{product.price.toLocaleString()}</span>
                <span className="text-2xl text-gray-400 line-through">₦{(product.price * 1.3).toLocaleString()}</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Save 23%
                </span>
              </div>
              <p className="text-green-600 font-semibold mt-2">In Stock</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-bold text-xl mb-3">About this item</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Premium quality materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Fast and free delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">30-day return policy</span>
                </li>
              </ul>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-2 border-2 rounded-lg font-semibold transition-all ${
                      selectedColor === color
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Size: {selectedSize}</h3>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 border-2 rounded-lg font-semibold transition-all ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors font-bold text-xl"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x-2 border-gray-300 font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors font-bold text-xl"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-600">Only 12 left in stock</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addToCart(product);
                  }
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
              >
                Add to Cart
              </button>
              <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Shipping Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-blue-900">Free Delivery</p>
                  <p className="text-sm text-gray-600">Order within 3 hrs 24 mins</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-blue-900">Secure Transaction</p>
                  <p className="text-sm text-gray-600">Your payment information is protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">4.0</div>
              <div className="flex justify-center text-yellow-400 text-2xl mb-2">
                {'★'.repeat(4)}{'☆'}
              </div>
              <p className="text-gray-600">2,847 global ratings</p>
            </div>
            <div className="md:col-span-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold w-12">{star} star</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6">
                    <div
                      className="bg-yellow-400 h-6 rounded-full"
                      style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : 5}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">{star === 5 ? 70 : star === 4 ? 20 : 5}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Reviews */}
          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b pb-6 last:border-b-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <div className="flex text-yellow-400 text-sm">{'★'.repeat(5)}</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Great product! Exactly as described. The quality is excellent and delivery was fast. Highly
                  recommend!
                </p>
                <p className="text-sm text-gray-500 mt-2">Reviewed on November 25, 2024</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
