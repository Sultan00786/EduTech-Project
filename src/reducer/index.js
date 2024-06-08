import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
<<<<<<< HEAD
import courseReducer from "../slices/courseSlice";
import viewCourseReducer from "../slices/viewCourseSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
  course: courseReducer,
  viewCourse: viewCourseReducer,
});

export default rootReducer;
=======

const rootReducer = combineReducers ({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
});

export default rootReducer;

>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
