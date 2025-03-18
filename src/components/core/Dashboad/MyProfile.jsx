import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Iconbtn from "../../common/Iconbtn";
import { VscAdd, VscEdit, VscPulse, Vscplus } from "react-icons/vsc";
import { IoIosAddCircle } from "react-icons/io";
import Botton from "../Homepage/Botton";
import { RiEditBoxLine } from "react-icons/ri";
import { formattedDate } from "../../../utils/dateFormatter";

function MyProfile() {
   const { user } = useSelector((state) => state.profile);

   const { image } = user;
   const navigate = useNavigate();

   return (
      <div className="text-white w-11/12 mx-auto">
         <h1 className="mb-14 text-3xl font-bold text-richblack-5">
            My Profile
         </h1>

         {/* Section 1: Profile Info */}
         <div className="flex md:flex-row flex-col items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <div className="flex md:flex-row items-center gap-x-4 md:mb-0 mb-4">
               <img
                  src={user?.image}
                  alt={`profile-${user?.firstName}`}
                  className="aspect-square w-[50px] md:w-[78px] rounded-full object-cover"
               />
               <div className="space-y-1">
                  <p className="text-lg font-semibold text-richblack-5">
                     {user?.firstName + " " + user?.lastName}
                  </p>
                  <p className="text-sm text-richblack-300">{user?.email}</p>
               </div>
            </div>
            <div className="flex w-full justify-start md:w-fit ">
               <Iconbtn
                  text="Edit"
                  onClick={() => navigate("/dashboard/settings")}
                  customClasses="md:w-fit flex items-center gap-x-2"
               >
                  <RiEditBoxLine />
               </Iconbtn>
            </div>
         </div>

         {/* Section 2: Personal Details */}
         <div className="my-10 flex flex-col gap-y-5 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <div className="flex w-full items-center justify-between">
               <p className="text-lg font-semibold text-richblack-5">
                  Personal Details
               </p>
               <Iconbtn
                  text="Edit"
                  onClick={() => navigate("/dashboard/settings")}
                  customClasses=" hidden md:flex flex items-center gap-x-2"
               >
                  <RiEditBoxLine />
               </Iconbtn>
            </div>
            <div className="flex flex-col gap-y-5 md:flex-row  md:max-w-[500px] justify-between">
               <div className="flex flex-col gap-y-5">
                  <div>
                     <p className="mb-2 text-sm text-richblack-300">
                        First Name
                     </p>
                     <p className="text-sm font-medium text-richblack-5">
                        {user?.firstName}
                     </p>
                  </div>
                  <div>
                     <p className="mb-2 text-sm text-richblack-300">Email</p>
                     <p className="text-sm font-medium text-richblack-5">
                        {user?.email}
                     </p>
                  </div>
                  <div>
                     <p className="mb-2 text-sm text-richblack-300">Gender</p>
                     <p className="text-sm font-medium text-richblack-5">
                        {user?.additionalDetails?.gender ?? "Add Gender"}
                     </p>
                  </div>
               </div>
               <div className="flex flex-col gap-y-5">
                  <div>
                     <p className="mb-2 text-sm text-richblack-300">
                        Last Name
                     </p>
                     <p className="text-sm font-medium text-richblack-5">
                        {user?.lastName}
                     </p>
                  </div>
                  <div>
                     <p className="mb-2 text-sm text-richblack-300">
                        Phone Number
                     </p>
                     <p className="text-sm font-medium text-richblack-5">
                        {user?.additionalDetails?.contactNumber ??
                           "Add Contact Number"}
                     </p>
                  </div>
                  <div>
                     <p className="mb-2 text-sm text-richblack-300">
                        Date Of Birth
                     </p>
                     <p className="text-sm font-medium text-richblack-5">
                        {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                           "Add Date Of Birth"}
                     </p>
                  </div>
               </div>
            </div>

            <div>
               <Iconbtn
                  text="Edit"
                  onClick={() => navigate("/dashboard/settings")}
                  customClasses=" md:hidden flex items-center gap-x-2"
               >
                  <RiEditBoxLine />
               </Iconbtn>
            </div>
         </div>

         {/* Section 3: About */}
         <div className="my-10 flex flex-col gap-y-5 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <div className="flex w-full items-center justify-between">
               <p className="text-lg font-semibold text-richblack-5">About</p>
               <Iconbtn
                  text="Edit"
                  onClick={() => navigate("/dashboard/settings")}
                  customClasses=" hidden md:flex flex items-center gap-x-2"
               >
                  <RiEditBoxLine />
               </Iconbtn>
            </div>
            <p className="text-sm font-medium text-richblack-5">
               {user?.additionalDetails?.about ??
                  "Write Something About Yourself"}
            </p>

            <div className="flex w-full justify-start ">
               <Iconbtn
                  text="Edit"
                  onClick={() => navigate("/dashboard/settings")}
                  customClasses=" md:hidden md:w-fit flex items-center gap-x-2"
               >
                  <RiEditBoxLine />
               </Iconbtn>
            </div>
         </div>
      </div>
   );
}

export default MyProfile;
