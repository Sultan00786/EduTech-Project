import React, { useState } from 'react'
import SignForm from '../core/Auth/SignForm'
import LoginForm from '../core/Auth/LoginForm'
import CTAButton from '../core/Homepage/Botton'
import loginImage from "../../assets/Images/login.webp"
import signImage from "../../assets/Images/signup.webp"
import frame from "../../assets/Images/frame.png"




const accountType = [
    "Student",
    "Intructors"
]


function Template( {heading, subHeading, formType, btnText} ) {

    const [currentTab, setCurrentTab] = useState(accountType[0]);

    const changeTab = (accountType) => {
        setCurrentTab(accountType);
    }

  return (
    <div className=' text-richblack-25 w-[100%] max-w-maxContent mx-auto '>
        <div className=' relative w-11/12 flex flex-row mx-auto  justify-between mt-16 ' >
            
            {/* form section */}

            <div className=' w-[40%] ' >
                <div className=' text-richblack-25 mt-12 mb-5 text-4xl font-bold ' >{heading}</div>

                <div className=' text-richblack-100 mb-8 text-[18px]   ' > {subHeading} </div>

                {/* tab for student or instructor */}

                <div className=' bg-richblack-800 w-fit flex flex-row items-center rounded-full gap-1 border-b-[2px] border-richblack-700 py-1 px-1 cursor-pointer ' >
                {
                    accountType.map((accountType, index) => (
                        <div key={index} 
                        onClick={()=>{
                            changeTab(accountType);
                        }} 
                        className={` ${accountType === currentTab ? " bg-richblack-900 text-richblue-5" : " text-richblack-100 "} px-6 py-2 rounded-full `} >
                            {accountType}
                        </div>
                    ))
                }
                </div>



                {
                    formType === "loginForm" ?
                    (<LoginForm/>) :
                    (<SignForm/>)
                }

                <CTAButton
                    children = {btnText}
                    active = {true}
                    linkto= ""
                />

            </div>

            {/* image section */}

            <div className=' pl-6 ' >
                <img
                    src={formType === "loginForm" ? loginImage : signImage}
                    width={580}
                    height={580}
                    className='absolute left-[48%] '
                />
                <img
                    src={frame}
                    width={580}
                    height={580}
                    className=' mt-5 ml- '
                />
            </div>

        </div>
    </div>
  )
}

export default Template