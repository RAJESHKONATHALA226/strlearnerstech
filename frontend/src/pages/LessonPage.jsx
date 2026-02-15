import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LessonPage() {
  const { id } = useParams();

  const [lesson, setLesson] = useState({});
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const iframeRef = useRef(null);
  const hideTimer = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLesson();
  }, [id]);

  const fetchLesson = async () => {
    const res = await axios.get(
      `https://api.strlearners.site/api/comments/lesson/${id}`,
      { headers: { Authorization: token } }
    );
    setLesson(res.data.lesson);
    setComments(res.data.comments);
  };

  const addComment = async () => {
    if (!text.trim()) return;

    await axios.post(
      "https://api.strlearners.site/api/comments",
      { lessonId: id, text },
      { headers: { Authorization: token } }
    );

    setText("");
    fetchLesson(); // refresh comments without reload
  };

  // Extract YouTube embed URL
  const getEmbedUrl = (url) => {
    if (!url) return null;

    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;

    const match = url.match(regExp);

    return match
      ? `https://www.youtube.com/embed/${match[1]}?enablejsapi=1&controls=0&rel=0&modestbranding=1`
      : null;
  };

  const embedUrl = getEmbedUrl(lesson.videoUrl);

  // Send play/pause commands to iframe
  const sendCommand = (command) => {
    iframeRef.current?.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: [],
      }),
      "*"
    );
  };

  const togglePlay = () => {
    if (isPlaying) {
      sendCommand("pauseVideo");
    } else {
      sendCommand("playVideo");
    }
    setIsPlaying(!isPlaying);
  };

  // Show controls on touch/click
  const handleVideoClick = () => {
    setShowControls(true);

    if (hideTimer.current) clearTimeout(hideTimer.current);

    hideTimer.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-xl font-bold">{lesson.title}</h1>

        {/* VIDEO PLAYER */}
        {embedUrl ? (
          <div
            className="relative w-full h-[400px] mt-4 cursor-pointer"
            onClick={handleVideoClick}
          >
            <iframe
              ref={iframeRef}
              className="w-full h-full pointer-events-none"
              src={embedUrl}
              title={lesson.title}
              allow="autoplay"
            />

            {/* Show controls only when user clicks */}
            {showControls && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-20 h-20 bg-black/70 text-white rounded-full text-3xl z-20 flex items-center justify-center transition"
              >
                {isPlaying ? "❚❚" : "▶"}
              </button>
            )}
          </div>
        ) : (
          <p>No valid video URL</p>
        )}

        {/* COMMENTS */}
        <h2 className="mt-6 font-bold">Comments ({comments.length})</h2>

        <textarea
          className="border w-full p-2 mt-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={addComment}
          className="bg-blue-500 text-white px-4 py-2 mt-2"
        >
          Post Comment
        </button>

        {comments.map((c) => (
          <div key={c._id} className="border p-3 mt-3 bg-gray-100">
            <p className="font-bold text-blue-600">{c.userId?.name}</p>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
