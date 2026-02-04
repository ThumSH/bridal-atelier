/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef } from "react";
import Image from "next/image";
import { Sparkles, Eye } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. Updated Volumes
const GOWN_VOLUMES = [
  {
    id: "Vol. I",
    title: "The Architect of Shadows",
    desc: "A study in contrast and silhouette architecture. This volume explores the aggressive elegance of the mermaid form, utilizing internal contour-boning to sculpt the waist into a masterpiece of symmetry. We focus on the interplay between heavy silk crepe and the softest Italian lace, ensuring that every movement creates a cinematic shadow. It is an act of engineering designed for the bride who wishes to command the room with a single, unshakeable line.",
    heroVideo: "/mvid-1.webm",
  }
];

// 2. Full Gallery
const FULL_GALLERY = [
  { id: 1, src: "/p-11.webp", label: "Chantilly Morning" },
  { id: 2, src: "/p-12.webp", label: "The Corset Study" },
  { id: 3, src: "/p-13.webp", label: "Silk Cascade" },
  { id: 4, src: "/p-14.webp", label: "Archive 1998" },
  { id: 5, src: "/p-15.webp", label: "Pearl Dust" },
  { id: 6, src: "/p-16.webp", label: "Heirloom Stitch" },
  { id: 7, src: "/p-17.webp", label: "Fluid Motion" },
  { id: 8, src: "/p-18.webp", label: "Raw Hemline" },
  { id: 9, src: "/p-19.webp", label: "The Drapery" },
  { id: 10, src: "/p-20.webp", label: "Backless Noir" },
  { id: 11, src: "/p-21.webp", label: "Veil Anatomy" },
  { id: 12, src: "/p-22.webp", label: "Satin Fold" },
  { id: 13, src: "/p-23.webp", label: "Midnight Fitting" },
  { id: 14, src: "/p-24.webp", label: "Vintage Lace" },
  { id: 15, src: "/p-25.webp", label: "The Vow" },
  { id: 16, src: "/p-26.webp", label: "Ceremony Ready" },
  { id: 17, src: "/p-27.webp", label: "Glass Beadwork" },
  { id: 18, src: "/p-28.webp", label: "Final Texture" },
];

