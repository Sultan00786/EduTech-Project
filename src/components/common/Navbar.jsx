import React, { useEffect, useState } from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiOutlineShoppingCart } from "react-icons/hi";
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/api';
import { IoIosArrowDown } from "react-icons/io";




function Navbar() {

    const location = useLocation();

    
    const {token} = useSelector ( (state) => state.auth );
    const {user} = useSelector ( (state) => state.profile );
    const {totalItems} = useSelector ( (state) => state.cart );
    
    const matchPath = (path) => {
        return path === location.pathname ? true : false;
    }

    
    const subLinks = [
        {
            title: "python",
            link: "/catalog/python",
        },
        {
            title: "web dev",
            link: "/catalog/web-development"
        }
    ]
    
    // const [ subLinks, setSubLinks ] = useState([]);

    // const fetchSublinks = async() => {
    //     try {

    //         const result = await apiConnector( "GET", categories.CATEGORIES_API );
    //         console.log( "Printing Sublinks result: ", result );
    //         setSubLinks( result.data.data );
            
    //     } catch (error) {
    //         console.log( "Could Not Fetch The Category List" )
    //     }
    // }

    // useEffect(
    //     () => {fetchSublinks ();},
    //     []
    // )
    

  return (
    <div className=' flex h-14 items-center justify-center bg-richblack-800 border-b-[2px] border-b-richblack-700 '>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

            {/* img logo */}

            <img
                src={logo}
                className=' w-40 '
            />

            {/* nav link */}

            <nav>
                <ul className='flex gap-x-6 ' >
                {
                    NavbarLinks.map(
                        (link, index) => {
                            return (
                                <li key={index} >
                                    {
                                        link.title === "Catalog" ? (

                                            <div className= ' relative text-richblack-50 gap-1 flex items-center group '>

                                                <p>{link.title}</p>
                                                <IoIosArrowDown className=' mt-1 text ' />

                                                <div className=' invisible absolute left-[50%] top-[45%] translate-x-[-50%] translate-y-[70%] flex flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] ' >
                                                
                                                    <div className=' absolute left-[50%] right-[50%] translate-x-[75%] translate-y-[-100%]
                                                    h-6 w-6 rotate-45 bg-richblack-5 rounded ' >
                                                    </div>

                                                    {
                                                            subLinks.length ? (
                                                                subLinks.map ( ( subLinks, index ) => {
                                                                    return (
                                                                        <Link to={`${subLinks.link}`} key={index}>
                                                                            {subLinks.title}
                                                                        </Link>
                                                                    )
                                                                } )
                                                            ) :
                                                        (<div></div>)
                                                    }

                                                </div>

                                                

                                                

                                            </div>
                                            
                                        ) :
                                        (
                                            <Link to={link?.path}>
                                                <p
                                                    className={ ` ${matchPath(link.path) ? " text-yellow-25 " : " text-richblack-50 hover:text-richblack-5 duration-200 "}  ` }
                                                >
                                                {link.title}
                                                </p>
                                            </Link>
                                        )
                                        
                                    }
                                </li>
                            )
                        }
                    )
                }
                </ul>
            </nav>

            {/* Login/SignUp/Dashboard */}

            <div className=' flex gap-x-4 items-center  ' >
                {
                    user && user.accountType != "Instructor" && 
                    (
                        <Link to="/dashboard/cart" className='relative' >
                            <HiOutlineShoppingCart/>
                            {
                                totalItems > 0 && 
                                (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }

                {
                    token === null &&
                    (
                        <Link to="/login" >
                            <div className=" border border-richblack-700 bg-richblack-900 px-[14px] py-[5px] text-blue-25 rounded-md transition-all duration-200 hover:scale-105  ">
                                Log in
                            </div>
                        </Link>
                    )
                }

                {
                    token === null && 
                    (
                        <Link to="/signup" >
                            <div className=" border border-richblack-700 bg-richblack-900 px-[8px] py-[5px] text-blue-25 rounded-md transition-all duration-200 hover:scale-105  " >
                                Sign Up
                            </div>
                        </Link>
                    )
                }

                {
                    token !== null && <ProfileDropDown/>
                }

            </div>

        </div>
    </div>
  )
}

export default Navbar