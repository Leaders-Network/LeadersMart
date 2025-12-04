"use client";

import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Mail, Phone, MapPin, Calendar, Package, DollarSign, TrendingUp, Store, CheckCircle, Clock, XCircle, Star, Eye, Edit2, Trash2, ExternalLink, Award } from 'lucide-react';

// Sample vendor data
const vendors = [
  {
    id: 1,
    name: 'TechHub Electronics Ltd',
    email: 'contact@techhub.com.ng',
    phone: '+234 809 123 4567',
    location: 'Victoria Island, Lagos',
    status: 'active',
    productsSupplied: 145,
    totalOrders: 89,
    totalValue: 15750000,
    lastDelivery: '2024-12-01',
    joinDate: '2023-01-15',
    rating: 4.9,
    logo: '🏢',
    category: 'Electronics',
    paymentTerms: 'Net 30',
    reliability: 98
  },
  {
    id: 2,
    name: 'Global Accessories Co.',
    email: 'info@globalacc.com',
    phone: '+234 810 234 5678',
    location: 'Ikeja, Lagos',
    status: 'active',
    productsSupplied: 98,
    totalOrders: 67,
    totalValue: 8920000,
    lastDelivery: '2024-11-30',
    joinDate: '2023-03-22',
    rating: 4.7,
    logo: '🛒',
    category: 'Accessories',
    paymentTerms: 'Net 45',
    reliability: 95
  },
  {
    id: 3,
    name: 'Premium Peripherals Inc',
    email: 'sales@premiumper.ng',
    phone: '+234 805 345 6789',
    location: 'Abuja',
    status: 'pending',
    productsSupplied: 34,
    totalOrders: 12,
    totalValue: 3200000,
    lastDelivery: '2024-11-28',
    joinDate: '2024-10-05',
    rating: 4.3,
    logo: '⌨️',
    category: 'Peripherals',
    paymentTerms: 'Net 30',
    reliability: 88
  },
  {
    id: 4,
    name: 'Digital Supplies Nigeria',
    email: 'orders@digitalsupplies.ng',
    phone: '+234 812 456 7890',
    location: 'Port Harcourt',
    status: 'active',
    productsSupplied: 187,
    totalOrders: 134,
    totalValue: 22100000,
    lastDelivery: '2024-12-02',
    joinDate: '2022-11-10',
    rating: 4.8,
    logo: '📦',
    category: 'Electronics',
    paymentTerms: 'Net 30',
    reliability: 97
  },
  {
    id: 5,
    name: 'Smart Gadgets Wholesale',
    email: 'hello@smartgadgets.com.ng',
    phone: '+234 806 567 8901',
    location: 'Surulere, Lagos',
    status: 'inactive',
    productsSupplied: 76,
    totalOrders: 45,
    totalValue: 6500000,
    lastDelivery: '2024-09-20',
    joinDate: '2023-06-18',
    rating: 4.1,
    logo: '📱',
    category: 'Electronics',
    paymentTerms: 'Net 60',
    reliability: 82
  },
  {
    id: 6,
    name: 'Office Essentials Plus',
    email: 'support@officeplus.ng',
    phone: '+234 813 678 9012',
    location: 'Lekki, Lagos',
    status: 'active',
    productsSupplied: 112,
    totalOrders: 78,
    totalValue: 9800000,
    lastDelivery: '2024-11-29',
    joinDate: '2023-04-12',
    rating: 4.6,
    logo: '🖊️',
    category: 'Accessories',
    paymentTerms: 'Net 30',
    reliability: 93
  },
  {
    id: 7,
    name: 'Premium Tech Distributors',
    email: 'vendor@premiumtech.com',
    phone: '+234 807 789 0123',
    location: 'Ibadan',
    status: 'active',
    productsSupplied: 203,
    totalOrders: 156,
    totalValue: 28500000,
    lastDelivery: '2024-12-03',
    joinDate: '2022-08-05',
    rating: 5.0,
    logo: '⭐',
    category: 'Electronics',
    paymentTerms: 'Net 30',
    reliability: 99
  },
  {
    id: 8,
    name: 'Metro Supplies Ltd',
    email: 'contact@metrosupplies.ng',
    phone: '+234 814 890 1234',
    location: 'Enugu',
    status: 'pending',
    productsSupplied: 28,
    totalOrders: 8,
    totalValue: 1850000,
    lastDelivery: '2024-11-25',
    joinDate: '2024-11-01',
    rating: 4.0,
    logo: '🚚',
    category: 'Accessories',
    paymentTerms: 'Net 45',
    reliability: 85
  }
];

