// src/pages/Prototype.jsx
import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Html, Environment, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

/* ================= MODEL ================= */

function Model({ url, modelRef }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (modelRef) modelRef.current = scene;
  }, [scene, modelRef]);

  useFrame((_, delta) => {
    if (!modelRef.current?.__gsapDriven) {
      scene.rotation.y += delta * 0.08;
    }
  });

  return <primitive object={scene} dispose={null} />;
}

function Scene({ modelUrl, modelRef, hotspotCallback }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.9, 2.6);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 3]} intensity={1.2} />

      <Suspense fallback={null}>
        <Model url={modelUrl} modelRef={modelRef} />

        {/* HOTSPOTS */}
        <Html position={[0.45, 0.26, 0.12]} center>
          <button
            onClick={() => hotspotCallback("Sensor array: real-time carbon & air-quality measurements.")}
            className="hotspot-btn"
          >
            Sensor
          </button>
        </Html>

        <Html position={[-0.35, 0.05, -0.12]} center>
          <button
            onClick={() => hotspotCallback("UI display: instant feedback, nudges & insights.")}
            className="hotspot-btn"
          >
            UI
          </button>
        </Html>

        <Environment preset="studio" />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={0.8}
        maxDistance={5}
      />
    </>
  );
}

/* ================= PAGE ================= */

export default function PrototypeCinematicPage() {
  const modelUrl = "/Ecomitra1-draco.glb";
  const modelRef = useRef();
  const [hotspotNote, setHotspotNote] = useState(null);

  /* === GSAP SCROLL TIMELINE === */
  useLayoutEffect(() => {
    if (!modelRef.current) return;
    modelRef.current.__gsapDriven = true;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".story-sections",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.3,
        pin: ".canvas-wrapper",
        anticipatePin: 1,
      },
    });

    tl.fromTo(modelRef.current.scale, { x: 0.9, y: 0.9, z: 0.9 }, { x: 1.05, y: 1.05, z: 1.05 })
      .to(modelRef.current.rotation, { y: Math.PI * 0.35 }, 0.5)
      .to(modelRef.current.position, { x: -0.3 }, 1.2)
      .to(modelRef.current.scale, { x: 1.18, y: 1.18, z: 1.18 }, 2)
      .to(modelRef.current.rotation, { y: Math.PI * 0.55 }, 3)
      .to(modelRef.current.position, { z: 1.25 }, 4.5);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      modelRef.current.__gsapDriven = false;
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="min-h-screen bg-gradient-to-b from-[#F8FFF9] to-[#F0FFF4] text-slate-900">

        {/* ===== HEADER ===== */}
        <header className="max-w-7xl mx-auto pt-24 px-6">
          <p className="uppercase tracking-widest text-sm text-green-700 mb-3">
            Interactive Prototype
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 max-w-3xl">
            Experience Eco Mitra in motion
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl">
            Scroll to explore how Eco Mitra blends hardware, intelligence, and design
            into a single climate-positive experience.
          </p>
        </header>

        {/* ===== MAIN GRID ===== */}
        <main className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 pt-20 px-6 pb-28">

          {/* CANVAS */}
          <div className="canvas-wrapper lg:col-span-7 sticky top-28 h-[78vh] rounded-3xl overflow-hidden bg-white shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
            <Canvas camera={{ fov: 38 }}>
              <Scene
                modelUrl={modelUrl}
                modelRef={modelRef}
                hotspotCallback={(note) => setHotspotNote(note)}
              />
            </Canvas>
          </div>

          {/* STORY */}
          <div className="story-sections lg:col-span-5 flex flex-col gap-36 pt-10">

            {[
              {
                step: "01",
                title: "Why Eco Mitra?",
                text:
                  "Eco Mitra bridges innovation and sustainability. It empowers users to measure, understand, and reduce carbon impact through a physical-digital ecosystem.",
              },
              {
                step: "02",
                title: "Smart Integration",
                text:
                  "AI-powered analytics combined with IoT sensing deliver personalized insights and habit-forming nudges through a delightful interface.",
              },
              {
                step: "03",
                title: "Join the Movement",
                text:
                  "Eco Mitra is not just a device — it’s a behavior-change platform for individuals, campuses, and enterprises.",
              },
            ].map((s) => (
              <section key={s.step}>
                <span className="text-sm font-semibold text-green-600">
                  {s.step}
                </span>
                <h2 className="mt-2 text-3xl font-bold text-green-900">
                  {s.title}
                </h2>
                <p className="mt-3 text-gray-700 leading-relaxed">
                  {s.text}
                </p>

                {s.step === "03" && (
                  <div className="mt-6 flex gap-4">
                    <a
                      href="tel:+917878364087"
                      className="px-6 py-3 rounded-full bg-green-700 text-white shadow"
                    >
                      Book Demo
                    </a>
                    <a
                      href="mailto:sohailansarisa318@gmail.com"
                      className="px-6 py-3 rounded-full border border-green-600 text-green-700"
                    >
                      Request Deck
                    </a>
                  </div>
                )}
              </section>
            ))}

          </div>
        </main>

        {/* HOTSPOT TOOLTIP */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-5 py-3 rounded-full shadow-lg text-sm text-gray-700 transition">
          {hotspotNote || "Tap highlighted points on the device to learn more."}
        </div>

        <footer className="py-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Eco Mitra · Team Tech Fusion
        </footer>

        {/* HOTSPOT BUTTON STYLE */}
        <style>{`
          .hotspot-btn {
            background: rgba(255,255,255,0.95);
            padding: 6px 12px;
            border-radius: 999px;
            font-size: 12px;
            color: #047857;
            box-shadow: 0 6px 18px rgba(0,0,0,0.15);
            transition: transform .2s ease, box-shadow .2s ease;
          }
          .hotspot-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 26px rgba(0,0,0,0.18);
          }
        `}</style>

      </div>
    </ReactLenis>
  );
}
