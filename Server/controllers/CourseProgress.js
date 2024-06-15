const { Await } = require("react-router-dom");
const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

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
