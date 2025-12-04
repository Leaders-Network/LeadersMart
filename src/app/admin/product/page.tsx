"use client";

import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Edit2, Trash2, Eye, Package, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 89999,
    stock: 45,
    status: 'active',
    sales: 1240,
    image: '🎧',
    sku: 'WH-001',
    added: '2024-01-15'
  },
  {
    id: 2,
    name: 'Ergonomic Wireless Mouse',
    category: 'Accessories',
    price: 24999,
    stock: 120,
    status: 'active',
    sales: 980,
    image: '🖱️',
    sku: 'MS-002',
    added: '2024-02-20'
  },
  {
    id: 3,
    name: 'Mechanical Gaming Keyboard',
    category: 'Peripherals',
    price: 149999,
    stock: 8,
    status: 'low',
    sales: 756,
    image: '⌨️',
    sku: 'KB-003',
    added: '2024-01-10'
  },
  {
    id: 4,
    name: 'USB-C Multi-Port Hub',
    category: 'Accessories',
    price: 49999,
    stock: 0,
    status: 'out',
    sales: 650,
    image: '🔌',
    sku: 'HB-004',
    added: '2024-03-05'
  },
  {
    id: 5,
    name: 'Aluminum Laptop Stand',
    category: 'Accessories',
    price: 34999,
    stock: 67,
    status: 'active',
    sales: 542,
    image: '💻',
    sku: 'LS-005',
    added: '2024-02-12'
  },
  {
    id: 6,
    name: '4K Webcam Pro',
    category: 'Electronics',
    price: 124999,
    stock: 23,
    status: 'active',
    sales: 423,
    image: '📹',
    sku: 'WC-006',
    added: '2024-01-28'
  },
  {
    id: 7,
    name: 'Wireless Charging Pad',
    category: 'Accessories',
    price: 29999,
    stock: 15,
    status: 'low',
    sales: 389,
    image: '⚡',
    sku: 'CP-007',
    added: '2024-03-15'
  },
  {
    id: 8,
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 64999,
    stock: 89,
    status: 'active',
    sales: 312,
    image: '🔊',
    sku: 'SP-008',
    added: '2024-02-05'
  }
];

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const categories = ['All', 'Electronics', 'Accessories', 'Peripherals'];
  const statuses = ['All', 'active', 'low', 'out'];

  const getStatusConfig = (status) => {
    switch(status) {
      case 'active':
        return { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle, label: 'In Stock' };
      case 'low':
        return { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: AlertCircle, label: 'Low Stock' };
      case 'out':
        return { bg: 'bg-red-50', text: 'text-red-700', icon: XCircle, label: 'Out of Stock' };
      default:
        return { bg: 'bg-gray-50', text: 'text-gray-700', icon: Package, label: 'Unknown' };
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const lowStockProducts = products.filter(p => p.status === 'low').length;
  const outOfStockProducts = products.filter(p => p.status === 'out').length;

  return (
    <div className='bg-gradient-to-t from-blue-100 via-white to-purple-200 min-h-screen w-full mt-4 p-3 rounded-lg shadow-md font-[lexend]'>
      <section className='bg-white min-h-screen rounded-lg shadow-md p-5 font-[lexend]'>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your product inventory</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-4 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-4 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Stock</p>
                <p className="text-2xl font-bold text-gray-900">{activeProducts}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-white rounded-lg p-4 border border-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900">{lowStockProducts}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg p-4 border border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-900">{outOfStockProducts}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
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
                  placeholder="Search products by name or SKU..."
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const statusConfig = getStatusConfig(product.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <div 
                key={product.id}
                className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 h-48 flex items-center justify-center relative">
                  <span className="text-6xl">{product.image}</span>
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white rounded-lg shadow-sm hover:bg-purple-50 transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig.label}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Price</p>
                      <p className="text-lg font-bold text-gray-900">₦{product.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-0.5">Stock</p>
                      <p className={`text-lg font-bold ${
                        product.stock === 0 ? 'text-red-600' : 
                        product.stock < 20 ? 'text-yellow-600' : 
                        'text-green-600'
                      }`}>
                        {product.stock}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">{product.sales} sales</span>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductPage;