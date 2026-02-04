"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, MoveRight } from "lucide-react";
import Link from "next/link";

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
           src="/h-m2.webp" 
           alt="Couture Hair Styling" 
           fill 
           className="object-cover"
           priority
         />
         {/* Cinematic Gradient (Dark at bottom for text) */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
      </div>

      {/* --- THE TEXT OVERLAY --- */}
{/* --- THE TEXT OVERLAY --- */}
      {/* Added 'flex flex-col items-center' to perfectly center the stack */}
      <div ref={textRef} className="relative z-10 text-center text-white px-6 flex flex-col items-center">
         
         <div className="hair-text flex items-center justify-center gap-3 mb-6 opacity-90">
           <Sparkles size={16} className="text-bridal-gold" />
           <span className="font-sans text-[11px] uppercase tracking-[0.4em] font-bold">
              The Architecture of Beauty
           </span>
         </div>

         <h1 className="font-serif text-7xl md:text-9xl leading-[0.85] mb-8 drop-shadow-lg">
            <div className="overflow-hidden">
              <span className="hero-title-line block">Perfected For Your</span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-title-line block italic text-bridal-gold">Moment</span>
            </div>
         </h1>

         {/* Added 'mx-auto' to ensure the max-width block sits in the center */}
         <p className="hero-fade-in font-sans text-sm md:text-lg text-white/90 max-w-md mx-auto leading-relaxed mb-10 font-light tracking-wide">
            The gown is just the beginning. From expert saree draping to the final jewelry setting, we craft the silhouette that defines your walk down the aisle.
         </p>

         {/* Button */}
         <div className="hero-fade-in">
            <Link href="/portfolio" className="group flex items-center gap-4 w-fit">
              <div className="px-10 py-4 bg-white text-bridal-charcoal rounded-full transition-all duration-500 group-hover:bg-bridal-gold group-hover:text-white group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                 <span className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-3">
                   View Our Brides
                   <MoveRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                 </span>
              </div>
            </Link>
         </div>
      </div>

    </section>
  );
}