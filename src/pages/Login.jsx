// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="min-h-[90.5vh] grid grid-cols-1 lg:grid-cols-2">

      {/* Left Illustration / Branding Section */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-emerald-600 to-emerald-800 text-white overflow-hidden">
        
            <img
              src="https://images.pexels.com/photos/7111133/pexels-photo-7111133.jpeg" 
              className="w-full drop-shadow-2xl h-[91vh] object-cover object-center"
              alt="eco illustration"
            />
      </div>

      {/* Right Side Login Section */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-lg">
          
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Welcome Back 🌿
          </h2>
          <p className="text-gray-600 mb-10">
            Sign in to continue your eco journey.
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-7">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                           transition"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                           transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white 
                         rounded-xl font-semibold shadow-md hover:shadow-lg 
                         transition-all duration-300 active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <span
              className="text-emerald-700 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
