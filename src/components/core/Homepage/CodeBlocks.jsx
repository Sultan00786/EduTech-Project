import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import CTAButton from "../Homepage/Botton";

const CodeBlocks = ({
   position,
   heading,
   subheading,
   ctabtn1,
   ctabtn2,
   codeblock,
   backgroundGradient,
   codeColor,
}) => {
   const [typedCode, setTypedCode] = useState("");
   const renderHello = () => (
      <div>
         <div>Hello</div>
      </div>
   );

   return (
      <div
         className={` flex flex-col ${position} my-20 justify-evenly gap-10 px-5 `}
      >
         {/* Section 1 */}

         <div className=" md:w-[50%] flex flex-col gap-8">
            {heading}

            <div className=" font-bold text-richblack-300 ">{subheading}</div>

            {/* two button */}

            <div className="flex gap-7 -mt-4">
               <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                  <div className=" flex gap-2 items-center">
                     {ctabtn1.btnText}
                     <FaArrowRight />
                  </div>
               </CTAButton>

               <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                  {ctabtn2.btnText}
               </CTAButton>
            </div>
         </div>

         {/* Section 2 */}

         <div className=" relative flex h-fit text-10[px] py-4 pr-5 w-[350px] md:w-[350px] md:scale-100 scale-[.94] md:-ml-0 -ml-2 ">
            <div className=" absolute bg-richblue-500 opacity-25 left-0 right-0 top-[2%]  rounded-md w-[100%] h-[98%] "></div>

            {/* HW --> BG gradiant */}

            {/* Numbers */}
            <div className=" static w-[10%] text-center flex flex-col px-1 text-richblack-400 font-inter font-bold ">
               <p>1</p>
               <p>2</p>
               <p>3</p>
               <p>4</p>
               <p>5</p>
               <p>6</p>
               <p>7</p>
               <p>8</p>
               <p>9</p>
               <p>10</p>
               <p>11</p>
               <p>12</p>
               <p>13</p>
            </div>

            {/* Codes */}
            <div
               className={` static w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} `}
            >
               <TypeAnimation
                  sequence={[codeblock, 3000, ""]}
                  speed={20}
                  omitDeletionAnimation={true}
                  repeat={Infinity}
                  style={{
                     display: "block",
                     whiteSpace: "pre",
                  }}
               />
            </div>
         </div>
      </div>
   );
};

export default CodeBlocks;
