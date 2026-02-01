"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Plus } from "lucide-react";
import { cn } from "@/lib/utils"; //

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
    detailImage: "/waist.webp",
    bgText: "SCULPTED",
    tags: ["Sculpted", "Royal", "Volume"]
  },
  {
    id: "drop",
    title: "The Drop Waist",
    subtitle: "Vintage Revival",
    description: "Characterized by a lengthened bodice that hits below the hips, blending 1920s glamour with modern structure.",
    image: "/waist.webp",
    detailImage: "/The Basque.webp",
    bgText: "VINTAGE",
    tags: ["Elongated", "Vintage", "Sleek"]
  },
  {
    id: "architectural",
    title: "The Architectural",
    subtitle: "Modern Minimalist",
    description: "Clean lines and artful folds. A sheath silhouette that focuses on fabric manipulation rather than embellishment.",
    image: "/archi.webp",
    detailImage: "/mermaid.webp",
    bgText: "MODERN",
    tags: ["Draped", "Modern", "Clean"]
  },
  {
    id: "mermaid",
    title: "The Mermaid",
    subtitle: "Timeless Contour",
    description: "Precision tailoring that hugs the curves and flares dramatically at the knee for the ultimate feminine shape.",
    image: "/mermaid.webp",
    detailImage: "/archi.webp",
    bgText: "CONTOUR",
    tags: ["Fitted", "Dramatic", "Curves"]
  }
];

