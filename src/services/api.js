const BASE_URL = process.env.REACT_APP_BASE_URL;

// USER ENDPOINT API
export const user = {
   SENDOTP_API: BASE_URL + "/auth/sendotp",
   SIGNUP_API: BASE_URL + "/auth/signup",
   LOGIN_API: BASE_URL + "/auth/login",
   RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
   RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// SETTING PAGE API
export const profileEndPoint = {
   CHANGE_PROFILE_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
   UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
   DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
   CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
   GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
   GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
   GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
};

// STUDENTS ENDPOINTS
export const studentEndpoints = {
   COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
   COURSE_VERIFY_API: BASE_URL + "/payment/verifySignature",
   SEND_PAYMENT_SUCCESS_EMAIL_API:
      BASE_URL + "/payment/sendPaymentSuccessEmail",
   BUY_COURSE_FREE_API: BASE_URL + "/payment/buyCourseFree",
};

// COURSE ENDPOINTS
export const courseEndpoints = {
   GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
   COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
   eEDIT_COURSE_API: BASE_URL + "/course/editCourse",
   COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
   CREATE_COURSE_API: BASE_URL + "/course/createCourse",
   CREATE_SECTION_API: BASE_URL + "/course/addSection",
   CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
   UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
   UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
   GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
   GET_ENROLLED_STUDENTS_API: BASE_URL + "/course/getEnrolledStudents",
   DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
   DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
   DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
   GET_FULL_COURSE_DETAILS_AUTHENTICATED:
      BASE_URL + "/course/getFullCourseDetails",
   LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
   CREATE_RATING_API: BASE_URL + "/course/createRating",
   CREAT_COURSE_DURATION: BASE_URL + "/course/createTotalCorseDuration",
};

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
   REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
};

// CATAGORIES API
export const categories = {
   CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

// CATALOG PAGE DATA
export const catalogData = {
   CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
};

// CONTACT-US API
export const contactusEndpoint = {
   CONTACT_US_API: BASE_URL + "/reach/contact",
};
