// CourseDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/courses")
      .then(res => {
        const selected = res.data.find(c => c._id === id);
        setCourse(selected);
      });
  }, [id]);

  const handleEnroll = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://api.strlearners.site/api/enroll",
      { courseId: id },
      {
    headers: {
    Authorization: token
  },
      }
    );

    navigate(`/lessons/${id}`);
  };

  return (
    <div>
         <NavBar />
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
       
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-56 object-cover"
        />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-3">
            {course.title}
          </h2>

          <p className="text-gray-600 mb-6">
            {course.description}
          </p>

          <button
            onClick={handleEnroll}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
    </div>


  );
}
