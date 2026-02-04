"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HAIR_STEPS = [
  { id: "01", title: "Texture Prep", desc: "Priming the hair shaft for volume and hold." },
  { id: "02", title: "Structural Base", desc: "Setting the anchor points for all-day security." },
  { id: "03", title: "The Sculpt", desc: "Waving, pinning, and shaping the silhouette." },
  { id: "04", title: "Veil & Finish", desc: "Seamless integration and humidity-proof locking." },
];

export default function HairArtistry() {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Video Parallax & Floating
    gsap.to(videoContainerRef.current, {
      y: -80, // Increased travel for better depth
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // 2. Leaf Parallax (Dappled Light System)
    gsap.to(".hair-leaf", {
      yPercent: 35,
      rotation: 15,
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    // 3. Narrative Reveal Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".narrative-side",
        start: "top 75%",
      }
    });

    tl.from(".hair-anim", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    })
    // ANIMATING THE CURVED ROPE
    .fromTo(".hair-gold-rope", 
      { strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 },
      { strokeDasharray: 300, strokeDashoffset: 0, opacity: 0.8, duration: 1.8, ease: "power2.inOut" },
      "-=0.8"
    );

    // 4. OPTIMIZED VIDEO PLAYBACK
    // Changed triggers to ensure video plays whenever visible (fixing the 'stop' issue)
    ScrollTrigger.create({
        trigger: container.current,
        start: "top bottom", // Play immediately when section enters viewport
        end: "bottom top",   // Stop only when section fully leaves viewport
        onEnter: () => videoRef.current?.play(),
        onLeave: () => videoRef.current?.pause(),
        onEnterBack: () => videoRef.current?.play(),
        onLeaveBack: () => videoRef.current?.pause(),
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-bridal-ivory py-32 lg:py-48 overflow-hidden">
      
      {/* --- ATMOSPHERIC LEAF OVERLAYS --- */}
      <div className="hair-leaf absolute top-0 -left-20 w-150 h-150 z-0 pointer-events-none opacity-30 blur-sm mix-blend-multiply">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>
      <div className="hair-leaf absolute bottom-20 -right-20 w-112.5 h-112.5 z-0 pointer-events-none opacity-20 blur-sm rotate-90 mix-blend-multiply">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>

      {/* Main Grid Container */}
      <div className="max-w-300 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center relative z-10">
        
        {/* --- LEFT: CINEMATIC VIDEO FRAME (Arched) --- */}
        <div className="flex justify-center lg:justify-start">
           <div ref={videoContainerRef} className="relative w-full max-w-lg aspect-9/14">
              
              {/* Museum Arched Frame */}
              <div className="relative w-full h-full rounded-t-full rounded-b-4xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border-4 border-white bg-bridal-ivory z-10">
                <video
                  ref={videoRef}
                  playsInline 
                  loop 
                  muted 
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="/ch.webp" 
                >
                  <source src="/h-m3.webm" type="video/webm" />
                </video>

                {/* Overlays for Cinematography */}
                <div className="absolute inset-0 bg-black/5 pointer-events-none mix-blend-overlay" />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Styling Badge */}
                <div className="absolute bottom-12 left-10 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-full">
                   <div className="flex items-center gap-3">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white font-bold">Now Styling</span>
                   </div>
                </div>
              </div>

              {/* Decorative Secondary Frame (Gilded Border) */}
              <div className="absolute -inset-6 border border-bridal-gold/20 rounded-t-full rounded-b-[4rem] pointer-events-none -z-10" />
           </div>
        </div>

        {/* --- RIGHT: THE NARRATIVE --- */}
        <div className="narrative-side flex flex-col justify-center">
           <div className="hair-anim flex items-center gap-3 text-bridal-gold mb-8">
             <Sparkles size={16} />
             <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold">Haute Coiffure</span>
           </div>

           <div className="relative mb-14">
              <h2 className="hair-anim font-serif text-5xl md:text-7xl lg:text-8xl text-bridal-charcoal leading-[0.85] uppercase tracking-tighter">
                Defined by <br/> 
                <span className="italic text-bridal-gold font-light lowercase">Movement.</span>
              </h2>
              
              {/* --- ENHANCED CURVED GOLDEN ROPE --- */}
              <svg 
                className="absolute -bottom-10 left-0 w-64 h-12 pointer-events-none" 
                viewBox="0 0 250 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  className="hair-gold-rope text-bridal-gold" 
                  d="M2 20C50 40 150 45 248 10" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                />
              </svg>
           </div>

           <p className="hair-anim font-sans text-base text-bridal-charcoal/70 leading-relaxed mb-16 max-w-md font-light">
             We build a foundation that ensures your look remains flawless through humidity, veil placement, and movement.
           </p>

           {/* Vertical Process Timeline */}
           <div className="hair-anim space-y-0">
              {HAIR_STEPS.map((step, index) => (
                <div key={step.id} className="flex gap-8 group relative pb-12 last:pb-0">
                   
                   {/* Left Column: Number + Vertical Line */}
                   <div className="relative flex flex-col items-center">
                      <span className="font-serif text-xl text-bridal-gold/40 group-hover:text-bridal-gold transition-all duration-500 font-italic">
                        {step.id}
                      </span>
                      {/* Vertical Connector Line (Only if not last item) */}
                      {index !== HAIR_STEPS.length - 1 && (
                        <div className="absolute top-8 bottom-0 w-px bg-bridal-charcoal/10 group-hover:bg-bridal-gold/30 transition-all duration-700 h-full" />
                      )}
                   </div>

                   {/* Right Column: Text */}
                   <div className="flex flex-col pt-1">
                      <h4 className="font-serif text-2xl md:text-3xl text-bridal-charcoal mb-2 group-hover:translate-x-3 transition-transform duration-700">
                        {step.title}
                      </h4>
                      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-bridal-sage/80 font-bold">
                        {step.desc}
                      </p>
                   </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}