"use client";
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Torus,
  Cylinder,
  Box,
  Sphere,
  ContactShadows,
  MeshReflectorMaterial,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { EffectComposer, Bloom, Vignette, Noise, SSAO } from "@react-three/postprocessing";

const products = [
  {
    id: 1,
    name: "Palazzo Mono Faucet",
    category: "Basin Faucet",
    material: "Brushed Gold",
    finish: "PVD Coated",
    price: "₹ 28,500",
    desc: "Single-lever basin faucet with ceramic disc cartridge. Features a 360° swivel spout and aerator for water efficiency.",
    specs: ["Flow: 6 L/min", "Pressure: 1–10 bar", "Cartridge: Ceramic"],
    color: "#c9a85c",
  },
  {
    id: 2,
    name: "Aqua Rain Shower",
    category: "Overhead Shower",
    material: "Polished Chrome",
    finish: "Anti-tarnish",
    price: "₹ 42,000",
    desc: "300mm rain shower head with 120 silicone nozzles. Anti-limescale coating for effortless cleaning.",
    specs: ["Dia: 300mm", "Flow: 12 L/min", "Nozzles: 120"],
    color: "#4dd9ff",
  },
  {
    id: 3,
    name: "Vela Pull-Down Kitchen",
    category: "Kitchen Faucet",
    material: "Matte Black",
    finish: "PVD Nano-coating",
    price: "₹ 19,800",
    desc: "Pull-down kitchen faucet with dual spray mode. 360° rotation and magnetic docking system.",
    specs: ["Reach: 220mm", "Modes: 2", "Hose: 1.5m"],
    color: "#e8d5a3",
  },
];

// ── 3D Product Models ─────────────────────────────────────────────────────────
// ── HYPER-REALISTIC MATERIALS ────────────────────────────────────────────────
function PremiumMetalMat({ color }: { color: string }) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={1}
      roughness={0.12}
      clearcoat={1}
      clearcoatRoughness={0.1}
      envMapIntensity={2.5}
      reflectivity={1}
      iridescence={0.1}
      iridescenceIOR={1.5}
    />
  );
}

// ── 3D Product Models (Refined for Realism) ──────────────────────────────────
function ProductFaucet({ active, color }: { active: number; color: string }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.4;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  if (active === 1) {
    return (
      <group ref={groupRef}>
        {/* Main Body - Tapered for elegance */}
        <Cylinder args={[0.08, 0.12, 1.4, 64]} position={[0, 0, 0]}>
          <PremiumMetalMat color={color} />
        </Cylinder>
        {/* Spout - Curvature simulation */}
        <Cylinder args={[0.05, 0.05, 0.8, 64]} rotation={[0, 0, -Math.PI / 2.2]} position={[0.3, 0.45, 0]}>
          <PremiumMetalMat color={color} />
        </Cylinder>
        {/* Handle Hub */}
        <Sphere args={[0.09, 32, 32]} position={[0, 0.55, 0]}>
          <PremiumMetalMat color={color} />
        </Sphere>
        {/* Elegant Lever */}
        <Box args={[0.01, 0.02, 0.25]} position={[0, 0.58, 0.1]} rotation={[0.2, 0, 0]}>
          <PremiumMetalMat color={color} />
        </Box>
        {/* Base Ring */}
        <Cylinder args={[0.15, 0.15, 0.03, 64]} position={[0, -0.7, 0]}>
          <PremiumMetalMat color={color} />
        </Cylinder>
      </group>
    );
  }
  
  if (active === 2) {
    return (
      <group ref={groupRef}>
        {/* Rain Shower Head - Slim & Large */}
        <Cylinder args={[0.5, 0.5, 0.02, 128]} position={[0, 0, 0]}>
          <PremiumMetalMat color={color} />
        </Cylinder>
        {/* Nozzle plate (slightly darker) */}
        <Cylinder args={[0.48, 0.48, 0.01, 128]} position={[0, -0.01, 0]}>
          <meshStandardMaterial color="#111" roughness={0.8} />
        </Cylinder>
        {/* Connecting Arm */}
        <Cylinder args={[0.04, 0.04, 0.6, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.3]}>
          <PremiumMetalMat color={color} />
        </Cylinder>
        {/* Wall Flange */}
        <Cylinder args={[0.08, 0.08, 0.01, 64]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.6]}>
          <PremiumMetalMat color={color} />
        </Cylinder>
      </group>
    );
  }

  // default (3) — kitchen pull-down (Modern minimalist)
  return (
    <group ref={groupRef}>
      {/* Tall curved body */}
      <Torus args={[0.4, 0.05, 32, 100, Math.PI]} rotation={[0, 0, Math.PI / 2]} position={[0, 0.6, 0]}>
        <PremiumMetalMat color={color} />
      </Torus>
      <Cylinder args={[0.05, 0.07, 1.2, 64]} position={[-0.4, 0, 0]}>
        <PremiumMetalMat color={color} />
      </Cylinder>
      {/* Spray head */}
      <Cylinder args={[0.06, 0.04, 0.2, 64]} position={[0.4, 0.5, 0]}>
        <PremiumMetalMat color="#222" />
      </Cylinder>
      <Box args={[0.015, 0.15, 0.04]} position={[-0.45, 0.2, 0.08]} rotation={[0, 0, 0.2]}>
        <PremiumMetalMat color={color} />
      </Box>
      <Cylinder args={[0.12, 0.12, 0.02, 64]} position={[-0.4, -0.6, 0]}>
        <PremiumMetalMat color={color} />
      </Cylinder>
    </group>
  );
}


