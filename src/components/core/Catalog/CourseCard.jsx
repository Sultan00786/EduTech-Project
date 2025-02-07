import React, { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";

function CourseCard({ course, Height }) {
   // console.log(course);

   const [avgReviewCount, setAvgReviewCount] = useState(0);

   useEffect(() => {
      const count = GetAvgRating(course.ratingAndReviews);
      setAvgReviewCount(count);
   }, [course]);
   return (
      <div className="">
         <Link to={`/courses/${course._id}`}>
            <div>
               <div>
                  <img
                     src={course?.thumbnail}
                     alt={course?.courseName}
                     className={`${Height} object-cover rounded-xl aspect-video`}
                  />
               </div>
               <div>
                  <p>{course?.courseName}</p>
                  <p>
                     {course?.instructor?.firstName}{" "}
                     {course?.instructor?.lastName}
                  </p>
                  <div className="flex gap-2 ">
                     <span>{avgReviewCount || 0}</span>
                     <RatingStars Review_Count={avgReviewCount || 0} />
                     <span className=" text-richblack-300 text-sm">
                        {course?.ratingAndReviews?.length} Ratings
                     </span>
                  </div>
                  <p className=" font-bold text-richblack-5 text-xl">
                     Rs. {course?.price}
                  </p>
               </div>
            </div>
         </Link>
      </div>
   );
}

export default CourseCard;
