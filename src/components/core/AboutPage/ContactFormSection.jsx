import React from "react";
import ContactUsForm from "../../contactPage/ContactUsForm";

function ContactFormSection({ heading, paragraph }) {
  return (
    <div className=" w-fit">
      <h1 className=" text-4xl text-richblack-25 font-bold mb-3 ">{heading}</h1>
      <p className=" text-[17px] text-richblack-200 mb-5 ">{paragraph}</p>
      <div>
        <ContactUsForm />
      </div>
    </div>
  );
}

export default ContactFormSection;
