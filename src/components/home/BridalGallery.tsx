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
        start: "top 75%",
      }
    });

    tl.from(".gallery-header-anim", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });

    // Decorative rope lines animation
    tl.from(".rope-line", {
      width: 0,
      duration: 1.5,
      ease: "power4.inOut",
    }, "-=0.8");

    tl.from(".gallery-item", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1, 
      ease: "power3.out",
    }, "-=1");

  }, { scope: container });

  return (
    <section ref={container} className="w-full bg-bridal-ivory py-32 px-4 md:px-8">
      
      {/* --- SECTION HEADER --- */}
      <div className="max-w-[1400px] mx-auto text-center mb-24 relative">
         
         <div className="gallery-header-anim flex items-center justify-center gap-3 text-bridal-charcoal/60 mb-8">
           <Sparkles size={14} className="text-bridal-gold" />
           <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold">
              The Atelier Collection
           </span>
         </div>

         {/* --- TITLE WITH GOLDEN ROPE LINES --- */}
         <div className="relative inline-block px-12 py-6">
            {/* Top Rope Line */}
            <div className="rope-line absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-bridal-gold to-transparent" />
            <div className="rope-line absolute top-[4px] left-1/4 right-1/4 h-[0.5px] bg-bridal-gold/40" />

            <h2 className="gallery-header-anim font-serif text-5xl md:text-8xl text-bridal-charcoal leading-none uppercase tracking-tight">
               The Bonitha <span className="italic text-bridal-gold font-light lowercase">Bride.</span>
            </h2>

            {/* Bottom Rope Line */}
            <div className="rope-line absolute bottom-[4px] left-1/4 right-1/4 h-[0.5px] bg-bridal-gold/40" />
            <div className="rope-line absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-bridal-gold to-transparent" />
         </div>

         <p className="gallery-header-anim font-sans text-sm md:text-base text-bridal-charcoal/70 max-w-xl mx-auto leading-relaxed mt-10 font-light">
            A curation of our most cherished transformations. Each portrait captures a moment of architectural grace and unshakeable confidence.
         </p>
      </div>


      {/* --- IMAGE GRID (Sharp Edges) --- */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-1 mb-20">
        {GALLERY_IMAGES.map((img) => (
          <div 
            key={img.id} 
            // Removed rounded-2rem, now using rounded-none for professional sharp look
            className="gallery-item relative w-full aspect-[3/4] rounded-none overflow-hidden group cursor-pointer shadow-none"
          >
             <Image 
               src={img.src} 
               alt={img.alt} 
               fill 
               className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
             />
             
             {/* Professional Hover: Subtle contrast shift rather than a dark mask */}
             <div className="absolute inset-0 bg-bridal-charcoal/0 group-hover:bg-bridal-charcoal/10 transition-all duration-700" />
             
             {/* Sharp White Border on Hover */}
             <div className="absolute inset-6 border border-white/0 group-hover:border-white/40 transition-all duration-700 pointer-events-none" />
          </div>
        ))}
      </div>


      {/* --- VIEW MORE BUTTON (Sharp Aesthetic) --- */}
      <div className="flex justify-center pb-8 gallery-header-anim">
        <Link href="/portfolio" className="group">
          {/* Changed rounded-full to rounded-none to match the professional theme */}
          <div className="px-16 py-5 bg-bridal-charcoal text-white border border-bridal-charcoal rounded-none transition-all duration-500 hover:bg-transparent hover:text-bridal-charcoal hover:scale-105">
             <span className="text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-4">
               Enter The Gallery
               <MoveRight size={14} className="transition-transform duration-300 group-hover:translate-x-2" />
             </span>
          </div>
        </Link>
      </div>

    </section>
  );
}