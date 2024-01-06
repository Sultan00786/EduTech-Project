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

function Navbar() {

    const location = useLocation();

    
    const {token} = useSelector ( (state) => state.auth );
    const {user} = useSelector ( (state) => state.profile );
    const {totalItems} = useSelector ( (state) => state.cart );
    
    const matchPath = (path) => {
        return path === location.pathname ? true : false;
    }

    const [ subLinks, setSubLinks ] = useState([]);

    const fetchSublinks = async() => {
        try {

            const result = await apiConnector( "GET", categories.CATEGORIES_API );
            console.log( "Printing Sublinks result: ", result );
            setSubLinks( result.data.data );
            
        } catch (error) {
            console.log( "Could Not Fetch The Category List" )
        }
    }

    useEffect(
        () => {fetchSublinks ();},
        []
    )
    

  return (
    <div className=' flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 '>
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
                        <div className='text-richblack-50'>
                            <p>{link.title}</p>
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
                            <div className=" border border-richblack-700 bg-richblack-800 px-[14px] py-[5px] text-blue-25 rounded-md transition-all duration-200 hover:scale-105  ">
                                Log in
                            </div>
                        </Link>
                    )
                }

                {
                    token === null && 
                    (
                        <Link to="/signup" >
                            <div className=" border border-richblack-700 bg-richblack-800 px-[8px] py-[5px] text-blue-25 rounded-md transition-all duration-200 hover:scale-105  " >
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