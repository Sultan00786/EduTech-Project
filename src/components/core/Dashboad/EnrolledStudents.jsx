import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEnrolledStudents } from "../../../services/operations/courseDetailsAPI";
import { useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";

function EnrolledStudents() {
   const { courseId } = useParams();
   const { token } = useSelector((state) => state.auth);
   const [enrolledStudents, setEnrolledStudents] = useState(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const fetchEnrolledStudents = async () => {
         setLoading(true);
         try {
            const response = await getEnrolledStudents(courseId, token);
            console.log("response", response);
            setEnrolledStudents(response.data);
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
      <div className="text-white">
         <h1 className="text-richblack-5 font-bold text-3xl mb-14">
            Enrolled Students
         </h1>

         <div className="border-[1px] border-richblack-700 rounded-xl">
            {/* Table Header */}
            <div className="bg-richblack-700 rounded-t-xl flex items-center px-6 py-3 text-richblack-50 font-semibold text-lg">
               <p className="w-[10%]">Sr. No.</p>
               <p className="w-[15%]">Profile</p>
               <p className="w-[30%]">Student Name</p>
               <p className="w-[30%]">Email</p>
               <p className="w-[15%]">Progress</p>
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
                        <div className="w-[10%] text-richblack-100">
                           {index + 1}
                        </div>
                        <div className="w-[15%]">
                           <img
                              src={student.image}
                              alt={student.firstName}
                              className="h-12 w-12 rounded-full object-cover"
                           />
                        </div>
                        <div className="w-[30%] text-richblack-100">
                           {`${student.firstName} ${student.lastName}`}
                        </div>
                        <div className="w-[30%] text-richblack-100">
                           {student.email}
                        </div>
                        <div className="w-[15%] flex flex-col gap-2">
                           <p className="text-richblack-100">
                              {Math.round(
                                 (student.compeletedVedios /
                                    enrolledStudents.totalNumberVideos) *
                                    100
                              )}
                              %
                           </p>
                           <ProgressBar
                              completed={Math.round(
                                 (student.compeletedVedios /
                                    enrolledStudents.totalNumberVideos) *
                                    100
                              )}
                              height="8px"
                              isLabelVisible={false}
                              bgColor="#FFD60A"
                              baseBgColor="#2C333F"
                           />
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
