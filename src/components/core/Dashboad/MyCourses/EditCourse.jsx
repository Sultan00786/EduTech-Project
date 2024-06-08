import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RenderSteps from "../AddCourse/RenderSteps";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../slices/courseSlice";

function EditCourse() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(setStep(1));
    async function getDetailsCourse() {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseId, token);
      console.log("result ?? ", result);

      if (result.courseDetails) dispatch(setCourse(result.courseDetails));
      dispatch(setEditCourse(true));
      setLoading(false);
    }
    getDetailsCourse();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center loader"></div>;
  }
  return (
    <div className=" text-white">
      <h1>Edit Course</h1>
      <div> {course ? <RenderSteps /> : <p>No course found 0` `</p>} </div>
    </div>
  );
}

export default EditCourse;
