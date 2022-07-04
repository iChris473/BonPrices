import { XCircleIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";


export default function Description() {
  return (
    <div className="relative">
      {/* BACKGROUND IMAGE */}
      <img
        src={require("../images/whiteBg.jpg")}
        className="absolute -z-10 w-screen h-full opacity-50 object-cover"
        alt=""
      />
      {/* NAVBAR SECTION */}
      <nav className="flex items-center justify-between relative sm:p-5 pb-4 bg-gray-300 shadow-md bg-opacity-30">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img
              src={require("../images/plogo.png")}
              className="h-20 object-contain"
              alt=""
            />
          </Link>
        </div>
        <div className="flex-1 flexBetween w-full">
          <h1 className="text-left font-bold text-2xl text-gray-700">
            About this result
          </h1>
          <Link to='/search#'>
            <XCircleIcon className="h-10 text-red-500" />
          </Link>
        </div>
      </nav>
      {/* ABOUT SECTION */}
      <div className="mt-7 flex flex-col gap-5 items-center justify-center w-full mx-auto max-w-[800px] mx-auto m-5 p-5 min-h-screen">
        <div className="border border-gray-200 p-5 rounded-md shadow-md space-y-5">
          {/* PRICE TITLE */}
          
          <h1 className="text-[#a8039b] max-w-[700px] font-semibold text-xl md:text-2xl">
            Price of Mercedess E 400 in Palo Alto Lorem ipsum dolor sit amet.
          </h1>
          {/* PRICE DESCRIPTION */}
          <p className="text-gray-500 text-md md:text-lg tracking-wide max-w-[700px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            odio qui esse voluptatum maiores cupiditate ea sapiente est
            architecto et Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Deserunt perferendis, doloribus tempora praesentium commodi
            soluta beatae nam molestias excepturi eligendi.
          </p>
          {/* PRICE COST PER UNIT */}
          <p className="font-bold text-lg text-gray-700">NGN 5,000 per unit</p>
        </div>
        <div className="flexCenter flex-col gap-5">
          <img
            src={require("../images/e400.png")}
            className="w-[600px] rounded-lg object-contain"
            alt=""
          />
          <img
            src={require("../images/e400.png")}
            className="w-[600px] rounded-lg object-contain"
            alt=""
          />
          <img
            src={require("../images/e400.png")}
            className="w-[600px] rounded-lg object-contain"
            alt=""
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
