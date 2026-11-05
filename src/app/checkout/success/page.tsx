// src/app/checkout/success/page.tsx

import Link from 'next/link';
import { roboto } from '@/lib/fonts';

export const metadata = { title: 'Order placed' };

/* ==========================================================================
   SETTINGS
   ========================================================================== */
/** Shown under "What happens next". Edit to your real delivery time, or set to '' to hide the line. */
const DELIVERY_ESTIMATE = '2 to 3 business days';

/* Colours: same neutral set as the other pages, one accent */
const ACCENT = 'bg-[#4B4FED] hover:bg-[#3d41d9]';
const INK = 'text-[#1c1b22]';
const MUTED = 'text-[#6f6d78]';
const FAINT = 'text-[#9a98a3]';
const LINE = 'border-[#e7e5df]';

/** The checkout page should send the customer here with their real order number from your backend:
 *    router.push(`/checkout/success?order=${order.number}`)
 *  Until then no order number is shown, because the old one was invented in the browser. */
export default async function CheckoutSuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  const orderNumber = order?.trim().slice(0, 40);

  const steps = [
    { title: 'We confirm your order', text: 'You will get a confirmation message with your order details.' },
    { title: 'We prepare your items', text: 'Your order is packed and handed to our delivery partner.' },
    { title: 'Your order arrives', text: DELIVERY_ESTIMATE ? `Delivery usually takes ${DELIVERY_ESTIMATE}.` : 'We will let you know when it is on its way.' },
  ];

  return (
    <main className={`${roboto.className} min-h-screen bg-[#f7f6f3] px-4 pb-20 pt-10 sm:pt-16`}>
      <div className="mx-auto w-full max-w-[560px]">
        <div className={`rounded-xl border ${LINE} bg-white p-6 text-center sm:p-10`}>
          {/* static check mark: no bouncing or pulsing */}
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5ee] text-[#1a7f4b]">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>

          <h1 className={`mt-5 text-[26px] font-medium leading-[1.2] tracking-[-0.01em] sm:text-[30px] ${INK}`}>Thank you, your order is placed</h1>
          <p className={`mt-2 text-[15px] leading-6 ${MUTED}`}>We have received your order and will be in touch shortly.</p>

          {orderNumber && (
            <div className={`mt-6 rounded-lg border ${LINE} bg-[#faf9f7] px-4 py-3`}>
              <p className={`text-[12px] uppercase tracking-wide ${FAINT}`}>Order number</p>
              <p className={`mt-0.5 break-all text-[18px] font-medium tabular-nums ${INK}`}>{orderNumber}</p>
            </div>
          )}

          {/* what happens next */}
          <div className={`mt-8 border-t ${LINE} pt-8 text-left`}>
            <h2 className={`text-[15px] font-medium ${INK}`}>What happens next</h2>
            <ol className="mt-4 space-y-4">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#d9d7d0] text-[12px] font-medium ${MUTED}`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className={`block text-[14px] font-medium ${INK}`}>{s.title}</span>
                    <span className={`block text-[14px] leading-5 ${MUTED}`}>{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/" className={`inline-flex h-12 items-center justify-center rounded-lg px-8 text-[15px] font-medium text-white transition-colors ${ACCENT}`}>
              Continue shopping
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-[#1c1b22] px-8 text-[15px] font-medium text-[#1c1b22] transition-colors hover:bg-[#1c1b22] hover:text-white"
            >
              View my orders
            </Link>
          </div>
        </div>

        <p className={`mt-6 text-center text-[14px] ${MUTED}`}>
          Need help with your order?{' '}
          <Link href="/help" className={`underline underline-offset-4 ${INK}`}>
            Contact support
          </Link>
        </p>
      </div>
    </main>
  );
}