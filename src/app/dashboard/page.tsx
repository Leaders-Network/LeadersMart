'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import NextAuthGuard from '@/components/NextAuthGuard';

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

function DashboardContent() {
  const { user, logout } = useAuth();
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
                    <p className="text-3xl font-bold">₦437k</p>
                  </div>
                  <div className="text-4xl opacity-80">💳</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Saved Items</p>
                    <p className="text-3xl font-bold">8</p>
                  </div>
                  <div className="text-4xl opacity-80">⭐</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Items</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-blue-600 font-medium">#{order.id}</td>
                        <td className="py-3 px-4 text-gray-600">{order.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{order.items} items</td>
                        <td className="py-3 px-4 font-semibold text-gray-900">₦{order.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="font-bold text-gray-900">{user?.name}</h2>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>

          <nav className="p-4">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}

            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors mt-4"
            >
              <span className="text-xl">🚪</span>
              <span className="font-medium">Sign Out</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 mt-2">Here's what's happening with your account today.</p>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <NextAuthGuard>
      <DashboardContent />
    </NextAuthGuard>
  );
}
<p className="text-3xl font-bold">12</p>
                  </div >
  <div className="text-4xl opacity-80">❤️</div>
                </div >
              </div >
              
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
            </div >

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
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
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
          </div >
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
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
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
      <div className="min-h-screen bg-slate-100 text-slate-800">
        <div className="bg-gradient-to-r from-violet-700 via-indigo-700 to-blue-600 text-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.38em] text-violet-100">My Account</p>
                <h1 className="mt-2 text-3xl font-bold">LeadersMart</h1>
              </div>

              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-violet-50 backdrop-blur-sm">
                Welcome back, {user?.name}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-8">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 bg-gradient-to-br from-violet-50 via-blue-50 to-indigo-50 p-6">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-500 text-2xl font-bold text-white shadow-md">
                      {user?.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">{user?.name}</h3>
                    <p className="text-sm text-slate-600">{user?.email}</p>
                  </div>
                </div>

                <div className="max-h-[32rem] overflow-y-auto p-3">
                  <nav className="space-y-1">
                    {sidebarItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                          activeTab === item.id
                            ? 'bg-violet-600 text-white shadow-md'
                            : 'text-slate-700 hover:bg-violet-50 hover:text-violet-700'
                        }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

                <div className="border-t border-slate-200 p-4">
                  <button
                    onClick={signOut}
                    className="flex w-full items-center justify-center gap-3 rounded-lg bg-red-50 px-4 py-3 font-medium text-red-600 transition-colors hover:bg-red-100"
                  >
                    <span className="text-lg">🚪</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </aside>

            <main>{renderContent()}</main>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}