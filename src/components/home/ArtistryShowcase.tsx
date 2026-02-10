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

const PROCESS_STEPS = [
  { id: "01", title: "Analysis & Prep", desc: "Identifying skin texture and tone." },
  { id: "02", title: "The Couture Base", desc: "Custom blending for a second-skin finish." },
  { id: "03", title: "Light & Shadow", desc: "Sculpting features with precision contour." },
  { id: "04", title: "The Bridal Glow", desc: "Setting the look for 12-hour wear." },
];

export default function ArtistryShowcase() {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Video Floating Parallax (OPTIMIZED)
    gsap.from(videoContainerRef.current, {
      y: 80,           // Reduced travel distance for smoother reveal
      opacity: 0,      
      duration: 1.5,   
      ease: "power3.out", 
      scrollTrigger: {
        trigger: videoContainerRef.current, 
        start: "top 90%", // OPTIMIZATION: Reveal much earlier
        toggleActions: "play none none reverse", 
      }
    });

    // 2. Leaf Parallax
    gsap.to(".artistry-leaf", {
      yPercent: 40,
      rotation: 12,
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // 3. Narrative Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      }
    });

    tl.from(".artistry-anim", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    })
    .fromTo(".gold-rope-path", 
      { strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 },
      { strokeDasharray: 300, strokeDashoffset: 0, opacity: 0.8, duration: 1.8, ease: "power2.inOut" },
      "-=1"
    );

    // 4. Safe Autoplay Logic
    if (videoRef.current) {
      ScrollTrigger.create({
        trigger: videoRef.current,
        start: "top 80%",
        onEnter: () => videoRef.current?.play().catch(() => {}), // Catch prevent defaults
        onLeave: () => videoRef.current?.pause(),
        onEnterBack: () => videoRef.current?.play().catch(() => {}),
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-bridal-ivory py-32 lg:py-48 overflow-hidden">
      
      {/* --- ATMOSPHERIC LEAF OVERLAYS --- */}
      <div className="artistry-leaf absolute top-10 -left-20 w-[500px] h-[500px] z-0 pointer-events-none opacity-20 blur-sm mix-blend-multiply">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>
      <div className="artistry-leaf absolute bottom-10 -right-20 w-[450px] h-[450px] z-0 pointer-events-none opacity-20 blur-sm rotate-45 mix-blend-multiply">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center relative z-10">
        
        {/* --- LEFT: THE NARRATIVE --- */}
        <div className="flex flex-col justify-center order-2 lg:order-1">
           <div className="artistry-anim flex items-center gap-3 text-bridal-gold mb-8">
             <Sparkles size={16} />
             <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold">The Artistry Process</span>
           </div>

           <div className="relative mb-14">
              <h2 className="artistry-anim font-serif text-5xl md:text-7xl lg:text-8xl text-bridal-charcoal leading-[0.85] uppercase tracking-tighter">
                The Art of <br/> 
                <span className="italic text-bridal-gold font-light lowercase">Transformation.</span>
              </h2>
              
              <svg 
                className="absolute -bottom-8 left-0 w-64 h-12 pointer-events-none" 
                viewBox="0 0 250 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  className="gold-rope-path text-bridal-gold" 
                  d="M2 15C40 35 120 40 248 5" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                />
              </svg>
           </div>

           <p className="artistry-anim font-sans text-base text-bridal-charcoal/70 leading-relaxed mb-16 max-w-md font-light">
              Meticulous craftsmanship for the Bonitha Bride. We sculpt a silhouette that moves with you, ensuring your elegance is unshakeable.
           </p>

           <div className="artistry-anim space-y-12">
              {PROCESS_STEPS.map((step) => (
                <div key={step.id} className="flex gap-10 group">
                   <div className="relative flex flex-col items-center">
                      <span className="font-serif text-2xl text-bridal-gold/30 group-hover:text-bridal-gold transition-all duration-500">{step.id}</span>
                      <div className="w-[1px] h-full bg-bridal-gold/10 group-hover:bg-bridal-gold/40 transition-all duration-500 mt-3" />
                   </div>
                   <div className="flex flex-col pb-8">
                      <h4 className="font-serif text-2xl md:text-3xl text-bridal-charcoal mb-2 group-hover:translate-x-3 transition-transform duration-700">{step.title}</h4>
                      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-bridal-charcoal/40 font-bold">{step.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* --- RIGHT: THE ARCHED VIDEO FRAME --- */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
           <div ref={videoContainerRef} className="relative w-full max-w-lg aspect-[9/14]">
              
              {/* Museum Arched Frame */}
              <div className="relative w-full h-full rounded-t-[2rem] md:rounded-t-full rounded-b-[2.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] border border-white/40 bg-bridal-ivory">
                <video
                  ref={videoRef}
                  playsInline
                  loop
                  muted
                  preload="auto" // OPTIMIZATION: Load aggressively for smooth start
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="/makeup.jpg"
                >
                  <source src="h-m4.webm" type="video/webm" />
                  <source src="h-m4.mp4" type="video/mp4" />
                </video>

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-black/5 pointer-events-none mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Status Badge */}
                <div className="absolute bottom-12 right-10 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-full">
                   <div className="flex items-center gap-3">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      <span className="font-sans text-[10px] uppercase tracking-widest text-white font-bold tracking-[0.2em]">Now Sculpting</span>
                   </div>
                </div>
              </div>

              <div className="absolute -inset-8 border border-bridal-gold/15 rounded-t-full rounded-b-[4rem] pointer-events-none -z-10 opacity-50" />
           </div>
        </div>

      </div>
    </section>
  );
}