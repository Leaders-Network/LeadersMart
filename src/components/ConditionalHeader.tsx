'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Keep account and back-office pages focused on their own layouts.
  const hideHeader =
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/vendor') ||
    pathname === '/login' ||
    pathname === '/signup';
  
  if (hideHeader) {
    return null;
  }
  
  return <Header />;
}