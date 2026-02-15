import React from "react";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Lessons from "./pages/Lesson";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import AdminRoute from "./Routess/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Admin from "./pages/Admin";
import AdminCourse from "./pages/AdminCourse";
import Course from "./pages/Course";
import LessonPage from "./pages/LessonPage";
import { Routes, Route } from "react-router-dom";
import AddLesson from "./pages/AdminLesson";

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

     
     <Route
          path="/lesson/:courseId"
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
      <Route
          path="/lessons/:id"
          element={
            <ProtectedRoute>
              <LessonPage />
            </ProtectedRoute>
          }
        />  
      <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
         <Route index element={<Admin />} />
         
          <Route path="courses" element={<AdminCourse />} />
           <Route path="add-lesson" element={<AddLesson />} />
        </Route>
  </Routes>
  );
}

export default App;