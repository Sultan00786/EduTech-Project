import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";
import { IoIosArrowDown } from "react-icons/io";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { ACCOUNT_TYPE } from "../../../utils/constants";

const ProfileDropDown = () => {
   const { user } = useSelector((state) => state.profile);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [open, setOpen] = useState(false);

   return (
      <div onClick={() => setOpen(!open)} className="relative cursor-pointer">
         <div className="flex items-center gap-x-1">
            <img
               src={user?.image}
               alt={`profile-${user?.firstName}`}
               className="w-[30px] aspect-square rounded-full object-cover"
            />
            <IoIosArrowDown
               className={`text-lg text-richblack-100 group-hover:text-white group-hover:rotate-180 transition-all duration-200 ${
                  open ? "rotate-180" : ""
               } transition-all duration-200`}
            />
         </div>

         {open && (
            <div
               className="absolute -left-[30%] top-[120%] z-[100] divide-y-[1px] divide-richblack-700
          overflow-hidden rounded-md border-[2px] border-richblack-700 bg-richblack-800
          transition-all duration-200"
            >
               {/* <div
                  className="absolute right-[10%] -top-2 h-6 w-6 rotate-45 rounded bg-richblack-800
            translate-y-[20%] border-l-[1px] border-t-[1px] border-richblack-700"
               ></div> */}

               {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                  <Link to="/dashboard/enrolled-courses" className="block">
                     <div
                        className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100
                hover:bg-richblack-700 hover:text-white transition-all duration-200"
                     >
                        <VscDashboard className="text-lg" />
                        Dashboard
                     </div>
                  </Link>
               )}

               {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                  <Link to="/dashboard/instructor" className="block">
                     <div
                        className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100
                hover:bg-richblack-700 hover:text-white transition-all duration-200"
                     >
                        <VscDashboard className="text-lg" />
                        Dashboard
                     </div>
                  </Link>
               )}

               <div
                  onClick={() => {
                     dispatch(logout());
                     navigate("/");
                  }}
                  className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100
              hover:bg-richblack-700 hover:text-white transition-all duration-200 cursor-pointer"
               >
                  <VscSignOut className="text-lg" />
                  Logout
               </div>
            </div>
         )}
      </div>
   );
};

export default ProfileDropDown;
