
import { useState } from "react";
import SuperNavbar from "../superComponents/SuperNavbar";
import SuperSidebar from "../superComponents/SuperSidebar";
import SuperProductTable from "../superComponents/SuperProductTable";


export default function MySuperField() {
  
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
        <div className="pt-32 col-span-7 m-5">
          <h1 className="text-left text-2xl border-b border-green-400 font-bold text-green-600 m-10 w-[97%] m-5 max-w-[1000px] mx-auto pb-2">Total Agents </h1>
          <SuperProductTable type={'personal'} />
        </div>
    </div>
  )
}
