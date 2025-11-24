'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { users as initialUsers } from '@/data/users';
import { vendors as initialVendors } from '@/data/vendors';
import { User, Vendor } from '@/types';
import { useAuth } from '@/context/AuthContext';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [userQuery, setUserQuery] = useState('');
  const [vendorQuery, setVendorQuery] = useState('');
  const [vendorFilterActive, setVendorFilterActive] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    // Redirect to signin if not authenticated or not admin
    if (!user) router.push('/admin/signin');
  }, [user, router]);

  const removeUser = (id: string) => {
    if (!confirm('Remove this user? This action cannot be undone.')) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const toggleVendorActive = (id: string) => {
    const v = vendors.find((x) => x.id === id);
    if (!v) return;
    const confirmMsg = v.active ? 'Deactivate vendor?' : 'Activate vendor?';
    if (!confirm(confirmMsg)) return;
    setVendors((prev) => prev.map((v) => (v.id === id ? { ...v, active: !v.active } : v)));
  };

  // If user is not loaded yet, show nothing (redirect will happen)
  if (!user) return null;

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(userQuery.toLowerCase()) || u.email.toLowerCase().includes(userQuery.toLowerCase()) || u.id.includes(userQuery)
  );

  const filteredVendors = vendors.filter((v) => {
    const matchesQuery = v.name.toLowerCase().includes(vendorQuery.toLowerCase()) || v.id.includes(vendorQuery);
    if (vendorFilterActive === 'all') return matchesQuery;
    if (vendorFilterActive === 'active') return matchesQuery && v.active;
    return matchesQuery && !v.active;
  });

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-blue-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Manage users, vendors and site settings</p>
          </div>
          <div className="text-sm text-black">Signed in as <span className="font-medium">{user.name}</span> ({user.email})</div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white rounded shadow border border-blue-100">
            <div className="text-sm text-gray-500">Total Users</div>
            <div className="text-2xl font-semibold text-black">{users.length}</div>
          </div>
          <div className="p-4 bg-white rounded shadow border border-blue-100">
            <div className="text-sm text-gray-500">Total Vendors</div>
            <div className="text-2xl font-semibold text-black">{vendors.length}</div>
          </div>
          <div className="p-4 bg-white rounded shadow border border-blue-100">
            <div className="text-sm text-gray-500">Active Vendors</div>
            <div className="text-2xl font-semibold text-black">{vendors.filter((v) => v.active).length}</div>
          </div>
        </div>

        {/* Users section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-blue-800">Users</h2>
            <div className="flex items-center gap-3">
              <input
                placeholder="Search users by name, email or id"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="px-3 py-2 border rounded-lg w-64"
              />
              <button onClick={() => setUserQuery('')} className="text-sm text-blue-600">Clear</button>
            </div>
          </div>

          <div className="bg-white rounded shadow overflow-hidden border border-blue-100">
            <table className="w-full text-left">
              <thead className="bg-blue-100 text-sm text-black">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, i) => (
                  <tr key={u.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 text-sm text-black">{u.id}</td>
                    <td className="p-3 text-sm text-black">{u.name}</td>
                    <td className="p-3 text-sm text-black">{u.email}</td>
                    <td className="p-3 text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeUser(u.id)}
                          className="px-3 py-1 rounded bg-white border border-blue-300 text-blue-700 hover:bg-blue-50"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td className="p-3 text-sm text-gray-600" colSpan={4}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Vendors section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-blue-800">Vendors</h2>
            <div className="flex items-center gap-3">
              <input
                placeholder="Search vendors by name or id"
                value={vendorQuery}
                onChange={(e) => setVendorQuery(e.target.value)}
                className="px-3 py-2 border rounded-lg w-64"
              />
              <select value={vendorFilterActive} onChange={(e) => setVendorFilterActive(e.target.value as any)} className="px-3 py-2 border rounded-lg">
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button onClick={() => { setVendorQuery(''); setVendorFilterActive('all'); }} className="text-sm text-blue-600">Clear</button>
            </div>
          </div>

          <div className="bg-white rounded shadow overflow-hidden border border-blue-100">
            <table className="w-full text-left">
              <thead className="bg-blue-100 text-sm text-black">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Active</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((v, i) => (
                  <tr key={v.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 text-sm text-black">{v.id}</td>
                    <td className="p-3 text-sm text-black">{v.name}</td>
                    <td className="p-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${v.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                        {v.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleVendorActive(v.id)}
                          className={`px-3 py-1 rounded text-white ${v.active ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 hover:bg-blue-500'}`}
                        >
                          {v.active ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredVendors.length === 0 && (
                  <tr>
                    <td className="p-3 text-sm text-gray-600" colSpan={4}>
                      No vendors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
