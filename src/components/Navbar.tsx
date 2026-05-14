"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navItems = [
  { label: "Products", href: "#products" },
  { label: "Showcase", href: "#showcase" },
  { label: "Brands", href: "#brands" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
        style={{
          background: scrolled ? "rgba(6,6,16,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-8 h-8 border flex items-center justify-center"
              style={{ borderColor: "rgba(201,168,92,0.5)" }}
            >
              <span className="font-display text-sm font-light" style={{ color: "#c9a85c" }}>L</span>
            </div>
            <div>
              <div className="font-display text-lg font-light tracking-widest" style={{ color: "#f0ede8" }}>
                LUXE
              </div>
              <div className="text-[9px] tracking-[0.4em] uppercase -mt-1" style={{ color: "#5a5550" }}>
                Hardware
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setActiveItem(item.label)}
                  className="relative text-xs tracking-widest uppercase transition-colors duration-300 group"
                  style={{ color: activeItem === item.label ? "#c9a85c" : "#9a9490" }}
                >
                  {item.label}
                  <span
                    className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: "#c9a85c" }}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a href="#contact" className="hidden md:block btn-gold text-[10px] rounded-sm px-5 py-2.5">Book Consultation</a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-px w-6 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} style={{ background: "#c9a85c" }} />
            <span className={`block h-px w-6 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} style={{ background: "#c9a85c" }} />
            <span className={`block h-px w-6 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} style={{ background: "#c9a85c" }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "100vh" : 0, opacity: menuOpen ? 1 : 0 }}
        className="fixed inset-0 z-[999] md:hidden overflow-hidden"
        style={{ background: "rgba(6,6,16,0.98)", backdropFilter: "blur(30px)", top: 0 }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: menuOpen ? 0 : 40, opacity: menuOpen ? 1 : 0 }}
              transition={{ delay: i * 0.07 }}
              className="font-display text-4xl font-light"
              style={{ color: "#f0ede8" }}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: menuOpen ? 1 : 0 }}
            transition={{ delay: 0.4 }}
            className="btn-gold mt-4 rounded-sm"
          >
            Book Consultation
          </motion.a>
        </div>
      </motion.div>
    </>
  );
}
