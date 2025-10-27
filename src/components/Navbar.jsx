// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { name: "Home", nav: "/" },
  { name: "About", nav: "/about" },
  { name: "Prototype", nav: "/prototype" },
  { name: "Report", nav: "/report" }
];

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 shadow-md">
      <div
        className="flex items-center justify-between max-w-7xl mx-auto py-4 px-6"
        style={{ fontFamily: "fantasy" }}
      >
        <h1
          className="text-2xl font-semibold cursor-pointer tracking-wide select-none"
          onClick={() => navigate('/')}
          style={{ textDecoration: "underline" }}
        >
          <span className="text-emerald-700">ECO</span>MITRA<span className="text-emerald-900">.</span>
        </h1>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <li
              key={idx}
              onClick={() => navigate(item.nav)}
              className="relative px-3 py-1 text-emerald-900 cursor-pointer transition-all duration-300 hover:text-emerald-700 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300"
            >
              {item.name}
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate('/login')}
          className="bg-emerald-700 text-white px-5 py-2 rounded-full shadow hover:bg-emerald-800 transition-all duration-300"
        >
          Login
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-center py-3 border-t border-emerald-100 bg-white/80">
        <ul className="flex gap-6">
          {navItems.map((item, idx) => (
            <li
              key={idx}
              onClick={() => navigate(item.nav)}
              className="text-emerald-900 cursor-pointer hover:text-emerald-700 transition-colors duration-200"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
