
import { ArrowLeftIcon, XCircleIcon } from "@heroicons/react/outline";
import { CameraIcon, XIcon } from "@heroicons/react/solid";
import { useState, useRef, useEffect } from "react";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import storage from "../firebase.js"
import { publicRequest } from "../axioMethod.js";
import { Link } from "react-router-dom";

export default function AddProduct() {

  const title = useRef()
  const desc = useRef()
  const price = useRef()
  const unit = useRef()
  const state = useRef()
  const merchantAddress = useRef()
  const merchantName = useRef()
  const merchantNumber = useRef()
  const merchantEmail = useRef()
  const chooseImg = useRef()

  const [allPictures, setAllPictures] = useState([])
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [err, setErr] = useState('')
  
  const [productData, setProductData] = useState([])
  const [deleteProduct, setDeleteProduct] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState(true)

  const productId = window.location.search.split("=")[1]
  // GET PRODUCT DATA
  useEffect(() => {
    
    const getAgentProduct = async () => {
      
      setLoadingProduct(true)
      
        try {

          const res = await publicRequest.get(`/product/get/${productId}`)
          setProductData(res.data)
          setAllPictures( (typeof res.data.picture[0] === 'string') ? res.data.picture : res.data.picture[0])
          setLoadingProduct(false)
          
        } catch (error) {
        
          setLoadingProduct(false)
          console.log(error)
        
        }  

    }

    getAgentProduct()

  }, [])

  // HANDLE IMAGE FUNCTION
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
      state: state.current.value,
      merchantName: merchantName.current.value,
      merchantNumber: merchantNumber.current.value,
      merchantAddress: merchantAddress.current.value,
      merchantEmail: merchantEmail.current.value,
    }

    let totalNewPictures = []
    let oldPictures = (typeof productData?.picture[0] === 'string') ? productData?.picture : productData?.picture[0]
    let newPictures = allPictures?.filter(p => !oldPictures?.includes(p))
    let removedPics = oldPictures?.filter(p => !allPictures?.includes(p))

    try {

      if (removedPics.length > 0) {

        removedPics.forEach(async (img) => {
          // delete previous file
          const deleteRef = ref(storage, `${img}`);
          // Delete the file
          deleteObject(deleteRef)
            .then(() => {
              // File deleted successfully
              console.log("old picture deleted");

            })
            .catch((error) => {
              // Uh-oh, an error occurred!
              console.log(error);
            });
        });
      }
      
      for(const pic of newPictures){

        const firebaseImageRef = ref(storage, `${pic.name}`);

        const metadata = {
          contentType: "image/jpeg",
        };

        // const uploadTask = uploadBytes(storageRef, file, metadata)
        await uploadBytes(firebaseImageRef, pic, metadata).then(

          async (snapshot) => {
            const downloadURL = await getDownloadURL(firebaseImageRef);
            totalNewPictures.push(downloadURL)
          }
          
          );
          
        }  

      newProduct.picture = [allPictures?.filter(p => oldPictures?.includes(p)).concat(totalNewPictures)];

      await publicRequest.put(`/product/update/${productId}`, newProduct)
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
        await publicRequest.delete(`/product/delete/${productId}`)
        setDeleteProduct(true)
    } catch (error) {
        console.log(error)
    }

    } else {
      return;
    }
  }


  return (
    <div id="mainForm">
      <div className="flexBetween w-[98%] mx-auto gap-5 m-5">
        <h1 className="text-left text-2xl border-b border-pink-300 flex-1 mx-auto pb-2 font-bold text-pink-700 my-10">
          Update Field
        </h1>
        <button onClick={handleDeleteProduct} className="border border-red-500 py-1 px-5 rounded-md text-gray-600 text-md font-semibold">Delete</button>
      </div>
      {
        loadingProduct ? 
        <div className='flex center w-full flexCenter my-10'>
          <img src={require("../images/load.gif")} className=" h-[300px] opacity-60 rounded-xl object-contain" alt="" />
        </div> :
        <form onSubmit={handleSubmit} className="bg-gray-50 p-5 rounded-md shadow-lg w-full mx-auto max-w-[850px] bg-opacity-60">
          {/* TEXT AND INPUT SECTION */}
          <div className="shadow-lg rounded-md px-5 py-10 border-md flexCenter gap-8 flex-col w-full mx-auto max-w-[800px] bg-gray-50 bg-opacity-80">
              {success && <p className="text-white bg-green-500 p-4 rounded-md w-full font-bold text-xl text-center mt-5">Product Uploaded Successfully</p> }
              {err && <p className="text-white bg-red-500 p-4 rounded-md w-full font-bold text-xl text-center mt-5">{err}</p> }
              {/* PRODUCT TITLE */}
              <div className="w-full flex flex-col items-start justify-center gap-4">
                  <p className="font-semibold text-lg md:text-xl text-gray-600">Title</p>
                  <input required ref={title} type="text" defaultValue={productData?.title} className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter product title" />
              </div>
              {/* PRODUCT DESCRIPTION */}
              <div className="w-full flex flex-col items-start justify-center gap-4">
                  <p className="font-semibold text-lg md:text-xl text-gray-600">Description</p>
                  <textarea ref={desc} type="text" defaultValue={productData?.description} className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter product description" />
              </div>
              {/* PRODUCT PRICE */}
              <div className="w-full flex flex-col items-start justify-center gap-4">
                  <p className="font-semibold text-lg md:text-xl text-gray-600">Price (NGN)</p>
                  <input required ref={price} type="number" defaultValue={productData?.price} className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter product price" />
              </div>
              {/* PRODUCT UNIT */}
              <div className="w-full flex flex-col items-start justify-center gap-4">
                  <p className="font-semibold text-lg md:text-xl text-gray-600">Unit</p>
                  <input required ref={unit} type="text" defaultValue={productData?.unit} className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="e.g. square meters, per product, etc" />
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
              {/* MERCHANT NAME */}
              <div className="w-full flex flex-col items-start justify-center gap-4">
                  <p className="font-semibold text-lg md:text-xl text-gray-600">Merchant's Name</p>
                  <input required ref={merchantName} type="text" defaultValue={productData?.merchantName} className="outline-none w-full max-w-[700px] border-b  border-pink-200 pb-2 bg-transparent" placeholder="Enter merchant's name" />
              </div>
              {/* MERCHANT PHONE NUMBER */}
              <div className="w-full flex flex-col items-start justify-center gap-4">
                  <p className="font-semibold text-lg md:text-xl text-gray-600">Merchant's Number</p>
                  <input required ref={merchantNumber} type="text" defaultValue={productData?.merchantNumber} className="outline-none w-full max-w-[700px] border-b  border-pink-200 pb-2 bg-transparent" placeholder="Enter merchant's number" />
              </div>
              {/* MERCHANT ADDRESS */}
              <div className="w-full flex flex-col items-start justify-center gap-4">
                  <p className="font-semibold text-lg md:text-xl text-gray-600">Merchant's Address</p>
                  <input required ref={merchantAddress} type="text" defaultValue={productData?.merchantAddress} className="outline-none w-full max-w-[700px] border-b  border-pink-200 pb-2 bg-transparent" placeholder="Enter merchant's address" />
              </div>
              {/* MERCHANT EMAIL */}
              <div className="w-full flex flex-col items-start justify-center gap-4">
                  <p className="font-semibold text-lg md:text-xl text-gray-600">Merchant's Email(optional)</p>
                  <input ref={merchantEmail} type="text" defaultValue={productData?.merchantEmail} className="outline-none w-full max-w-[700px] border-b  border-pink-200 pb-2 bg-transparent" placeholder="Enter merchant's email" />
              </div>
          </div>
          {/* IMAGE SECTION */}
          <div className="shadow-lg rounded-md px-5 py-10 border-md flexCenter gap-8 flex-col w-full mx-auto max-w-[800px] bg-gray-100 mt-20 bg-opacity-80">
            <h1 className="text-left text-xl border-b border-green-400 font-bold text-green-600 w-full">
                Update Pictures
            </h1>
            {/* RENDER SELECTED PICTURES */}
              {
                  allPictures?.map(pic => (
                  <div key={pic?.name || pic} className="relative flexCenter">
                    <XCircleIcon onClick={() => setAllPictures(allPictures.filter(p => p != pic))} className="text-red-500 h-10 absolute top-5 right-5 bg-white cursor-pointer roundedB" />
                    <img src={pic?.name ? URL.createObjectURL(pic) : pic} alt="Product Img" className="w-[400px] object-contain m-5 shadow-md border rounded-lg" />
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
      }
      <Link to="/admin/myfields">
        <div className="border-blue-300 pb-2 border-b my-10 w-full mx-auto max-w-[250px] flexCenter gap-3"> <ArrowLeftIcon className="text-blue-500 h-5" /> <p className="font-semibold text-blue-500 "> Return</p></div>
      </Link>
      </div>
  );
}
