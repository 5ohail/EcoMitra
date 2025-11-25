// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirm) {
      alert("Please fill all fields");
      return;
    }
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* Left Branding Section */}
     <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-emerald-600 to-emerald-800 text-white overflow-hidden">
        
            <img
              src="https://images.pexels.com/photos/7111133/pexels-photo-7111133.jpeg" 
              className="w-full drop-shadow-2xl h-[100vh] object-cover object-center"
              alt="eco illustration"
            />
      </div>
      {/* Right Signup Section */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-lg">

          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">
            Create Account 🌱
          </h2>
          <p className="text-gray-600 mb-10">
            Start your eco-friendly journey with EcoMitra.
          </p>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-7">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                name="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                placeholder="••••••••"
                value={form.confirm}
                onChange={handleChange}
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white 
                         rounded-xl font-semibold shadow-md hover:shadow-lg 
                         transition-all duration-300 active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <span
              className="text-emerald-700 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
