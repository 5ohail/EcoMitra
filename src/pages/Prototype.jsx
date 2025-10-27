// src/pages/Prototype.jsx
import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Html, Environment, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

function Model({ url, modelRef }) {
  const gltf = useGLTF(url);
  const scene = gltf.scene;
  useEffect(() => {
    if (modelRef) modelRef.current = scene;
  }, [scene, modelRef]);
  useFrame((_, delta) => {
    if (!modelRef.current.__gsapDriven) scene.rotation.y += delta * 0.08;
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
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 6, 2]} intensity={1.1} />
      <Suspense fallback={null}>
        <Model url={modelUrl} modelRef={modelRef} />
        <Html position={[0.45, 0.26, 0.12]} center>
          <button
            onClick={() => hotspotCallback("Sensor array: real-time measurements.")}
            className="bg-white/90 px-3 py-1 rounded-full shadow text-xs text-green-700"
          >
            Sensor
          </button>
        </Html>
        <Html position={[-0.35, 0.05, -0.12]} center>
          <button
            onClick={() => hotspotCallback("UI Display: instant feedback & tips.")}
            className="bg-white/90 px-3 py-1 rounded-full shadow text-xs text-green-700"
          >
            UI
          </button>
        </Html>
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={true} minDistance={0.7} maxDistance={6} />
    </>
  );
}

export default function PrototypeCinematicPage() {
  const modelUrl = "/Ecomitra1.glb";
  const modelRef = useRef();
  const timelineRef = useRef();
  const [hotspotNote, setHotspotNote] = useState(null);

  useLayoutEffect(() => {
    if (!modelRef.current) return;
    modelRef.current.__gsapDriven = true;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".story-sections",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        pin: ".canvas-wrapper",
        anticipatePin: 1,
      },
    });

    tl.fromTo(
      modelRef.current.scale,
      { x: 0.9, y: 0.9, z: 0.9 },
      { x: 1.03, y: 1.03, z: 1.03, duration: 1 }
    )
      .to(modelRef.current.rotation, { y: Math.PI * 0.3, duration: 1.2 }, 0.5)
      .to(modelRef.current.position, { x: -0.25, duration: 1.2 }, 1.2)
      .to(modelRef.current.scale, { x: 1.15, y: 1.15, z: 1.15, duration: 1.2 }, 2)
      .to(modelRef.current.rotation, { y: Math.PI * 0.5, duration: 1.5 }, 3)
      .to(modelRef.current.position, { z: 1.2, duration: 1.2 }, 4.5);

    timelineRef.current = tl;

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
      modelRef.current.__gsapDriven = false;
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="min-h-screen font-sans text-slate-900 bg-gradient-to-b from-[#F8FFF9] to-[#F0FFF4]">
        {/* Main content grid */}
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pt-24 px-6 pb-24">
          {/* Sticky Canvas */}
          <div className="canvas-wrapper lg:col-span-7 col-span-1 sticky top-24 h-[80vh] rounded-2xl overflow-hidden shadow-2xl bg-white">
            <Canvas camera={{ fov: 38, near: 0.1, far: 100 }}>
              <Scene
                modelUrl={modelUrl}
                modelRef={modelRef}
                hotspotCallback={(note) => setHotspotNote(note)}
              />
            </Canvas>
          </div>

          {/* Story Sections */}
          <div className="story-sections lg:col-span-5 col-span-1 flex flex-col gap-32 pt-12">
            <section>
              <h2 className="text-3xl font-bold text-green-800">Why Eco Mitra?</h2>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Eco Mitra bridges innovation and sustainability — a tangible step toward a carbon-conscious future.
                Our device empowers users to measure, reduce, and reflect upon their environmental impact in real-time.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-green-800">Smart Integration</h2>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Powered by AI and IoT, Eco Mitra connects seamlessly with your devices, providing actionable insights through a gamified user experience.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-green-800">Join the Revolution</h2>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Be part of the future. Experience how technology can reshape behavior, influence communities, and protect our planet.
              </p>
              <div className="mt-4 flex gap-4">
                <a className="px-6 py-3 bg-green-700 text-white rounded-full shadow" href="tel:+91787836407">
                  Book a Demo
                </a>
                <a className="px-6 py-3 border border-green-600 text-green-700 rounded-full" href="#deck">
                  Request Deck
                </a>
              </div>
            </section>
          </div>
        </main>

        {/* Hotspot message display */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-xl shadow-md text-sm text-gray-700">
          {hotspotNote || "Click on highlighted parts of the model to explore."}
        </div>

        <footer className="text-center py-12 text-sm text-gray-500">
          © {new Date().getFullYear()} Eco Mitra — Team Tech Fusion
        </footer>
      </div>
    </ReactLenis>
  );
}
