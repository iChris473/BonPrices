import { UserCircleIcon } from "@heroicons/react/solid";


export default function ProfileComponent() {
  return (
    <div className="mt-10 w-full">
      <div className="flexCenter flex-col gap-3">
        <UserCircleIcon className="text-gray-500 h-20 md:h-28" />
        <h1 className="text-gray-600 font-bold text-xl md:text-2xl">WELCOME iCHRIS ANGELO</h1>
      </div>
      <form className="flexCenter mx-auto w-full flex-col max-w-[800px] shadow-lg p-5 rounded-md border border my-10 bg-gray-100 bg-opacity-60 flex-col gap-7">
        {/* FULL NAME */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-md md:text-lg text-green-600">Name</p>
              <input type="text" disabled defaultValue="iChris Angelo" className="outline-none w-full max-w-[700px] border-b border-green-200 pb-2 bg-transparent text-gray-500"  />
          </div>
        {/* STATE */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-md md:text-lg text-green-600">State</p>
              <input type="text" disabled defaultValue="F.C.T. Abuja" className="outline-none w-full max-w-[700px] border-b border-green-200 pb-2 bg-transparent text-gray-500"  />
          </div>
        {/* LOCAL GOVERNMENT */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-md md:text-lg text-green-600">Local Government Area</p>
              <input type="text" disabled defaultValue="Gwagwalada" className="outline-none w-full max-w-[700px] border-b border-green-200 pb-2 bg-transparent text-gray-500"  />
          </div>
        {/* PHONE NUMBER */}
          <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-md md:text-lg text-green-600">Phone Number</p>
              <input type="text" disabled defaultValue="09134534917" className="outline-none w-full max-w-[700px] border-b border-green-200 pb-2 bg-transparent text-gray-500"  />
          </div>
          {/* SUBMIT BUTTON */}
          <button className="bg-gray-800 font-bold text-white p-5 rounded-md w-full my-10 block w-full mx-auto max-w-[750px] shadow-lg">Edit Profile</button>
      </form>
    </div>
  )
}
