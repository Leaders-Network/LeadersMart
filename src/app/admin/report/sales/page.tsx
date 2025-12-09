"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, DollarSign, ShoppingCart, Package,
  ArrowUpRight, ArrowDownRight, Download, Calendar,
  BarChart3, Target, Award, Activity
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Types
interface Stat {
  label: string;
  value: string | number;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface TopProduct {
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
  growth: number;
}

// Sample data
const salesData = [
  { month: 'Jan', revenue: 450000, profit: 135000, orders: 120 },
  { month: 'Feb', revenue: 520000, profit: 156000, orders: 145 },
  { month: 'Mar', revenue: 480000, profit: 144000, orders: 130 },
  { month: 'Apr', revenue: 610000, profit: 183000, orders: 165 },
  { month: 'May', revenue: 550000, profit: 165000, orders: 150 },
  { month: 'Jun', revenue: 670000, profit: 201000, orders: 180 },
  { month: 'Jul', revenue: 720000, profit: 216000, orders: 195 },
  { month: 'Aug', revenue: 680000, profit: 204000, orders: 175 },
  { month: 'Sep', revenue: 780000, profit: 234000, orders: 210 },
  { month: 'Oct', revenue: 850000, profit: 255000, orders: 230 },
  { month: 'Nov', revenue: 920000, profit: 276000, orders: 250 },
  { month: 'Dec', revenue: 980000, profit: 294000, orders: 270 }
];

const dailySales = [
  { day: 'Mon', sales: 35000 },
  { day: 'Tue', sales: 42000 },
  { day: 'Wed', sales: 38000 },
  { day: 'Thu', sales: 51000 },
  { day: 'Fri', sales: 45000 },
  { day: 'Sat', sales: 32000 },
  { day: 'Sun', sales: 28000 }
];

const revenueByCategory = [
  { category: 'Electronics', revenue: 850000, percentage: 35 },
  { category: 'Fashion', revenue: 610000, percentage: 25 },
  { category: 'Home & Living', revenue: 485000, percentage: 20 },
  { category: 'Sports', revenue: 365000, percentage: 15 },
  { category: 'Others', revenue: 120000, percentage: 5 }
];

const topProducts: TopProduct[] = [
  { name: 'Premium Headphones', category: 'Electronics', unitsSold: 1240, revenue: 1240000, growth: 15.3 },
  { name: 'Wireless Mouse', category: 'Electronics', unitsSold: 980, revenue: 490000, growth: 12.8 },
  { name: 'Mechanical Keyboard', category: 'Electronics', unitsSold: 756, revenue: 1134000, growth: -3.2 },
  { name: 'USB-C Hub', category: 'Electronics', unitsSold: 650, revenue: 325000, growth: 22.5 },
  { name: 'Laptop Stand', category: 'Accessories', unitsSold: 542, revenue: 271000, growth: 8.7 },
  { name: 'Phone Case', category: 'Accessories', unitsSold: 890, revenue: 178000, growth: 18.4 }
];

const performanceMetrics = [
  { metric: 'Conversion Rate', value: '3.8%', target: '4.0%', progress: 95 },
  { metric: 'Avg Order Value', value: '₦163,353', target: '₦150,000', progress: 108 },
  { metric: 'Customer Retention', value: '87%', target: '85%', progress: 102 },
  { metric: 'Sales Growth', value: '15.3%', target: '12%', progress: 127 }
];

const Sales: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('12M');

  const stats: Stat[] = [
    {
      label: 'Total Revenue',
      value: '₦8,710,000',
      change: 15.3,
      icon: DollarSign,
      color: 'bg-green-100 text-green-700'
    },
    {
      label: 'Gross Profit',
      value: '₦2,613,000',
      change: 18.2,
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      label: 'Units Sold',
      value: '6,890',
      change: 12.5,
      icon: Package,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      label: 'Avg Order Value',
      value: '₦163,353',
      change: 8.7,
      icon: ShoppingCart,
      color: 'bg-orange-100 text-orange-700'
    }
  ];

  return (
    <div className='bg-gradient-to-t from-blue-100 via-white to-purple-200 min-h-screen w-full mt-4 p-3 rounded-lg shadow-md'>
      <section className='bg-white min-h-screen rounded-lg shadow-md p-5'>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sales Report</h1>
          <p className="text-gray-600 text-sm">Comprehensive sales analytics and revenue insights</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            const isPositive = stat.change >= 0;
            return (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-5 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <StatIcon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                    isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(stat.change)}%
                  </div>
                </div>
                <h3 className="text-sm text-gray-600 mb-1">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Revenue & Profit Chart */}
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Revenue & Profit Trends</h2>
              <p className="text-sm text-gray-500 mt-1">Monthly performance overview</p>
            </div>
            <div className="flex gap-2">
              {['6M', '12M', '2Y', 'All'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                fill="url(#colorRevenue)" 
                name="Revenue (₦)"
              />
              <Area 
                type="monotone" 
                dataKey="profit" 
                stroke="#10b981" 
                strokeWidth={3}
                fill="url(#colorProfit)" 
                name="Profit (₦)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Sales and Revenue by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Sales */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Daily Sales Performance</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by Category */}
          <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Revenue by Category</h2>
            <div className="space-y-4 mt-6">
              {revenueByCategory.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">₦{item.revenue.toLocaleString()}</span>
                      <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage * 2}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Performance Metrics</h2>
              <p className="text-sm text-gray-500 mt-1">Key performance indicators vs targets</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200">
              <Target className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Q4 2024</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">{metric.metric}</h4>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                  <span className="text-xs text-gray-500">/ {metric.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      metric.progress >= 100 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'
                    }`}
                    style={{ width: `${Math.min(metric.progress, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{metric.progress}% of target</span>
                  {metric.progress >= 100 && <Award className="w-4 h-4 text-green-600" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Top Selling Products</h2>
              <p className="text-sm text-gray-500 mt-1">Best performers by revenue</p>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Rank</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Product</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Category</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Units Sold</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Growth</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-white transition-colors">
                    <td className="py-4 px-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                        index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                        'bg-gradient-to-br from-purple-500 to-pink-500'
                      }`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-purple-500" />
                        <span className="font-semibold text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">{product.category}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">{product.unitsSold.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-gray-900">₦{product.revenue.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className={`flex items-center gap-1 ${
                        product.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.growth >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        <span className="text-sm font-medium">{Math.abs(product.growth)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sales;