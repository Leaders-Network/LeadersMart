import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { NextAuthProvider } from "@/context/NextAuthContext";
import { ToastProvider } from "@/context/ToastContext";
import ConditionalHeader from "@/components/ConditionalHeader";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "LeaderSmart - Your Online Store",
  description: "Browse and shop from our wide selection of products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} antialiased`}
      >
        <NextAuthProvider>
          <ToastProvider>
            <CartProvider>
              <ConditionalHeader />
              <main className="min-h-screen">{children}</main>
            </CartProvider>
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
