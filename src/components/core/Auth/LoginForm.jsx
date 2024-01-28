import React, { useState } from 'react'
import { Form, Link } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import CTAButton from '../Homepage/Botton';

function LoginForm( {btnText} ) {

  const [isText, setIsText] = useState(false);

  function changeViwe (){
    setIsText( !isText );
  }

  const [formData, setFormData] = useState( {

    email: "",
    password: "",

  } );

  function changeFormData(event)
  {
    setFormData( 
      (pevData) => (
        {
          ...pevData,
          [event.target.name]: event.target.value,
        }
      ) 
     )
  }

  console.log(formData.password);

  return (
    <div className=' mt-5 text-richblack-25 select-none ' >

      <form className='flex flex-col gap-2 ' >

        <label>
          Email Address <sup className='text-pink-500' >*</sup>
        </label>

        <input
          required
          name='email'
          type='email'
          placeholder='@gmail.com'
          className=' bg-richblack-800 rounded-lg text-[17px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-3 '
          onChange={changeFormData}
        ></input>

        <label>
          Password <sup className=' text-pink-500 ' >*</sup>
        </label>

        <div className='relative' >
        
          <input
            required
            name='password'
            type={isText?"text":"password"}
            placeholder=' Enter Password '
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

        <Link to={"/forgetpassword"} >
          <div className=' flex flex-row-reverse text-blue-500 text-xs select-none hover:cursor-pointer hover:text-blue-400  ' >Forget Password</div>
        </Link>

        <CTAButton
            children = {btnText}
            active = {true}
            linkto= ""
        />

      </form>
    </div>
  )
}

export default LoginForm