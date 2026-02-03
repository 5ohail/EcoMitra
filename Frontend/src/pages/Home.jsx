import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

import BriefSection from "../components/BriefSection";
import FeatureStory from "../components/Features";
import PricingPage from "../components/Pricing";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Home() {
  const heroRef = useRef(null);
  const navigate = useNavigate();

  /* ---------- HERO INTRO ANIMATION ---------- */
  useGSAP(
    () => {
      gsap.from(".hero-badge", { y: -20, opacity: 0, duration: 0.5 });
      gsap.from(".hero-title", { y: 30, opacity: 0, duration: 0.7, delay: 0.2 });
      gsap.from(".hero-desc", { y: 30, opacity: 0, duration: 0.7, delay: 0.35 });
      gsap.from(".hero-actions", { y: 30, opacity: 0, duration: 0.7, delay: 0.5 });
      gsap.from(".hero-metric", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.7,
      });
    },
    { scope: heroRef }
  );

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      {/* ================= HERO SECTION ================= */}
<section
  ref={heroRef}
  className="relative min-h-screen bg-white overflow-hidden"
>
  {/* Subtle background grid */}
  <div className="absolute inset-0 bg-[radial-gradient(#d1fae5_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

  <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    
    {/* LEFT CONTENT */}
    <div>
      <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium mb-6">
        🌱 Climate Intelligence Platform
      </div>

      <h1 className="hero-title text-5xl md:text-6xl lg:text-[4.2rem] font-semibold tracking-tight text-gray-900">
        Measure, understand, and reduce your
        <span className="text-emerald-600"> carbon footprint</span>.
      </h1>

      <p className="hero-desc mt-6 max-w-xl text-gray-600 text-base md:text-lg leading-relaxed">
        ECOMITRA helps individuals and organizations track emissions,
        analyze patterns, and move toward sustainability with confidence.
      </p>

      <div className="hero-actions mt-10 flex gap-4">
        <button
          onClick={() => navigate("/about")}
          className="px-6 py-3 rounded-md bg-emerald-600 text-white text-sm font-medium
                     hover:bg-emerald-700 transition shadow-sm"
        >
          Get Started
        </button>

        <button
          onClick={() => navigate("/report")}
          className="px-6 py-3 rounded-md border border-gray-300 text-gray-800 text-sm font-medium
                     hover:bg-gray-50 transition"
        >
          View Sample Report
        </button>
      </div>

      {/* Metrics */}
      <div className="mt-14 grid grid-cols-2 gap-6 max-w-md">
        <div>
          <p className="text-3xl font-semibold text-gray-900">99%</p>
          <p className="text-sm text-gray-500">Accuracy</p>
        </div>
        <div>
          <p className="text-3xl font-semibold text-gray-900">24/7</p>
          <p className="text-sm text-gray-500">Monitoring</p>
        </div>
      </div>
    </div>

    {/* RIGHT VISUAL */}
    <div className="relative">
      <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200">
        <img
          src="https://images.unsplash.com/photo-1509395176047-4a66953fd231"
          alt="Clean energy analytics dashboard"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating card */}
      <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-56">
        <p className="text-xs text-gray-500">Live Emissions</p>
        <p className="text-xl font-semibold text-gray-900">124.6 kg CO₂</p>
        <p className="text-xs text-emerald-600 mt-1">↓ 12% this month</p>
      </div>
    </div>
  </div>
</section>


      {/* ================= CONTENT SECTIONS ================= */}
      <BriefSection />
      <FeatureStory />
      <PricingPage />
    </>
  );
}

export default Home;
