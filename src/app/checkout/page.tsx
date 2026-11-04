'use client';

// src/app/checkout/page.tsx

import { useState, type ChangeEvent, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import SoftImg from '@/components/ui/Softimg';
import { formatMoney } from '@/types/product';
import { roboto } from '@/lib/fonts';

/* ==========================================================================
   SETTINGS
   ========================================================================== */
/** Keep these in sync with the cart page, the product page and the header message. */
const FREE_DELIVERY_THRESHOLD = 50000;
const DELIVERY_FEE = 2500;

/** `discount` is a percentage taken off the order when this method is chosen. Set it to 0 to remove an offer. */
const PAYMENT_METHODS = [
  { id: 'momo', name: 'MoMo', description: 'Pay from your MTN MoMo wallet.', discount: 5 },
  { id: 'card', name: 'Debit or credit card', description: 'Visa, Mastercard and Verve.', discount: 0 },
  { id: 'bank', name: 'Bank transfer', description: 'Pay by transfer to our account.', discount: 0 },
  { id: 'cash', name: 'Pay on delivery', description: 'Pay in cash when your order arrives.', discount: 0 },
];

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
  'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
  'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
  'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];

/* Colours: same neutral set as the other pages, one accent */
const ACCENT = 'bg-[#4B4FED] hover:bg-[#3d41d9]';
const INK = 'text-[#1c1b22]';
const MUTED = 'text-[#6f6d78]';
const FAINT = 'text-[#9a98a3]';
const LINE = 'border-[#e7e5df]';
const GREEN = 'text-[#1a7f4b]';

const INPUT =
  'h-11 w-full rounded-md border border-[#d9d7d0] bg-white px-3 text-[14px] text-[#1c1b22] outline-none placeholder:text-[#a3a1ab] focus:border-[#4B4FED] focus:ring-2 focus:ring-[#4B4FED]/20';

/** Optional: path to the official MoMo logo file once MTN approves the partnership,
 *  e.g. '/images/momo-logo.png'. While it is empty a simple yellow "MoMo" badge is shown instead. */
const MOMO_LOGO = '';

/* MTN-style yellow, used only on the MoMo option */
const MTN_YELLOW = '#FFCB05';

function MomoBadge() {
  return (
    <span className="inline-flex h-7 items-center rounded-full bg-[#1c1b22] px-3 text-[14px] font-black tracking-tight text-[#FFCB05]">
      MoMo
    </span>
  );
}

type PaymentMethod = (typeof PAYMENT_METHODS)[number];

/* The featured MoMo option: MTN yellow header strip, offer tag, and the MoMo number field once selected */
function MomoOption({
  method,
  selected,
  onSelect,
  momoNumber,
  onNumberChange,
  onUsePhone,
}: {
  method: PaymentMethod;
  selected: boolean;
  onSelect: () => void;
  momoNumber: string;
  onNumberChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onUsePhone: () => void;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border-2 bg-[#fffdf2] transition-colors ${
        selected ? 'border-[#FFCB05] shadow-[0_0_0_3px_rgba(255,203,5,0.25)]' : 'border-[#f1df8f] hover:border-[#FFCB05]'
      }`}
    >
      <label className="block cursor-pointer">
        {/* MTN yellow header strip */}
        <span className="flex items-center justify-between gap-3 px-4 py-2.5" style={{ backgroundColor: MTN_YELLOW }}>
          <span className="flex items-center gap-2.5">
            {MOMO_LOGO ? <SoftImg src={MOMO_LOGO} alt="MoMo" className="h-7 w-auto object-contain" /> : <MomoBadge />}
            <span className="text-[12px] font-medium text-[#1c1b22]">Mobile Money from MTN</span>
          </span>
          {method.discount > 0 && (
            <span className="shrink-0 rounded-full bg-[#1c1b22] px-2.5 py-1 text-[12px] font-medium text-[#FFCB05]">
              Save {method.discount}%
            </span>
          )}
        </span>

        <span className="flex items-start gap-3 p-4">
          <input
            type="radio"
            name="payment"
            value={method.id}
            checked={selected}
            onChange={onSelect}
            className="mt-1 h-4 w-4 accent-[#1c1b22]"
          />
          <span className="min-w-0 flex-1">
            <span className={`block text-[15px] font-medium ${INK}`}>Pay with MoMo</span>
            <span className={`mt-0.5 block text-[13px] ${MUTED}`}>{method.description}</span>
            {method.discount > 0 && (
              <span className={`mt-2 block text-[13px] font-medium ${INK}`}>
                Our MTN partner offer: {method.discount}% off your order.
              </span>
            )}
          </span>
        </span>
      </label>

      {selected && (
        <div className="border-t border-[#f1df8f] bg-white p-4">
          <label htmlFor="momoNumber" className={`mb-1.5 block text-[13px] font-medium ${INK}`}>
            MoMo number *
          </label>
          <input
            id="momoNumber"
            name="momoNumber"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={momoNumber}
            onChange={onNumberChange}
            placeholder="e.g. 0803 123 4567"
            className={INPUT}
          />
          <button type="button" onClick={onUsePhone} className={`mt-2 text-[13px] underline underline-offset-4 ${MUTED} hover:text-[#1c1b22]`}>
            Use my delivery phone number
          </button>
          <p className={`mt-3 text-[13px] ${MUTED}`}>You will be asked to approve the payment on your phone.</p>
        </div>
      )}
    </div>
  );
}

