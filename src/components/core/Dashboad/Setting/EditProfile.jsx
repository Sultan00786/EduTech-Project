import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Iconbtn from "../../../common/Iconbtn";
import toast from "react-hot-toast";
import { setLoading } from "../../../../slices/profileSlice";
import { updateProfile } from "../../../../services/operations/SettingsAPI";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

function EditProfile() {
   const { user } = useSelector((state) => state.profile);
   const { token } = useSelector((state) => state.auth);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const submitProfileForm = async (data) => {
      try {
         dispatch(updateProfile(token, data));
      } catch (error) {
         console.log("ERROR MESSAGE - ", error.message);
      }
   };

   return (
      <>
         <form onSubmit={handleSubmit(submitProfileForm)}>
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
               <h2 className="text-lg font-semibold text-richblack-5">
                  Profile Information
               </h2>
               <div className="flex flex-col gap-5 lg:flex-row">
                  <div className="flex flex-col gap-2 lg:w-[48%]">
                     <label htmlFor="firstName" className="lable-style">
                        First Name
                     </label>
                     <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter first name"
                        {...register("firstName", { required: true })}
                        defaultValue={user?.firstName}
                        className="form-style"
                     />
                     {errors.firstName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                           Please enter your first name.
                        </span>
                     )}
                  </div>
                  <div className="flex flex-col gap-2 lg:w-[48%]">
                     <label htmlFor="lastName" className="lable-style">
                        Last Name
                     </label>
                     <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter last name"
                        {...register("lastName", { required: true })}
                        defaultValue={user?.lastName}
                        className="form-style"
                     />
                     {errors.lastName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                           Please enter your last name.
                        </span>
                     )}
                  </div>
               </div>

               <div className="flex flex-col gap-5 lg:flex-row">
                  <div className="flex flex-col gap-2 lg:w-[48%]">
                     <label htmlFor="dateOfBirth" className="lable-style">
                        Date of Birth
                     </label>
                     <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        {...register("dateOfBirth", { required: true })}
                        defaultValue={user?.additionalDetails?.dateOfBirth}
                        className="form-style"
                     />
                     {errors.dateOfBirth && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                           Please enter your Date of Birth.
                        </span>
                     )}
                  </div>
                  <div className="flex flex-col gap-2 lg:w-[48%]">
                     <label htmlFor="gender" className="lable-style">
                        Gender
                     </label>
                     <select
                        type="text"
                        name="gender"
                        id="gender"
                        {...register("gender", { required: true })}
                        defaultValue={user?.additionalDetails?.gender}
                        className="form-style"
                     >
                        <option value="">Select Gender</option>
                        {genders.map((ele, i) => {
                           return (
                              <option key={i} value={ele}>
                                 {ele}
                              </option>
                           );
                        })}
                     </select>
                     {errors.gender && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                           Please enter your Gender.
                        </span>
                     )}
                  </div>
               </div>

               <div className="flex flex-col gap-5 lg:flex-row">
                  <div className="flex flex-col gap-2 lg:w-[48%]">
                     <label htmlFor="contactNumber" className="lable-style">
                        Contact Number
                     </label>
                     <input
                        type="tel"
                        name="contactNumber"
                        id="contactNumber"
                        placeholder="Enter Contact Number"
                        {...register("contactNumber", {
                           required: {
                              value: true,
                              message: "Please enter your Contact Number.",
                           },
                           maxLength: {
                              value: 12,
                              message: "Invalid Contact Number",
                           },
                           minLength: {
                              value: 10,
                              message: "Invalid Contact Number",
                           },
                        })}
                        defaultValue={user?.additionalDetails?.contactNumber}
                        className="form-style"
                     />
                     {errors.contactNumber && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                           {errors.contactNumber.message}
                        </span>
                     )}
                  </div>
                  <div className="flex flex-col gap-2 lg:w-[48%]">
                     <label htmlFor="about" className="lable-style">
                        About
                     </label>
                     <input
                        type="text"
                        name="about"
                        id="about"
                        placeholder="Enter Bio Details"
                        {...register("about", { required: true })}
                        defaultValue={user?.additionalDetails?.about}
                        className="form-style"
                     />
                     {errors.about && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                           Please enter your About.
                        </span>
                     )}
                  </div>
               </div>
            </div>
            <div className="flex justify-end gap-2">
               <button
                  onClick={() => {
                     navigate("/dashboard/my-profile");
                  }}
                  className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
               >
                  Cancel
               </button>
               <Iconbtn type="submit" text="Save" />
            </div>
         </form>
      </>
   );
}

export default EditProfile;
