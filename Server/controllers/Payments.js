const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const { mailSender } = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");

// for multiple order


// for Single order
// // capture the payment and initiate the Razorpay ordr
// exports.capturePayment = async (req, res) => {
//   /**
//    * Step: 1 --> get courseId and userId
//    * Step: 2 --> validation
//    * Step: 3 --> validation courseId
//    * Step: 4 --> validation courseDetail
//    * Step: 5 --> user already pay for the same course
//    * Step: 6 --> order create
//    * Step: 7 --> initiate the payment using razorpay
//    * Step: 8 --> return res
//    */

//   // * Step: 1 --> get courseId and userId
//   const { course_id } = req.body;
//   const userId = req.user.id;

//   // * Step: 2 --> validation

//   // * Step: 3 --> validation courseId
//   if (!course_id) {
//     return res.json({
//       success: false,
//       message: "Plear Provide Valid Course Id",
//     });
//   }

//   // * Step: 4 --> validation courseDetail
//   let course;
//   try {
//     course = await Course.findById(course_id);
//     if (!course) {
//       return res.json({
//         success: false,
//         message: "Could Not Find The Course",
//       });
//     }

//     // * Step: 5 --> user already pay for the same course
//     const uid = new mongoose.Types.ObjectId(userId);
//     if (course.studentsEnrolled.includes(uid)) {
//       return res.status(200).json({
//         success: false,
//         message: "Student is already enrolled",
//       });
//     }
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: error.message,
//     });
//   }

//   // * Step: 6 --> order create
//   const amount = course.price;
//   const currency = "INR";

//   // option use for creating order
//   const option = {
//     amount: amount * 100,
//     currency,
//     receipt: Math.random(Date.now()).toString(),
//     notes: {
//       course_id: course_id,
//       userId,
//     },
//   };

//   try {
//     // * Step: 7 --> initiate the payment using razorpay(creating order)
//     const paymentResponse = await instance.orders.create(option);
//     console.log(paymentResponse);

//     // * Step: 8 --> return res
//     return res.status(200).json({
//       success: true,
//       courseName: course.courseName,
//       courseDescription: course.courseDiscription,
//       thumbnail: course.thumbnail,
//       orderId: paymentResponse.id,
//       currency: paymentResponse.currency,
//       amount: paymentResponse.amount,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Could Not Initiate Order",
//     });
//   }
// };

// // verify Signature of Razorpay and Server
// exports.verifySignature = async (res, req) => {
//   // Get signature form razorpay headers (it in encrypted form)
//   const signature = req.headers["x-razorpay-signature"];

//   // let suppose webserver having scerete key in unencrypted form
//   const webhookSecret = "12345678";

//   // get key converted in encrypted key
//   const shasum = crypto.createHmac("sha256", webhookSecret);
//   // sha256 -> algo for encryption

//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");

//   if (signature === digest) {
//     console.log("Payment Is Authorised.");

//     // main:--> After authorisation add course id in user schema
//     const { courseId, userId } = req.body.payload.payment.entity.notes;

//     try {
//       // find the course and enroll the student in it
//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseId },
//         {
//           $push: {
//             studentsEnrolled: userId,
//           },
//         },
//         { new: true }
//       );

//       if (!enrolledCourse) {
//         return res.status(500).json({
//           success: false,
//           message: "Course Not Found",
//         });
//       }
//       console.log(enrolledCourse);

//       // find the student and add the course to their list enrolled courses
//       const enrolledStudent = await User.findOneAndUpdate(
//         { _id: userId },
//         {
//           $push: {
//             courses: courseId,
//           },
//         },
//         { new: true }
//       );
//       console.log(enrolledStudent);

//       // Send Confirmation mail to the user
//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         "Congratulaions from CodeHelp",
//         "Congratulaion, you are onboarded into new CodeHelp Course"
//       );

//       console.log(emailResponse);

//       // return res
//       return res.status(200).json({
//         success: true,
//         message: "Signature Verified And Course Addedd.",
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   } else {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid Request",
//     });
//   }
// };
