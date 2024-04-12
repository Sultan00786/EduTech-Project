import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from "../../../assets/Logo/Logo-Small-Light.png"

function ProfileDropDown() {

  const {user} = useSelector( (state) => state.profile );
  console.log("user = ", user?.image )

  return (
    <Link to={"/dashboard/my-profile/"}>
      <img
        width={30} 
        className=' rounded-full ' 
        src={user?.image}
      />
    </Link>
  )
}

export default ProfileDropDown