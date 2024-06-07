import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { logout } from "../../../services/operations/authAPI";

function ProfileDropDown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, image } = useSelector((state) => state.profile);

  const [showMenue, setShowMenue] = useState(false);

  return (
    <div
      onClick={() => {
        setShowMenue(!showMenue);
      }}
      className=" relative flex items-center gap-1  "
    >
      <img
        width={27}
        className="aspect-square rounded-full object-cover"
        src={image ? image : user.image}
      />

      <div className=" text-richblack-200 font-medium cursor-pointer ">
        <FaChevronDown />
      </div>

      <div
        className={` flex flex-col content-start z-50 ${
          !showMenue ? " opacity-0 " : " opacity-100 "
        } bg-richblack-800 text-richblack-100 absolute top-10 -left-3 border-[1px] rounded-md px-4 py-2 border-richblack-600 `}
      >
        <div
          className=" w-full cursor-pointer"
          onClick={() => {
            navigate("/dashboard/my-profile");
          }}
        >
          Dashboard
        </div>
        <div
          className="cursor-pointer "
          onClick={() => dispatch(logout(navigate))}
        >
          LogOut
        </div>
      </div>
    </div>
  );
}

export default ProfileDropDown;
