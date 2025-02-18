import toast from "react-hot-toast";
import { studentEndpoints } from "../api";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
   COURSE_PAYMENT_API,
   COURSE_VERIFY_API,
   SEND_PAYMENT_SUCCESS_EMAIL_API,
   BUY_COURSE_FREE_API,
} = studentEndpoints;

// Razorpay src loaded from Razorpay Documentation
async function loadScript(src) {
   return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
         resolve(true);
      };
      script.onerror = () => {
         resolve(false);
      };
      console.log(script);
      document.body.appendChild(script);
   });
}

export async function buyCourse(
   token,
   courses,
   userDetails,
   navigate,
   dispatch
) {
   const toastId = toast.loading("Loading...");
   console.log(courses);
   try {
      const res = await loadScript(
         "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
         toast.error("RazorPay SDK fail to load");
         return;
      }

      // initiate the order
      const orderResponse = await apiConnector(
         "POST",
         COURSE_PAYMENT_API,
         { courses },
         { Authorisation: `Bearer ${token}` }
      );
      if (!orderResponse.data.success) {
         throw new Error(orderResponse.data.message);
      }

      // option
      const options = {
         key: process.env.RAZORPAY_KEY,
         currency: orderResponse.data.message.currency,
         amount: `${orderResponse.data.message.amount}`,
         order_id: orderResponse.data.message.id,
         name: "StudyNotion",
         description: "Thank You for Purchasing the Course",
         image: rzpLogo,
         prefill: {
            name: `${userDetails.firstName}`,
            email: userDetails.email,
         },
         handler: function (response) {
            // send successful mail
            sendPaymentSuccessEmail(
               response,
               orderResponse.data.message.amount,
               token
            );

            // verifyPayment
            verifyPayment({ ...response, courses }, token, navigate, dispatch);
         },
      };
      //miss hogya tha
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", function (response) {
         toast.error("oops, payment failed");
         console.log(response.error);
      });
   } catch (error) {
      console.log("Payment Api error >> ", error);
      toast.error("Could not make Payment");
   }
   toast.dismiss(toastId);
}

export async function buyCourseFree(token, courses, navigate) {
   const toastId = toast.loading("Loading...");
   console.log(courses);
   try {
      const response = await apiConnector(
         "POST",
         BUY_COURSE_FREE_API,
         { courses },
         { Authorisation: `Bearer ${token}` }
      );
      if (!response.data.success) {
         throw new Error(response.data.message);
      }
      toast.success("Course Purchased Successfully");
      navigate("/dashboard/enrolled-courses");
   } catch (error) {
      console.log("Payment Api error >> ", error);
      toast.error("Could not make Payment");
   }
   toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
   try {
      await apiConnector(
         "POST",
         SEND_PAYMENT_SUCCESS_EMAIL_API,
         {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
         },
         { Authorisation: `Bearer ${token}` }
      );
   } catch (error) {
      console.log("Payment Success email error ...... ", error);
   }
}

// verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
   const toastId = toast.loading("Verityng Payment...");
   dispatch(setPaymentLoading(true));
   try {
      const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
         Authorisation: `Bearer ${token}`,
      });
      if (!response.data.success) {
         throw new Error(response.data.message);
      }

      toast.success("Payment Successful, you are added to the course");
      navigate("/dashboard/enrolled-courses");
      dispatch(resetCart());
   } catch (error) {
      console.log("Payment Verify Error.....", error);
      toast.error("Could not verify Payment");
   }
   toast.dismiss(toastId);
   dispatch(setPaymentLoading(false));
}
