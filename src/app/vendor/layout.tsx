import { ReactNode } from "react";
import NextAuthGuard from "@/components/NextAuthGuard";
import VendorSidebar from "@/components/VendorSidebar";

export default function VendorLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <NextAuthGuard requiredRole="vendor" fallbackUrl="/vendor/auth">
            <div className="flex min-h-screen bg-gray-50">
                <VendorSidebar />
                <main className="flex-1 ml-64 p-6">
                    {children}
                </main>
            </div>
        </NextAuthGuard>
    );
}