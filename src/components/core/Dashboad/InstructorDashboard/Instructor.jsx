import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import Hi_logo from "../../../../assets/Logo/hi_emoji_png.webp";
import { Link, useNavigate } from "react-router-dom";

function Instructor() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dataStateFunction = async () => {
      setLoading(true);
      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);
      console.log("instructorApiData >>", instructorApiData);
      // console.log("result >>", result);

      if (instructorApiData.length) setInstructorData(instructorApiData);
      if (result) setCourses(result?.slice(0, 3));
      setLoading(false);
    };
    dataStateFunction();
  }, []);

  return (
    <div className=" flex flex-col gap-2 text-white">
      <div>
        <div className="flex items-center gap-1 mb-1">
          <h1 className=" text-richblue-5 font-bold text-2xl">
            HI, {user?.firstName}
          </h1>
          <img src={Hi_logo} width={22} />
        </div>
        <p className=" text-richblack-300 text-lg">Let's Start something new</p>
      </div>

      <div></div>

      <div className=" bg-richblack-800 rounded-lg p-5">
        <div className=" flex items-center justify-between mb-3">
          <p className=" text-richblue-5 font-bold text-xl ">Your Courses</p>
          <Link
            className=" text-yellow-25 text-sm"
            to={"/dashboard/my-courses"}
          >
            View All
          </Link>
        </div>
        <div className="flex items-center gap-3 justify-between">
          {courses?.map((course, index) => (
            <div onClick={() => navigate(`/courses/${course?._id}`)}>
              <img src={course?.thumbnail} className=" w-fit rounded-lg " />
              <p className=" text-richblue-5 font-semibold">
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
