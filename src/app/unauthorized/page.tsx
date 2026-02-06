'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function UnauthorizedPage() {
    const { user, logout } = useAuth()

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full text-center">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-6xl mb-6">🚫</div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
                    <p className="text-gray-600 mb-6">
                        You don't have permission to access this page.
                        {user && (
                            <span className="block mt-2">
                                Signed in as: <strong>{user.email}</strong> ({user.role})
                            </span>
                        )}
                    </p>

                    <div className="space-y-3">
                        <Link
                            href="/"
                            className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                        >
                            Go to Homepage
                        </Link>

                        {user && (
                            <button
                                onClick={logout}
                                className="block w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
                            >
                                Sign Out
                            </button>
                        )}

                        {!user && (
                            <Link
                                href="/login"
                                className="block w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}