export default function GownsAnthologyPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Header Line Animation
    gsap.fromTo(".header-line-path", 
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 2.5, ease: "power3.out", delay: 0.2 }
    );

    gsap.from(".header-desc", {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 1,
      ease: "power2.out"
    });

    // 2. Dappled Light System
    gsap.to(".anthology-leaf", {
      yPercent: 30,
      rotation: 10,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // 3. Reveal Animations
    const reveals = document.querySelectorAll(".reveal-item");
    reveals.forEach((item) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
        }
      });
      tl.from(item, { y: 60, opacity: 0, duration: 1.2, ease: "power3.out" })
        .fromTo(item.querySelector(".rope-path"), 
          { strokeDasharray: 400, strokeDashoffset: 400 },
          { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, "-=0.8");
    });
  }, { scope: container });

  return (
    <main ref={container} className="relative min-h-screen bg-bridal-ivory pt-32 pb-48 overflow-hidden">
      
      {/* --- ATMOSPHERIC LAYERS --- */}
      <div className="anthology-leaf absolute top-[10%] -left-20 w-[600px] h-[600px] opacity-20 blur-3xl mix-blend-multiply z-0">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>

      {/* --- HEADER SECTION --- */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 mb-40">
        
        {/* GOLDEN THREAD SVG */}
        <svg 
            className="absolute top-[-50px] left-0 w-full h-[140%] pointer-events-none z-0 overflow-visible opacity-60" 
            viewBox="0 0 1000 400" 
            preserveAspectRatio="none"
        >
            <path 
                className="header-line-path"
                d="M-50,150 C150,50 300,250 500,100 S 800,20 950,150" 
                fill="none" 
                stroke="#C5A059" /* Bridal Gold */
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
            />
        </svg>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Title Block */}
            <div className="lg:col-span-8">
                <div className="flex items-center gap-3 text-bridal-gold mb-8">
                    <Sparkles size={16} />
                    <span className="font-sans text-[11px] uppercase tracking-[0.5em] font-bold">The Anthology</span>
                </div>
                <h1 className="font-serif text-6xl md:text-[9rem] text-bridal-charcoal uppercase tracking-tighter leading-[0.8]">
                    Bespoke <br/> <span className="italic text-bridal-gold font-light lowercase">Volumes.</span>
                </h1>
            </div>

            {/* Description Block */}
            <div className="lg:col-span-4 header-desc pb-4 pl-2 lg:pl-0 border-l lg:border-l-0 border-bridal-gold/30">
                <p className="font-sans text-base md:text-lg text-bridal-charcoal/70 leading-relaxed font-light">
                    An archive of form, fluid and fixed. Where the memory of the needle meets the structure of the dream. This is a collection of our most defined architectural studies, preserved for the modern muse.
                </p>
            </div>
        </div>
      </section>

      {/* --- SECTION 2: THE UNIQUE TITLES & DESCRIPTIONS --- */}
      <div className="relative z-10 space-y-72 mb-64">
        {GOWN_VOLUMES.map((vol, idx) => (
          <section key={vol.id} className="reveal-item max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* TEXT: Now spans 4 columns (smaller) to give space to video */}
            <div className={`lg:col-span-4 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
               <span className="font-serif text-3xl text-bridal-gold/30 mb-8 block">{vol.id}</span>
               <div className="relative mb-14">
                  <h2 className="font-serif text-5xl md:text-7xl text-bridal-charcoal leading-none uppercase tracking-tighter">
                     {vol.title.split(' ').slice(0, 2).join(' ')} <br/>
                     <span className="italic text-bridal-gold font-light lowercase">{vol.title.split(' ').slice(2).join(' ')}</span>
                  </h2>
                  <svg className="absolute -bottom-8 left-0 w-80 h-12 pointer-events-none" viewBox="0 0 300 40">
                    <path className="rope-path text-bridal-gold" d="M5 20C70 40 180 40 295 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
                  </svg>
               </div>
               <p className="font-sans text-base text-bridal-charcoal/70 leading-relaxed font-light first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-bridal-gold">
                  {vol.desc}
               </p>
            </div>

            {/* VIDEO: Now spans 8 columns (larger) + aspect ratio increased to 3:2 */}
            <div className={`lg:col-span-8 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
               <div className="relative aspect-[3/2] bg-bridal-charcoal border-[15px] md:border-[25px] border-white shadow-2xl overflow-hidden">
                  {vol.heroVideo.endsWith('.webm') ? (
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                      <source src={vol.heroVideo} type="video/webm" />
                    </video>
                  ) : (
                    <Image src={vol.heroVideo} alt="" fill className="object-cover" />
                  )}
               </div>
            </div>
          </section>
        ))}
      </div>

      {/* --- SECTION 3: THE FULL ARCHIVE GRID --- */}
      <section className="relative z-10 max-w-[1500px] mx-auto px-6">
        <div className="mb-16 border-b border-bridal-charcoal/5 pb-8 flex items-end justify-between">
           <h2 className="font-serif text-4xl md:text-6xl text-bridal-charcoal uppercase tracking-tighter leading-none">
              The Full <br/> <span className="italic text-bridal-gold font-light lowercase">Anthology.</span>
           </h2>
           <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-bridal-charcoal/30 font-bold mb-2">Est. 1995 • Atelier</span>
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mb-32">
           {FULL_GALLERY.map((img) => (
             <div key={img.id} className="group relative aspect-[3/4] overflow-hidden bg-bridal-charcoal rounded-none">
                <Image 
                  src={img.src} 
                  alt={img.label} 
                  fill 
                  className="object-cover transition-all duration-[1.5s] ease-in-out group-hover:scale-110 grayscale-[0.8] group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-bridal-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center">
                   <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <Eye size={20} className="text-white" />
                   </div>
                   <span className="text-white font-sans text-[11px] uppercase tracking-[0.3em] font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {img.label}
                   </span>
                </div>
             </div>
           ))}
        </div>

        {/* --- SECTION 4: FOOTNOTES / DESCRIPTIONS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 py-12 border-t border-bridal-charcoal/10">
            {/* Description 1 */}
            <div className="reveal-item">
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-bridal-gold mb-4 block">01. The Source</span>
                <h3 className="font-serif text-2xl text-bridal-charcoal mb-4">Fabric as Narrative</h3>
                <p className="font-sans text-sm text-bridal-charcoal/60 leading-relaxed font-light">
                    We do not merely select fabrics; we curate history. Our silks are sourced from a third-generation mill in Lake Como, where the water's pH creates a distinct sheen unavailable elsewhere. Each roll is inspected by hand, ensuring that the narrative of the gown begins long before the first cut is made.
                </p>
            </div>

            {/* Description 2 */}
            <div className="reveal-item">
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-bridal-gold mb-4 block">02. The Process</span>
                <h3 className="font-serif text-2xl text-bridal-charcoal mb-4">The Hallowed Seam</h3>
                <p className="font-sans text-sm text-bridal-charcoal/60 leading-relaxed font-light">
                    A gown is not manufactured; it is engineered. Our internal corsetry requires forty hours of hand-stitching, hiding structural integrity beneath layers of delicate tulle. It is a paradox of design: heavy engineering rendered completely weightless to the eye, allowing the bride to move with ethereal grace.
                </p>
            </div>

            {/* Description 3 */}
            <div className="reveal-item">
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-bridal-gold mb-4 block">03. The Philosophy</span>
                <h3 className="font-serif text-2xl text-bridal-charcoal mb-4">Imperfection & Soul</h3>
                <p className="font-sans text-sm text-bridal-charcoal/60 leading-relaxed font-light">
                    We reject the sterile perfection of the machine. A dropped stitch, a raw hem, a hand-dyed gradient—these are the signatures of human touch. We believe a gown should feel alive, possessing a soul that resonates with the woman wearing it, transforming a garment into a memory kept in silk.
                </p>
            </div>
        </div>

      </section>

    </main>
  );
}