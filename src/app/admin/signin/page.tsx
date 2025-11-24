'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signIn(email.trim(), password);
      router.push('/admin');
    } catch (err: any) {
      setError(err?.message || 'Sign in failed');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-blue-100">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-blue-900">Admin Sign In</h1>
          <p className="text-sm text-gray-600">Sign in with your admin account to access the dashboard.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@company.com"
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {error && <div className="text-red-600">{error}</div>}

          <div className="flex items-center justify-between">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Sign In</button>
            <a className="text-sm text-blue-700 hover:underline" href="/admin/signup">Create admin account</a>
          </div>
        </form>
      </div>
    </div>
  );
}
