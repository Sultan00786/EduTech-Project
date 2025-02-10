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
               <div className=" relative p-6 pt-20 mx-auto select-none pl-[350px] w-[96%] flex">
                  <Player
                     ref={playerRef}
                     aspectRatio="16:9"
                     playsInline
                     src={videoData?.videoUrl}
                     onEnded={() => setVideoEnded(true)}
                  >
                     <AiFillPlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl cursor-pointer" />

                     {/* {videoEnded && !isFirstVideo() && ( */}
                     <div className="z-10 gap-4 p-4 rounded-lg flex justify-between">
                        <div className="flex gap-2 items-center">
                           {!isFirstVideo() && (
                              <button
                                 disabled={loading}
                                 onClick={goToPrevVideo}
                                 className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all disabled:opacity-50"
                              >
                                 <FaStepBackward className="text-lg" />
                                 Prev
                              </button>
                           )}

                           <div
                              onClick={() => {
                                 if (playerRef?.current) {
                                    playerRef.current?.seek(0);
                                    setVideoEnded(false);
                                 }
                              }}
                           >
                              <MdReplay className="text-3xl" />
                           </div>

                           {!isLastVideo() && (
                              <button
                                 disabled={loading}
                                 onClick={goToNextVideo}
                                 className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all disabled:opacity-50"
                              >
                                 Next
                                 <FaStepForward className="text-lg" />
                              </button>
                           )}
                        </div>

                        {/* <Iconbtn
                                 disabled={loading}
                                 onClick={() => handleLectureCompletion()}
                                 text={
                                    !loading
                                       ? "Mark as completed"
                                       : "Loading..."
                                 }
                                 customClasses="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
                              /> */}
                        {!completedLectures.includes(subSectionId) && (
                           <button
                              onClick={() => handleLectureCompletion()}
                              className=" bg-caribbeangreen-400 text-white h-fit w-fit px-4 py-2 text-lg rounded-md hover:bg-green-600 transition-all"
                           >
                              {!loading ? "Mark as completed" : "Loading..."}
                           </button>
                        )}
                     </div>
                     {/* )} */}
                  </Player>
               </div>
            )}
         </div>
      </div>
   );
}

export default VideoDetails;
