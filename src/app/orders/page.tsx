'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ─── Types ────────────────────────────────────────────────────────────────────
type OrderStatus = 'Processing' | 'Confirmed' | 'Shipped' | 'Out for delivery' | 'Delivered' | 'Cancelled';

interface OrderItem { name: string; image: string; qty: number; price: number; }
interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  seller: string;
  tracking?: string;
  estimatedDelivery: string;
  address: string;
}

// ─── Demo data ────────────────────────────────────────────────────────────────
const orders: Order[] = [
  {
    id: '#LM-2048',
    date: 'Oct 7, 2026',
    status: 'Out for delivery',
    estimatedDelivery: 'Today, Oct 8 by 8 PM',
    tracking: 'GH-TRK-8823741',
    seller: 'Nova Tech',
    address: '14 Cantonments Rd, Accra',
    subtotal: 83000,
    delivery: 0,
    items: [
      { name: 'Nova K75 Mechanical Keyboard', image: '/images/Product photography (1).png', qty: 1, price: 59000 },
      { name: 'Glide Pro Wireless Mouse',     image: '/images/Product photography (2).png', qty: 1, price: 24000 },
    ],
  },
  {
    id: '#LM-2035',
    date: 'Oct 3, 2026',
    status: 'Delivered',
    estimatedDelivery: 'Delivered Oct 5, 2026',
    tracking: 'GH-TRK-8817203',
    seller: 'Sonora',
    address: '14 Cantonments Rd, Accra',
    subtotal: 79.00,
    delivery: 0,
    items: [
      { name: 'CloudSound Wireless Headphones', image: '/images/Product photography (3).png', qty: 1, price: 79.00 },
    ],
  },
  {
    id: '#LM-2021',
    date: 'Sep 28, 2026',
    status: 'Delivered',
    estimatedDelivery: 'Delivered Sep 30, 2026',
    tracking: 'GH-TRK-8803512',
    seller: 'Kin Home',
    address: '14 Cantonments Rd, Accra',
    subtotal: 42.00,
    delivery: 0,
    items: [
      { name: 'Halo Soft Glow Desk Lamp', image: '/images/Product photography (6).png', qty: 1, price: 42.00 },
    ],
  },
  {
    id: '#LM-2008',
    date: 'Sep 20, 2026',
    status: 'Delivered',
    estimatedDelivery: 'Delivered Sep 23, 2026',
    seller: 'Pulse',
    address: '14 Cantonments Rd, Accra',
    subtotal: 89.00,
    delivery: 4.99,
    items: [
      { name: 'Pulse Everyday Smartwatch', image: '/images/Product photography (5).png', qty: 1, price: 89.00 },
    ],
  },
  {
    id: '#LM-1994',
    date: 'Sep 12, 2026',
    status: 'Cancelled',
    estimatedDelivery: 'Cancelled',
    seller: 'Nova Tech',
    address: '14 Cantonments Rd, Accra',
    subtotal: 39.00,
    delivery: 0,
    items: [
      { name: 'PowerHub 65W USB-C Charger', image: '/images/Product photography (8).png', qty: 1, price: 39.00 },
    ],
  },
];

// ─── Status config ────────────────────────────────────────────────────────────
const statusConfig: Record<OrderStatus, { bg: string; color: string; label: string }> = {
  'Processing':       { bg: '#FFF1E7', color: '#B65C27', label: 'Processing'       },
  'Confirmed':        { bg: '#EEEDFF', color: '#4353EC', label: 'Confirmed'         },
  'Shipped':          { bg: '#EEEDFF', color: '#4353EC', label: 'Shipped'           },
  'Out for delivery': { bg: '#FFF9EB', color: '#B45309', label: 'Out for delivery'  },
  'Delivered':        { bg: '#E7F6EF', color: '#167A59', label: 'Delivered'         },
  'Cancelled':        { bg: '#FEE2E2', color: '#C0392B', label: 'Cancelled'         },
};

// ─── Timeline steps ───────────────────────────────────────────────────────────
const timelineSteps: OrderStatus[] = ['Processing', 'Confirmed', 'Shipped', 'Out for delivery', 'Delivered'];

function getStepIndex(status: OrderStatus) {
  if (status === 'Cancelled') return -1;
  return timelineSteps.indexOf(status);
}

