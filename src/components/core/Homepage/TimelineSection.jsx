import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
   {
      Logo: Logo1,
      heading: "Leadership",
      Description: "Fully commited to the success company",
   },
   {
      Logo: Logo2,
      heading: "Responsibility",
      Description: "Students will always be our top priority",
   },
   {
      Logo: Logo3,
      heading: "Flexibility",
      Description: "The ability to switch is an important skills",
   },
   {
      Logo: Logo4,
      heading: "Solve the problem",
      Description: "Code your way to a solution",
   },
];

function TimelineSection() {
   return (
      <div>
         <div className=" flex flex-col gap-4 md:flex-row md:gap-16 items-center ">
            <div className=" md:w-[45%] md:mt-0 mt-32 flex flex-col gap-5 ">
               {timeline.map((element, index) => {
                  return (
                     <div className=" w-full md:w-fit flex flex-row gap-6  ">
                        <div className=" w-[50px] h-[50px] bg-white flex rounded-full  justify-center items-center  ">
                           <img src={element.Logo} className=" flex  "></img>
                        </div>
                        <div>
                           <h2 className=" font-semibold text-[18px] ">
                              {element.heading}
                           </h2>
                           <p className=" text-base ">{element.Description}</p>
                        </div>
                     </div>
                  );
               })}
            </div>

            <div className=" relative shadow-blue-200 py-10 ">
               <img
                  src={timelineImage}
                  alt="timelineImage"
                  className=" shadow-white w-[150%] object-cover h-fit "
               ></img>

               <div className=" md:scale-100 scale-75 shadow-2xl shadow-caribbeangreen-700 absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 left-[50%] translate-x-[-50%] translate-y-[-52%] ">
                  <div className="flex flex-row items-center border-r border-caribbeangreen-300 gap-5 px-7">
                     <p className=" text-3xl font-bold ">10</p>
                     <p className=" text-caribbeangreen-300 text-sm ">
                        Years of Experience
                     </p>
                  </div>
                  <div className=" flex gap-5 items-center px-7 ">
                     <p className=" text-3xl font-bold ">250</p>
                     <p className=" text-caribbeangreen-300 text-sm ">
                        Type of courses
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default TimelineSection;
