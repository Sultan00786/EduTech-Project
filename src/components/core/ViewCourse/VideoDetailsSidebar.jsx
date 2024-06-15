import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Iconbtn from "../../common/Iconbtn";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function VideoDetailsSidebar({ setReviewModal }) {
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
    <div className="flex min-w-[222px] h-full flex-col border-r-[1px] border-richblack-700 h-[calc[100vh - 3.5rem]] bg-richblack-800 ">
      <div>
        {/* Buttons and heading */}
        <div>
          {/* Button */}
          <div>
            <div
              onClick={() => {
                navigate("/dashboard/enrolled-courses");
              }}
            >
              Back
            </div>
            <div>
              <Iconbtn
                text={"Add Review"}
                onClick={() => setReviewModal(true)}
              />
            </div>
          </div>

          {/* Heading */}
          <div>
            <p>{courseEntireData?.courseName}</p>
            <p>
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className=" text-white">
          {courseSectionData.map((section, index) => (
            <div onClick={() => setActiveStatus(section?._id)} key={index}>
              {/* section */}
              <div>
                <div>{section?.sectionName}</div>
                <div>
                  <MdOutlineKeyboardArrowDown />
                </div>
              </div>

              {/* subSection */}
              <div>
                {activeStatus === section?._id && (
                  <div>
                    {section?.subSection?.map((topic, i) => (
                      <div
                        className={`flex gap-5 p-5 ${
                          videoBarActive === topic._id
                            ? "bg-yellow-200 text-richblack-900"
                            : "bg-richblack-900 text-white"
                        }`}
                        key={i}
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                          );
                          setvideoBarActive(topic?._id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic?._id)}
                        />
                        <span>{topic.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoDetailsSidebar;
