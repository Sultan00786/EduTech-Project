import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineShoppingCart, HiSearch } from "react-icons/hi";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/api";
import { IoIosArrowDown } from "react-icons/io";
import { ACCOUNT_TYPE } from "../../utils/constants";
import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";

import { Drawer, DrawerContent, useDisclosure } from "@heroui/react";
import { HiOutlineBars3 } from "react-icons/hi2";
import DrawerNavBar from "./DrawerNavBar";
import NavBarButton from "../core/Nav/NavBarButton";

function Navbar() {
   const location = useLocation();

   const { token } = useSelector((state) => state.auth);
   const { user } = useSelector((state) => state.profile);
   const { totalItems } = useSelector((state) => state.cart);
   const dispatch = useDispatch();

   const matchPath = (path) => {
      return path === location.pathname ? true : false;
   };

   const [subLinks, setSubLinks] = useState([]);
   const { isOpen, onOpen, onOpenChange } = useDisclosure();

   const fetchSublinks = async () => {
      dispatch(setLoading(true));
      try {
         const result = await apiConnector("GET", categories.CATEGORIES_API);
         setSubLinks(result.data.allCategorys);
      } catch (error) {
         console.log(error);
         console.log("Could Not Fetch The Category List");
         toast.error("Could Not Fetch The Category List");
      }
      dispatch(setLoading(false));
   };

   useEffect(() => {
      fetchSublinks();
   }, []);

   return (
      <div
         className={`flex z-10 h-14 w-full items-center justify-center bg-richblack-800 border-b-[2px] border-b-richblack-700 ${
            (location.pathname.includes("dashboard") && "fixed") ||
            (location.pathname.includes("view-course") && "fixed")
         }`}
      >
         <div className="flex w-11/12 items-center justify-between">
            {/* img logo */}
            <Link to={"/"}>
               <img src={logo} className=" w-40 " />
            </Link>

            {/* nav link */}
            <nav className="hidden md:block">
               <ul className="flex gap-x-6 ">
                  {NavbarLinks?.map((link, index) => {
                     return (
                        <li key={index}>
                           {link.title === "Catalog" ? (
                              <div className="relative text-richblack-50 flex items-center gap-2 group cursor-pointer">
                                 <p className="group-hover:text-white transition-all duration-200">
                                    {link.title}
                                 </p>
                                 <IoIosArrowDown className="text-lg group-hover:text-white group-hover:rotate-180 transition-all duration-200" />

                                 <div
                                    className="invisible absolute z-[100] left-[50%] top-[50%] translate-x-[-50%] translate-y-[3rem] flex flex-col bg-richblack-800 p-4 text-richblack-900 opacity-0 
                                  transition-all duration-200 group-hover:visible group-hover:opacity-100 min-w-[300px]
                                  border-[2px] border-richblack-700 rounded-md"
                                 >
                                    <div
                                       className="absolute z-[99] left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-800 
                                       translate-x-[80%] translate-y-[-40%] border-l-[1px] border-t-[2px] border-richblack-700"
                                    ></div>

                                    {subLinks?.length ? (
                                       subLinks.map((subLink, index) => (
                                          <Link
                                             to={`/catalog/${subLink.name
                                                .split(" ")
                                                .join("-")
                                                .toLowerCase()}`}
                                             key={index}
                                             className=" z-[100] rounded-lg px-4 py-3 text-[15px] text-richblack-50 font-semibold 
                                                hover:bg-richblack-700 hover:text-white transition-all duration-200"
                                          >
                                             <p>{subLink.name}</p>
                                          </Link>
                                       ))
                                    ) : (
                                       <div className="text-center text-richblack-5 font-semibold py-3">
                                          No Courses Found
                                       </div>
                                    )}
                                 </div>
                              </div>
                           ) : (
                              <Link to={link?.path}>
                                 <p
                                    className={` ${
                                       matchPath(link.path)
                                          ? " text-yellow-25 "
                                          : " text-richblack-50 hover:text-richblack-5 duration-200 "
                                    }  `}
                                 >
                                    {link.title}
                                 </p>
                              </Link>
                           )}
                        </li>
                     );
                  })}
               </ul>
            </nav>

            {/* Login/SignUp/Dashboard */}
            <div className="hidden md:flex gap-x-4 items-center">
               {/* Search and Cart */}
               <div className="flex gap-x-4 items-center text-2xl text-richblack-100">
                  <span className="cursor-pointer hover:text-white transition-all duration-200">
                     <HiSearch />
                  </span>
                  {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                     <Link to="/dashboard/cart" className="relative">
                        <HiOutlineShoppingCart className="hover:text-white transition-all duration-200" />
                        {totalItems > 0 && (
                           <span className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-white border-[1px] border-richblack-700">
                              {totalItems}
                           </span>
                        )}
                     </Link>
                  )}
               </div>

               {/* Login/Signup buttons */}
               {token === null && (
                  <div className="flex gap-x-4 items-center">
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
                     <ProfileDropDown />
                  </div>
               )}
            </div>

            {/* Hamburger */}
            <div className="md:hidden">
               <button
                  className="text-richblack-100 m-0 mr-2 px-3 py-2 border-[1px] border-richblack-700 rounded-md bg-richblack-800 hover:bg-richblack-700 hover:text-white transition-all duration-200"
                  onClick={onOpen}
               >
                  <HiOutlineBars3 />
               </button>
               <Drawer
                  backdrop="blur"
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
               >
                  <DrawerContent className="bg-richblack-800 w-[55%] border-l-2 border-richblack-700">
                     {(onClose) => (
                        <div className=" h-full w-full">
                           <DrawerNavBar
                              onClose={onClose}
                              catalogLinks={subLinks}
                           />
                        </div>
                     )}
                  </DrawerContent>
               </Drawer>
            </div>
         </div>
      </div>
   );
}

export default Navbar;
