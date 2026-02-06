import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            email: string
            name: string
            role: string
            businessName?: string
            contactName?: string
            phone?: string
            active?: boolean
        }
    }

    interface User {
        id: string
        email: string
        name: string
        role: string
        businessName?: string
        contactName?: string
        phone?: string
        active?: boolean
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        role: string
        businessName?: string
        contactName?: string
        phone?: string
        active?: boolean
    }
}