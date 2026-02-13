import React from "react";
import Login from "./Pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Lessons from "./Pages/Lesson";
import CourseDetails from "./Pages/CourseDetails";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import Course from "./Pages/Course";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/courses" element={
        <ProtectedRoute>
      <Course />
        </ProtectedRoute>
      
      } />

     <Route path="/course/:id" element={
        <ProtectedRoute>
      <CourseDetails
       />
        </ProtectedRoute>}
       />
     <Route
          path="/lessons/:courseId"
          element={
            <ProtectedRoute>
              <Lessons />
            </ProtectedRoute>
          }
        />
      <Route path="/profile" element={
        <ProtectedRoute>
      <Profile />
        </ProtectedRoute>

      } />
  </Routes>
  );
}

export default App;