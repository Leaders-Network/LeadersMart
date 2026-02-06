'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthGuardProps {
    children: React.ReactNode
    requireAuth?: boolean
    requiredRole?: string
    fallbackUrl?: string
}

export default function NextAuthGuard({
    children,
    requireAuth = true,
    requiredRole,
    fallbackUrl = "/login"
}: AuthGuardProps) {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "loading") return // Still loading

        if (requireAuth && !session) {
            router.push(fallbackUrl)
            return
        }

        if (requiredRole && session?.user?.role !== requiredRole) {
            router.push("/unauthorized")
            return
        }
    }, [session, status, requireAuth, requiredRole, router, fallbackUrl])

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (requireAuth && !session) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Redirecting to login...</p>
                </div>
            </div>
        )
    }

    if (requiredRole && session?.user?.role !== requiredRole) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
                    <p className="text-gray-600">You don't have permission to access this page.</p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}