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
      <div className=" flex flex-col gap-2 text-white">
         <div>
            <div className="flex items-center gap-1 mb-1">
               <h1 className=" text-richblue-5 font-bold text-2xl">
                  HI, {user?.firstName}
               </h1>
               <img src={Hi_logo} width={22} />
            </div>
            <p className=" text-richblack-300 text-lg">
               Let's Start something new
            </p>
         </div>

         <div className=" flex gap-2">
            <div className="bg-richblack-800 w-full rounded-lg p-5">
               <InstructorPieChart instructorData={instructorData} />
            </div>
            <div className=" bg-richblack-800 rounded-lg p-5 ">
               <div className=" w-[170px] flex flex-col justify-center gap-2">
                  <p className=" text-richblack-5 text-xl font-bold">
                     Statistic
                  </p>
                  <div className="flex flex-col ">
                     <p className=" text-richblack-400 font-semibold -mb-1">
                        Total Course
                     </p>
                     <p className=" text-richblack-200 text-3xl font-bold">
                        {instructorData?.length}
                     </p>
                  </div>
                  <div>
                     <p className=" text-richblack-400 font-semibold -mb-1">
                        Total Student
                     </p>
                     <p className=" text-richblack-200 text-3xl font-bold">
                        {totalStudent}
                     </p>
                  </div>
                  <div>
                     <p className=" text-richblack-400 font-semibold -mb-1">
                        Total Income
                     </p>
                     <p className=" text-richblack-200 text-3xl font-bold">
                        Rs.{totalIncome}
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <div className=" bg-richblack-800 rounded-lg p-5">
            <div className=" flex items-center justify-between mb-3">
               <p className=" text-richblue-5 font-bold text-xl ">
                  Your Courses
               </p>
               <Link
                  className=" text-yellow-25 text-sm"
                  to={"/dashboard/my-courses"}
               >
                  View All
               </Link>
            </div>
            <div className="flex items-center gap-3 justify-between">
               {courses?.map((course, index) => (
                  <div
                     className=" cursor-pointer"
                     onClick={() => navigate(`/courses/${course?._id}`)}
                  >
                     <img
                        src={course?.thumbnail}
                        className=" w-[310px] rounded-lg aspect-video bg-cover "
                     />
                     <p className=" text-richblue-5 font-semibold text-lg">
                        {course?.courseName}
                     </p>
                     <div className="flex items-center gap-3 text-richblack-300 text-xs">
                        <p>{course?.studentsEnrolled?.length} students</p>
                        <p>|</p>
                        <p>Rs.{course?.price}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Instructor;
