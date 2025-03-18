import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Player } from "video-react";
import { AiFillPlayCircle } from "react-icons/ai";
import { FaStepBackward, FaStepForward } from "react-icons/fa";
import { MdReplay } from "react-icons/md";
import Iconbtn from "../../common/Iconbtn";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { Button } from "@heroui/react";

function VideoDetails() {
   const { courseId, sectionId, subSectionId } = useParams();
   const navigate = useNavigate();
   const dispathch = useDispatch();
   const location = useLocation();
   const playerRef = useRef();
   const { token } = useSelector((state) => state.auth);
   const { courseSectionData, courseEntireData, completedLectures } =
      useSelector((state) => state.viewCourse);

   const [videoData, setVideoData] = useState([]);
   const [videoEnded, setVideoEnded] = useState(false);
   const [loading, setLoading] = useState(false);

   const widowWidth = window.innerWidth;

   console.log(videoData);

   useEffect(() => {
      const setVideoSpecificDetails = async () => {
         if (!courseSectionData.length) return;

         if (!courseId && !sectionId && !subSectionId)
            navigate("/dashboard/enrolled-courses");
         else {
            // let's assume k all 3 fiels are present

            const filteredSection = courseSectionData.filter(
               (section) => section._id === sectionId
            );
            console.log(filteredSection);

            const filteredVideoData = filteredSection?.[0]?.subSection?.filter(
               (data) => data._id === subSectionId
            );

            setVideoData(filteredVideoData[0]);
            // console.log(videoData);
            setVideoEnded(false);
         }
      };
      setVideoSpecificDetails();
   }, [courseSectionData, courseEntireData, location.pathname]);

   const isFirstVideo = () => {
      const sectionIndex = courseSectionData?.findIndex(
         (data) => data._id === sectionId
      );

      const subSectionIndex = courseSectionData?.[
         sectionIndex
      ]?.subSection?.findIndex((data) => data._id === subSectionId);

      if (sectionIndex === 0 && subSectionIndex === 0) return true;
      else return false;
   };

   const isLastVideo = () => {
      const sectionIndex = courseSectionData?.findIndex(
         (data) => data._id === sectionId
      );

      const numOfSection = courseSectionData.length;
      const numOfLectures =
         courseSectionData?.[sectionIndex]?.subSection?.length;
      const subSectionIndex = courseSectionData?.[
         sectionIndex
      ]?.subSection?.findIndex((data) => data._id === subSectionId);

      if (
         sectionIndex === numOfSection - 1 &&
         subSectionIndex === numOfLectures - 1
      )
         return true;
      else return false;
   };

   const goToNextVideo = () => {
      const sectionIndex = courseSectionData?.findIndex(
         (data) => data._id === sectionId
      );

      const numOfSection = courseSectionData.length;
      const numOfLectures =
         courseSectionData?.[sectionIndex]?.subSection?.length;
      const subSectionIndex = courseSectionData?.[
         sectionIndex
      ]?.subSection?.findIndex((data) => data._id === subSectionId);

      if (numOfLectures - 1 === subSectionIndex) {
         const nextSectionId = courseSectionData?.[sectionIndex + 1]._id;
         const nextSubSectionId =
            courseSectionData?.[sectionIndex + 1]?.subSection?.[0]?._id;
         navigate(
            `/view-course/${courseEntireData?._id}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
         );
      } else {
         const nextSubSectionId =
            courseSectionData?.[sectionIndex]?.subSection?.[subSectionIndex + 1]
               ?._id;
         navigate(
            `/view-course/${courseEntireData?._id}/section/${sectionId}/sub-section/${nextSubSectionId}`
         );
      }
   };

   const goToPrevVideo = () => {
      const sectionIndex = courseSectionData?.findIndex(
         (data) => data._id === sectionId
      );
      const subSectionIndex = courseSectionData?.[
         sectionIndex
      ]?.subSection?.findIndex((data) => data._id === subSectionId);

      if (subSectionIndex === 0) {
         const prevSectionId = courseSectionData?.[sectionIndex - 1]?._id;
         const prevSubSecLen =
            courseSectionData?.[sectionIndex - 1]?.subSection?.length;
         const preSubSectionId =
            courseSectionData?.[sectionIndex - 1]?.subSection?.[
               prevSubSecLen - 1
            ]?._id;
         navigate(
            `/view-course/${courseEntireData?._id}/section/${prevSectionId}/sub-section/${preSubSectionId}`
         );
      } else {
         const preSubSectionId =
            courseSectionData?.[sectionIndex]?.subSection?.[subSectionIndex - 1]
               ?._id;
         console.log(">> .. ", preSubSectionId);
         navigate(
            `/view-course/${courseEntireData?._id}/section/${sectionId}/sub-section/${preSubSectionId}`
         );
      }
   };

   const handleLectureCompletion = async () => {
      ///dummy code, baad me we will replace it witht the actual call
      setLoading(true);
      //PENDING - > Course Progress PENDING
      const res = await markLectureAsComplete(
         { courseId: courseId, subSectionId: subSectionId },
         token
      );
      //state update
      if (true) {
         dispathch(updateCompletedLectures(subSectionId));
      }
      setLoading(false);
   };

   return (
      <div className=" text-white">
         <div>
            {!videoData ? (
               <div>No Data Found</div>
            ) : (
               <div className=" relative p-6 pt-20 mx-auto select-none flex flex-col md:pl-[350px] md:w-[96%]">
                  <h1 className=" md:hidden text-xl font-semibold text-richblack-100 mt-5 ">
                     {videoData?.title}
                  </h1>

                  <Player
                     ref={playerRef}
                     aspectRatio="16:9"
                     playsInline
                     src={videoData?.videoUrl}
                     onEnded={() => setVideoEnded(true)}
                     className=" w-full border-[2px] border-richblack-700 mt-5 md:mt-0"
                  >
                     <AiFillPlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl cursor-pointer" />

                     {/* {videoEnded && !isFirstVideo() && ( */}
                     <div className="z-10 gap-4 w-[328px] md:w-[1102px]  p-4 flex justify-between border-x-[2px] -translate-x-[2px] border-b-[2px] border-richblack-700">
                        <div className="flex gap-2 items-center">
                           <Button
                              isIconOnly
                              onPress={goToPrevVideo}
                              variant="light"
                              isDisabled={loading || isFirstVideo()}
                           >
                              <div className=" flex items-center gap-2 text-richblack-50">
                                 <FaStepBackward className="text-lg" />
                              </div>
                           </Button>

                           <Button
                              onPress={() => {
                                 if (playerRef?.current) {
                                    playerRef.current?.seek(0);
                                    setVideoEnded(false);
                                 }
                              }}
                              isIconOnly
                              variant="light"
                           >
                              <div className=" flex items-center gap-2 text-richblack-50">
                                 <MdReplay className="text-3xl" />
                              </div>
                           </Button>

                           <Button
                              isIconOnly
                              onPress={goToNextVideo}
                              variant="light"
                              isDisabled={loading || isLastVideo()}
                           >
                              <div className=" flex items-center gap-2 text-richblack-50">
                                 <FaStepForward className="text-lg" />
                              </div>
                           </Button>
                        </div>
                        <div>
                           <Button
                              size={widowWidth > 450 ? "md" : "sm"}
                              onPress={() => handleLectureCompletion()}
                              variant="shadow"
                              color="success"
                              isDisabled={completedLectures.includes(
                                 subSectionId
                              )}
                           >
                              {!loading ? "Completed" : "Loading..."}
                           </Button>
                        </div>
                     </div>
                  </Player>
               </div>
            )}
         </div>
      </div>
   );
}

export default VideoDetails;
