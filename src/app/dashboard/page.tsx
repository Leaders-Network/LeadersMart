'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import AuthGuard from '@/components/AuthGuard';

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'orders', label: 'My Orders', icon: '📦' },
  { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
  { id: 'profile', label: 'Profile Settings', icon: '👤' },
  { id: 'addresses', label: 'Addresses', icon: '📍' },
  { id: 'payment', label: 'Payment Methods', icon: '💳' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'security', label: 'Security', icon: '🔒' },
  { id: 'support', label: 'Help & Support', icon: '❓' },
  { id: 'settings', label: 'Account Settings', icon: '⚙️' },
];

const mockOrders = [
  { id: '1', date: '2024-01-10', status: 'Delivered', total: 125000, items: 3 },
  { id: '2', date: '2024-01-08', status: 'Shipped', total: 89000, items: 2 },
  { id: '3', date: '2024-01-05', status: 'Processing', total: 156000, items: 4 },
  { id: '4', date: '2024-01-03', status: 'Delivered', total: 67000, items: 1 },
];

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Orders</p>
                    <p className="text-3xl font-bold">24</p>
                  </div>
                  <div className="text-4xl opacity-80">📦</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Wishlist Items</p>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                  <div className="text-4xl opacity-80">❤️</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Total Spent</p>
                    <p className="text-3xl font-bold">₦3.9M</p>
                  </div>
                  <div className="text-4xl opacity-80">💰</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Rewards Points</p>
                    <p className="text-3xl font-bold">1,250</p>
                  </div>
                  <div className="text-4xl opacity-80">🎁</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold">Date</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Items</th>
                      <th className="text-left py-3 px-4 font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">#{order.id}</td>
                        <td className="py-3 px-4 text-gray-600">{order.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{order.items} items</td>
                        <td className="py-3 px-4 font-semibold">₦{order.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'orders':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-2xl font-bold mb-6">Order History</h3>
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Order #{order.id}</h4>
                      <p className="text-gray-600 text-sm">Placed on {order.date}</p>
                      <p className="text-gray-600 text-sm">{order.items} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₦{order.total.toLocaleString()}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'profile':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-2xl font-bold mb-6">Profile Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-xl font-semibold">{user?.name}</h4>
                  <p className="text-gray-600">{user?.email}</p>
                  <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Change Avatar
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-2xl font-bold mb-4">{sidebarItems.find(item => item.id === activeTab)?.label}</h3>
            <p className="text-gray-600">This section is coming soon...</p>
          </div>
        );
    }
  };

  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
            <p className="text-blue-100">Welcome back, {user?.name}!</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Scrollable Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-8">
                {/* User Profile Section */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-b">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                      {user?.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="font-bold text-lg text-gray-800">{user?.name}</h3>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>

                {/* Navigation Menu - Scrollable */}
                <div className="max-h-96 overflow-y-auto">
                  <nav className="p-2">
                    {sidebarItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 mb-1 flex items-center gap-3 ${
                          activeTab === item.id
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Logout Button */}
                <div className="p-4 border-t">
                  <button
                    onClick={signOut}
                    className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center gap-3"
                  >
                    <span className="text-lg">🚪</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}