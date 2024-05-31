import React from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../../../services/operations/SettingsAPI";

function DeleteAccount() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerDelete = () => {
    if (user.accountType === "Instructor") {
      toast.error("We Can't delete Instructor Account");
    } else {
      dispatch(deleteProfile(token, navigate));
    }
  };
  return (
    <div className=" bg-pink-900 flex gap-6 mt-24 px-10 py-7 rounded-lg border-[1px] border-pink-700 ">
      <div className=" bg-pink-600 h-fit text-3xl text-pink-100 p-3 font-bold rounded-full">
        <RiDeleteBin6Line />
      </div>
      <div className=" flex flex-col gap-3">
        <h1 className="text-richblack-5 font-bold text-xl ">Delete Account</h1>
        <div className=" text-richblue-5 text-md">
          <p>Would you like to delete account?</p>
          <p>
            This account contains Paid Courses. Deleting your account will
            remove all the contain associated with it.
          </p>
        </div>
        <button
          className=" text-start w-fit text-pink-500 text-lg font-semibold underline hover:text-pink-700 "
          onClick={handlerDelete}
        >
          <i>I want to delete my account.</i>
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;
