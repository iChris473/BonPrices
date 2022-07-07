
import { CameraIcon, XIcon } from "@heroicons/react/solid";
import { useState, useRef, useContext } from "react";

import axios from "axios";

export default function AddProduct() {

  return (
    <div>
      <h1 className="text-left text-2xl border-b border-green-400 w-[94%] mx-auto max-w-[850px] pb-2 font-bold text-green-600 m-10">
        Add New Field
      </h1>
    <form className="bg-gray-50 p-5 rounded-md shadow-lg w-[94%] mx-auto max-w-[850px] bg-opacity-60">
      {/* TEXT AND INPUT SECTION */}
      <div className="shadow-lg rounded-md px-5 py-10 border-md flexCenter gap-8 flex-col w-[94%] mx-auto max-w-[800px] bg-gray-50 bg-opacity-80">
          {/* PRODUCT TITLE */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">Title</p>
              <input type="text" className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter product title" />
          </div>
          {/* PRODUCT DESCRIPTION */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">Description</p>
              <input type="text" className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter product description" />
          </div>
          {/* PRODUCT PRICE */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">Price (NGN)</p>
              <input type="number" className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter product price" />
          </div>
          {/* PRODUCT UNIT */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">Unit</p>
              <input type="number" className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="e.g. square meters, per product, etc" />
          </div>
          {/* PRODUCT UNIT */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">State</p>
              <select className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent">
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
      {/* IMAGE SECTION */}
      <div className="shadow-lg rounded-md px-5 py-10 border-md flexCenter gap-8 flex-col w-[94%] mx-auto max-w-[800px] bg-gray-100 mt-20 bg-opacity-80">
        <h1 className="text-left text-xl border-b border-green-400 font-bold text-green-600 w-full">
            Add Pictures
        </h1>
          <div className="bg-gray-200 shadow-md border rounded-lg border-green-50 h-[400px] w-[400px] flexCenter flex-col gap-2">
              <CameraIcon className="text-gray-500 h-10" />
              <p className="text-gray-500 text-center font-bold text-md">Click to add photo</p>
          </div>
      </div>
      {/* SUBMIT BUTTON */}
      <button className="bg-gray-800 font-bold text-white p-5 rounded-md w-full my-10 block w-[94%] mx-auto max-w-[750px]">SUBMIT</button>
    </form>
    </div>
  );
}
