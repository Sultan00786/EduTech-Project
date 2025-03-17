import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import CTAButton from "../Homepage/Botton";
import Tap from "../../common/Tap";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";

function SignForm({ btnText }) {
   const [isText1, setIsText1] = useState(false);
   const [isText2, setIsText2] = useState(false);

   function changeViwe1() {
      setIsText1(!isText1);
   }
   function changeViwe2() {
      setIsText2(!isText2);
   }

   // Student or Instructor
   const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
   // form data
   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
   });

   const tabData = [
      {
         id: 1,
         tabName: "Student",
         type: ACCOUNT_TYPE.STUDENT,
      },
      {
         id: 2,
         tabName: "Instructor",
         type: ACCOUNT_TYPE.INSTRUCTOR,
      },
   ];

   const changeFormData = (event) => {
      setFormData((pevData) => ({
         ...pevData,
         [event.target.name]: event.target.value,
      }));
   };

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const submitHandler = (event) => {
      event.preventDefault();

      if (formData.password !== formData.confirmPassword) {
         toast.error("Password do not Match");
         return;
      }

      // setting sign up data to state
      // to be used after otp verification
      const signupData = {
         ...formData,
         accountType: accountType,
      };
      dispatch(setSignupData(signupData));

      // send OTP to user for verification
      dispatch(sendOtp(formData.email, navigate)); // After completion of opt api operation --> sing up operation take place

      // reset
      setFormData({
         firstName: "",
         lastName: "",
         email: "",
         password: "",
         confirmPassword: "",
      });
      setAccountType(ACCOUNT_TYPE.STUDENT);
   };

   return (
      <div className=" mt-7 text-richblack-25 text-[16px] select-none ">
         <Tap tabData={tabData} field={accountType} setField={setAccountType} />

         <form onSubmit={submitHandler} className="flex flex-col gap-4 ">
            <div className=" w-full flex flex-row gap-4">
               <div className=" w-full flex flex-col gap-2 ">
                  <label>
                     First Name <sup className="text-pink-500">*</sup>
                  </label>
                  <input
                     required
                     type=" text "
                     name="firstName"
                     placeholder="Enter First Name"
                     onChange={changeFormData}
                     className=" w-full bg-richblack-800 rounded-lg text-[16px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-3 "
                  ></input>
               </div>

               <div className="w-full flex flex-col gap-2 ">
                  <label>
                     Last Name <sup className="text-pink-500">*</sup>
                  </label>
                  <input
                     required
                     type=" text "
                     name="lastName"
                     placeholder="Enter Last Name"
                     onChange={changeFormData}
                     className=" w-full bg-richblack-800 rounded-lg text-[16px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-3 "
                  ></input>
               </div>
            </div>

            <div className=" flex flex-col gap-2 ">
               <label>
                  Email Address <sup className="text-pink-500">*</sup>
               </label>
               <input
                  required
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  onChange={changeFormData}
                  className=" bg-richblack-800 rounded-lg text-[16px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-3 "
               ></input>
            </div>

            <div className=" gap-4 ">
               <div className=" mb-2 ">
                  <label className="">
                     Phone Number <sup className="text-pink-500">*</sup>
                  </label>
               </div>

               <div className=" flex flex-row gap-4 ">
                  <div className=" relative w-[17%] flex flex-col gap-2 ">
                     <input
                        required
                        type=" text "
                        name=""
                        placeholder=" +91"
                        onChange={changeFormData}
                        className=" bg-richblack-800 rounded-lg text-[16px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-3 "
                     ></input>

                     <IoIosArrowDown className=" absolute left-[62%] top-[25%] text-richblack-200 text-sm cursor-pointer " />
                  </div>

                  <div className=" w-full flex flex-col gap-2 ">
                     <input
                        required
                        type="text"
                        name="phoneNumber"
                        placeholder=" 12345 67890"
                        onChange={changeFormData}
                        maxLength={10}
                        className=" bg-richblack-800 rounded-lg text-[16px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-3 "
                     ></input>
                  </div>
               </div>
            </div>

            <div className="flex flex-row gap-4 ">
               <div className=" w-full flex flex-col gap-2 ">
                  <label>
                     Phone Password <sup className="text-pink-500">*</sup>
                  </label>

                  <div className="relative w-full">
                     <input
                        required
                        type={isText1 ? "text" : "password"}
                        name="password"
                        placeholder="Enter Password"
                        onChange={changeFormData}
                        className=" w-full bg-richblack-800 rounded-lg text-[16px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 "
                     ></input>

                     <div
                        className=" absolute right-[10%] top-[26%] hover:cursor-pointer  text-richblack-200 hover:text-richblack-50 "
                        onClick={changeViwe1}
                     >
                        {isText1 && <FaRegEyeSlash className=" w-[20px] " />}
                        {!isText1 && <FaRegEye className=" w-[20px] " />}
                     </div>
                  </div>
               </div>

               <div className=" w-full flex flex-col gap-2 ">
                  <label>
                     Confirm Password <sup className="text-pink-500">*</sup>
                  </label>

                  <div className="relative">
                     <input
                        required
                        type={isText2 ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Enter Password"
                        onChange={changeFormData}
                        className=" w-full bg-richblack-800 rounded-lg text-[16px] p-2 text-richblack-50 border-b-[2px] border-richblack-700 mb-3 "
                     ></input>

                     <div
                        className=" absolute right-[10%] top-[26%] hover:cursor-pointer  text-richblack-200 hover:text-richblack-50 "
                        onClick={changeViwe2}
                     >
                        {isText2 && <FaRegEyeSlash className=" w-[20px] " />}
                        {!isText2 && <FaRegEye className=" w-[20px] " />}
                     </div>
                  </div>
               </div>
            </div>

            <button onClick={submitHandler}>
               <CTAButton children={btnText} active={true} linkto="" />
            </button>
         </form>
      </div>
   );
}

export default SignForm;
