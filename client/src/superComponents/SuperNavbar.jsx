import { MenuAlt3Icon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";


export default function SuperNavbar({mobile, setMobile}) {
  
  return (
    <div className="fixed top-0 w-full flex items-center justify-between p-2 sm:p-5 pb-4 bg-gray-100 shadow-md z-50 bg-opacity-90">
      <Link to="/super">
        <div className="flex items-center justify-center">
          <img
            src={require("../images/plogo.png")}
            className="h-20 object-contain"
            alt=""
          />
          <h1 className="russo text-gray-500 text-2xl font-semobild">Super</h1>
        </div>
      </Link>
      <div>
        {mobile ? (
          <XIcon
            onClick={() => setMobile(false)}
            className="h-10 text-gray-500 sm:hidden cursor-pointer"
          />
        ) : (
          <MenuAlt3Icon
            onClick={() => setMobile(true)}
            className="h-10 text-gray-500 sm:hidden cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