function OrderTimeline({ status }: { status: OrderStatus }) {
  const currentIdx = getStepIndex(status);
  if (status === 'Cancelled') {
    return (
      <div className="flex items-center gap-2 py-4" style={{ borderTop: '1px solid #E6E8F1' }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#FEE2E2' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#C0392B" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
        <span className="text-[13px] font-600" style={{ color: '#C0392B', fontWeight: 600 }}>Order cancelled</span>
      </div>
    );
  }
  return (
    <div className="pt-4" style={{ borderTop: '1px solid #E6E8F1' }}>
      <div className="flex items-center">
        {timelineSteps.map((step, i) => {
          const done   = i <= currentIdx;
          const active = i === currentIdx;
          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              {/* Dot */}
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background: done ? '#4353EC' : '#F7F8FC',
                    border: active ? '2.5px solid #4353EC' : done ? 'none' : '1.5px solid #E6E8F1',
                    boxShadow: active ? '0 0 0 4px #EEEDFF' : 'none',
                  }}
                >
                  {done && !active
                    ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : active
                      ? <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      : <div className="w-2 h-2 rounded-full" style={{ background: '#D1D5DB' }} />
                  }
                </div>
                <span className="text-[10px] text-center leading-tight whitespace-nowrap hidden sm:block" style={{ color: done ? '#4353EC' : '#9DA3B4', fontWeight: done ? 600 : 400, maxWidth: 72 }}>
                  {step}
                </span>
              </div>
              {/* Connector */}
              {i < timelineSteps.length - 1 && (
                <div className="flex-1 h-0.5 mx-1" style={{ background: i < currentIdx ? '#4353EC' : '#E6E8F1' }} />
              )}
            </div>
          );
        })}
      </div>
      {/* Mobile step label */}
      <p className="sm:hidden text-[12px] font-600 mt-3 text-center" style={{ color: '#4353EC', fontWeight: 600 }}>
        {timelineSteps[currentIdx]}
      </p>
    </div>
  );
}

