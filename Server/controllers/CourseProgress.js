const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");
const { convertSecondsToDuration } = require("../utils/secToDuration");

exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;

    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(500).json({
        sucess: false,
        message: "Lecture does not exist",
      });
    }

    const courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    if (!courseProgress) {
      return res.status(500).json({
        sucess: false,
        message: "Course Progress does not exist",
      });
    }
    // console.log(courseProgress);
    await courseProgress.completedVideos.push(subSectionId);
    await courseProgress.save();

    return res.status(200).json({
      sucess: true,
      message: "Course Progress Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createTotalCorseDuration = async (req, res) => {
  try {
    console.log(req.body);
    const { courseId } = req.body;
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    console.log("Course >> ", courseDetails);
    if (!courseDetails) {
      return res.status(500).json({
        sucess: false,
        message: "Course not found",
      });
    }

    var totalDurationInSec = 0;
    for (var i = 0; i < courseDetails.courseContent.length; i++) {
      for (
        var j = 0;
        j < courseDetails.courseContent[i].subSection.length;
        j++
      ) {
        totalDurationInSec += parseFloat(
          courseDetails.courseContent[i].subSection[j].timeDuration
        );
      }
    }
    courseDetails.durationInSecond = totalDurationInSec;

    const totalDuration = convertSecondsToDuration(totalDurationInSec);
    courseDetails.totalDuration = totalDuration;
    await courseDetails.save();

    return res.status(200).json({
      success: true,
      message: "total duration in add in course model",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
