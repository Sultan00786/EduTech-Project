import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Iconbtn from "../../../../common/Iconbtn";
import { GrAddCircle } from "react-icons/gr";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
   setCourse,
   setEditCourse,
   setStep,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
   createSection,
   updateSection,
} from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";
import { apiConnector } from "../../../../../services/apiconnector";
import { courseEndpoints } from "../../../../../services/api";

const { CREAT_COURSE_DURATION } = courseEndpoints;

function CourseBuilder() {
   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm();

   const [editSectionName, setEditSectionName] = useState(null);
   const { course } = useSelector((state) => state.course);
   const { token } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const [loading, setLoading] = useState(false);

   const cancelEdit = () => {
      setEditSectionName(null);
      setValue("sectionName", "");
   };

   const goToBack = () => {
      dispatch(setStep(1));
      dispatch(setEditCourse(true));
   };

   const goToNext = async () => {
      // console.log(course);

      if (course.courseContent.length === 0) {
         toast.error("Please add one atleast one Section");
         return;
      }

      if (
         course.courseContent.some((section) => section.subSection.length === 0)
      ) {
         toast.error("Please add atleast one lecture in each section");
         return;
      }

      try {
         setLoading(true);
         const result = await apiConnector("POST", CREAT_COURSE_DURATION, {
            courseId: course._id,
         });
         console.log(result);
         setLoading(false);
      } catch (error) {
         console.log(error);
         throw error.message;
      }

      // if everything is good
      dispatch(setStep(3));
   };

   const onSubmit = async (data) => {
      // console.log("data >> ", data);

      setLoading(true);
      let result;

      if (editSectionName) {
         // we are editing the section name
         // console.log("editSectionName == ", editSectionName);
         result = await updateSection(
            {
               sectionName: data.sectionName,
               sectionId: editSectionName,
               courseId: course._id,
            },
            token
         );
      } else {
         result = await createSection(
            {
               sectionName: data.sectionName,
               courseId: course._id,
            },
            token
         );
      }

      // console.log("result ... ", result);

      // update value
      if (result) {
         dispatch(setCourse(result));
         setEditCourse(null);
         setValue("sectionName", "");
      }

      // loading false
      setLoading(false);
   };

   const handleChangeEditSectionName = (sectionId, sectionName) => {
      if (editSectionName === sectionId) {
         cancelEdit();
         return;
      }

      setEditSectionName(sectionId);
      setValue("sectionName", sectionName);
   };

   return (
      <div>
         <form onSubmit={handleSubmit(onSubmit)}>
            {/* Label */}
            <div className="flex flex-col">
               <label id="sectionName" htmlFor="" className="lable-style">
                  Section name
               </label>
               <input
                  id="sectionName"
                  placeholder="Add section name"
                  name="sectionName"
                  className="form-style"
                  {...register("sectionName", { required: true })}
               />
               {errors.sectionName && <span>Section Name is required</span>}
            </div>

            {/* Cereat Button */}
            <div className=" flex flex-row items-end mt-6 gap-x-3">
               <Iconbtn
                  type="Submit"
                  text={
                     editSectionName ? "Edit Section Name" : "Create Section"
                  }
                  outline={true}
                  customClasses={
                     "text-yellow-50 flex flex-row items-center gap-x-2"
                  }
                  children={<GrAddCircle />}
               ></Iconbtn>
               {editSectionName && (
                  <span
                     onClick={cancelEdit}
                     className=" cursor-pointer text-richblack-300 hover:text-richblack-500 underline"
                  >
                     Cancel Edit
                  </span>
               )}
            </div>
         </form>

         <div className="">
            {course?.courseContent?.length > 0 && (
               <NestedView
                  handleChangeEditSectionName={handleChangeEditSectionName}
               />
            )}
         </div>

         <div className="flex justify-end gap-x-3">
            <button
               className=" text-richblack-5 bg-richblack-500 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold "
               onClick={goToBack}
            >
               Back
            </button>
            <Iconbtn
               customClasses="flex flex-row items-center gap-2"
               text="Next"
               onClick={goToNext}
            ></Iconbtn>
         </div>
      </div>
   );
}

export default CourseBuilder;
