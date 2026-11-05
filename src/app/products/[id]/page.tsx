'use client';

// src/app/products/[id]/page.tsx

import { use, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import type { Product } from '@/types';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import SoftImg from '@/components/ui/Softimg';
import { formatMoney } from '@/types/product';
import { roboto } from '@/lib/fonts';

/* ==========================================================================
   SETTINGS
   ========================================================================== */
/** Keep in sync with the cart page */
const FREE_DELIVERY_THRESHOLD = 500;

/** SAMPLE REVIEWS. These are placeholders so the Reviews tab has something to show.
 *  Delete them (leave the array empty) or load real reviews from your backend before launch. */
type Review = { id: number; name: string; rating: number; title: string; text: string; date: string };

const SAMPLE_REVIEWS: Review[] = [
  { id: 3, name: 'Sample Reviewer', rating: 5, title: 'Great quality', text: 'Sample review text. Replace this with a real customer review from your backend.', date: '3 days ago' },
  { id: 2, name: 'Sample Reviewer', rating: 4, title: 'Good value', text: 'Sample review text. Replace this with a real customer review from your backend.', date: '1 week ago' },
  { id: 1, name: 'Sample Reviewer', rating: 5, title: 'Exactly as described', text: 'Sample review text. Replace this with a real customer review from your backend.', date: '2 weeks ago' },
];

/* Colours: one accent, everything else neutral (same as the cart page) */
const ACCENT = 'bg-[#4B4FED] hover:bg-[#3d41d9]';
const INK = 'text-[#1c1b22]';
const MUTED = 'text-[#6f6d78]';
const FAINT = 'text-[#9a98a3]';
const LINE = 'border-[#e7e5df]';
const GREEN = 'text-[#1a7f4b]';

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

const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg className="h-5 w-5" {...svg} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20.5s-7.5-4.6-9.3-9.3C1.5 8 3.4 4.8 6.6 4.8c1.9 0 3.6 1 4.6 2.6l.8 1.2.8-1.2c1-1.6 2.7-2.6 4.6-2.6 3.2 0 5.1 3.2 3.9 6.4-1.8 4.7-9.3 9.3-9.3 9.3z" />
  </svg>
);
const ShareIcon = () => (
  <svg className="h-5 w-5" {...svg}>
    <circle cx="6" cy="12" r="2.3" />
    <circle cx="17.5" cy="6" r="2.3" />
    <circle cx="17.5" cy="18" r="2.3" />
    <path d="M8 11l7.5-4M8 13l7.5 4" />
  </svg>
);
const ChevronLeft = () => (
  <svg className="h-4 w-4" {...svg} strokeWidth={2.2}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);
const ChevronRight = () => (
  <svg className="h-4 w-4" {...svg} strokeWidth={2.2}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);
const CartIcon = () => (
  <svg className="h-5 w-5" {...svg}>
    <path d="M3 4h2l2.4 11h10.2L20 7H6.2" />
    <circle cx="9" cy="19" r="1.4" />
    <circle cx="17" cy="19" r="1.4" />
  </svg>
);
const CheckIcon = () => (
  <svg className="h-5 w-5" {...svg} strokeWidth={2.4}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);
const TruckIcon = () => (
  <svg className="h-5 w-5" {...svg}>
    <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7z" />
    <circle cx="7.5" cy="17.5" r="1.8" />
    <circle cx="17.5" cy="17.5" r="1.8" />
  </svg>
);
const ReturnIcon = () => (
  <svg className="h-5 w-5" {...svg}>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h10a6 6 0 010 12h-3" />
  </svg>
);

/* ------------------------------ small pieces ---------------------------- */

