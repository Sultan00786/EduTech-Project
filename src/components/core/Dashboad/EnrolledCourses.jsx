import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";

function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
      console.log(response);
    } catch (error) {
      console.log("Unable to Fetch Enrolled Course :\n", error);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);
  return (
    <div className=" text-white">
      <h1>Enrolled Courses</h1>
      {
        !enrolledCourses ? ( // enrolledCourse are not present then
          <div>Loading..</div>
        ) : !enrolledCourses.length ? (
          <p>You have not enrolled in any course yet</p> // enrolledCourse ki nahi lenght hie then
        ) : (
          <div>
            <div>
              <p>Course Name</p>
              <p>Duration</p>
              <p>Progress</p>
            </div>

            {/* Cards are shown bellow */}
            {enrolledCourses.map((course, index) => (
              <div>
                <div>
                  <img src={course.thumbnail} />
                  <div>
                    <p> {course.courseName} </p>
                    <p> {course.courseDescription} </p>
                  </div>
                </div>

                <div>{course?.totalDuration}</div>

                <div>
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
