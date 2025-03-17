import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTABotton from "./Botton";

function LearningLanguageSection() {
   return (
      <div className=" mt-[130px] mb-32 ">
         <div className="flex flex-col gap-5 items-center ">
            <div className=" text-4xl font-semibold text-center ">
               Your swiss Knife from
               <HighlightText text={"learing any language"} />
            </div>

            <div className=" text-center mx-auto texricblack600 text-base font-medium w-[70%]">
               Using spin making learning multiple languages easy. with 20+
               languages realistic voice-over, progress tracking, custom
               schedule and more.
            </div>

            <div className=" md:scale-100 md:translate-x-0 md:translate-y-0 scale-[.6] translate-x-[-34%] translate-y-[-25%] flex flex-row items-center justify-items-center mt-5 ">
               <img
                  src={know_your_progress}
                  alt="KnowYourProgressImage"
                  className=" object-contain -mr-32 "
               />

               <img
                  src={compare_with_others}
                  alt="compare_with_others"
                  className=" object-contain "
               />

               <img
                  src={plan_your_lesson}
                  alt="plan_your_lesson"
                  className=" object-contain -ml-36 "
               />
            </div>

            <div className=" w-fit flex -mt-[200px] md:-mt-0 ">
               <CTABotton active={true} linkto={"/signup"}>
                  <div>Learn More</div>
               </CTABotton>
            </div>
         </div>
      </div>
   );
}

export default LearningLanguageSection;
