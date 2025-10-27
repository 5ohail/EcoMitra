import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';

// Professional, futuristic single-file page for iStart Ideathon — Team Tech Fusion
// No Three.js. GSAP + ScrollTrigger + Lenis only. Tailwind utility classes assumed.

gsap.registerPlugin(ScrollTrigger);

const Fonts = () => (
  <style>{`\n    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Playfair+Display:wght@600;700&display=swap');\n    .font-sans{font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial}\n    .font-serif{font-family:'Playfair Display',serif}\n  `}</style>
);

export default function EcoMitraPitchPage() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro headline animation — fade + pop
      gsap.from('.intro-title', {
        opacity: 0,
        y: 60,
        scale: 0.98,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.intro', start: 'top center', toggleActions: 'play none none reverse' },
      });

      // Panels reveal (staggered children)
      gsap.utils.toArray('.panel').forEach((panel) => {
        gsap.from(panel.querySelectorAll('.reveal'), {
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Feature cards — scale in
      gsap.from('.feature-card', {
        scale: 0.96,
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'back.out(1.2)',
        stagger: 0.15,
        scrollTrigger: { trigger: '.features', start: 'top 85%' },
      });

      // Roadmap horizontal pin + progress scrub
      const roadmap = document.querySelector('.roadmap');
      if (roadmap) {
        gsap.to('.roadmap-track', {
          xPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: roadmap,
            start: 'top top',
            end: '+=1000',
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });
      }

      // Team cards reveal — animate each card individually for reliability
      gsap.utils.toArray('.team-card').forEach((card, i) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          scale: 0.98,
          duration: 0.75,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // CTA pulse when near view
      gsap.fromTo(
        '.cta-btn',
        { scale: 0.98, boxShadow: '0 6px 18px rgba(0,0,0,0.06)' },
        {
          scale: 1,
          boxShadow: '0 18px 40px rgba(0,160,107,0.12)',
          ease: 'power1.inOut',
          duration: 0.6,
          scrollTrigger: { trigger: '.cta', start: 'top 80%' },
        }
      );

    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Dummy team members
  const team = [
  {
    name: 'Vinod Gawariya',
    role: 'Team Leader | AIML Engineer', // Updated role
    img: 'https://media.licdn.com/dms/image/v2/D4E03AQE3Qv9ncY2zYg/profile-displayphoto-shrink_800_800/B4EZeQrog9HsAc-/0/1750479053262?e=1762992000&v=beta&t=bAm6B6nEXDUmxzINpRImwv1nEPcEsC9imvI7xjsK3m4',
    description: 'Vinod is the architect of our intelligence, specializing in developing and deploying advanced machine learning models to drive data-driven insights.'
  },
  {
    name: 'Sohail Ansari',
    role: 'Co-leader | Fullstack Developer', // Updated role
    img: 'https://media.licdn.com/dms/image/v2/D4D03AQH2hQzRYAlJAQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729418868213?e=1762992000&v=beta&t=XbrpGpPzOIjJL5VQAtqAocHg1N7vi4D9ATagPeRKXt0',
    description: 'Sohail is the backbone of our platform. A versatile fullstack developer, he masters both frontend elegance and backend robustness to bring our application to life.'
  },
  {
    name: 'Tanisha Goyal',
    role: 'Presentation | Marketing',
    img: 'https://media.licdn.com/dms/image/v2/D4D03AQGZcuswCuUm-Q/profile-displayphoto-crop_800_800/B4DZfaVlivGgAI-/0/1751714784282?e=1762992000&v=beta&t=y4835K9WLVubDB87l2W8vlCixK5Tc5ZCAkh1w0cok-Y',
    description: 'Tanisha is our chief storyteller. She crafts our narrative and leads marketing efforts, brilliantly communicating our vision and value to our global audience.'
  },
  {
    name: 'Yatharth Gour',
    role: 'Designing | Content Creation',
    img: 'https://media.licdn.com/dms/image/v2/D5603AQH_vv2kk0yhKg/profile-displayphoto-scale_400_400/B56Zg2OwIIG0Ao-/0/1753256496542?e=1762992000&v=beta&t=pumeU97yyKlrRikeNPmxjyviovggVMmAVRIL4aaPm2Y',
    description: 'Yatharth is our creative visionary. As the Design Lead, he translates complex ideas into intuitive, beautiful, and user-centric experiences that define our brand.'
  },
  {
    name: 'Bhavesh Dangi',
    role: 'Frontend Developer',
    img: 'https://media.licdn.com/dms/image/v2/D5603AQHkcRV52u487g/profile-displayphoto-shrink_800_800/B56ZZHLjsgHQAg-/0/1744950936360?e=1762992000&v=beta&t=pvuPYitBY0bxZLIw69NxVDZCBj8mS10G-Gl_a7MR7D8',
    description: 'Bhavesh is the craftsman of our user interface. A dedicated frontend developer, he transforms designs into pixel-perfect, responsive, and engaging web experiences.'
  },
];

  return (
    <ReactLenis root options={{ duration: 1.4 }}>
      <Fonts />

      <div ref={rootRef} className="min-h-screen font-sans text-[#013B2A]">
        {/* HERO / INTRO (no navbar) */}
        <section className="intro relative min-h-[80vh] flex items-center justify-center px-6 text-center bg-gradient-to-b from-[#F7FFF8] to-white">
          <div className="max-w-4xl">
            <h1 className="intro-title text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight text-[#014B35]">Eco Mitra — Friendly Carbon Intelligence</h1>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto reveal">A precision carbon-footprint tracker that turns everyday choices into measurable climate impact — built for citizens, teams, and enterprises.</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a href="tel:+917878364087" className="cta-btn inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#00A86B] to-[#007D4C] text-white font-semibold shadow-lg">Request Demo</a>
              <a href="#features" className="inline-block px-6 py-3 rounded-full border border-[#00A86B] text-[#007D4C] font-medium">Explore Features</a>
            </div>

            <div className="mt-12 text-sm text-gray-500 reveal">Presented to <strong>iStart Ideathon</strong> by <em>Team Tech Fusion</em> — professional, scalable, and designed to move the needle.</div>
          </div>

          {/* Accent futuristic ring */}
          <div className="pointer-events-none absolute -bottom-24 right-6 opacity-50">
            <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="160" cy="160" r="120" stroke="#00A86B" strokeOpacity="0.06" strokeWidth="12" />
            </svg>
          </div>
        </section>

        {/* PROBLEM */}
        <section id="problem" className="panel py-24 px-6 md:px-12 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="reveal">
              <h2 className="text-3xl font-serif font-bold mb-4">The Problem</h2>
              <p className="text-gray-700 leading-relaxed">People and organizations want to reduce carbon footprint but lack simple, actionable, and trustworthy tools. Existing solutions are either too technical or not personalized enough, causing poor adoption.</p>

              <ul className="mt-6 space-y-3 text-gray-700">
                <li>• Fragmented data sources and poor UX</li>
                <li>• Limited personalization and actionable guidance</li>
                <li>• Little focus on behavior nudging for long-term change</li>
              </ul>
            </div>

            <div className="reveal">
              <div className="bg-[#F3FBF4] rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-xl mb-3">Why it matters</h3>
                <p className="text-gray-600">Adoption friction stalls climate action. We need tools that are delightful, trusted, and integrate with daily life — so impact scales.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section id="solution" className="panel py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="reveal">
              <h2 className="text-3xl font-serif font-bold mb-4">Our Solution</h2>
              <p className="text-gray-700 leading-relaxed">Eco Mitra is a friendly, high-fidelity carbon intelligence platform that combines automatic data ingestion, behavior-driven nudges, and clear visualizations to help users reduce emissions with confidence.</p>

              <ol className="mt-6 space-y-3 text-gray-700">
                <li>1. Connect — Integrate with mobility, energy, and consumption sources.</li>
                <li>2. Calculate — Use vetted emission factors and personalization layers.</li>
                <li>3. Change — Provide nudges, goals, and team challenges to reduce footprint.</li>
              </ol>
            </div>

            <div className="reveal">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=60" alt="dashboard" className="w-full h-64 object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="features panel py-24 px-6 md:px-12 bg-gradient-to-b from-white to-[#F7FFF8]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Automatic Data Sync', desc: 'Connect once — auto-sync trips, bills, and consumption.' },
                { title: 'Personalized Goals', desc: 'Smart, adaptive goals tuned to user behavior.' },
                { title: 'Team Challenges', desc: 'Gamified programs for groups and campuses.' },
                { title: 'Actionable Insights', desc: 'Clear recommendations with carbon & cost impact.' },
                { title: 'Verified Emission Factors', desc: 'Transparent, auditable calculation engines.' },
                { title: 'Privacy-first Design', desc: 'Local-first data policies with opt-in sharing.' },
              ].map((f, i) => (
                <div key={i} className="feature-card bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-lg font-semibold text-[#00694F]">{f.title}</div>
                  <p className="mt-3 text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMPACT METRICS */}
        <section className="panel py-20 px-6 md:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-2xl font-serif font-bold mb-6">Projected Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="reveal bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-[#00A86B]">85%</div>
                <div className="mt-2 text-gray-600">Avg. engagement increase with gamified nudges</div>
              </div>
              <div className="reveal bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-[#00A86B]">1.2Tg</div>
                <div className="mt-2 text-gray-600">CO₂e reduction potential/yr (scalable projections)</div>
              </div>
              <div className="reveal bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-[#00A86B]">Enterprise</div>
                <div className="mt-2 text-gray-600">Tiered solutions for citizens, SMEs, and large orgs</div>
              </div>
            </div>
          </div>
        </section>

        {/* ROADMAP */}
        <section className="roadmap panel py-20 px-6 md:px-12 bg-[#F3FBF4]">
          <div className="max-w-6xl mx-auto overflow-hidden">
            <h3 className="text-2xl font-serif font-bold mb-8 text-center">Roadmap</h3>
            <div className="relative">
              <div className="roadmap-track flex gap-8 w-[200%]">
                {[
                  { quarter: 'Q4 2025', items: ['MVP', 'Pilot partners', 'Core integrations'] },
                  { quarter: 'Q1 2026', items: ['Scale pilots', 'Team challenges', 'Mobile app'] },
                  { quarter: 'Q2 2026', items: ['Enterprise features', 'API marketplace'] },
                  { quarter: 'Q3 2026', items: ['Global partners', 'Certifications'] },
                ].map((r, i) => (
                  <div key={i} className="w-1/3 bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-lg font-semibold text-[#00694F]">{r.quarter}</div>
                    <ul className="mt-3 text-gray-700 list-disc list-inside">
                      {r.items.map((it, idx) => <li key={idx}>{it}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section id="team" className="team panel py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-serif font-bold mb-8 text-center">Meet Team Tech Fusion</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((m, i) => (
                <div key={i} className="team-card bg-white rounded-2xl p-6 text-center shadow-sm">
                  <img src={m.img} alt={m.name} className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-[#E8F7EE]" />
                  <h4 className="mt-4 font-semibold text-lg">{m.name}</h4>
                  <div className="text-sm text-gray-600">{m.role}</div>
                  <p className="mt-3 text-gray-600 text-sm">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="cta panel py-20 px-6 md:px-12 bg-gradient-to-r from-[#EAFBF0] to-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-serif font-bold mb-4">Ready to see Eco Mitra in action?</h3>
            <p className="text-gray-700 mb-6">We have an interactive prototype and pilot-ready stack. Book a 15-minute demo and let us show the impact.</p>
            <div className="flex items-center justify-center gap-4">
              <a href="tel:+917878364087" className="px-8 py-4 rounded-full bg-[#00A86B] text-white font-semibold">Book Demo</a>
              <a href="/prototype" className="px-6 py-3 rounded-full border border-[#00A86B] text-[#007D4C]">Request Deck</a>
            </div>

            <div className="mt-8 text-sm text-gray-500">Presented by <strong>Team Tech Fusion</strong> • iStart Ideathon</div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 px-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Eco Mitra • Built by Team Tech Fusion • Privacy-first • Demo-ready
        </footer>
      </div>
    </ReactLenis>
  );
}
