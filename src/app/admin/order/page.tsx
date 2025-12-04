"use client";


import React, { useState } from 'react';
import { 
  Search, Filter, Download, Eye, MoreVertical, 
  CheckCircle, Clock, XCircle, Package, Truck,
  ChevronLeft, ChevronRight, Calendar
} from 'lucide-react';

// Types
type OrderStatus = 'delivered' | 'processing' | 'shipped' | 'pending' | 'cancelled';
type PaymentStatus = 'paid' | 'pending' | 'refunded';

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
}

interface StatusConfig {
  label: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  dotColor: string;
}

interface PaymentStatusConfig {
  label: string;
  color: string;
}

interface Stat {
  label: string;
  value: number;
  change?: string;
  color: string;
}

// Sample orders data
const ordersData: Order[] = [
  {
    id: 'ORD-2024-001',
    customer: 'John Doe',
    email: 'john.doe@email.com',
    date: '2024-12-01',
    items: 3,
    total: 125000,
    status: 'delivered',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-2024-002',
    customer: 'Jane Smith',
    email: 'jane.smith@email.com',
    date: '2024-12-02',
    items: 2,
    total: 89000,
    status: 'processing',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-2024-003',
    customer: 'Mike Johnson',
    email: 'mike.j@email.com',
    date: '2024-12-02',
    items: 5,
    total: 234000,
    status: 'shipped',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-2024-004',
    customer: 'Sarah Williams',
    email: 'sarah.w@email.com',
    date: '2024-12-03',
    items: 1,
    total: 45000,
    status: 'pending',
    paymentStatus: 'pending'
  },
  {
    id: 'ORD-2024-005',
    customer: 'David Brown',
    email: 'david.b@email.com',
    date: '2024-12-03',
    items: 4,
    total: 178000,
    status: 'cancelled',
    paymentStatus: 'refunded'
  },
  {
    id: 'ORD-2024-006',
    customer: 'Emily Davis',
    email: 'emily.d@email.com',
    date: '2024-12-03',
    items: 2,
    total: 67000,
    status: 'processing',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-2024-007',
    customer: 'Chris Wilson',
    email: 'chris.w@email.com',
    date: '2024-12-03',
    items: 3,
    total: 156000,
    status: 'delivered',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-2024-008',
    customer: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    date: '2024-12-03',
    items: 1,
    total: 92000,
    status: 'shipped',
    paymentStatus: 'paid'
  }
];

const OrderPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const statusConfig: Record<OrderStatus, StatusConfig> = {
    delivered: { 
      label: 'Delivered', 
      color: 'bg-green-100 text-green-700', 
      icon: CheckCircle,
      dotColor: 'bg-green-500'
    },
    processing: { 
      label: 'Processing', 
      color: 'bg-blue-100 text-blue-700', 
      icon: Clock,
      dotColor: 'bg-blue-500'
    },
    shipped: { 
      label: 'Shipped', 
      color: 'bg-purple-100 text-purple-700', 
      icon: Truck,
      dotColor: 'bg-purple-500'
    },
    pending: { 
      label: 'Pending', 
      color: 'bg-yellow-100 text-yellow-700', 
      icon: Clock,
      dotColor: 'bg-yellow-500'
    },
    cancelled: { 
      label: 'Cancelled', 
      color: 'bg-red-100 text-red-700', 
      icon: XCircle,
      dotColor: 'bg-red-500'
    }
  };

  const paymentStatusConfig: Record<PaymentStatus, PaymentStatusConfig> = {
    paid: { label: 'Paid', color: 'bg-green-100 text-green-700' },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
    refunded: { label: 'Refunded', color: 'bg-gray-100 text-gray-700' }
  };

  // Filter orders
  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  // Stats
  const stats: Stat[] = [
    {
      label: 'Total Orders',
      value: ordersData.length,
      change: '+12%',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      label: 'Pending',
      value: ordersData.filter(o => o.status === 'pending').length,
      color: 'bg-yellow-100 text-yellow-700'
    },
    {
      label: 'Processing',
      value: ordersData.filter(o => o.status === 'processing').length,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      label: 'Delivered',
      value: ordersData.filter(o => o.status === 'delivered').length,
      color: 'bg-green-100 text-green-700'
    }
  ];

  return (
    <div className='bg-gradient-to-t from-blue-100 via-white to-purple-200 min-h-screen w-full mt-4 p-3 rounded-lg shadow-md font-[lexend]'>
      <section className='bg-white min-h-screen rounded-lg shadow-md p-5'>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Orders</h1>
          <p className="text-gray-600 text-sm">Manage and track all customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{stat.label}</span>
                {stat.change && (
                  <span className="text-xs font-medium text-green-600">{stat.change}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className={`${stat.color} px-3 py-1 rounded-lg`}>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-4 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by order ID, customer name, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <button className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Customer</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Items</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Total</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Payment</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order, index) => {
                  const StatusIcon = statusConfig[order.status].icon;
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-semibold text-[0.875rem] text-purple-600">{order.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{order.customer}</div>
                          <div className="text-sm text-gray-500">{order.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{order.date}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{order.items} items</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-gray-900">₦{order.total.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${paymentStatusConfig[order.paymentStatus].color}`}>
                          {paymentStatusConfig[order.paymentStatus].label}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${statusConfig[order.status].dotColor}`} />
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[order.status].color} flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig[order.status].label}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors text-purple-600">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-4 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredOrders.length)}</span> of{' '}
              <span className="font-medium">{filteredOrders.length}</span> orders
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === i + 1
                        ? 'bg-purple-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderPage;