"use client";
import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  t: number;
}

export default function WaterRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripples = useRef<Ripple[]>([]);

  useEffect(() => {
    // Disable on touch devices (mobile/tablet)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onClick = (e: MouseEvent) => {
      ripples.current.push({ x: e.clientX, y: e.clientY, t: 0 });
      if (ripples.current.length > 12) ripples.current.shift();
    };
    window.addEventListener("click", onClick);

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripples.current = ripples.current.filter((r) => r.t < 80);
      for (const r of ripples.current) {
        const progress = r.t / 80;
        const radius = progress * 120;
        const opacity = (1 - progress) * 0.35;
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201, 168, 92, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Second ring, offset
        if (r.t > 10) {
          const r2 = (progress - 0.12) * 120;
          const o2 = (1 - progress) * 0.2;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(201, 168, 92, ${o2})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        r.t += 1.4;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9997 }}
    />
  );
}
