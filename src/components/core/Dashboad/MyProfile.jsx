import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Iconbtn from "../../common/Iconbtn";
import { VscAdd, VscEdit, VscPulse, Vscplus } from "react-icons/vsc";
import { IoIosAddCircle } from "react-icons/io";
import Botton from "../Homepage/Botton";

function MyProfile() {
  const { user } = useSelector((state) => state.profile);

  const { image } = user;
  const navigate = useNavigate();

  return (
    <div>
      <h1 className=" text-3xl text-richblue-5 font-bold mb-14">My Profile</h1>
      <div className=" text-white w-full flex flex-col gap-9 ">
        {/* Section 1 */}
        <section className=" bg-richblack-800 flex items-center justify-between px-12 py-7 rounded-md">
          <div className="flex items-center gap-3">
            <img
              src={image}
              className=" rounded-full w-[78px] aspect-square object-cover "
            />
            <div>
              <p className=" text-xl text-richblack-5 font-semibold">
                {" "}
                {user?.firstName + " " + user?.lastName}{" "}
              </p>
              <p className=" text-richblack-200 text-sm"> {user?.email} </p>
            </div>
          </div>
          <div className=" -mt-8 w-fit  ">
            <Botton active={true} linkto="/dashboard/settings">
              <div className="flex flex-row items-center text-[16px] gap-x-2">
                <p>Edit</p>
                <VscEdit />
              </div>
            </Botton>
          </div>
        </section>

        {/* Section 2 */}
        {/* api call nahi ho rahi --> additionalDetails undifined b  aa raha hie */}
        <section className=" bg-richblack-800 flex flex-col gap-10 px-12 py-7 rounded-md">
          <div className=" flex justify-between items-center">
            <p className=" text-xl text-richblack-5 font-semibold">About</p>
            <div className=" -mt-8 w-fit  ">
              <Botton active={true} linkto="/dashboard/settings">
                <div className="flex flex-row items-center text-[16px] gap-x-2">
                  <p>Edit</p>
                  <VscEdit />
                </div>
              </Botton>
            </div>
          </div>
          <p className=" text-richblack-200 text-md">
            {user?.additionalDetails?.about
              ? user?.additionalDetails?.about
              : "Write something about Yourself"}
          </p>
        </section>

        {/* Section 3 */}
        <section className=" bg-richblack-800 flex flex-col gap-10 px-12 py-7 rounded-md">
          <div className=" flex flex-row items-center justify-between ">
            <p className=" text-xl text-richblack-5 font-semibold">
              Personal Details
            </p>
            <div className=" -mt-8 w-fit ">
              <Botton active={true} linkto="/dashboard/settings">
                <div className="flex flex-row items-center text-[16px] gap-x-2">
                  <p>Edit</p>
                  <VscEdit />
                </div>
              </Botton>
            </div>
          </div>

          <div className=" grid grid-cols-2 grid-rows-3 gap-6">
            <div>
              <p className=" text-richblack-200 text-md">First Name</p>
              <p> {user?.firstName} </p>
            </div>

            <div>
              <p className=" text-richblack-200 text-md">Last Name</p>
              <p> {user?.lastName} </p>
            </div>

            <div>
              <p className=" text-richblack-200 text-md">Email</p>
              <p> {user?.email} </p>
            </div>

            <div>
              <p className=" text-richblack-200 text-md">Phone Number</p>
              <p>
                {user?.additionalDetails?.contactNamber ?? (
                  <span className="flex flex-row items-center gap-3">
                    <IoIosAddCircle /> Add Phone Number
                  </span>
                )}
              </p>
            </div>

            <div>
              <p className=" text-richblack-200 text-md">Gender</p>
              <p>
                {user?.additionalDetails?.gender ?? (
                  <span className="flex flex-row items-center gap-3">
                    <IoIosAddCircle /> Add Gender
                  </span>
                )}
              </p>
            </div>

            <div>
              <p className=" text-richblack-200 text-md">Date of Birth</p>
              <p>
                {user?.additionalDetails?.dateOfBirth ?? (
                  <span className="flex flex-row items-center gap-3">
                    <IoIosAddCircle /> Add DOB
                  </span>
                )}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyProfile;
