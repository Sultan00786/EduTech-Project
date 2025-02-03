import React from "react";
import { FaEarthAfrica } from "react-icons/fa6";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { IoCall } from "react-icons/io5";
import Footer from "../components/common/Footer";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";

function ContactUs() {
  return (
    <div className=" text-richblack-100">
      <div className=" w-11/12 mx-auto flex px-16 ">
        <div className=" flex flex-col gap-10 w-[450px] h-fit bg-richblack-800 rounded-md mt-20 p-6 ">
          <div className="flex gap-2 text-lg ">
            <HiChatBubbleLeftRight className="text-richblack-5" />
            <div className="flex flex-col">
              <h4 className=" font-bold text-richblack-5">Chat on us</h4>
              <p className="text-[14px]">Our friendly team is here to help.</p>
              <p className="text-[14px]">@mail address</p>
            </div>
          </div>

          <div className="flex gap-2">
            <FaEarthAfrica className="text-richblack-5" />
            <div>
              <h4 className=" font-bold text-richblack-5">Visit Us</h4>
              <p className="text-[14px]">
                Come and say hello at our office HQ.
              </p>
              <p className="text-[14px]">Here is the location/ address</p>
            </div>
          </div>

          <div className="flex gap-2">
            <IoCall className="text-richblack-5" />
            <div>
              <h4 className=" font-bold text-richblack-5">Call us</h4>
              <p className="text-[14px]">Mon - Fri From 8am to 5pm</p>
              <p className="text-[14px]">+123 456 7890</p>
            </div>
          </div>
        </div>

        <div className=" px-20 py-6 mt-20">
          <ContactFormSection
            heading="Got a Idea? We’ve got the skills. Let’s team up"
            paragraph="Tall us more about yourself and what you’re got in mind."
          />
        </div>
      </div>

      <footer className=" mt-14">
        <Footer />
      </footer>
    </div>
  );
}

export default ContactUs;
