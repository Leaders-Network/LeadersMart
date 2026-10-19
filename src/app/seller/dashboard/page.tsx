'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import VendorSidebar from '@/components/VendorSidebar';

// ─── Sales data ───────────────────────────────────────────────────────────────
const salesData = [
  { date: 'Oct 1', sales: 2800 },
  { date: 'Oct 2', sales: 3200 },
  { date: 'Oct 3', sales: 2600 },
  { date: 'Oct 4', sales: 3800 },
  { date: 'Oct 5', sales: 3100 },
  { date: 'Oct 6', sales: 4480 },
  { date: 'Oct 7', sales: 4100 },
];

// ─── Orders ───────────────────────────────────────────────────────────────────
const orders = [
  { id: '#LM-1048', customer: 'Maya Reed',    initials: 'MR', color: '#EEEDFF', textColor: '#4353EC', products: 'Nova K75 Keyboard + Glide Mouse',   total: '₦83.00',  status: 'Processing', statusBg: '#FFF1E7', statusColor: '#B65C27', date: 'Oct 7, 2026' },
  { id: '#LM-1047', customer: 'Alex Chen',    initials: 'AC', color: '#E7F6EF', textColor: '#167A59', products: 'Nova K75 Mechanical Keyboard',        total: '₦59.00',  status: 'Shipped',    statusBg: '#EEEDFF', statusColor: '#4353EC', date: 'Oct 7, 2026' },
  { id: '#LM-1046', customer: 'Jamie Taylor', initials: 'JT', color: '#FFF0EA', textColor: '#C1622A', products: 'Glide Pro Wireless Mouse × 2',        total: '₦48.00',  status: 'Delivered',  statusBg: '#E7F6EF', statusColor: '#167A59', date: 'Oct 7, 2026' },
  { id: '#LM-1045', customer: 'Sam Morgan',   initials: 'SM', color: '#EEEDFF', textColor: '#6B4EFF', products: 'PowerHub 65W USB-C Charger',          total: '₦39.00',  status: 'Delivered',  statusBg: '#E7F6EF', statusColor: '#167A59', date: 'Oct 6, 2026' },
  { id: '#LM-1044', customer: 'Riley Brooks', initials: 'RB', color: '#EBF5FF', textColor: '#1A6EC7', products: 'Nova K75 Keyboard + PowerHub',         total: '₦98.00',  status: 'Shipped',    statusBg: '#EEEDFF', statusColor: '#4353EC', date: 'Oct 6, 2026' },
];

// ─── Inventory ────────────────────────────────────────────────────────────────
const inventory = [
  { name: 'Nova K75 Keyboard',    sku: 'NV-K75-LV', price: '₦59.00', stock: 18, status: 'Low stock', statusBg: '#FFF1E7', statusColor: '#B65C27', image: '/images/Product photography (1).png' },
  { name: 'Glide Pro Mouse',      sku: 'NV-GLD-BK', price: '₦24.00', stock: 24, status: 'Active',    statusBg: '#E7F6EF', statusColor: '#167A59', image: '/images/Product photography (2).png' },
  { name: 'PowerHub 65W Charger', sku: 'NV-P65-WH', price: '₦39.00', stock: 42, status: 'Active',    statusBg: '#E7F6EF', statusColor: '#167A59', image: '/images/Product photography (8).png' },
];

// ─── Custom tooltip ───────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-lg text-white text-[12px]" style={{ background: '#171C36', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
        <p className="font-700" style={{ fontWeight: 700 }}>₦{payload[0].value.toLocaleString()}</p>
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>{label} · {label === 'Oct 6' ? '57' : Math.round(payload[0].value / 76)} orders</p>
      </div>
    );
  }
  return null;
}

