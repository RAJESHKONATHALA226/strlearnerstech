import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function LessonPage() {

  const { id } = useParams();

  const [lesson, setLesson] = useState({});
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`https://api.strlearners.site/api/comments/lesson/${id}`, {
      headers: { Authorization: token }
    })
      .then(res => {
        setLesson(res.data.lesson);
        setComments(res.data.comments);
      });
  }, []);

  const addComment = async () => {
    await axios.post(
      "https://api.strlearners.site/api/comments",
      { lessonId: id, text },
      { headers: { Authorization: token } }
    );
    window.location.reload();
  };

const getEmbedUrl = (url) => {
  if (!url) return null;

  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;

  const match = url.match(regExp);

  return match
    ? `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`
    : null;
};


  const embedUrl = getEmbedUrl(lesson.videoUrl);

  return (
    <div>
      <Navbar />
    <div className="p-6">

      <h1 className="text-xl font-bold">{lesson.title}</h1>


      {embedUrl ? (
        <div className="relative w-full h-[400px] mt-4">

          {/* YOUTUBE VIDEO */}
          <iframe
            className="w-full h-full"
            src={embedUrl}
            title={lesson.title || "Lesson video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* TOP CLICK BLOCKER (VERY IMPORTANT) */}
          <div className="absolute top-0 left-0 w-full h-[100px] z-10 cursor-pointer"></div>

        </div>
      ) : (
        <p>No valid video URL</p>
      )}

      <h2 className="mt-6 font-bold">
        Comments ({comments.length})
      </h2>

      <textarea
        className="border w-full p-2 mt-2"
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button
        onClick={addComment}
        className="bg-blue-500 text-white px-4 py-2 mt-2"
      >
        Post Comment
      </button>

      {comments.map(c => (
        <div key={c._id} className="border p-3 mt-3 bg-gray-100">
          <p className="font-bold text-blue-600">
            {c.userId?.name}
          </p>
          <p>{c.text}</p>
        </div>
      ))}

    </div>
    </div>
  );
}
