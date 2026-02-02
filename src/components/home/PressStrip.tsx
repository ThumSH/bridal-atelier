"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PRESS = [
  "VOGUE", "HARPER'S BAZAAR", "ELLE WEDDING", "THE LANE", "BRIDES", "TATLER"
];

export default function PressStrip() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Infinite Marquee
    gsap.to(".marquee-inner", {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });
  }, { scope: container });

  return (
    <div ref={container} className="w-full bg-bridal-charcoal py-8 overflow-hidden border-y border-white/10 relative z-20">
      <div className="flex w-[200%] marquee-inner">
        {/* Render Twice for seamless loop */}
        {[1, 2].map((i) => (
            <div key={i} className="flex w-1/2 justify-around items-center">
                {PRESS.map((brand, idx) => (
                    <span 
                        key={`${i}-${idx}`} 
                        className="font-serif text-2xl md:text-3xl text-white/30 italic px-8 whitespace-nowrap"
                    >
                        {brand}
                    </span>
                ))}
            </div>
        ))}
      </div>
    </div>
  );
}