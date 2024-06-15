import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import RatingStars from "../components/common/RatingStars";
import GetAvgRating from "../utils/avgRating";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Iconbtn from "../components/common/Iconbtn";
import { MdArrowRight } from "react-icons/md";
import Footer from "../components/common/Footer";
import { buyCourse } from "../services/operations/studentFeatures";
import { useDispatch, useSelector } from "react-redux";

function CourseDetails() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [CourseDetails, setCourseDetais] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [lecturesLength, setLectrueLength] = useState();

  useEffect(() => {
    const getCourseDetails = async () => {
      setLoading(true);
      const result = await fetchCourseDetails(courseId);
      console.log("course >> ", result?.data[0]);
      if (result) setCourseDetais(result?.data[0]);
      setLoading(false);
    };
    getCourseDetails();
  }, []);

  useEffect(() => {
    const count = GetAvgRating(CourseDetails?.ratingAndReviews);
    setAvgReviewCount(count);

    // finding no. of Lectures
    let numLecture = 0;
    CourseDetails?.courseContent?.map((section) => {
      numLecture += section?.subSection?.length;
    });
    setLectrueLength(numLecture);
  }, [CourseDetails]);

  const handleSubmitCourse = async () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
  };

  if (loading) {
    return (
      <div className=" h-screen flex items-center justify-center">
        <div className=" loader"></div>
      </div>
    );
  }

  return (
    <div className=" text-white w-full">
      <div className=" bg-richblack-800 py-14">
        <div className=" w-11/12 mx-auto">
          <div className=" relative w-11/12 mx-auto">
            <div className="flex flex-col gap-2">
              <h1 className=" text-richblue-5 text-4xl font-bold">
                {CourseDetails?.courseName}
              </h1>
              <p className=" text-richblack-200 text-sm">
                {CourseDetails?.courseDiscription}
              </p>
              <div className=" flex items-center gap-2">
                <span className=" text-yellow-25 flex items-center gap-2 font-bold ">
                  {avgReviewCount || 0}
                </span>
                <RatingStars />
                <span>({CourseDetails?.ratingAndReviews?.length} Reviews)</span>
                <span>
                  {CourseDetails?.studentsEnrolled?.length} Students Enrolles
                </span>
              </div>
              <p className=" text-[15px]">
                Created By {CourseDetails?.instructor?.firstName}{" "}
                {CourseDetails?.instructor?.lastName}
              </p>
              <div className="flex items-center gap-3 text-[15px]">
                <HiOutlineExclamationCircle />
                <span>Create at</span>
              </div>
            </div>
            <div className=" bg-richblack-700 w-fit flex flex-col gap-3 rounded-md absolute right-0 top-0 p-5 pb-20">
              <dvi className="flex flex-col gap-5">
                <img
                  src={CourseDetails?.thumbnail}
                  className=" w-[350px] rounded-lg"
                />
                <p className=" text-richblue-5 font-bold text-3xl">
                  Rs. {CourseDetails?.price}
                </p>
                <div className=" w-full flex flex-col gap-4">
                  <Iconbtn
                    onClick={handleSubmitCourse}
                    customClasses={"w-full flex items-center justify-center"}
                    text={"Buy Now"}
                  />
                  <button className=" w-full text-richblack-5 bg-richblack-800 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold ">
                    Add to Cart
                  </button>
                </div>
              </dvi>
              <p className=" text-richblack-200 text-center">
                30-Day Money-Back Gaurantee
              </p>
              <div className="flex flex-col gap-1 mt-4">
                <p className=" text-xl text-richblue-5 font-semibold">
                  This Course Includes :
                </p>
                <div className=" flex gap-2 items-center text-caribbeangreen-200">
                  <MdArrowRight /> <span>Good Course</span>
                </div>
                <div className=" flex gap-2 items-center text-caribbeangreen-200">
                  <MdArrowRight /> <span>Fast place</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-11/12 mx-auto ">
        <div className=" w-11/12 mx-auto">
          <div className=" w-[850px] mt-9">
            <div className=" p-6 flex flex-col gap-4 border-richblack-400 border-[1px]">
              <h1 className=" text-richblack-5 text-3xl font-bold">
                What you'll learn
              </h1>
              <p className=" text-richblack-5">
                {CourseDetails?.whatYouWillLearn}
              </p>
            </div>

            <div>
              <h2>Course Content</h2>
              <div>
                <p>
                  {CourseDetails?.courseContent?.length} section(s){" "}
                  {lecturesLength} lectures() 10s total length
                </p>
              </div>
            </div>

            <div></div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default CourseDetails;
