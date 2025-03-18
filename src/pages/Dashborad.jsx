import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboad/Sidebar";
import { MdDoubleArrow } from "react-icons/md";
import { Drawer, DrawerContent, useDisclosure } from "@heroui/react";

function Dashborad() {
   const { loading: authLoding } = useSelector((state) => state.auth);
   const { loading: profileLoding } = useSelector((state) => state.profile);

   const { isOpen, onOpen, onOpenChange } = useDisclosure();

   if (authLoding || profileLoding) {
      return (
         <div className=" h-[88vh] text-white flex justify-center ">
            <div className="loader" />
         </div>
      );
   }

   return (
      <div className=" relative flex min-h-[calc(100vh-3.5rem)] pt-14 w-full ">
         <div className=" z-10">
            <div className=" hidden md:block">
               <Sidebar />
            </div>
            <div className=" md:hidden">
               <button
                  className="fixed top-[60px] text-richblack-100 m-0 mr-2 px-3 py-2 border-[1px] border-richblack-700 rounded-md bg-richblack-800 hover:bg-richblack-700 hover:text-white transition-all duration-200"
                  onClick={onOpen}
               >
                  <MdDoubleArrow />
               </button>

               <Drawer
                  backdrop="blur"
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  placement="left"
               >
                  <DrawerContent className="bg-richblack-800 w-[55%] border-l-2 border-richblack-700 ">
                     {(onClose) => (
                        <div className=" h-full w-full">
                           <Sidebar onClose={onClose} />
                        </div>
                     )}
                  </DrawerContent>
               </Drawer>
            </div>
         </div>
         <div className=" w-full py-10 md:pl-[230px] mx-auto ">
            <div className=" md:w-[1000px] mx-auto z-0">
               <Outlet />
            </div>
         </div>
      </div>
   );
}

export default Dashborad;
