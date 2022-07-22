import React from 'react'

export default function Deactivated() {
  return (
    <div className='flexCenter flex-col relative h-screen'>
        <img src={require("../images/whiteAdminBg.jpg")} className="absolute -z-10 w-screen h-full opacity-70 object-cover" alt="" />
        <img src={require("../images/deactivated.png")} className='h-[250px]' alt="" />
        <h1 className='text-xl font-semibold tracking-wide text-gray-700 text-center'>Oops! Your account is currently deactivated</h1>
    </div>
  )
}
