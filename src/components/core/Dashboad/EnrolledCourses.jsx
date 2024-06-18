import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { useNavigate } from "react-router-dom";

function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [enCourseLen, setEnCourseLen] = useState(0);
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

  useEffect(() => {
    getEnrolledCourses();
  }, []);
  return (
    <div className=" text-white ">
      <h1 className=" text-richblack-5 font-bold text-4xl mt-7 mb-7">
        Enrolled Courses
      </h1>
      {
        !enrolledCourses ? ( // enrolledCourse are not present then
          <div className=" text-yellow-25 font-bold text-4xl mt-7 mb-7">
            Loading..
          </div>
        ) : !enrolledCourses.length ? (
          <p>You have not enrolled in any course yet</p> // enrolledCourse ki nahi lenght hie then
        ) : (
          <div className=" border-[1px] border-richblack-700 rounded-xl ">
            <div className=" bg-richblack-700 rounded-t-xl flex flex-row items-center px-6 py-3 text-richblack-5 font-semibold text-lg">
              <p className=" w-[45%]">Course Name</p>
              <p className="w-[25%] flex flex-col items-start ">Duration</p>
              <p className=" w-[30%]">Progress</p>
            </div>

            {/* Cards are shown bellow */}
            {enrolledCourses.map((course, index) => (
              <div
                key={index}
                className={` flex flex-row items-center px-6 py-3 ${
                  index === enCourseLen - 1 ? "" : " border-b-[1px]"
                } border-richblack-700`}
              >
                <div
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    );
                  }}
                  className=" w-[45%] flex items-center gap-2"
                >
                  <img
                    className="h-14 w-14 rounded-lg object-cover"
                    src={course.thumbnail}
                  />
                  <div className=" flex flex-col gap-1">
                    <p> {course.courseName} </p>
                    <p className=" text-richblack-300 text-sm">
                      {course.courseDiscription}
                    </p>
                  </div>
                </div>

                {/* <div className="w-[25%]">{course?.totalDuration}</div> */}
                <div className="w-[25%] flex flex-col items-start ">
                  {course?.totalDuration}
                </div>

                <div className="w-[30%] flex flex-col gap-2">
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
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
