"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Star } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AwardWinningStudio() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      }
    });

    // 1. Text Reveal (Slide Right)
    tl.from(".award-text", {
      x: -50, 
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    // 2. Image Reveal (Slide Left)
    tl.from(".award-image-reveal", {
      x: 50, 
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    }, "-=0.8");

    // 3. Parallax for Leaves (Subtle Movement)
    gsap.to(".award-leaf", {
      yPercent: -20,
      rotation: 10,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative py-24 md:py-32 bg-bridal-ivory overflow-hidden">
      
      {/* --- DECORATION 1: GOLDEN LINES (Silk Flow) --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
           <path 
             d="M-100 400 C 300 100, 800 600, 1500 200" 
             stroke="#D4AF37" 
             strokeWidth="0.8" 
             strokeDasharray="4 6"
             className="opacity-50"
           />
           <path 
             d="M-100 450 C 300 150, 800 650, 1500 250" 
             stroke="#D4AF37" 
             strokeWidth="0.4" 
             className="opacity-30"
           />
        </svg>
      </div>

      {/* --- DECORATION 2: BLURRED LEAVES --- */}
      <div className="award-leaf absolute -top-20 -left-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-10 mix-blend-multiply">
         <Image 
           src="/leaves.webp" 
           alt="Decorative Leaf" 
           fill 
           className="object-contain blur-md rotate-[-30deg]" 
         />
      </div>

      {/* Main Grid Content (Relative z-10 to sit ABOVE decorations) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* --- LEFT: TEXT CONTENT --- */}
        <div className="flex flex-col items-start text-left order-2 lg:order-1">
           
           <div className="award-text flex items-center gap-3 mb-8 text-bridal-gold bg-bridal-gold/5 border border-bridal-gold/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <Trophy size={16} />
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold">
                  Global Recognition
              </span>
           </div>
           
           <h2 className="award-text font-serif text-5xl md:text-6xl lg:text-7xl text-bridal-charcoal mb-8 leading-[1.1]">
              Award Winning <br />
              <span className="italic text-bridal-gold">Studio.</span>
           </h2>
           
           <p className="award-text font-sans text-sm md:text-base text-bridal-charcoal/70 leading-relaxed mb-10 max-w-md">
              Celebrated for our commitment to bridal excellence and artistic innovation. Our studio has been recognized on national and international stages for redefining the bridal aesthetic.
           </p>

           {/* Stat Row */}
           <div className="award-text flex gap-8 border-t border-bridal-charcoal/10 pt-8 w-full">
              <div>
                 <span className="block font-serif text-3xl text-bridal-charcoal">15+</span>
                 <span className="text-[10px] uppercase tracking-widest text-bridal-charcoal/50">Awards Won</span>
              </div>
              <div>
                 <span className="block font-serif text-3xl text-bridal-charcoal">500+</span>
                 <span className="text-[10px] uppercase tracking-widest text-bridal-charcoal/50">Brides Styled</span>
              </div>
           </div>
        </div>

        {/* --- RIGHT: LANDSCAPE IMAGE --- */}
        <div className="award-image-reveal order-1 lg:order-2 relative w-full aspect-[4/3] md:aspect-[16/10] rounded-[2rem] overflow-hidden shadow-2xl border border-bridal-charcoal/5 group">
           <Image 
             src="/awards.jpeg" 
             alt="Bonitha Studio Awards" 
             fill 
             className="object-cover transition-transform duration-[3s] ease-out group-hover:scale-105"
           />
           
           {/* Overlay Gradient */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
           
           {/* Floating Badge */}
           <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg hover:bg-white/20 transition-colors">
              <Star size={16} className="text-bridal-gold fill-bridal-gold" />
              <div className="flex flex-col text-left">
                  <span className="text-white font-sans text-[9px] uppercase tracking-widest font-bold">
                      Excellence in Artistry
                  </span>
                  <span className="text-white/80 font-serif italic text-sm">2025 Winner</span>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}