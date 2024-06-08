import React from "react";
import ContactUsForm from "../../contactPage/ContactUsForm";

<<<<<<< HEAD
function ContactFormSection({ heading, paragraph }) {
  return (
    <div className=" w-fit">
      <h1 className=" text-4xl text-richblack-25 font-bold mb-3 ">{heading}</h1>
      <p className=" text-[17px] text-richblack-200 mb-5 ">{paragraph}</p>
=======
function ContactFormSection() {
  return (
    <div className=" w-fit mx-auto">
      <h1 className=" text-4xl text-richblack-25 font-bold text-center mt-40 mb-3 ">
        Get in Touch
      </h1>
      <p className=" text-[17px] text-richblack-200 text-center mb-20 ">
        We'd love to here for you, Please fill out this form.
      </p>
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
      <div>
        <ContactUsForm />
      </div>
    </div>
  );
}

export default ContactFormSection;
