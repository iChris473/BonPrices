
import { ArrowLeftIcon, XCircleIcon } from "@heroicons/react/outline";
import { CameraIcon, XIcon } from "@heroicons/react/solid";
import { useState, useRef, useEffect } from "react";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import storage from "../firebase.js"
import { publicRequest } from "../axioMethod.js";
import { Link } from "react-router-dom";

export default function AddProduct() {

  const agentName = useRef()
  const email = useRef()
  const phone = useRef()
  const lga = useRef()
  const state = useRef()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [err, setErr] = useState('')
  
  const [productData, setProductData] = useState([])
  const [deleteProduct, setDeleteProduct] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState(true)

  const agentId = window.location.search.split("=")[1]
  // GET PRODUCT DATA
  useEffect(() => {
    
    const getAgentProduct = async () => {
      
      setLoadingProduct(true)
      
        try {

          const res = await publicRequest.get(`/super/agent/one/${agentId}`)
          setProductData(res.data)
          setLoadingProduct(false)
          
        } catch (error) {
        
          setLoadingProduct(false)
          console.log(error)
        
        }  

    }

    getAgentProduct()

  }, [refresh])

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
    
    var newProduct = {
        name: agentName.current.value, 
        phone: phone.current.value,
        lga: lga.current.value,
        state: state.current.value
    }
    
    if(productData?.email !== email.current.value){
        newProduct.email = email.current.value
    }
    
    try {

      const res = await publicRequest.put(`/super/agent/update/${agentId}`, newProduct)
      console.log(res.data)
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

  const handleDeleteProduct = async () => {
    // confirm("Are you sure you want to log out?");
   if (window.confirm("Confirm Delete?")) {
      try {
        await publicRequest.delete(`/agent/delete/auth/${agentId}`)
        setDeleteProduct(true)
    } catch (error) {
        console.log(error)
    }

    } else { 
      return;
    }
  }

  const deactivateAccount = async () => {

    if (window.confirm("Deactivate Account?")) {
      
      try {

          await publicRequest.put(`/super/agent/update/${agentId}`, {deactivated: true})
          setRefresh(!refresh)

      } catch (error) {
          setErr(error.response.data)
          window.location.href = '#mainForm'
      }

    } else { 
      return;
    }

  }

  const activateAccount = async () => {

    if (window.confirm("Activate Account?")) {
      
      try {
          
        await publicRequest.put(`/super/agent/update/${agentId}`, {deactivated: false})
        setRefresh(!refresh)

      } catch (error) {
        setErr(error.response.data)
        window.location.href = '#mainForm'

      }

    } else { 
      return;
    }

  }

  return (
    <div id="mainForm">
      <div className="flex items-center justify-start sm:justify-between flex-col sm:flex-row w-[98%] mx-auto gap-2 sm:gap-5 m-5 my-10">
        <h1 className="w-full sm:w-auto text-left text-2xl border-b border-pink-300 flex-1 mx-auto pb-2 font-bold text-pink-700">
          Update Agent
        </h1>
        <div className="flex items-center justify-end gap-2 sm:w-auto w-full">
          <button onClick={productData?.deactivated ? activateAccount : deactivateAccount} className={`border ${productData?.deactivated ? 'bg-green-500' : "bg-pink-500"} py-1 px-5 rounded-md text-white text-sm font-semibold`}>{productData?.deactivated ? "Activate Account" : "Deactivate Account"}</button>
          <button onClick={handleDeleteProduct} className="border border-red-500 py-1 px-5 rounded-md text-gray-600 text-md font-semibold">Delete</button>
        </div>
      </div>
      {
        loadingProduct ? 
        <div className='flex center w-full flexCenter my-10'>
          <img src={require("../images/load.gif")} className=" h-[300px] opacity-60 rounded-xl object-contain" alt="" />
        </div> :
        <form onSubmit={handleSubmit} className="bg-gray-50 p-5 rounded-md shadow-lg w-full mx-auto max-w-[850px] bg-opacity-60">
          {/* TEXT AND INPUT SECTION */}
          <div className="shadow-lg rounded-md px-5 py-10 border-md flexCenter gap-8 flex-col w-full mx-auto max-w-[800px] bg-gray-50 bg-opacity-80">
              {success && <p className="text-white bg-green-500 p-4 rounded-md w-full font-bold text-xl text-center mt-5">Agent Updated Successfully</p> }
              {err && <p className="text-white bg-red-500 p-4 rounded-md w-full font-bold text-xl text-center mt-5">{err}</p> }
              {/* PRODUCT agentName */}
              <div className="w-full flex flex-col items-start justify-center gap-4">
                  <p className="font-semibold text-lg md:text-xl text-gray-600">Name</p>
                  <input ref={agentName} type="text" required defaultValue={productData?.name} className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter agent name" />
              </div>
              {/* PRODUCT DESCRIPTION */}
              <div className="w-full flex flex-col items-start justify-center gap-4">
                  <p className="font-semibold text-lg md:text-xl text-gray-600">Email</p>
                  <textarea ref={email} type="text" required defaultValue={productData?.email} className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter agent email" />
              </div>
              {/* PRODUCT phone */}
              <div className="w-full flex flex-col items-start justify-center gap-4">
                  <p className="font-semibold text-lg md:text-xl text-gray-600">Phone Number</p>
                  <input ref={phone} type="number" required defaultValue={productData?.phone} className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter agent phone number" />
              </div>
              {/* PRODUCT lga */}
              <div className="w-full flex flex-col items-start justify-center gap-4">
                  <p className="font-semibold text-lg md:text-xl text-gray-600">LGA</p>
                  <input ref={lga} type="text" required defaultValue={productData?.lga} className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter agent lga" />
              </div>
              {/* PRODUCT STATE */}
              <div className="w-full flex flex-col items-start justify-center gap-4">
                  <p className="font-semibold text-lg md:text-xl text-gray-600">State</p>
                  <select ref={state} className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent">
                    <option className="text-xs" value="All">
                      {productData?.state}
                    </option>
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
          {/* SUBMIT BUTTON */}
          <button className="bg-gray-800 font-bold text-white p-5 rounded-md my-10 block w-full mx-auto max-w-[750px] shadow-lg">{loading ? 'Loading...' : 'SAVE CHANGES'}</button>
        </form>
      }
      <Link to="/admin/myfields">
        <div className="border-blue-300 pb-2 border-b my-10 w-full mx-auto max-w-[250px] flexCenter gap-3"> <ArrowLeftIcon className="text-blue-500 h-5" /> <p className="font-semibold text-blue-500 "> Return</p></div>
      </Link>
      </div>
  );
}
