"use client";

import React, { useMemo, useState } from 'react';
import { AlertCircle, CheckCircle, Package, Search, XCircle } from 'lucide-react';

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

function getStatusConfig(status: Product['status']): StatusConfig {
  switch (status) {
    case 'active':
      return { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle, label: 'In Stock' };
    case 'low':
      return { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: AlertCircle, label: 'Low Stock' };
    case 'out':
      return { bg: 'bg-red-50', text: 'text-red-700', icon: XCircle, label: 'Out of Stock' };
  }
}

export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>('All');
  const [selectedStatus, setSelectedStatus] = useState<Status>('All');

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch = !query ||
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

  return (
    <section className="space-y-6 p-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-violet-600">Inventory</p>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your product catalog and stock levels.</p>
        </div>
        <div className="rounded-xl bg-violet-50 px-4 py-3 text-sm font-medium text-violet-700">
          {products.length} products in catalog
        </div>
      </header>

      <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <label className="relative min-w-[220px] flex-1">
          <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            aria-label="Search products"
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-violet-400"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by product or SKU"
            value={searchTerm}
          />
        </label>
        <select
          aria-label="Filter by category"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700"
          onChange={(event) => setSelectedCategory(event.target.value as (typeof categories)[number])}
          value={selectedCategory}
        >
          {categories.map((category) => <option key={category} value={category}>{category === 'All' ? 'All categories' : category}</option>)}
        </select>
        <select
          aria-label="Filter by stock status"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700"
          onChange={(event) => setSelectedStatus(event.target.value as Status)}
          value={selectedStatus}
        >
          {statuses.map((status) => <option key={status} value={status}>{status === 'All' ? 'All statuses' : status}</option>)}
        </select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => {
            const statusConfig = getStatusConfig(product.status);
            const StatusIcon = statusConfig.icon;

            return (
              <article key={product.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-2xl" aria-hidden="true">
                    {product.image}
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                    <StatusIcon aria-hidden="true" className="h-3.5 w-3.5" />
                    {statusConfig.label}
                  </span>
                </div>
                <h2 className="font-semibold text-slate-900">{product.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{product.category} · SKU: {product.sku}</p>
                <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-500">Price</p>
                    <p className="font-bold text-slate-900">₦{product.price.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Stock</p>
                    <p className="font-semibold text-slate-900">{product.stock} units</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <Package aria-hidden="true" className="mx-auto h-8 w-8 text-slate-400" />
          <p className="mt-3 font-semibold text-slate-800">No products found</p>
          <p className="mt-1 text-sm text-slate-500">Try changing your search or filters.</p>
        </div>
      )}
    </section>
  );
}
