"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setPhase("done");
          setTimeout(() => onComplete(), 600);
          return 100;
        }
        const increment = p < 60 ? Math.random() * 4 + 2 : Math.random() * 2 + 0.5;
        return Math.min(p + increment, 100);
      });
    }, 60);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "loading" && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: "#060610" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated background rings */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-gold/10 m-auto"
                style={{ width: `${30 + i * 20}vmin`, height: `${30 + i * 20}vmin` }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.05, 1] }}
                transition={{ duration: 8 + i * 4, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16 relative z-10"
          >
            <div className="section-label mb-4" style={{ color: "#c9a85c" }}>Est. 1987</div>
            <h1 className="font-display text-6xl md:text-7xl font-light" style={{ color: "#f0ede8" }}>
              LUXE
            </h1>
            <div className="text-xs tracking-[0.5em] uppercase mt-2" style={{ color: "#c9a85c" }}>
              Hardware & Sanitary
            </div>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 w-64"
          >
            <div className="flex justify-between mb-3">
              <span className="text-xs tracking-widest uppercase" style={{ color: "#5a5550" }}>Loading Experience</span>
              <span className="text-xs font-mono" style={{ color: "#c9a85c" }}>{Math.floor(progress)}%</span>
            </div>
            <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
              <motion.div
                className="h-full loader-bar"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 text-xs tracking-[0.3em] uppercase"
            style={{ color: "#5a5550" }}
          >
            Crafting Spaces · Defining Excellence
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
