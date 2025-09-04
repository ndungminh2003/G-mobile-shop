import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function PageNotFound() {
  let location = useLocation();
  let result = location.pathname.includes("admin");

  return (
    <div className=" flex flex-col items-center gap-8 ">
      <img src="/error/error.svg" alt="error" className=" w-[40%] h-[40%]" />

      {result ? (
        <Link to="/admin">
          <button className=" bg-slate-600 p-4 text-white rounded-md font-bold ">
            BACK TO HOME
          </button>
        </Link>
      ) : (
        <Link to="/">
          <button className=" bg-slate-600 p-4 text-white rounded-md font-bold ">
            BACK TO HOME
          </button>
        </Link>
      )}
    </div>
  );
}
