import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", nav: "/" },
  { name: "About", nav: "/about" },
  { name: "Prototype", nav: "/prototype" },
  { name: "Report", nav: "/report" },
];

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent body scroll on sidebar open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* TOP NAV */}
      <nav className="w-full z-50 backdrop-blur-md bg-white/70 shadow-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 px-6" style={{ fontFamily: "fantasy" }}>
          {/* Logo */}
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-semibold cursor-pointer tracking-wide select-none underline"
          >
            <span className="text-emerald-700">ECO</span>MITRA<span className="text-emerald-900">.</span>
          </h1>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <li
                key={idx}
                onClick={() => navigate(item.nav)}
                className="relative px-3 py-1 text-emerald-900 cursor-pointer transition-all duration-300 hover:text-emerald-700 
                after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-emerald-600 
                hover:after:w-full after:transition-all after:duration-300"
              >
                {item.name}
              </li>
            ))}
          </ul>

          {/* Desktop Login */}
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block bg-emerald-700 text-white px-5 py-2 rounded-full shadow hover:bg-emerald-800 transition-all duration-300"
          >
            Login
          </button>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-emerald-900 z-[60]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {/* MOBILE SIDE DRAWER */}
      <div
        className={`fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* LEFT SIDEBAR PANEL */}
      <div
        style={{ fontFamily: "fantasy" }}
        className={`fixed top-0 left-0 h-full w-[75%] max-w-xs bg-white shadow-2xl z-[80] p-8 text-emerald-900 
        transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-emerald-900"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <CloseIcon />
        </button>

        {/* Logo */}
        <h1
          onClick={() => handleNavigate("/")}
          className="text-2xl font-semibold underline mb-10 cursor-pointer tracking-wide"
        >
          <span className="text-emerald-700">ECO</span>MITRA<span className="text-emerald-900">.</span>
        </h1>

        {/* Nav Links */}
        <ul className="flex flex-col gap-8 mt-10">
          {navItems.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleNavigate(item.nav)}
              className="text-xl cursor-pointer hover:text-emerald-700 transition"
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* Login Button */}
        <button
          onClick={() => handleNavigate("/login")}
          className="mt-12 w-full bg-emerald-700 text-white py-3 rounded-full shadow hover:bg-emerald-800 transition"
        >
          Login
        </button>
      </div>
    </>
  );
}

export default Navbar;
