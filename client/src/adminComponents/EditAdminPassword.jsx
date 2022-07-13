import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../axioMethod";

export default function EditAdminPassword() {

  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const newPassword = useRef();
  const oldPassword = useRef();
  const password = useRef();

  // TIMEOUT FUNCTION
  const timeout = () => {
    setTimeout(() => {
      setErr("");
      setSuccess(false);
    }, 7000);
  };

  // SUBMIT FORM FUNCTION
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if (!password.current.value || !newPassword.current.value || !oldPassword.current.value) {
      setErr("Please fill all fields");
      timeout();
      return;
    }

    if (password.current.value != newPassword.current.value) {
      setErr("Passwords doesn't match");
      timeout();
      return;
    }

    setLoading(true);

    const newAgent = {
      password: password.current.value,
      p: oldPassword.current.value,
    };

    try {

      await publicRequest.put("/agent/update/", newAgent);
      setLoading(false);
      setSuccess(true);
      //   window.location.href = '#mainForm'
      setErr("");
      timeout();
      //   CLEAR FIELDS
      newPassword.current.value = "";
      password.current.value = "";
      oldPassword.current.value = ''
      
    } catch (error) {

      setLoading(false);
      setSuccess(false);
      setErr(error.response.data);
      //   window.location.href = '#mainForm'
      timeout();
      console.log(error.response.data);

    }
  };

  return (
    <div>
      <h1 className="text-left text-2xl border-b border-green-400 w-[94%] mx-auto max-w-[850px] pb-2 font-bold text-green-600 m-10">
        Edit Password
      </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-5 rounded-md shadow-lg w-full mx-auto max-w-[850px] bg-opacity-60"
        >
          {success && (
            <p className="text-white bg-green-500 p-1 rounded-md w-[90%] mx-auto font-bold text-xl text-center mt-5">
              Password Updated Successfully
            </p>
          )}
          {err && (
            <p className="text-white bg-red-500 p-1 rounded-md w-[90%] mx-auto font-bold text-xl text-center mt-5">
              {err}
            </p>
          )}
          {/* TEXT AND INPUT SECTION */}
          <div className="shadow-lg rounded-md px-5 py-10 border-md flexCenter gap-8 flex-col w-full mx-auto max-w-[800px] bg-gray-50 bg-opacity-80">
            {/* PRODUCT TITLE */}
            <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">
                Old Password
              </p>
              <input
                ref={oldPassword}
                type="password"
                required
                className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent"
                placeholder="Enter old password"
              />
            </div>
            {/* PRODUCT DESCRIPTION */}
            <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">
                New Password
              </p>
              <input
                ref={newPassword}
                type="password"
                required
                className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent"
                placeholder="Enter strong new password"
              />
            </div>
            {/* PRODUCT PRICE */}
            <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="font-semibold text-lg md:text-xl text-gray-600">
                Confirm Password
              </p>
              <input
                ref={password}
                required
                type="password"
                className="outline-none w-full max-w-[700px] border-b border-pink-200 pb-2 bg-transparent"
                placeholder="Confirm password"
              />
            </div>
          </div>
          {/* SUBMIT BUTTON */}
          <button className="bg-green-600 font-bold shadow-lg hover:shadow-2xl text-white p-5 rounded-md w-full my-10 block w-full mx-auto max-w-[750px]">
            {loading ? "Updating..." : "UPDATE"}
          </button>
        </form>
        <Link to="/admin">
          <div className="border-blue-300 pb-2 border-b my-10 w-full mx-auto max-w-[250px] flexCenter gap-3">
            <ArrowLeftIcon className="text-blue-500 h-5" />
            <p className="font-semibold text-blue-500 "> Return</p>
          </div>
        </Link>
    </div>
  );
}
