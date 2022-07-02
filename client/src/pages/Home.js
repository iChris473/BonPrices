

import React from 'react'
import Navbar from '../components/Navbar'
import {SearchIcon, LocationMarkerIcon} from '@heroicons/react/outline'
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen relative bg-[url('client\src\images\whiteBg.jpg')]">
      {/* SIGN IN BUTTON */}
      <button className="text-white rounded-md text-white p-2 bg-[#a8039b] font-bold absolute top-5 right-5">
        Sign in
      </button>
      <div className="flexCenter flex-col mb-32">
        {/* LOGO SECTION */}
        <div className="flexCenter flex-col">
          <img
            src={require("../images/plogo.png")}
            className="mt-10 h-52 object-contain"
            alt=""
          />
          <h1 className="text-[#a8039b] font-extrabold text-4xl">
            Pricedatabase
          </h1>
          <p className="text-gray-500 text-xs md:text-md text-center">
            Get the actual price of any product in any Nigerian State
          </p>
        </div>
        {/* SEARCH SECTION */}
        <div className="border border-[#d6a7d2] mt-5 w-[90%] mx-auto max-w-[700px] p-3 rounded-lg flexBetween gap-3">
          <SearchIcon className="h-5 text-gray-400" />
          <input type="text" className="w-full outline-none text-gray-500" />
          <div className="flex items-center justify-end">
            <LocationMarkerIcon className="h-4 text-pink-500" />
            <select className='w-20 outline-none text-xs'>
              <option disabled selected>
                --Select State--
              </option>
              <option className='text-xs' value="Abia">Abia</option>
              <option className='text-xs' value="Adamawa">Adamawa</option>
              <option className='text-xs' value="Akwa Ibom">Akwa Ibom</option>
              <option className='text-xs' value="Anambra">Anambra</option>
              <option className='text-xs' value="Bauchi">Bauchi</option>
              <option className='text-xs' value="Bayelsa">Bayelsa</option>
              <option className='text-xs' value="Benue">Benue</option>
              <option className='text-xs' value="Borno">Borno</option>
              <option className='text-xs' value="Cross River">Cross River</option>
              <option className='text-xs' value="Delta">Delta</option>
              <option className='text-xs' value="Ebonyi">Ebonyi</option>
              <option className='text-xs' value="Edo">Edo</option>
              <option className='text-xs' value="Ekiti">Ekiti</option>
              <option className='text-xs' value="Enugu">Enugu</option>
              <option className='text-xs' value="FCT">Federal Capital Territory</option>
              <option className='text-xs' value="Gombe">Gombe</option>
              <option className='text-xs' value="Imo">Imo</option>
              <option className='text-xs' value="Jigawa">Jigawa</option>
              <option className='text-xs' value="Kaduna">Kaduna</option>
              <option className='text-xs' value="Kano">Kano</option>
              <option className='text-xs' value="Katsina">Katsina</option>
              <option className='text-xs' value="Kebbi">Kebbi</option>
              <option className='text-xs' value="Kogi">Kogi</option>
              <option className='text-xs' value="Kwara">Kwara</option>
              <option className='text-xs' value="Lagos">Lagos</option>
              <option className='text-xs' value="Nasarawa">Nasarawa</option>
              <option className='text-xs' value="Niger">Niger</option>
              <option className='text-xs' value="Ogun">Ogun</option>
              <option className='text-xs' value="Ondo">Ondo</option>
              <option className='text-xs' value="Osun">Osun</option>
              <option className='text-xs' value="Oyo">Oyo</option>
              <option className='text-xs' value="Plateau">Plateau</option>
              <option className='text-xs' value="Rivers">Rivers</option>
              <option className='text-xs' value="Sokoto">Sokoto</option>
              <option className='text-xs' value="Taraba">Taraba</option>
              <option className='text-xs' value="Yobe">Yobe</option>
              <option className='text-xs' value="Zamfara">Zamfara</option>
            </select>
          </div>
        </div>
        {/* DESCRIPTION SECTION */}
        <div className="flexCenter gap-5 mt-5 flex-wrap">
          <button className="py-2 px-10 font-bold rounded-lg bg-pink-600 text-white">
            Search
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
