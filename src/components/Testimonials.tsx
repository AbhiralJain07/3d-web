"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const testimonials = [
  {
    quote:
      "The Palazzo faucet collection transformed our hotel bathrooms completely. The quality and finish exceeded every expectation. Our guests consistently remark on the premium feel.",
    author: "Arjun Mehta",
    role: "Director of Design, The Oberoi Group",
    rating: 5,
    project: "5-Star Hotel Renovation · Mumbai",
  },
  {
    quote:
      "LUXE Hardware's curation is unmatched. The design consultation process was seamless and the 3D visualization helped us make confident decisions for our flagship penthouse project.",
    author: "Priya Nair",
    role: "Principal Architect, Studio Nair",
    rating: 5,
    project: "Luxury Penthouse · Bangalore",
  },
  {
    quote:
      "From handles to heated shower systems — every product we sourced from LUXE was delivered flawlessly. The white-glove installation service was a game changer.",
    author: "Vikram Sharma",
    role: "Owner, Villa Royale Estates",
    rating: 5,
    project: "Private Villa · Goa",
  },
  {
    quote:
      "We've worked with many hardware suppliers over 20 years. LUXE is in a category of its own. The brands they curate and the service they provide is simply world-class.",
    author: "Kavita Reddy",
    role: "Interior Designer, KR Interiors",
    rating: 5,
    project: "Corporate Headquarters · Hyderabad",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#c9a85c">
          <path d="M6 0.5L7.35 4.45H11.5L8.1 6.85L9.5 11L6 8.6L2.5 11L3.9 6.85L0.5 4.45H4.65L6 0.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  const current = testimonials[active];

  return (
    <section className="relative py-32 overflow-hidden" style={{ background: "#060610" }}>
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,92,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,92,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="section-label mb-5">Client Stories</div>
          <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#f0ede8" }}>
            Spaces That{" "}
            <span className="text-gold-gradient italic">Speak</span>
          </h2>
        </motion.div>

        {/* Testimonial carousel */}
    <div 
      ref={ref} 
      className="max-w-4xl mx-auto"
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        ref.current.style.setProperty("--rx", `${y * -10}deg`);
        ref.current.style.setProperty("--ry", `${x * 10}deg`);
      }}
      onMouseLeave={() => {
        if (!ref.current) return;
        ref.current.style.setProperty("--rx", "0deg");
        ref.current.style.setProperty("--ry", "0deg");
      }}
    >
      <div
        className="rounded-sm p-10 md:p-16 relative overflow-hidden transition-transform duration-200 ease-out"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.06)",
          transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transformStyle: "preserve-3d",
        }}
      >
            {/* Quote mark */}
            <div
              className="absolute top-8 left-10 font-display text-[120px] leading-none opacity-[0.06] pointer-events-none select-none"
              style={{ color: "#c9a85c" }}
            >
              "
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <Stars count={current.rating} />

                <blockquote
                  className="font-display text-2xl md:text-3xl font-light leading-relaxed mt-8 mb-10"
                  style={{ color: "#f0ede8" }}
                >
                  "{current.quote}"
                </blockquote>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="text-sm font-medium mb-1" style={{ color: "#e0ddd8" }}>
                      {current.author}
                    </div>
                    <div className="text-xs" style={{ color: "#5a5550" }}>
                      {current.role}
                    </div>
                  </div>
                  <div
                    className="text-[10px] tracking-widest uppercase px-4 py-2 rounded-full"
                    style={{
                      background: "rgba(201,168,92,0.08)",
                      border: "1px solid rgba(201,168,92,0.2)",
                      color: "#c9a85c",
                    }}
                  >
                    {current.project}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: active === i ? "28px" : "8px",
                    height: "8px",
                    background: active === i
                      ? "linear-gradient(90deg, #8a6e35, #c9a85c)"
                      : "rgba(255,255,255,0.1)",
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              {[{ fn: prev, dir: "left" }, { fn: next, dir: "right" }].map(({ fn, dir }) => (
                <button
                  key={dir}
                  onClick={fn}
                  className="w-10 h-10 flex items-center justify-center rounded-sm cursor-none transition-all duration-300 hover:border-gold"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}
                  >
                    <path d="M0 5H12M9 2L12 5L9 8" stroke="#c9a85c" strokeWidth="0.8" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24"
        >
          {[
            { value: "15,000+", label: "Projects Completed" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "38", label: "Years of Excellence" },
            { value: "12", label: "Design Awards" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center py-8 rounded-sm"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div className="font-display text-4xl font-light mb-2 text-gold-gradient">{stat.value}</div>
              <div className="text-xs tracking-widest uppercase" style={{ color: "#5a5550" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
