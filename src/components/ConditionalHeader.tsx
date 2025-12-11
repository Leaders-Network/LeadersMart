'use client';

import React from 'react'
import { usePathname } from 'next/navigation';
import Header from './Header';

const ConditionalHeader = () => {
  const pathname = usePathname();
  const hideHeaderOn = ['/admin', '/admin/order', '/admin/product', '/admin/setting', '/admin/customers']
  const showHeader = !hideHeaderOn.some(path => pathname.startsWith(path));

  return (
    <div>
      {showHeader ? <Header /> : null}
    </div>
  )
}

export default ConditionalHeader;