const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// auth
exports.auth = async (req, res, next) => {
   /**
    * Step: 1 --> extract token
    * Step: 2 --> check if token missing
    * Step: 3 --> verify the token
    * Step: 4 --> write next() for next middleware
    */

   try {
      // extract token
      console.log(req.header("Authorisation"));
      const token = await (req.cookies.token ||
         req.body.token ||
         req.header("Authorisation").replace("Bearer ", ""));
      // check if token missing
      if (!token) {
         return res.status(401).json({
            success: false,
            message: "Token is missing ",
         });
      }

      // verify the token
      try {
         const decode = jwt.verify(token, process.env.JWT_SECRET);
         req.user = decode;
      } catch (error) {
         console.log(error);
         return res.status(401).json({
            success: false,
            message: "token is invalid",
         });
      }

      // write next() for next middleware
      console.log("Token is verified");
      next();
   } catch (error) {
      return res.status(401).json({
         success: false,
         message: "Something went wrong while validating the token",
         message: error.message,
      });
   }
};

// isStudent

exports.isStudent = async (req, res, next) => {
   try {
      // take role from req.user and check for user role is not equal to Student role
      if (req.user.accountType !== "Student") {
         return res.status(401).json({
            success: false,
            message: "This is a protected route for students only",
         });
      }

      // if it Student role then next()
      next();
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "User role cannot be verified, please try again",
      });
   }
};

// isInstructor

exports.isInstructor = async (req, res, next) => {
   try {
      // take role from req.user and check for user role is not equal to Instructor role
      if (req.user.accountType !== "Instructor") {
         return res.status(401).json({
            success: false,
            message: "This is a protected route for Instructor only",
         });
      }

      // if it Instructor role then next()
      next();
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "User role cannot be verified, please try again",
      });
   }
};

// isAdmin

exports.isAdmin = async (req, res, next) => {
   try {
      // take role from req.user and check for user role is not equal to Admin role
      if (req.user.accountType !== "Admin") {
         console.log("Accout Type is: ", req.user.accountType);
         return res.status(401).json({
            success: false,
            message: "This is a protected route for Admin only",
         });
      }

      // if it Admin role then next()
      next();
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "User role cannot be verified, please try again",
      });
   }
};
