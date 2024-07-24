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
  console.log(user);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const isFormUpdate = (data) => {
    if (data.firstName !== user.firstName) return true;
    if (data.lastName !== user.lastName) return true;
    if (data.dateOfBirth !== user.additionalDetails.dateOfBirth) return true;
    if (data.gender !== user.additionalDetails.gender) return true;
    if (data.number !== user.additionalDetails.contactNamber) return true;
    if (data.about !== user.additionalDetails.about) return true;

    return false;
  };

  const onsubmit = async (data) => {
    if (isFormUpdate(data)) {
      const formData = new FormData();
      const values = getValues();

      formData.append("firstName", values.firstName);
      console.log(values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("dateOfBirth", values.dateOfBirth);
      formData.append("gender", values.gender);
      formData.append("contactNumber", values.contactNumber);
      formData.append("about", values.about);

      formData.append("userId", user._id);

      const proId = user.additionalDetails._id
        ? user.additionalDetails._id
        : user.additionalDetails;
      formData.append("profileId", proId);

      // Api Call
      dispatch(updateProfile(token, formData));
    } else {
      toast.error("Enter updated values in field !!");
      return;
    }
  };

  return (
    <div className=" relative bg-richblack-800 rounded-md px-10 py-7">
      <form onSubmit={handleSubmit(onsubmit)}>
        <h2 className=" text-richblack-5 font-bold text-xl mb-8 ">
          Profile Information
        </h2>
        <div className=" flex flex-col gap-7 mt-5">
          <div className="flex justify-between gap-3">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="firstName" className=" lable-style">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style"
                {...register("firstName", { require: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="lastName" className=" lable-style">
                Last Name
              </label>
              <input
                type="text"
                name="last"
                id="last"
                placeholder="Enter last name"
                className="form-style"
                {...register("lastName", { require: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-3">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth Cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((elem, index) => (
                  <option value={elem} key={index}>
                    {elem}
                  </option>
                ))}
              </select>
              {errors.gender && <span>Please select your gender</span>}
            </div>
          </div>

          <div className="flex justify-between gap-3">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>
              <input
                type="number"
                name="contactNumber"
                id="contactNumber"
                className="form-style"
                placeholder="Enter contact number"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number",
                  },
                  maxLength: { value: 12, message: "Invalid Phone Number" },
                  minLenght: { value: 10, message: "Invalid Phone Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>
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

export default EditProfile;
