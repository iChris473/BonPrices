
import React from 'react'

export default function EditAdminPassword() {
    return (
        <div>
            <h1 className="text-left text-2xl border-b border-green-400 w-[94%] mx-auto max-w-[850px] pb-2 font-bold text-green-600 m-10">Edit Email</h1>
            <form className="bg-gray-50 p-5 rounded-md shadow-lg w-[94%] mx-auto max-w-[850px] bg-opacity-60">
                {/* TEXT AND INPUT SECTION */}
                <div className="shadow-lg rounded-md px-5 py-10 border-md flexCenter gap-8 flex-col w-[94%] mx-auto max-w-[800px] bg-gray-50 bg-opacity-80">
                    {/* PRODUCT TITLE */}
                    <div className="w-full flex flex-col items-start justify-center gap-4">
                        <p className="font-semibold text-lg md:text-xl text-gray-600">Old Email</p>
                        <p className="w-full max-w-[700px] border-b border-pink-200 pb-2">bonprices27@gmail.com</p>
                    </div>
                    {/* PRODUCT DESCRIPTION */}
                    <div className="w-full flex flex-col items-start justify-center gap-4">
                        <p className="font-semibold text-lg md:text-xl text-gray-600">New Email</p>
                        <input type="text" className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter new password" />
                    </div>
                    {/* PRODUCT PRICE */}
                    <div className="w-full flex flex-col items-start justify-center gap-4">
                        <p className="font-semibold text-lg md:text-xl text-gray-600">Password</p>
                        <input type="number" className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent" placeholder="Enter password" />
                    </div>
                </div>
                {/* SUBMIT BUTTON */}
                <button className="bg-green-600 font-bold shadow-lg hover:shadow-2xl text-white p-5 rounded-md w-full my-10 block w-[94%] mx-auto max-w-[750px]">UPDATE</button>
            </form>
        </div>
    )
}
