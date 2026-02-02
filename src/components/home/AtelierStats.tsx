"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  {
    id: "hours",
    value: 300,
    label: "Hours of Craftsmanship",
    suffix: "+",
    description: "Average time dedicated to a single couture creation."
  },
  {
    id: "measurements",
    value: 25,
    label: "Body Measurements",
    suffix: "",
    description: "Precise anatomical points mapped for the perfect fit."
  },
  {
    id: "fittings",
    value: 4,
    label: "Couture Fittings",
    suffix: "",
    description: "Private sessions to mold the silhouette to your form."
  },
  {
    id: "fabric",
    value: 100,
    label: "Premium Silk & Lace",
    suffix: "%",
    description: "Sourced directly from heritage mills in Italy and France."
  }
];

export default function AtelierStats() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Header Reveal
      gsap.from(".stats-header", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        }
      });

      // 2. Count-Up Animation
      STATS.forEach((stat) => {
        const counter = { val: 0 };
        const element = document.getElementById(`stat-val-${stat.id}`);
        
        if (element) {
          gsap.to(counter, {
            val: stat.value,
            duration: 3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container.current,
              start: "top 60%",
            },
            onUpdate: () => {
              element.innerText = Math.ceil(counter.val).toString();
            }
          });
        }
      });

      // 3. COUTURE FLOW ANIMATION
      gsap.fromTo(".stats-flow-line", 
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 4,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: container.current,
            start: "top 60%",
          }
        }
      );

      // 4. Leaf Float Animation
      gsap.to(".stats-leaf", {
        y: -30,
        rotation: 5,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative w-full bg-bridal-ivory py-32 overflow-hidden">
      
      {/* Leaves */}
      <div className="stats-leaf absolute -top-20 -left-20 w-100 h-100 opacity-30 pointer-events-none z-0">
         <Image src="/leaves.webp" alt="Decoration" fill className="object-contain blur-[4px]" />
      </div>
      <div className="stats-leaf absolute -bottom-20 -right-20 w-125 h-125 opacity-20 pointer-events-none z-0">
         <Image src="/leaves.webp" alt="Decoration" fill className="object-contain blur-[6px] rotate-180" />
      </div>

      {/* --- DECORATION: GLOWING THREADS --- */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-80">
         {/* ADDED: Drop Shadow for Glow */}
         <svg className="w-full h-full drop-shadow-[0_0_6px_rgba(212,175,55,0.4)]" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
            <path 
              className="stats-flow-line"
              d="M-100 300 C 400 100, 1000 500, 1500 300" 
              stroke="#D4AF37" 
              strokeWidth="1.5" 
              strokeOpacity="0.3"
              fill="none"
            />
            <path 
              className="stats-flow-line"
              d="M-100 350 C 400 150, 1000 550, 1500 350" 
              stroke="#8A9A5B" 
              strokeWidth="1" 
              strokeOpacity="0.2"
              fill="none"
              strokeDasharray="10 10"
            />
         </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span className="stats-header font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block">
            The Craft
          </span>
          <h2 className="stats-header font-serif text-4xl md:text-5xl text-bridal-charcoal mb-8">
            Precision in <span className="italic text-bridal-gold/90 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">Numbers</span>
          </h2>
          <p className="stats-header font-sans text-sm md:text-base leading-loose text-bridal-charcoal/70">
            True luxury is defined by what you cannot see. It is the invisible hours of hand-stitching, 
            the microscopic adjustments of a hem, and the uncompromising quality of materials 
            that make a gown truly yours.
          </p>
        </div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 border-t border-bridal-charcoal/10 pt-16">
          
          {STATS.map((stat, index) => (
            <div 
              key={stat.id} 
              className={`flex flex-col items-center text-center px-6 relative ${
                 index !== STATS.length - 1 ? "lg:border-r lg:border-bridal-charcoal/10" : ""
              }`}
            >
              {/* The Number with GOLD GLOW */}
              <div className="relative mb-6">
                 <h3 className="font-serif text-6xl md:text-7xl text-bridal-charcoal leading-none drop-shadow-[0_0_15px_rgba(212,175,55,0.25)]">
                    <span id={`stat-val-${stat.id}`}>0</span>
                    <span className="text-4xl ml-1 text-bridal-sage font-sans font-light">{stat.suffix}</span>
                 </h3>
              </div>

              {/* The Label */}
              <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-bridal-charcoal font-bold mb-4">
                 {stat.label}
              </h4>

              <p className="font-sans text-xs text-bridal-charcoal/60 leading-relaxed max-w-50">
                 {stat.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}