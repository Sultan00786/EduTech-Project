import React from "react";
import RenderSteps from "./RenderSteps";
import logo from "../../../../assets/Logo/thunder-bolt-flash-lighting-icon-png.webp";
import { use } from "react";

function AddCourse() {
   return (
      <div className=" w-11/12 mx-auto flex md:w-full items-start gap-x-6 gap-5 text-white">
         <div className="flex flex-col w-full">
            <h1 className=" mb-14 text-3xl font-bold text-richblack-5">
               Add Course
            </h1>
            <div className=" flex-1 max-w-[581px] ">
               <RenderSteps />
            </div>
         </div>
         <div className=" hidden md:flex bg-richblack-800 sticky top-10 w-[600px]  flex-col rounded-md py-6 px-14 gap-5  ">
            <div className=" flex items-center gap-3">
               <img src={logo} width={13} alt="" />
               <p className=" font-bold text-lg ">Code Upload Tips</p>
            </div>
            <ul className=" list-disc text-caribbeangreen-400 text-sm flex flex-col gap-2">
               <li>Set the Course Price option or make it free.</li>
               <li>Standard size for the course thumbnail is 1024x576.</li>
               <li>Video section controls the course overview video.</li>
               <li>Course Builder is where you create & organize a course.</li>
               <li>
                  Add Topics in the Course Builder section to create lessons,
                  quizzes, and assignments.
               </li>
               <li>
                  Information from the Additional Data section shows up on the
                  course single page.
               </li>
               <li>Make Announcements to notify any important</li>
               <li>Notes to all enrolled students at once.</li>
            </ul>
         </div>
      </div>
   );
}

export default AddCourse;
