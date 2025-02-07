import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import CTAButton from "../components/core/Homepage/Botton";
import { useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const VerifyEmail = () => {
   const { loading, signupData } = useSelector((state) => state.auth); // using redux
   const [otp, setOtp] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();

   // checking for sign up data is present or not ??
   useEffect(() => {
      if (!signupData) navigate("/signup");
   }, []);

   const submitHandler = (event) => {
      event.preventDefault();
      const {
         accountType,
         firstName,
         lastName,
         email,
         password,
         confirmPassword,
      } = signupData;

      // console.log("signupData --> ", signupData, "\n", otp);

      dispatch(
         signUp(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
         )
      );
   };

   return (
      <div className=" w-full h-[85vh] flex justify-center items-center mt-7 text-richblack-50 text-[16px] select-none ">
         {loading ? (
            <div className=" w-[100vw] h-[90vh] flex flex-row mx-auto justify-center items-center">
               <span className="loader"></span>
            </div>
         ) : (
            <div className=" w-[508px] flex flex-col py-2 px-9  ">
               <h1 className=" text-3xl text-richblack-5 font-semibold mb-3 ">
                  Verify Email
               </h1>
               <p className=" text-[17px] text-richblack-200 mb-3">
                  A verification code has been sent to you. Enter the code below
               </p>

               <form
                  onSubmit={submitHandler}
                  className="flex flex-col items-center gap-2"
               >
                  <div className="">
                     <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputType="text"
                        renderInput={(props) => (
                           <input
                              {...props}
                              className=" w-[40px] bg-richblack-800 "
                           />
                        )}
                        renderSeparator={<span style={{ width: "8px" }}></span>}
                        inputStyle={{
                           border: "1px solid",
                           borderColor: "GrayText",
                           borderRadius: "3px",
                           width: "45px",
                           height: "45px",
                           fontSize: "20px",
                           color: "#fff",
                           textAlign: "center",
                           fontWeight: "400",
                           caretColor: "blue",
                        }}
                     />
                  </div>

                  <div className=" w-full">
                     <button
                        className=" w-full"
                        type="submit"
                        onClick={submitHandler}
                     >
                        <CTAButton active={true}>Verify Email</CTAButton>
                     </button>
                  </div>
                  <div className="flex justify-between items-center w-full">
                     <Link className="" to={"/login"}>
                        <div className="flex flex-row gap-2 items-center ">
                           <FaArrowLeftLong />
                           Back
                        </div>
                     </Link>
                     <div>
                        <button
                           onClick={() => {
                              dispatch(sendOtp(signupData.email, navigate));
                           }}
                        >
                           Resend it
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         )}
      </div>
   );
};

export default VerifyEmail;
