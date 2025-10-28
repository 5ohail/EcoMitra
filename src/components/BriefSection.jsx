// src/components/ContinuousSlides.jsx
import React, { useRef, Suspense } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

function InteractiveModel() {
  const modelUrl = "/Ecomitra1.glb";
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={4} position={[0, 0, 0]} />;
}

// Preload the model
useGLTF.preload("/Ecomitra1.glb");

function ContinuousSlides() {
  const containerRef = useRef(null);

  const slides = [
    {
      title: "EcoMitra in Action.",
      description:
        "Your smart companion for a cleaner planet. Track air quality, monitor your carbon footprint, and take actionable steps toward sustainability.",
      color: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      image: "/brief-1.jpg",
    },
    {
      title: "Smart Environmental Sensors.",
      description:
        "Our IoT sensors measure emissions, air quality, and pollution levels. Get precise, live data for eco-friendly decisions — visualized in 3D.",
      color: "bg-gradient-to-br from-gray-100 to-emerald-50",
      model: true,
    },
    {
      title: "Visualize Your Impact.",
      description:
        "Transform data into stunning dashboards. Track daily, weekly, and monthly progress toward greener living goals.",
      color: "bg-gradient-to-br from-emerald-100 to-teal-100",
      image:
        "https://img.freepik.com/free-photo/abstract-dark-background-with-green-lines-generative-ai_169016-30616.jpg?t=st=1761057190~exp=1761060790~hmac=55929ca3952da8b214b4f0fa684896304447559575c36ea5176a955a1653986f&w=2000",
    },
    {
      title: "Join a Green Community.",
      description:
        "Connect globally with eco-conscious individuals. Share challenges and amplify your impact together.",
      color: "bg-gradient-to-br from-emerald-50 to-teal-100",
      image:
        "https://images.unsplash.com/photo-1474899351970-ee05f7dd1334?auto=format&fit=crop&w=1500&q=80",
    },
  ];

  useGSAP(() => {
    const horizontalContainer = containerRef.current.querySelector(".horizontal-container");
    const slides = gsap.utils.toArray(".slide");
    const progressBar = containerRef.current.querySelector(".progress-bar");
    
    // This logic is already responsive, no changes needed!
    const totalWidth = horizontalContainer.scrollWidth - window.innerWidth;

    const mainScroll = gsap.to(horizontalContainer, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true, // This is key for responsiveness
        onUpdate: (self) => gsap.set(progressBar, { scaleX: self.progress }),
      },
    });

    // These animations are also fine, as they animate non-layout properties
    slides.forEach((slide) => {
      const title = slide.querySelector(".slide-title");
      const desc = slide.querySelector(".slide-description");

      ScrollTrigger.create({
        trigger: slide,
        containerAnimation: mainScroll,
        start: "left center",
        end: "right center",
        onEnter: () => {
          gsap.fromTo(
            [title, desc],
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 1,
              ease: "power3.out",
            }
          );
        },
        onLeave: () =>
          gsap.to([title, desc], { opacity: 0, y: -40, duration: 0.5 }),
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      <div className="horizontal-wrapper sticky top-0 flex h-screen items-center">
        <div className="horizontal-container flex">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`slide relative grid h-screen w-screen flex-shrink-0 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 items-center px-6 md:px-12 lg:px-24 ${slide.color}`} >
              <div className="lg:pr-12 z-10 text-center lg:text-left">
                <h2
                  className="slide-title mb-4 lg:mb-6 text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {slide.title}
                </h2>
                <p
                  className="slide-description text-base md:text-lg leading-relaxed text-gray-700"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {slide.description}
                </p>
              </div>

              {/* Right Visual */}
              <div className="flex items-center justify-center w-full" style={{ perspective: "1000px" }}> {/* CHANGED */}
                <div className="img-container h-[45vh] lg:h-[70vh] w-full rounded-2xl shadow-2xl overflow-hidden"> {/* CHANGED */}
                  {slide.model ? (
                    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                      <Suspense fallback={null}>
                        <ambientLight intensity={0.2} />
                        <directionalLight position={[3, 5, 5]} intensity={0.8} />
                        
                        <InteractiveModel />

                        <Environment 
                          files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/pine_picnic_4k.hdr" 
                        />
                        
                        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={12} />
                      </Suspense>
                    </Canvas>
                  ) : (
                    <img
                      src={slide.image}
                      className="h-full w-full rounded-2xl object-cover"
                      alt={slide.title}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar-container fixed bottom-0 left-0 w-full h-1 bg-gray-200/50">
        <div
          className="progress-bar h-full w-full bg-emerald-600"
          style={{ transformOrigin: "left center", scaleX: 0 }}
        />
      </div>
    </section>
  );
}

export default ContinuousSlides;