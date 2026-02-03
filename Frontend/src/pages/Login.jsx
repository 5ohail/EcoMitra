import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { context } from "../../Context/ContextProvider";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setIsLoggedIn, setUser} = useContext(context); // Access context values

  // Helper: generate name from email
  const generateName = (email) => {
    return email.split("@")[0].charAt(0).toUpperCase() +
           email.split("@")[0].slice(1);
  };

  // Manual Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = res.user.email;
      const name = generateName(userEmail);

      console.log("Email:", userEmail);
      console.log("Name:", name);
      setUser(name);
      setIsLoggedIn(true);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userName", name);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const userEmail = res.user.email;
      const name =
        res.user.displayName || generateName(userEmail);

      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userName", name);
      setUser(name);
      setIsLoggedIn(true);

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-[90.5vh] grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex">
        <img
          src="https://images.pexels.com/photos/7111133/pexels-photo-7111133.jpeg"
          className="w-full h-[91vh] object-cover"
        />
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <h2 className="text-4xl font-bold mb-3">Welcome Back 🌿</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full py-3 bg-emerald-700 text-white rounded-xl">
              Sign In
            </button>
          </form>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full mt-4 py-3 border rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
            Sign in with Google
          </button>

          <p className="text-sm mt-6">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")} className="text-emerald-700 cursor-pointer">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
