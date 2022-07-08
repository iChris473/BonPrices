import React from "react";
import Navbar from "../components/Navbar";
import { SearchIcon, LocationMarkerIcon } from "@heroicons/react/outline";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {

    const navigate = useNavigate()

    return (
        <div className="min-h-screen relative">
            {/* BACKGROUND IMAGE */}
            <img
                src={require("../images/whiteAdminBg.jpg")}
                className="absolute -z-10 w-screen h-full opacity-70 object-cover"
                alt=""
            />
            <div className="flexCenter flex-col mb-32">
                {/* LOGO SECTION */}
                <div className="flexCenter flex-col">
                    <img
                        src={require("../images/plogo.png")}
                        className="mt-10 h-52 object-contain"
                        alt=""
                    />
                    <h1 className="text-[#a8039b] font-extrabold text-4xl">
                        Admin Sign in
                    </h1>
                </div>
                {/* INPUT SECTION */}
                <form onSubmit={e => e.preventDefault()} className="w-full mx-auto flexCenter flex-col">
                    <p className="text-gray-500 font-bold text-md md:text-lg text-left mt-5 w-[90%] mx-auto max-w-[700px]">
                        Email*
                    </p>
                    <input
                        type="text"
                        placeholder="Enter a valid email"
                        className="w-full outline-none text-gray-500 bg-transparent border border-[#d6a7d2] w-[90%] mx-auto max-w-[700px] p-3 rounded-lg"
                    />
                    <p className="text-gray-500 font-bold text-md md:text-lg text-left mt-5 w-[90%] mx-auto max-w-[700px]">
                        Password*
                    </p>
                    <input
                        type="Password"
                        placeholder="******"
                        className="w-full outline-none text-gray-500 bg-transparent border border-[#d6a7d2] w-[90%] mx-auto max-w-[700px] p-3 rounded-lg"
                    />
                    {/* DESCRIPTION SECTION */}
                    <button onClick={() => navigate("/admin")} className="py-4 px-10 font-extrabold hover:animate-pulse rounded-lg bg-pink-700 text-lg text-white w-[90%] mx-auto max-w-[700px] my-10">Sign in</button>
                </form>
            </div>
        </div>
    );
}
