
import React from 'react'
import {LocationMarkerIcon} from '@heroicons/react/outline'

export default function Footer() {
  return (
    <div className='bg-gray-100 p-5 flex items-start justify-center flex-col gap-5'>
        <div className='flex items-center justify-start border-b border-[#d6a7d2] pb-5 w-full'>
            <LocationMarkerIcon className='h-5 text-gray-500' />
            <p className='font-bold text-gray-500 text-md'>Abuja, GwagwaLada</p>
        </div>
        <p className='font-semibold text-gray-700 ml-1'> &copy; Bon Maximus Company</p>
    </div>
  )
}
