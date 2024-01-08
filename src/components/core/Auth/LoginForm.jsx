import React from 'react'
import { Form, Link } from 'react-router-dom'

function LoginForm() {
  return (
    <div className=' mt-5 text-richblack-25 ' >
      <form className='flex flex-col gap-2 ' >
        <label>
          Email Address <sup className='text-pink-500' >*</sup>
        </label>
        <input
          type=' text '
          placeholder='@gmail.com'
          className=' bg-richblack-800 rounded-lg text-[17px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-3 '
        ></input>

        <label>
          Password <sup className=' text-pink-500 ' >*</sup>
        </label>
        <input
          type=' text '
          placeholder=' Enter Password '
          className=' bg-richblack-800 rounded-lg text-[17px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-0 '
        ></input>

        <Link to={"/forgetpassword"} >
          <div className=' flex flex-row-reverse text-blue-500 text-xs ' >Forget Password</div>
        </Link>

      </form>
    </div>
  )
}

export default LoginForm