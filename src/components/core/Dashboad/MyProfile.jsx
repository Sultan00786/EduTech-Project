import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Iconbtn from "../../common/Iconbtn";
import { VscAdd, VscEdit, VscPulse, Vscplus } from "react-icons/vsc";
import Botton from "../Homepage/Botton";

function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  console.log("user1: ", user?.additionalDetails?.about);

  const { image } = user;
  const navigate = useNavigate();

  return (
    <div className=" text-white w-full flex flex-col gap-9 ">
      {/* Section 1 */}
      <section>
        <h1>My Profile</h1>
        <div>
          <div>
            <img
              src={image}
              className=" rounded-full w-[78px] aspect-square object-cover "
            />
            <div>
              <p> {user?.firstName + " " + user?.lastName} </p>
              <p> {user?.email} </p>
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
        </div>
      </section>

      {/* Section 2 */}
      {/* api call nahi ho rahi --> additionalDetails undifined b  aa raha hie */}
      <section>
        <div>
          <p>About</p>
          <div className=" -mt-8 w-fit  ">
            <Botton active={true} linkto="/dashboard/settings">
              <div className="flex flex-row items-center text-[16px] gap-x-2">
                <p>Edit</p>
                <VscEdit />
              </div>
            </Botton>
          </div>
        </div>
        <p>
          {user?.additionalDetails?.about
            ? user?.additionalDetails?.about
            : "Write something about Yourself"}
        </p>
      </section>

      {/* Section 3 */}
      <section>
        <div className=" flex flex-row items-center justify-between ">
          <p>Personal Details</p>
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
            <p>First Name</p>
            <p> {user?.firstName} </p>
          </div>

          <div>
            <p>Last Name</p>
            <p> {user?.lastName} </p>
          </div>

          <div>
            <p>Email</p>
            <p> {user?.email} </p>
          </div>

          <div>
            <p>Phone Number</p>
            <p>
              {" "}
              {user?.additionalDetails?.contactNamber ?? (
                <span className="flex flex-row items-center gap-3">
                  <VscAdd /> Add Phone Number
                </span>
              )}{" "}
            </p>
          </div>

          <div>
            <p>Gender</p>
            <p>
              {" "}
              {user?.additionalDetails?.gender ?? (
                <span className="flex flex-row items-center gap-3">
                  <VscAdd /> Add Gender
                </span>
              )}{" "}
            </p>
          </div>

          <div>
            <p>Date of Birth</p>
            <p>
              {" "}
              {user?.additionalDetails?.dateOfBirth ?? (
                <span className="flex flex-row items-center gap-3">
                  <VscAdd /> Add DOB
                </span>
              )}{" "}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyProfile;
