
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { publicRequest } from '../axioMethod'
import {useState, useEffect } from 'react'


export default function Description() {

  const [isLloading, setIsLoading] = useState(true)

  const [product, setProduct] = useState([])

  const navigate = useNavigate()

  function getParameterByName(name, url = window.location.href) {

    name = name.replace(/[\[\]]/g, '\\$&');

    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);

    if (!results) return null;

    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));

  }


  useEffect(async () => {

    let id = getParameterByName('id')
  
    setIsLoading(true)
    
    try {
      
      const res = await publicRequest.get(`/product/get/${id}`)

      setProduct(res.data)
      setIsLoading(false)
      
    } catch (error) {
      
      console.log(error)
      setIsLoading(false)

    }

  }, [])

  const slider = document.querySelector('#slider')
  const slideImg = document.querySelector('#slideImg')
  
  const scrollLeft = () => {
  
    slider.scrollLeft = slider.scrollLeft - slideImg.clientWidth
  
  }

  const scrollRight = () => {
  
    slider.scrollLeft = slider.scrollLeft + slideImg.clientWidth
  
  }

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
          <ArrowLeftIcon onClick={() => navigate(-1)} className="h-7 md:h-10 text-[#a8039b] cursor-pointer mr-2" />
        </div>
      </nav>
      {/* ABOUT SECTION */}
      <div className="mt-7 flex flex-col gap-5 items-center justify-center w-full max-w-[800px] mx-auto m-5 p-5 min-h-screen">
        <div className="border border-gray-200 p-5 rounded-md shadow-md space-y-5 w-full m-5 sm:mx-auto max-w-[700px]">
          {/* PRICE TITLE */}
          <h1 className="text-[#a8039b] max-w-[700px] font-semibold text-xl md:text-2xl">
            {product?.title}
          </h1>
          {/* PRICE DESCRIPTION */}
          <p className="text-gray-500 text-md md:text-lg tracking-wide max-w-[700px]">
            {product?.description}
          </p>
          {/* PRICE COST PER UNIT */}
          <p className="font-bold text-lg text-gray-700">NGN {parseFloat(product?.price).toLocaleString()} per {product?.unit}</p>
        </div>
        <div className="relative flex items-center">
          <ChevronLeftIcon onClick={scrollLeft} className="h-10 opacity-50 hover:opacity-100 cursor-pointer hover:scale-110" />
          <div id="slider" className="w-full h-full overflow-x-scroll overflow-y-scroll scroll no-scrollbar whitespace-nowrap scroll-smooth">
            { 
             product?.picture &&
              ( (typeof product?.picture[0] === 'string') ? product?.picture : product?.picture[0] )
               .map(pic => (
                <img id="slideImg" src={pic} className="h-[300px] object-contain inline-block rounded-lg p-2 hover:scale-105 ease-in-out duration-300" alt="" />
              ))
            }
          </div>
          <ChevronRightIcon onClick={scrollRight} className="h-10 opacity-50 hover:opacity-100 cursor-pointer hover:scale-110" />
        </div>
        <div className="w-full mt-16 p-5 space-y-2">
          {/* MERCHANT INFO */}
          <h1 className="text-gray-700 text-left font-semibold text-xl md:text-2xl">Merchant Info</h1>
          {/* MERCHANT NAME */}
          <p className="text-gray-500 text-md md:text-lg tracking-wide text-left">{product?.merchantName || "Oops! Merchant name is Not Available"}</p>
          {/* MERCHANT NUMBER */}
          <p className="text-gray-500 text-md md:text-lg tracking-wide text-left">{product?.merchantNumber}</p>
          {/* MERCHANT ADDRESS */}
          <p className="text-gray-500 text-md md:text-lg tracking-wide text-left">{product?.merchantAddress}</p>
          <p className="text-gray-500 text-md md:text-lg tracking-wide text-left">{product?.merchantEmail}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
