const { TopologyDescriptionChangedEvent } = require("mongodb");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");

// udate Profile
exports.updateProfile = async (req, res) => {
  /**
   * Step: 1 --> fetch data
   * Step: 2 --> get userId
   * Step: 3 --> validation
   * Step: 4 --> find profile from db
   * Step: 5 --> update profile in db
   * Step: 6 --> return res
   */

  try {
    // * Step: 1 --> fetch data
    const {
      dateOfBirth = "",
      about = "",
      contactNumber,
      gender,
      firstName,
      lastName,
      userId,
      profileId,
    } = req.body;

    console.log(firstName);
    console.log(lastName);
    console.log(contactNumber);
    console.log(dateOfBirth);
    console.log(about);
    console.log(gender);
    console.log(profileId);
    // * Step: 2 --> get userId

    console.log("Id: ", userId);

    // * Step: 3 --> validation
    if (!contactNumber || !gender || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // * Step: 4 --> find profile from db

    const profileDetails = await Profile.findByIdAndUpdate(profileId, {
      $set: {
        about: about,
        gender: gender,
        dateOfBirth: dateOfBirth,
        contactNamber: contactNumber,
      },
    });
    console.log("\n>>>>> profile Details: ", profileDetails);

    const userDetails = await User.findByIdAndUpdate(userId, {
      $set: {
        firstName: firstName,
        lastName: lastName,
      },
    })
      .populate({
        path: "additionalDetails",
        populate: {
          path: "contactNamber",
        },
      })
      .exec();

    console.log("\n>>>>> User Details: ", userDetails);

    // // * Step: 5 --> update profile in db
    // profileDetails.dateOfBirth = dateOfBirth;
    // profileDetails.about = about;
    // profileDetails.gender = gender;
    // profileDetails.contactNamber = contactNumber;

    // await profileDetails.save();

    // * Step: 6 --> return res
    return res.status(200).json({
      success: true,
      message: "profile Upload successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// delete Account
// Explore -> how can we schedule delete option

exports.deleteAccount = async (req, res) => {
  // only for student role

  /**
   * Step: 1 --> get userId
   * Step: 2 --> validation
   * Step: 3 --> delete profile from db
   * Step: 4 --> delete User in db
   * Step: 5 --> return res
   */

  try {
    //  * Step: 1 --> get userId
    const id = req.user.id;

    //  * Step: 2 --> validation
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //  * Step: 3 --> delete profile from db
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    //  * Step: 4 --> delete User in db
    // TODO: hw uneroll user from all enrolled courses
    await User.findByIdAndDelete({ _id: id });

    //  * Step: 5 --> return res
    return res.status(200).json({
      success: true,
      message: "User deteled Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// get all user details

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    console.log(userDetails);

    return res.status(200).json({
      success: true,
      message: "We get Successfully all user details",
      userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    // console.log("REQuenst...........", req);
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    console.log(userId, displayPicture);
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log("Image >> ", image);
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          image: image.secure_url,
        },
      }
    );

    const updatedProfile = await User.findOne({ _id: userId });

    console.log("\n Updated Profile of user >> \n", updatedProfile);

    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    console.log(userDetails);

    for (let i = 0; i < userDetails.courses.length; i++) {
      const courseProgress = await CourseProgress.findOne({
        userId: userId,
        courseID: userDetails.courses[i]._id,
      }).populate("completedVideos");

      // console.log("CourseProgress >> ", courseProgress);

      let totalProgressInSec = 0;
      for (let j = 0; j < courseProgress.completedVideos.length; j++) {
        totalProgressInSec += parseFloat(
          courseProgress.completedVideos[j].timeDuration
        );
      }
      const totalDurationInSec = userDetails.courses[i].durationInSecond;
      const ans = (totalProgressInSec / totalDurationInSec) * 100;
      userDetails.courses[i].progressPercentage = Math.floor(ans);
      await userDetails.courses[i].save();
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  console.log("hellow");
  try {
    const courseDetail = await Course.find({ instructor: req.user.id });

    // console.log(courseDetail);

    const courseData = courseDetail.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // create an new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDiscription: course.courseDiscription,
        totalStudentsEnrolled: totalStudentsEnrolled,
        totalAmountGenerated: totalAmountGenerated,
      };
      return courseDataWithStats;
    });

    res.status(200).json({
      courses: courseData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
