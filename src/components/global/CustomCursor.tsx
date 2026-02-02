"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useGSAP(() => {
    // 1. Move INSTANTLY (No "Late" Lag)
    // We use a very low duration (0.1) so it feels snappy but still smooth (not jittery)
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
      // Check if hovering over a clickable element
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
  }, []);

  return (
    <div 
        ref={cursor}
        className="fixed top-0 left-0 pointer-events-none z-9999 mix-blend-difference hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }} // Center the div on the mouse
    >
        {/* The Container handles the Rotation & Scale */}
        <div 
            className={cn(
                "relative flex items-center justify-center transition-all duration-500 ease-out",
                isHovering ? "w-12 h-12 rotate-45" : "w-3 h-3 rotate-45", // Rotates 45deg to make a Diamond
                isClicking && "scale-75"
            )}
        >
            {/* 1. The Center "Gem" (Solid Diamond) */}
            <div 
                className={cn(
                    "absolute bg-white transition-all duration-300",
                    // When hovering: it shrinks to a tiny dot in the center
                    // When normal: it fills the diamond
                    isHovering ? "w-1 h-1 opacity-100" : "w-full h-full opacity-100"
                )}
            />

            {/* 2. The Outer "Setting" (Border Ring) */}
            <div 
                className={cn(
                    "absolute border border-white transition-all duration-500 ease-out",
                    // When hovering: It expands to full size
                    // When normal: It shrinks and hides
                    isHovering ? "w-full h-full opacity-100" : "w-0 h-0 opacity-0"
                )}
            />
        </div>
    </div>
  );
}