import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-purple-600 font-semibold"
      : "hover:text-purple-500 transition";

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <div>
          <NavLink to="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-purple-600">
            StrLearners
          </h1>
          </NavLink>
          <p className="text-xs text-gray-500">
            powered by KonathalaRajesh
          </p>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 items-center">
          <li>
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/courses" className={linkClass}>
              Courses
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile" className={linkClass}>
              Profile
            </NavLink>
          </li>

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Logout
            </button>
          ) : (
            <li>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
            </li>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-purple-600"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden mt-4 space-y-4 text-gray-700 border-t pt-4">
          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)} className={linkClass}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/courses" onClick={() => setMenuOpen(false)} className={linkClass}>
              Courses
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile" onClick={() => setMenuOpen(false)} className={linkClass}>
              Profile
            </NavLink>
          </li>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-left bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <li>
              <NavLink to="/login" onClick={() => setMenuOpen(false)} className={linkClass}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}

