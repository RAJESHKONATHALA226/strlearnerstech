import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Lessons() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    if (!courseId) return;

    axios
      .get(`https://api.strlearners.site/api/lessons/${courseId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => setLessons(res.data))
      .catch((err) => console.error(err));
  }, [courseId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Course Lessons
        </h2>

        {lessons.map((l) => (
          <div
            key={l._id}
            onClick={() => nav(`/lessons/${l._id}`)}
            className="
              bg-white
              border border-gray-200
              p-4
              mb-4
              rounded-xl
              shadow-sm
              hover:shadow-md
              hover:bg-blue-50
              transition
              duration-300
              cursor-pointer
            "
          >
            <h3 className="text-lg font-medium text-gray-700">
              {l.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
