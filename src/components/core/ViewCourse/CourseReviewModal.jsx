import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import Iconbtn from "../../common/Iconbtn";
import { createRating } from "../../../services/operations/courseDetailsAPI";
import { IoCloseCircleSharp } from "react-icons/io5";

function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const ratingChange = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="p-5 bg-richblack-900 flex flex-col gap-2 w-[600px] rounded-xl border-[1px] border-richblack-500 ">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <p className=" text-richblack-5 font-bold text-2xl">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <IoCloseCircleSharp className=" text-richblack-300 text-xl" />
          </button>
        </div>

        {/* Modal body */}
        <div>
          <div>
            <img
              src={user?.image}
              alt="user image"
              className=" aspect-square w-[50px] rounded-full object-cover"
            />
            <div>
              <p>
                {user?.firstName} {user?.lastName}
              </p>
              <p>Posting Pulblicly</p>
            </div>
          </div>
          <form
            className=" flex flex-col items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* stars */}
            <ReactStars
              count={5}
              onChange={ratingChange}
              size={24}
              activeColor={"#ffd700"}
            />

            {/* text area */}
            <div className=" w-full">
              <label htmlFor="courseExperience" className="lable-style">
                Add Your Experience
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience here"
                {...register("courseExperience", { required: true })}
                className=" w-full form-style min-h-[130px]"
              />
              {errors.courseExperience && (
                <span>Please add your experience</span>
              )}
            </div>

            {/* buttons */}
            <div className=" w-full flex items-center justify-between">
              <button
                className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                onClick={() => setReviewModal(false)}
              >
                Cancle
              </button>
              <Iconbtn type={"submit"} text={"Save"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CourseReviewModal;
