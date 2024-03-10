import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CTCBotton from '../components/core/Homepage/Botton';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPassWordResetToken } from '../services/operations/authAPI';
import { FaArrowLeftLong } from "react-icons/fa6";

const ForgotPassword = () => {

    const {loading} = useSelector( (state) => state.auth );
    const [ email, setEmail ] = useState( "" );
    const [ emailSent, setEmailSent ] = useState(false);

    const dispatch = useDispatch();
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch( getPassWordResetToken(email, setEmailSent) );
    }

  return (
    <div className=' w-[500px] flex flex-col my-auto mx-auto items-center justify-center text-white ' >
        
        {
            loading ? 
            <div className=' w-[100vw] h-[90vh] flex flex-row mx-auto justify-center items-center' >
                <span className='loader' ></span>
            </div> :
            (
                <div className=" flex flex-col " >
                    <div>
                        <h1 className="text-3xl font-bold text-richblack-5 mb-5" >
                            {!emailSent ?
                                "Reset your password" :
                                "Check email"
                            }
                        </h1>

                        <p className="text-richblack-200 text-[20px] mb-7" >
                            {!emailSent ?
                                "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" :
                                `We have sent the reset email to ${email} `
                            }
                        </p>

                        <form>
                            {!emailSent && (
                                <label>
                                    <p>Email Address <sup className=' text-pink-300' >*</sup> </p>
                                    <input
                                        required
                                        className=' w-full bg-richblack-800 rounded-lg text-[17px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mt-2 '
                                        type='email'
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Enter Your Email Address' />
                                </label>
                            )}

                            <br />
                            <button
                                onClick={submitHandler}
                                className={`w-full mb-4 ${emailSent ? "-mt-12" : ""} p-0`}
                            >
                                <CTCBotton
                                    active={true}
                                    linkto={""}
                                >
                                    {!emailSent ? "Reset Password" : "Check Password"}
                                </CTCBotton>
                            </button>

                        </form>
                    </div>

                    <Link className="" to={"/login"}>
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

export default ForgotPassword