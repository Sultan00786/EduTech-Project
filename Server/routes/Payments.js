// Import the required modules
const express = require("express");
const router = express.Router();

const {
   capturePayment,
   verifySignature,
   sendPaymentSuccesssEmail,
   addFreeCourseToUser,
} = require("../controllers/Payments");
const {
   auth,
   isInstructor,
   isStudent,
   isAdmin,
} = require("../middlewares/auth");
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature", auth, isStudent, verifySignature);
router.post(
   "/sendPaymentSuccessEmail",
   auth,
   isStudent,
   sendPaymentSuccesssEmail
);
router.post("/buyCourseFree", auth, isStudent, addFreeCourseToUser);

module.exports = router;
