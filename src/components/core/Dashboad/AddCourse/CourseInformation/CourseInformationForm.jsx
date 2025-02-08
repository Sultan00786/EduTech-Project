import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
   addCourseDetails,
   editCourseDetails,
   fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementFied from "./RequirementFied";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import Iconbtn from "../../../../common/Iconbtn";
import toast from "react-hot-toast";
import { COURSE_STASTUS } from "../../../../../utils/constants";
import ChipInput from "./ChipInput";
import Upload from "../CourseBuilder/Upload";

function CourseInformationForm() {
   const {
      register,
      handleSubmit,
      setValue,
      getValues,
      formState: { errors },
   } = useForm();

   const dispatch = useDispatch();
   const { course, editCourse } = useSelector((state) => state.course);
   const { token } = useSelector((state) => state.auth);

   const [loading, setLoading] = useState();
   const [courseCategories, setCourseCategories] = useState([]);

   const [tagList, setTagList] = useState([]);
   useEffect(() => {
      toast.error("Must Select the Category");
      const getCategories = async () => {
         setLoading(true);
         const categories = await fetchCourseCategories();
         if (categories !== undefined) setCourseCategories(categories);
         setLoading(false);
      };
      getCategories();
      if (editCourse) {
         // console.log("Course edit >> ", course);
         setValue("courseTitle", course.courseName);
         setValue("courseShortDesc", course.courseDiscription);
         setValue("coursePrice", course.price);
         setValue("courseTags", course.tag);
         setValue("courseBenefits", course.whatYouWillLearn);
         setValue("courseCategory", course.category);
         setValue("courseRequirements", course.instruction);
         setValue("courseImage", course.thumbnail);
      }
   }, []);

   function isFormUpdate() {
      const currentVal = getValues();
      // console.log("Hellow ... ");
      if (
         currentVal.courseTitle !== course.courseName ||
         currentVal.courseShortDesc !== course.courseDescription ||
         currentVal.coursePrice !== course.price ||
         currentVal.courseTags !== course.tag ||
         currentVal.courseImage !== course.thumbnail ||
         currentVal.courseBenefits !== course.whatYouWillLearn ||
         currentVal.courseCategory._id !== course.category._id ||
         currentVal.courseRequirements !== course.instruction
      )
         return true;
      else return false;
   }

   const onSubmit = async (data) => {
      // console.log("data Course >> ", data);

      if (editCourse) {
         if (isFormUpdate) {
            const currentValues = getValues();

            const formData = new FormData();

            formData.append("courseId", course._id);

            if (currentValues.courseTitle !== course.courseName) {
               formData.append("courseName", data.courseTitle);
            }

            if (currentValues.courseShortDesc !== course.courseDescription) {
               formData.append("courseDescription", data.courseShortDesc);
            }

            if (currentValues.coursePrice !== course.price) {
               formData.append("price", data.coursePrice);
            }

            if (currentValues.courseBenefits !== course.whatYouWillLearn) {
               formData.append("whatYouWillLearn", data.courseBenefits);
            }

            if (currentValues.courseImage !== course.thumbnail) {
               formData.append("thumbnail", data.courseImage);
            }

            if (currentValues.courseCategory !== course.category) {
               formData.append("category", data.courseCategory);
            }

            if (currentValues?.courseRequirements !== course?.instruction) {
               formData.append(
                  "instruction",
                  JSON.stringify(data.courseRequirements)
               );
            }

            const jsonTags1 = JSON.stringify(tagList);
            if (currentValues?.courseTags !== course?.tag) {
               formData.append("tag", JSON.stringify(jsonTags1));
            }

            // console.log("Values >> ", currentValues);
            // console.log("Course >> ", course);

            setLoading(true);
            const result = await editCourseDetails(formData, token);
            setLoading(false);

            // console.log("result", result);

            if (result) {
               dispatch(setStep(2));
               dispatch(setCourse(result));
            }
         } else toast.error("NO Changes made so far");

         return;
      }

      //create a new course
      const formData = new FormData();
      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseShortDesc);
      formData.append("price", data.coursePrice);
      formData.append("whatYouWillLearn", data.courseBenefits);
      formData.append("category", data.courseCategory);
      formData.append("instructions", JSON.stringify(data.courseRequirements));
      formData.append("status", COURSE_STASTUS.DRAFT);
      formData.append("thumbnail", data.courseImage);

      const jsonTags = JSON.stringify(tagList);
      formData.append("courseTags", jsonTags);

      // console.log("thumbnail ?? ", data.courseImage);

      setLoading(true);
      const result = await addCourseDetails(formData, token);
      // console.log("Result: .. ", result);
      if (result) {
         dispatch(setStep(2));
         dispatch(setCourse(result));
      }
      setLoading(false);
   };

   return (
      <div>
         <form
            onSubmit={(e) => {
               e.preventDefault();
               handleSubmit(onSubmit)();
            }}
            className=" flex flex-col gap space-y-8"
         >
            <div>
               <label htmlFor="courseTitle" className="lable-style">
                  Course Title
                  <sup className=" text-pink-400">*</sup>
               </label>
               <input
                  id="courseTitle"
                  placeholder="Enter Course Title"
                  {...register("courseTitle", { required: true })}
                  className=" w-full form-style"
               />
               {editCourse
                  ? ""
                  : errors.courseTitle && <span>Course Title is required</span>}
            </div>

            <div className="flex flex-col gap-1">
               <label htmlFor="courseShortDesc" className="lable-style">
                  Course Short Description
               </label>
               <textarea
                  id="courseShortDesc"
                  name="courseShortDesc"
                  placeholder="Enter Description"
                  {...register("courseShortDesc", { required: true })}
                  className="form-style"
               />
               {editCourse
                  ? ""
                  : errors.courseShortDesc && (
                       <span>Course Discription is required</span>
                    )}
            </div>

            <div className=" relative flex flex-col gap-1">
               <label htmlFor="coursePrice" className="lable-style">
                  Course Price
                  <sup className=" text-pink-400">*</sup>
               </label>
               <input
                  id="coursePrice"
                  placeholder="      Enter Course Price"
                  {...register("coursePrice", {
                     required: true,
                     valueAsNumber: true,
                  })}
                  className=" w-full form-style"
               />
               {editCourse
                  ? ""
                  : errors.coursePrice && <span>Course Price is required</span>}

               <HiOutlineCurrencyRupee className=" absolute top-1/2 left-2 text-richblack-400 text-2xl" />
            </div>

            <div className="flex flex-col gap-1 ">
               <label htmlFor="courseCategory" className="lable-style">
                  Course Category
               </label>
               <select
                  id="courseCategory"
                  name="courseCategory"
                  className="form-style"
                  defaultValue=""
                  {...register("courseCategory", { required: true })}
               >
                  <option value="" disabled></option>
                  {!loading &&
                     courseCategories.map((category, index) => (
                        <option key={index} value={category?._id}>
                           {category?.name}
                        </option>
                     ))}
               </select>
            </div>

            <ChipInput
               label="Tag"
               name="courseTags"
               placeholder="Enter tags and press enter"
               register={register}
               errors={errors}
               setValue={setValue}
               getValues={getValues}
               tagList={tagList}
               setTagList={setTagList}
            />

            <Upload
               name="courseImage"
               label="Course Thumbnail"
               setValue={setValue}
               errors={errors}
            />

            <div className="flex flex-col gap-1">
               <label htmlFor="courseBenefits" className="lable-style">
                  Benefifts of the course
               </label>
               <textarea
                  id="courseBenefits"
                  name="courseBenefits"
                  placeholder="Enter Benefifts of the course"
                  {...register("courseBenefits", { required: true })}
                  className="form-style w-full min-h-[130px]"
               />
               {editCourse
                  ? ""
                  : errors.courseBenefits && (
                       <span>Benefits of the course are required</span>
                    )}
            </div>

            <RequirementFied
               name="courseRequirements"
               label="Requirements"
               register={register}
               errors={errors}
               setValue={setValue}
               getValues={getValues}
            />

            <div className=" flex gap-2 items-center justify-end">
               {editCourse && (
                  <button
                     onClick={() => dispatch(setStep(2))}
                     className=" text-richblack-5 bg-richblack-500 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold "
                  >
                     Continue
                  </button>
               )}

               <div
                  onClick={(e) => {
                     e.preventDefault();
                     handleSubmit(onSubmit)();
                  }}
               >
                  <Iconbtn
                     text={!editCourse ? "Next" : "Save Changes"}
                     type="submit"
                  />
               </div>
            </div>
         </form>
      </div>
   );
}

export default CourseInformationForm;
