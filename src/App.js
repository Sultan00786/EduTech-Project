import "./App.css";
import React from "react";
import {  Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Navbar from "./components/common/Navbar";


function App() {
  return (
    
      <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} ></Route>
          <Route path="/login" element={<Login/>} ></Route>
          <Route path="/signup" element={<Signup/>} ></Route>
          <Route path="*"  > Not Found </Route>
        </Routes>
      </div>

  );
}

export default App;
