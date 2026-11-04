'use client';

// src/app/cart/page.tsx

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import SoftImg from '@/components/ui/Softimg';
import { bestSellers } from '@/data/categorySections';
import { formatMoney } from '@/types/product';
import { roboto } from '@/lib/fonts';

/* ==========================================================================
   SETTINGS  -  the things you will most likely want to change
   ========================================================================== */
const deliveryServices = [
  { id: 'dhl', name: 'DHL Express', price: 15.99, estimatedDays: '1-2 days' },
  { id: 'chowdeck', name: 'Chowdeck', price: 8.99, estimatedDays: '2-3 days' },
  { id: 'ridedeliva', name: 'Ridedeliva', price: 12.99, estimatedDays: '1-3 days' },
];

/** Subtotal at which delivery becomes free. Set to 0 to hide the progress line and turn the perk off. */
const FREE_DELIVERY_THRESHOLD = 500;

/** DEMO coupons (percent off). Replace with real validation from your backend. */
const COUPONS: Record<string, number> = { WELCOME10: 10, LEADERS5: 5 };

/* Colours: one accent, everything else neutral */
const ACCENT = 'bg-[#4B4FED] hover:bg-[#3d41d9]';
const INK = 'text-[#1c1b22]';
const MUTED = 'text-[#6f6d78]';
const FAINT = 'text-[#9a98a3]';
const LINE = 'border-[#e7e5df]';
const GREEN = 'text-[#1a7f4b]';

const COLS = 'md:grid-cols-[minmax(0,1fr)_96px_124px_96px]';

/* ------------------------------- icons ---------------------------------- */

const svg = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

