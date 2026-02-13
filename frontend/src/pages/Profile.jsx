import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/Navbar";


export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
;

axios.get("http://api.strlearners.site/api/user/profile", {
  headers: {
    Authorization: token
  },



    })
    .then(res => setUser(res.data))
    .catch(err => console.log(err));
    }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
        );
  }

  return (
   <div>

   <NavBar />
 <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center">

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={user.image || "https://i.pravatar.cc/150"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow-lg"
          />
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-gray-800">
          {user.name}
        </h2>

        {/* Email */}
        <p className="text-gray-500 mt-2">
          {user.email}
        </p>

        {/* Description */}
        <p className="text-gray-600 mt-4 text-sm leading-relaxed">
          {user.description || "Passionate learner exploring new technologies."}
        </p>

      </div>
    </div>
    </div>
   
  );
}
