"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCategories from "@/components/ProductCategories";
import BrandPartners from "@/components/BrandPartners";
import BuildYourSpace from "@/components/BuildYourSpace";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WaterRipple from "@/components/WaterRipple";
import ParticleBackground from "@/components/ParticleBackground";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// Dynamically imported to avoid SSR issues with three.js and lazy load for performance
const ProductShowcase = dynamic(() => import("@/components/ProductShowcase"), { 
  ssr: false,
  loading: () => <div className="h-[480px] flex items-center justify-center text-white/30">Loading 3D...</div>
});
const SceneSection = dynamic(() => import("@/components/SceneSection"), { 
  ssr: false,
  loading: () => <div className="h-[600px] flex items-center justify-center text-white/30">Loading 3D...</div>
});

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  // Initialize Lenis smooth scroll after load
  useEffect(() => {
    if (!loaded) return;
    let lenis: { destroy: () => void; raf: (time: number) => void } | null = null;

    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        lenis = new Lenis({
          lerp: 0.08,
          smoothWheel: true,
        });

        const raf = (time: number) => {
          lenis?.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      } catch (e) {
        console.warn("Lenis init failed:", e);
      }
    };

    initLenis();
    return () => {
      if (lenis) lenis.destroy();
    };
  }, [loaded]);

  return (
    <>
      {/* Preloader */}
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Global effects */}
      <CustomCursor />
      <WaterRipple />
      <ParticleBackground />

      {/* Noise grain overlay */}
      <div className="noise-overlay" />

      {/* Navbar */}
      <Navbar visible={loaded} />

      {/* Main content with 3D perspective */}
      <motion.main
        initial={{ opacity: 0, scale: 0.9, z: -500, rotateX: 10 }}
        animate={loaded ? { opacity: 1, scale: 1, z: 0, rotateX: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
      >
        <HeroSection />
        
        <SectionWrapper>
          <ProductCategories />
        </SectionWrapper>

        <SectionWrapper>
          <ProductShowcase />
        </SectionWrapper>

        <SectionWrapper>
          <SceneSection />
        </SectionWrapper>

        <SectionWrapper>
          <BrandPartners />
        </SectionWrapper>

        <SectionWrapper>
          <BuildYourSpace />
        </SectionWrapper>

        <SectionWrapper>
          <Testimonials />
        </SectionWrapper>

        <SectionWrapper>
          <ContactSection />
        </SectionWrapper>
      </motion.main>

      <Footer />
    </>
  );
}
function SectionWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-200, 0, -200]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        opacity,
        scale,
        z,
        transformStyle: "preserve-3d",
      }}
      className="will-change-transform"
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
