
import { XCircleIcon } from "@heroicons/react/outline";
import { CameraIcon, XIcon } from "@heroicons/react/solid";
import { useState, useRef, useContext } from "react";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import storage from "../firebase.js"
import { publicRequest } from "../axioMethod.js";

export default function CreateAgentCommp() {

  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [err, setErr] = useState('')


  const timeout = () => {
    setTimeout(() => {
      setErr('');
      setSuccess(false)
    }, 8000);
  } 

  const handleSubmit = async e => {

    e.preventDefault()
    
    if (password.current.value != confirmPassword.current.value) {
      setErr("Passwords doesn't match");
      timeout();
      return;
    }

    setLoading(true)
    
    const newProduct = {
      email: email.current.value,
      password: password.current.value
    }

    try {
       
    
      await publicRequest.post("/agent/create", newProduct)
      setLoading(false)
      setSuccess(true)
      window.location.href = '#mainForm'
      setErr('')
      timeout()

      // CLEAR FIELDS
      setAllPictures([])
      email.current.value = ''
      password.current.value = ''
      confirmPassword.current.value = ''
      
      
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
    <div id="mainForm">
      <h1 className="text-left text-2xl border-b border-green-400 w-[94%] mx-auto max-w-[850px] pb-2 font-bold text-green-600 my-10">
        CREATE NEW AGENT
      </h1>
    <form onSubmit={handleSubmit} className="bg-gray-50 p-5 rounded-md shadow-lg w-full mx-auto max-w-[850px] bg-opacity-60">
      {/* TEXT AND INPUT SECTION */}
      <div className="shadow-lg rounded-md px-5 py-10 border-md flexCenter gap-8 flex-col w-full mx-auto max-w-[800px] bg-gray-50 bg-opacity-80">
          {success && <p className="text-white bg-green-500 p-4 rounded-md w-full font-bold text-xl text-center mt-5">Product Uploaded Successfully</p> }
          {err && <p className="text-white bg-red-500 p-4 rounded-md w-full font-bold text-xl text-center mt-5">{err}</p> }
          {/* AGENT EMAIL */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">Agent's Email</p>
              <input required ref={email} type="email" className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter agent's email" />
          </div>
          {/* AGENT PASSWORD */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">Create Password</p>
              <input required ref={password} type="password" className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="********" />
          </div>
          {/* PRODUCT DESCRIPTION */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">Confirm Password</p>
              <input required ref={confirmPassword} type="password" className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="********" />
          </div>
      </div>
      {/* SUBMIT BUTTON */}
      <button className="bg-gray-800 font-bold text-white p-5 rounded-md my-10 block w-full mx-auto max-w-[750px] shadow-lg">{loading ? 'Loading...' : 'CREATE AGENT'}</button>
    </form>
    </div>
  );
}
