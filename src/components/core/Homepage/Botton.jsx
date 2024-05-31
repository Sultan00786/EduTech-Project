import React from "react";
import { Link } from "react-router-dom";

function Botton({ children, active, linkto }) {
  return (
    <Link to={linkto}>
      <div
        className={` text-center text-[14px] px-6 py-3 rounded-md font-semibold mt-8 select-none
      ${
        active
          ? "bg-yellow-50 text-black border-r-[3px] border-b-[3px] border-t-0 border-yellow-100  "
          : "bg-richblack-800 border-r-[2px] border-b-[2px] border-t-0 border-richblack-700 "
      } 
      hover:scale-95 transition-all duration-150`}
      >
        {children}
      </div>
    </Link>
  );
}

export default Botton;
