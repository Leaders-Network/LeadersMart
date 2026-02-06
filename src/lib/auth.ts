import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import connectDB from "./mongodb"
import User, { IUser } from "@/models/User"
import Vendor, { IVendor } from "@/models/Vendor"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                userType: { label: "User Type", type: "text" } // 'user', 'admin', or 'vendor'
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required")
                }

                try {
                    await connectDB()

                    const userType = credentials.userType || 'user'

                    if (userType === 'vendor') {
                        // Find vendor by email
                        const vendor = await Vendor.findOne({
                            email: credentials.email.toLowerCase()
                        }) as IVendor | null

                        if (!vendor) {
                            throw new Error("Invalid email or password")
                        }

                        // Verify password
                        const isValidPassword = await bcrypt.compare(
                            credentials.password,
                            vendor.password
                        )

                        if (!isValidPassword) {
                            throw new Error("Invalid email or password")
                        }

                        // Return vendor object for session
                        return {
                            id: vendor._id.toString(),
                            email: vendor.email,
                            name: vendor.contactName || vendor.businessName,
                            role: 'vendor',
                            businessName: vendor.businessName,
                            contactName: vendor.contactName,
                            phone: vendor.phone,
                            active: vendor.active,
                        }
                    } else {
                        // Find regular user/admin by email
                        const user = await User.findOne({
                            email: credentials.email.toLowerCase()
                        }) as IUser | null

                        if (!user) {
                            throw new Error("Invalid email or password")
                        }

                        // Verify password
                        const isValidPassword = await bcrypt.compare(
                            credentials.password,
                            user.password
                        )

                        if (!isValidPassword) {
                            throw new Error("Invalid email or password")
                        }

                        // Return user object for session
                        return {
                            id: user._id.toString(),
                            email: user.email,
                            name: user.name,
                            role: user.role,
                        }
                    }
                } catch (error) {
                    console.error("Auth error:", error)
                    throw error
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 60, // 30 minutes
    },
    jwt: {
        maxAge: 30 * 60, // 30 minutes
    },
    callbacks: {
        async jwt({ token, user }) {
            // Add user info to JWT token
            if (user) {
                token.role = user.role
                token.id = user.id
                if (user.role === 'vendor') {
                    token.businessName = user.businessName
                    token.contactName = user.contactName
                    token.phone = user.phone
                    token.active = user.active
                }
            }
            return token
        },
        async session({ session, token }) {
            // Add user info to session
            if (token) {
                session.user.id = token.id as string
                session.user.role = token.role as string
                if (token.role === 'vendor') {
                    session.user.businessName = token.businessName as string
                    session.user.contactName = token.contactName as string
                    session.user.phone = token.phone as string
                    session.user.active = token.active as boolean
                }
            }
            return session
        }
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
}