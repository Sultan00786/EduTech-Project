import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Error from "./pages/Error";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Dashborad from "./pages/Dashborad";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRout from "./components/core/Auth/PrivateRout";
import MyProfile from "./components/core/Dashboad/MyProfile";
<<<<<<< HEAD
import Setting from "./components/core/Dashboad/Setting";
import EnrolledCourses from "./components/core/Dashboad/EnrolledCourses";
import Cart from "./components/core/Dashboad/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboad/AddCourse";
import ContactUs from "./pages/ContactUs";
import Mycourse from "./components/core/Dashboad/Mycourse";
import EditCourse from "./components/core/Dashboad/MyCourses/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";

function App() {
  const { user } = useSelector((state) => state.profile);
=======

function App() {
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
=======
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7

        <Route
          path="/login"
          element={
<<<<<<< HEAD
            <OpenRoute>
              <Login />
            </OpenRoute>
=======
            <OpenRoute> 
              <Login />
            </OpenRoute> 
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
          }
        />

        <Route
          path="/signup"
          element={
<<<<<<< HEAD
            <OpenRoute>
              <Signup />
            </OpenRoute>
=======
            <OpenRoute> 
              <Signup />
            </OpenRoute> 
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
          }
        />

        <Route
          path="/forgotpassword"
          element={
<<<<<<< HEAD
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
=======
            <OpenRoute> 
              <ForgotPassword />
            </OpenRoute> 
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
          }
        />

        <Route
          path="/update-password/:id"
          element={
<<<<<<< HEAD
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
=======
            <OpenRoute> 
              <UpdatePassword />
            </OpenRoute> 
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
          }
        />

        <Route
          path="/verify-email"
          element={
<<<<<<< HEAD
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
=======
            <OpenRoute> 
              <VerifyEmail />
            </OpenRoute> 
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
          }
        />

        <Route path="/about" element={<About />} />
<<<<<<< HEAD
        <Route path="/contact" element={<ContactUs />} />

        <Route
          element={
            <PrivateRout>
              <Dashborad />
            </PrivateRout>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Setting />} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="dashboard/cart" element={<Cart />} />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<Mycourse />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
=======
        {/* <Route path="/contact" element={<Contact/>} /> */}

        <Route
          element={
            <PrivateRout> 
              <Dashborad />
            </PrivateRout> 
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
        </Route>

        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
