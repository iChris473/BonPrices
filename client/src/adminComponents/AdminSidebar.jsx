import { PlusIcon } from "@heroicons/react/outline";
import { useContext } from "react";
import { Link } from "react-router-dom";
import {publicRequest} from "../axioMethod"
import AuthContext from "../context/AuthContext";

export default function AdminSidebar() {

  const {getLoggedIn} = useContext(AuthContext)

  const logOutFunction = async () => {
    // confirm("Are you sure you want to log out?");
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        const res = await publicRequest.get("/agent/token/delete")
        getLoggedIn()
    } catch (error) {
        console.log(error)
    }

    } else {
      return;
    }
  };
  
  return (
    <div
      className={`flex gap-16 flex-col gap-2 h-full min-h-screen w-[50%] absolute sm:sticky sm:w-full min-w-[170px] p-5 pt-32 mt-7 bg-gray-100 border-r border-gray-200 sm:bg-opacity-50 z-20`}
    >
      <Link to="/admin">
        <div className="flexBetween w-full gap-3">
          <PlusIcon className="text-pink-600 h-5" />
          <p className="text-gray-500 font-semibold flex-1 text-md">Dashboard</p>
        </div>
      </Link>
      <Link to="/admin/newfield">
        <div className="flexBetween w-full gap-3">
          <PlusIcon className="text-pink-600 h-5" />
          <p className="text-gray-500 font-semibold flex-1 text-md">New Product</p>
        </div>
      </Link>
      <Link to="/admin/myfields">
        <div className="flexBetween w-full gap-3">
          <PlusIcon className="text-pink-600 h-5" />
          <p className="text-gray-500 font-semibold flex-1 text-md">Total Product</p>
        </div>
      </Link>
      <Link to="/admin/profile">
        <div className="flexBetween w-full gap-3">
          <PlusIcon className="text-pink-600 h-5" />
          <p className="text-gray-500 font-semibold flex-1 text-md">Profile</p>
        </div>
      </Link>
      <Link to="/admin/password">
        <div className="flexBetween w-full gap-3">
          <PlusIcon className="text-pink-600 h-5" />
          <p className="text-gray-500 font-semibold flex-1 text-md">Password</p>
        </div>
      </Link>
      <Link to="/admin/email">
        <div className="flexBetween w-full gap-3">
          <PlusIcon className="text-pink-600 h-5" />
          <p className="text-gray-500 font-semibold flex-1 text-md">Edit Email</p>
        </div>
      </Link>
      <div onClick={logOutFunction} className="cursor-pointer flexBetween w-full gap-3">
        <PlusIcon className="text-pink-600 h-5" />
        <p className="text-gray-500 font-semibold flex-1 text-md">Log Out</p>
      </div>
    </div>
  );
}
