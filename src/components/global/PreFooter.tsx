"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PreFooter() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Background Parallax
    gsap.fromTo(".prefooter-bg-img", 
      { scale: 1.1 }, 
      { 
        scale: 1, 
        ease: "none", 
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

    // 2. Text Reveal (OPTIMIZED TRIGGER)
    gsap.from(".pre-reveal", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%", // Reveal sooner
      }
    });

  }, { scope: container });

  return (
    // CHANGE 1: Switched to bg-black for distinct contrast
    <section ref={container} className="relative w-full py-32 md:py-48 bg-black overflow-hidden flex flex-col items-center justify-center text-center px-6">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 z-0">
          <Image 
            src="/p-24.webp" 
            alt="Atelier Texture"
            fill
            // OPTIMIZATION: Full width background needs 100vw
            sizes="100vw"
            className="prefooter-bg-img object-cover opacity-80 mix-blend-overlay grayscale" 
          />
      </div>
      
      {/* CHANGE 2: Updated Gradient to blend with Black */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-black/40 pointer-events-none" />

      {/* Decorative Golden Thread */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
            <path d="M-100 600 C 400 400, 800 900, 1500 500" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
         </svg>
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Badge */}
        <div className="mb-10 flex justify-center">
           <div className="pre-reveal inline-flex items-center gap-3 px-6 py-2 border border-bridal-gold/30 rounded-full backdrop-blur-sm bg-white/5">
              <Sparkles size={14} className="text-bridal-gold" />
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/90 font-bold">
                 Limited Availability 2026
              </span>
           </div>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[0.85] mb-12 tracking-tight">
          <span className="pre-reveal block">Your Moment.</span>
          <span className="pre-reveal block italic text-bridal-gold/90 font-light">Our Masterpiece.</span>
        </h2>

        {/* Description */}
        <p className="pre-reveal font-sans text-white/60 text-sm md:text-base max-w-xl mx-auto leading-loose mb-16 font-light tracking-wide">
          From the first consultation to the final reveal, experience the pinnacle of bridal luxury. Let us craft a look that defines you.
        </p>

        {/* CTA Button (With Reduced Glow) */}
        <div className="pre-reveal relative group inline-block">
           <div className="absolute -inset-1 bg-linear-to-r from-bridal-gold/10 to-bridal-sage/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
           
           <Link href="/contact" className="relative flex items-center gap-8 px-10 py-5 bg-white text-bridal-charcoal rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-bridal-ivory shadow-xl hover:shadow-2xl">
              <span className="relative z-10 font-sans text-[11px] uppercase tracking-[0.3em] font-bold pl-2">
                Secure Your Date
              </span>
              <div className="w-12 h-12 -mr-2 rounded-full bg-bridal-charcoal text-white flex items-center justify-center group-hover:bg-bridal-gold transition-colors duration-500">
                 <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
           </Link>
        </div>

      </div>
    </section>
  );
}