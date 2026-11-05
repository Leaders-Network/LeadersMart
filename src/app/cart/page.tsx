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
  { id: 'dhl', name: 'DHL Express', price: 25600, estimatedDays: '1-2 days' },
  { id: 'chowdeck', name: 'Chowdeck', price: 14400, estimatedDays: '2-3 days' },
  { id: 'ridedeliva', name: 'Ridedeliva', price: 20800, estimatedDays: '1-3 days' },
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
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart, totalItems } = useCart();

  const [selectedDelivery, setSelectedDelivery] = useState(deliveryServices[0]);
  const [payment, setPayment] = useState('card');
  const [confirmClear, setConfirmClear] = useState(false);
  const [note, setNote] = useState('');

  const [couponInput, setCouponInput] = useState('');
  const [coupon, setCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  /* ---- money ---- */
  const subtotal = totalPrice;
  const freeDeliveryOn = FREE_DELIVERY_THRESHOLD > 0;
  const freeDelivery = freeDeliveryOn && subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = freeDelivery ? 0 : selectedDelivery.price;
  const discount = coupon ? (subtotal * coupon.percent) / 100 : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progress = freeDeliveryOn ? Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100) : 0;

  const applyCoupon = (e: FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    const percent = COUPONS[code];
    if (percent) {
      setCoupon({ code, percent });
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError("That code isn't valid.");
    }
  };

  const cartIds = cart.map((i) => String(i.id));

  /* ============================ EMPTY STATE ============================ */
  if (cart.length === 0) {
    return (
      <main className={`${roboto.className} min-h-screen bg-[#f7f6f3] py-14`}>
        <div className="mx-auto w-full max-w-[1320px] px-4">
          <div className={`mx-auto max-w-[460px] rounded-xl border ${LINE} bg-white px-6 py-14 text-center`}>
            <BasketIcon />
            <h1 className={`mt-5 text-[24px] font-medium ${INK}`}>Your cart is empty</h1>
            <p className={`mt-2 text-[14px] leading-6 ${MUTED}`}>Nothing here yet. Pick something from the shop and it will show up here.</p>
            <Link href="/" className={`mt-7 inline-flex h-11 items-center rounded-lg px-7 text-[14px] font-medium text-white transition-colors ${ACCENT}`}>
              Start shopping
            </Link>
            <div>
              <Link href="/deals" className={`mt-4 inline-block text-[14px] underline underline-offset-4 ${MUTED} hover:text-[#1c1b22]`}>
                See today&apos;s deals
              </Link>
            </div>
          </div>

          <Suggestions excludeIds={[]} />
        </div>
      </main>
    );
  }

  /* ============================== CART ================================= */
  return (
    <main className={`${roboto.className} min-h-screen bg-[#f7f6f3] pb-16 pt-10`}>
      <div className="mx-auto w-full max-w-[1320px] px-4">
        {/* ---------- title ---------- */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h1 className={`text-[30px] font-medium leading-none tracking-[-0.01em] sm:text-[34px] ${INK}`}>Your cart</h1>
          <Steps />
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
          {/* ======================== LEFT: items ======================== */}
          <div>
            <section className={`overflow-hidden rounded-xl border ${LINE} bg-white`} aria-label="Items in your cart">
              {/* card header */}
              <div className={`flex items-center justify-between border-b ${LINE} px-5 py-4`}>
                <h2 className={`text-[16px] font-medium ${INK}`}>
                  Items <span className={`font-normal ${FAINT}`}>({totalItems})</span>
                </h2>

                {confirmClear ? (
                  <div className="flex items-center gap-3 text-[13px]">
                    <span className={MUTED}>Remove everything?</span>
                    <button
                      type="button"
                      onClick={() => {
                        clearCart();
                        setConfirmClear(false);
                      }}
                      className="font-medium text-[#c62828] hover:underline"
                    >
                      Yes, clear
                    </button>
                    <button type="button" onClick={() => setConfirmClear(false)} className={`${MUTED} hover:text-[#1c1b22]`}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setConfirmClear(true)} className={`text-[13px] ${MUTED} underline-offset-4 hover:text-[#1c1b22] hover:underline`}>
                    Clear cart
                  </button>
                )}
              </div>

              {/* free delivery line */}
              {freeDeliveryOn && (
                <div className={`border-b ${LINE} bg-[#faf9fd] px-5 py-3`}>
                  <p className="text-[13px] text-[#4a4954]">
                    {freeDelivery ? (
                      <span className={`inline-flex items-center gap-1.5 font-medium ${GREEN}`}>
                        <CheckIcon /> Free delivery unlocked
                      </span>
                    ) : (
                      <>
                        Add <b className={`font-medium ${INK}`}>{formatMoney(remaining)}</b> more for free delivery
                      </>
                    )}
                  </p>
                  <div
                    className="mt-2 h-1 overflow-hidden rounded-full bg-[#e4e2ee]"
                    role="progressbar"
                    aria-label="Progress to free delivery"
                    aria-valuenow={Math.round(progress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className={`h-full rounded-full transition-[width] duration-500 ${freeDelivery ? 'bg-[#1a7f4b]' : 'bg-[#4B4FED]'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* column titles (desktop) */}
              <div
                className={`hidden gap-4 border-b ${LINE} px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.08em] ${FAINT} md:grid ${COLS}`}
                aria-hidden="true"
              >
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span className="text-right">Subtotal</span>
              </div>

              {/* rows */}
              <ul className="divide-y divide-[#eeece6]">
                {cart.map((item) => {
                  const max = item.stock && item.stock > 0 ? item.stock : 99;
                  return (
                    <li key={item.id} className={`grid items-center gap-x-4 gap-y-4 px-5 py-5 ${COLS}`}>
                      {/* product */}
                      <div className="flex min-w-0 gap-4">
                        <Link
                          href={`/products/${item.id}`}
                          className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#f3f2ee]"
                          aria-label={item.name}
                        >
                          <SoftImg src={item.image} alt="" className="h-full w-full object-contain p-1.5" />
                        </Link>
                        <div className="min-w-0 self-center">
                          <h3 className={`line-clamp-2 text-[15px] font-medium leading-5 ${INK}`}>
                            <Link href={`/products/${item.id}`} className="hover:underline">
                              {item.name}
                            </Link>
                          </h3>
                          {item.category && <p className={`mt-0.5 text-[13px] ${MUTED}`}>{item.category}</p>}
                          <p className={`mt-0.5 text-[13px] md:hidden ${MUTED}`}>{formatMoney(item.price)} each</p>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className={`mt-2 text-[13px] underline underline-offset-2 ${MUTED} transition-colors hover:text-[#c62828]`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* price / quantity / subtotal (one row on mobile, grid cells on desktop) */}
                      <div className="flex items-center justify-between gap-3 md:contents">
                        <p className={`hidden text-[14px] md:block ${INK}`}>{formatMoney(item.price)}</p>
                        <Stepper value={item.quantity} max={max} onChange={(n) => updateQuantity(item.id, n)} />
                        <p className={`text-right text-[15px] font-medium tabular-nums ${INK}`}>{formatMoney(item.price * item.quantity)}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* note */}
              <details className={`group border-t ${LINE} px-5 py-4`}>
                <summary className={`flex cursor-pointer list-none items-center justify-between text-[14px] ${INK} [&::-webkit-details-marker]:hidden`}>
                  Add a note to your order
                  <span className={`text-[20px] leading-none transition-transform group-open:rotate-45 ${MUTED}`} aria-hidden="true">
                    +
                  </span>
                </summary>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  aria-label="Order note"
                  placeholder="Delivery instructions, a gift message, anything we should know"
                  className="mt-3 w-full resize-none rounded-md border border-[#d9d7d0] px-3 py-2.5 text-[14px] text-[#333] outline-none transition-shadow placeholder:text-[#a3a1ab] focus:border-[#4B4FED] focus:ring-2 focus:ring-[#4B4FED]/20"
                />
              </details>
            </section>

            <Link href="/" className={`mt-5 inline-flex items-center gap-2 text-[14px] underline-offset-4 hover:underline ${INK}`}>
              <ArrowLeft /> Continue shopping
            </Link>
          </div>

          {/* ======================= RIGHT: summary ====================== */}
          <aside className="lg:sticky lg:top-[172px]" aria-label="Order summary">
            <div className={`rounded-xl border ${LINE} bg-white p-6`}>
              <h2 className={`text-[18px] font-medium ${INK}`}>Order summary</h2>

              {/* delivery partner */}
              <div className="mt-5" role="radiogroup" aria-label="Delivery partner">
                <p className={`text-[12px] font-medium uppercase tracking-[0.08em] ${FAINT}`}>Delivery</p>
                <div className="mt-1 divide-y divide-[#eeece6]">
                  {deliveryServices.map((s) => (
                    <label key={s.id} className="flex cursor-pointer items-center gap-3 py-3">
                      <input
                        type="radio"
                        name="delivery"
                        value={s.id}
                        checked={selectedDelivery.id === s.id}
                        onChange={() => setSelectedDelivery(s)}
                        className="peer sr-only"
                      />
                      <span className="h-4 w-4 shrink-0 rounded-full border-2 border-[#c9c7d1] bg-white transition-all peer-checked:border-[5px] peer-checked:border-[#4B4FED] peer-focus-visible:ring-2 peer-focus-visible:ring-[#4B4FED]/40" />
                      <span className="flex-1">
                        <span className={`block text-[14px] ${INK}`}>{s.name}</span>
                        <span className={`block text-[12px] ${MUTED}`}>{s.estimatedDays}</span>
                      </span>
                      <span className={`text-[14px] tabular-nums ${INK}`}>
                        {freeDelivery ? (
                          <>
                            <span className={`mr-1.5 text-[12px] line-through ${FAINT}`}>{formatMoney(s.price)}</span>
                            <span className={GREEN}>Free</span>
                          </>
                        ) : (
                          formatMoney(s.price)
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* coupon */}
              <form onSubmit={applyCoupon} className={`mt-4 border-t ${LINE} pt-5`}>
                {coupon ? (
                  <div className="flex items-center justify-between text-[14px]">
                    <span className={`inline-flex items-center gap-2 ${GREEN}`}>
                      <CheckIcon />
                      <span>
                        <b className="font-medium">{coupon.code}</b> applied · {coupon.percent}% off
                      </span>
                    </span>
                    <button type="button" onClick={() => setCoupon(null)} className={`text-[13px] underline underline-offset-2 ${MUTED} hover:text-[#1c1b22]`}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <label htmlFor="coupon" className={`text-[12px] font-medium uppercase tracking-[0.08em] ${FAINT}`}>
                      Coupon code
                    </label>
                    <div className="mt-2 flex gap-2">
                      <input
                        id="coupon"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          setCouponError('');
                        }}
                        autoComplete="off"
                        placeholder="Enter code"
                        className="h-10 min-w-0 flex-1 rounded-md border border-[#d9d7d0] px-3 text-[14px] outline-none placeholder:text-[#a3a1ab] focus:border-[#4B4FED] focus:ring-2 focus:ring-[#4B4FED]/20"
                      />
                      <button type="submit" className="h-10 shrink-0 rounded-md border border-[#d9d7d0] px-4 text-[14px] font-medium text-[#1c1b22] transition-colors hover:bg-[#f4f3ef]">
                        Apply
                      </button>
                    </div>
                  </>
                )}
                {couponError && (
                  <p className="mt-2 text-[13px] text-[#c62828]" role="alert">
                    {couponError}
                  </p>
                )}
              </form>

              {/* totals */}
              <div className={`mt-5 space-y-2.5 border-t ${LINE} pt-5`}>
                <Line label={`Subtotal (${totalItems} ${totalItems === 1 ? 'item' : 'items'})`} value={formatMoney(subtotal)} />
                <Line label={`Delivery · ${selectedDelivery.name}`} value={freeDelivery ? 'Free' : formatMoney(deliveryFee)} valueClass={freeDelivery ? GREEN : ''} />
                {coupon && <Line label={`Discount (${coupon.percent}%)`} value={`− ${formatMoney(discount)}`} valueClass={GREEN} />}
              </div>

              <div className={`mt-4 flex items-baseline justify-between border-t ${LINE} pt-4`}>
                <span className={`text-[15px] font-medium ${INK}`}>Total</span>
                <span className={`text-[24px] font-medium tabular-nums ${INK}`}>{formatMoney(total)}</span>
              </div>

              {/* payment method */}
              <div className={`mt-6 border-t ${LINE} pt-5`} role="radiogroup" aria-labelledby="pay-title">
                <h3 id="pay-title" className={`text-[15px] font-medium ${INK}`}>
                  Payment method
                </h3>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {PAYMENT_METHODS.map(({ id, label, Icon }) => (
                    <label key={id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value={id}
                        checked={payment === id}
                        onChange={() => setPayment(id)}
                        className="peer sr-only"
                      />
                      <span className="flex h-[68px] flex-col items-center justify-center gap-1.5 rounded-lg border border-transparent bg-[#f3f2ee] text-[#5b5964] transition-colors hover:bg-[#eceae4] peer-checked:border-[#4B4FED] peer-checked:bg-white peer-checked:text-[#4B4FED] peer-focus-visible:ring-2 peer-focus-visible:ring-[#4B4FED]/40">
                        <Icon />
                        <span className="text-[11px] leading-none">{label}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* TODO: pass the chosen delivery partner, payment method, coupon and note to your checkout (context or query string) */}
              <Link
                href="/checkout"
                className={`mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg text-[15px] font-medium text-white transition-colors ${ACCENT}`}
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

        <Suggestions excludeIds={cartIds} />
      </div>
    </main>
  );
}