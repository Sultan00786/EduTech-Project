import React from 'react'
import { IoIosArrowDown } from "react-icons/io";

function SignForm() {
  return (
    <div className=' mt-7 text-richblack-25 text-[16px] ' >
      <form className='flex flex-col gap-4 ' >

        <div className=' flex flex-row gap-4 '>
        
          <div className=' flex flex-col gap-2 ' >
            <label>
            First Name <sup className='text-pink-500' >*</sup>
          </label>
          <input
            type=' text '
            placeholder='Enter First Name'
            className=' bg-richblack-800 rounded-lg text-[16px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-3 '
          ></input>
          </div>

          <div className=' flex flex-col gap-2 ' >
            <label>
            Last Name <sup className='text-pink-500' >*</sup>
          </label>
          <input
            type=' text '
            placeholder='Enter Last Name'
            className=' bg-richblack-800 rounded-lg text-[16px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-3 '
          ></input>
          </div>

        </div>



        <div>
          
          <div className=' flex flex-col gap-2 ' >
              <label>
              Email Address <sup className='text-pink-500' >*</sup>
            </label>
            <input
              type=' text '
              placeholder='Enter Email Address'
              className=' bg-richblack-800 rounded-lg text-[16px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-3 '
            ></input>
          </div>
        </div>



        <div className=' gap-4 '>

          <div className=' mb-2 ' > 
            <label className='' >
              Phone Number <sup className='text-pink-500' >*</sup>
            </label>
          </div>
        
          <div className=' flex flex-row gap-4 ' >

            <div className=' relative w-[17%] flex flex-col gap-2 ' >
            <input
              type=' text '
              placeholder=' +91'
              className=' bg-richblack-800 rounded-lg text-[16px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-3 '
            ></input>

            <IoIosArrowDown
              className=' absolute left-[62%] top-[25%] text-richblack-200 text-sm cursor-pointer '
            />

            </div>

            <div className=' w-full flex flex-col gap-2 ' >
            <input
              type=' text '
              placeholder=' 12345 67890'
              className=' bg-richblack-800 rounded-lg text-[16px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-3 '
            ></input>
            </div>

          </div>

        </div>



        <div className=' flex flex-row gap-4 '>
        
          <div className=' flex flex-col gap-2 ' >
            <label>
            Phone Password <sup className='text-pink-500' >*</sup>
          </label>
          <input
            type=' text '
            placeholder='Enter Password'
            className=' bg-richblack-800 rounded-lg text-[16px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-3 '
          ></input>
          </div>

          <div className=' flex flex-col gap-2 ' >
            <label>
            Confirm Password <sup className='text-pink-500' >*</sup>
          </label>
          <input
            type=' text '
            placeholder='Enter Password'
            className=' bg-richblack-800 rounded-lg text-[16px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-3 '
          ></input>
          </div>

        </div>

      </form>
    </div>
  )
}

export default SignForm