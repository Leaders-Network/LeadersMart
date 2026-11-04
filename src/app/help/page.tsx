'use client';

// src/app/help/page.tsx

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { formatMoney } from '@/types/product';
import { roboto } from '@/lib/fonts';

/* ==========================================================================
   SETTINGS: please check every value in this block against your real policies.
   ========================================================================== */
const PHONE_LABEL = '+234 812 410 6198';
const PHONE_HREF = 'tel:+2348124106198';
const EMAIL = 'eleadersmart@gmail.com';

/** Keep these the same as the checkout page, product page and header message. */
const FREE_DELIVERY_THRESHOLD = 50000;
const DELIVERY_FEE = 2500;
const DELIVERY_ESTIMATE = '2 to 3 business days';
const MOMO_DISCOUNT = 5;

/* Colours: same neutral set as the other pages, one accent */
const ACCENT = 'bg-[#4B4FED] hover:bg-[#3d41d9]';
const INK = 'text-[#1c1b22]';
const MUTED = 'text-[#6f6d78]';
const FAINT = 'text-[#9a98a3]';
const LINE = 'border-[#e7e5df]';

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

const BoxIcon = () => (
  <svg className="h-6 w-6" {...svg}>
    <path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5v-9z" />
    <path d="M3 7.5L12 12l9-4.5M12 12v9" />
  </svg>
);
const ReturnIcon = () => (
  <svg className="h-6 w-6" {...svg}>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h10a6 6 0 010 12h-3" />
  </svg>
);
const CardIcon = () => (
  <svg className="h-6 w-6" {...svg}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18M7 15h3" />
  </svg>
);
const SearchIcon = () => (
  <svg className="h-5 w-5" {...svg} strokeWidth={2}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);
const PhoneIcon = () => (
  <svg className="h-5 w-5" {...svg}>
    <path d="M3 5a2 2 0 012-2h2.3a1 1 0 01.95.68l1.1 3.3a1 1 0 01-.5 1.2l-1.5.75a11 11 0 005.4 5.4l.75-1.5a1 1 0 011.2-.5l3.3 1.1a1 1 0 01.68.95V19a2 2 0 01-2 2A16 16 0 013 5z" />
  </svg>
);
const MailIcon = () => (
  <svg className="h-5 w-5" {...svg}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);
