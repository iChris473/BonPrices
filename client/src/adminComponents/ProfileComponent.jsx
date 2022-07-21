import { ArrowLeftIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/solid";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../axioMethod";


export default function ProfileComponent() {

  const [agent, setAgent] = useState([])

  const [success, setSuccess] = useState(false)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(true)

  const name = useRef()
  const lga = useRef()
  const state = useRef()
  const phone = useRef()
  const residentState = useRef()
  const address = useRef()

  // GET AGENT DATA
  useEffect(() => {

    const getUserInfo = async () => {
      setLoadingProfile(true)
      try {

        const res = await publicRequest.get('/agent/get/')
        console.log(res.data)
        setAgent(res.data)
        setLoadingProfile(false)
      } catch (error) {
    
        console.log(error)
        setLoadingProfile(false)
      
      }  

    }

    getUserInfo()

  }, [])

    // TIMEOUT FUNCTION
    const timeout = () => {
      setTimeout(() => {
        setErr('');
        setSuccess(false)
      }, 8000);
    } 
  
  
  // SUBMIT FORM FUNCTION
  const handleSubmit = async e => {

    e.preventDefault()

    setLoading(true)

    const newAgent = {
      name: name.current.value,
      lga: lga.current.value,
      state: state.current.value,
      phone: phone.current.value,
      address: address.current.value,
      residentState: residentState.current.value,
    }

    try {

      await publicRequest.put("/agent/update/", newAgent)
      setLoading(false)
      setSuccess(true)
      window.location.href = '#mainForm'
      setErr('')
      timeout()
      
    } catch (error) {

      setLoading(false)
      setSuccess(false)
      setErr(error.response.data)
      window.location.href = '#mainForm'
      timeout()
      console.log(error)

    }

  }

  return (
    <div id="mainForm" className="mt-10 w-full">
      <div className="flexCenter flex-col gap-3">
        <UserCircleIcon className="text-gray-500 h-20 md:h-28" />
        <h1 className="text-gray-600 font-bold text-xl md:text-2xl">WELCOME</h1>
      </div>
      {
        loadingProfile ?
        <div className='flex center w-full flexCenter my-10'>
          <img src={require("../images/load.gif")} className=" h-[300px] opacity-60 rounded-xl object-contain" alt="" />
        </div> :
      <form onSubmit={handleSubmit} className="hidden flexCenter mx-auto w-full flex-col max-w-[800px] shadow-lg p-5 rounded-md border my-10 bg-gray-100 bg-opacity-60 gap-7">
        {success && <p className="text-white bg-green-500 p-4 rounded-md w-full font-bold text-xl text-center mt-5">Profile Updated Successfully</p> }
        {err && <p className="text-white bg-red-500 p-4 rounded-md w-full font-bold text-xl text-center mt-5">{err}</p> }
        {/* FULL NAME */}
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <p className="font-semibold text-md md:text-lg text-green-600">
            Name
          </p>
          <input
            ref={name}
            type="text"
            defaultValue={agent?.name}
            placeholder="Full Name"
            className="outline-none w-full max-w-[700px] border-b border-green-200 pb-2 bg-transparent text-gray-500"
          />
        </div>
        {/* STATE */}
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <p className="font-semibold text-md md:text-lg text-green-600">
            State of Origin
          </p>
          <input
            ref={state}
            type="text"
            defaultValue={agent?.state}
            placeholder="State of Origin"
            className="outline-none w-full max-w-[700px] border-b border-green-200 pb-2 bg-transparent text-gray-500"
          />
        </div>
        {/* LOCAL GOVERNMENT */}
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <p className="font-semibold text-md md:text-lg text-green-600">
            Local Government Area
          </p>
          <input
            ref={lga}
            type="text"
            defaultValue={agent?.lga}
            placeholder="L.G.A."
            className="outline-none w-full max-w-[700px] border-b border-green-200 pb-2 bg-transparent text-gray-500"
          />
        </div>
        {/* PHONE NUMBER */}
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <p className="font-semibold text-md md:text-lg text-green-600">
            Phone Number
          </p>
          <input
            ref={phone}
            type="text"
            defaultValue={agent?.phone}
            placeholder="Phone Number"
            className="outline-none w-full max-w-[700px] border-b border-green-200 pb-2 bg-transparent text-gray-500"
          />
        </div>
        {/* STATE OF RESIDENT */}
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <p className="font-semibold text-md md:text-lg text-green-600">
            State of Resident
          </p>
          <input
            ref={residentState}
            type="text"
            defaultValue={agent?.residentState}
            placeholder="State of residence"
            className="outline-none w-full max-w-[700px] border-b border-green-200 pb-2 bg-transparent text-gray-500"
          />
        </div>
        {/* PHONE NUMBER */}
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <p className="font-semibold text-md md:text-lg text-green-600">
            Address
          </p>
          <input
            ref={address}
            type="text"
            defaultValue={agent?.address}
            placeholder="Current address"
            className="outline-none w-full max-w-[700px] border-b border-green-200 pb-2 bg-transparent text-gray-500"
          />
        </div>
        {/* SUBMIT BUTTON */}
        <button className="bg-gray-800 font-bold text-white p-5 rounded-md w-full my-10 block w-full mx-auto max-w-[750px] shadow-lg">
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      }
        <Link to="/admin">
          <div className="border-blue-300 pb-2 border-b my-10 w-full mx-auto max-w-[250px] flexCenter gap-3">
            <ArrowLeftIcon className="text-blue-500 h-5" />
            <p className="font-semibold text-blue-500 ">Return</p>
          </div>
        </Link>
    </div>
  );
}
