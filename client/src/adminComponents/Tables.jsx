
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { publicRequest } from '../axioMethod'

export default function Tables() {

    const [productData, setProductData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    
        const getAgentProduct = async () => {
            setLoading(true)
            try {

                const res = await publicRequest.get("/product/agent/")
                setProductData(res.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }        
        }

        getAgentProduct()
    
    }, [])

    return (
        <div className='w-[97%] mx-auto max-w-[1000px] bg-gray-50 p-5'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                {/* SEARCH SECTION */}
                <div className="p-4">
                    <label for="table-search" className="sr-only">Search</label>
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 sdark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  sdark:bg-gray-700 sdark:border-gray-600 sdark:placeholder-gray-400 sdark:focus:ring-blue-500 sdark:focus:border-blue-500" placeholder="Search for items" />
                    </div>
                </div>
                {/* MAIN TABLE SECTION */}
                {
                    loading ? 
                    <div className='flex center w-full flexCenter my-10'>
                        <img src={require("../images/load.gif")} className=" h-[240px] opacity-60 rounded-lg object-contain" alt="" />
                    </div> : 
                    <table className="w-full text-sm text-left text-gray-500 sdark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sdark:bg-gray-700 sdark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Picture
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Unit
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Agent Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productData?.map(data => (
                                    <tr key={data._id} className="border-b sdark:bg-gray-800 sdark:border-gray-700 odd:bg-white even:bg-gray-50 odd:sdark:bg-gray-800 even:sdark:bg-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 sdark:text-white whitespace-nowrap">
                                            <img src={data.picture} className="h-[50px] w-[50px] roundedB object-cover" alt="" />
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 sdark:text-white whitespace-nowrap">
                                            {data.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            <p className='w-[200px] truncate'>{data.description}</p>
                                        </td>
                                        <td className="px-6 py-4">{data.price}</td>
                                        <td className="px-6 py-4">{data.unit}</td>
                                        <td className="px-6 py-4">{data.agentEmail || "N/A"}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Link to={`/admin/update?id=${data._id}`}>
                                                <p className="font-medium text-blue-600 sdark:text-blue-500 hover:underline">Edit</p>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
                {/* PAGINATE SECTION */}
            </div>
            <div className='flex items-center gap-4 justify-end w-full my-7'>
                <ArrowLeftIcon className='h-7 text-gray-500' />
                <h1 className='text-2xl font-extrabold text-gray-600'>1</h1>
                <ArrowRightIcon className='h-7 text-gray-500' />
            </div>
        </div>
    )
}
