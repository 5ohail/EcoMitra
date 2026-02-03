// src/components/ContinuousSlides.jsx
import React, { useRef, Suspense } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

function InteractiveModel() {
  const { scene } = useGLTF("/Ecomitra1-draco.glb");
  return <primitive object={scene} scale={3.2} />;
}

useGLTF.preload("/Ecomitra1-draco.glb");

function ContinuousSlides() {
  const containerRef = useRef(null);

  const slides = [
    {
      eyebrow: "THE PROBLEM",
      title: "Environmental data is invisible.",
      description:
        "Most emissions go unmeasured. Without visibility, meaningful climate action becomes guesswork.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=80",
      bg: "bg-white",
    },
    {
      eyebrow: "OUR TECHNOLOGY",
      title: "Real-world sensing, visualized.",
      description:
        "EcoMitra’s IoT sensors capture air quality and emissions in real time, represented through an interactive 3D model.",
      model: true,
      bg: "bg-slate-50",
    },
    {
      eyebrow: "THE INSIGHT",
      title: "From raw data to clarity.",
      description:
        "Clear dashboards transform complex measurements into daily, weekly, and monthly sustainability insights.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
      bg: "bg-white",
    },
    {
      eyebrow: "THE COMMUNITY",
      title: "Impact grows when shared.",
      description:
        "Individuals and organizations collaborate, compare progress, and amplify real environmental impact together.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80",
      bg: "bg-slate-50",
    },
  ];

  useGSAP(() => {
    const horizontal = containerRef.current.querySelector(".horizontal-container");
    const slidesEl = gsap.utils.toArray(".slide");
    const progressBar = containerRef.current.querySelector(".progress-bar");

    const totalWidth = horizontal.scrollWidth - window.innerWidth;

    const scrollTween = gsap.to(horizontal, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) =>
          gsap.set(progressBar, { scaleX: self.progress }),
      },
    });

    slidesEl.forEach((slide) => {
      const items = slide.querySelectorAll(".animate-in");

      ScrollTrigger.create({
        trigger: slide,
        containerAnimation: scrollTween,
        start: "left center",
        end: "right center",
        onEnter: () =>
          gsap.fromTo(
            items,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: "power3.out",
            }
          ),
        onLeave: () =>
          gsap.to(items, {
            opacity: 0,
            y: -20,
            duration: 0.4,
          }),
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="horizontal-container flex">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`slide h-screen w-screen flex-shrink-0 grid grid-cols-1 lg:grid-cols-2 items-center px-6 md:px-16 lg:px-28 ${slide.bg}`}
            >
              {/* TEXT */}
              <div className="max-w-xl">
                <p className="animate-in text-xs font-semibold tracking-widest text-emerald-600 uppercase">
                  {slide.eyebrow}
                </p>

                <h2 className="animate-in mt-3 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900">
                  {slide.title}
                </h2>

                <p className="animate-in mt-6 text-base md:text-lg text-gray-600 leading-relaxed">
                  {slide.description}
                </p>
              </div>

              {/* VISUAL */}
              <div className="flex items-center justify-center mt-12 lg:mt-0">
                <div className="animate-in h-[42vh] lg:h-[70vh] w-full max-w-xl rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden">
                  {slide.model ? (
                    <Canvas camera={{ position: [0, 0, 5], fov: 55 }}>
                      <Suspense fallback={null}>
                        <ambientLight intensity={0.3} />
                        <directionalLight position={[4, 6, 6]} intensity={0.9} />
                        <InteractiveModel />
                        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/pine_picnic_4k.hdr" />
                        <OrbitControls
                          enableZoom={false}
                          autoRotate
                          autoRotateSpeed={8}
                        />
                      </Suspense>
                    </Canvas>
                  ) : (
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="fixed bottom-0 left-0 w-full h-[2px] bg-gray-200">
        <div
          className="progress-bar h-full bg-emerald-600"
          style={{ transformOrigin: "left center", scaleX: 0 }}
        />
      </div>
    </section>
  );
}

export default ContinuousSlides;
