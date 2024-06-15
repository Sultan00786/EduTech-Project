import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";

function ViewCourse() {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispathch = useDispatch();

  useEffect(() => {
    const setSpecificCourseDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      // console.log(courseData);

      if (courseData) {
        dispathch(
          setCourseSectionData(courseData.courseDetails?.courseContent)
        );
        dispathch(setEntireCourseData(courseData.courseDetails));
        dispathch(setCompletedLectures(courseData.completedVideos));

        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
          lectures += sec.subSection.length;
        });
        
        dispathch(setTotalNoOfLectures(lectures));
      }
    };

    setSpecificCourseDetails();
  }, []);

  return (
    <div className="  flex min-h-[calc(100vh-3.5rem)] text-white">
      <div className="flex w-full">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className=" w-full">
          <Outlet />
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
}

export default ViewCourse;
