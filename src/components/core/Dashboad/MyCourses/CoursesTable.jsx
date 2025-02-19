import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { BsExclamationLg } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "../../../../services/operations/courseDetailsAPI";
import { FiEdit2 } from "react-icons/fi";

function CoursesTable({ courses, setCourses }) {
   const [confirmModal, setConfirmModal] = useState(null);
   const [longDiscription, setLongDiscription] = useState([]);
   const [loading, setLoading] = useState(false);
   const { token } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handlerDelete = async (courseId) => {
      setLoading(true);
      const result = deleteCourse({ courseId: courseId }, token); // always pass values in key value pairs
      if (result) {
         const updatedCourses = courses.filter((elem) => elem._id !== courseId);
         setCourses(updatedCourses);
      }
      setLoading(false);
      setConfirmModal(null);
   };

   return (
      <div className="border-[1px] border-richblack-700 rounded-xl">
         <div className="bg-richblack-700 rounded-t-xl flex flex-row items-center px-6 py-3 text-richblack-5 font-semibold text-lg">
            <p className="w-[45%]">Course</p>
            <p className="w-[25%] pl-10">Duration</p>
            <p className="w-[20%]">Price</p>
            <p className="w-[10%]">Actions</p>
         </div>

         {/* Course Items */}
         {courses?.length === 0 ? (
            <div className="text-center text-richblack-100 p-6 text-lg">
               No courses found
            </div>
         ) : (
            courses?.map((course, index) => (
               <div
                  key={index}
                  className={`group flex flex-row items-center px-6 py-3 hover:bg-richblack-700/20 transition-all duration-200 ${
                     index === courses.length - 1 ? "" : "border-b-[1px]"
                  } border-richblack-700`}
               >
                  <div className="w-[45%] flex items-center gap-4">
                     <img
                        src={course?.thumbnail}
                        alt={course?.courseName}
                        className="w-32 h-20 rounded-md object-cover aspect-video transition-all duration-200 
                        group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(0,223,255,0.25)] hover:rotate-2"
                     />
                     <div className="flex flex-col gap-2">
                        <p className="text-lg font-semibold text-richblack-50 group-hover:text-yellow-50 transition-colors duration-200">
                           {course?.courseName}
                        </p>
                        <p className="text-richblack-300 text-sm group-hover:text-richblack-100 transition-colors duration-200">
                           {course?.courseDescription?.length > 50
                              ? `${course?.courseDescription?.slice(0, 50)}...`
                              : course?.courseDescription}
                        </p>
                     </div>
                  </div>

                  <div className="w-[25%] text-richblack-50 group-hover:text-blue-200 font-semibold transition-colors duration-200 pl-10">
                     {course?.totalDuration || "2hr 30min"}
                  </div>

                  <div className="w-[20%] text-richblack-50 group-hover:text-yellow-50 font-semibold transition-colors duration-200">
                     ₹{course?.price}
                  </div>

                  <div className="w-[10%] flex gap-3 text-richblack-300">
                     <button
                        onClick={() =>
                           navigate(`/dashboard/edit-course/${course._id}`)
                        }
                        className="hover:text-caribbeangreen-300 hover:scale-105 transition-all duration-110"
                     >
                        <FiEdit2 size={20} />
                     </button>
                     <button
                        onClick={() => {
                           setConfirmModal({
                              text1: "Do you want to delete this course?",
                              text2: "All the data related to this course will be deleted",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () => handlerDelete(course._id),
                              btn2Handler: () => setConfirmModal(null),
                           });
                        }}
                        className="hover:text-[#ff0000] hover:scale-110 transition-all duration-150"
                     >
                        <RiDeleteBin6Line size={20} />
                     </button>
                  </div>
               </div>
            ))
         )}
         {confirmModal && <ConfirmationModal modalData={confirmModal} />}
      </div>
   );
}

export default CoursesTable;
