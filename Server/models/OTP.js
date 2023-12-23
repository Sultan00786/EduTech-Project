
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchmea = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    otp: {
        type: String,
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: 5*60,
    },
});

// a function -> to send emails

otpSchmea.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})

async function sendVerificationEmail(email, otp){
    try {
        const mailResponse = await mailSender (email, "Verification Email form StudyNotion", otp);
        console.log("Email sent successfully : ", mailResponse);
    } catch (error) {
        console.log("Error occured while sending mails: ", error);
        throw error;
    }
}

module.exports = mongoose.model("OTP", otpSchmea);

