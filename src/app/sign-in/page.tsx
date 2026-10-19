'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Brand from '@/components/Brand';

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#9DA3B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="#9DA3B4" strokeWidth="1.8"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="#9DA3B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="1" y1="1" x2="23" y2="23" stroke="#9DA3B4" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export default function ShopperSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!email) e.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email address.';
    if (!password) e.password = 'Password is required.';
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Left panel ── */}
      <div
        className="hidden md:flex flex-col justify-between p-11 md:w-[420px] lg:w-[500px] shrink-0"
        style={{ background: 'linear-gradient(160deg, #3658ED 0%, #8644E4 100%)' }}
      >
        <div>
          <Brand variant="light" />
          <div className="mt-12">
            <span className="text-[11px] font-700 tracking-widest uppercase block mb-4" style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Good finds. Great feeling.</span>
            <h2 className="text-white leading-tight mb-5" style={{ fontSize: 'clamp(30px, 3vw, 40px)', fontWeight: 700 }}>
              A little discovery.<br />A lot to love.
            </h2>
            <p className="text-white/70 text-[15px] leading-relaxed">
              Discover everyday upgrades from sellers you can trust. All in one happy little marketplace.
            </p>
          </div>

          {/* Product image */}
          <div className="relative mt-8 rounded-[22px] overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <Image
              src="/images/Audio photography.png"
              alt="Great products from verified sellers"
              fill
              className="object-cover"
            />
            {/* Badge overlay */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white px-3 py-2 rounded-xl" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="#167A59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="#167A59" strokeWidth="2"/>
              </svg>
              <span className="text-[12px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>Great products. Verified sellers.</span>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-8">
          <div className="flex gap-0.5 mb-3">
            {[1,2,3,4,5].map(i => (
              <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#DEFA87">
                <path d="M8 1l1.854 3.757L14 5.52l-3 2.924.708 4.13L8 10.5l-3.708 2.073L5 8.443 2 5.52l4.146-.763L8 1z"/>
              </svg>
            ))}
          </div>
          <p className="text-white/90 text-[14px] leading-relaxed mb-3">
            &quot;My desk setup has never looked better. The whole experience just felt easy.&quot;
          </p>
          <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.55)' }}>Maya R. · Verified shopper</p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t mt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>© 2026 Leaders Mart</span>
          <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Built on trust. Made for you.</span>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b" style={{ borderColor: '#E6E8F1' }}>
          <Link href="/" className="flex items-center gap-1.5 text-[13px] text-[#6F7489] hover:text-[#171C36]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to shopping
          </Link>
          <Link href="/seller/sign-in" className="text-[13px] font-600 flex items-center gap-1 hover:opacity-80" style={{ color: '#4353EC', fontWeight: 600 }}>
            Here to sell? Seller sign in
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Mobile brand */}
        <div className="md:hidden px-6 pt-6">
          <Brand variant="dark" />
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-[420px]">
            <span className="text-[11px] font-700 tracking-widest uppercase block mb-3" style={{ color: '#4353EC', fontWeight: 700 }}>Your leaders mart account</span>
            <h1 className="text-[36px] font-700 text-[#171C36] mb-2" style={{ fontWeight: 700 }}>Hello again.</h1>
            <p className="text-[14px] mb-8" style={{ color: '#6F7489' }}>
              Sign in for saved favorites, faster checkout, and your next great find.
            </p>

            {submitted ? (
              <div className="p-5 rounded-xl text-center" style={{ background: '#E7F6EF', border: '1px solid #B7E4CE' }}>
                <svg className="mx-auto mb-3" width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="#167A59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="#167A59" strokeWidth="2"/>
                </svg>
                <p className="text-[15px] font-600 text-[#167A59]" style={{ fontWeight: 600 }}>Welcome back! (Demo — no real auth)</p>
                <Link href="/" className="mt-3 inline-block text-[13px]" style={{ color: '#4353EC' }}>Back to marketplace →</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Google button */}
                <button
                  type="button"
                  className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border text-[14px] font-500 hover:bg-gray-50 mb-5"
                  style={{ border: '1.5px solid #E6E8F1', color: '#171C36', fontWeight: 500 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px" style={{ background: '#E6E8F1' }} />
                  <span className="text-[12px]" style={{ color: '#9DA3B4' }}>or continue with email</span>
                  <div className="flex-1 h-px" style={{ background: '#E6E8F1' }} />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-[13px] font-600 text-[#171C36] mb-1.5" style={{ fontWeight: 600 }}>Email address</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                      placeholder="you@example.com"
                      className="w-full h-12 px-4 pr-10 rounded-xl border outline-none text-[14px]"
                      style={{ border: `1.5px solid ${errors.email ? '#C0392B' : '#E6E8F1'}`, color: '#171C36', background: 'white' }}
                    />
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#9DA3B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,6 12,13 2,6" stroke="#9DA3B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {errors.email && <p className="text-[11px] mt-1" style={{ color: '#C0392B' }}>{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="block text-[13px] font-600 text-[#171C36] mb-1.5" style={{ fontWeight: 600 }}>Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
                      placeholder="Enter your password"
                      className="w-full h-12 px-4 pr-10 rounded-xl border outline-none text-[14px]"
                      style={{ border: `1.5px solid ${errors.password ? '#C0392B' : '#E6E8F1'}`, color: '#171C36', background: 'white' }}
                    />
                    <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2">
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                  {errors.password && <p className="text-[11px] mt-1" style={{ color: '#C0392B' }}>{errors.password}</p>}
                </div>

                {/* Keep signed in + forgot */}
                <div className="flex items-center justify-between mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={keepSignedIn}
                      onChange={e => setKeepSignedIn(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#4353EC]"
                    />
                    <span className="text-[13px]" style={{ color: '#6F7489' }}>Keep me signed in</span>
                  </label>
                  <button type="button" className="text-[13px] font-600 hover:opacity-80" style={{ color: '#4353EC', fontWeight: 600 }}>Forgot password?</button>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl text-white text-[15px] font-600 flex items-center justify-center gap-2 hover:opacity-90 mb-5"
                  style={{ background: '#4353EC', fontWeight: 600 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Sign in
                </button>

                <p className="text-center text-[13px] mb-6" style={{ color: '#6F7489' }}>
                  New around here?{' '}
                  <Link href="/register" className="font-600 hover:opacity-80" style={{ color: '#4353EC', fontWeight: 600 }}>Create an account</Link>
                </p>

                {/* Security notice */}
                <div className="flex items-center justify-center gap-1.5 mb-5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#167A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[12px]" style={{ color: '#167A59' }}>Your personal details stay safe with us</span>
                </div>

                <div className="flex items-center justify-center gap-3">
                  {['Privacy policy', 'Terms of service', 'Help center'].map((item, i) => (
                    <span key={item} className="flex items-center gap-3">
                      {i > 0 && <span style={{ color: '#E6E8F1' }}>·</span>}
                      <Link href="#" className="text-[12px] hover:text-[#4353EC]" style={{ color: '#9DA3B4' }}>{item}</Link>
                    </span>
                  ))}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