/* Colour / size the shopper picked on the product page, if any */
function variantOf(item: unknown): string {
  const v = item as { colors?: string[]; sizes?: string[] };
  return [v.colors?.[0], v.sizes?.[0]].filter(Boolean).join(' · ');
}

function Field({ label, htmlFor, optional, children }: { label: string; htmlFor: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={`mb-1.5 block text-[13px] font-medium ${INK}`}>
        {label}
        {optional && <span className={`ml-1 font-normal ${FAINT}`}>(optional)</span>}
      </label>
      {children}
    </div>
  );
}

/* -------------------------------- page ---------------------------------- */

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();

  const [paymentId, setPaymentId] = useState('momo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', address: '', city: '', state: '', postalCode: '', momoNumber: '' });

  const items = cart?.cart || [];
  const subtotal = cart?.totalPrice || 0;
  const totalItems = cart?.totalItems || 0;
  const clearCart = cart?.clearCart || (() => {});

  const method = PAYMENT_METHODS.find((m) => m.id === paymentId) ?? PAYMENT_METHODS[0];
  const discountAmount = (subtotal * method.discount) / 100;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const grandTotal = subtotal - discountAmount + deliveryFee;

  /* how much the shopper would save by switching to MoMo (used for the nudge in the summary) */
  const momoDiscount = PAYMENT_METHODS.find((m) => m.id === 'momo')?.discount ?? 0;
  const momoSaving = (subtotal * momoDiscount) / 100;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;
    setIsProcessing(true);
    setError('');

    try {
      // TODO: THIS IS A PLACEHOLDER, NO REAL PAYMENT IS TAKEN.
      // Before launch, send `form`, `items`, `paymentId` and the totals to your backend,
      // create the order, and (for card / MoMo) hand over to your payment gateway.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      clearCart();
      router.push('/checkout/success');
    } catch {
      setError('Something went wrong while placing your order. Please try again.');
      setIsProcessing(false);
    }
  };

  /* ------------------------- empty cart ------------------------- */
  if (items.length === 0) {
    return (
      <main className={`${roboto.className} flex min-h-screen items-start justify-center bg-[#f7f6f3] px-4 pb-20 pt-16`}>
        <div className={`w-full max-w-[440px] rounded-xl border ${LINE} bg-white px-6 py-14 text-center`}>
          <h1 className={`text-[20px] font-medium ${INK}`}>Your cart is empty</h1>
          <p className={`mt-1.5 text-[14px] ${MUTED}`}>Add some products before you check out.</p>
          <Link href="/" className={`mt-6 inline-flex h-11 items-center rounded-lg px-6 text-[14px] font-medium text-white transition-colors ${ACCENT}`}>
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={`${roboto.className} min-h-screen bg-[#f7f6f3] pb-20 pt-6`}>
      <div className="mx-auto w-full max-w-[1320px] px-4">
        {/* ---------- breadcrumb ---------- */}
        <nav aria-label="Breadcrumb" className={`mb-5 flex flex-wrap items-center gap-2 text-[13px] ${MUTED}`}>
          <Link href="/" className="hover:text-[#1c1b22]">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/cart" className="hover:text-[#1c1b22]">Cart</Link>
          <span aria-hidden="true">/</span>
          <span className={INK}>Checkout</span>
        </nav>

        <h1 className={`mb-6 text-[28px] font-medium leading-[1.2] tracking-[-0.01em] sm:text-[32px] ${INK}`}>Checkout</h1>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* ======================== LEFT: FORM ======================== */}
          <form id="checkout-form" onSubmit={handleSubmit} className="min-w-0 space-y-6">
            {/* delivery */}
            <section className={`rounded-xl border ${LINE} bg-white p-5 sm:p-6`} aria-labelledby="delivery-title">
              <h2 id="delivery-title" className={`text-[18px] font-medium ${INK}`}>Delivery details</h2>
              <p className={`mt-1 text-[13px] ${MUTED}`}>Fields marked * are required.</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Full name *" htmlFor="fullName">
                  <input id="fullName" name="fullName" value={form.fullName} onChange={onChange} required autoComplete="name" className={INPUT} placeholder="e.g. Ada Okafor" />
                </Field>
                <Field label="Phone number *" htmlFor="phone">
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} required autoComplete="tel" className={INPUT} placeholder="e.g. 0801 234 5678" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Email address *" htmlFor="email">
                    <input id="email" name="email" type="email" value={form.email} onChange={onChange} required autoComplete="email" className={INPUT} placeholder="you@example.com" />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Delivery address *" htmlFor="address">
                    <textarea
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={onChange}
                      required
                      rows={3}
                      autoComplete="street-address"
                      placeholder="House number, street, landmark"
                      className="w-full resize-none rounded-md border border-[#d9d7d0] bg-white px-3 py-2.5 text-[14px] text-[#1c1b22] outline-none placeholder:text-[#a3a1ab] focus:border-[#4B4FED] focus:ring-2 focus:ring-[#4B4FED]/20"
                    />
                  </Field>
                </div>
                <Field label="City / area *" htmlFor="city">
                  <input id="city" name="city" value={form.city} onChange={onChange} required autoComplete="address-level2" className={INPUT} placeholder="e.g. Ikeja" />
                </Field>
                <Field label="State *" htmlFor="state">
                  <select id="state" name="state" value={form.state} onChange={onChange} required autoComplete="address-level1" className={INPUT}>
                    <option value="" disabled>
                      Select a state
                    </option>
                    {NIGERIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Postal code" htmlFor="postalCode" optional>
                  <input id="postalCode" name="postalCode" value={form.postalCode} onChange={onChange} autoComplete="postal-code" className={INPUT} />
                </Field>
              </div>
            </section>

            {/* payment */}
            <fieldset className={`rounded-xl border ${LINE} bg-white p-5 sm:p-6`}>
              <legend className="sr-only">Payment method</legend>
              <h2 className={`text-[18px] font-medium ${INK}`}>Payment method</h2>

              <div className="mt-5 space-y-3">
                {PAYMENT_METHODS.map((m) => {
                  const selected = paymentId === m.id;
                  if (m.id === 'momo') {
                    return (
                      <MomoOption
                        key={m.id}
                        method={m}
                        selected={selected}
                        onSelect={() => setPaymentId(m.id)}
                        momoNumber={form.momoNumber}
                        onNumberChange={onChange}
                        onUsePhone={() => setForm((f) => ({ ...f, momoNumber: f.phone }))}
                      />
                    );
                  }
                  return (
                    <label
                      key={m.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                        selected ? 'border-[#4B4FED] bg-[#f6f6ff] ring-1 ring-[#4B4FED]' : 'border-[#d9d7d0] hover:border-[#9a98a3]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={m.id}
                        checked={selected}
                        onChange={() => setPaymentId(m.id)}
                        className="mt-1 h-4 w-4 accent-[#4B4FED]"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className={`text-[15px] font-medium ${INK}`}>{m.name}</span>
                          {m.discount > 0 && <span className={`text-[13px] font-medium ${GREEN}`}>Save {m.discount}%</span>}
                        </span>
                        <span className={`mt-0.5 block text-[13px] ${MUTED}`}>{m.description}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </form>

          {/* ======================== RIGHT: SUMMARY ======================== */}
          <aside className={`rounded-xl border ${LINE} bg-white p-5 sm:p-6 lg:sticky lg:top-[140px]`} aria-labelledby="summary-title">
            <h2 id="summary-title" className={`text-[18px] font-medium ${INK}`}>Order summary</h2>

            <ul className="mt-5 max-h-[320px] space-y-4 overflow-y-auto pr-1">
              {items.map((item) => {
                const variant = variantOf(item);
                return (
                  <li key={item.id} className="flex gap-3">
                    <span className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#ecebe6]">
                      <SoftImg src={item.image} alt="" className="h-full w-full object-contain p-1.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`line-clamp-2 block text-[14px] leading-5 ${INK}`}>{item.name}</span>
                      {variant && <span className={`block text-[12px] ${FAINT}`}>{variant}</span>}
                      <span className={`block text-[13px] ${MUTED}`}>Qty {item.quantity}</span>
                    </span>
                    <span className={`shrink-0 text-[14px] font-medium tabular-nums ${INK}`}>{formatMoney(item.price * item.quantity)}</span>
                  </li>
                );
              })}
            </ul>

            <dl className={`mt-5 space-y-2.5 border-t ${LINE} pt-5 text-[14px]`}>
              <div className="flex justify-between">
                <dt className={MUTED}>
                  Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </dt>
                <dd className={`tabular-nums ${INK}`}>{formatMoney(subtotal)}</dd>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between">
                  <dt className={GREEN}>
                    {method.name} discount ({method.discount}%)
                  </dt>
                  <dd className={`tabular-nums ${GREEN}`}>−{formatMoney(discountAmount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className={MUTED}>Delivery</dt>
                <dd className={`tabular-nums ${INK}`}>{deliveryFee === 0 ? 'Free' : formatMoney(deliveryFee)}</dd>
              </div>
            </dl>

            {deliveryFee > 0 && (
              <p className={`mt-3 text-[13px] ${MUTED}`}>Add {formatMoney(FREE_DELIVERY_THRESHOLD - subtotal)} more to get free delivery.</p>
            )}

            {/* nudge: shown while another method is selected */}
            {paymentId !== 'momo' && momoSaving > 0 && (
              <button
                type="button"
                onClick={() => setPaymentId('momo')}
                className="mt-3 flex w-full items-center gap-2.5 rounded-md bg-[#fff6cc] px-3 py-2.5 text-left text-[13px] text-[#1c1b22] transition-colors hover:bg-[#ffefa8]"
              >
                <span className="rounded-full bg-[#FFCB05] px-2 py-0.5 text-[11px] font-black">MoMo</span>
                <span>Pay with MoMo and save {formatMoney(momoSaving)}</span>
              </button>
            )}

            <div className={`mt-5 flex items-baseline justify-between border-t ${LINE} pt-5`}>
              <span className={`text-[16px] font-medium ${INK}`}>Total</span>
              <span className={`text-[24px] font-medium tabular-nums ${INK}`}>{formatMoney(grandTotal)}</span>
            </div>

            {error && (
              <p role="alert" className="mt-4 rounded-md bg-[#fdecec] px-3 py-2 text-[13px] text-[#b42318]">
                {error}
              </p>
            )}

            {/* submits the form on the left, so the browser checks the required fields first */}
            <button
              type="submit"
              form="checkout-form"
              disabled={isProcessing}
              className={`mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg text-[15px] font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${ACCENT}`}
            >
              {isProcessing ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Placing order…
                </>
              ) : (
                `Place order · ${formatMoney(grandTotal)}`
              )}
            </button>

            <p className={`mt-3 text-center text-[12px] ${FAINT}`}>
              By placing your order you agree to our{' '}
              <Link href="/help" className="underline underline-offset-2">
                terms and return policy
              </Link>
              .
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}