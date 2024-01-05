import React from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Navbar() {

    const location = useLocation();

    const matchPath = (path) => {
        return path === location.pathname ? true : false;
    }

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
                                            <div className='text-richblue-25'>
                                                {link.title}
                                            </div>
                                        ) :
                                        (
                                            <Link to={link?.path}>
                                                <p
                                                    className={ ` ${matchPath(link.path) ? " text-yellow-25 " : " text-richblack-25 "}  ` }
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

            </div>

        </div>
    </div>
  )
}

export default Navbar