import React, { useRef } from "react";
import {
  FiDatabase,
  FiBarChart2,
  FiUsers,
  FiCpu,
  FiCloudSnow,
  FiActivity,
} from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RippleImage from "./RippleImage";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <FiDatabase />,
    eyebrow: "DATA COLLECTION",
    title: "A real-time environmental data layer",
    description:
      "EcoMitra deploys hyper-local IoT sensors that continuously monitor air quality metrics like PM2.5, CO₂, and NO₂—creating a living map of your environment.",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=1200&q=80",
  },
  {
    icon: <FiBarChart2 />,
    eyebrow: "ANALYTICS",
    title: "From raw signals to actionable insight",
    description:
      "Our dashboards translate complex environmental data into clear, decision-ready insights—so teams can act with confidence, not assumptions.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  },
  {
    icon: <FiUsers />,
    eyebrow: "COLLABORATION",
    title: "Sustainability works better together",
    description:
      "Organizations and individuals collaborate, benchmark progress, and amplify their collective impact through shared sustainability goals.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
  },
  {
    icon: <FiCpu />,
    eyebrow: "INTELLIGENCE",
    title: "Predictive models for proactive action",
    description:
      "AI-powered forecasting anticipates air quality changes before they happen—helping teams respond early and reduce exposure risk.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
  },
  {
    icon: <FiCloudSnow />,
    eyebrow: "GLOBAL VIEW",
    title: "Local actions, global perspective",
    description:
      "EcoMitra aggregates anonymized data across regions, revealing macro-level trends while preserving local relevance.",
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=1200&q=80",
  },
  {
    icon: <FiActivity />,
    eyebrow: "ENGAGEMENT",
    title: "Turn insight into everyday action",
    description:
      "Structured eco-challenges help users turn awareness into habits—driving measurable reductions in environmental impact.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
  },
];

const FeatureStory = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray(".feature-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-32 space-y-36">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-widest text-emerald-600 uppercase">
            Platform Overview
          </p>
          <h2 className="mt-4 text-5xl md:text-6xl font-semibold tracking-tight text-slate-900">
            Built for clarity, scale, and real-world impact
          </h2>
          <p className="mt-6 text-lg text-slate-600">
            EcoMitra is a modern environmental intelligence platform designed to
            help organizations understand, predict, and reduce their
            environmental footprint.
          </p>
        </div>

        {/* Feature Rows */}
        {features.map((f, i) => (
          <div
            key={i}
            className={`feature-row grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
              i % 2 ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            {/* Text */}
            <div className={i % 2 ? "lg:col-start-2" : ""}>
              <div className="flex items-center gap-3 text-emerald-600 text-xl mb-6">
                {f.icon}
                <span className="text-sm font-semibold tracking-widest uppercase">
                  {f.eyebrow}
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
                {f.title}
              </h3>

              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                {f.description}
              </p>
            </div>

            {/* Visual */}
            <div
              className={`h-[420px] rounded-3xl overflow-hidden ${
                i % 2 ? "lg:col-start-1" : ""
              }`}
            >
              <RippleImage src={f.image} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureStory;
