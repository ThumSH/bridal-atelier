"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INSTA_POSTS = [
  { id: 1, src: "/p-1.webp", label: "The Morning Of", span: "md:col-span-2 md:row-span-2" },
  { id: 2, src: "/p-2.webp", label: "Pure Elegance", span: "md:col-span-1 md:row-span-1" },
  { id: 3, src: "/p-3.webp", label: "Golden Hour", span: "md:col-span-1 md:row-span-1" },
  { id: 4, src: "/p-4.webp", label: "Eternal Vows", span: "md:col-span-2 md:row-span-1" },
];

export default function InstaFeed() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      }
    });

    tl.from(".insta-header-anim", {
      y: 30,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "expo.out"
    })
    .fromTo(".insta-rope-path", 
      { strokeDasharray: 400, strokeDashoffset: 400, opacity: 0 },
      { strokeDasharray: 400, strokeDashoffset: 0, opacity: 0.6, duration: 2, ease: "power2.inOut" },
      "-=1"
    );

    tl.from(".insta-item", {
      scale: 0.95,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power4.out"
    }, "-=1.2");

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-[#FAF9F6] py-32 md:py-48 overflow-hidden">
      
      {/* --- ATMOSPHERIC ELEMENTS --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
         <div className="insta-leaf absolute -top-20 -left-20 w-[600px] h-[600px] opacity-[0.03] grayscale">
            <Image src="/leaves.webp" alt="" fill className="object-contain" />
         </div>
      </div>

      {/* --- EDITORIAL HEADER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-32 text-center">
          <div className="insta-header-anim flex items-center justify-center gap-4 text-bridal-gold mb-8">
             <span className="w-12 h-[1px] bg-bridal-gold/30"></span>
             <Sparkles size={14} className="animate-pulse" />
             <span className="font-sans text-[11px] uppercase tracking-[0.6em] font-semibold">The Anthology</span>
             <span className="w-12 h-[1px] bg-bridal-gold/30"></span>
          </div>

          <div className="relative inline-block">
             <h2 className="insta-header-anim font-serif text-6xl md:text-9xl text-bridal-charcoal leading-[0.8] uppercase tracking-tighter">
                Bonitha<br />
                <span className="italic text-bridal-gold font-light lowercase ml-12 md:ml-24">Aesthetics.</span>
             </h2>
             
             <svg 
               className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-64 md:w-96 h-12 pointer-events-none" 
               viewBox="0 0 300 50" 
               fill="none" 
             >
               <path 
                 className="insta-rope-path text-bridal-gold/40" 
                 d="M5 40C100 45 200 10 295 20" 
                 stroke="currentColor" 
                 strokeWidth="1" 
               />
             </svg>
          </div>
      </div>

      {/* --- ASYMMETRIC MASONRY GRID --- */}
      <div className="relative z-10 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
        {INSTA_POSTS.map((post) => (
          <div 
            key={post.id} 
            className={`insta-item group relative overflow-hidden cursor-pointer bg-neutral-200 ${post.span} aspect-square md:aspect-auto min-h-[400px]`}
          >
              <Image 
                src={post.src} 
                alt={post.label} 
                fill
                sizes="(max-width: 1600px) 50vw, 800px" 
                className="object-cover transition-transform duration-[2s] cubic-bezier(0.2, 1, 0.3, 1) group-hover:scale-105"
              />

              {/* Minimal Overlay */}
              <div className="absolute inset-0 bg-bridal-charcoal/0 group-hover:bg-bridal-charcoal/40 transition-colors duration-700" />
              
              {/* Content Reveal */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                 <span className="text-white font-serif italic text-2xl mb-2">{post.label}</span>
                 <div className="w-8 h-px bg-white/60 mb-4" />
                 <span className="text-white font-sans text-[10px] uppercase tracking-[0.4em]">View Editorial</span>
              </div>
          </div>
        ))}
      </div>

      {/* --- REFINED CTA --- */}
      <div className="relative z-10 mt-32 flex flex-col items-center">
          <Link href="/journal" className="group relative">
            <div className="overflow-hidden border border-bridal-charcoal px-20 py-8 transition-all duration-500 hover:bg-bridal-charcoal">
                <span className="relative z-10 font-sans text-[11px] uppercase tracking-[0.5em] font-bold text-bridal-charcoal group-hover:text-white flex items-center gap-6">
                   Explore Full Journal
                   <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-3" />
                </span>
            </div>
          </Link>
          
          <p className="mt-12 text-[10px] font-sans text-bridal-charcoal/40 uppercase tracking-[0.8em] text-center px-6">
            Capturing the fleeting moments of forever
          </p>
      </div>

    </section>
  );
}