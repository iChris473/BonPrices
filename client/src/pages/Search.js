
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Result from "../components/Result";
import { publicRequest } from '../axioMethod'

export default function Search() {
  
  const [isLloading, setIsLoading] = useState(true)

  const [allResult, setAllResult] = useState([])

  const [refresh, setRefresh] = useState(false)

  function getParameterByName(name, url = window.location.href) {

    name = name.replace(/[\[\]]/g, '\\$&');

    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);

    if (!results) return null;

    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));

  }


  useEffect(async () => {

    let query = getParameterByName('q')
    
    let state = getParameterByName('state')
  
    setIsLoading(true)
    
    try {
      
      const res = await publicRequest.get(`/product/search?q=${query}&state=${state}`)

      setAllResult(res.data)
      setIsLoading(false)
      
    } catch (error) {
      
      console.log(error)
      setIsLoading(false)

    }

  }, [refresh])

  return (
    <div className="relative">
      <img src={require("../images/whiteBg.jpg")} className="absolute -z-10 w-screen h-full opacity-40 object-cover" alt="" />
      <Navbar setRefresh={setRefresh} refresh={refresh} />
      {/* SEARCH RESULTS */}
      <div className="min-h-screen pt-44 w-full mx-auto m-5 p-5">
        {
          isLloading ? <Loading /> : (
            <div className="space-y-8">
              {
                allResult.map(result => (
                  <Result key={result._id} data={result} />
                ))
              }
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
