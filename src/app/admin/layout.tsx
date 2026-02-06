import { ReactNode } from "react";
import AdminSidebar from '@/components/AdminSidebar'
import AdminHeader from "@/components/AdminHeader";
import NextAuthGuard from "@/components/NextAuthGuard";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <NextAuthGuard requiredRole="admin" fallbackUrl="/admin/signin">
      <div>
        <AdminHeader />
        <AdminSidebar />
        <main className="ml-65 pt-16 p-2 bg-gray-50 min-h-screen ">
          {children}
        </main>
      </div>
    </NextAuthGuard>
  );
}
