'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import NextAuthGuard from '@/components/NextAuthGuard';

function ChangePasswordContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change password');
      }

      alert('Password changed successfully');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-blue-100">
        <h1 className="text-2xl font-semibold mb-2 text-blue-900">Change Password</h1>
        <p className="text-sm text-gray-600 mb-4">
          Update your account password. For security, provide your current password.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm text-gray-700">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
              disabled={isLoading}
            />
            <p className="text-sm text-gray-500 mt-1">Must be at least 6 characters</p>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-700">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
              disabled={isLoading}
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ChangePasswordPage() {
  return (
    <NextAuthGuard>
      <ChangePasswordContent />
    </NextAuthGuard>
  );
}
