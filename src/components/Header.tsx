'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/categories';
import { useState } from 'react';

export default function Header() {
  const { totalItems } = useCart();
  const [showCategories, setShowCategories] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">

      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-2">
        <div className="container mx-auto px-4 text-sm flex justify-between">
          <span>Welcome to ShopHub - Your trusted marketplace</span>
          <span>Free delivery on orders above ₦80,000</span>
        </div>
      </div>

      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link
            href="/"
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            ShopHub
          </Link>

          {/* Search Bar */}
          <div className="flex-1 mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, brands and categories..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button className="absolute right-0 top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-r-lg hover:from-blue-700 hover:to-indigo-700">
                Search
              </button>
            </div>
          </div>

          <div className="flex gap-6 items-center">

            {/* Account Dropdown */}
            <div
              className="relative cursor-pointer flex items-center gap-2 hover:text-blue-600 transition-colors"
              onMouseEnter={() => setShowAccountMenu(true)}
              onMouseLeave={() => setShowAccountMenu(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>

              <span className="text-sm font-semibold">Account</span>

              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>

              {showAccountMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-2xl rounded-lg overflow-hidden border-2 border-blue-100 z-50">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3">
                    <p className="font-semibold">Welcome!</p>
                    <p className="text-xs text-blue-100">Sign in to access your account</p>
                  </div>

                  <div className="py-2">

                    <Link
                      href="/login"
                      className="block px-4 py-3 hover:bg-blue-50 transition-colors font-medium text-gray-700 hover:text-blue-600"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Sign In</span>
                      </div>
                    </Link>

                    <Link
                      href="/signup"
                      className="block px-4 py-3 hover:bg-blue-50 transition-colors font-medium text-gray-700 hover:text-blue-600"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                          />
                        </svg>
                        <span>Sign Up</span>
                      </div>
                    </Link>

                    <div className="border-t my-2"></div>

                    <Link
                      href="/dashboard"
                      className="block px-4 py-3 hover:bg-blue-50 transition-colors font-medium text-gray-700 hover:text-blue-600"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 01 1m-6 0h6"
                          />
                        </svg>
                        <span>My Dashboard</span>
                      </div>
                    </Link>

                    <Link
                      href="/help"
                      className="block px-4 py-3 hover:bg-blue-50 transition-colors font-medium text-gray-700 hover:text-blue-600"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Help Center</span>
                      </div>
                    </Link>

                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="flex items-center gap-2 hover:text-blue-600 relative transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-sm font-semibold">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Top Links */}
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
              Home
            </Link>
            <Link href="/deals" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
              Today's Deals
            </Link>
            <Link href="/help" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
              Help
            </Link>

            {/* Categories */}
            <div
              className="relative"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 font-semibold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                All Categories
              </button>

              {showCategories && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-2xl rounded-lg overflow-hidden border-2 border-blue-100">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className="block px-6 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all border-b last:border-b-0 font-medium"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}
