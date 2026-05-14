"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices (mobile/tablet)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouseX}px`;
        cursorRef.current.style.top = `${mouseY}px`;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    const onDown = () => cursorRef.current && (cursorRef.current.style.transform = "translate(-50%,-50%) scale(0.6)");
    const onUp = () => cursorRef.current && (cursorRef.current.style.transform = "translate(-50%,-50%) scale(1)");

    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        id="cursor"
        style={{ position: "fixed", pointerEvents: "none", zIndex: 99999, transform: "translate(-50%,-50%)" }}
      />
      <div
        ref={ringRef}
        id="cursor-ring"
        style={{ position: "fixed", pointerEvents: "none", zIndex: 99998, transform: "translate(-50%,-50%)" }}
      />
    </>
  );
}
