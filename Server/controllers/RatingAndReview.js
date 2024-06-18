const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

// createRating

exports.createRating = async (req, res) => {
  /**
   * Step: 1 --> get user id
   * Step: 2 --> fetchdata from req body
   * Step: 3 --> check if user is enrolled or not
   * Step: 4 --> check if user already reviewed the course
   * Step: 5 --> create rating and review
   * Step: 6 --> update course with this rating/review
   * Step: 7 --> return res
   */

  try {
    // * Step: 1 --> get user id
    const userId = req.user.id;

    // * Step: 2 --> fetchdata from req body
    const { rating, review, courseId } = req.body;

    // * Step: 3 --> check if user is enrolled or not
    const courseDetail = await Course.findOne(
      { _id: courseId },
      {
        studentsEnrolled: { $elemMatch: { $eq: userId } },
      }
    );
    if (!courseDetail) {
      return res.status(404).json({
        success: false,
        message: "Student is Not Enrolled in The Course",
      });
    }

    // * Step: 4 --> check if user already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course is Already Reviewed By the User",
      });
    }

    // * Step: 5 --> create rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseDetail,
      user: userId,
    });

    // * Step: 6 --> update course with this rating/review
    const updateCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      },
      { new: true }
    );
    console.log(updateCourseDetails);

    // * Step: 7 --> return res
    return res.status(200).json({
      success: true,
      message: "Rating And Review Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getAverageRating

exports.getAverageRating = async (req, res) => {
  /**
   * Step: 1 --> get Couse id
   * Step: 2 --> calculate avg rating
   * Step: 3 --> return rating
   */

  try {
    // * Step: 1 --> get Couse id
    const courseId = req.body.courseId;

    // * Step: 2 --> calculate avg rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          getAverageRating: { $avg: "$rating" },
        },
      },
    ]);

    // * Step: 3 --> return rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    // if no rating exist
    return res.status(200).json({
      success: true,
      message: "Average Rating is 0, No Ratings Given Till Now",
      averageRating,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getAllRating and Review

exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All Review Fetch Successfully",
      data: allReviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
