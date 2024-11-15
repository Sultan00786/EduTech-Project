import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";
import { apiConnector } from "../apiconnector";
import { user } from "../api";
import toast from "react-hot-toast";

const {
   SENDOTP_API,
   SIGNUP_API,
   RESETPASSWORD_API,
   RESETPASSTOKEN_API,
   LOGIN_API,
} = user;

export function sendOtp(email, navigate) {
   return async (dispatch) => {
      const toatId = toast.loading("Loading...");
      dispatch(setLoading(true));

      try {
         const response = await apiConnector(
            "POST",
            SENDOTP_API,
            {
               email,
               chckUserPresent: true,
            }
         );
         console.log("SENDOTP API RESPONSE........", response);
         console.log(response.data.success);

         if (!response.data.success) {
            throw new Error(response.data.message);
         }
         toast.success("OTP Sent Successfully");
         navigate("/verify-email"); // navigate to verify email page
      } catch (error) {
         dispatch(setLoading(false));
         toast.error("Could Not Send OTP");
      }

      dispatch(setLoading(false));
      toast.dismiss(toatId);
   };
}

export function signUp(
   accountType,
   firstName,
   lastName,
   email,
   password,
   confirmPassword,
   otp,
   navigate
) {
   return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
      try {
         const response = await apiConnector(
            "POST",
            SIGNUP_API,
            {
               accountType,
               firstName,
               lastName,
               email,
               password,
               confirmPassword,
               otp,
            }
         );

         console.log(
            "\n\nSIGNUP API RESPONSE............",
            response
         );

         if (!response.data.success) {
            throw new Error(response.data.message);
         }
         toast.success("Signup Successful");
         navigate("/login");
      } catch (error) {
         console.log("SIGNUP API ERROR............", error);
         toast.error("Signup Failed");
         navigate("/signup");
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
   };
}

export function login(email, password, navigate) {
   return async (dispatch) => {
      dispatch(setLoading(true));

      try {
         const response = await apiConnector("POST", LOGIN_API, {
            email,
            password,
         });

         console.log("RESPONSE OF LOGIN API.... ", response);

         //  if response.data.success is not present then
         if (!response?.data?.success) {
            throw new Error(response?.data?.message);
         }

         console.log("token >> ", response?.data?.token);
         console.log("user >> ", response?.data?.user);

         // store token
         dispatch(setToken(response?.data?.token));

         // now store user data and image
         const userImage = response?.data?.user?.image
            ? response?.data?.user?.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response?.data?.user?.firstName} ${response?.data?.user?.lastName}`;

         dispatch(
            setUser({
               ...response.data.user,
               image: userImage,
            })
         );

         // also stor toke in local storage as JSON format
         localStorage.setItem(
            "token",
            JSON.stringify(response?.data?.token)
         );
         localStorage.setItem(
            "user",
            JSON.stringify(response?.data?.user)
         );

         // After Login Done we will have to navigate no profile dashboard
         navigate("/dashboard/my-profile");

         toast.success("LogIn SuccessFully");
      } catch (error) {
         console.log("RESET PASSWOARD ERROR\n", error);
         toast.error("Fail to LOGIN");
      }

      dispatch(setLoading(false));
   };
}

export function logout(navigate) {
   return (dispatch) => {
      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(resetCart());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged Out");
      navigate("/");
   };
}

export function getPassWordResetToken(email, setEmailSent) {
   return async (dispatch) => {
      dispatch(setLoading(true));
      try {
         const response = await apiConnector(
            "POST",
            RESETPASSTOKEN_API,
            {
               email,
            }
         );
         console.log(
            "Reset Password Token Response: ",
            response
         );

         // if response.data is not present
         // then throw error
         if (!response.data.success) {
            throw new Error(response.data.message);
         }

         // if response.data is presnt then
         toast.success("Reset Email Send");
         setEmailSent(true);
      } catch (error) {
         console.log("RESET PASSWOARD TOKEN ERROR\n", error);
         toast.error("Fail to Send Email");
      }

      dispatch(setLoading(false));
   };
}

export function resetPassword(password, confirmPassword, token) {
   return async (dispatch) => {
      dispatch(setLoading(true));

      try {
         const response = await apiConnector(
            "POST",
            RESETPASSWORD_API,
            {
               password,
               confirmPassword,
               token,
            }
         );
         console.log(
            "RESET PASSWOARD API RESPONSE...\n",
            response
         );

         //  if response.data.success is not present then
         if (!response.data.success) {
            throw new Error(response.data.message);
         }

         // if its present then pop up toast
         toast.success("Password change successfully");
      } catch (error) {
         console.log("RESET PASSWOARD ERROR\n", error);
         toast.error("Fail to Change Password");
      }

      dispatch(setLoading(false));
   };
}
