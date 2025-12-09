"use client";

import { useState } from 'react';
import { 
  Search, Filter, Download, CreditCard, CheckCircle, 
  XCircle, Clock, AlertCircle, TrendingUp, Calendar,
  ChevronLeft, ChevronRight, MoreVertical, Eye
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Types
type PaymentStatus = 'completed' | 'pending' | 'failed' | 'refunded';
type PaymentMethod = 'card' | 'bank_transfer' | 'paystack' | 'flutterwave';

interface Payment {
  id: string;
  transactionId: string;
  customer: string;
  email: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  date: string;
  orderId: string;
}

interface StatusConfig {
  label: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  dotColor: string;
}

interface Stat {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// Sample payment data
const paymentsData: Payment[] = [
  {
    id: 'PAY-001',
    transactionId: 'TXN-2024-12-001',
    customer: 'John Doe',
    email: 'john.doe@email.com',
    amount: 125000,
    method: 'card',
    status: 'completed',
    date: '2024-12-03',
    orderId: 'ORD-2024-001'
  },
  {
    id: 'PAY-002',
    transactionId: 'TXN-2024-12-002',
    customer: 'Jane Smith',
    email: 'jane.smith@email.com',
    amount: 89000,
    method: 'paystack',
    status: 'completed',
    date: '2024-12-03',
    orderId: 'ORD-2024-002'
  },
  {
    id: 'PAY-003',
    transactionId: 'TXN-2024-12-003',
    customer: 'Mike Johnson',
    email: 'mike.j@email.com',
    amount: 234000,
    method: 'bank_transfer',
    status: 'pending',
    date: '2024-12-03',
    orderId: 'ORD-2024-003'
  },
  {
    id: 'PAY-004',
    transactionId: 'TXN-2024-12-004',
    customer: 'Sarah Williams',
    email: 'sarah.w@email.com',
    amount: 45000,
    method: 'card',
    status: 'failed',
    date: '2024-12-02',
    orderId: 'ORD-2024-004'
  },
  {
    id: 'PAY-005',
    transactionId: 'TXN-2024-12-005',
    customer: 'David Brown',
    email: 'david.b@email.com',
    amount: 178000,
    method: 'flutterwave',
    status: 'refunded',
    date: '2024-12-02',
    orderId: 'ORD-2024-005'
  },
  {
    id: 'PAY-006',
    transactionId: 'TXN-2024-12-006',
    customer: 'Emily Davis',
    email: 'emily.d@email.com',
    amount: 67000,
    method: 'card',
    status: 'completed',
    date: '2024-12-01',
    orderId: 'ORD-2024-006'
  },
  {
    id: 'PAY-007',
    transactionId: 'TXN-2024-12-007',
    customer: 'Chris Wilson',
    email: 'chris.w@email.com',
    amount: 156000,
    method: 'paystack',
    status: 'completed',
    date: '2024-12-01',
    orderId: 'ORD-2024-007'
  },
  {
    id: 'PAY-008',
    transactionId: 'TXN-2024-12-008',
    customer: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    amount: 92000,
    method: 'bank_transfer',
    status: 'pending',
    date: '2024-12-01',
    orderId: 'ORD-2024-008'
  }
];

// Revenue chart data
const revenueData = [
  { month: 'Jan', revenue: 450000 },
  { month: 'Feb', revenue: 520000 },
  { month: 'Mar', revenue: 480000 },
  { month: 'Apr', revenue: 610000 },
  { month: 'May', revenue: 550000 },
  { month: 'Jun', revenue: 670000 }
];

// Payment methods data
const methodsData = [
  { method: 'Card', count: 45 },
  { method: 'Paystack', count: 32 },
  { method: 'Bank', count: 28 },
  { method: 'Flutterwave', count: 18 }
];

const PaymentPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const statusConfig: Record<PaymentStatus, StatusConfig> = {
    completed: { 
      label: 'Completed', 
      color: 'bg-green-100 text-green-700', 
      icon: CheckCircle,
      dotColor: 'bg-green-500'
    },
    pending: { 
      label: 'Pending', 
      color: 'bg-yellow-100 text-yellow-700', 
      icon: Clock,
      dotColor: 'bg-yellow-500'
    },
    failed: { 
      label: 'Failed', 
      color: 'bg-red-100 text-red-700', 
      icon: XCircle,
      dotColor: 'bg-red-500'
    },
    refunded: { 
      label: 'Refunded', 
      color: 'bg-gray-100 text-gray-700', 
      icon: AlertCircle,
      dotColor: 'bg-gray-500'
    }
  };

  const methodLabels: Record<PaymentMethod, string> = {
    card: 'Credit Card',
    bank_transfer: 'Bank Transfer',
    paystack: 'Paystack',
    flutterwave: 'Flutterwave'
  };

  // Calculate totals
  const totalRevenue = paymentsData
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const pendingAmount = paymentsData
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const stats: Stat[] = [
    {
      label: 'Total Revenue',
      value: `₦${totalRevenue.toLocaleString()}`,
      change: '+15.3%',
      isPositive: true,
      icon: TrendingUp,
      color: 'bg-green-100 text-green-700'
    },
    {
      label: 'Completed',
      value: paymentsData.filter(p => p.status === 'completed').length,
      change: '+8.2%',
      isPositive: true,
      icon: CheckCircle,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      label: 'Pending Amount',
      value: `₦${pendingAmount.toLocaleString()}`,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-700'
    },
    {
      label: 'Failed',
      value: paymentsData.filter(p => p.status === 'failed').length,
      change: '-12.5%',
      isPositive: false,
      icon: XCircle,
      color: 'bg-red-100 text-red-700'
    }
  ];

  // Filter payments
  const filteredPayments = paymentsData.filter(payment => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className='bg-gradient-to-t from-blue-100 via-white to-purple-200 min-h-screen w-full mt-4 p-3 rounded-lg shadow-md'>
      <section className='bg-white min-h-screen rounded-lg shadow-md p-5'>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payments</h1>
          <p className="text-gray-600 text-sm">Track and manage all payment transactions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-5 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <StatIcon className="w-6 h-6" />
                  </div>
                  {stat.change && (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  )}
                </div>
                <h3 className="text-sm text-gray-600 mb-1">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Trend */}
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData}>
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
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Payment Methods */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Methods</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={methodsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="method" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-4 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by transaction ID, customer, order ID..."
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
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              <button className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Transaction</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Customer</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Method</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Amount</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPayments.map((payment, index) => {
                  const StatusIcon = statusConfig[payment.status].icon;
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-semibold text-purple-600">{payment.id}</div>
                          <div className="text-xs text-gray-500">{payment.transactionId}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{payment.customer}</div>
                          <div className="text-sm text-gray-500">{payment.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm font-medium text-blue-600">{payment.orderId}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{payment.date}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{methodLabels[payment.method]}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-gray-900">₦{payment.amount.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${statusConfig[payment.status].dotColor}`} />
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[payment.status].color} flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig[payment.status].label}
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
              <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredPayments.length)}</span> of{' '}
              <span className="font-medium">{filteredPayments.length}</span> payments
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

export default PaymentPage;