export default function DressSilhouettes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useGSAP(
    () => {
      if (!wrapperRef.current || !triggerRef.current) return;

      const mm = gsap.matchMedia();

      // --- DESKTOP ANIMATION (Horizontal Scroll) ---
      mm.add("(min-width: 768px)", () => {
          const totalWidth = wrapperRef.current!.scrollWidth;
          const xDist = -(totalWidth - window.innerWidth);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: triggerRef.current,
              pin: true,
              scrub: 0.5,      
              start: "top top",
              end: () => `+=${wrapperRef.current!.scrollWidth}`, 
              invalidateOnRefresh: true,
            }
          });

          tl.to(wrapperRef.current, {
            x: xDist,
            ease: "none",
            onUpdate: function() {
               const prog = this.progress();
               const idx = Math.round(prog * (DRESSES.length - 1));
               setActiveSlide(idx);
            }
          });

          // Parallax for Main Images
          gsap.utils.toArray<HTMLElement>(".runway-image").forEach((img) => {
            gsap.to(img, {
                objectPosition: "80% 50%", 
                ease: "none",
                scrollTrigger: {
                    trigger: img,
                    containerAnimation: tl,
                    start: "left right",
                    end: "right left",
                    scrub: true
                }
            })
          });

          // Parallax for Background Text
          gsap.utils.toArray<HTMLElement>(".bg-parallax-text").forEach((text) => {
            gsap.to(text, {
                x: 200, 
                ease: "none",
                scrollTrigger: {
                    trigger: text,
                    containerAnimation: tl,
                    start: "left right",
                    end: "right left",
                    scrub: true
                }
            })
          });
          
          // Parallax for Detail Images
          gsap.utils.toArray<HTMLElement>(".detail-image-container").forEach((el) => {
            gsap.to(el, {
                y: -30, 
                x: 20, 
                rotation: 5,
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    containerAnimation: tl,
                    start: "left right",
                    end: "right left",
                    scrub: 1
                }
            })
          });
      });

      // --- MOBILE ANIMATION (Simple Fade Up) ---
      mm.add("(max-width: 767px)", () => {
          gsap.utils.toArray<HTMLElement>(".dress-mobile-card").forEach((card) => {
             gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                }
             })
          });
      });

    },
    { scope: triggerRef }
  );

  return (
    // Height is auto on mobile, screen on desktop
    <section ref={triggerRef} className="relative w-full overflow-hidden bg-bridal-ivory h-auto md:h-screen">
      
      {/* Texture */}
      <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-multiply z-0" />

      {/* Floating Header */}
      <div className="absolute top-10 left-6 md:top-20 md:left-12 z-20">
        <div className="bg-bridal-ivory/80 backdrop-blur-md border border-bridal-charcoal/5 px-6 py-4 rounded-xl shadow-sm">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] mb-1 block text-bridal-charcoal/60">
                2026 Collection
            </span>
            <h2 className="font-serif text-2xl md:text-4xl text-bridal-charcoal">
                Runway <span className="italic text-bridal-sage">Edits</span>
            </h2>
        </div>
      </div>

      {/* Progress Indicator (Desktop Only) */}
      <div className="hidden md:flex absolute bottom-10 left-12 z-20 items-end gap-4">
         <span className="font-serif text-5xl leading-none text-bridal-charcoal">0{activeSlide + 1}</span>
         <div className="w-24 h-px bg-bridal-charcoal/10 mb-2 ml-2 relative overflow-visible">
            <div 
                className="absolute top-0 left-0 h-[2px] bg-bridal-gold transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.8)]" 
                style={{ width: `${((activeSlide + 1) / DRESSES.length) * 100}%` }}
            />
         </div>
      </div>

      {/* SCROLL WRAPPER */}
      <div ref={sectionRef} className="h-full w-full pt-32 md:pt-0">
          {/* Mobile: flex-col (vertical stack)
             Desktop: flex-row (horizontal track)
          */}
          <div ref={wrapperRef} className="flex flex-col md:flex-row h-auto md:h-full w-full md:w-fit">
            {DRESSES.map((dress, index) => (
            <div 
                key={dress.id} 
                className="dress-slide dress-mobile-card relative h-auto md:h-full w-full md:w-[100vw] flex items-center justify-center px-6 py-12 md:px-20 border-b md:border-b-0 md:border-r border-bridal-charcoal/5 overflow-hidden"
            >
                {/* Background Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] z-0">
                    <h1 className="bg-parallax-text font-serif text-[20vw] md:text-[15vw] leading-none text-bridal-charcoal whitespace-nowrap">
                        {dress.bgText}
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 w-full max-w-7xl items-center relative z-10">
                    
                    {/* 1. TEXT SIDE */}
                    <div className="relative flex flex-col items-start space-y-6 md:space-y-8 order-2 md:order-1">
                        
                        <div className="flex gap-2 relative z-10 flex-wrap">
                            {dress.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 border border-bridal-charcoal/20 rounded-full text-[10px] uppercase tracking-widest text-bridal-charcoal/60">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        <div className="relative z-10">
                            {/* Adjusted Font Size for Mobile */}
                            <h3 className="font-serif text-5xl md:text-8xl text-bridal-charcoal leading-[0.9]">
                                {dress.title}
                            </h3>
                            <div className="w-16 md:w-24 h-1 bg-bridal-sage mt-4 md:mt-6 mb-2" />
                        </div>
                        
                        <p className="font-sans text-xs md:text-sm uppercase tracking-[0.2em] text-bridal-sage font-medium relative z-10">
                            {dress.subtitle}
                        </p>
                        
                        <p className="font-sans text-sm md:text-base leading-relaxed text-bridal-charcoal/70 max-w-sm bg-bridal-ivory/60 backdrop-blur-sm p-4 -ml-4 rounded-lg relative z-10">
                            {dress.description}
                        </p>

                        <button className="group flex items-center gap-3 mt-4 text-xs uppercase tracking-widest text-bridal-charcoal transition-all hover:text-bridal-sage relative z-10">
                            <span className="relative pb-1 border-b border-bridal-charcoal group-hover:border-bridal-sage transition-colors">
                            View Gown Details
                            </span>
                            <div className="p-2 rounded-full group-hover:bg-bridal-sage/10 group-hover:shadow-[0_0_20px_rgba(138,154,91,0.6)] transition-all">
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                            </div>
                        </button>
                    </div>

                    {/* 2. IMAGE SIDE */}
                    <div className="relative h-[60vh] md:h-[75vh] w-full order-1 md:order-2">
                        <div className="relative w-full h-full overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-bridal-charcoal/10 border-[4px] md:border-[8px] border-white transform-gpu">
                            <Image
                                src={dress.image}
                                alt={dress.title}
                                fill
                                priority={index === 0}
                                className="runway-image object-cover object-left" 
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-bridal-ivory/20 to-transparent mix-blend-overlay" />
                            
                            {/* New Arrival Badge */}
                            {index === 0 && (
                                <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/90 backdrop-blur-md px-3 py-2 md:px-5 md:py-2 rounded-full flex items-center gap-2 md:gap-3 animate-pulse-slow border border-bridal-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.5)] z-20">
                                    <Sparkles size={12} className="text-bridal-gold fill-bridal-gold" />
                                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-bridal-charcoal font-bold">New</span>
                                </div>
                            )}
                        </div>

                        {/* DETAIL IMAGE: Moved into Image Column (Bottom Left) */}
                        {/* Hidden on Mobile to reduce clutter */}
                        <div className="detail-image-container hidden md:block absolute -bottom-12 -left-12 w-48 h-64 rounded-lg overflow-hidden border-4 border-white shadow-xl -rotate-6 z-30">
                            <Image 
                                src={dress.detailImage} 
                                alt="Detail" 
                                fill 
                                sizes="200px"
                                className="object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm">
                                <Plus size={12} className="text-bridal-charcoal" />
                            </div>
                        </div>

                        <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-full h-full border border-bridal-charcoal/5 rounded-[2rem] md:rounded-[3rem] -z-10" />
                    </div>

                </div>
                
                {/* Background Number */}
                <span className="absolute bottom-4 right-4 md:bottom-12 md:right-6 font-serif text-[20vw] md:text-[12rem] text-bridal-charcoal/5 select-none pointer-events-none leading-none">
                    0{index + 1}
                </span>

            </div>
            ))}
          </div>
      </div>

    </section>
  );
}