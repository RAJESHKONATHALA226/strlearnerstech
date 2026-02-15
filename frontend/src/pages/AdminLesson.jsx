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

    await axios.post("https://api.strlearners.site/api/lessons", {
      courseId,
      title: lessonTitle,
      youtubeUrl
    });

    alert("Lesson Added Successfully");

    setLessonTitle("");
    setYoutubeUrl("");
  };

  return (
    <div className="border p-6 rounded shadow bg-white">

      <h2 className="text-xl font-bold mb-4">Add Lesson</h2>

      <select
        className="border p-2 w-full mb-3"
        onChange={e => setCourseId(e.target.value)}
      >
        <option>Select Course</option>

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
