"use client";
import { motion } from "framer-motion";

const footerLinks = {
  "Products": ["Basin Faucets", "Shower Systems", "Kitchen Faucets", "Door Hardware", "Bathroom Accessories", "Smart Controls"],
  "Company": ["About LUXE", "Design Philosophy", "Sustainability", "Careers", "Press Kit"],
  "Support": ["Product Catalog", "Installation Guides", "Warranty", "FAQ", "Contact Us"],
};

export default function Footer() {
  return (
    <footer style={{ background: "#060610", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 pt-20 pb-10">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 border flex items-center justify-center"
                style={{ borderColor: "rgba(201,168,92,0.4)" }}
              >
                <span className="font-display text-lg font-light" style={{ color: "#c9a85c" }}>L</span>
              </div>
              <div>
                <div className="font-display text-xl font-light tracking-widest" style={{ color: "#f0ede8" }}>LUXE</div>
                <div className="text-[9px] tracking-[0.4em] uppercase" style={{ color: "#5a5550" }}>Hardware & Sanitary</div>
              </div>
            </div>
            <p className="text-sm font-light leading-relaxed mb-8 max-w-xs" style={{ color: "#5a5550" }}>
              Crafting premium hardware and sanitary solutions since 1987. Every product, a testament to timeless engineering.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {["Instagram", "Pinterest", "LinkedIn", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-sm text-[10px] transition-all duration-300 hover:border-gold"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#5a5550",
                  }}
                >
                  {s.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <div className="text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: "#c9a85c" }}>{cat}</div>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs font-light transition-colors duration-300 hover:text-gold"
                      style={{ color: "#5a5550" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div
          className="w-full h-px mb-8"
          style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,92,0.2), transparent)" }}
        />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[11px]" style={{ color: "#3a3a3a" }}>
            © 2025 LUXE Hardware & Sanitary. All rights reserved.
          </div>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((l) => (
              <a key={l} href="#" className="text-[11px] hover:text-gold transition-colors" style={{ color: "#3a3a3a" }}>
                {l}
              </a>
            ))}
          </div>
          <div className="text-[11px]" style={{ color: "#3a3a3a" }}>
            Crafted with precision in India
          </div>
        </div>
      </div>
    </footer>
  );
}
