"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-transparent text-sm py-4 px-0 outline-none transition-colors duration-300 font-light";
  const labelClass = "text-[10px] tracking-widest uppercase mb-2 block";

  return (
    <section id="contact" className="relative py-32 overflow-hidden" style={{ background: "#0a0a0f" }}>
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,92,0.3), transparent)" }}
      />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label mb-6">Get In Touch</div>
            <h2 className="font-display text-5xl md:text-6xl font-light mb-8" style={{ color: "#f0ede8" }}>
              Visit Our
              <br />
              <span className="text-gold-gradient italic">Experience Centre</span>
            </h2>
            <p className="text-sm font-light leading-relaxed mb-12 max-w-sm" style={{ color: "#9a9490" }}>
              Step into our 8,000 sq.ft. physical showroom — where every product can be
              touched, tested, and experienced firsthand.
            </p>

            {/* Info blocks */}
            <div className="flex flex-col gap-8">
              {[
                {
                  label: "Location",
                  value: "Level 4, Infinity Mall\nLink Road, Andheri West\nMumbai — 400058",
                  icon: (
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
                  ),
                },
                {
                  label: "Showroom Hours",
                  value: "Mon – Sat: 10am – 7pm\nSunday: 11am – 5pm",
                  icon: (
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2" />
                  ),
                },
                {
                  label: "Contact",
                  value: "+91 22 6678 9900\nhello@luxehardware.in",
                  icon: (
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.1 3.36 2 2 0 0 1 3.08 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 5.99 5.99l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  ),
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-5">
                  <div
                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-sm"
                    style={{ background: "rgba(201,168,92,0.08)", border: "1px solid rgba(201,168,92,0.15)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a85c" strokeWidth="1.2">
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "#5a5550" }}>
                      {item.label}
                    </div>
                    {item.value.split("\n").map((line) => (
                      <div key={line} className="text-sm font-light" style={{ color: "#9a9490" }}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div
              className="mt-12 h-48 rounded-sm overflow-hidden relative"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, #0e0e18 0%, #131328 100%)" }}
              />
              {/* Stylized map grid */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "linear-gradient(rgba(201,168,92,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,92,0.3) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="w-3 h-3 rounded-full mx-auto mb-2"
                    style={{ background: "#c9a85c", boxShadow: "0 0 16px rgba(201,168,92,0.6)" }}
                  />
                  <div className="text-[10px] tracking-widest uppercase" style={{ color: "#c9a85c" }}>
                    LUXE Showroom · Mumbai
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-8"
                  style={{ background: "rgba(201,168,92,0.1)", border: "1px solid rgba(201,168,92,0.3)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a85c" strokeWidth="1.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display text-4xl font-light mb-4" style={{ color: "#f0ede8" }}>
                  Request Received
                </h3>
                <p className="text-sm font-light" style={{ color: "#9a9490" }}>
                  Our design consultant will reach out within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="font-display text-3xl font-light mb-2" style={{ color: "#f0ede8" }}>
                  Book a Consultation
                </div>

                {/* Fields */}
                {[
                  { name: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                  { name: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className={labelClass} style={{ color: "#5a5550" }}>{field.label}</label>
                    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      <input
                        required
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={(formData as Record<string, string>)[field.name]}
                        onChange={handleChange}
                        className={inputClass}
                        style={{ color: "#f0ede8" }}
                      />
                    </div>
                  </div>
                ))}

                {/* Project type */}
                <div>
                  <label className={labelClass} style={{ color: "#5a5550" }}>Project Type</label>
                  <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      className={inputClass}
                      style={{ color: formData.project ? "#f0ede8" : "#5a5550" }}
                    >
                      <option value="" disabled>Select project type</option>
                      {["Residential", "Commercial", "Hospitality", "Institutional", "Other"].map((o) => (
                        <option key={o} value={o} style={{ background: "#0e0e18" }}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={labelClass} style={{ color: "#5a5550" }}>Message (Optional)</label>
                  <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                      style={{ color: "#f0ede8" }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-gold rounded-sm mt-2">
                  Send Request
                </button>

                <p className="text-[10px] text-center" style={{ color: "#3a3a3a" }}>
                  By submitting, you agree to our Privacy Policy. We respect your data.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
