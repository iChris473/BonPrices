
import { useState } from "react";
import AdminNavbar from "../adminComponents/AdminNavbar";
import AdminSidebar from "../adminComponents/AdminSidebar";
import AddProduct from "../adminComponents/AddProduct";
import EditAdminEmail from "../adminComponents/EditAdminEmail";


export default function AdminEmail() {
  
  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <div className={`${mobileMenu && '!h-screen overflow-hidden'} min-h-screen sm:grid grid-cols-9 relative`}>
      <img src={require("../images/whiteAdminBg.jpg")} className="absolute -z-10 w-screen h-full opacity-70 object-cover" alt="" />
        {/* NAVBAR */}
        <AdminNavbar mobile={mobileMenu} setMobile={setMobileMenu} />
        {/* SIDEBAR */}
        <div className={`sm:block ${mobileMenu ? "block" : "hidden"} col-span-2`}>
          <AdminSidebar mobile={mobileMenu} setMobile={setMobileMenu} />
        </div>
        {/* MAIN SECTION */}
        <div className="pt-32 col-span-7 m-1">
          <EditAdminEmail />
        </div>
    </div>
  )
}
