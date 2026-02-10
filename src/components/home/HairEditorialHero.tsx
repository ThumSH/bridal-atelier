"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HairEditorialHero() {
  const container = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%", // Starts when section enters view
        end: "bottom bottom",
        toggleActions: "play none none reverse"
      }
    });

    // 1. THE CURTAIN REVEAL (Clip Path Animation)
    // Starts narrow (inset) and expands to full width
    tl.fromTo(imageRef.current, 
      { clipPath: "inset(0% 10% 0% 10% round 3rem)" }, // Start: Narrow with rounded corners
      { 
        clipPath: "inset(0% 0% 0% 0% round 0rem)",   // End: Full width, sharp corners
        duration: 1.5,
        ease: "power4.inOut"
      }
    );

    // 2. TEXT REVEAL
    tl.from(".hair-text", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    }, "-=1"); // Overlap with image expansion

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-screen bg-bridal-ivory overflow-hidden flex items-center justify-center">
      
      {/* --- THE BIG IMAGE --- */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full z-0"
      >
         <Image 
           // Use a high-res image focusing on Hair Texture/Updo
           src="/ch.webp" 
           alt="Couture Hair Styling" 
           fill 
           className="object-cover"
           priority
         />
         {/* Cinematic Gradient (Dark at bottom for text) */}
         <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />
      </div>

      {/* --- THE TEXT OVERLAY --- */}
      <div ref={textRef} className="relative z-10 text-center text-white px-6">
         
         <div className="hair-text flex items-center justify-center gap-3 mb-6 opacity-90">
           <Sparkles size={16} className="text-bridal-gold" />
           <span className="font-sans text-[11px] uppercase tracking-[0.4em] font-bold">
              The Architecture of Beauty
           </span>
         </div>

         <h2 className="hair-text font-serif text-7xl md:text-9xl mb-6 leading-none">
            Sculptural <span className="italic text-bridal-gold font-light">Elegance.</span>
         </h2>

         <p className="hair-text font-sans text-sm md:text-lg text-white/80 max-w-lg mx-auto leading-relaxed mb-12">
            Where engineering meets artistry. From gravity-defying updos to fluid, romantic waves, we design hair that moves with you.
         </p>

         <div className="hair-text animate-bounce opacity-60">
            <ArrowDown size={32} className="mx-auto text-white" />
         </div>

      </div>

    </section>
  );
}