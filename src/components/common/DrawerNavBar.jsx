import React from "react";
import NavBarButton from "../core/Nav/NavBarButton";
import { NavbarLinks } from "../../data/navbar-links";
import { Link } from "react-router-dom";
import { Accordion, AccordionItem } from "@heroui/react";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";

function DrawerNavBar({ onClose, catalogLinks }) {
   const { token } = useSelector((state) => state.auth);
   const itemClasses = {
      base: "",
      title: " text-lg text-richblack-100 hover:text-yellow-25  transition-all duration-200",
      trigger: "hover:text-yellow-25",
      indicator: "", // Assuming this is empty as per your example format
      content: "", // Assuming this is empty as per your example format
   };

   return (
      <div className="h-full text-richblack-100">
         <div className=" flex flex-col gap-4 pt-3 px-2 ">
            {/* Login/Signup buttons */}
            {token === null && (
               <div onClick={onClose} className="flex gap-x-4 items-center">
                  <NavBarButton
                     children={"Log in"}
                     redirectUrl={"/login"}
                  ></NavBarButton>
                  <NavBarButton
                     children={"Sign Up"}
                     redirectUrl={"/signup"}
                  ></NavBarButton>
               </div>
            )}

            {/* Profile Dropdown */}
            {token !== null && (
               <div className="relative">
                  <ProfileDropDown onClose={onClose} />
               </div>
            )}
         </div>

         <div className=" flex flex-col mt-3 border-t-1 border-richblack-700 text-lg ">
            {NavbarLinks.map((link, index) => {
               {
                  if (link?.path) {
                     return (
                        <Link to={link.path} key={index}>
                           <div
                              onClick={onClose}
                              className="py-2 px-2 border-t-[1px] border-richblack-700 hover:text-yellow-25  transition-all duration-200"
                           >
                              {link.title}
                           </div>
                        </Link>
                     );
                  } else {
                     return (
                        <div className="border-t-[1px] border-richblack-700">
                           <Accordion isCompact itemClasses={itemClasses}>
                              <AccordionItem title={link.title}>
                                 <div className="-mt-[12px]">
                                    {catalogLinks?.map((sublink, index) => {
                                       return (
                                          <Link
                                             to={`/catalog/${sublink.name
                                                .split(" ")
                                                .join("-")
                                                .toLowerCase()}`}
                                             key={index}
                                             onClick={onClose}
                                          >
                                             <div className="py-1 flex items-center justify-start px-6 hover:bg-richblack-700  transition-all duration-200">
                                                {sublink.name}
                                             </div>
                                          </Link>
                                       );
                                    })}
                                 </div>
                              </AccordionItem>
                           </Accordion>
                        </div>
                     );
                  }
               }
            })}
         </div>
      </div>
   );
}

export default DrawerNavBar;
