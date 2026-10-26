'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';

/* ------------------------------------------------------------------ */
/*  Edit this list to change the slides.                               */
/*  Put the images in /public/images/hero/ (about 1328 x 443px, 3:1). */
/*  If the artwork already contains the text (like the template),      */
/*  leave title / subtitle / cta out.                                  */
/* ------------------------------------------------------------------ */
type Slide = {
  id: number;
  image: string;
  alt: string;
  href: string;
  title?: string;
  subtitle?: string;
  cta?: string;
};

const SLIDES: Slide[] = [
  {
    id: 1,
    image: '/images/hero/stock_item_hero_display1.jpg',
    alt: 'Special offer sale, up to 70% off',
    href: '/deals',
  },
  {
    id: 2,
    image: '/images/hero/stock_item_hero_display2.png',
    alt: 'New arrivals for your home',
    href: '/new-arrivals',
  },
  {
    id: 3,
    image: '/images/hero/slide_item_hero_display2.jpg',
    alt: 'Shop all categories',
    href: '/categories',
  },
];

const AUTOPLAY_MS = 5000;
const SWIPE_PX = 50;
const GRADIENT = 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600';

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg
      className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={dir === 'left' ? 'M15 4l-8 8 8 8' : 'M9 4l8 8-8 8'} />
    </svg>
  );
}

export default function HeroCarousel() {
  const count = SLIDES.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const startX = useRef<number | null>(null);
  const dragged = useRef(false);

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  /* respect "reduce motion" */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /* autoplay: stops on hover / focus / reduced motion */
  useEffect(() => {
    if (paused || reducedMotion || count < 2) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, reducedMotion, count, next]);

  /* swipe / drag */
  const onPointerDown = (e: PointerEvent) => {
    startX.current = e.clientX;
    dragged.current = false;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > SWIPE_PX) {
      dragged.current = true; // stop the click that follows a swipe from opening the link
      if (dx < 0) next();
      else prev();
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured offers"
      className="mx-auto mt-4 w-full max-w-[1920px] px-[15px] lg:mt-[30px]"
    >
      <div
        className="group relative overflow-hidden rounded-[4px] bg-gradient-to-br from-slate-200 to-slate-300"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (startX.current = null)}
      >
        {/* Slides track */}
        <div
          className={`flex aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/1] max-h-[520px] w-full ${
            reducedMotion ? '' : 'transition-transform duration-700 ease-in-out'
          }`}
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live={paused ? 'polite' : 'off'}
        >
          {SLIDES.map((s, i) => {
            const active = i === index;
            return (
              <Link
                key={s.id}
                href={s.href}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${s.alt}`}
                aria-hidden={!active}
                tabIndex={active ? 0 : -1}
                onClick={(e) => {
                  if (dragged.current) {
                    e.preventDefault();
                    dragged.current = false;
                  }
                }}
                className="relative block h-full w-full shrink-0 basis-full"
              >
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  draggable={false}
                  className="select-none object-cover"
                />

                {/* optional text overlay for plain photos */}
                {(s.title || s.subtitle || s.cta) && (
                  <div className="absolute inset-0 flex flex-col justify-center gap-3 bg-gradient-to-r from-black/40 to-transparent px-[8%] text-white">
                    {s.subtitle && <p className="text-sm uppercase tracking-wide sm:text-base">{s.subtitle}</p>}
                    {s.title && <h2 className="max-w-[16ch] text-3xl font-bold leading-tight sm:text-5xl">{s.title}</h2>}
                    {s.cta && (
                      <span className={`mt-1 w-fit rounded-full ${GRADIENT} px-6 py-2 text-sm font-medium`}>
                        {s.cta}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {count > 1 && (
          <>
            {/* Prev / next: 70px round buttons on desktop */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:left-5 lg:h-[70px] lg:w-[70px]"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-5 lg:h-[70px] lg:w-[70px]"
            >
              <Chevron dir="right" />
            </button>

            {/* Numbered dots: 22px circles, active one uses the brand gradient */}
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2 lg:bottom-[14px]" role="tablist" aria-label="Choose slide">
              {SLIDES.map((s, i) => {
                const active = i === index;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`flex h-[22px] w-[22px] items-center justify-center rounded-full text-[11px] font-medium leading-none text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                      active ? GRADIENT : 'bg-[#555] hover:bg-[#333]'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}