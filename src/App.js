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

function App() {
  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <OpenRoute> 
              <Login />
            </OpenRoute> 
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute> 
              <Signup />
            </OpenRoute> 
          }
        />

        <Route
          path="/forgotpassword"
          element={
            <OpenRoute> 
              <ForgotPassword />
            </OpenRoute> 
          }
        />

        <Route
          path="/update-password/:id"
          element={
            <OpenRoute> 
              <UpdatePassword />
            </OpenRoute> 
          }
        />

        <Route
          path="/verify-email"
          element={
            <OpenRoute> 
              <VerifyEmail />
            </OpenRoute> 
          }
        />

        <Route path="/about" element={<About />} />
        {/* <Route path="/contact" element={<Contact/>} /> */}

        <Route
          element={
            <PrivateRout> 
              <Dashborad />
            </PrivateRout> 
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
        </Route>

        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
