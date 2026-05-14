"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

const brands = [
  { name: "Grohe", country: "Germany", tier: "Premium" },
  { name: "Hansgrohe", country: "Germany", tier: "Luxury" },
  { name: "Kohler", country: "USA", tier: "Premium" },
  { name: "Roca", country: "Spain", tier: "Premium" },
  { name: "American Standard", country: "USA", tier: "Classic" },
  { name: "Jaquar", country: "India", tier: "Premium" },
  { name: "Duravit", country: "Germany", tier: "Luxury" },
  { name: "Villeroy & Boch", country: "Germany", tier: "Luxury" },
  { name: "Toto", country: "Japan", tier: "Smart" },
  { name: "Delta", country: "USA", tier: "Classic" },
  { name: "Moen", country: "USA", tier: "Premium" },
  { name: "Geberit", country: "Switzerland", tier: "Smart" },
];

const tierColors: Record<string, string> = {
  Luxury: "#c9a85c",
  Premium: "#4dd9ff",
  Classic: "#9a9490",
  Smart: "#85ffb4",
};

export default function BrandPartners() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="brands" className="relative py-32 overflow-hidden" style={{ background: "#0a0a0f" }}>
      {/* Decorative lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,92,0.2), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,92,0.2), transparent)" }}
      />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <div className="section-label mb-4">Trusted Partners</div>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#f0ede8" }}>
              World-Class
              <br />
              <span className="text-gold-gradient italic">Brand Partners</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm font-light leading-relaxed" style={{ color: "#9a9490" }}>
            We partner exclusively with brands that share our commitment to
            precision engineering and timeless design.
          </p>
        </motion.div>

        {/* Brand grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                e.currentTarget.style.setProperty("--rx", `${y * -15}deg`);
                e.currentTarget.style.setProperty("--ry", `${x * 15}deg`);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.setProperty("--rx", "0deg");
                e.currentTarget.style.setProperty("--ry", "0deg");
              }}
              className="group cursor-none relative overflow-hidden rounded-sm p-6 flex flex-col justify-between transition-transform duration-200 ease-out"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                minHeight: "110px",
                transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm"
                style={{ background: `radial-gradient(ellipse at center, ${tierColors[brand.tier]}08, transparent 70%)` }}
              />

              {/* Tier badge */}
              <div
                className="inline-block self-start text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full mb-4"
                style={{
                  background: `${tierColors[brand.tier]}12`,
                  border: `1px solid ${tierColors[brand.tier]}25`,
                  color: tierColors[brand.tier],
                }}
              >
                {brand.tier}
              </div>

              {/* Brand name */}
              <div>
                <div
                  className="font-display text-lg font-light mb-1 group-hover:text-white transition-colors duration-300"
                  style={{ color: "#e0ddd8" }}
                >
                  {brand.name}
                </div>
                <div className="text-[10px] tracking-widest uppercase" style={{ color: "#3a3a3a" }}>
                  {brand.country}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scrolling ticker */}
        <div className="relative overflow-hidden py-6" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <motion.div
            animate={{ x: [0, -50 + "%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...brands, ...brands].map((b, i) => (
              <span
                key={i}
                className="font-display text-2xl font-light opacity-10 select-none"
                style={{ color: "#f0ede8" }}
              >
                {b.name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
