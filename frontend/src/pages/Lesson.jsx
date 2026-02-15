import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Lessons() {

  const { id } = useParams();
  const [lessons, setLessons] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/lessons/${id}`)
      .then(res => setLessons(res.data));
  }, []);

  return (
      <div>
        <Navbar />
    <div className="p-6">
      {lessons.map(l => (
        <div
          key={l._id}
          onClick={() => nav(`/lesson/${l._id}`)}
          className="border p-4 mb-2 cursor-pointer"
        >
          {l.title}
        </div>
      ))}
    </div>
    </div>
  );
}
