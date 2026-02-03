import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

/* Fonts */
const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
    body { font-family: Inter, system-ui, sans-serif; }
    .font-serif { font-family: 'Playfair Display', serif; }
  `}</style>
);

export default function EcoMitraPitchPage() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const features = [
    ["Automatic Data Sync", "Connect travel, energy, and lifestyle data seamlessly."],
    ["Personalized Goals", "Targets that adapt to real behavior patterns."],
    ["Actionable Insights", "Clear carbon + cost impact for every choice."],
    ["Team Challenges", "Gamified sustainability for campuses & companies."],
    ["Verified Models", "Transparent, auditable emission calculations."],
    ["Privacy First", "User-controlled, consent-driven data usage."],
  ];

  const team = [
    {
      name: "Vinod Gawariya",
      role: "Team Lead | AI/ML Engineer",
      img: "/Vinod.jpg",
    },
    {
      name: "Sohail Ansari",
      role: "Fullstack Developer",
      img: "/Sohail.jpg",
    },
    {
      name: "Tanisha Goyal",
      role: "Marketing & Pitch",
      img: "/Tanisha.jpg",
    },
    {
      name: "Yatharth Gour",
      role: "Design & Content",
      img: "/yatharth.jpg",
    },
    {
      name: "Bhavesh Dangi",
      role: "Frontend Developer",
      img: "/Bhavesh.jpg",
    },
  ];

  return (
    <ReactLenis root>
      <Fonts />

      <div ref={rootRef} className="bg-white text-[#013B2A]">

        {/* HERO */}
        <section className="min-h-[80vh] flex items-center justify-center px-6 text-center bg-gradient-to-b from-[#F7FFF8] to-white">
          <div className="max-w-4xl">
            <h1 className="reveal font-serif text-5xl md:text-6xl font-bold text-[#014B35]">
              Eco Mitra
            </h1>
            <p className="reveal mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
              Friendly carbon intelligence that turns everyday actions into
              measurable climate impact.
            </p>

            <div className="reveal mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-full bg-[#00A86B] text-white font-semibold shadow">
                Request Demo
              </button>
              <button className="px-6 py-3 rounded-full border border-[#00A86B] text-[#007D4C]">
                View Prototype
              </button>
            </div>
          </div>
        </section>

        {/* WHAT WE OFFER */}
        <section id="features" className="py-20 px-6 bg-[#F7FFF8]">
          <div className="max-w-6xl mx-auto">

            <p className="reveal text-center text-sm uppercase tracking-widest text-[#007D4C] mb-3">
              What We Offer
            </p>

            <h2 className="reveal font-serif text-3xl md:text-4xl font-bold text-center text-[#014B35] mb-6">
              Designed for real-world climate action
            </h2>

            <p className="reveal text-center max-w-2xl mx-auto text-gray-600 mb-14">
              Practical tools built to reduce emissions in daily life —
              simple, transparent, and scalable.
            </p>

            <div className="grid md:grid-cols-3 gap-10">
              {features.map(([title, desc], i) => (
                <div
                  key={i}
                  className="reveal bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-lg text-[#00694F]">
                    {title}
                  </h3>
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* IMPACT */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="reveal font-serif text-3xl font-bold mb-10">
              Projected Impact
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                ["85%", "Increase in climate-positive engagement"],
                ["1.2 Tg", "Annual CO₂e reduction potential"],
                ["Scalable", "Citizens → Enterprises"],
              ].map(([num, text], i) => (
                <div key={i} className="reveal bg-[#F7FFF8] rounded-xl p-8">
                  <div className="text-4xl font-bold text-[#00A86B]">{num}</div>
                  <p className="mt-3 text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="py-20 px-6 bg-[#F7FFF8]">
          <div className="max-w-6xl mx-auto">
            <h3 className="reveal font-serif text-3xl md:text-4xl font-bold text-center mb-12">
              Team Tech Fusion
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {team.map((m, i) => (
                <div
                  key={i}
                  className="reveal bg-white rounded-2xl p-6 text-center shadow-sm"
                >
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-[#E8F7EE]"
                  />
                  <h4 className="mt-4 font-semibold">{m.name}</h4>
                  <p className="text-sm text-gray-600">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center">
          <h3 className="reveal font-serif text-3xl md:text-4xl font-bold mb-6">
            Ready to see Eco Mitra in action?
          </h3>
          <p className="reveal text-gray-600 max-w-xl mx-auto mb-8">
            We’re pilot-ready and demo-ready. Let’s build measurable climate
            impact together.
          </p>

          <button className="reveal px-10 py-4 rounded-full bg-[#00A86B] text-white font-semibold shadow-lg">
            Book a Demo
          </button>
        </section>

        {/* FOOTER */}
        <footer className="py-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Eco Mitra • Team Tech Fusion • iStart Ideathon
        </footer>

      </div>
    </ReactLenis>
  );
}
