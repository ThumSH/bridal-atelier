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
  
  // SEPARATE REFS TO FIX CONFLICT
  const revealWrapperRef = useRef<HTMLDivElement>(null); 
  const parallaxInnerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. REVEAL ANIMATION (Applied to the Wrapper)
    // This handles the "Enter" fade-in without fighting the scroll movement
    gsap.fromTo(revealWrapperRef.current, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: revealWrapperRef.current,
          start: "top 85%", // Triggers slightly earlier
        }
      }
    );

    // 2. PARALLAX ANIMATION (Applied to the Inner Content)
    // Smooth movement that doesn't conflict with the reveal y-axis
    gsap.to(parallaxInnerRef.current, {
      y: -50, 
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5, // Added smoothing to prevent "jitters" on low-end screens
      }
    });

    // 3. Leaf Parallax
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

    // 4. Narrative Reveal
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
    .fromTo(".hair-gold-rope", 
      { strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 },
      { strokeDasharray: 300, strokeDashoffset: 0, opacity: 0.8, duration: 1.8, ease: "power2.inOut" },
      "-=0.8"
    );

    // 5. STABLE VIDEO PLAYBACK
    // Optimization: Trigger off the STATIC container, not the moving video
    if (videoRef.current) {
        ScrollTrigger.create({
            trigger: container.current, // Use the big section as trigger (Stable)
            start: "top 70%", 
            end: "bottom 30%",
            onEnter: () => videoRef.current?.play().catch(() => {}),
            onLeave: () => videoRef.current?.pause(),
            onEnterBack: () => videoRef.current?.play().catch(() => {}),
            onLeaveBack: () => videoRef.current?.pause(),
        });
    }

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-bridal-ivory py-32 lg:py-48 overflow-hidden">
      
      {/* --- ATMOSPHERIC LEAF OVERLAYS --- */}
      <div className="hair-leaf absolute top-0 -left-20 w-[600px] h-[600px] z-0 pointer-events-none opacity-30 blur-sm mix-blend-multiply">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>
      <div className="hair-leaf absolute bottom-20 -right-20 w-[450px] h-[450px] z-0 pointer-events-none opacity-20 blur-sm rotate-90 mix-blend-multiply">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center relative z-10">
        
        {/* --- LEFT: CINEMATIC VIDEO FRAME --- */}
        <div className="flex justify-center lg:justify-start">
           
           {/* WRAPPER: Handles Opacity/Slide In */}
           <div ref={revealWrapperRef} className="relative w-full max-w-lg aspect-[9/14] will-change-transform">
              
              {/* INNER: Handles Parallax Movement */}
              <div ref={parallaxInnerRef} className="w-full h-full relative">
                
                {/* The Video Frame */}
                <div className="relative w-full h-full rounded-t-full rounded-b-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border-4 border-white bg-bridal-ivory z-10">
                    <video
                    ref={videoRef}
                    playsInline 
                    loop 
                    muted 
                    preload="auto" 
                    className="absolute inset-0 w-full h-full object-cover"
                    poster="/ch.webp" 
                    >
                    <source src="/h-m3.webm" type="video/webm" />
                    </video>

                    <div className="absolute inset-0 bg-black/5 pointer-events-none mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

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

                {/* The Decorative Border (Moves with Parallax) */}
                <div className="absolute -inset-6 border border-bridal-gold/20 rounded-t-full rounded-b-[4rem] pointer-events-none -z-10" />
              
              </div>
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

           <div className="hair-anim space-y-0">
              {HAIR_STEPS.map((step, index) => (
                <div key={step.id} className="flex gap-8 group relative pb-12 last:pb-0">
                   <div className="relative flex flex-col items-center">
                      <span className="font-serif text-xl text-bridal-gold/40 group-hover:text-bridal-gold transition-all duration-500 font-italic">
                        {step.id}
                      </span>
                      {index !== HAIR_STEPS.length - 1 && (
                        <div className="absolute top-8 bottom-0 w-px bg-bridal-charcoal/10 group-hover:bg-bridal-gold/30 transition-all duration-700 h-full" />
                      )}
                   </div>
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