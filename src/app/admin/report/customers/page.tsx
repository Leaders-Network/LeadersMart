"use client";

import React, { useState } from 'react';
import { 
  Users, TrendingUp, UserCheck, UserPlus, Calendar,
  Download, Filter, Search, ArrowUpRight, ArrowDownRight,
  Mail, Phone, MapPin, ShoppingBag, DollarSign
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Types
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

interface Stat {
  label: string;
  value: string | number;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// Sample data
const customersData: Customer[] = [
  {
    id: 'CUST-001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+234 801 234 5678',
    location: 'Lagos, Nigeria',
    totalOrders: 12,
    totalSpent: 450000,
    lastOrder: '2024-12-01',
    status: 'active',
    joinDate: '2024-01-15'
  },
  {
    id: 'CUST-002',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+234 802 345 6789',
    location: 'Abuja, Nigeria',
    totalOrders: 8,
    totalSpent: 320000,
    lastOrder: '2024-11-28',
    status: 'active',
    joinDate: '2024-02-20'
  },
  {
    id: 'CUST-003',
    name: 'Mike Johnson',
    email: 'mike.j@email.com',
    phone: '+234 803 456 7890',
    location: 'Port Harcourt, Nigeria',
    totalOrders: 15,
    totalSpent: 680000,
    lastOrder: '2024-12-03',
    status: 'active',
    joinDate: '2023-11-10'
  },
  {
    id: 'CUST-004',
    name: 'Sarah Williams',
    email: 'sarah.w@email.com',
    phone: '+234 804 567 8901',
    location: 'Ibadan, Nigeria',
    totalOrders: 5,
    totalSpent: 180000,
    lastOrder: '2024-10-15',
    status: 'inactive',
    joinDate: '2024-03-05'
  },
  {
    id: 'CUST-005',
    name: 'David Brown',
    email: 'david.b@email.com',
    phone: '+234 805 678 9012',
    location: 'Kano, Nigeria',
    totalOrders: 20,
    totalSpent: 890000,
    lastOrder: '2024-12-02',
    status: 'active',
    joinDate: '2023-08-22'
  },
  {
    id: 'CUST-006',
    name: 'Emily Davis',
    email: 'emily.d@email.com',
    phone: '+234 806 789 0123',
    location: 'Enugu, Nigeria',
    totalOrders: 6,
    totalSpent: 240000,
    lastOrder: '2024-11-30',
    status: 'active',
    joinDate: '2024-04-12'
  }
];

const customerGrowth = [
  { month: 'Jan', new: 45, total: 450 },
  { month: 'Feb', new: 52, total: 502 },
  { month: 'Mar', new: 48, total: 550 },
  { month: 'Apr', new: 61, total: 611 },
  { month: 'May', new: 55, total: 666 },
  { month: 'Jun', new: 67, total: 733 },
  { month: 'Jul', new: 58, total: 791 },
  { month: 'Aug', new: 63, total: 854 }
];

const segmentData = [
  { name: 'VIP (10+ orders)', value: 35, color: '#8b5cf6' },
  { name: 'Regular (5-10)', value: 40, color: '#3b82f6' },
  { name: 'New (1-5)', value: 25, color: '#10b981' }
];

const locationData = [
  { location: 'Lagos', customers: 285 },
  { location: 'Abuja', customers: 180 },
  { location: 'Port Harcourt', customers: 125 },
  { location: 'Ibadan', customers: 95 },
  { location: 'Kano', customers: 78 },
  { location: 'Others', customers: 137 }
];

const Customer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const stats: Stat[] = [
    {
      label: 'Total Customers',
      value: '800',
      change: 12.5,
      icon: Users,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      label: 'Active Customers',
      value: '687',
      change: 8.3,
      icon: UserCheck,
      color: 'bg-green-100 text-green-700'
    },
    {
      label: 'New This Month',
      value: '156',
      change: 15.7,
      icon: UserPlus,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      label: 'Avg Lifetime Value',
      value: '₦385,000',
      change: 5.2,
      icon: DollarSign,
      color: 'bg-orange-100 text-orange-700'
    }
  ];

  // Filter customers
  const filteredCustomers = customersData.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className='bg-gradient-to-t from-blue-100 via-white to-purple-200 min-h-screen w-full mt-4 p-3 rounded-lg shadow-md'>
      <section className='bg-white min-h-screen rounded-lg shadow-md p-5'>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Customer Report</h1>
          <p className="text-gray-600 text-sm">Comprehensive customer analytics and insights</p>
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Customer Growth */}
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Customer Growth</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={customerGrowth}>
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
                <Line 
                  type="monotone" 
                  dataKey="new" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  name="New Customers"
                  dot={{ fill: '#8b5cf6', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Total Customers"
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Customer Segments */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Customer Segments</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-3">
              {segmentData.map((segment) => (
                <div key={segment.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="text-sm text-gray-700">{segment.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{segment.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customers by Location */}
        <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-gray-100 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Customers by Location</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={locationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="location" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="customers" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Search and Filter */}
        <div className="bg-gradient-to-br from-pink-50 to-white rounded-lg p-4 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or customer ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <button className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Customer</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Contact</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Location</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Orders</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Total Spent</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Last Order</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-semibold text-gray-900">{customer.name}</div>
                        <div className="text-xs text-gray-500">{customer.id}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="text-xs">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="text-xs">{customer.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{customer.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-purple-400" />
                        <span className="font-semibold text-gray-900">{customer.totalOrders}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-gray-900">₦{customer.totalSpent.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{customer.lastOrder}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        customer.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
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

export default Customer;