import toast from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { user } from "../api";
import { profileEndPoint } from "../api";
import { logout } from "./authAPI";

const {
  CHANGE_PROFILE_PICTURE_API,
  UPDATE_PROFILE_API,
  DELETE_PROFILE_API,
  CHANGE_PASSWORD_API,
} = profileEndPoint;

export function changeProfilePicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Uploading...");

    try {
      // console.log("imgFile->changeDP ", imgFile);
      // console.log("user->changeDP ", user);
      const response = await apiConnector(
        // Backend api call hoga and db mai display picture ko update karega
        "PUT",
        CHANGE_PROFILE_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorisation: `Bearer ${token}`,
        }
      );
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      );

      if (!response.data.success) throw new Error(response.data.message);

      toast.success("Uploaded Successful");
<<<<<<< HEAD

      dispatch(setUser(response?.data?.data)); // setUser update the value of user in localstorage or slice\

      localStorage.setItem("user", JSON.stringify(response.data.data));
      console.log("Local user << >> ", localStorage.getItem("user"));

      return response;
=======
      dispatch(setUser(response.data.data)); // setUser update the value of user in localstorage or slice
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
    } catch (error) {
      console.log(
        "CHANGE_PROFILE_PICTURE_API Error........",
        error.response.data
      );
      toast.error("Could Not Update Display Picture");
    }

    toast.dismiss(toastId);
  };
}

export function updateProfile(token, formData) {
<<<<<<< HEAD
  console.log(
    "Maki Ch*t ......................................................"
  );
=======
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
<<<<<<< HEAD
        Authorisation: `Bearer ${token}`,
=======
        Authorization: `Bearer ${token}`,
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
      });
      console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

<<<<<<< HEAD
      // const userImage = response.data.updatedUserDetails.image
      //   ? response.data.updatedUserDetails.image
      //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;

      dispatch(setUser(response?.data?.data));
      localStorage.setItem("user", JSON.stringify(response?.data?.data));

=======
      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;

      dispatch(
        setUser({
          ...response.data.updatedUserDetails,
          image: userImage,
        })
      );
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Update Profile");
    }
    toast.dismiss(toastId);
  };
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
<<<<<<< HEAD
      Authorisation: `Bearer ${token}`,
=======
      Authorization: `Bearer ${token}`,
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
    });
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Password Changed Successfully"); // user password is not stored in local storage. It only store in DB
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
<<<<<<< HEAD
        Authorisation: `Bearer ${token}`,
=======
        Authorization: `Bearer ${token}`,
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
      });
      console.log("DELETE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Deleted Successfully");
      dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Delete Profile");
    }
    toast.dismiss(toastId);
  };
}
