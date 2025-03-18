import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import RatingStars from "../components/common/RatingStars";
import GetAvgRating from "../utils/avgRating";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Iconbtn from "../components/common/Iconbtn";
import { MdArrowRight } from "react-icons/md";
import Footer from "../components/common/Footer";
import {
   buyCourse,
   buyCourseFree,
} from "../services/operations/studentFeatures";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCaretRightFill } from "react-icons/bs";
import toast from "react-hot-toast";

function CourseDetails() {
   const { courseId } = useParams();
   const { token } = useSelector((state) => state.auth);
   const { user } = useSelector((state) => state.profile);
   console.log(user);
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
      if (user?.accountType === "Instructor") {
         toast.error("Instructors cannot purchase course");
         return;
      }
      if (token) {
         buyCourse(token, [courseId], user, navigate, dispatch);
         return;
      }
   };

   const handleFreeCourse = () => {
      // buyCourse(token, [courseId], user, navigate, dispatch);
      if (user?.accountType === "Instructor") {
         toast.error("Instructors cannot purchase free courses");
         return;
      }
      buyCourseFree(token, [courseId], navigate);
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
         <div className=" bg-richblack-800 py-0 pt-14  md:py-14">
            <div className=" w-11/12 mx-auto">
               <div className=" relative w-11/12 mx-auto">
                  <div className=" md:w-[850px] flex flex-col gap-2">
                     <h1 className=" text-richblue-5 text-4xl font-bold">
                        {CourseDetails?.courseName}
                     </h1>
                     <p className=" text-richblack-200 text-sm">
                        {CourseDetails?.courseDiscription}
                     </p>
                     <div className=" flex md:flex-row flex-col items-start md:items-center gap-2">
                        <div className=" flex items-center gap-2">
                           <span className=" text-yellow-25 flex items-center gap-2 font-bold ">
                              {avgReviewCount || 0}
                           </span>
                           <RatingStars Review_Count={avgReviewCount} />
                        </div>
                        <span>
                           ({CourseDetails?.ratingAndReviews?.length} Reviews)
                        </span>
                        <span>
                           {CourseDetails?.studentsEnrolled?.length} Students
                           Enrolles
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
                  <div
                     className="md:scale-100 scale-[.77] md:translate-x-0 translate-x-[-13%] md:-mt-0 -mt-3 bg-richblack-700 w-fit flex flex-col gap-3 md:absolute right-0 top-0 p-5 pb-32 rounded-sm 
                     shadow-[0_0_10px_0_rgba(255,255,255,0.2)]
                     border-[1px] border-richblack-600"
                  >
                     <div
                        className="flex flex-col gap-4 bg-richblack-700 rounded-md border-richblack-200/50
                        min-w-[384px] h-fit sticky top-[140px]"
                     >
                        <img
                           src={CourseDetails?.thumbnail}
                           alt="course thumbnail"
                           className=" w-[400px] rounded-2xl object-cover aspect-video"
                        />
                        <div className="">
                           <p className="text-3xl font-bold text-richblack-5">
                              Rs. {CourseDetails?.price}
                           </p>
                           <div className="flex flex-col gap-4 mt-4">
                              <Iconbtn
                                 onClick={
                                    !token
                                       ? () => navigate("/login")
                                       : CourseDetails?.price === 0
                                       ? handleFreeCourse
                                       : handleSubmitCourse
                                 }
                                 customClasses={
                                    "w-full flex items-center justify-center transition-all duration-150 hover:scale-95"
                                 }
                                 text={
                                    !token
                                       ? "Login to Buy"
                                       : CourseDetails?.price === 0
                                       ? "Free"
                                       : "Buy Now"
                                 }
                              />
                              <button className=" w-full text-richblack-5 bg-richblack-800 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold transition-all duration-150 hover:scale-95">
                                 Add to Cart
                              </button>
                           </div>
                        </div>
                     </div>
                     <p className=" text-richblack-200 mt-1 text-center">
                        30-Day Money-Back Guarantee
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
               <div className=" md:w-[850px] mt-14 md:mt-9">
                  <div className=" p-6 flex flex-col gap-4 border-richblack-400 border-[1px]">
                     <h1 className=" text-richblack-5 text-3xl font-bold">
                        What you'll learn
                     </h1>
                     <p className=" text-richblack-5">
                        {CourseDetails?.whatYouWillLearn}
                     </p>
                  </div>

                  <div>
                     <h2 className="text-yellow-50 text-3xl font-semibold mt-5">
                        Course Content
                     </h2>
                     <div className=" pl-7 text-richblack-100 text-lg">
                        <ul>
                           <li>
                              {CourseDetails?.courseContent?.length} sections
                           </li>
                           <li>{lecturesLength} lectures</li>
                           <li>{CourseDetails?.totalDuration} Total Length</li>
                        </ul>
                     </div>
                  </div>

                  <div></div>
               </div>
            </div>
         </div>

         <div className="mt-32">
            <Footer />
         </div>
      </div>
   );
}

export default CourseDetails;
