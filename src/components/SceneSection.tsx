"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Torus, Cylinder, Float, Stars, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";

// ── Ambient 3D scene ──────────────────────────────────────────────────────────
function BathroomScene() {
  const group = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[3, 4, 2]} intensity={2} color="#c9a85c" />
      <pointLight position={[-3, -2, 1]} intensity={1.2} color="#4dd9ff" />
      <Environment preset="studio" />
      <Stars radius={40} depth={20} count={400} factor={1} fade speed={0.3} />

      <group ref={group}>
        {/* Large torus ring */}
        <Torus args={[1.8, 0.04, 16, 120]} rotation={[Math.PI / 4, 0, 0]}>
          <meshStandardMaterial color="#c9a85c" metalness={0.99} roughness={0.05} envMapIntensity={3} />
        </Torus>
        <Torus args={[1.4, 0.02, 16, 120]} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
          <meshStandardMaterial color="#c4c4c4" metalness={1} roughness={0.02} envMapIntensity={3} />
        </Torus>
        <Torus args={[1.0, 0.03, 16, 100]} rotation={[-Math.PI / 5, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#8b5cf6" metalness={0.9} roughness={0.1} envMapIntensity={2} />
        </Torus>

        {/* Center sphere */}
        <Float speed={1} floatIntensity={0.5}>
          <Sphere args={[0.35, 64, 64]}>
            <MeshDistortMaterial
              color="#1a1a3a"
              distort={0.4}
              speed={2}
              roughness={0}
              metalness={0.9}
              envMapIntensity={3}
            />
          </Sphere>
        </Float>

        {/* Satellite cylinders */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <Cylinder
              key={i}
              args={[0.025, 0.025, 0.6, 12]}
              position={[Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 0]}
              rotation={[0, 0, angle + Math.PI / 2]}
            >
              <meshStandardMaterial color="#c9a85c" metalness={0.99} roughness={0.06} envMapIntensity={2} />
            </Cylinder>
          );
        })}
      </group>
    </>
  );
}

// ── Scene highlights ──────────────────────────────────────────────────────────
const scenes = [
  {
    title: "Master Bathroom",
    desc: "A sanctuary of calm. Freestanding tubs, wall-mounted faucets, and rain showers that transform your daily ritual into a luxury spa experience.",
    tag: "Bathroom Collection",
    stats: ["Freestanding Baths", "Wall-mount Faucets", "Heated Floors"],
  },
  {
    title: "Chef's Kitchen",
    desc: "Professional-grade fixtures meet elegant design. Pull-down sprayers, pot fillers, and commercial-style faucets built for the modern culinary studio.",
    tag: "Kitchen Collection",
    stats: ["Pull-down Faucets", "Pot Fillers", "Bar Sinks"],
  },
  {
    title: "Open Shower",
    desc: "Frameless glass enclosures with multi-function shower systems. Digital thermostatic controls for the perfect temperature, every time.",
    tag: "Shower Collection",
    stats: ["Thermostatic Control", "Body Jets", "Rain Ceiling"],
  },
];

export default function SceneSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden" style={{ background: "#060610" }}>
      {/* Ambient 3D Canvas — pinned behind */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 60 }}
          dpr={1}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <BathroomScene />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, rgba(6,6,16,0.85) 80%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="section-label mb-5">Room by Room</div>
          <h2 className="font-display text-5xl md:text-7xl font-light" style={{ color: "#f0ede8" }}>
            Build Your{" "}
            <span className="text-gold-gradient italic">Dream Space</span>
          </h2>
        </motion.div>

        {/* Scene cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {scenes.map((scene, i) => (
            <motion.div
              key={scene.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, y: -6 }}
              className="glass glass-hover rounded-sm p-8 relative overflow-hidden group cursor-none"
            >
              {/* Number watermark */}
              <div
                className="absolute -top-4 -right-2 font-display text-[90px] font-light opacity-[0.04] pointer-events-none select-none"
                style={{ color: "#c9a85c" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Top accent */}
              <div
                className="w-0 h-px mb-6 group-hover:w-12 transition-all duration-500"
                style={{ background: "#c9a85c" }}
              />
              <div
                className="text-[10px] tracking-[0.3em] uppercase mb-3"
                style={{ color: "#c9a85c" }}
              >
                {scene.tag}
              </div>

              <h3 className="font-display text-3xl font-light mb-4" style={{ color: "#f0ede8" }}>
                {scene.title}
              </h3>
              <p className="text-sm font-light leading-relaxed mb-8" style={{ color: "#9a9490" }}>
                {scene.desc}
              </p>

              {/* Feature list */}
              <div className="flex flex-col gap-2">
                {scene.stats.map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full" style={{ background: "#c9a85c" }} />
                    <span className="text-xs" style={{ color: "#5a5550" }}>{s}</span>
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div className="mt-8 flex items-center gap-2">
                <span className="text-[10px] tracking-widest uppercase" style={{ color: "#5a5550" }}>
                  Shop Now
                </span>
                <svg
                  width="20"
                  height="8"
                  viewBox="0 0 20 8"
                  className="translate-x-0 group-hover:translate-x-2 transition-transform duration-300"
                >
                  <path d="M0 4H18M15 1L18 4L15 7" stroke="#c9a85c" strokeWidth="0.8" fill="none" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
