/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef } from "react";
import Image from "next/image";
import { Sparkles, Award, MapPin, ArrowRight, PlayCircle, History } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Header Line Animation
    gsap.fromTo(".header-line-path", 
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 2.5, ease: "power3.out", delay: 0.2 }
    );

    // 2. Botanical Parallax
    gsap.utils.toArray<HTMLElement>(".floating-leaf").forEach((leaf, i) => {
      gsap.to(leaf, {
        yPercent: i % 2 === 0 ? 30 : -20,
        rotation: i % 2 === 0 ? 15 : -10,
        ease: "none",
        scrollTrigger: { trigger: leaf, start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    // 3. Section Reveals
    const reveals = document.querySelectorAll(".about-reveal");
    reveals.forEach((el) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" }
      });
    });
  }, { scope: container });

  return (
    <main ref={container} className="relative min-h-screen bg-bridal-ivory pt-32 pb-0 overflow-hidden">
      
      {/* --- ATMOSPHERIC LAYERS --- */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] bg-[url('/grain.png')] mix-blend-multiply" />
      <div className="floating-leaf absolute top-[10%] -left-32 w-[600px] h-[600px] opacity-20 blur-2xl z-0"><Image src="/leaves.webp" alt="" fill className="object-contain" /></div>
      <div className="floating-leaf absolute top-[40%] -right-40 w-[700px] h-[700px] opacity-15 blur-3xl z-0 rotate-90"><Image src="/leaves.webp" alt="" fill className="object-contain" /></div>

      {/* --- 1. THE MATRIARCH --- */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 mb-32 lg:mb-40">
        
        {/* GOLDEN THREAD SVG */}
        <svg 
            className="absolute top-[-50px] left-0 w-full h-[140%] pointer-events-none z-0 overflow-visible opacity-60" 
            viewBox="0 0 1000 500" 
            preserveAspectRatio="none"
        >
            <path 
                className="header-line-path"
                d="M-50,400 C150,450 300,50 600,150 S 900,50 1050,200" 
                fill="none" 
                stroke="#C5A059" /* Bridal Gold */
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
            />
        </svg>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
          <div className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative w-full md:w-[75%] lg:w-[85%] aspect-[3/4] bg-bridal-charcoal border-[12px] md:border-[20px] border-white shadow-2xl overflow-hidden group">
               <Image 
                 src="/own.webp" 
                 alt="Founder of Bonitha" 
                 fill 
                 className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-[2s]" 
               />
               <div className="absolute bottom-12 -right-12 w-64 h-32 z-20 pointer-events-none opacity-80 rotate-[-5deg]">
                  <Image src="/sign.png" alt="Owner Signature" fill className="object-contain brightness-0 invert" />
               </div>
            </div>
          </div>

          <div className="lg:col-span-6 about-reveal order-1 lg:order-2">
            <div className="flex items-center gap-3 text-bridal-gold mb-8">
               <History size={16} />
               <span className="font-sans text-[10px] uppercase tracking-[0.6em] font-bold">The Matriarch</span>
            </div>
            
            <div className="relative mb-10">
                <h1 className="font-serif text-6xl md:text-[7rem] lg:text-[8.5rem] text-bridal-charcoal uppercase tracking-tighter leading-[0.8]">
                The <br/> <span className="italic text-bridal-gold font-light lowercase">Visionary.</span>
                </h1>
                <p className="font-serif text-2xl md:text-3xl text-bridal-charcoal/40 italic mt-6 ml-2">
                    A Legacy of Living Art
                </p>
            </div>

            <div className="border-l border-bridal-gold/30 pl-6">
                <p className="font-sans text-base md:text-lg text-bridal-charcoal/70 leading-relaxed font-light first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-bridal-gold">
                For over 25 years, my journey has been defined by the architecture of a bride's joy. We don't just apply pigments or drape silk; we engineer a transformation that allows your most authentic self to emerge. Every silhouette we sculpt and every brushstroke we apply is rooted in unshakeable excellence.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. THE SANCTUARY --- */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 mb-32 lg:mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-5 about-reveal order-1 lg:order-2">
            <span className="font-serif text-3xl text-bridal-gold/30 mb-8 block">02</span>
            <div className="relative mb-10">
                <h2 className="font-serif text-5xl md:text-7xl text-bridal-charcoal leading-none uppercase tracking-tighter">
                    The <br/> <span className="italic text-bridal-gold font-light lowercase">Atelier.</span>
                </h2>
                <svg className="absolute -bottom-6 left-0 w-48 h-8 text-bridal-gold opacity-40 pointer-events-none" viewBox="0 0 200 30">
                     <path d="M0 15 Q 100 30 200 0" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
            </div>
            <p className="font-sans text-base text-bridal-charcoal/60 leading-relaxed font-light mb-12">
                A physical sanctuary of transformation. Our studio is designed to be an extension of our philosophy—a minimalist, professional space where artistry meets structural engineering. Whether you are in our coastal Galle sanctuary or our urban Kottawa atelier, the experience is defined by unshakeable elegance.
            </p>
            <div className="w-12 h-px bg-bridal-gold/30" />
          </div>

          <div className="lg:col-span-7 flex justify-center order-2 lg:order-1">
            <div className="relative w-full aspect-[16/10] bg-bridal-charcoal border-[12px] md:border-[20px] border-white shadow-2xl overflow-hidden group">
               <Image 
                 src="/st.webp" 
                 alt="Bonitha Atelier Sanctuary" 
                 fill 
                 className="object-cover transition-transform duration-[2s] group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. THE RECOGNITION (UPDATED: Wider Video, Tighter Image) --- */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 mb-32 about-reveal">
        <div className="flex items-center justify-center gap-3 text-bridal-gold mb-16">
           <Award size={20} />
           <span className="font-sans text-[11px] uppercase tracking-[0.5em] font-bold">Gilded Recognition</span>
        </div>

        {/* LAYOUT: 5:7 Split for wider video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
           
           {/* LEFT COLUMN: The Video (Expanded Width, Reduced Height to 3/4) */}
           <div className="lg:col-span-5 lg:order-1">
              <div className="relative w-full aspect-[3/4] bg-bridal-charcoal border-[12px] border-white shadow-2xl overflow-hidden group">
                 <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000">
                    <source src="/teamx.mp4" type="video/mp4" />
                 </video>
                 {/* Badge */}
                 <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                        <PlayCircle size={14} className="text-white" />
                    </div>
                    <span className="text-white/60 text-[9px] uppercase tracking-widest font-bold">Highlights</span>
                 </div>
              </div>
           </div>

           {/* RIGHT COLUMN: Text & Landscape Image Stacked */}
           <div className="lg:col-span-7 lg:order-2 flex flex-col justify-center">
              
              {/* Text Block */}
              <div className="lg:pr-12 mb-6">
                 <h3 className="font-serif text-3xl md:text-5xl text-bridal-charcoal mb-6">National Awards 2025</h3>
                 <p className="font-sans text-sm md:text-base text-bridal-charcoal/60 leading-relaxed mb-6 font-light">
                   Recognized as a pioneer in clinical skin preparation and South Asian couture excellence. Our legacy is measured not just in trophies, but by the thousands of stories we have helped write.
                 </p>
                 <ul className="flex flex-wrap gap-x-12 gap-y-4 border-l-2 border-bridal-gold pl-6">
                   {["National Awards 2025"].map((item) => (
                     <li key={item} className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-bridal-charcoal/40">{item}</li>
                   ))}
                 </ul>
              </div>

              {/* Landscape Image (Reduced Width & Closer Spacing) */}
              <div className="relative w-[85%] aspect-[16/9] border-[12px] border-white shadow-xl overflow-hidden">
                 <Image 
                    src="/awards.jpeg" 
                    alt="Award Ceremony Group" 
                    fill 
                    className="object-cover" 
                 />
                 <div className="absolute inset-0 bg-bridal-charcoal/10 mix-blend-multiply" />
              </div>

           </div>
        </div>
      </section>

      {/* --- 4. THE REACH --- */}
      <section className="relative z-10 bg-bridal-charcoal py-32 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('/grain.png')] mix-blend-overlay" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <h2 className="font-serif text-5xl md:text-8xl uppercase tracking-tighter leading-none">
                 The Dual <br/> <span className="italic text-bridal-gold font-light lowercase">Sanctuaries.</span>
              </h2>
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold mb-4">Find us across the island</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-1">
              <div className="bg-white/5 backdrop-blur-md p-16 border border-white/10 group hover:bg-bridal-gold transition-all duration-700">
                 <MapPin className="text-bridal-gold group-hover:text-white mb-8 transition-colors" />
                 <h3 className="font-serif text-4xl mb-4">Mahamodara</h3>
                 <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/50 group-hover:text-white transition-colors mb-8">Galle, Sri Lanka</p>
                 <button className="flex items-center gap-4 text-white/40 group-hover:text-white transition-colors">
                    <span className="text-[10px] uppercase tracking-widest font-bold border-b border-white/20 pb-1">View on Map</span>
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-all" />
                 </button>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-16 border border-white/10 group hover:bg-bridal-gold transition-all duration-700">
                 <MapPin className="text-bridal-gold group-hover:text-white mb-8 transition-colors" />
                 <h3 className="font-serif text-4xl mb-4">Atelier Kottawa</h3>
                 <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/50 group-hover:text-white transition-colors mb-8">Colombo District, Sri Lanka</p>
                 <button className="flex items-center gap-4 text-white/40 group-hover:text-white transition-colors">
                    <span className="text-[10px] uppercase tracking-widest font-bold border-b border-white/20 pb-1">View on Map</span>
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-all" />
                 </button>
              </div>
           </div>
        </div>
      </section>

    </main>
  );
}