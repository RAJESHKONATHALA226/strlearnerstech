// Lessons.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Lessons() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`https://api.strlearners.site/api/lessons/${courseId}`, {
      headers: {
    Authorization: token
  },
    })
    .then(res => setLessons(res.data));
  }, [courseId]);

  // Convert YouTube watch URL to embed URL
  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div>
           <Navbar />
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
     
        Course Lessons
      </h1>

      <div className="space-y-8">
        {lessons.map(lesson => (
          <div
            key={lesson._id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-2">
              {lesson.title}
            </h2>

            

            {/* YouTube Video */}
            <div className="aspect-video">
              <iframe
                src={getEmbedUrl(lesson.videoUrl)}
                title={lesson.title}
                className="w-full h-full rounded-xl"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
