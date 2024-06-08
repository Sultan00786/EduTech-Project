import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/operations/authAPI';
import { useLocation } from 'react-router-dom';
import CTCBotton from '../components/core/Homepage/Botton';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";


const passwordRules = [
    "one lowercase character",
    "one special character",
    "one uppercase character",
    "8 character minimum",
    "one number"
]

const UpdatePassword = () => {

    const {loading} = useSelector(
        (state) => state.auth
    );
    const [isText, setIsText] = useState(false);
    const [isText2, setIsText2] = useState(false);
    const location = useLocation();

    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:"",
    });
    const {password, confirmPassword} = formData;

    const changeFormData = (event) => {
        setFormData(
            (prevData) => {
                return{
                    ...prevData,
                    [event.target.name]: event.target.value,
                }
            }
        )
    }

    const changeViwe = () => {
        setIsText(!isText);
    }

    const changeViwe2 = () => {
        setIsText2(!isText2);
    }

    const dispatch = useDispatch();
    const submitHandler = (event) => {
        event.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch( resetPassword( password, confirmPassword, token ) );  

    }

  return (

    <div className=' mt-24 text-richblack-25 ' >
        {
            loading ? 
            <div className=' w-[100vw] h-[90vh] flex flex-row mx-auto justify-center items-center' >
                <span className='loader' ></span>
            </div> :
            (
                <div className=' w-[508px] flex flex-col justify-center mx-auto py-4 px-12 ' >
                    <h1 className=' text-3xl text-richblack-5 font-bold mb-3 ' >Choose new passwoard</h1>
                    <p className=' text-[17px] text-richblack-200 mb-3' >Almost done. Enter your new passwoard and youre all set.</p>

                    <form className='flex flex-col gap-2 ' >

                        <label>
                            New password <sup className='text-pink-500' >*</sup>
                        </label>

                        <div className='relative mb-2' >
                        
                            <input
                                required
                                name='password'
                                type={isText?"text":"password"}
                                placeholder='******'
                                className=' w-full bg-richblack-800 rounded-lg text-[17px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-0 '
                                onChange={changeFormData}
                            ></input>

                            <div className=' absolute right-[3%] top-[33%] hover:cursor-pointer  text-richblack-200 hover:text-richblack-50 ' 
                                onClick={changeViwe}
                            >
                                {
                                    isText && <FaRegEyeSlash className=' w-[20px] ' />
                                }
                                {
                                    !isText && <FaRegEye className=' w-[20px] ' />
                                }
                            </div>
                        
                        </div>

                        <label>
                            Confirm new password <sup className=' text-pink-500 ' >*</sup>
                        </label>

                        <div className='relative mb-2 ' >
                        
                            <input
                                required
                                name='confirmPassword'
                                type={isText2?"text":"password"}
                                placeholder='******'
                                className=' w-full bg-richblack-800 rounded-lg text-[17px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-0 '
                                onChange={changeFormData}
                            ></input>

                            <div className=' absolute right-[3%] top-[33%] hover:cursor-pointer  text-richblack-200 hover:text-richblack-50 ' 
                                onClick={changeViwe2}
                            >
                                {
                                isText2 && <FaRegEyeSlash className=' w-[20px] ' />
                                }
                                {
                                !isText2 && <FaRegEye className=' w-[20px] ' />
                                }
                            </div>
                        
                        </div>

                        <div className=' grid grid-cols-2 gap-y-2 '>
                            {passwordRules.map( (rule) =>(
                                <div className='flex gap-2 items-center text-sm text-caribbeangreen-300 ' >
                                    <FaCheckCircle className=' w-fit ' />  
                                    {rule}
                                    
                                </div>
                            ) )}
                        </div>

                        <button
                            onClick={submitHandler}
                        >
                            <CTCBotton
                                active={true}
                                linkto={""}
                                className="p-0"
                            >
                                Reset Password
                            </CTCBotton>
                        </button>

                    </form>

                    <Link className=" mt-3 " to={"/login"}>
                        <span className='flex flex-row items-center gap-3' >
                            <FaArrowLeftLong />
                            Back to login
                        </span> 
                    </Link>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword