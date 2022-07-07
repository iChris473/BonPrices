import { PlusIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";


export default function AdminSidebar({mobile}) {
  
  return (
    <div
      className={`flex gap-16 flex-col gap-2 h-full min-h-screen w-[20%] absolute sm:sticky sm:w-full min-w-[170px] p-5 pt-32 mt-7 bg-gray-100 border-r border-gray-200 sm:bg-opacity-50 z-20`}
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
          <p className="text-gray-500 font-semibold flex-1 text-md">New Field</p>
        </div>
      </Link>
      <Link to="/admin/myfields">
        <div className="flexBetween w-full gap-3">
          <PlusIcon className="text-pink-600 h-5" />
          <p className="text-gray-500 font-semibold flex-1 text-md">My Fields</p>
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
      <Link to="/admin/newfield">
        <div className="flexBetween w-full gap-3">
          <PlusIcon className="text-pink-600 h-5" />
          <p className="text-gray-500 font-semibold flex-1 text-md">Log Out</p>
        </div>
      </Link>
    </div>
  );
}
