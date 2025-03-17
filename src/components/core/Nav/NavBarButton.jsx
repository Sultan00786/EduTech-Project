import React from "react";
import { Link } from "react-router-dom";

function NavBarButton({ children, redirectUrl }) {
   return (
      <div>
         <Link to={redirectUrl}>
            <button className="text-richblack-100 px-3 py-2 border-[1px] border-richblack-700 rounded-md bg-richblack-800 hover:bg-richblack-700 hover:text-yellow-25 transition-all duration-200">
               {children}
            </button>
         </Link>
      </div>
   );
}

export default NavBarButton;
