import React, { useRef, useEffect, useState } from 'react';
import { FiDatabase, FiBarChart2, FiUsers, FiCpu, FiCloudSnow, FiActivity } from 'react-icons/fi';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import hoverEffect from "hover-effect";
import RippleImage from './RippleImage';
gsap.registerPlugin(ScrollTrigger, SplitText);

const FeatureStory = () => {
  const containerRef = useRef(null);
  // We no longer need the useEffect for hover-effect

  useGSAP(() => {
    // This animation logic remains largely the same
    const featureCards = gsap.utils.toArray(".feature-card");
    
    featureCards.forEach((card) => {
      const title = card.querySelector("h2");
      const description = card.querySelector("p");
      const icon = card.querySelector(".feature-icon-wrapper");
      const cardImageWrapper = card.querySelector(".feature-card-image-wrapper"); // Target the image wrapper

      let splitTitle;
      if (title) {
          splitTitle = new SplitText(title, { type: "words" });
          gsap.set(splitTitle.words, { y: "100%", opacity: 0 });
          gsap.set(title, { autoAlpha: 1 });
      }

      gsap.set([description, icon, cardImageWrapper], { autoAlpha: 0, y: 50 });
      
      ScrollTrigger.create({
        trigger: card,
        start: "top 70%",
        toggleActions: "play none none reverse",
        
        onEnter: () => {
          if (splitTitle) {
            gsap.to(splitTitle.words, { y: "0%", opacity: 1, stagger: 0.03, duration: 0.8, ease: "power3.out" });
          }
          gsap.to(icon, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.2 });
          gsap.to(description, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.4 });
          gsap.to(cardImageWrapper, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.5 });
        },
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white text-slate-800 font-sans">
      
      {/* Introduction Section (No changes) */}
      <section className="min-h-[50vh] flex flex-col justify-center items-center text-center p-8 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <p className="text-emerald-600 font-semibold uppercase tracking-widest">Our Mission</p>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-700">
            The Air You Breathe, Quantified.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600">
            Our cities are complex ecosystems. To foster a healthier future, we must first understand our present. EcoMitra provides the clarity needed to transform our environment, one data point at a time.
          </p>
        </div>
      </section>

      {/* --- Feature Cards Section --- */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/*
          Alternating Card Layout:
          - For even `index` (0, 2, 4...): image first, then text
          - For odd `index` (1, 3, 5...): text first, then image (using `flex-row-reverse`)
        */}
        {[
          {
            icon: <FiDatabase className="h-8 w-8 text-emerald-600" />,
            title: "A Network of Sentinels.",
            description: "It starts with precision. We deploy a city-wide grid of hyper-local IoT sensors that continuously monitor key air quality indicators—PM2.5, NO₂, and CO₂ levels. This provides a real-time, high-fidelity map of your environment, revealing patterns that were once invisible.",
            image: "https://plus.unsplash.com/premium_photo-1667354155838-f10e3a3db51d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=703",
            alt: "Sleek IoT sensor on a modern building"
          },
          {
            icon: <FiBarChart2 className="h-8 w-8 text-emerald-600" />,
            title: "From Raw Data to Radical Clarity.",
            description: "Raw data is meaningless noise. Our intuitive dashboard translates complex metrics into beautiful, actionable visualizations. Track your personal or corporate carbon footprint, identify pollution hotspots, and see your progress over time with stunning clarity.",
            image: "https://plus.unsplash.com/premium_photo-1671499727370-0dfad502c619?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RnJvbSUyMFJhdyUyMERhdGElMjB0byUyMFJhZGljYWwlMjBDbGFyaXR5JTIwZ3JlZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
            alt: "Clean and modern data dashboard on a screen"
          },
          {
            icon: <FiUsers className="h-8 w-8 text-emerald-600" />,
            title: "Sustainability is a Team Sport.",
            description: "Knowledge inspires action. Join a global community of eco-conscious users. Set personal goals, participate in city-wide challenges, and share successes. Earn badges, track your positive impact, and see how small changes create a collective wave of progress.",
            image: "https://plus.unsplash.com/premium_photo-1678865183765-696a4b1887d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFN1c3RhaW5hYmlsaXR5JTIwaXMlMjBhJTIwVGVhbSUyMFNwb3J0LiUyMGdyZWVufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
            alt: "Diverse group of people collaborating on a project"
          },
          {
            icon: <FiCpu className="h-8 w-8 text-emerald-600" />,
            title: "AI-Powered Predictive Insights.",
            description: "Beyond current data, our AI models analyze historical trends and real-time inputs to forecast air quality changes. Anticipate potential pollution events, optimize your eco-actions, and stay one step ahead in environmental stewardship.",
            image: "https://plus.unsplash.com/premium_photo-1701113011288-5ecff1fc348a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEFJLVBvd2VyZWQlMjBQcmVkaWN0aXZlJTIwSW5zaWdodHMlMjBncmVlbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
            alt: "Futuristic AI interface visualizing data"
          },
          {
            icon: <FiCloudSnow className="h-8 w-8 text-emerald-600" />,
            title: "Local Impact, Global Reach.",
            description: "See how your local efforts contribute to a larger global movement. Our platform aggregates anonymous data from communities worldwide, showcasing the collective power of individual actions in combating climate change.",
            image: "https://images.unsplash.com/photo-1578589318250-729f1a53b9b9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8R2xvYmUlMjB3aXRoJTIwY29ubmVjdGVkJTIwZGF0YSUyMHBvaW50cyUyMGdyZWVufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
            alt: "Globe with connected data points"
          },
          {
            icon: <FiActivity className="h-8 w-8 text-emerald-600" />,
            title: "Actionable Eco-Challenges.",
            description: "Participate in fun, engaging challenges designed to reduce your environmental footprint. From 'No-Car Commute Week' to 'Energy Saving Saturdays,' earn rewards and inspire others to join the green revolution.",
            image: "https://media.istockphoto.com/id/2175304737/photo/lone-green-figure-stands-out-among-a-sea-of-black-figures-in-this-3d-rendering-representing.webp?a=1&b=1&s=612x612&w=0&k=20&c=4_v-SBJ1rur_velzTbh9bM4UYYvmuOIYqnT8iiaSTh4=",
            alt: "People engaging in outdoor eco-activities"
          },
        ].map((feature, index) => (
          <div
            key={index}
            className={`feature-card flex flex-col md:flex-row items-center justify-between my-20 p-8 rounded-3xl bg-slate-50 shadow-xl overflow-hidden
              ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`} // Alternating layout
          >
            {/* Image Section */}
            <div className="md:w-1/2 p-4 flex justify-center items-center">
              <div className="relative w-full h-80 md:h-[400px] max-w-md rounded-2xl overflow-hidden shadow-lg aspect-square">
                {/* The actual image for hoverEffect, needs to be class `feature-card-image` */}
                <RippleImage src={feature.image} alt={feature.alt} />
              </div>
            </div>

            {/* Text Content Section */}
            <div className="md:w-1/2 p-4 text-center md:text-left">
              <div className="feature-icon-wrapper bg-emerald-100 p-4 rounded-lg mb-6 w-max mx-auto md:mx-0">
                {feature.icon}
              </div>
              <h2 className="text-4xl font-bold mb-4" style={{ visibility: 'hidden' }}>{feature.title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureStory;