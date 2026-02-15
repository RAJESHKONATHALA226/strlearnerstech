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
  const [currentTime, setCurrentTime] = useState(0);

  const iframeRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://api.strlearners.site/api/comments/lesson/${id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setLesson(res.data.lesson);
        setComments(res.data.comments);
      });
  }, [id]);

  // Listen to YouTube time updates
  useEffect(() => {
    const listener = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.info?.currentTime) {
          setCurrentTime(data.info.currentTime);
        }
      } catch {}
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  const addComment = async () => {
    await axios.post(
      "https://api.strlearners.site/api/comments",
      { lessonId: id, text },
      { headers: { Authorization: token } }
    );
    window.location.reload();
  };

  // Extract embed URL
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

  // Send command to YouTube iframe
  const sendCommand = (func, args = []) => {
    iframeRef.current?.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args,
      }),
      "*"
    );
  };

  // Play / Pause
  const togglePlay = () => {
    if (isPlaying) {
      sendCommand("pauseVideo");
    } else {
      sendCommand("playVideo");
    }
    setIsPlaying(!isPlaying);
  };

  // ⏪ Backward 10 sec
  const rewind = () => {
    sendCommand("seekTo", [currentTime - 10, true]);
  };

  // ⏩ Forward 10 sec
  const forward = () => {
    sendCommand("seekTo", [currentTime + 10, true]);
  };

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-xl font-bold">{lesson.title}</h1>

        {/* VIDEO PLAYER */}
        {embedUrl ? (
          <div className="relative w-full h-[400px] mt-4">

            {/* IFRAME */}
            <iframe
              ref={iframeRef}
              className="w-full h-full pointer-events-none"
              src={embedUrl}
              title={lesson.title}
              allow="autoplay"
            />

            {/* CONTROLS */}
            <div className="absolute inset-0 flex items-center justify-center gap-6 z-20">

              <button
                onClick={rewind}
                className="bg-black/70 text-white px-4 py-2 rounded text-xl"
              >
                ⏪
              </button>

              <button
                onClick={togglePlay}
                className="bg-black/70 text-white px-6 py-3 rounded text-2xl"
              >
                {isPlaying ? "❚❚" : "▶"}
              </button>

              <button
                onClick={forward}
                className="bg-black/70 text-white px-4 py-2 rounded text-xl"
              >
                ⏩
              </button>

            </div>
          </div>
        ) : (
          <p>No valid video URL</p>
        )}

        {/* COMMENTS */}
        <h2 className="mt-6 font-bold">
          Comments ({comments.length})
        </h2>

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
