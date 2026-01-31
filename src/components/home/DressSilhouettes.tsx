"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DRESSES = [
  {
    id: "basque",
    title: "The Basque",
    subtitle: "Spring 2026 Trend",
    description: "A corset-style waist that dips into a V-shape, elongating the torso for a regal, sculpted look.",
    image: "/The Basque.webp",
    tags: ["Sculpted", "Royal", "Volume"]
  },
  {
    id: "drop",
    title: "The Drop Waist",
    subtitle: "Vintage Revival",
    description: "Characterized by a lengthened bodice that hits below the hips, blending 1920s glamour with modern structure.",
    image: "/waist.webp",
    tags: ["Elongated", "Vintage", "Sleek"]
  },
  {
    id: "architectural",
    title: "The Architectural",
    subtitle: "Modern Minimalist",
    description: "Clean lines and artful folds. A sheath silhouette that focuses on fabric manipulation rather than embellishment.",
    image: "/archi.webp",
    tags: ["Draped", "Modern", "Clean"]
  },
  {
    id: "mermaid",
    title: "The Mermaid",
    subtitle: "Timeless Contour",
    description: "Precision tailoring that hugs the curves and flares dramatically at the knee for the ultimate feminine shape.",
    image: "/mermaid.webp",
    tags: ["Fitted", "Dramatic", "Curves"]
  }
];

export default function DressSilhouettes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useGSAP(
    () => {
      if (!sectionRef.current || !triggerRef.current) return;

      const totalScroll = sectionRef.current.scrollWidth - window.innerWidth;

      gsap.to(sectionRef.current, {
        x: -totalScroll, 
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          // CHANGED: Reduced scrub from 1 to 0.5 for snappier response
          scrub: 0.5,      
          start: "top top",
          // CHANGED: Reduced duration. Now it takes 3000px of vertical scroll to move the whole track.
          // Previously it was 'scrollWidth' which was huge (~6000px+).
          end: "+=3000", 
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.round(progress * (DRESSES.length - 1));
            setActiveSlide(index);
          }
        },
      });
      
      // FIXED: TypeScript error & Parallax Speed
      gsap.utils.toArray<HTMLElement>(".runway-image").forEach((img) => {
        gsap.to(img, {
            objectPosition: "100% 50%", 
            ease: "none",
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "+=3000", // Matches the main timeline duration
                scrub: 0.5
            }
        })
      });

    },
    { scope: triggerRef }
  );

  return (
    <section ref={triggerRef} className="relative h-screen w-full overflow-hidden bg-bridal-ivory">
      
      {/* --- FLOATING HEADER (Fixed Position) --- */}
      <div className="absolute top-12 left-6 md:left-12 z-20 mix-blend-difference text-white">
        <span className="font-sans text-xs uppercase tracking-[0.4em] mb-2 block opacity-80">
            2026 Runway
        </span>
        <h2 className="font-serif text-4xl md:text-5xl">
            The <span className="italic">Collection</span>
        </h2>
      </div>

      {/* --- PROGRESS INDICATOR (Fixed Bottom Left) --- */}
      <div className="absolute bottom-12 left-6 md:left-12 z-20 mix-blend-difference text-white flex items-end gap-4">
         <span className="font-serif text-6xl leading-none">0{activeSlide + 1}</span>
         <span className="font-sans text-xs mb-2 opacity-60">/ 0{DRESSES.length}</span>
         {/* Animated Line */}
         <div className="w-32 h-px bg-white/40 mb-3 ml-4 relative overflow-hidden">
            <div 
                className="absolute top-0 left-0 h-full bg-white transition-all duration-300" 
                style={{ width: `${((activeSlide + 1) / DRESSES.length) * 100}%` }}
            />
         </div>
      </div>

      {/* --- THE RUNWAY TRACK (Moves Horizontally) --- */}
      <div 
        ref={sectionRef} 
        className="flex h-full w-[400vw] flex-row" // 400vw = 4 slides x 100vw
      >
        {DRESSES.map((dress, index) => (
          <div 
            key={dress.id} 
            className="relative h-full w-screen flex items-center justify-center px-6 md:px-20 border-r border-bridal-charcoal/5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl items-center">
                
                {/* 1. TEXT SIDE */}
                <div className="order-2 md:order-1 flex flex-col items-start space-y-6">
                    <div className="flex gap-2 mb-4">
                        {dress.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 border border-bridal-charcoal/20 rounded-full text-[10px] uppercase tracking-widest text-bridal-charcoal/60">
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    <h3 className="font-serif text-5xl md:text-7xl text-bridal-charcoal leading-none">
                        {dress.title}
                    </h3>
                    
                    <p className="font-sans text-sm uppercase tracking-[0.2em] text-bridal-sage">
                        {dress.subtitle}
                    </p>
                    
                    <p className="font-sans text-base leading-relaxed text-bridal-charcoal/70 max-w-md">
                        {dress.description}
                    </p>

                    <button className="group flex items-center gap-3 mt-8 text-xs uppercase tracking-widest text-bridal-charcoal hover:text-bridal-sage transition-colors">
                        View Gown <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                    </button>
                </div>

                {/* 2. IMAGE SIDE */}
                <div className="order-1 md:order-2 relative h-[50vh] md:h-[70vh] w-full overflow-hidden rounded-none md:rounded-[10rem]">
                     <Image
                       src={dress.image}
                       alt={dress.title}
                       fill
                       className="runway-image object-cover object-left" 
                     />
                     
                     {/* Overlay Gradient */}
                     <div className="absolute inset-0 bg-gradient-to-t from-bridal-ivory/20 to-transparent mix-blend-overlay" />
                     
                     {/* "New Arrival" Badge for the first item */}
                     {index === 0 && (
                        <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 animate-pulse-slow">
                            <Sparkles size={14} className="text-bridal-gold" />
                            <span className="text-[10px] uppercase tracking-widest">New Arrival</span>
                        </div>
                     )}
                </div>

            </div>
            
            {/* Background Number (Decorative) */}
            <span className="absolute bottom-0 right-0 text-[20rem] font-serif text-bridal-charcoal/5 leading-none select-none pointer-events-none -mb-20 -mr-20">
                {index + 1}
            </span>

          </div>
        ))}
      </div>

    </section>
  );
}