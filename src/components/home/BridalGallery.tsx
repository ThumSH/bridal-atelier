"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GALLERY_IMAGES = [
  { id: 1, src: "/p-11.webp", alt: "Bonitha Bride 1" },
  { id: 2, src: "/p-12.webp", alt: "Bonitha Bride 2" },
  { id: 3, src: "/p-13.webp", alt: "Bonitha Bride 3" },
  { id: 4, src: "/p-14.webp", alt: "Bonitha Bride 4" },
  { id: 5, src: "/p-15.webp", alt: "Bonitha Bride 5" },
  { id: 6, src: "/p-16.webp", alt: "Bonitha Bride 6" },
];

export default function BridalGallery() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        // OPTIMIZATION: Start animation SOONER (85%) so users don't stare at empty space
        start: "top 85%", 
      }
    });

    // 1. Header Reveal
    tl.fromTo(".gallery-header-anim", 
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power2.out" 
      }
    );

    // 2. Grid Items Reveal
    tl.fromTo(".gallery-item-anim",
      { y: 40, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8, 
        stagger: 0.05, // OPTIMIZATION: Faster stagger for snappier feel
        ease: "power3.out" 
      },
      "-=0.4"
    );

  }, { scope: container });

  return (
    <section ref={container} className="relative py-24 bg-white overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
           <div className="gallery-header-anim flex items-center gap-2 mb-4 opacity-0">
              <Sparkles className="w-4 h-4 text-bridal-gold" />
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-bridal-sage font-bold">
                 Real Moments
              </span>
           </div>
           
           <h2 className="gallery-header-anim font-serif text-5xl md:text-7xl text-bridal-charcoal opacity-0">
              Captured in <span className="italic text-bridal-gold">Time.</span>
           </h2>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {GALLERY_IMAGES.map((img) => (
            <div 
               key={img.id} 
               className="gallery-item-anim relative aspect-[3/4] group overflow-hidden bg-bridal-charcoal/5 opacity-0"
            >
               <Image 
                 src={img.src} 
                 alt={img.alt} 
                 fill 
                 // OPTIMIZATION: Exact match for grid (Mobile: 100vw, Tablet: 50vw, Desktop: 33vw)
                 sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                 className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
               />
               
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
               <div className="absolute inset-4 border border-white/0 group-hover:border-white/50 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* --- VIEW MORE BUTTON --- */}
        <div className="flex justify-center mt-16 gallery-header-anim opacity-0">
          <Link href="/gowns" className="group">
            <div className="px-12 py-4 bg-transparent border border-bridal-charcoal text-bridal-charcoal transition-all duration-300 hover:bg-bridal-charcoal hover:text-white">
               <span className="text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-4">
                 View Our Stunning Brides
                 <MoveRight size={14} className="transition-transform duration-300 group-hover:translate-x-2" />
               </span>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}