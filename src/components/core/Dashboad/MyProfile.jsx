import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Iconbtn from "../../common/Iconbtn";
import { VscEdit } from "react-icons/vsc";

function MyProfile() {
  const [user] = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div>
      <h1>My Profile</h1>
      <div>
        <div>
          <imp
            src={user?.image}
            alt={`profile-${user?.fristName}`}
            className=" aspect-square w-[78px] rounded-full object-cover  "
          />
          <div>
            <p> {user?.fristName + " " + user?.lastName} </p>
            <p> {user?.email} </p>
          </div>
        </div>

        <Iconbtn
          text="Edit"
          onClick={() => {
            navigate("/dashboard/settings");
          }}
          children={<VscEdit />}
        />
      </div>
    </div>
  );
}

export default MyProfile;
