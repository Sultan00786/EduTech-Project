import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboad/Sidebar";

function Dashborad() {
  const { loading: authLoding } = useSelector((state) => state.auth);
  const { loading: profileLoding } = useSelector((state) => state.profile);

  if (authLoding || profileLoding) {
    return (
      <div className=" h-[88vh] text-white flex justify-center ">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className=" relative flex min-h-[calc(100vh-3.5rem)] ">
      <Sidebar />
      <div className=" py-10 ">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashborad;
