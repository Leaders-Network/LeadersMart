'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Hide header on admin and vendor pages
  const hideHeader = pathname?.startsWith('/admin') || pathname?.startsWith('/vendor');
  
  if (hideHeader) {
    return null;
  }
  
  return <Header />;
}

  return (
    <div>
      {showHeader ? <Header /> : null}
    </div>
  )
}

export default ConditionalHeader;