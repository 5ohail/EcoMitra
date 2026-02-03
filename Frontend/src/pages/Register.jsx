import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { ref, set } from "firebase/database";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirm)
      return alert("Fill all fields");

    if (form.password !== form.confirm)
      return alert("Passwords mismatch");

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await updateProfile(res.user, {
        displayName: form.name,
      });

      await set(ref(db, "users/" + res.user.uid), {
        name: form.name,
        email: form.email,
        provider: "password",
        createdAt: Date.now(),
      });

      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;

      await set(ref(db, "users/" + user.uid), {
        name: user.displayName,
        email: user.email,
        provider: "google",
        createdAt: Date.now(),
      });

      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-5">
        <h2 className="text-3xl font-bold">Signup 🌱</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded"
            value={form.password}
            onChange={handleChange}
          />

          <input
            name="confirm"
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded"
            value={form.confirm}
            onChange={handleChange}
          />

          <button className="w-full bg-emerald-700 text-white py-3 rounded">
            Create Account
          </button>
        </form>

        <button
          onClick={handleGoogleSignup}
          className="w-full border py-3 rounded flex justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5"
          />
          Signup with Google
        </button>

        <p className="text-sm">
          Already have account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-emerald-700 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
