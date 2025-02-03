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

   const fetchSublinks = async () => {
      dispatch(setLoading(true));
      try {
         const result = await apiConnector("GET", categories.CATEGORIES_API);
         console.log(result);
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
      <div className=" flex h-14 items-center justify-center bg-richblack-800 border-b-[2px] border-b-richblack-700 ">
         <div className="flex w-11/12 max-w-maxContent items-center justify-between">
            {/* img logo */}
            <Link to={"/"}>
               <img src={logo} className=" w-40 " />
            </Link>

            {/* nav link */}
            <nav>
               <ul className="flex gap-x-6 ">
                  {NavbarLinks.map((link, index) => {
                     return (
                        <li key={index}>
                           {link.title === "Catalog" ? (
                              <div className=" relative text-richblack-50 gap-1 flex items-center group ">
                                 <p>{link.title}</p>
                                 <IoIosArrowDown className=" mt-1 text " />

                                 <div className=" z-10 invisible absolute left-[10%] top-[45%] translate-x-[-60%] translate-y-[30%] flex flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] ">
                                    <div
                                       className=" absolute left-[68%] translate-x-[100%] translate-y-[-100%]
                                                    h-6 w-6 rotate-45 bg-richblack-5 rounded "
                                    ></div>

                                    {subLinks.length ? (
                                       subLinks.map((subLinks, index) => {
                                          return (
                                             <Link
                                                to={`/catalog/${subLinks.name
                                                   .split(" ")
                                                   .join("-")
                                                   .toLowerCase()}`}
                                                key={index}
                                             >
                                                {subLinks.name}
                                             </Link>
                                          );
                                       })
                                    ) : (
                                       <div></div>
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
            <div className=" flex gap-x-4 items-center  ">
               {" "}
               {/*&&*/}
               {
                  <div className=" flex gap-x-3 text-2xl text-richblack-200 ">
                     <span className=" cursor-pointer ">
                        <HiSearch />
                     </span>
                     {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                        <Link to="/dashboard/cart" className="relative ">
                           <HiOutlineShoppingCart />
                           {totalItems > 0 && <span>{totalItems}</span>}
                        </Link>
                     )}
                  </div>
               }
               {token === null && (
                  <Link to="/login">
                     <div className=" border border-richblack-700 bg-richblack-900 px-[14px] py-[5px] text-richblue-25 rounded-md transition-all duration-200 hover:scale-105 hover:bg-richblack-800 hover:border-richblack-50 hover:text-white  ">
                        Log in
                     </div>
                  </Link>
               )}
               {token === null && (
                  <Link to="/signup">
                     <div className="  border border-richblack-700 bg-richblack-900 px-[14px] py-[5px] text-richblue-25 rounded-md transition-all duration-200 hover:scale-105 hover:bg-richblack-800 hover:border-richblack-50 hover:text-whitess ">
                        Sign Up
                     </div>
                  </Link>
               )}
               {token !== null && <ProfileDropDown />}
            </div>
         </div>
      </div>
   );
}

export default Navbar;