const ChevronIcon = () => (
  <svg className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" {...svg} strokeWidth={2.2}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

/* ------------------------------- content -------------------------------- */

type TopicId = 'orders' | 'returns' | 'payment';

const TOPICS: { id: TopicId; title: string; text: string; icon: ReactNode }[] = [
  { id: 'orders', title: 'Orders and delivery', text: 'Tracking, delivery times and fees', icon: <BoxIcon /> },
  { id: 'returns', title: 'Returns and refunds', text: 'Our return process', icon: <ReturnIcon /> },
  { id: 'payment', title: 'Payment', text: 'Payment methods and offers', icon: <CardIcon /> },
];

/** DRAFT ANSWERS. They only state things already shown elsewhere on your site (delivery fee, MoMo offer,
 *  payment methods). Anything else is kept general. Read each one and edit it to match how your business
 *  really works, especially returns, cancellations and where you deliver. */
const FAQS: { topic: TopicId; q: string; a: string }[] = [
  {
    topic: 'orders',
    q: 'How do I track my order?',
    a: 'Once your order is dispatched we will contact you with delivery updates. If you have not heard from us, get in touch with your order number and we will check on it for you.',
  },
  {
    topic: 'orders',
    q: 'How long does delivery take?',
    a: `Delivery usually takes ${DELIVERY_ESTIMATE}. Delivery is free on orders of ${formatMoney(FREE_DELIVERY_THRESHOLD)} or more. Below that, a delivery fee of ${formatMoney(DELIVERY_FEE)} applies.`,
  },
  {
    topic: 'orders',
    q: 'Do you deliver outside Nigeria?',
    a: 'At the moment we deliver within Nigeria only.',
  },
  {
    topic: 'orders',
    q: 'Can I cancel my order?',
    a: 'Contact us as soon as possible with your order number. We can cancel an order that has not been dispatched yet.',
  },
  {
    topic: 'returns',
    q: 'What is your return policy?',
    a: 'If an item arrives damaged, faulty or not as described, contact us as soon as you receive it and we will arrange a return, replacement or refund. Items should be unused and in their original packaging.',
  },
  {
    topic: 'returns',
    q: 'How do I start a return?',
    a: 'Call or email us with your order number and a short description of the problem. A photo of the item helps us sort it out faster.',
  },
  {
    topic: 'payment',
    q: 'Which payment methods do you accept?',
    a: 'You can pay with MoMo, a debit or credit card, or bank transfer, or choose pay on delivery and pay in cash when your order arrives.',
  },
  {
    topic: 'payment',
    q: 'How does the MoMo discount work?',
    a: `Choose MoMo at checkout and ${MOMO_DISCOUNT}% is taken off your order. You will be asked to approve the payment on your phone.`,
  },
  {
    topic: 'payment',
    q: 'Can I pay on delivery?',
    a: 'Yes. Choose pay on delivery at checkout and pay in cash when your order arrives.',
  },
];

/* -------------------------------- page ---------------------------------- */

export default function HelpPage() {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState<TopicId | 'all'>('all');

  const q = query.trim().toLowerCase();
  const results = FAQS.filter(
    (f) => (topic === 'all' || f.topic === topic) && (q === '' || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)),
  );

  return (
    <main className={`${roboto.className} min-h-screen bg-[#f7f6f3] pb-20 pt-6`}>
      <div className="mx-auto w-full max-w-[980px] px-4">
        {/* ---------- breadcrumb ---------- */}
        <nav aria-label="Breadcrumb" className={`mb-5 flex flex-wrap items-center gap-2 text-[13px] ${MUTED}`}>
          <Link href="/" className="hover:text-[#1c1b22]">Home</Link>
          <span aria-hidden="true">/</span>
          <span className={INK}>Help center</span>
        </nav>

        {/* ---------- title + search ---------- */}
        <header className="mb-8">
          <h1 className={`text-[28px] font-medium leading-[1.2] tracking-[-0.01em] sm:text-[32px] ${INK}`}>Help center</h1>
          <p className={`mt-1.5 text-[14px] ${MUTED}`}>Find answers to common questions, or contact us.</p>

          <form role="search" onSubmit={(e) => e.preventDefault()} className="relative mt-5 max-w-[620px]">
            <label htmlFor="help-search" className="sr-only">
              Search for help
            </label>
            <span className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${FAINT}`}>
              <SearchIcon />
            </span>
            <input
              id="help-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for help, e.g. delivery or refund"
              className="h-12 w-full rounded-lg border border-[#d9d7d0] bg-white pl-12 pr-4 text-[15px] text-[#1c1b22] outline-none placeholder:text-[#a3a1ab] focus:border-[#4B4FED] focus:ring-2 focus:ring-[#4B4FED]/20"
            />
          </form>
        </header>

        {/* ---------- topics ---------- */}
        <ul className="mb-8 grid gap-3 sm:grid-cols-3">
          {TOPICS.map((t) => {
            const active = topic === t.id;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTopic(active ? 'all' : t.id)}
                  className={`flex h-full w-full items-start gap-3 rounded-xl border bg-white p-4 text-left transition-colors ${
                    active ? 'border-[#1c1b22] ring-1 ring-[#1c1b22]' : `${LINE} hover:border-[#c9c7bf]`
                  }`}
                >
                  <span className={`mt-0.5 ${INK}`}>{t.icon}</span>
                  <span>
                    <span className={`block text-[15px] font-medium ${INK}`}>{t.title}</span>
                    <span className={`mt-0.5 block text-[13px] ${MUTED}`}>{t.text}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* ---------- FAQ ---------- */}
        <section className={`rounded-xl border ${LINE} bg-white`} aria-labelledby="faq-title">
          <div className={`flex flex-wrap items-center justify-between gap-2 border-b ${LINE} px-5 py-4 sm:px-6`}>
            <h2 id="faq-title" className={`text-[18px] font-medium ${INK}`}>
              Frequently asked questions
            </h2>
            {(topic !== 'all' || q !== '') && (
              <button
                type="button"
                onClick={() => {
                  setTopic('all');
                  setQuery('');
                }}
                className={`text-[13px] underline underline-offset-4 ${MUTED} hover:text-[#1c1b22]`}
              >
                Show all
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className={`text-[16px] font-medium ${INK}`}>We could not find an answer for that</p>
              <p className={`mt-1.5 text-[14px] ${MUTED}`}>Try different words, or contact us below and we will help.</p>
            </div>
          ) : (
            <ul className="divide-y divide-[#eeece6]">
              {results.map((f) => (
                <li key={f.q}>
                  <details className="group">
                    <summary
                      className={`flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-medium sm:px-6 ${INK} hover:bg-[#faf9f7] [&::-webkit-details-marker]:hidden`}
                    >
                      {f.q}
                      <span className={FAINT}>
                        <ChevronIcon />
                      </span>
                    </summary>
                    <p className={`px-5 pb-5 text-[14px] leading-6 sm:px-6 ${MUTED}`}>{f.a}</p>
                  </details>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* ---------- contact ---------- */}
        <section className={`mt-8 rounded-xl border ${LINE} bg-white p-5 sm:p-6`} aria-labelledby="contact-title">
          <h2 id="contact-title" className={`text-[18px] font-medium ${INK}`}>
            Still need help?
          </h2>
          <p className={`mt-1 text-[14px] ${MUTED}`}>Contact us and we will get back to you. Please have your order number ready.</p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a href={PHONE_HREF} className={`inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-[15px] font-medium text-white transition-colors ${ACCENT}`}>
              <PhoneIcon /> Call {PHONE_LABEL}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#1c1b22] px-6 text-[15px] font-medium text-[#1c1b22] transition-colors hover:bg-[#1c1b22] hover:text-white"
            >
              <MailIcon /> Email us
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}  
