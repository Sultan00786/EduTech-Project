const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// forgot password
exports.resetPasswordEmail = async (req, res) => {
   /**
    * Step: 1 --> get email from req body
    * Step: 2 --> check user for this email, email vilation
    * Step: 3 --> generate token
    * Step: 4 --> update user by adding token and expiration time
    * Step: 5 --> create url
    * Step: 6 --> Send mail containing the url
    * Step: 7 --> return res
    */

   try {
      // Step: 1 --> get email from req body
      const email = req.body.email;

      // Step: 2 --> check user for this email, email vilation
      const user = await User.findOne({ email: email });
      if (!user) {
         return res.status(401).json({
            success: false,
            message: "Your email is not registered with us",
         });
      }

      // Step: 3 --> generate token
      const token = crypto.randomUUID();

      // Step: 4 --> update user by adding token and expiration time
      const updatedDetails = await User.findOneAndUpdate(
         { email: email },
         {
            token: token,
            resetPasswordExpires: Date.now() + 15 * 60 * 1000, // token valid up 15min
         },
         { new: true }
      );

      console.log("updatedDetails", updatedDetails);

      // Step: 5 --> create url
      const url = `${process.env.CLINT_SITE}/update-password/${token}`;
      console.log(url);

      // Step: 6 --> Send mail containing the url
      await mailSender(
         email,
         "Password Reset Link",
         `Password Reset Link: ${url}`
      );

      // Step: 7 --> return res
      return res.json({
         success: true,
         message: "Email sent successfully",
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message:
            "Somthing Went Wrong When Sending Reset Password Mail !!",
      });
   }
};

// resetPassword

exports.resetPassword = async (req, res) => {
   /**
    * Step: 1 --> data fetch
    * Step: 2 --> validation for password and confirmPassword is equal
    * Step: 3 --> get user details from DB using token
    * Step: 4 --> if no user entry then invalid token
    * Step: 5 --> check token time expired
    * Step: 6 --> if password is not expired then hash password
    * Step: 7 --> password update in user model
    * Step: 8 --> return response
    */

   try {
      // Step: 1 --> data fetch
      const { password, confirmPassword, token } = req.body; // token comes from fontent req.body

      // Step: 2 --> validation for password and confirmPassword is equal
      if (password !== confirmPassword) {
         return res.json({
            success: false,
            message: "Password not matching",
         });
      }

      // Step: 3 --> get user details from DB using token
      const userDetails = await User.findOne({ token: token });

      // Step: 4 --> if no user entry then invalid token
      if (!userDetails) {
         return res.json({
            success: false,
            message: "Token is invalid",
         });
      }

      // Step: 5 --> check token time expired
      if (userDetails.resetPasswordExpires < Date.now()) {
         return res.json({
            success: false,
            message:
               "Token is expired, please regenrate your token",
         });
      }

      console.log(password);

      // Step: 6 --> if password is not expired then hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Step: 7 --> password update in user model
      await User.findOneAndUpdate(
         { token: token },
         { password: hashedPassword },
         { new: true }
      );

      // Step: 8 --> return response

      return res.status(200).json({
         success: true,
         message: "Password reset successful",
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "Somthing went wrong reset password mail !!",
      });
   }
};
