"use client";
import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  MeshReflectorMaterial,
  RoundedBox,
  Cylinder,
  ContactShadows,
  Float,
  Box,
  Sphere,
  Torus,
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer, DepthOfField, Noise, Vignette, N8AO } from "@react-three/postprocessing";

gsap.registerPlugin(ScrollTrigger);

// ── PHOTOREALISTIC MATERIALS ──────────────────────────────────────────────────

// Ultra-realistic Brushed Gold PBR Material
function BrushedGoldMat() {
  return (
    <meshStandardMaterial
      color="#d4af37"
      metalness={1.0}
      roughness={0.12}
      envMapIntensity={2.5}
    />
  );
}

// Matte Black PBR Material for accents
function MatteBlackMat() {
  return (
    <meshStandardMaterial
      color="#151515"
      metalness={0.4}
      roughness={0.7}
      envMapIntensity={1.0}
    />
  );
}

// ── HYPER-REALISTIC FAUCET ASSEMBLY ───────────────────────────────────────────
function RealisticFaucet({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!);

  return (
    <group position={position} ref={groupRef} castShadow receiveShadow>
      {/* Base Escutcheon (Ring) */}
      <Cylinder args={[0.07, 0.07, 0.015, 64]} position={[0, 0.0075, 0]} castShadow receiveShadow>
        <BrushedGoldMat />
      </Cylinder>
      
      {/* Main Vertical Pillar */}
      <Cylinder args={[0.045, 0.045, 0.45, 64]} position={[0, 0.23, 0]} castShadow receiveShadow>
        <BrushedGoldMat />
      </Cylinder>

      {/* Knurled/Textured Collar (simulated with matte black) */}
      <Cylinder args={[0.046, 0.046, 0.04, 64]} position={[0, 0.47, 0]} castShadow receiveShadow>
        <MatteBlackMat />
      </Cylinder>

      {/* Handle Cap */}
      <Cylinder args={[0.045, 0.045, 0.03, 64]} position={[0, 0.505, 0]} castShadow receiveShadow>
        <BrushedGoldMat />
      </Cylinder>

      {/* Lever/Handle (Slim, elegant flat bar) */}
      <RoundedBox args={[0.015, 0.015, 0.18]} radius={0.005} position={[0, 0.505, 0.1]} castShadow receiveShadow>
        <BrushedGoldMat />
      </RoundedBox>

      {/* Spout Connection/Elbow */}
      <group position={[0, 0.32, 0.045]}>
        {/* Horizontal Spout Body */}
        <Cylinder args={[0.018, 0.018, 0.26, 64]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.13]} castShadow receiveShadow>
          <BrushedGoldMat />
        </Cylinder>
        
        {/* Downward Curve Tip */}
        <Cylinder args={[0.018, 0.016, 0.08, 64]} rotation={[Math.PI / 2 + 0.35, 0, 0]} position={[0, -0.012, 0.285]} castShadow receiveShadow>
          <BrushedGoldMat />
        </Cylinder>

        {/* Aerator (Dark inner part) */}
        <Cylinder args={[0.012, 0.012, 0.01, 32]} rotation={[Math.PI / 2 + 0.35, 0, 0]} position={[0, -0.045, 0.298]}>
          <meshStandardMaterial color="#000" roughness={0.8} />
        </Cylinder>
      </group>

      {/* Orbiting Glass Rings for "Tech/Luxury" feel */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <group rotation={[Math.PI / 3, 0.4, 0]}>
          <Torus args={[0.6, 0.005, 16, 100]}>
            <meshStandardMaterial color="#c9a85c" transparent opacity={0.3} />
          </Torus>
          <Torus args={[0.7, 0.003, 16, 100]} rotation={[Math.PI / 2, 0.5, 0]}>
            <meshStandardMaterial color="#4dd9ff" transparent opacity={0.2} />
          </Torus>
        </group>
      </Float>
    </group>
  );
}