const CardIcon = () => (
  <svg className="h-[22px] w-[22px]" {...svg}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3 10h18M7 15h3" />
  </svg>
);
const BankIcon = () => (
  <svg className="h-[22px] w-[22px]" {...svg}>
    <path d="M3 9.5l9-5.5 9 5.5M5 9.5V18M9.5 9.5V18M14.5 9.5V18M19 9.5V18M3 20.5h18" />
  </svg>
);
const UssdIcon = () => (
  <svg className="h-[22px] w-[22px]" {...svg} strokeWidth={2.4}>
    <path d="M7 6h.01M12 6h.01M17 6h.01M7 12h.01M12 12h.01M17 12h.01M7 18h.01M12 18h.01M17 18h.01" />
  </svg>
);
const CashIcon = () => (
  <svg className="h-[22px] w-[22px]" {...svg}>
    <rect x="3" y="6.5" width="18" height="11" rx="2" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M6.5 10h.01M17.5 14h.01" strokeWidth={2.4} />
  </svg>
);
const BasketIcon = () => (
  <svg className="mx-auto h-12 w-12 text-[#b9b7c2]" {...svg} strokeWidth={1.4}>
    <path d="M3 10h18l-2 10a2 2 0 01-2 1.6H7a2 2 0 01-2-1.6L3 10z" />
    <path d="M8 10l3-6M16 10l-3-6M9 14v3M12 14v3M15 14v3" />
  </svg>
);
const ArrowRight = () => (
  <svg className="h-4 w-4" {...svg} strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const ArrowLeft = () => (
  <svg className="h-4 w-4" {...svg} strokeWidth={2}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);
const CheckIcon = () => (
  <svg className="h-4 w-4" {...svg} strokeWidth={2.4}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const PAYMENT_METHODS = [
  { id: 'card', label: 'Card', Icon: CardIcon },
  { id: 'transfer', label: 'Bank transfer', Icon: BankIcon },
  { id: 'ussd', label: 'USSD', Icon: UssdIcon },
  { id: 'cod', label: 'On delivery', Icon: CashIcon },
];

/* ------------------------------ small pieces ---------------------------- */

const STEPS = ['Cart', 'Details', 'Done'];

function Steps() {
  return (
    <ol className="flex items-center gap-2 text-[13px]" aria-label="Checkout progress">
      {STEPS.map((label, i) => (
        <li key={label} className="flex items-center gap-2">
          <span className={i === 0 ? `font-medium ${INK}` : FAINT}>
            <span className="mr-1.5 tabular-nums">{i + 1}</span>
            {label}
          </span>
          {i < STEPS.length - 1 && <span className={FAINT} aria-hidden="true">/</span>}
        </li>
      ))}
    </ol>
  );
}

function Stepper({ value, max, onChange }: { value: number; max: number; onChange: (n: number) => void }) {
  const btn = `flex h-9 w-9 items-center justify-center text-[18px] leading-none ${MUTED} transition-colors hover:bg-[#f4f3ef] hover:text-[#1c1b22] disabled:cursor-not-allowed disabled:text-[#cfcdd6] disabled:hover:bg-transparent`;
  return (
    <div className="inline-flex items-center rounded-md border border-[#d9d7d0]">
      <button type="button" aria-label="Decrease quantity" disabled={value <= 1} onClick={() => onChange(value - 1)} className={`${btn} rounded-l-md`}>
        −
      </button>
      <span className="flex h-9 min-w-[40px] items-center justify-center border-x border-[#d9d7d0] text-[14px] tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" aria-label="Increase quantity" disabled={value >= max} onClick={() => onChange(value + 1)} className={`${btn} rounded-r-md`}>
        +
      </button>
    </div>
  );
}

function Line({ label, value, valueClass = '' }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between text-[14px]">
      <span className={MUTED}>{label}</span>
      <span className={`tabular-nums ${valueClass || INK}`}>{value}</span>
    </div>
  );
}

/* "You might also like": adds straight to the cart above */
function Suggestions({ excludeIds }: { excludeIds: string[] }) {
  const { addToCart } = useCart();

  const items = bestSellers
    .filter(Boolean)
    .filter((p) => !excludeIds.includes(String(p.id)))
    .slice(0, 5);

  if (items.length === 0) return null;

  const add = (p: (typeof items)[number]) => {
    const item: Product = {
      id: String(p.id),
      name: p.name,
      price: p.price,
      image: p.image,
      category: '',
      description: '',
    };
    addToCart(item);
  };

  return (
    <section className="mt-16" aria-labelledby="suggest-title">
      <div className="mb-5 flex items-baseline justify-between">
        <h2 id="suggest-title" className={`text-[20px] font-medium ${INK}`}>
          You might also like
        </h2>
        <Link href="/categories" className={`text-[14px] underline underline-offset-4 ${MUTED} hover:text-[#1c1b22]`}>
          Browse all
        </Link>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((p) => (
          <li key={p.id} className={`rounded-lg border ${LINE} bg-white p-3 transition-colors hover:border-[#c9c7bf]`}>
            <Link href={p.href} className="block aspect-square overflow-hidden rounded-md bg-[#f3f2ee]" aria-label={p.name}>
              <SoftImg src={p.image} alt="" className="h-full w-full object-contain p-2" />
            </Link>
            <h3 className="mt-3 line-clamp-2 min-h-[34px] text-[13px] leading-[17px] text-[#333]">
              <Link href={p.href} className="hover:underline">
                {p.name}
              </Link>
            </h3>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className={`text-[15px] font-medium ${INK}`}>{formatMoney(p.price)}</span>
              <button
                type="button"
                onClick={() => add(p)}
                className="h-8 rounded-md border border-[#d9d7d0] px-3 text-[13px] font-medium text-[#1c1b22] transition-colors hover:border-[#1c1b22]"
              >
                Add
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* -------------------------------- page ---------------------------------- */

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, updateDeliveryService, totalPrice, totalDeliveryPrice, clearCart, totalItems } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('momo');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [momoAccountNumber, setMomoAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [cardName, setCardName] = useState(user?.name || '');
  const [cardNumber, setCardNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  const grandTotal = totalPrice + totalDeliveryPrice;

  const handleCheckout = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSubmit = () => {
    const selectedOption = paymentOptions.find((option) => option.id === selectedPaymentMethod);

    if (!selectedOption) return;

    const reference = `${selectedOption.label.toUpperCase().replace(/\s+/g, '-')}-${Date.now().toString().slice(-6)}`;
    const items = cart.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      serviceName: item.selectedDeliveryService?.name || 'Standard delivery',
      serviceFee: (item.selectedDeliveryService?.price || 0) * item.quantity,
    }));

    setCompletedOrder({
      paymentMethod: selectedOption.label,
      amount: grandTotal,
      itemCount: totalItems,
      items,
    });

    clearCart();
    setPaymentCompleted(true);
    setTransactionId(reference);
    setIsPaymentModalOpen(false);
    setIsPaymentSuccessOpen(true);
  };

  if (cart.length === 0 && !paymentCompleted) {
    return (
      <AuthGuard>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Browse our categories and discover amazing deals!</p>
            <Link
              href="/"
              className="inline-block bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 font-semibold"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </AuthGuard>
    );
  }

  /* ============================== CART ================================= */
  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Shopping Cart ({totalItems} items)
            </h1>
            <p className="text-gray-600">Welcome, {user?.name}!</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold">Product</th>
                      <th className="text-left p-4 font-semibold">Vendor Location</th>
                      <th className="text-left p-4 font-semibold">Delivery Service</th>
                      <th className="text-left p-4 font-semibold">Quantity</th>
                      <th className="text-right p-4 font-semibold">Total</th>
                      <th className="text-center p-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => {
                      const deliveryOptions = item.deliveryServices?.length ? item.deliveryServices : deliveryServices;
                      const selectedDeliveryId = item.selectedDeliveryService?.id || deliveryOptions[0]?.id || '';

                      return (
                      <tr key={item.id} className="border-b last:border-b-0">
                        <td className="p-4">
                          <div className="flex gap-3 items-center">
                            <div className="w-16 h-16 bg-linear-to-br from-blue-100 to-indigo-100 rounded shrink-0 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://placehold.co/100x100/e0e7ff/3b82f6?text=Product';
                                }}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                              <p className="text-lg font-bold text-green-600">
                                ₦{item.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">{item.vendorLocation}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <select
                            value={selectedDeliveryId}
                            onChange={(e) => {
                              const service = deliveryOptions.find(s => s.id === e.target.value);
                              if (service) updateDeliveryService(item.id, service);
                            }}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {deliveryOptions.map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.name} - ₦{service.price.toLocaleString()} ({service.estimatedDays})
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center border rounded-lg w-fit">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100 transition-colors text-sm"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 border-x font-semibold text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100 transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div>
                            <p className="font-bold text-lg text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</p>
                            <p className="text-sm text-gray-600">+ ₦{((item.selectedDeliveryService?.price || 0) * item.quantity).toLocaleString()} delivery</p>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 font-semibold text-sm"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t bg-gray-50">
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 font-semibold text-sm"
                >
                  Clear Cart
                </button>
              </div>
                </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 border-b pb-3">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Total Delivery Fees</span>
                  <span className="font-semibold text-blue-600">₦{totalDeliveryPrice.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-xl">
                  <span>Grand Total</span>
                  <span className="bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    ₦{(totalPrice + totalDeliveryPrice).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Delivery Summary */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-sm mb-2 text-blue-900">Delivery Summary</h3>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs text-blue-700 mb-1">
                    <span>{item.name} ({item.quantity}x)</span>
                    <span>{item.selectedDeliveryService?.name} - ₦{((item.selectedDeliveryService?.price || 0) * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-linear-to-r from-green-600 to-blue-600 text-white py-4 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 font-bold text-lg mb-3"
              >
                Proceed to Payment
              </button>
              <Link
                href="/"
                className="block text-center text-blue-600 hover:text-green-600 font-semibold transition-colors"
              >
                Checkout <ArrowRight />
              </Link>

              <p className={`mt-4 text-center text-[13px] ${MUTED}`}>
                Questions?{' '}
                <Link href="/help" className="underline underline-offset-2 hover:text-[#1c1b22]">
                  Contact support
                </Link>
              </p>
            </div>
          </aside>
        </div>

        {isPaymentSuccessOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/60 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">✅</div>
              <h3 className="text-2xl font-bold text-slate-900">Payment Successful</h3>
              <p className="mt-2 text-sm text-slate-600">Your order has been placed and the cart has been cleared.</p>

              <div className="mt-5 rounded-xl bg-green-50 p-4 text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-green-700">Transaction</p>
                <p className="mt-2 text-lg font-bold text-green-700">{transactionId || 'MOMO-000000'}</p>
                <p className="mt-1 text-sm text-slate-600">Amount paid: ₦{completedOrder?.amount.toLocaleString() || grandTotal.toLocaleString()}</p>
                <p className="mt-1 text-sm text-slate-600">Payment method: {completedOrder?.paymentMethod || selectedPaymentMethod}</p>
                <p className="mt-1 text-sm text-slate-600">Items: {completedOrder?.itemCount || totalItems}</p>
                <p className="mt-2 text-sm text-slate-600">Status: Order confirmed</p>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Delivery & order history</p>
                <div className="space-y-2">
                  {(completedOrder?.items || cart.map((item) => ({
                    name: item.name,
                    quantity: item.quantity,
                    serviceName: item.selectedDeliveryService?.name || 'Standard delivery',
                    serviceFee: (item.selectedDeliveryService?.price || 0) * item.quantity,
                  }))).map((item, index) => (
                    <div key={`${item.name}-${index}`} className="flex items-center justify-between gap-3 text-sm text-slate-700">
                      <span>{item.name} ({item.quantity}x)</span>
                      <span>{item.serviceName} - ₦{item.serviceFee.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsPaymentSuccessOpen(false);
                  setPaymentCompleted(false);
                  setCompletedOrder(null);
                  router.push('/');
                }}
                className="mt-6 w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

        {isPaymentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Checkout</p>
                  <h3 className="mt-2 text-2xl font-bold text-slate-900">Choose payment method</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="text-2xl text-slate-500 hover:text-slate-800"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3">
                {paymentOptions.map((option) => {
                  const isSelected = selectedPaymentMethod === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedPaymentMethod(option.id)}
                      className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                        isSelected
                          ? 'border-green-500 bg-green-50 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:border-green-300 hover:bg-green-50/40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                          {option.icon}
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-900">{option.label}</p>
                          <p className="text-sm text-slate-600">{option.description}</p>
                        </div>
                      </div>

                      <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {option.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
                {selectedPaymentMethod === 'momo' && (
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-700">MTN MoMo account number</label>
                    <input
                      type="tel"
                      value={momoAccountNumber || phoneNumber}
                      onChange={(e) => {
                        setMomoAccountNumber(e.target.value);
                        setPhoneNumber(e.target.value);
                      }}
                      placeholder="024 000 0000"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none ring-0 focus:border-green-500"
                    />
                    <p className="text-xs text-slate-600">This acts like a secure mobile wallet account number used to receive the payment.</p>
                  </div>
                )}

                {selectedPaymentMethod === 'ussd' && (
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-700">MTN MoMo USSD account number</label>
                    <input
                      type="tel"
                      value={momoAccountNumber || phoneNumber}
                      onChange={(e) => {
                        setMomoAccountNumber(e.target.value);
                        setPhoneNumber(e.target.value);
                      }}
                      placeholder="024 000 0000"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-500"
                    />
                    <p className="text-xs text-slate-600">Use the MTN MoMo shortcode and confirm the payment using this secure mobile wallet account number.</p>
                  </div>
                )}

                {selectedPaymentMethod === 'bank' && (
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700">Bank name</label>
                      <input
                        type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="Access Bank"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700">Account number</label>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        placeholder="0123456789"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-500"
                      />
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === 'card' && (
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700">Cardholder name</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700">Card number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
                <div>
                  <p className="text-sm text-slate-500">Total to pay</p>
                  <p className="text-2xl font-bold text-green-600">₦{grandTotal.toLocaleString()}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPaymentModalOpen(false)}
                    className="rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handlePaymentSubmit}
                    className="rounded-lg bg-linear-to-r from-green-600 to-blue-600 px-5 py-2.5 font-semibold text-white shadow-md hover:from-green-700 hover:to-blue-700"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}