'use client';

import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import AuthGuard from '@/components/AuthGuard';

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 25000,
    image: 'https://placehold.co/200x200/3b82f6/ffffff?text=Headphones',
    category: 'Electronics',
    description: 'High-quality wireless headphones',
    vendorLocation: 'Lagos, Nigeria',
    deliveryServices: [
      { id: 'dhl', name: 'DHL Express', price: 2500, estimatedDays: '1-2 days' },
      { id: 'local', name: 'Local Delivery', price: 1000, estimatedDays: '2-3 days' }
    ]
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 45000,
    image: 'https://placehold.co/200x200/10b981/ffffff?text=Watch',
    category: 'Electronics',
    description: 'Feature-rich smart watch',
    vendorLocation: 'Abuja, Nigeria',
    deliveryServices: [
      { id: 'dhl', name: 'DHL Express', price: 2500, estimatedDays: '1-2 days' },
      { id: 'fedex', name: 'FedEx', price: 3000, estimatedDays: '1-2 days' }
    ]
  },
  {
    id: '3',
    name: 'Laptop Bag',
    price: 15000,
    image: 'https://placehold.co/200x200/f59e0b/ffffff?text=Bag',
    category: 'Accessories',
    description: 'Durable laptop bag',
    vendorLocation: 'Port Harcourt, Nigeria',
    deliveryServices: [
      { id: 'local', name: 'Local Delivery', price: 800, estimatedDays: '2-3 days' }
    ]
  }
];

export default function TestCartPage() {
  const { addToCart } = useCart();

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Test Cart Functionality</h1>
        <p className="text-center text-gray-600 mb-8">
          Click "Add to Cart" to test the success notifications and cart preview in the header!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="text-sm text-blue-600 mb-3">📍 {product.vendorLocation}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    ₦{product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 font-semibold"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Features to Test:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">✅ Success Toast</h3>
              <p className="text-sm text-green-600">Shows when item added to cart</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">🛒 Cart Preview</h3>
              <p className="text-sm text-blue-600">Hover over cart icon in header</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">💾 Persistence</h3>
              <p className="text-sm text-purple-600">Cart saved to localStorage</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800">⏰ Auto Logout</h3>
              <p className="text-sm text-orange-600">After 30 minutes of inactivity</p>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}