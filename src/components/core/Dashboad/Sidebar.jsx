import React, { useState } from "react";
import { logout } from "../../../services/operations/authAPI";
import { useSelector, useDispatch } from "react-redux";
import SidebarLink from "./SidebarLink";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";

function Sidebar() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  const data = {
    text1: "Are you sure?",
    text2: "You wiil be logged out from your account?",
    btn1Text: "Logout",
    btn2Text: "Cancel",
    btn1Handler: () => dispatch(logout(navigate)),
    btn2Handler: () => setConfirmationModal(null),
  };

  if (authLoading || profileLoading) {
    return (
      <div className=" h-[88vh] text-white flex justify-center ">
        <div className="loader" />
      </div>
    );
  }

  function confirmationHandler() {
    setConfirmationModal(data);
  }

  return (

<div className="min-h-[calc[100vh - 3.5rem]] border-r-[1px] border-richblack-700  bg-richblack-800">
      <div className="flex min-w-[222px] flex-col ">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            // console.log("------->",link.type);
            // ( undifined != undifined ) is false statement
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink link={link} iconName={link.icon} key={link.id} />
            );
          })}
        </div>

        <div className=" mx-auto mt-6 w-11/12 mb-5 border-t-[1px] border-richblack-600 "></div>

        {/* Setting */}
        <SidebarLink
          className=" h-full absolute -left-[22px]"
          link={{
            name: "Settings",
            path: "dashboard/settings",
          }}
          iconName="VscSettingsGear"
        />

        {/* Logout */}
        <button
          onClick={confirmationHandler}
          className="text-sm font-medium text-richblack-300 ml-[32px]"
        >
          <div className="flex items-center gap-x-2">
            <VscSignOut className=" text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default Sidebar;
