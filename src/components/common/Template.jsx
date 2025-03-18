import React, { useState } from "react";
import SignForm from "../core/Auth/SignForm";
import LoginForm from "../core/Auth/LoginForm";
import CTAButton from "../core/Homepage/Botton";
import loginImage from "../../assets/Images/login.webp";
import signImage from "../../assets/Images/signup.webp";
import frame from "../../assets/Images/frame.png";

const accountType = ["Student", "Intructors"];

function Template({ heading, subHeading, formType, btnText }) {
   const [currentTab, setCurrentTab] = useState(accountType[0]);

   const changeTab = (accountType) => {
      setCurrentTab(accountType);
   };

   return (
      <div className=" text-richblack-25 w-[100%] max-w-maxContent mx-auto ">
         <div className=" relative w-11/12 flex flex-col md:flex-row mx-auto  justify-between mt-16 mb-24 ">
            {/* form section */}

            <div className=" md:w-[40%] ">
               <div className=" text-richblack-25 mt-12 mb-5 text-4xl font-bold ">
                  {heading}
               </div>

               <div className=" text-richblack-100 mb-8 text-[18px]   ">
                  {" "}
                  {subHeading}{" "}
               </div>

               {formType === "loginForm" ? (
                  <LoginForm btnText={btnText} />
               ) : (
                  <SignForm btnText={btnText} />
               )}
            </div>

            {/* image section */}

            <div className=" hidden md:block pl-6 select-none ">
               <img
                  src={formType === "loginForm" ? loginImage : signImage}
                  width={550}
                  height={550}
                  className=" absolute left-[51%] top-[1%] "
               />
               <img src={frame} width={550} height={550} className=" mt-5 " />
            </div>
         </div>
      </div>
   );
}

export default Template;
