// Import the required modules
const express = require("express");
const router = express.Router();

// Import the Controllers

// Course Controllers Import
const {
   createCourse,
   getAllCourses,
   getCourseDetails,
   editCourse,
   getFullCourseDetails,
   getInstructorCourses,
   deleteCourse,
   getEnrolledStudents,
} = require("../controllers/Course");

// Categories Controllers Import
const {
   showAllCategories,
   createCategory,
   categoryPageDetails,
} = require("../controllers/Categeory");

// Sections Controllers Import
const {
   createSection,
   updateSection,
   deleteSection,
} = require("../controllers/Section");

// Sub-Sections Controllers Import
const {
   createSubSection,
   updateSubSection,
   deleteSubSection,
} = require("../controllers/SubScetion");

// Rating Controllers Import
const {
   createRating,
   getAverageRating,
   getAllRating,
} = require("../controllers/RatingAndReview");

// Course Progress Import
const {
   updateCourseProgress,
   createTotalCorseDuration,
} = require("../controllers/CourseProgress");

// Importing Middlewares
const {
   auth,
   isInstructor,
   isStudent,
   isAdmin,
} = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);
// Course only edit and creat my instructor
router.post("/editCourse", editCourse);
// Get Instructors All Courses
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
// Delete spesific course
router.post("/deleteCourse", auth, isInstructor, deleteCourse);
// Get Full details of couse
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
// Get Enrolled Students
router.get("/getEnrolledStudents", auth, isInstructor, getEnrolledStudents);
// Post Course Progress
router.post("/updateCourseProgress", auth, updateCourseProgress);
// Post total time duration of course
router.post("/createTotalCorseDuration", createTotalCorseDuration);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;
