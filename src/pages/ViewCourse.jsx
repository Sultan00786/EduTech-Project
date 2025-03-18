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
import { Drawer, DrawerContent } from "@heroui/drawer";
import { MdDoubleArrow } from "react-icons/md";
import { useDisclosure } from "@heroui/react";

function ViewCourse() {
   const [reviewModal, setReviewModal] = useState(false);
   const { courseId } = useParams();
   const { token } = useSelector((state) => state.auth);
   const dispathch = useDispatch();
   const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
         <div className="flex w-full ">
            <div>
               <div className=" hidden md:block">
                  <VideoDetailsSidebar setReviewModal={setReviewModal} />
               </div>
               <div className="md:hidden">
                  <button
                     className=" z-50 fixed top-[58px] text-richblack-100 m-0 mr-2 px-3 py-2 border-[1px] border-richblack-700 rounded-md bg-richblack-800 hover:bg-richblack-700 hover:text-white transition-all duration-200 "
                     onClick={onOpen}
                  >
                     <MdDoubleArrow />
                  </button>
                  <Drawer
                     isOpen={isOpen}
                     onOpenChange={onOpenChange}
                     placement="left"
                     backdrop="blur"
                  >
                     <DrawerContent className="bg-richblack-800 w-[55%] border-l-2 border-richblack-700">
                        {(onClose) => (
                           <div>
                              <VideoDetailsSidebar
                                 setReviewModal={setReviewModal}
                                 onClose={onClose}
                              />
                           </div>
                        )}
                     </DrawerContent>
                  </Drawer>
               </div>
            </div>

            <div className=" w-full">
               <Outlet />
            </div>
         </div>
         {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      </div>
   );
}

export default ViewCourse;
