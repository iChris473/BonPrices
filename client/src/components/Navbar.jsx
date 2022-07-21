import {useState, useRef } from 'react'
import {SearchIcon, LocationMarkerIcon} from '@heroicons/react/outline'
import Footer from '../components/Footer';
import { useNavigate, Link } from 'react-router-dom';
import { publicRequest } from '../axioMethod'

export default function Navbar({setRefresh, refresh}) {

    const [searchInput, setSearchInput] = useState([])

  const query = useRef()

  const state = useRef()

  const navigate = useNavigate()

  const getSuggestions = async e => {

    if(!e.target.value){
      setSearchInput([])
      return
    }

    try {
      
      const res = await publicRequest.get(`/product/search?q=${e.target.value}`)
    
      setSearchInput(res.data)

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="fixed top-0 w-full flex flex-col sm:flex-row items-center justify-between sm:p-5 pb-4 bg-gray-100 shadow-md">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img
            src={require("../images/plogo.png")}
            className="h-20 object-contain sm:mt-2 pt-2"
            alt=""
          />
        </Link>
      </div>
      {/* SEARCH SECTION */}
      <div className="flex-1 w-full">
        <p className="text-gray-500 font-semibold text-sm md:text-md text-right w-[70%] mx-auto max-w-[600px]">
          Filter location
        </p>
        <form onSubmit={e => { e.preventDefault(); navigate(`/search#?q=${query.current.value}${state.current.value && "&state="+state.current.value}`); setRefresh(!refresh); setSearchInput([]); query.current.value = "" }} className='flexCenter w-[90%] mx-auto max-w-[700px]'>
          <div className='border border-[#d6a7d2] w-[90%] mx-auto max-w-[700px] p-3 rounded-lg flexCenter flex-col'>
            {/* INPUT SECTION */}
            <div className="w-full flexBetween gap-3">
              <input
                type="search"
                ref={query}
                onChange={getSuggestions}
                className="w-full outline-none text-gray-500 bg-transparent"
              />

              <div className="flex items-center justify-end">
                <LocationMarkerIcon className="h-4 text-pink-500" />
                <select ref={state} className="w-20 outline-none text-xs bg-transparent">
                  <option className="text-xs" value="all">
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
            {/* SUGGESTION SECTION */}
            {
              searchInput.length > 0 &&
              <div className='w-full flexCenter flex-between gap-3 flex-col mt-2 border-t border-[#d6a7d2] p-2'>
                {
                  searchInput.map(field => (
                    <div key={field._id} onClick={() => { navigate(`/search#?q=${field.title}${state.current.value && "&state="+state.current.value}`); setRefresh(!refresh); setSearchInput([]); query.current.value = "" }} className='flexCenter w-full hover:bg-gray-500 hover:bg-opacity-10 rounded cursor-pointer p-2'>
                      <SearchIcon className="h-5 text-gray-400" />
                      <p className='w-full flex-1 text-left ml-5'>{field.title}</p>
                    </div>
                  ))
                }
              </div>
            }
          </div>
          <button>
            <SearchIcon className="h-10 cursor-pointer rotate-90 ml-0 text-pink-500" />
          </button>
        </form>

        {/* <div className="flexCenter w-[90%] mx-auto max-w-[700px]">
          <div className="shadow-md border w-full p-3 border-[#d6a7d2] rounded-lg flexBetween gap-3">
            <SearchIcon className="h-5 text-gray-400" />
            <form className="w-full">
              <input
                type="search"
                className="w-full outline-none text-gray-500 bg-transparent"
              />
            </form>
            <div className="flex items-center justify-end">
              <LocationMarkerIcon className="h-4 text-pink-500" />
            </div>
          </div>
          <SearchIcon className="h-10 cursor-pointer rotate-90 ml-0 text-pink-500" />
        </div> */}
      </div>
    </div>
  );
}
