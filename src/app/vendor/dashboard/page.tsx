'use client'

import { useAuth } from '@/hooks/useAuth'

export default function VendorDashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.contactName || user?.name}! 👋
        </h1>
        <p className="text-gray-600">
          Business: <span className="font-semibold">{user?.businessName}</span>
        </p>
        <p className="text-gray-600">
          Status: <span className={`font-semibold ${user?.active ? 'text-green-600' : 'text-red-600'}`}>
            {user?.active ? 'Active' : 'Inactive'}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Products</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div className="text-4xl opacity-80">📦</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Orders</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div className="text-4xl opacity-80">🛒</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Revenue</p>
              <p className="text-3xl font-bold">₦0</p>
            </div>
            <div className="text-4xl opacity-80">💰</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Reviews</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div className="text-4xl opacity-80">⭐</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <div className="text-2xl mb-2">➕</div>
            <div className="font-semibold text-gray-700">Add Product</div>
            <div className="text-sm text-gray-500">List a new product</div>
          </button>

          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold text-gray-700">View Analytics</div>
            <div className="text-sm text-gray-500">Check your performance</div>
          </button>

          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-semibold text-gray-700">Settings</div>
            <div className="text-sm text-gray-500">Manage your account</div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Getting Started</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
            <span className="text-gray-700">Account created successfully</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm">2</div>
            <span className="text-gray-500">Complete business verification</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm">3</div>
            <span className="text-gray-500">Add your first product</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm">4</div>
            <span className="text-gray-500">Set up payment methods</span>
          </div>
        </div>
      </div>
    </div>
  )
}