// ── REALISTIC SOAP DISPENSER (ACCESSORY) ──────────────────────────────────────
function SoapDispenser({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Glass Bottle Body */}
      <Cylinder args={[0.06, 0.06, 0.18, 64]} position={[0, 0.09, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial 
          color="#1a1a1a" 
          metalness={0.1} 
          roughness={0.1} 
          transmission={0.8} 
          thickness={0.5} 
          ior={1.5} 
          envMapIntensity={2} 
        />
      </Cylinder>

      {/* Pump Base */}
      <Cylinder args={[0.062, 0.062, 0.02, 64]} position={[0, 0.19, 0]} castShadow receiveShadow>
        <BrushedGoldMat />
      </Cylinder>

      {/* Pump Mechanism */}
      <Cylinder args={[0.015, 0.015, 0.04, 32]} position={[0, 0.21, 0]} castShadow receiveShadow>
        <BrushedGoldMat />
      </Cylinder>

      {/* Pump Head */}
      <RoundedBox args={[0.025, 0.02, 0.1]} radius={0.008} position={[0, 0.23, 0.03]} castShadow receiveShadow>
        <BrushedGoldMat />
      </RoundedBox>
    </group>
  );
}

// ── ARCHITECTURAL ENVIRONMENT ─────────────────────────────────────────────────
function VanityEnvironment() {
  return (
    <group>
      {/* Dark Marble Countertop */}
      <RoundedBox args={[4, 0.15, 2]} radius={0.02} smoothness={4} position={[0, -0.075, 0]} receiveShadow>
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={80}
          roughness={0.15}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0a0c"
          metalness={0.6}
          mirror={0}
        />
      </RoundedBox>

      {/* Back Wall */}
      <Box args={[6, 4, 0.2]} position={[0, 2, -0.8]} receiveShadow>
        <meshStandardMaterial color="#08080a" roughness={0.9} metalness={0.1} />
      </Box>

      {/* Subtle Floating Dust/Light Particles to add atmosphere */}
      <Float speed={2} floatIntensity={0.5} rotationIntensity={0.5} position={[0.5, 0.8, 0.5]}>
        <Sphere args={[0.005, 16, 16]}><meshBasicMaterial color="#ffffff" transparent opacity={0.6} /></Sphere>
      </Float>
      <Float speed={1.5} floatIntensity={0.8} rotationIntensity={0.5} position={[-0.8, 0.5, 0.2]}>
        <Sphere args={[0.004, 16, 16]}><meshBasicMaterial color="#c9a85c" transparent opacity={0.4} /></Sphere>
      </Float>
    </group>
  );
}

// ── GSAP CAMERA RIG ───────────────────────────────────────────────────────────
function CameraRig() {
  const { camera, mouse } = useThree();
  const targetPos = useRef(new THREE.Vector3(0.6, 0.4, 0.8));
  
  useLayoutEffect(() => {
    // Initial cinematic close-up position
    camera.position.set(0.6, 0.4, 0.8);
    camera.lookAt(0, 0.25, 0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
      onUpdate: () => {
        // We'll let the scroll trigger handle the base position
      }
    });

    tl.to(camera.position, {
      x: -1.2,
      y: 0.6,
      z: 1.8,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [camera]);

  useFrame((state) => {
    // Subtle mouse parallax for "3D" depth feel
    const t = state.clock.getElapsedTime();
    
    // Add mouse influence to camera position
    camera.position.x += (mouse.x * 0.2 - (camera.position.x - targetPos.current.x)) * 0.02;
    camera.position.y += (-mouse.y * 0.2 - (camera.position.y - targetPos.current.y)) * 0.02;

    // Constantly keep focus on the faucet body
    camera.lookAt(0, 0.25, 0);
  });

  return null;
}

// ── SCENE COMPOSITION ─────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <CameraRig />
      
      {/* Photorealistic Soft Shadows are now handled natively by Three.js r184+ PCFShadowMap */}
      
      {/* HDRI Environment (City provides excellent sharp reflections for metal) */}
      <Environment preset="city" environmentIntensity={1.2} />
      
      {/* Dramatic Studio Lighting */}
      {/* Key Light (Warm, casts soft shadow) */}
      <directionalLight position={[2, 5, 2]} intensity={2.5} color="#fff1e0" castShadow shadow-mapSize={2048} shadow-bias={-0.0001} />
      {/* Fill Light (Cool, soft) */}
      <directionalLight position={[-4, 3, 2]} intensity={1.0} color="#e0f0ff" />
      {/* Rim Light (Bright, highlights metal edges from behind) */}
      <directionalLight position={[0, 4, -3]} intensity={3.5} color="#ffffff" />
      
      {/* Ambient Fill */}
      <ambientLight intensity={0.15} />

      {/* Objects */}
      <RealisticFaucet position={[0, 0, 0]} />
      <SoapDispenser position={[-0.45, 0, 0.15]} />
      <VanityEnvironment />

      {/* Ground Contact Shadows for extreme realism grounding */}
      <ContactShadows position={[0, 0.001, 0]} opacity={0.6} scale={2} blur={1.5} far={0.5} color="#000000" />

      {/* ── CINEMATIC POST-PROCESSING ── */}
      {/* N8AO provides highly realistic Ambient Occlusion (crevice shadows) */}
      <EffectComposer multisampling={4}>
        <N8AO aoRadius={0.1} intensity={1.5} />
        {/* Depth of Field blurs the background wall and focuses perfectly on the faucet */}
        <DepthOfField focusDistance={0.02} focalLength={0.04} bokehScale={4} height={480} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.05} darkness={1.2} />
      </EffectComposer>
    </>
  );
}

// ── HERO SECTION ──────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen" // Reduced to single viewport height
      style={{ background: "#08080a" }}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 overflow-hidden">
        <Canvas
          dpr={1}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.0, // Photorealistic exposure
          }}
          shadows
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>

        {/* Cinematic Black Gradients for Text Integration */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(8,8,10,0.85) 0%, rgba(8,8,10,0.2) 50%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #08080a 0%, transparent 20%)",
          }}
        />

        {/* ── UI CONTENT ── */}
        <div className="absolute inset-0 pointer-events-none flex items-center px-8 md:px-16 lg:px-24">
          <div className="max-w-[1400px] w-full mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 pointer-events-auto"
            >
              <div className="section-label flex items-center gap-3">
                <span className="w-8 h-px" style={{ background: "#c9a85c" }} />
                <span className="tracking-[0.3em] text-[#c9a85c] text-xs">AURELIA COLLECTION</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl md:text-8xl lg:text-[110px] font-light leading-[0.9] mb-8 max-w-3xl pointer-events-auto"
              style={{ color: "#ffffff" }}
            >
              Engineering
              <br />
              <span className="text-gold-gradient italic">Elegance</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base font-light leading-relaxed mb-12 max-w-md pointer-events-auto"
              style={{ color: "#a0a0a0" }}
            >
              Discover architectural masterpieces crafted for the world's most discerning clientele. Where raw materials meet visionary precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
            >
              <a href="#products" className="btn-gold rounded-sm inline-block text-center backdrop-blur-md">
                View Collection
              </a>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-8 md:left-16 lg:left-24 flex items-center gap-3 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, #c9a85c, transparent)" }}
          />
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "#5a5550" }}>
            Scroll to Experience
          </span>
        </motion.div>
      </div>
    </section>
  );
}
