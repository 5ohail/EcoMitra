import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { context } from "../../Context/ContextProvider";

const navItems = [
  { name: "Home", nav: "/" },
  { name: "About", nav: "/about" },
  { name: "Prototype", nav: "/prototype" },
  { name: "Dashboard", nav: "/dashboard" },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn, user } = useContext(context);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [shrink, setShrink] = useState(false);

  /* Header shrink on scroll */
  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll on mobile menu */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* HEADER */}
      <motion.header
        animate={{ height: shrink ? 52 : 64 }}
        transition={{ duration: 0.2 }}
        className="sticky top-0 z-50 bg-white border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* Brand */}
          <div
            onClick={() => navigate("/")}
            className="font-semibold text-gray-900 cursor-pointer tracking-tight"
            style={{ fontSize: shrink ? "15px" : "17px" }}
          >
            ECOMITRA
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            {navItems.map((item) => {
              const active = location.pathname === item.nav;
              return (
                <span
                  key={item.name}
                  onClick={() => navigate(item.nav)}
                  className={`cursor-pointer transition-colors ${
                    active
                      ? "text-emerald-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </span>
              );
            })}
          </nav>

          {/* Desktop User */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md">
                  <div className="w-7 h-7 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs font-semibold uppercase">
                    {user?.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-800 max-w-[140px] truncate">
                    {user}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-sm px-4 py-1 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
              >
                Sign in
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
        </div>
      </motion.header>

      {/* Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 h-full w-72 bg-white z-50 border-r border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-semibold text-gray-900">ECOMITRA</span>
              <button onClick={() => setMobileOpen(false)}>✕</button>
            </div>

            {isLoggedIn && (
              <div className="flex items-center gap-3 mb-8 p-3 border border-gray-200 rounded-md">
                <div className="w-9 h-9 bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold uppercase">
                  {user?.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-gray-500">Signed in</p>
                  <p className="text-sm font-medium text-gray-900">
                    {user}
                  </p>
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-6 text-sm font-medium text-gray-700">
              {navItems.map((item) => (
                <span
                  key={item.name}
                  onClick={() => {
                    navigate(item.nav);
                    setMobileOpen(false);
                  }}
                  className="cursor-pointer hover:text-gray-900"
                >
                  {item.name}
                </span>
              ))}
            </nav>

            <button
              onClick={isLoggedIn ? logout : () => navigate("/login")}
              className={`mt-10 w-full py-2 rounded-md text-sm transition ${
                isLoggedIn
                  ? "border border-gray-300 hover:bg-gray-100"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              {isLoggedIn ? "Sign out" : "Sign in"}
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
