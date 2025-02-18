const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const {
   courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const {
   paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");

// add free course to user
exports.addFreeCourseToUser = async (req, res) => {
   try {
      const { courses } = req.body;
      const userId = req.user.id;

      if (courses.length === 0) {
         return res.status(400).json({
            success: false,
            message: "Please provide course id",
         });
      }

      // check if course is free
      const coursePromises = courses.map(async (courseId) => {
         const course = await Course.findById(courseId);
         if (!course) {
            throw new Error(`Course with ID ${courseId} not found`);
         }

         if (course.price !== 0) {
            throw new Error(`Course with ID ${courseId} is not free`);
         }

         return course;
      });

      await Promise.all(coursePromises);

      const user = await User.findById(userId);
      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found",
         });
      }

      await enrollStudentFunc(courses, userId, res);

      return res.status(200).json({
         success: true,
         message: "Course added to user",
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

// for multiple order

exports.capturePayment = async (req, res) => {
   const { courses } = req.body;
   console.log(courses);
   const userId = req.user.id;

   if (courses.length === 0) {
      return res.json({
         success: false,
         message: "please provid course id",
      });
   }

   let totalAmount = 0;
   // loop for calculating total payement amount
   for (const course_id of courses) {
      let course;
      try {
         course = await Course.findById(course_id);
         if (!course) {
            return res.status(200).json({
               success: false,
               message: "Could not find the course",
            });
         }

         const uid = new mongoose.Types.ObjectId(userId);
         if (course.studentsEnrolled.includes(uid)) {
            return res.status(200).json({
               success: false,
               message: "Could not find the course",
            });
         }
         totalAmount += course.price;
      } catch (error) {
         console.log(error);
         return res.status(500).json({
            success: false,
            message: error.message,
         });
      }
   }

   // option for input
   const currency = "INR";
   const options = {
      amount: totalAmount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
   };

   // creating order instance
   try {
      const paymentResponse = await instance.orders.create(options);
      res.json({
         success: true,
         message: paymentResponse,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "Could not Initiate Order",
      });
   }
};

// verify Signature of Razorpay and Server
exports.verifySignature = async (req, res) => {
   const razorpay_order_id = req.body?.razorpay_order_id;
   const razorpay_payement_id = req.body?.razorpay_payment_id;
   const razorpay_signature = req.body?.razorpay_signature;
   const courses = req.body?.courses;
   const userId = req.user?.id;

   console.log(req.body);

   // if (
   //   !razorpay_order_id ||
   //   !razorpay_payement_id ||
   //   !razorpay_signature ||
   //   !courses ||
   //   !userId
   // )
   //   return res.status(200).json({
   //     success: false,
   //     message: "Payment Fail",
   //   });

   let body = razorpay_order_id + "|" + razorpay_payement_id;
   const expectedSigniture = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

   console.log(expectedSigniture);
   console.log(razorpay_signature);

   if (expectedSigniture == razorpay_signature) {
      // enrolled students in courses
      await enrollStudentFunc(courses, userId, res);

      // return res
      return res.status(200).json({
         success: true,
         message: "Payment Verified",
      });
   }

   return res.status(200).json({
      success: false,
      message: "expectedSigniture is not valid, Payment Failed",
   });
};

const enrollStudentFunc = async (courses, userId, res) => {
   if ((!courses, !userId)) {
      return res.status(400).json({
         success: false,
         message: "Please Provide data for Courses or UserId",
      });
   }
   for (const courseId of courses) {
      try {
         // find the course and enroll the studen in it
         const enrolledCourse = await Course.findOneAndUpdate(
            { _id: courseId },
            { $push: { studentsEnrolled: userId } },
            { new: true }
         );

         if (!enrolledCourse) {
            return res
               .status(500)
               .json({ success: false, message: "Course not Found" });
         }

         const courseProgress = await CourseProgress.create({
            courseID: courseId,
            userId: userId,
            completedVideos: [],
         });

         console.log("Course Progress create >> ", courseProgress);

         // fint student and add the course to thier list of enrolledCourses
         const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            {
               $push: { courses: courseId, courseProgress: courseProgress._id },
            },
            { new: true }
         );

         const emailResponse = await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(
               enrolledCourse.courseName,
               `${enrolledStudent.firstName}`
            )
         );
      } catch (error) {
         console.log(error);
         return res.status(500).json({
            success: false,
            message: error.message,
         });
      }
   }
};

exports.sendPaymentSuccesssEmail = async (req, res) => {
   const { orderId, paymentId, amount } = req.body;
   const userId = req.user.id;

   if (!orderId || !paymentId || !amount || !userId) {
      return res
         .status(400)
         .json({ success: false, message: "Please provide all the fields" });
   }

   try {
      // find student
      const enrolledStudent = await User.findById(userId);
      await mailSender(
         enrolledStudent.email,
         `Payment Recieved`,
         paymentSuccessEmail(`${enrolledStudent.firstName}`),
         amount / 100,
         orderId,
         paymentId
      );
   } catch (error) {
      console.log("error in sending main :", error);
      return res
         .status(500)
         .json({ success: false, message: "Could not send email" });
   }
};

// // for Single order
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
