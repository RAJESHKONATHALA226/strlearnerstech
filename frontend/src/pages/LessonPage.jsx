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
  const [currentTime, setCurrentTime] = useState(0);

  const iframeRef = useRef(null);
  const hideTimer = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLesson();
  }, [id]);

  /* ===============================
     LISTEN TO YOUTUBE PLAYER DATA
  =============================== */
  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // ✅ FIX: allow 0 time also
        if (data.info && data.info.currentTime !== undefined) {
          setCurrentTime(data.info.currentTime);
        }
      } catch {}
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  /* ===============================
     ASK TIME EVERY SECOND
  =============================== */
  useEffect(() => {
    const interval = setInterval(() => {
      sendCommand("getCurrentTime");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
    fetchLesson();
  };

  /* ===============================
     YOUTUBE EMBED URL
  =============================== */
  const getEmbedUrl = (url) => {
    if (!url) return null;

    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;

    const match = url.match(regExp);

    return match
      ? `https://www.youtube.com/embed/${match[1]}?enablejsapi=1&origin=${window.location.origin}&controls=0&rel=0&modestbranding=1`
      : null;
  };

  const embedUrl = getEmbedUrl(lesson.videoUrl);

  /* ===============================
     SEND COMMAND TO PLAYER
  =============================== */
  const sendCommand = (command, value = null) => {
    iframeRef.current?.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: value !== null ? [value, true] : [],
      }),
      "*"
    );
  };

  /* ===============================
     CONTROLS
  =============================== */
  const togglePlay = () => {
    if (isPlaying) sendCommand("pauseVideo");
    else sendCommand("playVideo");

    setIsPlaying(!isPlaying);
  };

  const forward = () => {
    sendCommand("seekTo", currentTime + 10);
  };

  const backward = () => {
    sendCommand("seekTo", Math.max(currentTime - 10, 0));
  };

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

            {showControls && (
              <div className="absolute inset-0 flex items-center justify-center gap-6 z-20">
                <button
                  onClick={backward}
                  className="w-16 h-16 bg-black/70 text-white rounded-full text-xl"
                >
                  ⏪
                </button>

                <button
                  onClick={togglePlay}
                  className="w-20 h-20 bg-black/70 text-white rounded-full text-3xl"
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>

                <button
                  onClick={forward}
                  className="w-16 h-16 bg-black/70 text-white rounded-full text-xl"
                >
                  ⏩
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>No valid video URL</p>
        )}

        {/* COMMENTS */}
     <h2 className="mt-8 text-xl font-semibold text-gray-800">
  Comments ({comments.length})
</h2>

<textarea
  className="
    w-full 
    mt-3 
    p-3 
    border border-gray-300 
    rounded-lg 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-500 
    focus:border-blue-500 
    transition
  "
  value={text}
  onChange={(e) => setText(e.target.value)}
/>

<button
  onClick={addComment}
  className="
    mt-3 
    bg-blue-600 
    hover:bg-blue-700 
    text-white 
    px-5 
    py-2 
    rounded-lg 
    shadow-sm 
    transition 
    duration-300
  "
>
  Post Comment
</button>

{comments.map((c) => (
  <div
    key={c._id}
    className="
      mt-4 
      p-4 
      bg-white 
      border border-gray-200 
      rounded-xl 
      shadow-sm 
      hover:shadow-md 
      transition
    "
  >
    
    <p className="font-semibold text-blue-600">
      {c.userId?.name}
    </p>
    <h3 className="text-gray-700 mt-1">
      {c.text}
    </h3>
  </div>
))}

      </div>
    </div>
  );
}
