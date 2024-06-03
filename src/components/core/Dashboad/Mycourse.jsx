import React, { useEffect, useState } from "react";
import Iconbtn from "../../common/Iconbtn";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CoursesTable from "./MyCourses/CoursesTable";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import { useSelector } from "react-redux";

function Mycourse() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const instructorAllCourses = async () => {
      setLoading(true);
      const result = await fetchInstructorCourses(token);
      console.log("result >> ", result[0].thumbnail);

      if (result) setCourses(result);
      setLoading(false);
    };
    instructorAllCourses();
  }, []);

  return (
    <div>
      <div className="text-white flex justify-between mb-16">
        <p className=" text-3xl ring-richblack-5 font-bold ">My Couses</p>
        <button
          disabled={loading}
          onClick={() => navigate("/dashboard/add-course")}
        >
          <Iconbtn customClasses={" flex items-center gap-1"} text="Add Course">
            <IoMdAdd />
          </Iconbtn>
        </button>
      </div>
      <div>
        {courses.length ? (
          <CoursesTable courses={courses} setCourses={setCourses} />
        ) : (
          <div className=" text-richblue-5 font-bold text-4xl flex items-center justify-center border-4 border-dashed border-richblack-600 p-7">
            No Course in Created in this account
          </div>
        )}
      </div>
    </div>
  );
}

export default Mycourse;
