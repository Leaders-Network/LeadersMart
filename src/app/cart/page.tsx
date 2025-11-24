'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart, totalItems } = useCart();

  if (cart.length === 0) {
    return (
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
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
          Shopping Cart ({totalItems} items)
        </h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b py-6 last:border-b-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-50 rounded flex-shrink-0 flex items-center justify-center">
                    <span className="text-3xl">📦</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                      ${item.price}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-4 py-2 hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 border-x font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-4 py-2 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <button
                onClick={clearCart}
                className="mt-4 text-red-600 hover:text-red-700 font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 border-b pb-3">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 font-bold text-lg mb-3">
                Proceed to Checkout
              </button>
              <Link
                href="/"
                className="block text-center text-blue-600 hover:text-indigo-600 font-semibold transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
