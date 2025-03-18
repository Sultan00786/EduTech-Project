import React from "react";
import { ImTree } from "react-icons/im";
import { IoPeople } from "react-icons/io5";

function ExploreMoreCard({ Course, index }) {
   return (
      <div>
         <div
            key={index}
            className=" relative w-[310px] md:w-[360px] bg-richblack-800 flex flex-col justify-between p-6 "
         >
            <h2 className=" text-richblack-5 text-lg font-bold mb-4 ">
               {" "}
               {Course.heading}{" "}
            </h2>
            <p className=" text-richblack-300 mb-24 text-[15.5px] ">
               {" "}
               {Course.description}{" "}
            </p>

            <div className="flex flex-row justify-between text-richblack-200">
               <div className="flex flex-row gap-2  ">
                  <span>
                     <IoPeople />
                  </span>
                  <span>{Course.level}</span>
               </div>

               <div className="flex flex-row gap-2">
                  <span>
                     <ImTree />
                  </span>
                  <span>{Course.lessionNumber}</span>
               </div>
            </div>

            {/* for bordder */}
            <div className=" absolute bottom-14 right-0 w-full h-[10px]  border-richblack-200 border-t-[2px] border-dashed  "></div>
         </div>
      </div>
   );
}

export default ExploreMoreCard;
