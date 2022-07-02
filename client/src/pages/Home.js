

import React from 'react'
import Navbar from '../components/Navbar'
import {SearchIcon} from '@heroicons/react/outline'
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className='h-screen relative'>
        {/* SIGN IN BUTTON */}
    <button className='text-white rounded-md text-white p-2 bg-[#a8039b] font-bold absolute top-5 right-5'>Sign in</button>
      <div className="flexCenter flex-col">
          {/* LOGO SECTION */}
        <div className='flexCenter flex-col'>
          <img src={require("../images/plogo.png")} className="mt-10 h-52 object-contain" alt=""/>
          <h1 className='text-[#a8039b] font-extrabold text-4xl'>Pricedatabase</h1>
          <p className='text-gray-500 text-xs md:text-md text-center'>Get the actual price of any product in any Nigerian State</p>
        </div>
        {/* SEARCH SECTION */}
        <div className='border border-[#d6a7d2] mt-5 w-[90%] mx-auto max-w-[700px] p-3 rounded-lg flexBetween gap-3'>
            <SearchIcon className='h-5 text-gray-400' />
            <input type="text" className='w-full outline-none text-gray-500'  />
        </div>
        {/* DESCRIPTION SECTION */}
        <div className='flexCenter gap-5 mt-5 flex-wrap'>
            <button className='p-3 rounded-md bg-pink-50 text-gray-900'>Phone Prices</button>
            <button className='p-3 rounded-md bg-pink-50 text-gray-900'>Car Prices</button>
            <button className='p-3 rounded-md bg-pink-50 text-gray-900'>Cable Prices</button>
            <button className='p-3 rounded-md bg-pink-50 text-gray-900'>Laptop Prices</button>
        </div>

      </div>
      <div className='absolute bottom-0 w-full'>
        <Footer />
      </div>
    </div>
  );
}
