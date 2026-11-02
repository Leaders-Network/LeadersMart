'use client';

import { useEffect, useState } from 'react';

/** Grey square button, bottom-right. Appears after scrolling down. Put it once in your root layout. */
export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-4 z-40 flex h-[39px] w-[39px] items-center justify-center rounded-[3px] bg-[#777] text-white transition-all hover:bg-[#555] ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 12l6-6 6 6M6 19l6-6 6 6" />
      </svg>
    </button>
  );
}