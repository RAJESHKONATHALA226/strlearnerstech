import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Form() {

    const [email,setEmail]=useState("");
      const [password,setPassword]=useState("");
        const navigate=useNavigate();
  const onFinish=async (e)=>{
    e.preventDefault();
    const data={
   
      email,
      password
    }
  const response=await axios.post("http://api.strlearners.site/api/auth/login",data);
const {token,user}=response.data;
localStorage.setItem("token",token);
localStorage.setItem("user",JSON.stringify(user));

  if(user.role==="admin"){
    navigate("/");
    }else{  
        navigate("/");
    }
 

  }
  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 sm:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">
              StrLearners
            </h1>
            <p className="text-blue-100 text-center mt-2 text-sm sm:text-base">
              Welcome back! Please login to continue
            </p>
          </div>

          {/* Form Section */}
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <form onSubmit={onFinish} className="space-y-6">
              

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 text-gray-900 placeholder-gray-400"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 text-gray-900 placeholder-gray-400"
                  placeholder="••••••••"
                  required
                />
              </div>
                {/* Submit Button */}
                <div>
                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-200">
                  Login
                </button>
                </div>
            </form>
            </div>
        </div>
      </div>
    </div>

  );
}
export default Form;