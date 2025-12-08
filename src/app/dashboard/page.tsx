'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-blue-100">Welcome back, John!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  JD
                </div>
                <h3 className="font-bold text-lg">John Doe</h3>
                <p className="text-sm text-gray-500">john@example.com</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📊 Overview
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === 'orders' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📦 My Orders
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === 'wishlist'
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  ❤️ Wishlist
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  👤 Profile
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === 'addresses'
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📍 Addresses
                </button>
                <Link
                  href="/"
                  className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  🚪 Logout
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Account Overview</h2>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Total Orders</p>
                        <p className="text-3xl font-bold text-blue-900">24</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Wishlist Items</p>
                        <p className="text-3xl font-bold text-blue-900">12</p>
                      </div>
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Total Spent</p>
                        <p className="text-3xl font-bold text-blue-900">$2,450</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Recent Orders</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">📦</span>
                          </div>
                          <div>
                            <p className="font-semibold">Order #100{i}</p>
                            <p className="text-sm text-gray-500">Placed on Nov {20 + i}, 2024</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-900">${99.99 * i}</p>
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            Delivered
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 text-blue-600 font-semibold hover:text-blue-700">
                    View All Orders →
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-6">My Orders</h2>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-gray-600">Your order history will appear here.</p>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-6">My Wishlist</h2>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-gray-600">Your saved items will appear here.</p>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Profile Settings</h2>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-gray-600">Update your profile information here.</p>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Saved Addresses</h2>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-gray-600">Manage your delivery addresses here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
