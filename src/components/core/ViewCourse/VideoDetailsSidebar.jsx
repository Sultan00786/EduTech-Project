import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Iconbtn from "../../common/Iconbtn";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function VideoDetailsSidebar({ setReviewModal, onClose = () => {} }) {
   const [activeStatus, setActiveStatus] = useState("");
   const [videoBarActive, setvideoBarActive] = useState("");
   const location = useLocation();
   const navigate = useNavigate();
   const { sectionId, subSectionId } = useParams();
   const {
      courseSectionData,
      courseEntireData,
      completedLectures,
      totalNoOfLectures,
   } = useSelector((state) => state.viewCourse);

   console.log(courseSectionData);
   // console.log(courseEntireData);

   useEffect(() => {
      function getSecAndSubsecId() {
         if (!courseSectionData.length) return;

         // find currest section index from course
         const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
         );

         // then find subsecion form the selected section
         const currentSubSectionIndex = courseSectionData?.[
            currentSectionIndex
         ]?.subSection.findIndex((data) => data._id === subSectionId);

         // here we have find the sub-section (lecture) id for marking lecture
         setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
         const activeSubSectionId =
            courseSectionData?.[currentSectionIndex]?.subSection?.[
               currentSubSectionIndex
            ]?._id;
         setvideoBarActive(activeSubSectionId);
      }
      getSecAndSubsecId();
   }, [courseSectionData, courseEntireData, location.pathname]);

   return (
      <div className=" z-10 flex w-[324px] h-full flex-col border-r-[1px] border-richblack-700 h-[calc[100vh - 3.5rem]] bg-richblack-800 md:pt-14 fixed z-[2]">
         <div>
            {/* Buttons and heading */}
            <div>
               {/* Button */}
               <div className=" flex items-center justify-between py-3 px-2">
                  <div
                     onClick={() => {
                        navigate("/dashboard/enrolled-courses");
                     }}
                     className=" scale-95"
                  >
                     <Iconbtn text={"Back"} outline={true} />
                  </div>
                  <div className=" scale-95">
                     <Iconbtn
                        text={"Review"}
                        onClick={() => setReviewModal(true)}
                     />
                  </div>
               </div>

               {/* Heading */}
               <div
                  className=" flex items-center
                gap-2 py-3 px-2"
               >
                  <p className=" text-richblack-50 font-semibold text-lg">
                     {courseEntireData?.courseName}
                  </p>
                  <p className=" w-[20%] text-caribbeangreen-400 font-semibold ">
                     {completedLectures?.length} / {totalNoOfLectures}
                  </p>
               </div>
            </div>

            <div className="flex flex-col gap-1 text-white z-10">
               {courseSectionData.map((section, index) => (
                  <div
                     onClick={() => setActiveStatus(section?._id)}
                     key={index}
                  >
                     {/* section */}
                     <div c>
                        <div className=" bg-richblack-600 flex items-center justify-between py-4 px-2 cursor-pointer">
                           <div>{section?.sectionName}</div>
                           <MdOutlineKeyboardArrowDown />
                        </div>

                        {/* subSection */}
                        <div className=" bg-richblack-800">
                           {activeStatus === section?._id && (
                              <div className=" flex flex-col gap-2 py-3">
                                 {section?.subSection?.map((topic, i) => (
                                    <div
                                       className={`flex gap-3 px-2 font-semibold cursor-pointer ${
                                          videoBarActive === topic._id
                                             ? " text-blue-200"
                                             : " text-richblack-50"
                                       }`}
                                       key={i}
                                       onClick={() => {
                                          navigate(
                                             `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                                          );
                                          setvideoBarActive(topic?._id);
                                          onClose();
                                       }}
                                    >
                                       <input
                                          type="checkbox"
                                          checked={completedLectures.includes(
                                             topic?._id
                                          )}
                                          className={` w-4 h-4 mt-1 ${
                                             videoBarActive === topic._id
                                                ? " text-blue-200"
                                                : " text-richblack-50"
                                          }`}
                                       />
                                       <span className={` underline `}>
                                          {topic.title}
                                       </span>
                                    </div>
                                 ))}
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default VideoDetailsSidebar;
