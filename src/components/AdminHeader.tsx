'use client';
import Image from 'next/image'

import { Bell, Moon, Search, Sun } from 'lucide-react'
export default function AdminHeader () {

  return (
    <header className='fixed top-0 left-65 right-0 h-16 bg-linear-to-l from-blue-100 via-white to-purple-200 border-b border-gray-200 shadow-md z-40 font-[lexend]'>
        <div className='h-full px-6 flex items-center justify-between'>
          <div className='flex items-center gap-5'>
            <h1 className='font-semibold text-[1.5rem]'>Welcome!👋</h1>
            <div className='flex items-center px-4 py-2 
              bg-gray-100 rounded-[2rem]
              border border-gray-200 
              focus:outline-none
              focus:ring-2
              focus:ring-blue-300
              focus:border-transparent'>
              <input type="text" placeholder='Search...'
              className='focus:ring-none
              focus:ring-0
              focus:outline-none
              bg-gray-100
              focus:ring-blue-300
              '
              />
              <Search />
            </div>
          </div>


          <div className='flex items-center gap-4'>
            <Bell 
            size={32}
            className='cursor-pointer bg-white p-1 rounded-full' />
            <button className={`flex items-center gap-1 bg-gray-200 p-1 rounded-full cursor-pointer `}>
              <Sun size={30} className='bg-white p-1 rounded-full' /> <Moon size={30} className='p-1' /> 
            </button>
            <div className='flex items-center gap-2'>
            <Image 
            src='/avatar.webp'
            alt='Admin Profile Picture'
            width={50}
            height={50}
            className='w-10 h-10 rounded-full bg-gray-300'
            priority
            />
            <div >
              <h2 className='font-semibold'>Abimbola</h2>
              <p className='text-[12px]'>Admin</p>
            </div>
            </div>
          </div>
        </div>
    </header>
  )
}