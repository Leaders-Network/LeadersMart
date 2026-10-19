'use client';

import { useState } from 'react';
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

// Illustrative bar chart for the sales card
function SalesChart() {
  const bars = [40, 55, 45, 62, 50, 70, 88];
  const max = Math.max(...bars);
  return (
    <div className="flex items-end gap-1.5 h-16">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${(h / max) * 100}%`,
            background: i === bars.length - 1 ? '#DEFA87' : 'rgba(255,255,255,0.25)',
          }}
        />
      ))}
    </div>
  );
}

export default function SellerSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!email) e.email = 'Business email is required.';
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
        style={{ background: 'linear-gradient(160deg, #18285E 0%, #483084 100%)' }}
      >
        <div>
          <Brand variant="light" showSellerCenter />
          <div className="mt-12">
            <span className="text-[11px] font-700 tracking-widest uppercase block mb-4" style={{ color: '#DEFA87', fontWeight: 700 }}>For the next big small business</span>
            <h2 className="text-white leading-tight mb-5" style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700 }}>
              Big ambitions.<br />One smart place.
            </h2>
            <p className="text-white/70 text-[15px] leading-relaxed">
              Meet curious shoppers, build your brand, and grow on a marketplace that has your back.
            </p>
          </div>

          {/* Growth card */}
          <div className="mt-8 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-[13px]">Your business, in bloom</span>
              <span className="text-[13px] font-600" style={{ color: '#DEFA87', fontWeight: 600 }}>↗ +18.6%</span>
            </div>
            <div className="text-[34px] font-800 text-white mb-4" style={{ fontWeight: 800 }}>$24,580</div>
            <SalesChart />
            <p className="text-white/40 text-[11px] mt-3">A little snapshot of what&apos;s possible. Illustrative data.</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex gap-0.5 mb-3">
            {[1,2,3,4,5].map(i => (
              <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#DEFA87">
                <path d="M8 1l1.854 3.757L14 5.52l-3 2.924.708 4.13L8 10.5l-3.708 2.073L5 8.443 2 5.52l4.146-.763L8 1z"/>
              </svg>
            ))}
          </div>
          <p className="text-white/90 text-[14px] leading-relaxed mb-3">
            &quot;Less time managing the little things. More time growing the business I love.&quot;
          </p>
          <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.55)' }}>Jordan Lee · Founder, Nova Tech</p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t mt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>© 2026 Leaders Mart</span>
          <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Built on trust. Made for you.</span>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b" style={{ borderColor: '#E6E8F1' }}>
          <Link href="/" className="flex items-center gap-1.5 text-[13px] text-[#6F7489] hover:text-[#171C36]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to marketplace
          </Link>
          <Link href="/sign-in" className="text-[13px] font-600 flex items-center gap-1 hover:opacity-80" style={{ color: '#4353EC', fontWeight: 600 }}>
            Here to shop? Shopper sign in
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        <div className="md:hidden px-6 pt-6"><Brand variant="dark" showSellerCenter /></div>

        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-[420px]">
            <span className="text-[11px] font-700 tracking-widest uppercase block mb-3" style={{ color: '#4353EC', fontWeight: 700 }}>Leaders mart seller center</span>
            <h1 className="text-[36px] font-700 text-[#171C36] mb-2" style={{ fontWeight: 700 }}>Back to business.</h1>
            <p className="text-[14px] mb-8" style={{ color: '#6F7489' }}>
              Sign in to manage your store, connect with customers, and keep your business moving.
            </p>

            {submitted ? (
              <div className="p-5 rounded-xl text-center" style={{ background: '#E7F6EF', border: '1px solid #B7E4CE' }}>
                <svg className="mx-auto mb-3" width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="#167A59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="#167A59" strokeWidth="2"/>
                </svg>
                <p className="text-[15px] font-600 text-[#167A59] mb-2" style={{ fontWeight: 600 }}>Welcome back! (Demo)</p>
                <Link href="/seller/dashboard" className="text-[13px] font-600 hover:opacity-80" style={{ color: '#4353EC', fontWeight: 600 }}>Go to your dashboard →</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Email */}
                <div className="mb-4">
                  <label className="block text-[13px] font-600 text-[#171C36] mb-1.5" style={{ fontWeight: 600 }}>Business email address</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                      placeholder="you@yourbusiness.com"
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

                {/* Remember + forgot */}
                <div className="flex items-center justify-between mb-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={rememberDevice} onChange={e => setRememberDevice(e.target.checked)} className="w-4 h-4 rounded accent-[#4353EC]" />
                    <span className="text-[13px]" style={{ color: '#6F7489' }}>Remember this device</span>
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
                  Sign in to my store
                </button>

                {/* Security notice */}
                <div className="p-3.5 rounded-xl flex items-start gap-2.5 mb-5" style={{ background: '#F7F8FC', border: '1px solid #E6E8F1' }}>
                  <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#6F7489" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-[12px] leading-relaxed" style={{ color: '#6F7489' }}>
                    For your store&apos;s security, we may ask you to verify your sign-in with a code sent to your email.
                  </p>
                </div>

                <p className="text-center text-[13px] mb-5" style={{ color: '#6F7489' }}>
                  Ready to start selling?{' '}
                  <Link href="/seller/register" className="font-600 hover:opacity-80" style={{ color: '#4353EC', fontWeight: 600 }}>Create your seller account</Link>
                </p>

                <div className="flex items-center justify-center gap-1.5 mb-5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#167A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[12px]" style={{ color: '#167A59' }}>Your store data is safe and encrypted</span>
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
