import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { useNavigate } from "react-router-dom";

function EnrolledCourses() {
   const { token } = useSelector((state) => state.auth);
   const [enrolledCourses, setEnrolledCourses] = useState(null);
   const [enCourseLen, setEnCourseLen] = useState(0);
   const [showStates, setShowStates] = useState({});
   const navigate = useNavigate();

   const getEnrolledCourses = async () => {
      try {
         const response = await getUserEnrolledCourses(token);
         setEnrolledCourses(response);
         setEnCourseLen(response?.length);
         console.log(response);
      } catch (error) {
         console.log("Unable to Fetch Enrolled Course :\n", error);
      }
   };

   const handleShowMore = (courseId) => {
      setShowStates((prev) => ({
         ...prev,
         [courseId]: !prev[courseId],
      }));
   };

   useEffect(() => {
      getEnrolledCourses();
   }, []);
   return (
      <div className=" text-white md:w-full w-11/12 mx-auto md:mx-0 ">
         <h1 className=" text-richblack-5 font-bold text-4xl mt-7 mb-7">
            Enrolled Courses
         </h1>
         {
            !enrolledCourses ? ( // enrolledCourse are not present then
               <div className=" text-yellow-25 font-bold text-4xl mt-7 mb-7">
                  Loading..
               </div>
            ) : !enrolledCourses.length ? (
               <div>
                  <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
                     0 Enrolled Courses
                  </p>
                  <p className=" mt-7 md:mt-14 md:text-center text-3xl text-richblack-100">
                     You haven't Enrolled in any Course!!
                  </p>
               </div>
            ) : (
               <div className=" border-[1px] border-richblack-700 rounded-xl ">
                  <div className=" bg-richblack-700 rounded-t-xl flex flex-col md:flex-row items-center px-6 py-3 text-richblack-5 font-semibold text-lg">
                     <p className=" hidden md:block md:w-[45%]">Course Name</p>
                     <p className=" hidden md:block md:w-[25%]">Duration</p>
                     <p className=" hidden md:block  md:w-[30%]">Progress</p>
                     <p className=" block md:hidden text-2xl">
                        List of Enrolled Courses
                     </p>
                  </div>

                  {/* Cards are shown bellow */}
                  {enrolledCourses.map((course, index) => (
                     <div
                        key={index}
                        className={`group flex flex-col md:flex-row items-start md:items-center px-6 py-6 md:py-3 hover:bg-richblack-700/20 transition-all duration-200 ${
                           index === enCourseLen - 1 ? "" : " border-b-[1px]"
                        } border-richblack-700`}
                     >
                        <div
                           onClick={() => {
                              navigate(
                                 `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                              );
                           }}
                           className="md:w-[45%] flex md:flex-row flex-col items-center gap-4 cursor-pointer"
                        >
                           <img
                              className="md:w-32 md:h-20 rounded-md object-cover aspect-video transition-all duration-200 group-hover:md:scale-105 group-hover:md:shadow-[0_0_20px_rgba(0,223,255,0.25)] hover:md:rotate-2"
                              src={course.thumbnail}
                           />
                           <div className="flex flex-col gap-2">
                              <p className="text-lg font-semibold md:text-richblack-50 text-yellow-50 group-hover:text-yellow-50 transition-colors duration-200">
                                 {course.courseName}
                              </p>
                              <div>
                                 <p className="text-richblack-300 text-sm group-hover:text-richblack-100 transition-colors duration-200 pr-7">
                                    {showStates[course._id]
                                       ? course.courseDiscription
                                       : course.courseDiscription.length > 50
                                       ? course.courseDiscription.slice(0, 50) +
                                         "..."
                                       : course.courseDiscription}
                                 </p>
                                 {course.courseDiscription.length > 50 && (
                                    <button
                                       className="text-richblack-50 text-sm font-semibold hover:text-white transition-colors duration-200"
                                       onClick={(e) => {
                                          e.stopPropagation();
                                          handleShowMore(course._id);
                                       }}
                                    >
                                       {showStates[course._id]
                                          ? "Show Less"
                                          : "Show More"}
                                    </button>
                                 )}
                              </div>
                           </div>
                        </div>

                        <div className=" hidden md:w-[25%] md:flex md:flex-col items-start text-richblack-50 group-hover:text-blue-200 font-semibold transition-colors duration-200">
                           {course?.totalDuration}
                        </div>

                        <div className=" hidden md:w-[30%] w-full md:flex md:flex-col gap-2">
                           <p className="group-hover:md:text-yellow-50 transition-colors  duration-200">
                              Progress: {course.progressPercentage || 0}%
                           </p>
                           <ProgressBar
                              completed={course.progressPercentage || 0}
                              height="8px"
                              isLabelVisible={false}
                              bgColor="#FFD60A"
                              baseBgColor="#2C333F"
                              transitionDuration="200"
                           />
                        </div>

                        <div className=" mt-5 md:hidden w-full flex flex-col gap-2">
                           <div className="flex flex-row justify-between">
                              <p className="text-yellow-50 transition-colors  duration-200">
                                 Progress: {course.progressPercentage || 0}%
                              </p>
                              <div className=" md:hidden md:w-[25%] flex flex-col items-start text-blue-200 font-semibold transition-colors duration-200">
                                 {course?.totalDuration}
                              </div>
                           </div>

                           <ProgressBar
                              completed={course.progressPercentage || 0}
                              height="8px"
                              isLabelVisible={false}
                              bgColor="#FFD60A"
                              baseBgColor="#2C333F"
                              transitionDuration="200"
                           />
                        </div>
                     </div>
                  ))}
               </div>
            ) // else consition
         }
      </div>
   );
}

export default EnrolledCourses;