function StarSvg({ size, className }: { size: number; className: string }) {
  return (
    <svg className={`max-w-none ${className}`} style={{ width: size, height: size }} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/** Stars with partial fill (4.3 shows 4 full stars and 30% of the fifth) */
function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${value.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = Math.max(0, Math.min(1, value - (n - 1)));
        return (
          <span key={n} className="relative inline-block" style={{ width: size, height: size }}>
            <StarSvg size={size} className="text-[#dcdae3]" />
            <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <StarSvg size={size} className="text-[#f59e0b]" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function Stepper({ value, max, onChange }: { value: number; max: number; onChange: (n: number) => void }) {
  const btn = `flex h-12 w-11 items-center justify-center text-[18px] leading-none ${MUTED} transition-colors hover:bg-[#f4f3ef] hover:text-[#1c1b22] disabled:cursor-not-allowed disabled:text-[#cfcdd6] disabled:hover:bg-transparent`;
  return (
    <div className="inline-flex items-center rounded-lg border border-[#d9d7d0]">
      <button type="button" aria-label="Decrease quantity" disabled={value <= 1} onClick={() => onChange(value - 1)} className={`${btn} rounded-l-lg`}>
        −
      </button>
      <span className="flex h-12 min-w-[44px] items-center justify-center border-x border-[#d9d7d0] text-[15px] font-medium tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" aria-label="Increase quantity" disabled={value >= max} onClick={() => onChange(value + 1)} className={`${btn} rounded-r-lg`}>
        +
      </button>
    </div>
  );
}

/* -------------------------------- page ---------------------------------- */

export default function ProductPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ img?: string }> }) {
  const { id } = use(params);
  const { img } = use(searchParams);
  const product = products.find((p) => p.id === id);

  const router = useRouter();
  const { addToCart } = useCart();

  // Get initial image index from URL or default to 0
  const initialImageIndex = img ? parseInt(img, 10) : 0;
  const [selected, setSelected] = useState(initialImageIndex);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState<string | undefined>(product?.colors?.[0]);
  const [size, setSize] = useState<string | undefined>(product?.sizes?.[0]);
  const [wished, setWished] = useState(false); // TODO: connect to a wishlist context
  const [added, setAdded] = useState(false);
  const [shareNote, setShareNote] = useState('');

  const [tab, setTab] = useState<'description' | 'reviews'>('description');
  const [reviews, setReviews] = useState<Review[]>(SAMPLE_REVIEWS);
  const [sort, setSort] = useState<'recent' | 'high' | 'low'>('recent');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', rating: 5, title: '', text: '' });

  if (!product) notFound();

  /* ---- product facts (only what the data really has) ---- */
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const colors = product.colors ?? [];
  const sizes = product.sizes ?? [];
  const stock = product.stock;
  const outOfStock = stock === 0;
  const lowStock = stock !== undefined && stock > 0 && stock <= 10;
  const maxQty = stock && stock > 0 ? stock : 99;

  const oldPrice = (product as Product & { oldPrice?: number }).oldPrice;
  const onSale = oldPrice !== undefined && oldPrice > product.price;
  const savePct = onSale ? Math.round(((oldPrice! - product.price) / oldPrice!) * 100) : 0;

  /* ---- reviews maths (from the list above) ---- */
  const count = reviews.length;
  const average = count ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0;
  const dist = [5, 4, 3, 2, 1].map((n) => {
    const c = reviews.filter((r) => r.rating === n).length;
    return { n, c, pct: count ? Math.round((c / count) * 100) : 0 };
  });
  const fourPlus = count ? Math.round((reviews.filter((r) => r.rating >= 4).length / count) * 100) : 0;
  const sortedReviews = [...reviews].sort((a, b) => (sort === 'recent' ? b.id - a.id : sort === 'high' ? b.rating - a.rating : a.rating - b.rating));

  /* ---- similar products ---- */
  const others = products.filter((p) => p.id !== product.id);
  const similar = [...others.filter((p) => p.category === product.category), ...others.filter((p) => p.category !== product.category)].slice(0, 4);

  /* ---- actions ---- */
  const addItems = () => {
    const item: Product = { ...product, colors: color ? [color] : product.colors, sizes: size ? [size] : product.sizes };
    for (let i = 0; i < quantity; i++) addToCart(item);
  };

  const onAdd = () => {
    addItems();
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  const onBuyNow = () => {
    addItems();
    router.push('/checkout');
  };

  const onShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShareNote('Link copied');
        window.setTimeout(() => setShareNote(''), 2000);
      }
    } catch {
      /* user cancelled sharing */
    }
  };

  const submitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!form.text.trim()) return;
    // TODO: save the review to your backend. For now it only lives on this page.
    setReviews((prev) => [
      { id: Date.now(), name: form.name.trim() || 'Guest', rating: form.rating, title: form.title.trim(), text: form.text.trim(), date: 'Just now' },
      ...prev,
    ]);
    setForm({ name: '', rating: 5, title: '', text: '' });
    setShowForm(false);
    setTab('reviews');
  };

  return (
    <main className={`${roboto.className} min-h-screen bg-[#f7f6f3] pb-20 pt-6`}>
      <div className="mx-auto w-full max-w-[1320px] px-4">
        {/* ---------- breadcrumb ---------- */}
        <nav aria-label="Breadcrumb" className={`mb-5 flex flex-wrap items-center gap-2 text-[13px] ${MUTED}`}>
          <Link href="/" className="hover:text-[#1c1b22]">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/categories" className="hover:text-[#1c1b22]">Shop</Link>
          <span aria-hidden="true">/</span>
          <span className={`line-clamp-1 ${INK}`}>{product.name}</span>
        </nav>

        {/* ======================= MAIN PRODUCT BLOCK ======================= */}
        <section className={`grid gap-8 rounded-xl border ${LINE} bg-white p-4 sm:p-6 lg:grid-cols-2 lg:gap-12 lg:p-8`}>
          {/* ---------------- gallery ---------------- */}
          <div className="min-w-0">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f3f2ee]">
              <SoftImg src={images[selected]} alt={product.name} className="h-full w-full object-contain p-4" />

              <div className="absolute left-3 top-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={onShare}
                  aria-label="Share this product"
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 ${INK} shadow-sm transition-colors hover:bg-white`}
                >
                  <ShareIcon />
                </button>
                <button
                  type="button"
                  onClick={() => setWished((v) => !v)}
                  aria-pressed={wished}
                  aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 shadow-sm transition-colors hover:bg-white ${wished ? 'text-[#e11d48]' : INK}`}
                >
                  <HeartIcon filled={wished} />
                </button>
                {shareNote && <span className="rounded-md bg-[#1c1b22] px-2.5 py-1 text-[12px] text-white">{shareNote}</span>}
              </div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setSelected((s) => (s - 1 + images.length) % images.length)}
                    aria-label="Previous image"
                    className={`absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 ${INK} shadow-sm hover:bg-white`}
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelected((s) => (s + 1) % images.length)}
                    aria-label="Next image"
                    className={`absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 ${INK} shadow-sm hover:bg-white`}
                  >
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {images.map((img, i) => (
                  <button
                    key={img + i}
                    type="button"
                    onClick={() => setSelected(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-current={i === selected}
                    className={`h-[76px] w-[76px] shrink-0 overflow-hidden rounded-lg border-2 bg-[#f3f2ee] transition-colors ${
                      i === selected ? 'border-[#1c1b22]' : 'border-transparent hover:border-[#c9c7bf]'
                    }`}
                  >
                    <SoftImg src={img} alt="" className="h-full w-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---------------- details ---------------- */}
          <div className="min-w-0">
            <h1 className={`text-[28px] font-medium leading-[1.2] tracking-[-0.01em] sm:text-[32px] ${INK}`}>{product.name}</h1>
            {(product.brand || product.category) && (
              <p className={`mt-1.5 text-[14px] ${MUTED}`}>{[product.brand, product.category].filter(Boolean).join(' · ')}</p>
            )}

            {/* price */}
            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className={`text-[30px] font-medium tabular-nums ${INK}`}>{formatMoney(product.price)}</span>
              {onSale && <span className={`text-[17px] line-through tabular-nums ${FAINT}`}>{formatMoney(oldPrice!)}</span>}
              {onSale && <span className={`text-[14px] font-medium ${GREEN}`}>Save {savePct}%</span>}
            </div>

            {/* rating line */}
            <div className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t ${LINE} pt-4 text-[14px]`}>
              {count > 0 ? (
                <>
                  <span className="inline-flex items-center gap-2">
                    <Stars value={average} />
                    <b className={`font-medium ${INK}`}>{average.toFixed(1)}</b>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setTab('reviews');
                      document.getElementById('product-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`underline underline-offset-4 ${MUTED} hover:text-[#1c1b22]`}
                  >
                    {count} {count === 1 ? 'review' : 'reviews'}
                  </button>
                </>
              ) : (
                <span className={MUTED}>No reviews yet</span>
              )}
              <span className={outOfStock ? 'text-[#c62828]' : lowStock ? 'text-[#b45309]' : GREEN}>
                {outOfStock ? 'Out of stock' : lowStock ? `Only ${stock} left` : 'In stock'}
              </span>
            </div>

            {count > 0 && (
              <p className={`mt-2 text-[13px] ${MUTED}`}>
                <b className={`font-medium ${GREEN}`}>{fourPlus}%</b> of reviewers rated this 4 stars or higher.
              </p>
            )}

            {/* colour */}
            {colors.length > 0 && (
              <div className="mt-6">
                <p className={`text-[14px] ${INK}`}>
                  Colour: <span className={MUTED}>{color}</span>
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2" role="radiogroup" aria-label="Colour">
                  {colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      role="radio"
                      aria-checked={color === c}
                      onClick={() => setColor(c)}
                      className={`flex h-10 items-center gap-2 rounded-md border px-3 text-[14px] transition-colors ${
                        color === c ? 'border-[#1c1b22] ring-1 ring-[#1c1b22]' : 'border-[#d9d7d0] hover:border-[#9a98a3]'
                      }`}
                    >
                      <span className="h-4 w-4 rounded-full border border-black/15" style={{ backgroundColor: c.toLowerCase() }} aria-hidden="true" />
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* size */}
            {sizes.length > 0 && (
              <div className="mt-6">
                <p className={`text-[14px] ${INK}`}>
                  Size: <span className={MUTED}>{size}</span>
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={size === s}
                      onClick={() => setSize(s)}
                      className={`h-10 min-w-[48px] rounded-md border px-3 text-[14px] transition-colors ${
                        size === s ? 'border-[#1c1b22] bg-[#1c1b22] text-white' : 'border-[#d9d7d0] hover:border-[#9a98a3]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* quantity + buttons */}
            <div className="mt-7 flex gap-3">
              <Stepper value={quantity} max={maxQty} onChange={setQuantity} />
              <button
                type="button"
                onClick={onAdd}
                disabled={outOfStock}
                className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-lg text-[15px] font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  added ? 'bg-[#1a7f4b]' : ACCENT
                }`}
              >
                {added ? (
                  <>
                    <CheckIcon /> Added to cart
                  </>
                ) : (
                  <>
                    <CartIcon /> Add to cart
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={onBuyNow}
              disabled={outOfStock}
              className="mt-3 flex h-12 w-full items-center justify-center rounded-lg bg-[#1c1b22] text-[15px] font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              Buy now
            </button>

            {added && (
              <p className={`mt-3 text-[13px] ${MUTED}`}>
                Item added.{' '}
                <Link href="/cart" className={`underline underline-offset-2 ${INK}`}>
                  View cart
                </Link>
              </p>
            )}

            {/* delivery + returns */}
            <ul className={`mt-6 divide-y divide-[#eeece6] rounded-lg border ${LINE} text-[14px]`}>
              <li className="flex items-start gap-3 p-4">
                <span className={MUTED}>
                  <TruckIcon />
                </span>
                <span>
                  <span className={`block font-medium ${INK}`}>Delivery</span>
                  <span className={`block ${MUTED}`}>
                    Choose your delivery partner at checkout. Free on orders over {formatMoney(FREE_DELIVERY_THRESHOLD)}.
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3 p-4">
                <span className={MUTED}>
                  <ReturnIcon />
                </span>
                <span>
                  <span className={`block font-medium ${INK}`}>Returns</span>
                  <span className={`block ${MUTED}`}>
                    Read our return policy before you order.{' '}
                    <Link href="/help" className={`underline underline-offset-2 ${INK}`}>
                      Details
                    </Link>
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ============================ TABS ============================ */}
        <section id="product-tabs" className={`mt-8 scroll-mt-[190px] rounded-xl border ${LINE} bg-white`}>
          <div role="tablist" aria-label="Product information" className={`flex gap-8 border-b ${LINE} px-5 sm:px-8`}>
            {(
              [
                ['description', 'Description'],
                ['reviews', `Reviews (${count})`],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`-mb-px border-b-2 py-4 text-[15px] transition-colors ${
                  tab === key ? `border-[#1c1b22] font-medium ${INK}` : `border-transparent ${MUTED} hover:text-[#1c1b22]`
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* description */}
          {tab === 'description' && (
            <div role="tabpanel" className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div>
                {product.description ? (
                  <p className={`max-w-[760px] whitespace-pre-line text-[15px] leading-7 ${MUTED}`}>{product.description}</p>
                ) : (
                  <p className={`text-[15px] ${FAINT}`}>No description has been added for this product yet.</p>
                )}
              </div>

              <dl className={`h-fit divide-y divide-[#eeece6] rounded-lg border ${LINE} text-[14px]`}>
                {[
                  product.brand && ['Brand', product.brand],
                  product.category && ['Category', product.category],
                  ['Availability', outOfStock ? 'Out of stock' : lowStock ? `Only ${stock} left` : 'In stock'],
                  ['Product code', `LM-${product.id}`],
                ]
                  .filter((row): row is string[] => Array.isArray(row))
                  .map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 px-4 py-3">
                      <dt className={MUTED}>{k}</dt>
                      <dd className={`text-right ${INK}`}>{v}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          )}

          {/* reviews */}
          {tab === 'reviews' && (
            <div role="tabpanel" className="p-5 sm:p-8">
              <div className="grid gap-6 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
                <div className={`rounded-lg border ${LINE} bg-[#faf9f7] px-6 py-6 text-center`}>
                  <p className={`text-[44px] font-medium leading-none ${INK}`}>{count ? average.toFixed(1) : '–'}</p>
                  <div className="mt-3 flex justify-center">
                    <Stars value={average} size={16} />
                  </div>
                  <p className={`mt-2 text-[13px] ${MUTED}`}>
                    {count} {count === 1 ? 'rating' : 'ratings'}
                  </p>
                </div>

                <ul className="space-y-2.5">
                  {dist.map((d) => (
                    <li key={d.n} className="flex items-center gap-3 text-[13px]">
                      <span className={`w-12 shrink-0 ${MUTED}`}>{d.n} star{d.n > 1 ? 's' : ''}</span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#ece9e2]">
                        <span className="block h-full rounded-full bg-[#f59e0b]" style={{ width: `${d.pct}%` }} />
                      </span>
                      <span className={`w-10 shrink-0 text-right tabular-nums ${MUTED}`}>{d.pct}%</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowForm((v) => !v)}
                  className="h-11 w-full max-w-[320px] rounded-lg border border-[#1c1b22] text-[14px] font-medium text-[#1c1b22] transition-colors hover:bg-[#1c1b22] hover:text-white"
                >
                  {showForm ? 'Cancel' : 'Write a review'}
                </button>
              </div>

              {showForm && (
                <form onSubmit={submitReview} className={`mx-auto mt-5 max-w-[620px] space-y-4 rounded-lg border ${LINE} p-5`}>
                  <div>
                    <p className={`text-[13px] font-medium ${INK}`}>Your rating</p>
                    <div className="mt-1.5 flex gap-1" role="radiogroup" aria-label="Your rating">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          role="radio"
                          aria-checked={form.rating === n}
                          aria-label={`${n} star${n > 1 ? 's' : ''}`}
                          onClick={() => setForm((f) => ({ ...f, rating: n }))}
                        >
                          <StarSvg size={26} className={n <= form.rating ? 'text-[#f59e0b]' : 'text-[#dcdae3]'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      aria-label="Your name"
                      className="h-11 rounded-md border border-[#d9d7d0] px-3 text-[14px] outline-none placeholder:text-[#a3a1ab] focus:border-[#4B4FED] focus:ring-2 focus:ring-[#4B4FED]/20"
                    />
                    <input
                      value={form.title}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      placeholder="Review title"
                      aria-label="Review title"
                      className="h-11 rounded-md border border-[#d9d7d0] px-3 text-[14px] outline-none placeholder:text-[#a3a1ab] focus:border-[#4B4FED] focus:ring-2 focus:ring-[#4B4FED]/20"
                    />
                  </div>
                  <textarea
                    value={form.text}
                    onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                    rows={4}
                    required
                    placeholder="What did you think of this product?"
                    aria-label="Your review"
                    className="w-full resize-none rounded-md border border-[#d9d7d0] px-3 py-2.5 text-[14px] outline-none placeholder:text-[#a3a1ab] focus:border-[#4B4FED] focus:ring-2 focus:ring-[#4B4FED]/20"
                  />
                  <button type="submit" className={`h-11 rounded-lg px-6 text-[14px] font-medium text-white transition-colors ${ACCENT}`}>
                    Submit review
                  </button>
                </form>
              )}

              <div className="mt-10 flex items-center justify-between gap-4">
                <h2 className={`text-[20px] font-medium ${INK}`}>What customers are saying</h2>
                <label className={`flex items-center gap-2 text-[13px] ${MUTED}`}>
                  Sort by
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as typeof sort)}
                    className="h-10 rounded-md border border-[#d9d7d0] bg-white px-3 text-[14px] text-[#1c1b22] outline-none focus:border-[#4B4FED]"
                  >
                    <option value="recent">Most recent</option>
                    <option value="high">Highest rated</option>
                    <option value="low">Lowest rated</option>
                  </select>
                </label>
              </div>

              {count === 0 ? (
                <p className={`mt-6 text-[14px] ${MUTED}`}>No reviews yet. Be the first to write one.</p>
              ) : (
                <ul className="mt-2 divide-y divide-[#eeece6]">
                  {sortedReviews.map((r) => (
                    <li key={r.id} className="flex gap-4 py-6">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ece9e2] text-[14px] font-medium text-[#4a4954]" aria-hidden="true">
                        {r.name.slice(0, 1).toUpperCase()}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className={`text-[15px] font-medium ${INK}`}>{r.name}</span>
                          <span className={`text-[12px] ${FAINT}`}>{r.date}</span>
                        </div>
                        <div className="mt-1">
                          <Stars value={r.rating} size={13} />
                        </div>
                        {r.title && <p className={`mt-2 text-[14px] font-medium ${INK}`}>{r.title}</p>}
                        <p className={`mt-1 max-w-[680px] text-[14px] leading-6 ${MUTED}`}>{r.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>

        {/* ======================== SIMILAR PRODUCTS ======================== */}
        {similar.length > 0 && (
          <section className="mt-14" aria-labelledby="similar-title">
            <h2 id="similar-title" className={`mb-5 text-[22px] font-medium ${INK}`}>
              You might also like
            </h2>
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {similar.map((p) => (
                <li key={p.id}>
                  <Link href={`/products/${p.id}`} className="group block">
                    <span className="block aspect-square overflow-hidden rounded-xl bg-[#ecebe6]">
                      <SoftImg src={p.image} alt="" className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]" />
                    </span>
                    <span className={`mt-3 block text-[15px] font-medium tabular-nums ${INK}`}>{formatMoney(p.price)}</span>
                    <span className={`mt-0.5 line-clamp-1 block text-[14px] ${INK} group-hover:underline`}>{p.name}</span>
                    {p.category && <span className={`block text-[12px] ${FAINT}`}>{p.category}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}