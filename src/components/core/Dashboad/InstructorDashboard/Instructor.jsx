import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import Hi_logo from "../../../../assets/Logo/hi_emoji_png.webp";
import { Link, useNavigate } from "react-router-dom";
import InstructorPieChart from "./InstructorPieChart";

function Instructor() {
   const { token } = useSelector((state) => state.auth);
   const { user } = useSelector((state) => state.profile);
   const [loading, setLoading] = useState(false);
   const [instructorData, setInstructorData] = useState(null);
   console.log(instructorData);
   const [totalStudent, setTotalStudent] = useState(0);
   const [totalIncome, setTotalIncome] = useState(0);
   const [courses, setCourses] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      const dataStateFunction = async () => {
         setLoading(true);
         const instructorApiData = await getInstructorData(token);
         const result = await fetchInstructorCourses(token);

         if (result) setCourses(result.slice(0, 3));
         if (instructorApiData?.length) {
            setInstructorData(instructorApiData);

            let allTotalStudent = 0;
            let allTotalIncome = 0;

            for (let i = 0; i < instructorApiData.length; i++) {
               allTotalStudent += instructorApiData[i]?.totalStudentsEnrolled;
               allTotalIncome += instructorApiData[i]?.totalAmountGenerated;
            }

            setTotalIncome(allTotalIncome);
            setTotalStudent(allTotalStudent);
         }
         setLoading(false);
      };
      dataStateFunction();
   }, []);

   if (loading) {
      return (
         <div className=" w-full h-[88vh] flex items-center justify-center">
            <div className="loader"></div>
         </div>
      );
   }

   return (
      <div className=" w-11/12 mx-auto md:w-full flex flex-col gap-6 text-white">
         {/* Header Section */}
         <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
               <h1 className="text-richblack-5 font-bold text-3xl">
                  Hi, {user?.firstName}
               </h1>
               <img
                  src={Hi_logo}
                  width={32}
                  className="hover:rotate-12 transition-transform duration-300"
               />
            </div>
            <p className="text-richblack-200 text-lg font-medium">
               Let's Start something new
            </p>
         </div>

         {/* Stats and Chart Section */}
         <div className="flex flex-col md:flex-row gap-6">
            {/* Chart */}
            <div className="bg-richblack-800 w-full rounded-xl p-6 border-[1px] border-richblack-700">
               <InstructorPieChart instructorData={instructorData} />
            </div>

            {/* Statistics */}
            {(instructorData || instructorData?.length) && (
               <div className="bg-richblack-800 rounded-xl p-6 border-[1px] border-richblack-700">
                  <div className="md:w-[250px] flex flex-col gap-4">
                     <p className="text-richblack-5 text-2xl font-bold">
                        Statistics
                     </p>

                     {/* Total Courses */}
                     <div className="flex flex-col gap-1">
                        <p className="text-richblack-300 font-semibold">
                           Total Courses
                        </p>
                        <p className="text-richblack-50 text-3xl font-bold">
                           {instructorData?.length}
                        </p>
                     </div>

                     {/* Total Students */}
                     <div className="flex flex-col gap-1">
                        <p className="text-richblack-300 font-semibold">
                           Total Students
                        </p>
                        <p className="text-richblack-50 text-3xl font-bold">
                           {totalStudent}
                        </p>
                     </div>

                     {/* Total Income */}
                     <div className="flex flex-col gap-1">
                        <p className="text-richblack-300 font-semibold">
                           Total Income
                        </p>
                        <p className="text-richblack-50 text-3xl font-bold">
                           ₹{totalIncome}
                        </p>
                     </div>
                  </div>
               </div>
            )}
         </div>

         {/* Courses Section */}
         <div className="bg-richblack-800 rounded-xl border-[1px] border-richblack-700">
            <div className="flex items-center justify-between p-6 border-b-[1px] border-richblack-700">
               <p className="text-richblack-5 font-bold text-xl">
                  Your Courses
               </p>
               <Link
                  className="text-yellow-50 text-sm font-medium hover:scale-105 transition-all duration-200"
                  to="/dashboard/my-courses"
               >
                  View All
               </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-6 p-6">
               {courses?.map((course, index) => (
                  <div
                     key={index}
                     onClick={() => navigate(`/courses/${course?._id}`)}
                     className="group cursor-pointer transition-all duration-200"
                  >
                     <div className="relative">
                        <img
                           src={course?.thumbnail}
                           alt={course?.courseName}
                           className="w-[300px] rounded-xl aspect-video object-cover group-hover:scale-105 transition-all duration-200"
                        />
                        <div className="absolute inset-0 rounded-xl group-hover:bg-richblack-900/40 transition-all duration-200" />
                     </div>
                     <p className="text-richblack-5 font-semibold text-lg mt-3 group-hover:text-yellow-50 transition-colors duration-200">
                        {course?.courseName}
                     </p>
                     <div className="flex items-center gap-2 text-richblack-300 text-sm mt-1">
                        <span>{course?.studentsEnrolled?.length} students</span>
                        <span>•</span>
                        <span>₹{course?.price}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Instructor;
