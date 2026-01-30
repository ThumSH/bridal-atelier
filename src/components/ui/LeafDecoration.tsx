"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LeafProps {
  className?: string;
  speed?: number; // How fast it moves (parallax effect)
  rotation?: number; // Static rotation
  src: string; // URL of the leaf image
  delay?: number; // Animation delay on load
}

export default function LeafDecoration({ 
  className, 
  speed = 0.5, 
  rotation = 0, 
  src,
  delay = 0 
}: LeafProps) {
  const leafRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = leafRef.current;
    if (!el) return;

    // 1. Initial Fade In (The "Elegant Entrance")
    gsap.fromTo(el, 
      { opacity: 0, scale: 0.8, rotation: rotation - 10 },
      { 
        opacity: 0.8, // Never fully opaque to blend with background
        scale: 1, 
        rotation: rotation,
        duration: 1.5, 
        delay: delay,
        ease: "power3.out" 
      }
    );

    // 2. Parallax Scroll Effect
    gsap.to(el, {
      y: (i, target) => -100 * speed, // Move up/down based on scroll
      ease: "none",
      scrollTrigger: {
        trigger: document.body, // Track entire page scroll or parent
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth catch-up
      }
    });
  }, [speed, rotation, delay]);

  return (
    <div 
      ref={leafRef} 
      className={cn("pointer-events-none absolute z-20 hidden md:block", className)}
    >

    </div>
  );
}