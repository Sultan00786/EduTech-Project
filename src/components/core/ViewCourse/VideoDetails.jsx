import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Player } from "video-react";
import { AiFillPlayCircle } from "react-icons/ai";
import Iconbtn from "../../common/Iconbtn";
import { MdFlatware } from "react-icons/md";
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
    const numOfLectures = courseSectionData?.[sectionIndex]?.subSection?.length;
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
    const numOfLectures = courseSectionData?.[sectionIndex]?.subSection?.length;
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
        courseSectionData?.[sectionIndex - 1]?.subSection?.[prevSubSecLen - 1]
          ?._id;
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
          <div className=" p-6 pr-10 w-full h-full ">
            <Player
              ref={playerRef}
              aspectRatio="16:9"
              playsInline
              src={videoData?.videoUrl}
              onEnded={() => setVideoEnded(true)}
            >
              <AiFillPlayCircle />
              {videoEnded && (
                <div>
                  {!completedLectures.includes(subSectionId) && (
                    <Iconbtn
                      disabled={loading}
                      onClick={() => handleLectureCompletion()}
                      text={!loading ? "Mark as completed" : "Loading..."}
                    />
                  )}

                  <Iconbtn
                    disabled={loading}
                    onClick={() => {
                      if (playerRef?.current) {
                        playerRef.current?.seek(0);
                        setVideoEnded(false);
                      }
                    }}
                    text={"Rewatch"}
                    customClasses={"text-xl"}
                  />

                  <div>
                    {!isFirstVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToPrevVideo}
                        className="blackButton"
                      >
                        Prev
                      </button>
                    )}

                    {!isLastVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToNextVideo}
                        className="blackButton"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
            </Player>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoDetails;
