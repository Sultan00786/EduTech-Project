import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTABotton from "./Botton";
import { FaArrowRight } from "react-icons/fa";

function InstructorSection() {
   return (
      <div className=" w-full my-24 md:m-16 flex flex-col md:flex-row md:gap-20 gap-8 items-center justify-center ">
         <div className=" w-full md:w-[50%] ">
            <img src={Instructor} className=" shadow-white " />
         </div>
         <div className=" w-full md:w-[50%] flex flex-col gap-5 md:gap-10 ">
            <div className=" text-4xl font-semibold md:w-[50%] ">
               Become an
               <HighlightText text={"Instructor"} />
            </div>
            <p className=" font-medium text-[16px] md:w-[80%] text-richblack-300 ">
               Instructors from around the world teach millions of students on
               StudyNotion. We provide the tools and skills to teach what you
               love.
            </p>

            <div className="w-fit md:mt-0 -mt-8">
               <CTABotton active={true} linkto={"/signup"}>
                  <div className=" flex flex-row gap-2 items-center">
                     Start Learning Today
                     <FaArrowRight />
                  </div>
               </CTABotton>
            </div>
         </div>
      </div>
   );
}

export default InstructorSection;
