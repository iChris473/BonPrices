import React from 'react'

export default function Navbar() {
  return (
    <div className='flex items-center justify-between'>
        <img src={require('../images/plogo.png')} className='h-32 object-contain' alt="" />
        <div>
            <p>Sign up</p>
            <p>Sign in</p>
        </div>
    </div>
  )
}
