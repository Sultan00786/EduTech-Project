const BASE_URL = process.env.REACT_APP_BASE_URL;
<<<<<<< HEAD
=======
console.log(process.env.REACT_APP_BASE_URL, "BASE URL");
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7

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
<<<<<<< HEAD
};
=======
}
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
<<<<<<< HEAD
};
=======
}
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
<<<<<<< HEAD
};
=======
}
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
<<<<<<< HEAD
};
=======
}
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
<<<<<<< HEAD
};
=======
}
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
<<<<<<< HEAD
};
=======
}
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7

// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
<<<<<<< HEAD
};
=======
}
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
