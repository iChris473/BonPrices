import React, { useContext, useRef, useState } from "react";
import {publicRequest} from "../axioMethod"
import SuperContext from "../context/SuperContext";

export default function SuperLogin() {

    const {getLoggedIn, appLoading} = useContext(SuperContext)

    const email = useRef()
    const password = useRef()
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')

    const timeout = () => {
        setTimeout(() => {
          setErr(false);
        }, 3000);
    } 

    const handleSubmit = async e => {

        e.preventDefault()
       
        if(!email.current.value || !password.current.value){
            setErr("Please fill all fields")
            return
        }

        setLoading(true)

        const newAgent = {
            email: email.current.value,
            password: password.current.value
        }

        try {

            const res = await publicRequest.post("/super/auth/login", newAgent)
            setLoading(false)
            getLoggedIn()
            console.log(res.data)
            console.log("SUCCESS")
            
        } catch (error) {
            console.log(error)
            setErr(error.response.data)
            setLoading(false)
            timeout()
        }

    }

    return (
        <div className="min-h-screen relative">
            {/* BACKGROUND IMAGE */}
            <img src={require("../images/whiteAdminBg.jpg")} className="absolute -z-10 w-screen h-full opacity-70 object-cover" alt="" />
            {appLoading ?
            <div className='flex-col gap-4  w-full flexCenter'>
                <img src={require("../images/plogo.png")} className="mt-10 h-52 object-contain" alt="" />
                <img src={require("../images/load.gif")} className=" h-[240px] opacity-50 rounded-lg object-contain" alt="" />
            </div>  :
            <div className="flexCenter flex-col mb-32">
                {/* LOGO SECTION */}
                <div className="flexCenter flex-col">
                    <img
                        src={require("../images/plogo.png")}
                        className="mt-10 h-32 object-contain"
                        alt=""
                    />
                    <h1 className="text-gray-700 font-extrabold text-4xl">
                        Super Admin
                    </h1>
                </div>
                {err && <p className="text-red-500 text-lg font-semibold text-center mt-7">{err}</p>}
                {/* INPUT SECTION */}
                <form onSubmit={handleSubmit} className="w-[95%] max-w-[600px] shadow-md border mx-auto flexCenter flex-col mt-10 bg-gray-50 bg-opacity-60">
                    <p className="text-gray-500 font-bold text-md md:text-lg text-left mt-5 w-[90%] mx-auto">
                        Email*
                    </p>
                    <input
                        ref={email}
                        required
                        type="email"
                        placeholder="Enter a valid email"
                        className="outline-none text-gray-500 bg-transparent border border-black w-[94%] mx-auto p-3 rounded-lg"
                    />
                    <p className="text-gray-500 font-bold text-md md:text-lg text-left mt-5 w-[90%] mx-auto">
                        Password*
                    </p>
                    <input
                        ref={password}
                        required
                        type="Password"
                        placeholder="******"
                        className="outline-none text-gray-500 bg-transparent border border-black w-[94%] mx-auto p-3 rounded-lg"
                    />
                    {/* DESCRIPTION SECTION */}
                    <button type="submit" className="py-4 px-10 font-extrabold hover:animate-pulse rounded-lg bg-gray-700 text-lg text-white w-[90%] mx-auto my-10">{loading ? "Loading..." : 'Sign in'}</button>
                </form>
            
            </div>
            }
        </div>
    );
}
