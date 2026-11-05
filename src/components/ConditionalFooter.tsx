'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  if (pathname?.startsWith('/dashboard')) {
    return (
      <footer className="border-t border-violet-100 bg-white px-4 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} LeadersMart. All rights reserved.
      </footer>
    );
  }

  return <Footer />;
}
