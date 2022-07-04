import React from 'react'
import {SearchIcon, LocationMarkerIcon} from '@heroicons/react/outline'
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="flex items-center justify-between relative sm:p-5 pb-4 bg-gray-300 shadow-md bg-opacity-30">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full">
        <Link to='/'>
          <img
            src={require("../images/plogo.png")}
            className="h-20 object-contain sm:mt-2 pt-2"
            alt=""
          />
        </Link>
        {/* SEARCH SECTION */}
        <div className="flex-1">
          <p className="text-gray-500 font-semibold text-sm md:text-md text-right w-[90%] mx-auto max-w-[700px]">
            Filter location
          </p>
          <div className="shadow-md border border-[#d6a7d2] w-[90%] mx-auto max-w-[700px] p-3 rounded-lg flexBetween gap-3">
            <SearchIcon className="h-5 text-gray-400" />
            <input
              type="search"
              className="w-full outline-none text-gray-500 bg-transparent"
            />
            <div className="flex items-center justify-end">
              <LocationMarkerIcon className="h-4 text-pink-500" />
              <select className="w-20 outline-none text-xs bg-transparent">
                <option className="text-xs" value="All">
                  All States
                </option>
                <option className="text-xs" value="Abia">
                  Abia
                </option>
                <option className="text-xs" value="Adamawa">
                  Adamawa
                </option>
                <option className="text-xs" value="Akwa Ibom">
                  Akwa Ibom
                </option>
                <option className="text-xs" value="Anambra">
                  Anambra
                </option>
                <option className="text-xs" value="Bauchi">
                  Bauchi
                </option>
                <option className="text-xs" value="Bayelsa">
                  Bayelsa
                </option>
                <option className="text-xs" value="Benue">
                  Benue
                </option>
                <option className="text-xs" value="Borno">
                  Borno
                </option>
                <option className="text-xs" value="Cross River">
                  Cross River
                </option>
                <option className="text-xs" value="Delta">
                  Delta
                </option>
                <option className="text-xs" value="Ebonyi">
                  Ebonyi
                </option>
                <option className="text-xs" value="Edo">
                  Edo
                </option>
                <option className="text-xs" value="Ekiti">
                  Ekiti
                </option>
                <option className="text-xs" value="Enugu">
                  Enugu
                </option>
                <option className="text-xs" value="FCT">
                  Federal Capital Territory
                </option>
                <option className="text-xs" value="Gombe">
                  Gombe
                </option>
                <option className="text-xs" value="Imo">
                  Imo
                </option>
                <option className="text-xs" value="Jigawa">
                  Jigawa
                </option>
                <option className="text-xs" value="Kaduna">
                  Kaduna
                </option>
                <option className="text-xs" value="Kano">
                  Kano
                </option>
                <option className="text-xs" value="Katsina">
                  Katsina
                </option>
                <option className="text-xs" value="Kebbi">
                  Kebbi
                </option>
                <option className="text-xs" value="Kogi">
                  Kogi
                </option>
                <option className="text-xs" value="Kwara">
                  Kwara
                </option>
                <option className="text-xs" value="Lagos">
                  Lagos
                </option>
                <option className="text-xs" value="Nasarawa">
                  Nasarawa
                </option>
                <option className="text-xs" value="Niger">
                  Niger
                </option>
                <option className="text-xs" value="Ogun">
                  Ogun
                </option>
                <option className="text-xs" value="Ondo">
                  Ondo
                </option>
                <option className="text-xs" value="Osun">
                  Osun
                </option>
                <option className="text-xs" value="Oyo">
                  Oyo
                </option>
                <option className="text-xs" value="Plateau">
                  Plateau
                </option>
                <option className="text-xs" value="Rivers">
                  Rivers
                </option>
                <option className="text-xs" value="Sokoto">
                  Sokoto
                </option>
                <option className="text-xs" value="Taraba">
                  Taraba
                </option>
                <option className="text-xs" value="Yobe">
                  Yobe
                </option>
                <option className="text-xs" value="Zamfara">
                  Zamfara
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
