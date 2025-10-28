import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", nav: "/" },
  { name: "About", nav: "/about" },
  { name: "Prototype", nav: "/prototype" },
  { name: "Report", nav: "/report" },
];

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
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
              className="relative px-3 py-1 text-emerald-900 cursor-pointer transition-all duration-300 hover:text-emerald-700 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300"
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
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        style={{ fontFamily: "fantasy" }}
        className={`overflow-hidden bg-white transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-[100vh] py-10" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {navItems.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleNavigate(item.nav)}
              className="text-xl text-emerald-900 cursor-pointer hover:text-emerald-700 transition-colors duration-200"
            >
              {item.name}
            </li>
          ))}
        </ul>

        <button
          onClick={() => handleNavigate("/login")}
          className="mt-6 bg-emerald-700 translate-x-[123%] text-white px-8 py-3 rounded-full shadow hover:bg-emerald-800 transition-all duration-300 text-xl"
        >
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
