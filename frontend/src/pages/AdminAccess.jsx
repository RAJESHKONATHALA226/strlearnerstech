import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminAccess() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const token = localStorage.getItem("token");

  const API_USERS = "https://api.strlearners.site/api/user//all-users";
  const API_COURSES = "https://api.strlearners.site/api/courses";
  const API_GRANT = "https://api.strlearners.site/api/admin/grant-access";
  const API_REMOVE = "https://api.strlearners.site/api/admin/remove-access";

  useEffect(() => {
    fetchUsers();
    fetchCourses();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(API_USERS, {
      headers: { Authorization: `${token}` }
    });
    setUsers(res.data);
  };

  const fetchCourses = async () => {
    const res = await axios.get(API_COURSES);
    setCourses(res.data);
  };

  const handleGrant = async () => {
    if (!selectedUser || !selectedCourse) return alert("Select user & course");

    await axios.post(
      API_GRANT,
      { userId: selectedUser, courseId: selectedCourse },
      { headers: { Authorization: `${token}` } }
    );

    alert("Access Granted");
  };

  const handleRemove = async () => {
    if (!selectedUser || !selectedCourse) return alert("Select user & course");

    await axios.post(
      API_REMOVE,
      { userId: selectedUser, courseId: selectedCourse },
      { headers: { Authorization: ` ${token}` } }
    );

    alert("Access Removed");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

      <h2 className="text-2xl font-bold text-indigo-700 mb-6">
        Grant / Remove Course Access
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Select User */}
        <div>
          <label className="block mb-2 font-semibold">Select User</label>
          <select
            className="w-full p-3 border rounded-lg"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">-- Choose User --</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.username} ({u.email})
              </option>
            ))}
          </select>
        </div>

        {/* Select Course */}
        <div>
          <label className="block mb-2 font-semibold">Select Course</label>
          <select
            className="w-full p-3 border rounded-lg"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Choose Course --</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
       
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">

        <button
          onClick={handleGrant}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Grant Access
        </button>

        <button
          onClick={handleRemove}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Remove Access
        </button>

      </div>

    </div>
  );
}
