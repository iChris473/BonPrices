
import { XCircleIcon } from "@heroicons/react/outline";
import { CameraIcon, XIcon } from "@heroicons/react/solid";
import { useState, useRef, useContext } from "react";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import storage from "../firebase.js"
import { publicRequest } from "../axioMethod.js";

export default function AddProduct() {

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
        Add New Field
      </h1>
    <form onSubmit={handleSubmit} className="bg-gray-50 p-5 rounded-md shadow-lg w-full mx-auto max-w-[850px] bg-opacity-60">
      {/* TEXT AND INPUT SECTION */}
      <div className="shadow-lg rounded-md px-5 py-10 border-md flexCenter gap-8 flex-col w-full mx-auto max-w-[800px] bg-gray-50 bg-opacity-80">
          {success && <p className="text-white bg-green-500 p-4 rounded-md w-full font-bold text-xl text-center mt-5">Product Uploaded Successfully</p> }
          {err && <p className="text-white bg-red-500 p-4 rounded-md w-full font-bold text-xl text-center mt-5">{err}</p> }
          {/* PRODUCT TITLE */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">Title</p>
              <input ref={title} type="text" className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter product title" />
          </div>
          {/* PRODUCT DESCRIPTION */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">Description</p>
              <textarea ref={desc} type="text" className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter product description" />
          </div>
          {/* PRODUCT PRICE */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">Price (NGN)</p>
              <input ref={price} type="number" className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter product price" />
          </div>
          {/* PRODUCT UNIT */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">Unit</p>
              <input ref={unit} type="text" className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="e.g. square meters, per product, etc" />
          </div>
          {/* PRODUCT STATE */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">State</p>
              <select ref={state} className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent">
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
      <div className="shadow-lg rounded-md px-5 py-10 border-md flexCenter gap-8 flex-col w-full mx-auto max-w-[800px] bg-gray-100 mt-20 bg-opacity-80">
        <h1 className="text-left text-xl border-b border-green-400 font-bold text-green-600 w-full">
            Add Pictures
        </h1>
        {/* RENDER SELECTED PICTURES */}
          {
            allPictures?.map(pic => (
              <div key={pic.name} className="relative flexCenter">
                <XCircleIcon onClick={() => setAllPictures(allPictures.filter(p => p != pic))} className="text-red-500 h-10 absolute top-5 right-5 bg-white cursor-pointer roundedB" />
                <img src={URL.createObjectURL(pic)} alt="Product Img" className="w-[400px] object-contain m-5 shadow-md border rounded-lg" />
              </div>
            ))
          }

        <div  onClick={() => chooseImg.current.click()} className="bg-gray-200 shadow-md border rounded-lg border-green-50  mx-auto w-[95%] h-[400px] max-w-[400px] flexCenter flex-col gap-2">
          <CameraIcon className="text-gray-500 h-10" />
          <p className="text-gray-500 text-center font-bold text-md">Click to add photo</p>
        </div>
        <input
          type="file"
          accept="image/"
          hidden
          ref={chooseImg}
          onChange={handleImage}
        />

      </div>
      {/* SUBMIT BUTTON */}
      <button className="bg-gray-800 font-bold text-white p-5 rounded-md my-10 block w-full mx-auto max-w-[750px] shadow-lg">{loading ? 'Loading...' : 'SUBMIT'}</button>
    </form>
    </div>
  );
}
