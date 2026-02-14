import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminCourse() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: ""
  });

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");
  const API = "https://api.strlearners.site/api/courses";

  const fetchCourses = async () => {
    const res = await axios.get(API);
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`${API}/${editingId}`, form, {
        headers: { Authorization: `${token}` }
      });
      setEditingId(null);
    } else {
      await axios.post(API, form, {
        headers: { Authorization: `${token}` }
      });
    }

    setForm({ title: "", description: "", image: "" });
    fetchCourses();
  };

  const handleEdit = (course) => {
    setForm(course);
    setEditingId(course._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`, {
      headers: { Authorization: `${token}` }
    });
    fetchCourses();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Courses</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-4 mb-8 bg-white p-6 rounded-2xl shadow">

        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Course Description"
          value={form.description}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          {editingId ? "Update Course" : "Add Course"}
        </button>
      </form>

      {/* Course Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white rounded-xl shadow overflow-hidden">

            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-bold text-indigo-700">
                {course.title}
              </h3>

              <p className="text-gray-600 mt-2 text-sm">
                {course.description}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(course)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