function ShowcaseScene({ active }: { active: number }) {
  const c = products[active - 1]?.color ?? "#c9a85c";
  return (
    <>
      {/* Cinematic Studio Lighting */}
      <ambientLight intensity={0.1} />
      
      {/* Key Light */}
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={2.5} 
        color="#ffffff" 
        castShadow 
        shadow-mapSize={1024}
      />
      
      {/* Fill Light (Warm) */}
      <pointLight position={[-5, 3, 2]} intensity={2.5} color={c} />
      
      {/* Rim Light (Cool) */}
      <pointLight position={[3, -2, -3]} intensity={1.5} color="#4dd9ff" />
      
      {/* Accent Top Light */}
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={3} color="#ffffff" />

      {/* High-quality Environment for reflections */}
      <Environment preset="apartment" environmentIntensity={1.5} />

      <Float speed={1.5} floatIntensity={0.3} rotationIntensity={0.2}>
        <ProductFaucet active={active} color={c} />
      </Float>

      {/* Reflective Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={60}
          roughness={0.1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#05050a"
          metalness={0.9}
          mirror={1}
        />
      </mesh>

      <ContactShadows position={[0, -1.19, 0]} opacity={0.7} scale={8} blur={2.5} far={1.5} color="#000000" />

      {/* Cinematic Post-Processing */}
      <EffectComposer multisampling={8} enableNormalPass>
        <SSAO radius={0.1} intensity={1.5} luminanceInfluence={0.5} color="#000000" />
        <Bloom intensity={0.5} luminanceThreshold={0.8} luminanceSmoothing={0.9} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        <Noise opacity={0.015} />
      </EffectComposer>
    </>
  );
}



export default function ProductShowcase() {
  const [active, setActive] = useState(1);
  const current = products.find((p) => p.id === active)!;

  return (
    <section id="showcase" className="relative py-32 overflow-hidden" style={{ background: "#0e0e18" }}>
      {/* Top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,92,0.4), transparent)" }}
      />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="section-label mb-4">Interactive Showcase</div>
          <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#f0ede8" }}>
            Explore in{" "}
            <span className="text-gold-gradient italic">360°</span>
          </h2>
        </motion.div>

        {/* Main showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[480px] rounded-sm overflow-hidden glass"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Corner decorations */}
            {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-4 h-4 pointer-events-none`}
                style={{
                  borderTop: i < 2 ? "1px solid rgba(201,168,92,0.4)" : "none",
                  borderBottom: i >= 2 ? "1px solid rgba(201,168,92,0.4)" : "none",
                  borderLeft: i % 2 === 0 ? "1px solid rgba(201,168,92,0.4)" : "none",
                  borderRight: i % 2 === 1 ? "1px solid rgba(201,168,92,0.4)" : "none",
                }}
              />
            ))}

            <Canvas
              camera={{ position: [0, 0.3, 3.5], fov: 50 }}
              dpr={[1, 2]} // Support high-DPI displays
              gl={{ 
                antialias: true, 
                alpha: false, 
                powerPreference: "high-performance",
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.2
              }}
              shadows
            >
              <Suspense fallback={null}>
                <ShowcaseScene active={active} />
              </Suspense>
            </Canvas>

            {/* Hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <div className="w-4 h-4 border rounded-full border-white/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              </div>
              <span className="text-[10px] tracking-widest uppercase" style={{ color: "#5a5550" }}>
                Auto-rotating
              </span>
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Product selector */}
            <div className="flex gap-3 mb-10">
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  className="text-[10px] tracking-widest uppercase py-2 px-4 rounded-sm transition-all duration-300"
                  style={{
                    border: `1px solid ${active === p.id ? p.color : "rgba(255,255,255,0.08)"}`,
                    color: active === p.id ? p.color : "#5a5550",
                    background: active === p.id ? `${p.color}12` : "transparent",
                  }}
                >
                  {String(p.id).padStart(2, "0")}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Category badge */}
                <div
                  className="inline-block text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                  style={{
                    background: `${current.color}15`,
                    border: `1px solid ${current.color}30`,
                    color: current.color,
                  }}
                >
                  {current.category}
                </div>

                <h3 className="font-display text-4xl md:text-5xl font-light mb-3" style={{ color: "#f0ede8" }}>
                  {current.name}
                </h3>

                <div className="flex gap-4 mb-6">
                  <span className="text-xs" style={{ color: "#5a5550" }}>
                    Material: <span style={{ color: "#9a9490" }}>{current.material}</span>
                  </span>
                  <span className="text-xs" style={{ color: "#5a5550" }}>
                    Finish: <span style={{ color: "#9a9490" }}>{current.finish}</span>
                  </span>
                </div>

                <p className="text-sm font-light leading-relaxed mb-8 max-w-sm" style={{ color: "#9a9490" }}>
                  {current.desc}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {current.specs.map((spec) => (
                    <div
                      key={spec}
                      className="text-center py-3 rounded-sm"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span className="text-[11px]" style={{ color: current.color }}>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center gap-6 mb-8">
                  <div>
                    <div className="text-xs tracking-widest uppercase mb-1" style={{ color: "#5a5550" }}>
                      Starting at
                    </div>
                    <div className="font-display text-3xl font-light" style={{ color: "#f0ede8" }}>
                      {current.price}
                    </div>
                  </div>
                  <div
                    className="w-px h-10 self-center"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />
                  <div className="text-xs" style={{ color: "#5a5550" }}>
                    *Inclusive of all taxes
                    <br />
                    Free delivery pan India
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="btn-gold rounded-sm flex-1">Add to Quote</button>
                  <button className="btn-outline rounded-sm px-5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
