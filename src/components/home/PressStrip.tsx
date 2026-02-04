"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PressStrip() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Infinite loop for logos
    gsap.to(".press-track", {
      xPercent: -50,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }, { scope: container });

  const awards = [
    "Best Bridal Salon 2024", "National Artistry Award", 
    "Excellence in Couture", "Vogue Bridal Featured",
    "Master Hair Stylist '25", "Global Luxury Partner"
  ];

  return (
    <div ref={container} className="w-full py-12 bg-white border-b border-bridal-charcoal/5 overflow-hidden">
      <div className="flex flex-col items-center mb-6">
         <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-bridal-sage font-bold">As Recognized By</span>
      </div>
      
      <div className="press-track flex whitespace-nowrap items-center gap-16 md:gap-32">
        {/* Double the array for seamless loop */}
        {[...awards, ...awards].map((award, i) => (
          <span 
            key={i} 
            className="font-serif text-xl md:text-2xl text-bridal-charcoal/30 hover:text-bridal-gold transition-colors cursor-default"
          >
            {award}
          </span>
        ))}
      </div>
    </div>
  );
}