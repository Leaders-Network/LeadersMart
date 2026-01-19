"use client";


import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data
const salesData = [
  { name: 'Jan', revenue: 45000, orders: 120 },
  { name: 'Feb', revenue: 52000, orders: 145 },
  { name: 'Mar', revenue: 48000, orders: 130 },
  { name: 'Apr', revenue: 61000, orders: 165 },
  { name: 'May', revenue: 55000, orders: 150 },
  { name: 'Jun', revenue: 67000, orders: 180 },
  { name: 'Jul', revenue: 72000, orders: 195 },
  { name: 'Aug', revenue: 68000, orders: 175 },
  { name: 'Sep', revenue: 78000, orders: 210 },
  { name: 'Oct', revenue: 85000, orders: 230 },
  { name: 'Nov', revenue: 92000, orders: 250 },
  { name: 'Dec', revenue: 98000, orders: 270 }
];

const topProducts = [
  { name: 'Premium Headphones', sales: 1240, revenue: 124000, trend: 12.5, color: '#8b5cf6' },
  { name: 'Wireless Mouse', sales: 980, revenue: 49000, trend: 8.3, color: '#ec4899' },
  { name: 'Mechanical Keyboard', sales: 756, revenue: 113400, trend: -3.2, color: '#3b82f6' },
  { name: 'USB-C Hub', sales: 650, revenue: 32500, trend: 15.7, color: '#10b981' },
  { name: 'Laptop Stand', sales: 542, revenue: 27100, trend: 5.4, color: '#f59e0b' }
];

const categoryData = [
  { name: 'Electronics', value: 45, color: '#8b5cf6' },
  { name: 'Accessories', value: 30, color: '#ec4899' },
  { name: 'Peripherals', value: 15, color: '#3b82f6' },
  { name: 'Others', value: 10, color: '#10b981' }
];

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
}

const StatCard = ({ title, value, change, icon: Icon }: StatCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white font-[lexend] rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          title.includes('Revenue') ? 'bg-purple-100' :
          title.includes('Orders') ? 'bg-blue-100' :
          title.includes('Customers') ? 'bg-pink-100' :
          'bg-green-100'
        }`}>
          <Icon className={`w-6 h-6 ${
            title.includes('Revenue') ? 'text-purple-600' :
            title.includes('Orders') ? 'text-blue-600' :
            title.includes('Customers') ? 'text-pink-600' :
            'text-green-600'
          }`} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">
        {title.includes('Revenue') ? `₦${value.toLocaleString()}` : value.toLocaleString()}
      </p>
      <p className="text-xs text-gray-500 mt-2">
        {isPositive ? '+' : ''}{change}% from last month
      </p>
    </div>
  );
};

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('12M');
  
  const stats = [
    { title: "Total Revenue", value: 2450300, change: 12.5, icon: DollarSign },
    { title: "Total Orders", value: 1500, change: 8.3, icon: ShoppingCart },
    { title: "Total Customers", value: 800, change: -3.2, icon: Users },
    { title: "Total Products", value: 124, change: 5.4, icon: Package }
  ];
  
  return (
    <div className='bg-gradient-to-t from-blue-100 via-white to-purple-200 min-h-screen w-full mt-4 p-3 rounded-lg shadow-md'>
      <div className='bg-white min-h-screen rounded-lg shadow-md p-5'>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              title={stat.title} 
              value={stat.value} 
              change={stat.change}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 shadow-sm border border-gray-100 font-[lexend]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Revenue Overview</h2>
                <p className="text-sm text-gray-500 mt-1">Monthly revenue trends</p>
              </div>
              <div className="flex gap-2">
                {['7D', '1M', '3M', '12M'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      timeRange === range
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-sm border border-gray-100 font-[lexend]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Sales by Category</h2>
                <p className="text-sm text-gray-500 mt-1">Product distribution</p>
              </div>
              <button className="p-2 hover:bg-white rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            <div className="mt-4 space-y-3 ">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center justify-between font-[lexend]">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{category.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 shadow-sm border border-gray-100 font-[lexend]">
          <div className="flex items-center justify-between mb-6 font-[lexend]">
            <div>
              <h2 className="text-lg font-bold text-gray-900 font-[lexend]">Top Performing Products</h2>
              <p className="text-sm text-gray-500 mt-1">Best sellers this month</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              View All
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto font-[lexend]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Product</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Sales</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Trend</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Performance</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold"
                          style={{ backgroundColor: product.color }}
                        >
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{product.sales.toLocaleString()}</td>
                    <td className="py-4 px-4 font-semibold text-gray-900">₦{product.revenue.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <div className={`flex items-center gap-1 ${
                        product.trend >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.trend >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        <span className="text-sm font-medium">{Math.abs(product.trend)}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${Math.min((product.sales / 1240) * 100, 100)}%`,
                            backgroundColor: product.color
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;