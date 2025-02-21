const Course = require("../models/Course");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

// createCourse handler function

exports.createCourse = async (req, res) => {
   // console.log(" >> >> ", req.files);
   try {
      // fetch all data from creating the course
      const {
         courseName,
         courseDescription,
         courseTags,
         whatYouWillLearn,
         price,
         category,
      } = req.body;

      // get thumbnail using req.files.fileName

      const thumbnail = req.files.thumbnail;
      // console.log(
      //   courseName,
      //   courseDescription,
      //   whatYouWillLearn,
      //   price,
      //   category,
      //   courseTags,
      //   thumbnail
      // );

      //  >>>>> couseTags string formate aa raha hie uska ghayan rakh na

      // Validation for all data
      if (
         !courseName ||
         !courseDescription ||
         !whatYouWillLearn ||
         !price ||
         !category ||
         !thumbnail ||
         !courseTags
      ) {
         // (courseName && courseDescription && whatYouWillLearn && price && CategoryId && thumbnail)
         return res.status(400).json({
            success: false,
            message: "All fields are required",
         });
      }

      // check for instructor
      const userId = req.user.id;
      const instructorDtails = await User.findById(userId);
      // TODO: Verify that userId and instructorDtails._ are same or not ?

      // console.log("Instructor Details: ", instructorDtails);
      if (!instructorDtails) {
         return res.status(404).json({
            success: false,
            message: "Instructor Details not found",
         });
      }

      // check given Category is valid or not
      // console.log("Category ID: ", CategoryId);
      const CategoryDetails = await Category.findById(category);
      if (!CategoryDetails) {
         return res.status(404).json({
            success: false,
            message: "Category Details not found",
         });
      }
      // console.log("Category ID: ", CategoryDetails);

      // Uplaod Image to cloudinary
      const thumbnailImage = await uploadImageToCloudinary(
         thumbnail,
         process.env.FOLDER_NAME
      );

      // create an entry for new course
      const newCourse = await Course.create({
         courseName: courseName,
         courseDiscription: courseDescription,
         instructor: instructorDtails._id,
         whatYouWillLearn: whatYouWillLearn,
         price: price,
         Category: CategoryDetails._id,
         thumbnail: thumbnailImage.secure_url,
         tag: courseTags,
         status: null,
      });

      const course = await Course.findById(newCourse._id)
         .populate("category")
         .populate("tag")
         .populate("courseDiscription")
         .populate("status")
         .exec();

      // console.log("New Course >> ", newCourse);
      // console.log("Course >> ", course);

      // update the new course to the user schema of Instructor
      await User.findByIdAndUpdate(
         { _id: instructorDtails._id },
         {
            $push: {
               coures: newCourse._id,
            },
         },
         { new: true }
      );

      // update the Category ka schema
      const updCat = await Category.findByIdAndUpdate(
         { _id: CategoryDetails._id },
         {
            $push: {
               courses: newCourse._id,
            },
         },
         { new: true }
      );

      // console.log("Updated wli category:\n", updCat);

      // return response
      return res.status(200).json({
         success: true,
         message: "Course Created successfully",
         course,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "fail to create course",
         error: error.message,
      });
   }
};

// Edit Course Details
exports.editCourse = async (req, res) => {
   try {
      const { courseId } = req.body;
      const updates = req.body;
      const course = await Course.findById(courseId);

      // console.log("Reques body updated deatails >>> ", updates);

      if (!course) {
         return res.status(404).json({ error: "Course not found" });
      }

      // If Thumbnail Image is found, update it
      if (req.files) {
         // console.log("thumbnail update", req.files);
         const thumbnail = req.files.thumbnail;
         const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
         );
         course.thumbnail = thumbnailImage.secure_url;
      }

      // Update only the fields that are present in the request body
      for (const key in updates) {
         if (updates.hasOwnProperty(key)) {
            if (key === "tag" || key === "instructions") {
               course[key] = JSON.parse(updates[key]);
            } else {
               course[key] = updates[key];
            }
         }
      }

      //

      await course.save();

      const updatedCourse = await Course.findOne({
         _id: courseId,
      })
         .populate({
            path: "instructor",
            populate: {
               path: "additionalDetails",
            },
         })
         .populate("category")
         .populate("ratingAndReviews")
         .populate({
            path: "courseContent",
            populate: {
               path: "subSection",
            },
         })
         .exec();

      res.json({
         success: true,
         message: "Course updated successfully",
         data: updatedCourse,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: "Internal server error",
         error: error.message,
      });
   }
};

// getAllCourses handler function

exports.getAllCourses = async (req, res) => {
   try {
      // TODO: change the below statement with testing
      const allCourse = await Course.find({});

      return res.status(200).json({
         success: true,
         message: "Data for all courses fetched successfully",
         data: allCourse,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "Cannot fetch course data ",
         error: error.message,
      });
   }
};