// ─── Metric card ─────────────────────────────────────────────────────────────
function MetricCard({ icon, label, value, trend, trendLabel }: { icon: React.ReactNode; label: string; value: string; trend: string; trendLabel: string }) {
  const isUp = trend.startsWith('+') || trend.startsWith('↗');
  return (
    <div className="bg-white p-5 flex flex-col gap-3" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
      <div className="flex items-center justify-between">
        <span className="text-[13px]" style={{ color: '#6F7489' }}>{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#F7F8FC' }}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-[28px] font-700 text-[#171C36] leading-none" style={{ fontWeight: 700 }}>{value}</p>
        <p className="text-[12px] mt-1.5 flex items-center gap-1" style={{ color: isUp ? '#167A59' : '#C0392B' }}>
          <span>{trend}</span>
          <span style={{ color: '#9DA3B4' }}>{trendLabel}</span>
        </p>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SellerDashboard() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ background: '#F7F8FC', fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <VendorSidebar />

      {/* Mobile sidebar overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileNavOpen(false)} style={{ background: 'rgba(23,28,54,0.4)' }}>
          <div className="absolute left-0 top-0 bottom-0 w-[240px] bg-white" onClick={e => e.stopPropagation()}>
            <VendorSidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white border-b sticky top-0 z-30 flex items-center gap-4 px-6 py-0" style={{ borderColor: '#E6E8F1', height: 76 }}>
          {/* Mobile menu button */}
          <button className="lg:hidden" onClick={() => setMobileNavOpen(true)} aria-label="Open navigation">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="#171C36" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[13px]">
            <span style={{ color: '#9DA3B4' }}>Seller center</span>
            <span style={{ color: '#D1D5DB' }}>/</span>
            <span className="font-600 text-[#171C36]" style={{ fontWeight: 600 }}>Overview</span>
          </div>

          {/* Search */}
          <div className="relative hidden md:block flex-1 max-w-xs ml-4">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#9DA3B4" strokeWidth="1.8"/>
              <path d="m21 21-4.35-4.35" stroke="#9DA3B4" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search orders, products, and more"
              className="h-9 w-full pl-8 pr-4 rounded-lg text-[13px] outline-none"
              style={{ background: '#F7F8FC', border: '1.5px solid #E6E8F1', color: '#171C36' }}
            />
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-4">
            <span className="hidden md:block text-[13px]" style={{ color: '#9DA3B4' }}>Thursday, October 8, 2026</span>
            <button className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-50" style={{ border: '1.5px solid #E6E8F1' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#6F7489" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#4353EC' }} />
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-[26px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>Looking good, Jordan.</h1>
              <p className="text-[14px] mt-0.5" style={{ color: '#6F7489' }}>
                Here&apos;s what&apos;s happening at Nova Tech. Let&apos;s keep the momentum going.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                className="flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-500 border hover:bg-gray-50"
                style={{ border: '1.5px solid #E6E8F1', color: '#6F7489', fontWeight: 500 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                Oct 1 – Oct 7, 2026
              </button>
              <button
                className="flex items-center gap-2 h-10 px-4 rounded-xl text-white text-[13px] font-600 hover:opacity-90"
                style={{ background: '#4353EC', fontWeight: 600 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Add product
              </button>
            </div>
          </div>

          {/* Order notice */}
          <div className="flex items-center justify-between px-5 py-4 rounded-2xl mb-6" style={{ background: '#EEEDFF' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'white' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[13px] text-[#171C36]">
                <span className="font-600" style={{ fontWeight: 600 }}>12 orders are ready for their next adventure.</span>{' '}
                Pack and ship them to keep your shoppers smiling.
              </p>
            </div>
            <Link href="#" className="text-[13px] font-600 whitespace-nowrap flex items-center gap-1 hover:opacity-80" style={{ color: '#4353EC', fontWeight: 600 }}>
              Manage orders
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              label="Gross sales"
              value="₦24,580"
              trend="↗ 18.6%"
              trendLabel="vs last week"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><line x1="12" y1="1" x2="12" y2="23" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            />
            <MetricCard
              label="Orders"
              value="312"
              trend="↗ 12.2%"
              trendLabel="vs last week"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            />
            <MetricCard
              label="Average order value"
              value="$78.78"
              trend="↗ 5.7%"
              trendLabel="vs last week"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            />
            <MetricCard
              label="Active products"
              value="48"
              trend="+4"
              trendLabel="new this week"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><line x1="7" y1="7" x2="7.01" y2="7" stroke="#4353EC" strokeWidth="2" strokeLinecap="round"/></svg>}
            />
          </div>

          {/* Sales chart + health */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Sales performance chart */}
            <div className="lg:col-span-2 bg-white p-6" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="text-[15px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>Sales performance</h3>
                  <p className="text-[12px]" style={{ color: '#9DA3B4' }}>Your store&apos;s momentum, at a glance.</p>
                </div>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-500 border"
                  style={{ border: '1.5px solid #E6E8F1', color: '#6F7489', fontWeight: 500 }}
                >
                  This week
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="mt-3 mb-1">
                <span className="text-[30px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>₦24,580.00</span>
                <span className="ml-2 text-[13px] font-600" style={{ color: '#167A59', fontWeight: 600 }}>↗ 18.6% vs last week</span>
              </div>

              <div className="h-[180px] mt-4">
                <ResponsiveContainer width="100%" height="100%" minHeight={180}>
                  <AreaChart data={salesData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4353EC" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#4353EC" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F1F7" vertical={false}/>
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: '#9DA3B4' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#9DA3B4' }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `₦${v / 1000}k`}
                      domain={[2000, 5000]}
                      ticks={[2000, 3000, 4000, 5000]}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#4353EC', strokeWidth: 1, strokeDasharray: '4 4' }}/>
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#4353EC"
                      strokeWidth={2.5}
                      fill="url(#salesGradient)"
                      dot={false}
                      activeDot={{ r: 5, fill: '#4353EC', strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Store health card */}
            <div className="bg-white p-6 flex flex-col gap-5" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>Your store, in good shape.</h3>
                </div>
                <Link href="#" className="text-[13px] font-600 flex items-center gap-0.5 hover:opacity-80" style={{ color: '#4353EC', fontWeight: 600 }}>
                  Details
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

              {/* Score ring */}
              <div className="flex flex-col items-center py-2">
                <div
                  className="w-20 h-20 rounded-full flex flex-col items-center justify-center mb-2"
                  style={{ background: '#E7F6EF', border: '3px solid #167A59' }}
                >
                  <span className="text-[28px] font-700 text-[#167A59]" style={{ fontWeight: 700 }}>98</span>
                </div>
                <p className="text-[13px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>Excellent seller score</p>
                <p className="text-[12px] mt-0.5 text-center" style={{ color: '#9DA3B4' }}>Your customers are in good hands.</p>
              </div>

              {/* Metrics */}
              <div className="space-y-3">
                {[
                  { label: 'On-time shipping', value: '98.2%' },
                  { label: 'Customer rating', value: '★ 4.9 / 5' },
                  { label: 'Response time', value: 'Under 2 hours' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[13px]" style={{ color: '#6F7489' }}>{label}</span>
                    <span className="text-[13px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Alert */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl" style={{ background: '#FFF1E7' }}>
                <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#B65C27" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="9" x2="12" y2="13" stroke="#B65C27" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="12" y1="17" x2="12.01" y2="17" stroke="#B65C27" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div>
                  <p className="text-[12px] font-600" style={{ color: '#B65C27', fontWeight: 600 }}>3 products are running low</p>
                  <Link href="#" className="text-[12px] hover:opacity-80" style={{ color: '#B65C27' }}>Review inventory →</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent orders */}
          <div className="bg-white p-6 mb-6" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-[15px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>Recent orders</h3>
                <p className="text-[12px]" style={{ color: '#9DA3B4' }}>A little activity. A lot of possibility.</p>
              </div>
              <Link href="#" className="text-[13px] font-600 flex items-center gap-1 hover:opacity-80" style={{ color: '#4353EC', fontWeight: 600 }}>
                View all orders
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr style={{ borderBottom: '1px solid #E6E8F1' }}>
                    {['Order', 'Customer', 'Products', 'Total', 'Status', 'Date'].map(h => (
                      <th key={h} className="text-left pb-3 text-[11px] font-600 uppercase tracking-wider" style={{ color: '#9DA3B4', fontWeight: 600, paddingRight: 16 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => (
                    <tr
                      key={order.id}
                      style={{ borderBottom: i < orders.length - 1 ? '1px solid #F7F8FC' : 'none' }}
                    >
                      <td className="py-3.5 pr-4">
                        <Link href="#" className="text-[13px] font-600 hover:opacity-80" style={{ color: '#4353EC', fontWeight: 600 }}>
                          {order.id}
                        </Link>
                      </td>
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-700 shrink-0"
                            style={{ background: order.color, color: order.textColor, fontWeight: 700 }}
                          >
                            {order.initials}
                          </div>
                          <span className="text-[13px] font-500 text-[#171C36] whitespace-nowrap" style={{ fontWeight: 500 }}>{order.customer}</span>
                        </div>
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className="text-[13px]" style={{ color: '#6F7489' }}>{order.products}</span>
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className="text-[13px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>{order.total}</span>
                      </td>
                      <td className="py-3.5 pr-4">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-600"
                          style={{ background: order.statusBg, color: order.statusColor, fontWeight: 600 }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className="text-[13px]" style={{ color: '#9DA3B4' }}>{order.date}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inventory preview */}
          <div className="bg-white p-6" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-[15px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>Products to keep an eye on</h3>
                <p className="text-[12px]" style={{ color: '#9DA3B4' }}>Your flash sale favorites are moving fast.</p>
              </div>
              <Link href="#" className="text-[13px] font-600 flex items-center gap-1 hover:opacity-80" style={{ color: '#4353EC', fontWeight: 600 }}>
                Manage inventory
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {inventory.map((item) => (
                <div
                  key={item.sku}
                  className="flex items-center gap-3 p-3"
                  style={{ borderRadius: 14, border: '1px solid #E6E8F1' }}
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0" style={{ background: '#F7F8FC' }}>
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-600 text-[#171C36] truncate" style={{ fontWeight: 600 }}>{item.name}</p>
                    <p className="text-[11px]" style={{ color: '#9DA3B4' }}>SKU {item.sku}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[13px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>{item.price}</span>
                      <span
                        className="text-[10px] font-600 px-2 py-0.5 rounded-full"
                        style={{ background: item.statusBg, color: item.statusColor, fontWeight: 600 }}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[11px] mt-0.5" style={{ color: '#9DA3B4' }}>{item.stock} in stock</p>
                  </div>
                  <button className="shrink-0 p-1.5 rounded-lg hover:bg-gray-50" aria-label="More options">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="5" r="1" fill="#9DA3B4"/>
                      <circle cx="12" cy="12" r="1" fill="#9DA3B4"/>
                      <circle cx="12" cy="19" r="1" fill="#9DA3B4"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom captions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-5 pt-4 gap-2" style={{ borderTop: '1px solid #F7F8FC' }}>
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="#167A59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="#167A59" strokeWidth="2"/>
                </svg>
                <span className="text-[12px]" style={{ color: '#9DA3B4' }}>All systems looking good · Last updated just now</span>
              </div>
              <Link href="#" className="text-[12px] hover:opacity-80" style={{ color: '#4353EC' }}>
                Need a hand? Contact seller support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
