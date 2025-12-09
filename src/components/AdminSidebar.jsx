'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineDashboard, AiOutlineShoppingCart } from 'react-icons/ai';
import { FiUser, FiCreditCard, FiBarChart2, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { MdProductionQuantityLimits } from 'react-icons/md';
import Image from 'next/image';

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const links = [
    { href: '/admin', label: 'Dashboard', icon: AiOutlineDashboard },
    { href: '/admin/order', label: 'Orders', icon: AiOutlineShoppingCart },
    { href: '/admin/product', label: 'Products', icon: MdProductionQuantityLimits },
    { href: '/admin/customers', label: 'Customers', icon: FiUser },
    { href: '/admin/vendors', label: 'Vendors', icon: FiUser },
    { href: '/admin/payment', label: 'Payments', icon: FiCreditCard },
    { href: '/admin/report', label: 'Reports', icon: FiBarChart2 },
    { href: '/admin/setting', label: 'Settings', icon: FiSettings },
    { href: '/admin/logout', label: 'Logout', icon: FiLogOut }
  ];

  const pathname = usePathname();

  // Broadcast sidebar state changes to other components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sidebarToggle', { detail: { isCollapsed } }));
      localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
    }
  }, [isCollapsed]);

  // Load saved state on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarCollapsed');
      if (saved) {
        setIsCollapsed(JSON.parse(saved));
      }
    }
  }, []);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event) => {
      setIsDarkMode(event.detail.isDarkMode);
    };

    window.addEventListener('themeToggle', handleThemeChange);

    // Check initial theme
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setIsDarkMode(false);
      }
    }

    return () => {
      window.removeEventListener('themeToggle', handleThemeChange);
    };
  }, []);

  return (
    <aside 
      className={`${
        isCollapsed ? 'w-20' : 'w-65'
      } left-0 top-0 h-screen border-r shadow-md p-4 fixed font-[lexend] transition-all duration-300 ease-in-out z-50 ${
        isDarkMode
          ? 'bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 border-gray-700'
          : 'bg-gradient-to-b from-blue-100 via-white to-purple-200 border-gray-200'
      }`}
    >
      {/* Header with Logo and Toggle Button */}
      <div className='flex items-center justify-between mb-6'>
        <div className={`flex items-center font-semibold text-[1.2rem] gap-1 overflow-hidden transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
          <Image
            src='/leadersmartLogo.png'
            alt='Leader mart Logo'
            height={60}
            width={60}
            priority
            className='bg-white p-1 rounded-full'
          />
          <h2 className={isDarkMode ? 'text-blue-400' : 'text-indigo-600'}>Leaders Mart</h2>
        </div>
        
        {/* Collapsed Logo */}
        {isCollapsed && (
          <div className='flex justify-center w-full'>
            <Image
              src='/leadersmartLogo.png'
              alt='Leader mart Logo'
              height={40}
              width={40}
              priority
              className='bg-white p-1 rounded-full'
            />
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className='absolute -right-3 top-8 bg-linear-to-l from-blue-300 to-purple-600 text-white p-1 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-10'
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <FiMenu size={13} /> : <FiX size={20} />}
      </button>

      {/* Navigation */}
      <nav className='flex flex-col gap-2 mt-4'>
        {!isCollapsed && (
          <p className={`font-medium mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            General
          </p>
        )}
        
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={`${label}-${href}`}
            href={href}
            className={`flex items-center gap-3 p-2 transition-all duration-200 group relative ${
              pathname === href
                ? 'text-pink-100 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 font-semibold rounded-[2rem]'
                : isDarkMode
                ? 'text-gray-300 hover:bg-gradient-to-l from-gray-700 via-gray-800 to-gray-700 hover:rounded-[2rem] hover:font-semibold'
                : 'text-gray-900 hover:bg-gradient-to-l from-blue-200 via-white to-purple-300 hover:rounded-[2rem] hover:font-semibold'
            } ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? label : ''}
          >
            <span className={`border rounded-full text-gray-800 p-[0.3rem] transition-all duration-200 ${
              pathname === href 
                ? 'bg-white border-purple-300' 
                : isDarkMode 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-200'
            }`}>
              <Icon 
                size={20} 
                className={
                  pathname === href 
                    ? 'text-purple-600' 
                    : isDarkMode 
                    ? 'text-gray-300 group-hover:text-blue-400' 
                    : 'group-hover:text-indigo-600'
                } 
              />
            </span>
            
            <span className={`whitespace-nowrap transition-all duration-300 ${
              isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
            }`}>
              {label}
            </span>

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <span className='absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg'>
                {label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}