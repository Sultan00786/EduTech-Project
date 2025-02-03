const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const { json } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

// sendf OTP

exports.sendOTP = async (req, res) => {
  /**
   * Step: 1 --> fetch email form req ki body se
   * Step: 2 --> check if user already present in DB
   * Step: 3 --> generate OTP
   * Step: 4 --> check unique otp or not (not better approch)
   * Step: 5 --> After unique otp, store that in DB
   * Step: 6 --> return response successful
   */

  try {
    // fetch email form req ki body se
    const { email } = req.body;

    // check if user already present in DB
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    // generate OTP
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // check unique otp or not
    const result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    // After unique otp, store that in DB
    const otpBody = await OTP.create({
      email: email,
      otp: otp,
    });

    // return response successful
    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp: otp,
    });
  } catch (error) {
    console.error("Error ocurred in sendOTP controller: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// signUP

exports.signUp = async (req, res) => {
  /**
   * Step: 1 --> All data fetch form request ki body
   * Step: 2 --> Required data ka validation karlo
   * Step: 3 --> Password and confirmed password ko match kalo
   * Step: 4 --> chek user is already exist
   * Step: 5 --> find most recent OTP stored for the user
   * Step: 6 --> then validation karlo OTP
   * Step: 7 --> After that validation, Hash the password
   * Step: 8 --> Entry create in DB
   * Step: 9 --> return res
   */

  try {
    // All data fetch form request ki body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // Required data ka validation karlo
    if (!(firstName && lastName && email && password && confirmPassword)) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Password and confirmed password ko match kalo
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and ConfirmPassword values does not match, please try again !",
      });
    }

    // chek user is already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already reginstered",
      });
    }

    // find most recent OTP stored for the user
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    // then validation karlo OTP
    if (!recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP is entred",
      });
    }

    // After that validation, Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Entry create in DB
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber,
    });
    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // return res
    return res.status(200).json({
      success: true,
      message: "User is registered Successfully",
      user,
    });
  } catch (error) {
    console.error("Error ocurred in signUP controller: ", error.response);
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in SignUp Controller",
    });
  }
};

// login

exports.login = async (req, res) => {
  /**
   * Step: 1 --> get data form req ki body
   * Step: 2 --> required data ki validation karo
   * Step: 3 --> check user is already exist or not
   * Step: 4 --> check passwoar is matching, if match then generate the JWT token
   * Step: 5 --> create cookie
   * Step: 6 --> And send response
   */

  try {
    // Step: 1 --> get data form req ki body
    const { email, password } = req.body;

    // Step: 2 --> required data ki validation karo
    if (!(email && password)) {
      return res.status(403).json({
        success: false,
        message: "All fields are required!!",
      });
    }

    // 3 --> check user is already exist or not
    var user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, please signUP first",
      });
    }

    // Step: 4 --> check passwoar is matching, if match then generate the JWT token
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);
      user.token = token; // transfer token in user json object
      user.password = undefined;

      // Step: 5 --> create cookie
      const Option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      const profileId = user.additionalDetails;
      const userId = user._id;

      const userDetails = await User.findById(userId)
        .populate("additionalDetails")
        .exec();

      user = userDetails;
      res.cookie("token", token, Option).status(200).json({
        success: true,
        token,
        user,
        message: "Logged IN successfully",
      });
    } else {
      return res.status(401).json({
        sucess: false,
        message: "Passwoar is incorrect",
      });
    }
  } catch (error) {
    console.log("Error of login Handler: ", error);
    return res.status(500).json({
      success: false,
      message: "Login Fail, please try again",
    });
  }
};

// dchangePassword

// Controller for Changing Password
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);
    

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );

    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    // Match new password and confirm new password
    // if (newPassword !== confirmNewPassword) {
    //   // If new password and confirm new password do not match, return a 400 (Bad Request) error
    //   return res.status(400).json({
    //     success: false,
    //     message: "The password and confirm password does not match",
    //   });
    // }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Your Password is Change !!",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
