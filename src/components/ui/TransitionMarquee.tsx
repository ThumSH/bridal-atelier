"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TransitionMarquee() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Infinite Scroll Animation
    const width = textRef.current?.offsetWidth;
    if (!width) return;

    gsap.to(textRef.current, {
      x: -width / 2, // Move half the width (since content is duplicated)
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }, { scope: container });

  return (
    <div 
      ref={container}
      className="relative w-full h-20 md:h-32 bg-bridal-ivory overflow-hidden flex items-center rounded-t-[3rem] -mt-12 z-20"
    >
      {/* The Scrolling Text Track */}
      <div ref={textRef} className="flex whitespace-nowrap items-center gap-12 text-bridal-charcoal/20">
        {/* We repeat the text enough times to fill the screen + buffer */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="font-serif text-4xl md:text-6xl italic">
              Bonitha Atelier
            </span>
            <Star size={24} className="fill-current" />
            <span className="font-sans text-xs md:text-sm font-bold tracking-[0.4em] uppercase">
              Established 2012
            </span>
            <Star size={24} className="fill-current" />
          </div>
        ))}
      </div>
      
      {/* Gradient Fade on Edges for Smooth Look */}
      <div className="absolute inset-0 bg-gradient-to-r from-bridal-ivory via-transparent to-bridal-ivory pointer-events-none" />
    </div>
  );
}