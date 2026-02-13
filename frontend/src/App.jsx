import React from "react";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Lessons from "./pages/Lesson";
import CourseDetails from "./pages/CourseDetails";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Course from "./pages/Course";

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