const Vendors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const statuses = ['All', 'active', 'pending', 'inactive'];
  const categories = ['All', 'Electronics', 'Accessories', 'Peripherals'];

  const getStatusConfig = (status) => {
    switch(status) {
      case 'active':
        return { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle, label: 'Active' };
      case 'pending':
        return { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: Clock, label: 'Pending' };
      case 'inactive':
        return { bg: 'bg-gray-50', text: 'text-gray-700', icon: XCircle, label: 'Inactive' };
      default:
        return { bg: 'bg-gray-50', text: 'text-gray-700', icon: Store, label: 'Unknown' };
    }
  };

  const getReliabilityColor = (reliability) => {
    if (reliability >= 95) return 'text-green-600';
    if (reliability >= 85) return 'text-blue-600';
    if (reliability >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'All' || vendor.status === selectedStatus;
    const matchesCategory = selectedCategory === 'All' || vendor.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalVendors = vendors.length;
  const activeVendors = vendors.filter(v => v.status === 'active').length;
  const pendingVendors = vendors.filter(v => v.status === 'pending').length;
  const totalValue = vendors.reduce((sum, v) => sum + v.totalValue, 0);

  return (
    <div className='bg-gradient-to-t from-blue-100 via-white to-purple-200 min-h-screen w-full mt-4 p-3 rounded-lg shadow-md'>
      <section className='bg-white min-h-screen rounded-lg shadow-md p-5 font-[lexend]'>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your supplier partnerships</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Add Vendor
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-4 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Vendors</p>
                <p className="text-2xl font-bold text-gray-900">{totalVendors}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-4 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Vendors</p>
                <p className="text-2xl font-bold text-gray-900">{activeVendors}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-white rounded-lg p-4 border border-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{pendingVendors}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">₦{(totalValue / 1000000).toFixed(1)}M</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
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
                  placeholder="Search vendors by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
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

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => {
            const statusConfig = getStatusConfig(vendor.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <div 
                key={vendor.id}
                className="bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
              >
                {/* Vendor Header */}
                <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 p-5 relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl shadow-lg">
                      {vendor.logo}
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-purple-50 transition-colors">
                        <Eye className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                      <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
                        <Edit2 className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                      <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors">
                        <Trash2 className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig.label}
                    </span>
                    <span className="px-2.5 py-1 bg-white/80 text-purple-700 text-xs font-medium rounded-full">
                      {vendor.category}
                    </span>
                  </div>
                </div>

                {/* Vendor Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-base leading-tight">{vendor.name}</h3>
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{vendor.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>{vendor.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>{vendor.location}</span>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-medium text-gray-700">Reliability Score</span>
                      </div>
                      <span className={`text-lg font-bold ${getReliabilityColor(vendor.reliability)}`}>
                        {vendor.reliability}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${vendor.reliability}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-gray-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Package className="w-3.5 h-3.5 text-purple-600" />
                      </div>
                      <p className="text-xs text-gray-500 mb-0.5">Products</p>
                      <p className="text-base font-bold text-gray-900">{vendor.productsSupplied}</p>
                    </div>
                    <div className="text-center border-l border-r border-gray-100">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <p className="text-xs text-gray-500 mb-0.5">Orders</p>
                      <p className="text-base font-bold text-gray-900">{vendor.totalOrders}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <p className="text-xs text-gray-500 mb-0.5">Value</p>
                      <p className="text-base font-bold text-gray-900">₦{(vendor.totalValue / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>

                  {/* Rating & Additional Info */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-bold text-gray-900">{vendor.rating}</span>
                      <span className="text-xs text-gray-500">Rating</span>
                    </div>
                    <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {vendor.paymentTerms}
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Since {new Date(vendor.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div>
                      Last: <span className="font-medium text-gray-700">{new Date(vendor.lastDelivery).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No vendors found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Vendors;