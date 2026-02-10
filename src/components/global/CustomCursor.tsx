/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useRef, useState, useEffect } from "react"; // Added useEffect
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isActive, setIsActive] = useState(false); // New State

  // OPTIMIZATION: Only run on devices with a mouse
  useEffect(() => {
    // Check if device has a fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsActive(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsActive(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useGSAP(() => {
    if (!isActive || !cursor.current) return; // Don't run GSAP if disabled

    // 1. Move INSTANTLY
    const xTo = gsap.quickTo(cursor.current, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor.current, "y", { duration: 0.15, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // 2. Hover Listeners
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches("a, button, input, textarea, .cursor-hover, a *, button *")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isActive]); // Re-run if active state changes

  if (!isActive) return null; // Don't render anything on mobile/touch

  return (
    <div 
        ref={cursor}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }} 
    >
        <div 
            className={cn(
                "relative flex items-center justify-center transition-all duration-500 ease-out",
                isHovering ? "w-12 h-12 rotate-45" : "w-3 h-3 rotate-45",
                isClicking && "scale-75"
            )}
        >
            <div 
                className={cn(
                    "absolute bg-white transition-all duration-300",
                    isHovering ? "w-1 h-1 opacity-100" : "w-full h-full opacity-100"
                )}
            />
            <div 
                className={cn(
                    "absolute border border-white transition-all duration-500 ease-out",
                    isHovering ? "w-full h-full opacity-100" : "w-0 h-0 opacity-0"
                )}
            />
        </div>
    </div>
  );
}