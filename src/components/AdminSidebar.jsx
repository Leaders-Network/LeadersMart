'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineDashboard, AiOutlineShoppingCart } from 'react-icons/ai'
import { FiUser, FiCreditCard, FiBarChart2, FiSettings, FiLogOut } from 'react-icons/fi'
import { MdProductionQuantityLimits } from 'react-icons/md'
import Image from 'next/image'
export default function AdminSidebar (){
  const links = [
    {href: '/admin', label: 'Dashboard', icon: AiOutlineDashboard},
    {href: '/admin/order', label: 'Orders', icon: AiOutlineShoppingCart},
    {href: '/admin/product', label: 'Products', icon: MdProductionQuantityLimits},
    {href: '/admin/customers', label: 'Customers', icon: FiUser},
    {href: '/admin/vendors', label: 'Vendors', icon: FiUser},
    {href: '/admin/payment', label: 'Payments', icon: FiCreditCard},
    {href: '/admin/report', label: 'Reports', icon: FiBarChart2},
    {href: '/admin/setting', label: 'Settings', icon: FiSettings},
    {href: '/admin/logout', label: 'Logout', icon: FiLogOut}
  ]

  const pathname = usePathname()
  return (
    <aside className='w-65 left-0 top-0 h-screen bg-linear-to-b from-blue-100 via-white to-purple-200 border-r border-gray-200 shadow-md p-4  fixed font-[lexend]'>
      <div className='flex items-center font-semibold text-[1.2rem] gap-1 bg-blue'>
        <Image
          src='/leadersmartLogo.png'
          alt='Leader mart Logo'
          height={60}
          width={60}
          priority
          className=' bg-white p-1 rounded-full'
        />
        <h2 className='text-indigo-600'>Leaders Mart</h2>
      </div>
      <nav className='flex flex-col gap-2'>
        <p className='font-medium mt-6 mb-4'>General</p>
        {links.map(({href, label, icon: Icon})=> (
          <Link
            key={`${label}-${href}`}
            href={href}
            className={`flex items-center gap-2 p-2 hover:bg-gray-200  ${pathname === href ? 'text-pink-100 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 font-semibold rounded-[2rem]' : 'text-gray-900 hover:bg-gradient-to-l from-blue-200 via-white to-purple-300 hover:rounded-[2rem] hover:font-semibold ' }`}
          >
            <span className='bg-white border border-gray-200 rounded-full text-gray-800  p-[0.3rem]'><Icon size={20} className={` ${pathname === href ? 'text-purple-600' : " "}`} /></span>
          <span>{label}</span>
          </Link>

        ))}
      </nav>

    

    </aside>
  )
}
