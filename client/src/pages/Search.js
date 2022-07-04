import { useEffect } from "react";
import { useState } from "react";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Result from "../components/Result";


export default function Search() {
  
  const [isLloading, setIsLoading] = useState(true)

  useEffect(() => {

    setTimeout(() => {
      setIsLoading(false)
    }, [3000])

  }, [])

  return (
    <div className="relative min-h-screen">
        <img
        src={require("../images/whiteBg.jpg")}
        className="absolute -z-10 w-screen h-full opacity-40 object-cover"
        alt=""
      />
      <Navbar />
      {/* SEARCH RESULTS */}
      <div className="mt-7 flex items-center justify-center w-full mx-auto m-5 p-5">
        {
          isLloading ? <Loading /> : (
            <div className="space-y-6">
              <Result />
              <Result />
              <Result />
              <Result />
              <Result />
            </div>
          )
        }
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  )
}
