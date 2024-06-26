import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";

function ProfileDropDown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, image } = useSelector((state) => state.profile);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const data = {
    text1: "Are you sure?",
    text2: "You wiil be logged out from your account?",
    btn1Text: "Logout",
    btn2Text: "Cancel",
    btn1Handler: () => dispatch(logout(navigate)),
    btn2Handler: () => setConfirmationModal(null),
  };

  const [showMenue, setShowMenue] = useState(false);

  function confirmationHandler() {
    setConfirmationModal(data);
  }

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
        <div className="cursor-pointer " onClick={() => confirmationHandler()}>
          LogOut
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default ProfileDropDown;
