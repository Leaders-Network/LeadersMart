'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function useAuth() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const login = async (email: string, password: string, userType: 'user' | 'vendor' = 'user') => {
        const result = await signIn("credentials", {
            email,
            password,
            userType,
            redirect: false,
        })

        if (result?.error) {
            throw new Error(result.error)
        }

        return result
    }

    const logout = async () => {
        await signOut({ redirect: false })
        router.push("/")
    }

    const signup = async (name: string, email: string, password: string) => {
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || "Signup failed")
        }

        // Auto-login after successful signup
        return await login(email, password, 'user')
    }

    const vendorSignup = async (
        businessName: string,
        contactName: string,
        email: string,
        phone: string,
        password: string
    ) => {
        const response = await fetch("/api/auth/vendor/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ businessName, contactName, email, phone, password }),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || "Vendor signup failed")
        }

        // Auto-login after successful signup
        return await login(email, password, 'vendor')
    }

    return {
        user: session?.user || null,
        isLoading: status === "loading",
        isAuthenticated: !!session,
        isVendor: session?.user?.role === 'vendor',
        isAdmin: session?.user?.role === 'admin',
        login,
        logout,
        signup,
        vendorSignup,
    }
}