'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ChangePasswordPage() {
  const { user, changePassword, signOut } = useAuth();
  const router = useRouter();
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    // If not signed in, redirect to signin
    if (typeof window !== 'undefined') router.push('/admin/signin');
    return null;
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // If stored password exists, require current
    if (user.password && user.password !== '' && current !== user.password) {
      setError('Current password is incorrect');
      return;
    }
    if (newPass.length < 4) {
      setError('New password must be at least 4 characters');
      return;
    }
    if (newPass !== confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await changePassword(newPass);
      alert('Password changed');
      router.push('/admin');
    } catch (err: any) {
      setError(err?.message || 'Failed to change password');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded shadow p-6 border border-blue-100">
        <h1 className="text-2xl font-semibold mb-2 text-blue-900">Change Password</h1>
        <p className="text-sm text-gray-600 mb-4">Update your account password. For security, provide your current password if one is set.</p>

        <form onSubmit={submit} className="space-y-4">
          {user.password && (
            <div>
              <label className="block mb-2 text-sm text-gray-700">Current Password</label>
              <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-200" required />
            </div>
          )}

          <div>
            <label className="block mb-2 text-sm text-gray-700">New Password</label>
            <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-200" required />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-700">Confirm New Password</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-200" required />
          </div>

          {error && <div className="text-red-600">{error}</div>}

          <div className="flex justify-between items-center">
            <button type="button" onClick={() => { signOut(); router.push('/'); }} className="px-4 py-2 bg-red-200 text-red-700 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Change Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}
