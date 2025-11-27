'use client';
import React from 'react'

export default function AdminHeader () {
  return (
    <header className='fixed top-0 left-65 right-0 h-16 bg-gradient-to-l from-blue-100 via-white to-purple-200 border-b border-gray-200 shadow-md z-40'>
        <div className='h-full px-6 flex items-center justify-between'>
          <h2 className='text-lg text-gray-700'>
            Welcome, Admin
          </h2>

          <div className='flex items-center gap-4'>
            notofication
          </div>
        </div>
    </header>
  )
}