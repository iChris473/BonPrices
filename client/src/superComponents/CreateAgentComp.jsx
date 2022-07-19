
import { XCircleIcon } from "@heroicons/react/outline";
import { CameraIcon, XIcon } from "@heroicons/react/solid";
import { useState, useRef, useContext } from "react";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import storage from "../firebase.js"
import { publicRequest } from "../axioMethod.js";

export default function CreateAgentCommp() {

  const title = useRef()
  const desc = useRef()
  const price = useRef()
  const unit = useRef()
  const state = useRef()
  const chooseImg = useRef()

  const [allPictures, setAllPictures] = useState([])
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [err, setErr] = useState('')

  const handleImage = e => {
    // If no image selected, return
    if (!/^image\//.test(e.target.files[0].type)) {
        console.log(`File ${e.target.files[0].name} is not an image.`);
        return false;
    }
    // console.log(allPictures)
    setAllPictures([...allPictures, e.target.files[0]])
    setFile(e.target.files[0])
  } 

  const timeout = () => {
    setTimeout(() => {
      setErr('');
      setSuccess(false)
    }, 8000);
  } 

  const handleSubmit = async e => {

    e.preventDefault()

    if(!title || !desc || !price || !unit || (allPictures.length == 0)){
      setErr('Please fill all fields')
      window.location.href = '#mainForm'
      timeout()
      return
    }

    setLoading(true)
    
    const newProduct = {
      title: title.current.value, 
      description: desc.current.value,
      price: price.current.value,
      unit: unit.current.value,
      state: state.current.value
    }

    let totalPictures = []
    console.log(newProduct)

    try {
      
      for(const pic of allPictures){
        const firebaseImageRef = ref(storage, `${pic.name}`);
        const metadata = {
          contentType: "image/jpeg",
        };
        // const uploadTask = uploadBytes(storageRef, file, metadata)
        await uploadBytes(firebaseImageRef, pic, metadata).then(
          async (snapshot) => {
            const downloadURL = await getDownloadURL(firebaseImageRef);
            totalPictures.push(downloadURL)
            newProduct.picture = totalPictures;
          }
        );
      
      }  
      console.log(newProduct)
      await publicRequest.post("/product/create", newProduct)
      setLoading(false)
      setSuccess(true)
      window.location.href = '#mainForm'
      setErr('')
      timeout()

      // CLEAR FIELDS
      setAllPictures([])
      title.current.value = ''
      desc.current.value = ''
      price.current.value = ''
      unit.current.value = ''
      state.current.value = ''
      
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
              <input required ref={title} type="email" className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter agent's email" />
          </div>
          {/* AGENT PASSWORD */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">Create Password</p>
              <input required ref={desc} type="password" className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="********" />
          </div>
          {/* PRODUCT DESCRIPTION */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">Confirm Password</p>
              <input required ref={desc} type="password" className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="********" />
          </div>
      </div>
      {/* SUBMIT BUTTON */}
      <button className="bg-gray-800 font-bold text-white p-5 rounded-md my-10 block w-full mx-auto max-w-[750px] shadow-lg">{loading ? 'Loading...' : 'CREATE AGENT'}</button>
    </form>
    </div>
  );
}
