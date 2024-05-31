import React from "react";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

function Setting() {
  return (
    <div className=" text-white w-11/12 mx-auto ">
      <h1 className=" text-3xl font-bold">Edit Profile</h1>

      <div className=" flex flex-col gap-8 mt-12">
        <ChangeProfilePicture />

        <EditProfile />

        <UpdatePassword />

        <DeleteAccount />
      </div>
    </div>
  );
}

export default Setting;
