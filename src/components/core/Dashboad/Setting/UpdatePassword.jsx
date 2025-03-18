import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Iconbtn from "../../../common/Iconbtn";
import { IoEye, IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../../services/operations/SettingsAPI";

function UpdatePassword() {
   const {
      setValue,
      getValues,
      handleSubmit,
      register,
      formState: { errors },
   } = useForm();

   const navigate = useNavigate();
   const { token } = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   const [hide1, setHide1] = useState(true);
   const [hide2, setHide2] = useState(true);

   const handlerchangePass = () => {
      const value = getValues();
      const formData = new FormData();

      if (value.currentPass === value.newPass) {
         toast.error(
            "Current Password and New Password should have different !!"
         );
      } else {
         formData.append("oldPassword", value.currentPass);
         formData.append("newPassword", value.newPass);
         dispatch(changePassword(token, formData));
      }
   };

   return (
      <div className=" mt-24  relative bg-richblack-800 rounded-md px-10 py-7">
         <h2 className=" text-richblack-5 font-bold text-xl mb-8 ">
            Change PassWord
         </h2>
         <form onSubmit={handleSubmit(handlerchangePass)}>
            <div className="flex flex-col md:flex-row gap-3 mt-5">
               <div className=" w-full flex flex-col gap-2">
                  <label htmlFor="currentPass" className="lable-style">
                     Current Password
                  </label>
                  <input
                     id="currentPass"
                     name="currentPass"
                     type={hide1 ? "password" : "text"}
                     placeholder="Enter Current Password"
                     className=" form-style"
                     {...register("currentPass", { required: true })}
                  />
                  <div
                     className=" text-richblack-100 text-xl absolute md:left-[425px] right-12 md:right-0 bottom-[130px] md:bottom-[40px] cursor-pointer"
                     onClick={() => setHide1(!hide1)}
                  >
                     {hide1 ? <IoEye /> : <IoEyeOff />}
                  </div>
                  {errors.currentPass && (
                     <span>Current Password is required</span>
                  )}
               </div>
               <div className=" w-full flex flex-col gap-2">
                  <label htmlFor="newPass" className="lable-style">
                     New Password
                  </label>
                  <input
                     id="newPass"
                     name="newPass"
                     type={hide2 ? "password" : "text"}
                     placeholder="Enter New Password"
                     className=" form-style"
                     {...register("newPass", { required: true })}
                  />
                  <div
                     className=" text-richblack-100 text-xl absolute right-12 bottom-[40px] cursor-pointer"
                     onClick={() => setHide2(!hide2)}
                  >
                     {hide2 ? <IoEye /> : <IoEyeOff />}
                  </div>
                  {errors.newPass && <span>New Password is required</span>}
               </div>
            </div>

            <div className=" absolute right-0 -bottom-16 flex items-center gap-2">
               <button
                  onClick={() => {
                     navigate("/dashboard/my-profile");
                  }}
                  className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
               >
                  cancle
               </button>

               <button type="submit">
                  <Iconbtn text="Save" />
               </button>
            </div>
         </form>
      </div>
   );
}

export default UpdatePassword;
