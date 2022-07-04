
import React from 'react'
import {LocationMarkerIcon} from '@heroicons/react/outline'

export default function Footer() {
  return (
    <div className='bg-gray-200 bg-opacity-40 p-5 flex items-start justify-center flex-col gap-1'>
        <div className='flex items-center justify-start border-b border-[#d6a7d2] pb-2 w-full'>
            <LocationMarkerIcon className='h-5 text-gray-500' />
            <p className='font-bold text-gray-400 text-sm'>Abuja, GwagwaLada</p>
        </div>
        <p className='font-semibold text-gray-500 ml-1 text-sm'> &copy; Bon Maximus Company</p>
    </div>
  )
}
