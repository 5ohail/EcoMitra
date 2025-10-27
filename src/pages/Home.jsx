import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BriefSection from '../components/BriefSection'
import FeatureStory from "../components/Features";
import PricingPage from "../components/Pricing";
import { useNavigate } from "react-router-dom";
gsap.registerPlugin(useGSAP, ScrollTrigger);
function Home() {
  const heroRef = useRef(null);
  const briefRef = useRef(null);
  const navigate = useNavigate();
  // HERO SECTION ANIMATION
  useGSAP(
    () => {
      gsap.from(".home-img1", { x: 100, opacity: 0, duration: 0.7 });
      gsap.from(".home-img2", {
        x: -100,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
      });
      gsap.from(".home-img3", {
        y: 100,
        opacity: 0,
        duration: 0.7,
        delay: 0.4,
      });
      gsap.from(".home-title", {
        y: -50,
        opacity: 0,
        duration: 0.7,
        delay: 0.6,
      });
      gsap.from(".home-sub", { y: -50, opacity: 0, duration: 0.7, delay: 0.8 });
      gsap.from(".home-cta", { y: 50, opacity: 0, duration: 0.7, delay: 1 });
    },
    { scope: heroRef }
  );

  // HERO SECTION 3D PARALLAX
  useEffect(() => {
    if (!heroRef.current) return;
    const containers = heroRef.current.querySelectorAll(".img-container");

    containers.forEach((container) => {
      const img = container.querySelector("img");
      container.style.perspective = "1000px";

      const onMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x - rect.width / 2) / rect.width) * 20;
        const rotateX = ((rect.height / 2 - y) / rect.height) * 20;

        gsap.to(container, {
          rotateY,
          rotateX,
          x: (x - rect.width / 2) / 10,
          y: (y - rect.height / 2) / 10,
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(img, { scale: 1.1, duration: 0.4, ease: "power2.out" });
      };

      const onMouseLeave = () => {
        gsap.to(container, {
          rotateY: 0,
          rotateX: 0,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
        gsap.to(img, { scale: 1, duration: 0.6, ease: "power3.out" });
      };

      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseleave", onMouseLeave);

      return () => {
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseleave", onMouseLeave);
      };
    });
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div ref={heroRef} className="relative h-screen w-screen overflow-hidden">
        <div className="home-img1 img-container h-[50vh] w-[20vw] -rotate-5 absolute top-2/10 left-1/12 overflow-hidden">
          <img
            src="https://plus.unsplash.com/premium_photo-1673873437997-4fe756faa1bd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8M2QlMjBncmVlbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="home-img2 img-container h-[30vh] w-[15vw] rotate-5 absolute top-1/10 right-1/12 overflow-hidden">
          <img
            src="https://media.istockphoto.com/id/2204420545/photo/a-3d-rendering-round-green-glass-shapes-abstract-aesthetic-background-modern-vertical.webp?a=1&b=1&s=612x612&w=0&k=20&c=FfpsHsdTzBLNxFq0Qx5527Qe8E8p9v9QAlTOCvwch3s="
            className="h-full w-full object-cover object-bottom"
            alt=""
          />
        </div>
        <div className="home-img3 img-container h-[30vh] w-[25vw] -rotate-5 absolute bottom-2/10 right-1/12 overflow-hidden">
          <img
            src="https://media.istockphoto.com/id/1049484094/photo/human-foot-print-symbol-made-of-green-trees-on-recycled-paper-green-energy-and-carbon.webp?a=1&b=1&s=612x612&w=0&k=20&c=YxBhtgT90_S5POkH5ILMXF8ygb2BdyEZxy_STqvfx6M="
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <h1
          className="home-title absolute text-[7rem] font-bold top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black"
          style={{ fontFamily: "fantasy", letterSpacing: "4px" }}
        >
          <span className="text-emerald-700">ECO</span>MITRA.
        </h1>
        <p
          className="home-sub absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 uppercase text-teal-600"
          style={{ fontFamily: "fantasy", letterSpacing: "1px" }}
        >
          Swachch Hawa ka Smart Dost.
        </p>
        <div className="home-cta absolute top-[53%] left-1/2 -translate-x-3/5">
          <button className="px-8 py-3 text-white font-semibold cursor-pointer bg-emerald-600 hover:bg-emerald-700 hover:scale-105 duration-300 shadow-lg" onClick={()=>navigate('/about')}>
            Know More
          </button>
        </div>
      </div>
      {/* BRIEF SECTION */}
    <BriefSection/>
    {/* FEATURES SECTION */}
      <FeatureStory></FeatureStory>
    {/* PRICING SECTION */}
    <div className="relative">
      <PricingPage></PricingPage>
    </div>

    
    </>
  );
}

export default Home;
