
const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require('otp-generator');
const { json } = require("express");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const mailSender = require("../utils/mailSender");
require('dotenv').config();



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
        const {email} = req.body;

        // check if user already present in DB
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: "User already registered",
            })
        }

        // generate OTP
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated: ", otp);

        // check unique otp or not 
        const result = await OTP.findOne({otp: otp});
        while(result){
            opt = otpGenerator.generate(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({otp: otp});
        }

        // After unique otp, store that in DB
        const otpPayload = {email, otp}
        const optBody = await OTP.create(otpPayload);
        console.log(optBody);

        // return response successful
        return res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
        })


    } catch (error) {
        console.error("Error ocurred in sendOTP controller: ",error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }

}



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
            otp
        } = req.body;


        // Required data ka validation karlo 
        if(!(firstName && lastName && email && password && confirmPassword)){
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }


        // Password and confirmed password ko match kalo
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and ConfirmPassword values does not match, please try again !"
            })
        }


        // chek user is already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User is already reginstered",
            })
        }


        // find most recent OTP stored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        console.log("Recent OTP is: ", recentOtp);

        
        // then validation karlo OTP
        if(recentOtp.length == 0){
            return res.status(400).json({
                success: false,
                message: "OTP is not found"
            });
        }
        else if(otp !== recentOtp){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP is entred"
            });
        }


        // After that validation, Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Entry create in DB
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
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
        })

    } 
    catch (error) {

        console.error("Error ocurred in signUP controller: ",error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        })
        
    }

}



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
        const {email, password} = req.body;

        // Step: 2 --> required data ki validation karo
        if(!(email && password)){
            return res.status(403).json({
                success: false,
                message: "All fields are required!!",
            })
        }

        // 3 --> check user is already exist or not 
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not registered, please signUP first",
            })
        }

        // Step: 4 --> check passwoar is matching, if match then generate the JWT token
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                role: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expriesIn: "2hr",
            });
            user.token = token; // transfer token in user json object
            user.password = undefined;

            // Step: 5 --> create cookie 
            res.cookie("token", token, option).status(200).json({
                success: true,
                token,
                user,
                message: "Logged IN successfully",
            })

        }else{
            return res.status(401).json({
                sucess: false,
                message: "Passwoar is incorrect",
            })
        }
        
    } catch (error) {
        console.log("Error of login Handler: ", error);
        return res.status(500).json({
            success: false,
            message: "Login Failure, please try again",
        });
    }

}



// dchangePassword

exports.changePassword = async (req, res) => {

    /**
     * Step: 1 --> get data dfrom req body
     * Step: 2 --> required data ki validation karo 
     * Step: 3 --> check newPassword and confirmNewPassword is equal or not 
     * Step: 4 --> then update passwoar in DB
     * Step: 5 --> send mail of "Passwoard updated" 
     * Step: 6 --> And send response
     */

    try {

        // Step: 1 --> get data dfrom req body
        const {oldPassword, newPasswoard, confirmPassword, email} = req.body;

        // 2 --> required data ki validation karo
        if(!(oldPassword && newPasswoard && confirmPassword)){
            return res.status(403).json({
                success: false,
                message: "All field is required!",
            });
        }

        // Step: 3 --> check newPassword and confirmNewPassword is equal or not 
        if(newPasswoard !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "newPasswoard and confirmPassword field is not match",
            });
        }

        // 4 --> then update passwoar in DB
        const user = await User.findOne({email});
        user.password = newPasswoard;

        // Step: 5 --> send mail of "Passwoard updated" 
        try {

            const mailResponse = await mailSender(email, "Passwoard updated successfully", "Passwoard updated successfully");
            console.log("Email response is: ", mailResponse );
            
        } catch (error) {
            console.log("Error occured while sending mails: ", error);
            throw error;
        }
        
    } catch (error) {
        
        console.log("Error of login Handler: ", error);
        return res.status(500).json({
            success: false,
            message: "Password is not change, please try again",
        });

    }

}

