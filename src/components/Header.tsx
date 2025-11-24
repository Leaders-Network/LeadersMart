 'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { categories } from '@/data/categories';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { totalItems } = useCart();
  const [showCategories, setShowCategories] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-2">
        <div className="container mx-auto px-4 text-sm flex justify-between">
          <span>Welcome to ShopHub - Your trusted marketplace</span>
          <span>Free delivery on orders above $50</span>
        </div>
      </div>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ShopHub
          </Link>

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
            <Link href="/account" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-sm font-semibold">Account</span>
            </Link>

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

            {user && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push('/account/change-password')}
                  className="text-sm px-3 py-1 bg-white border border-blue-300 text-blue-700 rounded hover:bg-blue-50"
                >
                  Change password
                </button>

                <button
                  onClick={() => signOut()}
                  className="text-sm px-3 py-1 bg-white border border-red-300 text-red-600 rounded hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            )}

         

          <Link href="/" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
            Home
          </Link>
          <Link href="/deals" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
            Today's Deals
          </Link>
          <Link href="/help" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
            Help
          </Link>

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

        {/* <div className="mt-4 flex gap-6 items-center border-t pt-4">
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

          <Link href="/" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
            Home
          </Link>
          <Link href="/deals" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
            Today's Deals
          </Link>
          <Link href="/help" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
            Help
          </Link>
        </div> */}
      </nav>
    </header>
  );
}

