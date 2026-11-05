'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signingIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [socialNotice, setSocialNotice] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to sign in. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#faf8ff] px-4 py-6 sm:px-6 lg:px-8">
      <main className="flex flex-1 items-center justify-center py-4">
        <section className="grid w-full max-w-6xl overflow-hidden rounded-[30px] border border-violet-100 bg-white shadow-[0_28px_90px_rgba(54,27,105,0.12)] md:min-h-[650px] md:grid-cols-[0.95fr_1.05fr]">
          <aside className="relative hidden overflow-hidden bg-linear-to-br from-[#24104f] via-[#5426a6] to-[#8747dc] p-12 text-white md:flex md:flex-col md:justify-between lg:p-14">
            <div className="absolute -right-28 -top-24 h-80 w-80 rounded-full border border-white/10" />
            <div className="absolute -right-12 -top-8 h-48 w-48 rounded-full border border-white/10" />
            <div className="absolute -bottom-36 -left-20 h-96 w-96 rounded-full bg-fuchsia-400/15 blur-2xl" />
            <div className="relative z-10">
              <Link href="/" aria-label="LeadersMart home" className="inline-flex rounded-xl bg-white px-3 py-2">
                <Image src="/images/leaders_mart_logo.png" alt="LeadersMart" width={150} height={60} className="h-10 w-auto" priority />
              </Link>
              <p className="mt-16 text-xs font-semibold uppercase tracking-[0.24em] text-violet-200">Your store, in one place</p>
              <h1 className="mt-4 max-w-md text-4xl font-semibold leading-tight tracking-tight lg:text-5xl">Good to have you back.</h1>
              <p className="mt-5 max-w-sm text-sm leading-7 text-violet-100/85">Sign in to pick up where you left off and keep your shopping experience moving.</p>
            </div>
            <div className="relative z-10 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-200">Account access</p>
              <p className="mt-2 text-sm leading-6 text-white/90">Your LeadersMart account keeps your shopping experience connected and easy to pick up again.</p>
            </div>
          </aside>

          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
            <div className="w-full max-w-md">
              <Link href="/" aria-label="LeadersMart home" className="mb-10 inline-flex rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-100 md:hidden">
                <Image src="/images/leaders_mart_logo.png" alt="LeadersMart" width={130} height={52} className="h-9 w-auto" priority />
              </Link>
              <Link href="/" className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700">
                <span aria-hidden="true">←</span> Back to store
              </Link>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Welcome back</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Sign in to your account</h2>
              <p className="mt-2 text-sm text-slate-500">Enter your details below to continue.</p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {error && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}
                <div>
                  <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    placeholder="you@example.com"
                    required
                    disabled={signingIn}
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="login-password" className="block text-sm font-medium text-slate-700">Password</label>
                  </div>
                  <input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    placeholder="Enter your password"
                    required
                    disabled={signingIn}
                  />
                </div>
                <button
                  type="submit"
                  disabled={signingIn}
                  className="flex w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {signingIn ? 'Signing you in…' : 'Sign in'}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3" aria-hidden="true">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400">or continue with</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setSocialNotice('Google sign-in is not connected yet. Please use your email and password for now.')} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                  <svg className="h-[18px] w-[18px]" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"/><path fill="#FF3D00" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"/><path fill="#4CAF50" d="M12.6 27.7a12 12 0 0 1 0-7.4V15H5.8a20 20 0 0 0 0 18Z"/><path fill="#1976D2" d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6.1 29.5 4 24 4A20 20 0 0 0 5.8 15l6.8 5.3c1.6-4.8 6.1-8.2 11.4-8.2Z"/></svg>
                  Google
                </button>
                <button type="button" onClick={() => setSocialNotice('Apple sign-in is not connected yet. Please use your email and password for now.')} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                  <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.37 12.19c.02 2.2 1.93 2.93 1.95 2.94-.02.05-.3 1.04-.99 2.06-.6.89-1.23 1.77-2.22 1.79-.97.02-1.28-.58-2.39-.58-1.1 0-1.45.56-2.36.6-.95.03-1.67-.96-2.28-1.84-1.25-1.81-2.2-5.11-.92-7.34a3.53 3.53 0 0 1 2.98-1.81c.93-.02 1.8.63 2.38.63.57 0 1.64-.78 2.77-.67.47.02 1.8.19 2.65 1.43-.07.04-1.58.92-1.57 2.79ZM14.55 5.94c.5-.6.84-1.43.75-2.26-.72.03-1.59.48-2.11 1.08-.46.53-.87 1.37-.76 2.18.8.06 1.62-.4 2.12-1Z"/></svg>
                  Apple
                </button>
              </div>
              {socialNotice && <p role="status" className="mt-3 rounded-lg bg-violet-50 px-3 py-2 text-xs leading-5 text-violet-700">{socialNotice}</p>}

              <p className="mt-7 text-center text-sm text-slate-500">
                New to LeadersMart?{' '}
                <Link href="/signup" className="font-semibold text-violet-700 hover:text-violet-900">Create an account</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-3 text-center text-xs text-slate-400">© {new Date().getFullYear()} LeadersMart. All rights reserved.</footer>
    </div>
  );
}
