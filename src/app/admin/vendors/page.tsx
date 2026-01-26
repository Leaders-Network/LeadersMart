"use client";

import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Package,
  DollarSign,
  TrendingUp,
  Store,
  CheckCircle,
  Clock,
  XCircle,
  Star,
  Eye,
  Edit2,
  Trash2,
  ExternalLink,
  Award
} from 'lucide-react';

/* ================= TYPES ================= */

type VendorStatus = 'All' | 'active' | 'pending' | 'inactive';

interface Vendor {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'active' | 'pending' | 'inactive';
  productsSupplied: number;
  totalOrders: number;
  totalValue: number;
  lastDelivery: string;
  joinDate: string;
  rating: number;
  logo: string;
  category: string;
  paymentTerms: string;
  reliability: number;
}

interface StatusConfig {
  bg: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

/* ================= DATA ================= */

const vendors: Vendor[] = [
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
  }
];

const statuses: VendorStatus[] = ['All', 'active', 'pending', 'inactive'];
const categories = ['All', 'Electronics', 'Accessories', 'Peripherals'];

/* ================= HELPERS ================= */

const getStatusConfig = (status: VendorStatus): StatusConfig => {
  switch (status) {
    case 'active':
      return { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle, label: 'Active' };
    case 'pending':
      return { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: Clock, label: 'Pending' };
    case 'inactive':
      return { bg: 'bg-gray-50', text: 'text-gray-700', icon: XCircle, label: 'Inactive' };
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-700', icon: Store, label: 'All' };
  }
};

const getReliabilityColor = (reliability: number): string => {
  if (reliability >= 95) return 'text-green-600';
  if (reliability >= 85) return 'text-blue-600';
  if (reliability >= 75) return 'text-yellow-600';
  return 'text-red-600';
};

/* ================= PAGE ================= */

const Vendors = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<VendorStatus>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.phone.includes(searchTerm);

    const matchesStatus =
      selectedStatus === 'All' || vendor.status === selectedStatus;

    const matchesCategory =
      selectedCategory === 'All' || vendor.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map(vendor => {
          const statusConfig = getStatusConfig(vendor.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div key={vendor.id} className="bg-white border rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">{vendor.name}</h3>
                <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusConfig.bg} ${statusConfig.text}`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusConfig.label}
                </span>
              </div>

              <p className="text-sm text-gray-500">{vendor.email}</p>
              <p className={`mt-2 font-bold ${getReliabilityColor(vendor.reliability)}`}>
                Reliability: {vendor.reliability}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Vendors;
