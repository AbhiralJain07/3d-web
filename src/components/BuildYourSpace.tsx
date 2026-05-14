"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Consult",
    desc: "Schedule a 1-on-1 session with our design experts. Share your vision, preferences, and budget.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Design",
    desc: "Our curators handpick products that harmonize with your space — creating a cohesive palette.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Visualize",
    desc: "Experience your space in immersive 3D before a single product ships. Refine until perfect.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Install",
    desc: "White-glove delivery and certified installation by our expert technicians across India.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

const materials = [
  { name: "Brushed Gold", hex: "#c9a85c" },
  { name: "Polished Chrome", hex: "#c4c4c4" },
  { name: "Matte Black", hex: "#1a1a1a" },
  { name: "Rose Gold", hex: "#b5728a" },
  { name: "Gunmetal", hex: "#3a3a3a" },
  { name: "Antique Bronze", hex: "#7a5c3a" },
];

export default function BuildYourSpace() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeMaterial, setActiveMaterial] = useState(0);

  return (
    <section id="studio" className="relative py-32 overflow-hidden" style={{ background: "#0e0e18" }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="section-label mb-5">The Studio Process</div>
          <h2 className="font-display text-5xl md:text-7xl font-light max-w-3xl mx-auto" style={{ color: "#f0ede8" }}>
            Design Your Space,
            <br />
            <span className="text-gold-gradient italic">From Concept to Chrome</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                e.currentTarget.style.setProperty("--rx", `${y * -12}deg`);
                e.currentTarget.style.setProperty("--ry", `${x * 12}deg`);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.setProperty("--rx", "0deg");
                e.currentTarget.style.setProperty("--ry", "0deg");
              }}
              className="relative group cursor-none transition-transform duration-200 ease-out"
              style={{
                transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Connector line */}
              {i < 3 && (
                <div
                  className="absolute top-6 left-[calc(100%+0px)] w-6 h-px hidden lg:block"
                  style={{ background: "linear-gradient(90deg, rgba(201,168,92,0.4), transparent)" }}
                />
              )}

              <div
                className="rounded-sm p-8 h-full glass-hover"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {/* Number */}
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="font-display text-4xl font-light opacity-20"
                    style={{ color: "#c9a85c" }}
                  >
                    {step.n}
                  </span>
                  <span style={{ color: "#c9a85c" }}>{step.icon}</span>
                </div>

                <h3 className="font-display text-2xl font-light mb-3" style={{ color: "#f0ede8" }}>
                  {step.title}
                </h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: "#9a9490" }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Material picker */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="rounded-sm p-10 md:p-14"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Left */}
            <div className="flex-1">
              <div className="section-label mb-4">Material Studio</div>
              <h3 className="font-display text-4xl font-light mb-4" style={{ color: "#f0ede8" }}>
                Choose Your Finish
              </h3>
              <p className="text-sm font-light leading-relaxed mb-8 max-w-sm" style={{ color: "#9a9490" }}>
                Every finish tells a different story. Select your preferred material and
                see it come alive across our collection.
              </p>
              <a href="#contact" className="btn-gold rounded-sm inline-block">Start Designing</a>
            </div>

            {/* Right — swatches */}
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-4">
                {materials.map((mat, i) => (
                  <button
                    key={mat.name}
                    onClick={() => setActiveMaterial(i)}
                    className="group cursor-none flex flex-col gap-3"
                  >
                    {/* Swatch */}
                    <div
                      className="w-full h-16 rounded-sm transition-all duration-300"
                      style={{
                        background: `radial-gradient(ellipse at 30% 30%, ${mat.hex}cc, ${mat.hex}88)`,
                        border: activeMaterial === i
                          ? "2px solid rgba(201,168,92,0.6)"
                          : "1px solid rgba(255,255,255,0.06)",
                        boxShadow: activeMaterial === i
                          ? `0 0 20px ${mat.hex}30`
                          : "none",
                        transform: activeMaterial === i ? "scale(1.04)" : "scale(1)",
                      }}
                    />
                    <span
                      className="text-[10px] text-center"
                      style={{ color: activeMaterial === i ? "#c9a85c" : "#5a5550" }}
                    >
                      {mat.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Selected material */}
              <div
                className="mt-6 px-4 py-3 rounded-sm flex items-center gap-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div
                  className="w-6 h-6 rounded-full flex-shrink-0"
                  style={{
                    background: `radial-gradient(ellipse at 30% 30%, ${materials[activeMaterial].hex}dd, ${materials[activeMaterial].hex}88)`,
                  }}
                />
                <div>
                  <div className="text-xs font-medium" style={{ color: "#f0ede8" }}>
                    {materials[activeMaterial].name}
                  </div>
                  <div className="text-[10px]" style={{ color: "#5a5550" }}>
                    PVD Coated · 10-Year Warranty
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
