"use client";
import { useRef, useState } from "react";
import { motion, useInView, type Variants, useMotionValue, useSpring, useTransform } from "framer-motion";

const categories = [
  {
    id: "01",
    name: "Basin & Sink Faucets",
    sub: "Single & Dual Handle",
    count: "48 Products",
    gradient: "from-[#1a1a28] to-[#0e0e18]",
    accent: "#c9a85c",
    icon: "⬡",
  },
  {
    id: "02",
    name: "Shower Systems",
    sub: "Rain, Handheld & Thermostatic",
    count: "62 Products",
    gradient: "from-[#1a2028] to-[#0e0e18]",
    accent: "#4dd9ff",
    icon: "◈",
  },
  {
    id: "03",
    name: "Bath Tubs & Fillers",
    sub: "Freestanding & Built-in",
    count: "34 Products",
    gradient: "from-[#201a28] to-[#0e0e18]",
    accent: "#b89aff",
    icon: "◉",
  },
  {
    id: "04",
    name: "Kitchen Faucets",
    sub: "Pull-down & Commercial",
    count: "55 Products",
    gradient: "from-[#1a2820] to-[#0e0e18]",
    accent: "#85ffb4",
    icon: "⬢",
  },
  {
    id: "05",
    name: "Door Hardware",
    sub: "Handles, Locks & Hinges",
    count: "120 Products",
    gradient: "from-[#28201a] to-[#0e0e18]",
    accent: "#ffc285",
    icon: "◆",
  },
  {
    id: "06",
    name: "Bathroom Accessories",
    sub: "Towel Rails, Hooks & Rings",
    count: "95 Products",
    gradient: "from-[#28281a] to-[#0e0e18]",
    accent: "#e8d5a3",
    icon: "◇",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariant: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function CategoryCard({ cat, index }: { cat: typeof categories[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariant}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      className={`relative overflow-hidden cursor-none rounded-sm group bg-gradient-to-br ${cat.gradient}`}
    >
      {/* 3D Depth Layer */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: "translateZ(50px)",
          background: "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Hover shimmer */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shimmer"
      />
      {/* Accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${cat.accent}40, transparent)` }}
      />
      <div
        className="absolute top-0 left-0 w-16 h-px group-hover:w-full transition-all duration-700"
        style={{ background: cat.accent }}
      />

      <div className="p-8 md:p-10" style={{ transform: "translateZ(30px)" }}>
        {/* ID + icon */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-[10px] tracking-[0.35em] uppercase" style={{ color: cat.accent }}>
            {cat.id}
          </span>
          <span className="text-2xl" style={{ color: cat.accent, transform: "translateZ(40px)" }}>
            {cat.icon}
          </span>
        </div>

        {/* Content */}
        <h3 className="font-display text-2xl font-light mb-2" style={{ color: "#f0ede8" }}>
          {cat.name}
        </h3>
        <p className="text-xs mb-6" style={{ color: "#5a5550" }}>
          {cat.sub}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono" style={{ color: cat.accent }}>
            {cat.count}
          </span>
          <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
            <span className="text-[10px] tracking-widest uppercase" style={{ color: "#5a5550" }}>
              View
            </span>
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
              <path d="M0 4H14M11 1L14 4L11 7" stroke={cat.accent} strokeWidth="0.8" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductCategories() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="relative py-32 px-8 md:px-16 lg:px-24" style={{ background: "#0a0a0f", perspective: "1000px" }}>
      {/* Background decoration */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,92,0.3), transparent)" }}
      />

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="section-label mb-5">Product Universe</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="font-display text-5xl md:text-7xl font-light max-w-lg"
              style={{ color: "#f0ede8" }}
            >
              Every Detail,
              <br />
              <span className="text-gold-gradient italic">Perfected</span>
            </h2>
            <p className="max-w-sm text-sm font-light leading-relaxed" style={{ color: "#9a9490" }}>
              From the moment you turn a handle to the sensation of water — each product
              in our collection is a statement of refined living.
            </p>
          </div>

          <div className="divider-gold mt-10" />
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((cat, index) => (
            <CategoryCard key={cat.id} cat={cat} index={index} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 text-center"
        >
          <a href="#" className="btn-outline rounded-sm inline-block">
            View All 500+ Products
          </a>
        </motion.div>
      </div>
    </section>
  );
}
