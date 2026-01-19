"use client";

import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Mail, Phone, MapPin, Calendar, ShoppingBag, DollarSign, TrendingUp, Users, UserCheck, UserX, Star, Eye, Edit2, Trash2 } from 'lucide-react';

// Sample customer data
const customers = [
  {
    id: 1,
    name: 'Adebayo Johnson',
    email: 'adebayo.j@email.com',
    phone: '+234 803 456 7890',
    location: 'Lagos, Nigeria',
    status: 'active',
    totalOrders: 45,
    totalSpent: 2450000,
    lastOrder: '2024-11-28',
    joinDate: '2023-05-15',
    avatar: '👨🏾',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Chioma Okafor',
    email: 'chioma.okafor@email.com',
    phone: '+234 810 234 5678',
    location: 'Abuja, Nigeria',
    status: 'active',
    totalOrders: 32,
    totalSpent: 1850000,
    lastOrder: '2024-11-30',
    joinDate: '2023-08-22',
    avatar: '👩🏾',
    rating: 5.0
  },
  {
    id: 3,
    name: 'Emeka Nwankwo',
    email: 'emeka.n@email.com',
    phone: '+234 805 678 9012',
    location: 'Port Harcourt, Nigeria',
    status: 'inactive',
    totalOrders: 12,
    totalSpent: 680000,
    lastOrder: '2024-09-15',
    joinDate: '2024-01-10',
    avatar: '👨🏾‍💼',
    rating: 4.2
  },
  {
    id: 4,
    name: 'Fatima Abdullahi',
    email: 'fatima.a@email.com',
    phone: '+234 812 345 6789',
    location: 'Kano, Nigeria',
    status: 'active',
    totalOrders: 28,
    totalSpent: 1520000,
    lastOrder: '2024-12-01',
    joinDate: '2023-11-05',
    avatar: '👩🏾‍💼',
    rating: 4.9
  },
  {
    id: 5,
    name: 'Oluwaseun Adeyemi',
    email: 'seun.adeyemi@email.com',
    phone: '+234 806 789 0123',
    location: 'Ibadan, Nigeria',
    status: 'active',
    totalOrders: 56,
    totalSpent: 3200000,
    lastOrder: '2024-12-02',
    joinDate: '2023-03-18',
    avatar: '👨🏾‍🦱',
    rating: 4.7
  },
  {
    id: 6,
    name: 'Ngozi Eze',
    email: 'ngozi.eze@email.com',
    phone: '+234 813 456 7890',
    location: 'Enugu, Nigeria',
    status: 'new',
    totalOrders: 3,
    totalSpent: 180000,
    lastOrder: '2024-11-25',
    joinDate: '2024-11-10',
    avatar: '👩🏾‍🦱',
    rating: 5.0
  },
  {
    id: 7,
    name: 'Ibrahim Musa',
    email: 'ibrahim.m@email.com',
    phone: '+234 807 890 1234',
    location: 'Kaduna, Nigeria',
    status: 'active',
    totalOrders: 41,
    totalSpent: 2100000,
    lastOrder: '2024-11-29',
    joinDate: '2023-07-12',
    avatar: '👨🏾‍🦲',
    rating: 4.6
  },
  {
    id: 8,
    name: 'Blessing Okoro',
    email: 'blessing.o@email.com',
    phone: '+234 814 567 8901',
    location: 'Lagos, Nigeria',
    status: 'inactive',
    totalOrders: 8,
    totalSpent: 450000,
    lastOrder: '2024-10-05',
    joinDate: '2024-02-28',
    avatar: '👩🏾',
    rating: 4.3
  }
];

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  const statuses = ['All', 'active', 'inactive', 'new'];

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'active':
        return { bg: 'bg-green-50', text: 'text-green-700', label: 'Active' };
      case 'inactive':
        return { bg: 'bg-gray-50', text: 'text-gray-700', label: 'Inactive' };
      case 'new':
        return { bg: 'bg-blue-50', text: 'text-blue-700', label: 'New' };
      default:
        return { bg: 'bg-gray-50', text: 'text-gray-700', label: 'Unknown' };
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'All' || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const newCustomers = customers.filter(c => c.status === 'new').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <div className='bg-gradient-to-t from-blue-100 via-white to-purple-200 min-h-screen w-full mt-4 p-3 rounded-lg shadow-md font-[lexend]'>
      <section className='bg-white min-h-screen rounded-lg shadow-md p-5 font-[lexend]'>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your customer relationships</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Add Customer
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-4 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-4 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Customers</p>
                <p className="text-2xl font-bold text-gray-900">{activeCustomers}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">New This Month</p>
                <p className="text-2xl font-bold text-gray-900">{newCustomers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-white rounded-lg p-4 border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₦{(totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 mb-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'All' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCustomers.map((customer) => {
            const statusConfig = getStatusConfig(customer.status);
            
            return (
              <div 
                key={customer.id}
                className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
              >
                {/* Customer Header */}
                <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 p-6 relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-md">
                      {customer.avatar}
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-purple-50 transition-colors">
                        <Eye className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                      <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
                        <Edit2 className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                    {statusConfig.label}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{customer.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{customer.location}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="bg-purple-50 rounded-lg p-2.5">
                      <div className="flex items-center gap-2 mb-1">
                        <ShoppingBag className="w-4 h-4 text-purple-600" />
                        <p className="text-xs text-gray-600">Orders</p>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{customer.totalOrders}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2.5">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <p className="text-xs text-gray-600">Spent</p>
                      </div>
                      <p className="text-lg font-bold text-gray-900">₦{(customer.totalSpent / 1000).toFixed(0)}K</p>
                    </div>
                  </div>

                  {/* Rating & Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900">{customer.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Joined {new Date(customer.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>

                  {/* Last Order */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Last order: <span className="font-medium text-gray-700">{new Date(customer.lastOrder).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No customers found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CustomersPage;