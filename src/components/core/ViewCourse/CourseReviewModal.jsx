import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import Iconbtn from "../../common/Iconbtn";
import { createRating } from "../../../services/operations/courseDetailsAPI";

function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseExperience } = useSelector((state) => state.viewCourse);
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
        courseId: courseExperience._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };
  return (
    <div>
      <div>
        {/* Modal Header */}
        <div>
          <p>Add Review</p>
          <button onClick={() => setReviewModal(false)}>Close</button>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* stars */}
            <ReactStars
              count={5}
              onChange={ratingChange}
              size={24}
              activeColor={"#ffd700"}
            />

            {/* text area */}
            <div>
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
            <div>
              <button onClick={() => setReviewModal(false)}>Cancle</button>
              <Iconbtn type={"submit"} text={"Save"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CourseReviewModal;
