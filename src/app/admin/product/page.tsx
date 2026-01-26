"use client";

import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

/* ================= TYPES ================= */

type Status = 'All' | 'active' | 'low' | 'out';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'low' | 'out';
  sales: number;
  image: string;
  sku: string;
  added: string;
}

interface StatusConfig {
  bg: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

/* ================= DATA ================= */

const products: Product[] = [
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
  }
];

const categories = ['All', 'Electronics', 'Accessories', 'Peripherals'] as const;
const statuses: Status[] = ['All', 'active', 'low', 'out'];

/* ================= HELPERS ================= */

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
        icon: AlertCircle,
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
        label: 'All'
      };
  }
};

/* ================= PAGE ================= */

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<Status>('All');

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'All' || product.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => {
          const statusConfig = getStatusConfig(product.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={product.id}
              className="border rounded-xl p-4 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{product.name}</h3>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusConfig.bg} ${statusConfig.text}`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusConfig.label}
                </div>
              </div>

              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
              <p className="font-bold mt-2">₦{product.price.toLocaleString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductPage;
