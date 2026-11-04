'use client';

import { useState, type FormEvent } from 'react';

const BRAND_BG = 'bg-gradient-to-r from-[#4B4FED] via-[#8B52D7] to-[#C7449A]';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: send `email` to your newsletter API / provider here
    setDone(true);
    setEmail('');
  };

  return (
    <form onSubmit={onSubmit} className="w-full md:w-[496px]" aria-label="Newsletter sign up">
      <div className="flex h-[34px]">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setDone(false);
          }}
          placeholder="Your email address..."
          aria-label="Your email address"
          className="min-w-0 flex-1 bg-white px-[15px] text-[13px] text-[#222] placeholder-[#999] outline-none"
        />
        <button
          type="submit"
          className={`w-[85px] shrink-0 text-[11px] font-bold uppercase text-white transition-opacity hover:opacity-90 ${BRAND_BG}`}
        >
          Subscribe
        </button>
      </div>
      {done && (
        <p role="status" className="mt-2 text-[12px] text-[#c9c9d6]">
          Thanks for subscribing!
        </p>
      )}
    </form>
  );
}