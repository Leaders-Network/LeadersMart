import { ReactNode } from "react";
import AdminSidebar from '@/components/AdminSidebar'
import AdminHeader from "@/components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
        <AdminHeader />
        <AdminSidebar />
      <main className="ml-65 pt-16 p-6 bg-gray-50 min-h-screen ">
        {children}
      </main>

    </div>
  );
}
