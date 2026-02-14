import React from "react";

export default function AdminHome() {
  return (
    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
        <h2 className="text-lg font-semibold text-gray-600">
          Total Courses
        </h2>
        <p className="text-3xl font-bold text-indigo-600 mt-3">
          10
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
        <h2 className="text-lg font-semibold text-gray-600">
          Total Users
        </h2>
        <p className="text-3xl font-bold text-green-600 mt-3">
          120
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
        <h2 className="text-lg font-semibold text-gray-600">
          Revenue
        </h2>
        <p className="text-3xl font-bold text-yellow-500 mt-3">
          ₹ 25,000
        </p>
      </div>

    </div>
  );
}
