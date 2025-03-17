import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";
import { IoIosArrowDown } from "react-icons/io";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { ACCOUNT_TYPE } from "../../../utils/constants";

const ProfileDropDown = ({ onClose = () => {} }) => {
   const { user } = useSelector((state) => state.profile);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [open, setOpen] = useState(false);
   const [confirmationModal, setConfirmationModal] = useState(null);

   return (
      <div className="relative w-fit">
         <div
            onClick={() => setOpen(!open)}
            className=" w-fit flex items-center gap-x-1 cursor-pointer"
         >
            <img
               src={user?.image}
               alt={`profile-${user?.firstName}`}
               className="w-[32px] md:w-[30px] aspect-square rounded-full object-cover border-[2px] p-[1px] border-richblack-700"
            />
            <IoIosArrowDown
               className={`text-lg text-richblack-100 group-hover:text-white group-hover:rotate-180 transition-all duration-300 ${
                  open ? "-rotate-180" : ""
               } transition-all duration-200`}
            />
         </div>

         {open && (
            <div
               className="absolute left-6 md:-left-[30%] md:top-[120%] z-[100] divide-y-[1px] divide-richblack-700
                overflow-hidden rounded-md border-[2px] border-richblack-700 bg-richblack-800
                transition-all duration-200"
            >
               {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                  <Link
                     onClick={onClose}
                     to="/dashboard/enrolled-courses"
                     className="block"
                  >
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
                  onClick={(e) => {
                     e.stopPropagation();
                     setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "You will be logged out of your account.",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModal(null),
                     });
                  }}
                  className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-pink-200/70
                  hover:bg-richblack-700 hover:text-pink-200 transition-all duration-200 cursor-pointer"
               >
                  <VscSignOut className="text-lg" />
                  Logout
               </div>
            </div>
         )}

         {/* Confirmation Modal */}
         {confirmationModal && (
            <ConfirmationModal
               onClose={onClose}
               modalData={confirmationModal}
            />
         )}
      </div>
   );
};

export default ProfileDropDown;
