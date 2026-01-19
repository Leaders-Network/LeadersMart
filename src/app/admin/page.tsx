"use client";

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

/* ------------------ TYPES ------------------ */
type Status = 'All' | 'active' | 'low' | 'out';

interface StatusConfig {
  bg: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
}

/* ------------------ DATA ------------------ */
const statuses: Status[] = ['All', 'active', 'low', 'out'];

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

/* ------------------ HELPERS ------------------ */
const getStatusConfig = (status: Status): StatusConfig => {
  switch (status) {
    case 'active':
      return {
        bg: 'bg-green-50',
        text: 'text-green-700',
        icon: CheckCircle,
        label: 'In Stock'
      };
    case 'low':
      return {
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        icon: AlertTriangle,
        label: 'Low Stock'
      };
    case 'out':
      return {
        bg: 'bg-red-50',
        text: 'text-red-700',
        icon: XCircle,
        label: 'Out of Stock'
      };
    default:
      return {
        bg: 'bg-gray-50',
        text: 'text-gray-700',
        icon: Package,
        label: 'All Products'
      };
  }
};

/* ------------------ COMPONENTS ------------------ */
const StatCard = ({ title, value, change, icon: Icon }: StatCardProps) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white font-[lexend] rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-purple-100">
          <Icon className="w-6 h-6 text-purple-600" />
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
    </div>
  );
};

/* ------------------ PAGE ------------------ */
const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState<'7D' | '1M' | '3M' | '12M'>('12M');

  const stats = [
    { title: "Total Revenue", value: 2450300, change: 12.5, icon: DollarSign },
    { title: "Total Orders", value: 1500, change: 8.3, icon: ShoppingCart },
    { title: "Total Customers", value: 800, change: -3.2, icon: Users },
    { title: "Total Products", value: 124, change: 5.4, icon: Package }
  ];

  return (
    <div className="bg-gradient-to-t from-blue-100 via-white to-purple-200 min-h-screen w-full mt-4 p-3 rounded-lg shadow-md">
      <div className="bg-white min-h-screen rounded-lg shadow-md p-5">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
