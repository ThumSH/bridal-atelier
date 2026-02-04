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
      y: -50,
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
        scrub: true,
      }
    });

    // 3. Narrative Reveal Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
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
      "-=1"
    );

    // 4. Optimized Safe Autoplay
    if (videoRef.current) {
      const safePlay = () => {
        const promise = videoRef.current?.play();
        if (promise !== undefined) {
          promise.catch(() => { /* AbortError Handled */ });
        }
      };
      ScrollTrigger.create({
        trigger: videoRef.current,
        start: "top 80%",
        onEnter: safePlay,
        onLeave: () => videoRef.current?.pause(),
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-bridal-ivory py-32 lg:py-48 overflow-hidden">
      
      {/* --- ATMOSPHERIC LEAF OVERLAYS --- */}
      <div className="hair-leaf absolute top-0 -left-20 w-[600px] h-[600px] z-0 pointer-events-none opacity-30 blur-2xl mix-blend-multiply">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>
      <div className="hair-leaf absolute bottom-20 -right-20 w-[450px] h-[450px] z-0 pointer-events-none opacity-20 blur-xl rotate-90 mix-blend-multiply">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>

      {/* Main Grid Container (Tightened for professionalism) */}
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center relative z-10">
        
        {/* --- LEFT: CINEMATIC VIDEO FRAME (Arched) --- */}
        <div className="flex justify-center lg:justify-start">
           <div ref={videoContainerRef} className="relative w-full max-w-lg aspect-[9/14]">
              
              {/* Museum Arched Frame */}
              <div className="relative w-full h-full rounded-t-full rounded-b-[2rem] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.3)] border-[1px] border-white/50 bg-bridal-ivory">
                <video
                  ref={videoRef}
                  playsInline loop muted preload="auto"
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="/ch.webp" 
                >
                  <source src="/h-m3.mp4" type="video/mp4" />
                </video>

                {/* Overlays for Cinematography */}
                <div className="absolute inset-0 bg-black/5 pointer-events-none mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

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
              <div className="absolute -inset-8 border border-bridal-gold/15 rounded-t-full rounded-b-[4rem] pointer-events-none -z-10 opacity-50" />
           </div>
        </div>

        {/* --- RIGHT: THE NARRATIVE --- */}
        <div className="flex flex-col justify-center">
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
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                />
              </svg>
           </div>

           <p className="hair-anim font-sans text-base text-bridal-charcoal/70 leading-relaxed mb-16 max-w-md font-light">
              We build a foundation that ensures your look remains flawless through humidity, veil placement, and movement.
           </p>

           {/* Vertical Process Timeline */}
           <div className="hair-anim space-y-12">
              {HAIR_STEPS.map((step) => (
                <div key={step.id} className="flex gap-10 group">
                   <div className="relative flex flex-col items-center">
                      <span className="font-serif text-2xl text-bridal-gold/30 group-hover:text-bridal-gold transition-all duration-500">{step.id}</span>
                      <div className="w-[1px] h-full bg-bridal-gold/10 group-hover:bg-bridal-gold/40 transition-all duration-500 mt-3" />
                   </div>
                   <div className="flex flex-col pb-8">
                      <h4 className="font-serif text-2xl md:text-3xl text-bridal-charcoal mb-2 group-hover:translate-x-3 transition-transform duration-700">{step.title}</h4>
                      <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-bridal-charcoal/40 font-bold">{step.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}