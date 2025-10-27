// src/components/RippleImage.jsx
import React, { useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// ✅ Ripple Shader
const RippleMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uTime: 0,
    uHover: 0,
    uMouse: new THREE.Vector2(0, 0),
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float dist = distance(uv, uMouse);
    pos.z += sin(dist * 25.0 - uTime * 3.0) * 0.03 * uHover;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  // Fragment Shader
  `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uHover;

  void main() {
    vec4 textureColor = texture2D(uTexture, vUv);
    gl_FragColor = textureColor + vec4(0.1 * uHover, 0.1 * uHover, 0.1 * uHover, 0.0);
  }
  `
);

extend({ RippleMaterial });

const RippleImagePlane = ({ src }) => {
  const materialRef = useRef();
  const texture = useTexture(src);

  useFrame((_, delta) => {
    if (materialRef.current) materialRef.current.uTime += delta;
  });

  return (
    <mesh
      onPointerMove={(e) => {
        if (materialRef.current) materialRef.current.uMouse = e.uv;
      }}
      onPointerEnter={() => {
        gsap.to(materialRef.current, { uHover: 1, duration: 0.5 });
      }}
      onPointerLeave={() => {
        gsap.to(materialRef.current, { uHover: 0, duration: 0.5 });
      }}
    >
      {/* ✅ Square plane: width = height */}
      <planeGeometry args={[3, 3, 64, 64]} />
      <rippleMaterial ref={materialRef} uTexture={texture} />
    </mesh>
  );
};

const RippleImage = ({ src }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 1.5] }}
      gl={{ preserveDrawingBuffer: true }}
      style={{
        width: "100%",
        height: "100%", // fill viewport
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        objectFit: "cover",
        cursor: "crosshair"
      }}
    >
      <ambientLight intensity={1} />
      <RippleImagePlane src={src} />
    </Canvas>
  );
};

export default RippleImage;