// ─── Order card ───────────────────────────────────────────────────────────────
function OrderCard({ order, onSelect }: { order: Order; onSelect: (o: Order) => void }) {
  const cfg = statusConfig[order.status];
  return (
    <div
      className="bg-white cursor-pointer hover:shadow-md transition-shadow"
      style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}
      onClick={() => onSelect(order)}
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #F7F8FC' }}>
        <div className="flex items-center gap-3">
          <span className="text-[14px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>{order.id}</span>
          <span className="text-[12px]" style={{ color: '#9DA3B4' }}>{order.date}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-600" style={{ background: cfg.bg, color: cfg.color, fontWeight: 600 }}>{cfg.label}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#9DA3B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>

      {/* Items preview */}
      <div className="px-5 py-4 flex items-center gap-4">
        <div className="flex -space-x-3">
          {order.items.slice(0, 3).map((item, i) => (
            <div key={i} className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white shrink-0" style={{ background: '#F7F8FC', zIndex: order.items.length - i }}>
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
          ))}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-600 text-[#171C36] truncate" style={{ fontWeight: 600 }}>
            {order.items[0].name}{order.items.length > 1 ? ` + ${order.items.length - 1} more` : ''}
          </p>
          <p className="text-[12px] mt-0.5" style={{ color: '#9DA3B4' }}>
            {order.seller} · {order.items.reduce((s, i) => s + i.qty, 0)} item{order.items.reduce((s, i) => s + i.qty, 0) > 1 ? 's' : ''}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[15px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>₦{(order.subtotal + order.delivery).toLocaleString('en', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-5 pb-4">
        <OrderTimeline status={order.status} />
      </div>

      {/* Delivery estimate */}
      <div className="flex items-center gap-2 px-5 py-3" style={{ borderTop: '1px solid #F7F8FC', background: order.status === 'Out for delivery' ? '#FFFBEB' : 'transparent', borderRadius: '0 0 18px 18px' }}>
        {order.status === 'Out for delivery' ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#B45309" strokeWidth="1.8"/>
              <polyline points="12 6 12 12 16 14" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[12px] font-600" style={{ color: '#B45309', fontWeight: 600 }}>{order.estimatedDelivery}</span>
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#9DA3B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="#9DA3B4" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="#9DA3B4" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span className="text-[12px]" style={{ color: '#9DA3B4' }}>{order.estimatedDelivery}</span>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Order detail drawer ──────────────────────────────────────────────────────
function OrderDetail({ order, onClose }: { order: Order; onClose: () => void }) {
  const cfg = statusConfig[order.status];
  const total = order.subtotal + order.delivery;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(23,28,54,0.45)' }} onClick={onClose}>
      <div
        className="bg-white w-full max-w-md h-full overflow-y-auto flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 sticky top-0 bg-white border-b z-10" style={{ borderColor: '#E6E8F1' }}>
          <div>
            <p className="text-[16px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>{order.id}</p>
            <p className="text-[12px] mt-0.5" style={{ color: '#9DA3B4' }}>Placed {order.date}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#6F7489" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div className="flex-1 px-6 py-6 flex flex-col gap-6">
          {/* Status + timeline */}
          <div className="bg-white p-5" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[14px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>Order status</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-600" style={{ background: cfg.bg, color: cfg.color, fontWeight: 600 }}>{cfg.label}</span>
            </div>
            <OrderTimeline status={order.status} />
            {order.status === 'Out for delivery' && (
              <div className="mt-4 flex items-center gap-2 p-3 rounded-xl" style={{ background: '#FFFBEB' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#B45309" strokeWidth="1.8"/>
                  <polyline points="12 6 12 12 16 14" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[12px] font-600" style={{ color: '#B45309', fontWeight: 600 }}>{order.estimatedDelivery}</span>
              </div>
            )}
            {order.status === 'Delivered' && (
              <div className="mt-4 flex items-center gap-2 p-3 rounded-xl" style={{ background: '#E7F6EF' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="#167A59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="#167A59" strokeWidth="2"/>
                </svg>
                <span className="text-[12px] font-600" style={{ color: '#167A59', fontWeight: 600 }}>{order.estimatedDelivery}</span>
              </div>
            )}
          </div>

          {/* Tracking */}
          {order.tracking && (
            <div className="p-5" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
              <p className="text-[14px] font-600 text-[#171C36] mb-3" style={{ fontWeight: 600 }}>Tracking</p>
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#F7F8FC', border: '1px solid #E6E8F1' }}>
                <div>
                  <p className="text-[12px]" style={{ color: '#9DA3B4' }}>Tracking number</p>
                  <p className="text-[13px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>{order.tracking}</p>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(order.tracking!)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-600 border hover:bg-white"
                  style={{ border: '1.5px solid #E6E8F1', color: '#4353EC', fontWeight: 600 }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Copy
                </button>
              </div>
            </div>
          )}

          {/* Items */}
          <div className="p-5" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
            <p className="text-[14px] font-600 text-[#171C36] mb-4" style={{ fontWeight: 600 }}>Items ({order.items.reduce((s, i) => s + i.qty, 0)})</p>
            <div className="flex flex-col gap-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0" style={{ background: '#F7F8FC' }}>
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-600 text-[#171C36] truncate" style={{ fontWeight: 600 }}>{item.name}</p>
                    <p className="text-[12px]" style={{ color: '#9DA3B4' }}>Qty: {item.qty}</p>
                  </div>
                  <p className="text-[14px] font-700 text-[#171C36] shrink-0" style={{ fontWeight: 700 }}>₦{item.price.toLocaleString('en', { minimumFractionDigits: 2 })}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div className="p-5" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
            <p className="text-[14px] font-600 text-[#171C36] mb-3" style={{ fontWeight: 600 }}>Order summary</p>
            <div className="space-y-2.5">
              {[
                { label: 'Subtotal', value: `₦${order.subtotal.toLocaleString('en', { minimumFractionDigits: 2 })}` },
                { label: 'Delivery', value: order.delivery === 0 ? 'Free' : `₦${order.delivery.toFixed(2)}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-[13px]">
                  <span style={{ color: '#6F7489' }}>{label}</span>
                  <span style={{ color: value === 'Free' ? '#167A59' : '#171C36', fontWeight: 500 }}>{value}</span>
                </div>
              ))}
              <div className="flex justify-between text-[15px] font-700 pt-2" style={{ borderTop: '1px solid #E6E8F1', fontWeight: 700 }}>
                <span className="text-[#171C36]">Total</span>
                <span className="text-[#171C36]">₦{total.toLocaleString('en', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Delivery address */}
          <div className="p-5" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
            <p className="text-[14px] font-600 text-[#171C36] mb-3" style={{ fontWeight: 600 }}>Delivered to</p>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#EEEDFF' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="#4353EC" strokeWidth="1.8"/>
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>Maya Reed</p>
                <p className="text-[13px]" style={{ color: '#6F7489' }}>{order.address}</p>
                <p className="text-[12px] mt-0.5" style={{ color: '#9DA3B4' }}>Sold by {order.seller}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {order.status === 'Delivered' ? (
              <>
                <button className="flex-1 h-11 rounded-xl text-[13px] font-600 border hover:bg-gray-50" style={{ border: '1.5px solid #E6E8F1', color: '#6F7489', fontWeight: 600 }}>
                  Return item
                </button>
                <button className="flex-1 h-11 rounded-xl text-white text-[13px] font-600 hover:opacity-90" style={{ background: '#4353EC', fontWeight: 600 }}>
                  Buy again
                </button>
              </>
            ) : order.status === 'Cancelled' ? (
              <Link href="/" className="flex-1 h-11 rounded-xl text-white text-[13px] font-600 hover:opacity-90 flex items-center justify-center" style={{ background: '#4353EC', fontWeight: 600 }}>
                Shop again
              </Link>
            ) : (
              <>
                <button className="flex-1 h-11 rounded-xl text-[13px] font-600 border hover:bg-gray-50" style={{ border: '1.5px solid #E6E8F1', color: '#6F7489', fontWeight: 600 }}>
                  Need help?
                </button>
                <button className="flex-1 h-11 rounded-xl text-white text-[13px] font-600 hover:opacity-90" style={{ background: '#4353EC', fontWeight: 600 }}>
                  Track package
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
type FilterKey = 'all' | 'active' | 'delivered' | 'cancelled';

const filterFn: Record<FilterKey, (o: Order) => boolean> = {
  all:       () => true,
  active:    o => !['Delivered', 'Cancelled'].includes(o.status),
  delivered: o => o.status === 'Delivered',
  cancelled: o => o.status === 'Cancelled',
};

export default function OrdersPage() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [selected, setSelected] = useState<Order | null>(null);
  const [search, setSearch] = useState('');

  const visible = orders
    .filter(filterFn[filter])
    .filter(o =>
      !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some(i => i.name.toLowerCase().includes(search.toLowerCase()))
    );

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: '#F7F8FC', fontFamily: "'Inter', sans-serif" }}>
        <div className="max-w-[860px] mx-auto px-4 py-10">
          {/* Page header */}
          <div className="mb-8">
            <span className="text-[11px] font-700 tracking-widest uppercase block mb-2" style={{ color: '#4353EC', fontWeight: 700 }}>Your account</span>
            <h1 className="text-[30px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>Your orders</h1>
            <p className="text-[14px] mt-1" style={{ color: '#6F7489' }}>Track your deliveries and manage your purchases.</p>
          </div>

          {/* Search + filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#9DA3B4" strokeWidth="1.8"/>
                <path d="m21 21-4.35-4.35" stroke="#9DA3B4" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by order ID or product name…"
                className="w-full h-11 pl-9 pr-4 rounded-xl border outline-none text-[14px]"
                style={{ background: 'white', border: '1.5px solid #E6E8F1', color: '#171C36' }}
              />
            </div>
            <div className="flex items-center gap-2">
              {(['all', 'active', 'delivered', 'cancelled'] as FilterKey[]).map(key => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className="px-3.5 py-2 rounded-xl text-[13px] font-500 capitalize"
                  style={{
                    fontWeight: 500,
                    background: filter === key ? '#171C36' : 'white',
                    color: filter === key ? 'white' : '#6F7489',
                    border: `1.5px solid ${filter === key ? '#171C36' : '#E6E8F1'}`,
                  }}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* Summary strip */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Total orders', value: orders.length },
              { label: 'Active',       value: orders.filter(o => !['Delivered','Cancelled'].includes(o.status)).length },
              { label: 'Delivered',    value: orders.filter(o => o.status === 'Delivered').length },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white py-4 px-5 text-center" style={{ borderRadius: 14, border: '1px solid #E6E8F1' }}>
                <p className="text-[24px] font-800 text-[#171C36]" style={{ fontWeight: 800 }}>{value}</p>
                <p className="text-[12px] mt-0.5" style={{ color: '#9DA3B4' }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Orders list */}
          {visible.length === 0 ? (
            <div className="bg-white py-16 text-center" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#EEEDFF' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[16px] font-600 text-[#171C36] mb-1" style={{ fontWeight: 600 }}>No orders here</p>
              <p className="text-[13px] mb-5" style={{ color: '#9DA3B4' }}>
                {search ? 'No orders match your search.' : 'You have no orders in this category.'}
              </p>
              <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-[13px] font-600 hover:opacity-90" style={{ background: '#4353EC', fontWeight: 600 }}>
                Start shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {visible.map(order => (
                <OrderCard key={order.id} order={order} onSelect={setSelected} />
              ))}
            </div>
          )}

          {/* Help strip */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 bg-white" style={{ borderRadius: 14, border: '1px solid #E6E8F1' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#EEEDFF' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[13px] text-[#171C36]">
                <span className="font-600" style={{ fontWeight: 600 }}>Need help with an order?</span>
                {' '}Our support team is here for you.
              </p>
            </div>
            <Link href="#" className="text-[13px] font-600 shrink-0 flex items-center gap-1 hover:opacity-80" style={{ color: '#4353EC', fontWeight: 600 }}>
              Contact support
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </main>
      <Footer />

      {selected && <OrderDetail order={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
