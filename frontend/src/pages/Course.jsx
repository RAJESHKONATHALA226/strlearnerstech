// Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Course() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://api.strlearners.site/api/courses")
      .then(res => setCourses(res.data));
  }, []);

  return (
    <div>
      <Navbar />
    <div className="min-h- bg-screengray-100 p-8">
     

      <h1 className="text-3xl font-bold mb-8 text-center">
        Explore Courses
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {courses.map(course => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            {/* Course Image */}
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />

            {/* Course Content */}
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">
                {course.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>

              <Link
                to={`/course/${course._id}`}
                className="block text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                course Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

