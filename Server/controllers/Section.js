const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

// Handler function for Create the section
exports.createSection = async (req, res) => {
  /**
   * Step: 1 --> data fetch
   * Step: 2 --> validation of data
   * Step: 3 --> create section
   * Step: 4 --> update course with sectin ObjectID
   * Step: 5 --> return res
   */

  try {
    // Step: 1 --> data fetch
    const { sectionName, courseId } = req.body;

    // Step: 2 --> validation of data
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "missing properties",
      });
    }

    // Step: 3 --> create section
    const newSection = await Section.create({ sectionName });

    // console.log("\nnewSection >>> \n", newSection);

    // Step: 4 --> update course with sectin ObjectID
    // HW: use populate to replace section or subSection both in updatedCouseDetails
    await Course.updateOne(
      { _id: courseId },
      {
        $push: {
          courseContent: newSection._id,
        },
      }
    );

    const updatedCourseDetails = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // console.log("\nupdatedCourseDetails >> \n", updatedCourseDetails);

    // Step: 5 --> return res
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create Section, please try again",
      error: error.message,
    });
  }
};

// Handler function for update the section

exports.updateSection = async (req, res) => {
  /**
   * Step: 1 --> data fetch
   * Step: 2 --> validation of data
   * Step: 3 --> update the data
   * Step: 4 --> return res
   */

  try {
    // Step: 1 --> data fetch
    const { sectionName, sectionId, courseId } = req.body;

    // Step: 2 --> validation of data
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "missing properties",
      });
    }

    // Step: 3 --> update the data

    await Section.updateOne({ _id: sectionId }, { sectionName: sectionName });

    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    // console.log("course >>>> ", course);

    //  Step: 4 --> return res
    return res.status(200).json({
      success: true,
      message: "Section Update successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update the Section, please try again",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  /**
   * Step: 1 --> get ID
   * Step: 2 --> use findByIdandDelet
   * Step: 3 --> find updated course data
   * Step: 3 --> return response and updted course data of section
   */

  try {
    // * Step: 1 --> get ID
    // Assuming Id we are sending through route params
    const { sectionId, courseId } = req.body;

    // detele sub Section
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not Found",
      });
    }
    console.log("Section >> ", section);
    await SubSection.deleteMany({
      _id: {
        $in: section.subSection,
      },
    });

    // * Step: 2 --> use findByIdandDelet
    // TODO: do we need to delete the entry from the course schema ??
    await Section.findByIdAndDelete(sectionId);

    // * Step: 3 --> find the updated course data and return it
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // * Step:  --> return res
    return res.status(200).json({
      success: true,
      message: "Section Deleted Successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete the Section, please try again",
      error: error.message,
    });
  }
};