// getCourseDetails
exports.getCourseDetails = async (req, res) => {
   try {
      // get id
      const { courseId } = req.body;

      // get course full details
      const courseDetail = await Course.find({ _id: courseId })
         .populate({
            path: "instructor",
            populate: {
               path: "additionalDetails",
            },
         })
         .populate("category")
         // .populate("ratingAndreviews")
         .populate({
            path: "courseContent",
            populate: {
               path: "subSection",
            },
         })
         .exec();

      // validation
      if (!courseDetail) {
         return res.stastu(400).json({
            success: false,
            message: `Could Not Faild The Course With ${courseId}`,
         });
      }

      // return response
      return res.status(200).json({
         success: true,
         message: "Course Details Fetched Successfully",
         data: courseDetail,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

exports.getFullCourseDetails = async (req, res) => {
   try {
      const { courseId } = req.body;
      const userId = req.user.id;
      const courseDetails = await Course.findOne({
         _id: courseId,
      })
         .populate({
            path: "instructor",
            populate: {
               path: "additionalDetails",
            },
         })
         .populate("category")
         .populate("ratingAndReviews")
         .populate({
            path: "courseContent",
            populate: {
               path: "subSection",
            },
         })
         .exec();

      let courseProgressCount = await CourseProgress.findOne({
         courseID: courseId,
         userId: userId,
      });

      // console.log("courseProgressCount : ", courseProgressCount);

      if (!courseDetails) {
         return res.status(400).json({
            success: false,
            message: `Could not find course with id: ${courseId}`,
         });
      }

      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }

      let totalDurationInSeconds = 0;
      courseDetails.courseContent.forEach((content) => {
         content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration);
            totalDurationInSeconds += timeDurationInSeconds;
         });
      });

      const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

      return res.status(200).json({
         success: true,
         data: {
            courseDetails,
            totalDuration,
            completedVideos: courseProgressCount?.completedVideos
               ? courseProgressCount?.completedVideos
               : [],
         },
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
   try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id;

      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
         instructor: instructorId,
      }).sort({ createdAt: -1 });

      // Return the instructor's courses
      res.status(200).json({
         success: true,
         data: instructorCourses,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: "Failed to retrieve instructor courses",
         error: error.message,
      });
   }
};

// Get Enrolled Students
exports.getEnrolledStudents = async (req, res) => {
   try {
      const { courseId } = req.query;

      const course = await Course.findById(courseId)
         .populate({
            path: "studentsEnrolled",
            populate: {
               path: "courseProgress",
            },
         })
         .populate({
            path: "courseContent",
            populate: {
               path: "subSection",
            },
         });

      if (!course) {
         return res.status(404).json({
            success: false,
            message: `Could not find course with id: ${courseId}`,
         });
      }

      const totalNumberVideos = course.courseContent.reduce(
         (acc, curr) => acc + curr.subSection.length,
         0
      );

      const data = {
         id: course._id,
         courseName: course.courseName,
         courseContent: course.courseContent,
         totalNumberVideos: totalNumberVideos,
         studentsEnrolled: course.studentsEnrolled.map((student) => {
            const completedVideos =
               student.courseProgress.find(
                  (item) => item.courseID.toString() === courseId
               )?.completedVideos || [];

            return {
               id: student._id,
               firstName: student.firstName,
               lastName: student.lastName,
               email: student.email,
               image: student.image,
               compeletedVedios: completedVideos.length,
            };
         }),
      };

      return res.status(200).json({
         success: true,
         data: data,
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         success: false,
         message: "Server error",
         error: error.message,
      });
   }
};

// Delete the Course
exports.deleteCourse = async (req, res) => {
   try {
      const { courseId } = req.body;

      // console.log(req.body);

      // Find the course
      const course = await Course.findById(courseId);
      if (!course) {
         return res.status(404).json({ message: "Course not found" });
      }

      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnrolled;
      for (const studentId of studentsEnrolled) {
         await User.findByIdAndUpdate(studentId, {
            $pull: { courses: courseId },
         });
      }

      // Delete sections and sub-sections
      const courseSections = course.courseContent;
      for (const sectionId of courseSections) {
         // Delete sub-sections of the section
         const section = await Section.findById(sectionId);
         if (section) {
            const subSections = section.subSection;
            for (const subSectionId of subSections) {
               await SubSection.findByIdAndDelete(subSectionId);
            }
         }

         // Delete the section
         await Section.findByIdAndDelete(sectionId);
      }

      // Delete the course
      await Course.findByIdAndDelete(courseId);

      return res.status(200).json({
         success: true,
         message: "Course deleted successfully",
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         success: false,
         message: "Server error",
         error: error.message,
      });
   }
};
