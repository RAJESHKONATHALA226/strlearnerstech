import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-indigo-700 text-white flex flex-col p-5">

        <h2 className="text-2xl font-bold mb-8 text-center">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4">
          <Link to="/admin" className="hover:bg-indigo-600 p-2 rounded-lg">
            Dashboard
          </Link>

          <Link to="/admin/courses" className="hover:bg-indigo-600 p-2 rounded-lg">
            Manage Courses
          </Link>
          <Link to="/admin/add-lesson" className="hover:bg-indigo-600 p-2 rounded-lg">
  Manage Lessons
</Link>


          <Link to="/" className="hover:bg-indigo-600 p-2 rounded-lg">
            Home
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Welcome, {user?.username}
          </h1>
          <span className="text-gray-500">Admin Dashboard</span>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />  
        </div>

      </div>
    </div>
  );
}
