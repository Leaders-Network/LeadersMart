'use client';

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';
import { useState } from 'react';

const deliveryServices = [
  { id: 'dhl', name: 'DHL Express', price: 25600, estimatedDays: '1-2 days' },
  { id: 'chowdeck', name: 'Chowdeck', price: 14400, estimatedDays: '2-3 days' },
  { id: 'ridedeliva', name: 'Ridedeliva', price: 20800, estimatedDays: '1-3 days' },
];

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, updateDeliveryService, totalPrice, totalDeliveryPrice, clearCart, totalItems } = useCart();
  const { user } = useAuth();

  if (cart.length === 0) {
    return (
      <AuthGuard>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Browse our categories and discover amazing deals!</p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 font-semibold"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Shopping Cart ({totalItems} items)
            </h1>
            <p className="text-gray-600">Welcome, {user?.name}!</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold">Product</th>
                      <th className="text-left p-4 font-semibold">Vendor Location</th>
                      <th className="text-left p-4 font-semibold">Delivery Service</th>
                      <th className="text-left p-4 font-semibold">Quantity</th>
                      <th className="text-right p-4 font-semibold">Total</th>
                      <th className="text-center p-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id} className="border-b last:border-b-0">
                        <td className="p-4">
                          <div className="flex gap-3 items-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded flex-shrink-0 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://placehold.co/100x100/e0e7ff/3b82f6?text=Product';
                                }}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                              <p className="text-lg font-bold text-green-600">
                                ₦{item.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">{item.vendorLocation}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <select
                            value={item.selectedDeliveryService?.id || ''}
                            onChange={(e) => {
                              const service = item.deliveryServices.find(s => s.id === e.target.value);
                              if (service) updateDeliveryService(item.id, service);
                            }}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {item.deliveryServices.map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.name} - ₦{service.price.toLocaleString()} ({service.estimatedDays})
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center border rounded-lg w-fit">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100 transition-colors text-sm"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 border-x font-semibold text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100 transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div>
                            <p className="font-bold text-lg text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</p>
                            <p className="text-sm text-gray-600">+ ₦{((item.selectedDeliveryService?.price || 0) * item.quantity).toLocaleString()} delivery</p>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 font-semibold text-sm"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t bg-gray-50">
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 font-semibold text-sm"
                >
                  Clear Cart
                </button>
              </div>
                </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 border-b pb-3">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Total Delivery Fees</span>
                  <span className="font-semibold text-blue-600">₦{totalDeliveryPrice.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-xl">
                  <span>Grand Total</span>
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    ₦{(totalPrice + totalDeliveryPrice).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Delivery Summary */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-sm mb-2 text-blue-900">Delivery Summary</h3>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs text-blue-700 mb-1">
                    <span>{item.name} ({item.quantity}x)</span>
                    <span>{item.selectedDeliveryService?.name} - ₦{((item.selectedDeliveryService?.price || 0) * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 font-bold text-lg mb-3">
                Proceed to Checkout
              </button>
              <Link
                href="/"
                className="block text-center text-blue-600 hover:text-green-600 font-semibold transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
