import React, { useLayoutEffect } from "react";
import Lenis from "lenis";
import {
  FiTrendingUp,
  FiLayers,
  FiShield,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";

/* ======================
   UI COMPONENTS
====================== */

const Stat = ({ label, value }) => (
  <div className="rounded-xl p-6 border border-emerald-100 bg-white">
    <div className="text-3xl font-semibold text-emerald-700">{value}</div>
    <div className="mt-1 text-sm text-slate-600">{label}</div>
  </div>
);

const Feature = ({ icon, title, description }) => (
  <div className="space-y-4">
    <div className="text-emerald-600 text-2xl">{icon}</div>
    <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const PricingCard = ({
  name,
  price,
  highlight = false,
  features = [],
}) => (
  <div
    className={`rounded-2xl p-8 border ${
      highlight
        ? "border-emerald-500 bg-emerald-50"
        : "border-slate-200 bg-white"
    }`}
  >
    <h3 className="text-xl font-semibold text-slate-900">{name}</h3>

    <div className="mt-4 text-4xl font-bold text-slate-900">
      {price ? `₹${price}` : "Custom"}
    </div>

    <p className="text-sm text-slate-500 mt-1">per workspace / month</p>

    <ul className="mt-6 space-y-3">
      {features.map((f, i) => (
        <li key={i} className="flex gap-3 text-slate-600">
          <FiCheckCircle className="text-emerald-500 mt-1" />
          {f}
        </li>
      ))}
    </ul>

    <button
      className={`mt-8 w-full py-3 rounded-lg font-medium ${
        highlight
          ? "bg-emerald-600 text-white"
          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
      }`}
    >
      Get Started
    </button>
  </div>
);

/* ======================
   MAIN PAGE
====================== */

const EcoMitraWhiteGreen = () => {
  // Smooth scrolling
  useLayoutEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });
    const raf = (t) => {
      lenis.raf(t);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-inter">
      {/* HERO */}
      <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-emerald-600 font-semibold">
              Environmental Intelligence Platform
            </p>

            <h1 className="mt-6 text-5xl md:text-6xl font-semibold leading-tight text-slate-900">
              Sustainability, <br /> made measurable
            </h1>

            <p className="mt-6 text-lg text-slate-600 max-w-xl">
              EcoMitra helps organizations track, predict, and reduce their
              environmental footprint with clarity and confidence.
            </p>

            <div className="mt-10 flex gap-4">
              <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2">
                Request Demo <FiArrowRight />
              </button>
              <button className="px-6 py-3 rounded-lg border border-emerald-200 text-emerald-700">
                View Platform
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Stat label="Emissions Tracked" value="1.4B kg" />
            <Stat label="Active Locations" value="12,800+" />
            <Stat label="Forecast Accuracy" value="96%" />
            <Stat label="Avg. Reduction" value="27%" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16">
          <Feature
            icon={<FiTrendingUp />}
            title="Predictive Insights"
            description="AI-powered forecasts to anticipate environmental impact before it happens."
          />
          <Feature
            icon={<FiLayers />}
            title="Unified Reporting"
            description="Track Scope 1, 2, and 3 emissions in one auditable platform."
          />
          <Feature
            icon={<FiShield />}
            title="Enterprise Security"
            description="Built with data integrity, compliance, and security at its core."
          />
        </div>
      </section>

      {/* PRICING */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-slate-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-600 mb-12">
            Plans that scale with your sustainability goals.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              name="Starter"
              price="1999"
              features={[
                "Basic analytics",
                "5 projects",
                "Community support",
              ]}
            />
            <PricingCard
              name="Growth"
              price="3999"
              highlight
              features={[
                "AI forecasting",
                "Unlimited projects",
                "Priority support",
              ]}
            />
            <PricingCard
              name="Enterprise"
              features={[
                "Custom models",
                "Dedicated infrastructure",
                "Compliance assistance",
              ]}
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 text-center bg-emerald-600 text-white">
        <h2 className="text-4xl font-semibold">
          Start building a greener future
        </h2>
        <p className="mt-4 opacity-90">
          Join organizations making sustainability actionable.
        </p>
        <button className="mt-8 bg-white text-emerald-700 px-8 py-3 rounded-lg font-medium">
          Get Started Today
        </button>
      </section>
    </div>
  );
};

export default EcoMitraWhiteGreen;
