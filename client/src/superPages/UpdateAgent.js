
import { useState } from "react";
import SuperNavbar from "../superComponents/SuperNavbar";
import SuperSidebar from "../superComponents/SuperSidebar";
import EditAgent from "../superComponents/EditAgent";


export default function UpdateAgent() {
  
  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <div className={`${mobileMenu && '!h-screen overflow-hidden'} min-h-screen sm:grid grid-cols-9 relative`}>
      <img src={require("../images/whiteAdminBg.jpg")} className="absolute -z-10 w-screen h-full opacity-70 object-cover" alt="" />
        {/* NAVBAR */}
        <SuperNavbar mobile={mobileMenu} setMobile={setMobileMenu} />
        {/* SIDEBAR */}
        <div className={`sm:block ${mobileMenu ? "block" : "hidden"} col-span-2`}>
          <SuperSidebar mobile={mobileMenu} setMobile={setMobileMenu} />
        </div>
        {/* MAIN SECTION */}
        <div className="pt-32 col-span-7 m-1">
          <EditAgent />
        </div>
    </div>
  )
}