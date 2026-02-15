import axios from "axios";
import { useEffect, useState } from "react";

export default function AddLesson() {

  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");



  useEffect(() => {
    axios.get("https://api.strlearners.site/api/courses")
      .then(res => setCourses(res.data));
  }, []);

  const addLesson = async () => {
    if (!courseId) {
      alert("Please select a course");
      return;
    }
    if (!lessonTitle.trim()) {
      alert("Please enter a lesson title");
      return;
    }

    try {
      await axios.post("https://api.strlearners.site/api/lessons", {
        course: courseId,
        title: lessonTitle,
        videoUrl: youtubeUrl.trim() ? youtubeUrl : undefined
      },{
          headers: { Authorization: localStorage.getItem("token") }
      });

      alert("Lesson Added Successfully");

      setLessonTitle("");
      setYoutubeUrl("");
      setCourseId("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add lesson");
    }
  };

  return (
    <div className="border p-6 rounded shadow bg-white">

      <h2 className="text-xl font-bold mb-4">Add Lesson</h2>

      <select
        className="border p-2 w-full mb-3"
        value={courseId}
        onChange={e => setCourseId(e.target.value)}
      >
        <option value="">Select Course</option>

        {courses.map(c => (
          <option key={c._id} value={c._id}>
            {c.title}
          </option>
        ))}
      </select>

      <input
        value={lessonTitle}
        placeholder="Lesson Title"
        className="border p-2 block mb-3 w-full"
        onChange={e => setLessonTitle(e.target.value)}
      />

      <input
        value={youtubeUrl}
        placeholder="YouTube Link"
        className="border p-2 block mb-3 w-full"
        onChange={e => setYoutubeUrl(e.target.value)}
      />

      <button
        onClick={addLesson}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Add Lesson
      </button>

    </div>
  );
}
