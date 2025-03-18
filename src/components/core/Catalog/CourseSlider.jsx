import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import CourseCard from "./CourseCard";

function CourseSlider({ courses }) {
   // console.log("Course");
   const screenWidth = window.innerWidth;
   return (
      <div>
         {courses?.length > 0 ? (
            <Swiper
               slidesPerView={screenWidth < 568 ? 1 : 3}
               spaceBetween={30}
               className="mySwiper"
            >
               {courses?.map((course) => (
                  <SwiperSlide>
                     <CourseCard course={course} Height={"h-[200px]"} />
                  </SwiperSlide>
               ))}
            </Swiper>
         ) : (
            <p className="mt-14 text-center text-3xl text-richblack-100">
               No Course Found
            </p>
         )}
      </div>
   );
}

export default CourseSlider;
