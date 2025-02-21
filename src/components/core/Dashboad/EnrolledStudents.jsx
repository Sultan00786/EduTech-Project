import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEnrolledStudents } from "../../../services/operations/courseDetailsAPI";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { BiArrowBack } from "react-icons/bi";

function EnrolledStudents() {
   const { courseId } = useParams();
   const { token } = useSelector((state) => state.auth);
   const [enrolledStudents, setEnrolledStudents] = useState(null);
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   useEffect(() => {
      const fetchEnrolledStudents = async () => {
         setLoading(true);
         try {
            const response = await getEnrolledStudents(courseId, token);
            console.log("response", response);
            setEnrolledStudents(response.data.data);
         } catch (error) {
            console.error("Error fetching enrolled students:", error);
         }
         setLoading(false);
      };
      fetchEnrolledStudents();
   }, [courseId, token]);

   if (loading) {
      return (
         <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center">
            <div className="spinner"></div>
         </div>
      );
   }

   return (
      <div className="relative text-white pt-12">
         <button
            onClick={() => navigate("/dashboard/my-courses")}
            className="flex items-center gap-2 z-20 font-semibold py-2 px-4 rounded-md 
            bg-richblack-700 text-yellow-50 transition-all duration-150 hover:scale-95 border border-b-[2px] border-l-[2px] border-richblack-500 absolute -left-[140px] -top-4"
         >
            <BiArrowBack className="text-lg" />
            Back
         </button>

         <h1 className="text-richblack-5 font-bold text-3xl mb-14">
            Enrolled Students
         </h1>

         <div className="border-[1px] border-richblack-700 rounded-xl">
            {/* Table Header */}
            <div className="bg-richblack-700 rounded-t-xl flex items-center px-6 py-3 text-richblack-50 font-semibold text-lg">
               <p className="w-[10%] text-center">Sr. No.</p>
               <p className="w-[15%] pl-5">Profile</p>
               <p className="w-[20%]">Student Name</p>
               <p className="w-[25%]">Email</p>
               <p className="w-[30%]">Progress</p>
            </div>

            {/* Table Body */}
            {!enrolledStudents?.studentsEnrolled?.length ? (
               <div className="text-center text-richblack-100 p-6 text-lg">
                  No students enrolled yet
               </div>
            ) : (
               <div>
                  {enrolledStudents?.studentsEnrolled?.map((student, index) => (
                     <div
                        key={student.id}
                        className={`flex items-center px-6 py-3 ${
                           index !==
                           enrolledStudents.studentsEnrolled.length - 1
                              ? "border-b border-richblack-700"
                              : ""
                        } hover:bg-richblack-700/20 transition-all duration-200`}
                     >
                        <div className="w-[10%] text-richblack-100 text-center">
                           {index + 1}
                        </div>
                        <div className="w-[15%] pl-7 ">
                           <img
                              src={student.image}
                              alt={student.firstName}
                              className="h-10 w-10 rounded-full object-cover border-[1px] border-richblack-600"
                           />
                        </div>
                        <div className="w-[20%] text-richblack-100">
                           {`${student.firstName} ${student.lastName}`}
                        </div>
                        <div className="w-[25%] text-richblack-100 pr-5">
                           {student.email}
                        </div>
                        <div className="w-[30%] flex flex-col gap-2">
                           {/* <p className="text-yellow-50">
                              {Math.round(
                                 (student.compeletedVedios /
                                    enrolledStudents.totalNumberVideos) *
                                    100
                              )}
                              %
                           </p> */}
                           <div>
                              <ProgressBar
                                 completed={Math.round(
                                    (student.compeletedVedios /
                                       enrolledStudents.totalNumberVideos) *
                                       100
                                 )}
                                 height="8px"
                                 bgColor="#FFD60A"
                                 borderRadius="3px"
                                 labelAlignment="outside"
                                 baseBgColor="#2C333F"
                              />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
}

export default EnrolledStudents;
