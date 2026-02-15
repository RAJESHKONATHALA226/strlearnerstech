import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Lessons() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    if (!courseId) return;

    const fetchLessons = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.strlearners.site/api/lessons/${courseId}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setLessons(res.data);
      } catch (err) {
        setError("Failed to load lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
      

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-500 animate-pulse">
            Loading lessons...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && lessons.length === 0 && !error && (
          <div className="text-center text-gray-500">
            No lessons available for this course.
          </div>
        )}

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lessons.map((l) => (
            <div
              key={l._id}
              onClick={() => nav(`/lessons/${l._id}`)}
              className="
                bg-white
                p-5
                rounded-2xl
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                cursor-pointer
                border
              "
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {l.title}
              </h3>

             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
