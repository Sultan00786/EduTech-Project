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

function CoursesTable({ courses, setCourses }) {
  const [confirmModal, setConfirmModal] = useState(null);
  const [longDiscription, setLongDiscription] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerDelete = async (courseId) => {
    setLoading(true);
    const result = deleteCourse({ courseId: courseId }, token); // always pass values in key value pairs
    if (result) {
      const updatedCourses = courses.filter((elem) => elem._id !== courseId);
      // console.log(updatedCourses);
      setCourses(updatedCourses);
    }
    setLoading(false);
    setConfirmModal(null);
  };

  return (
    <div className=" text-white">
      <table className=" w-full mt-6">
        <thead className=" w-full text-richblack-25 text-lg font-semibold">
          <tr className=" w-[100%] flex items-center justify-between">
            <td className="w-[60%] content-center">COURSES</td>
            <td>DURATION</td>
            <td>PRICE</td>
            <td>ACTION</td>
          </tr>
        </thead>
        <tbody className=" mt-3 ">
          {courses.map((course, index) => (
            <tr
              key={index}
              className="flex justify-between border-b-[1px] border-richblack-700 mb-4"
            >
              <td className=" w-[60%] flex gap-2 mb-3">
                <img
                  width={230}
                  className=" h-fit rounded-lg aspect-video object-cover"
                  src={course?.thumbnail}
                  alt={course.courseName}
                />
                <div className="flex flex-col gap-2">
                  <p className=" text-richblack-5 font-bold text-2xl">
                    {" "}
                    {course.courseName}{" "}
                  </p>
                  <p className=" text-richblack-200 text-sm">
                    {course?.courseDiscription?.length > 100 ? (
                      longDiscription ? (
                        <div>
                          {course?.courseDiscription}
                          <span
                            onClick={() => setLongDiscription(!longDiscription)}
                            className=" cursor-pointer text-richblack-50 hover:text-richblack-5 font-bold"
                          >
                            {" "}
                            read less
                          </span>
                        </div>
                      ) : (
                        <div>
                          {course?.courseDiscription?.substr(0, 100)}
                          <span
                            onClick={() => setLongDiscription(!longDiscription)}
                            className=" cursor-pointer text-richblack-50 hover:text-richblack-5 font-bold"
                          >
                            {" "}
                            read more
                          </span>
                        </div>
                      )
                    ) : (
                      course?.courseDiscription
                    )}
                  </p>
                  <p className=" text-richblack-50 text-md font-bold">
                    {" "}
                    Created At{" "}
                  </p>
                  {course?.status === "Published" ? (
                    <div className=" w-fit flex items-center justify-center gap-1 bg-richblack-800 pl-2 pr-4 py-1 rounded-full text-yellow-100 font-bold text-xs ">
                      <TiTick />
                      <p>Published</p>
                    </div>
                  ) : (
                    <div className=" w-fit flex items-center justify-center gap-1 bg-richblack-800 pl-2 pr-4 py-1 rounded-full text-pink-300 font-bold text-xs ">
                      <BsExclamationLg />
                      <p>Draft</p>
                    </div>
                  )}
                </div>
              </td>

              <td className=" text-richblack-200 flex items-center justify-center">
                <p>2hr 30min</p>
              </td>

              <td className=" text-richblack-200 flex items-center gap-1">
                <FaRupeeSign />
                <p> {course.price} </p>
              </td>

              <td className=" text-richblack-200 text-xl flex items-center gap-3">
                <MdEdit
                  onClick={() =>
                    navigate(`/dashboard/edit-course/${course._id}`)
                  }
                  className=" cursor-pointer hover:text-richblack-50"
                />
                <RiDeleteBin6Line
                  onClick={() => {
                    setConfirmModal({
                      text1: "Delete this Section",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancle",
                      btn1Handler: !loading
                        ? () => handlerDelete(course._id)
                        : () => {},
                      btn2Handler: !loading
                        ? () => setConfirmModal(null)
                        : () => {},
                    });
                  }}
                  className=" cursor-pointer hover:text-richblack-50"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {confirmModal && <ConfirmationModal modalData={confirmModal} />}
    </div>
  );
}

export default CoursesTable;
