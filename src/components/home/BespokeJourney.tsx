/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef } from "react";
import Image from "next/image";
import { Sparkles, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BespokeJourney() {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. CINEMATIC VIDEO REVEAL (The "Curtain" Effect)
    // Starts as a small box and expands out
    gsap.fromTo(".video-reveal-container", 
      { clipPath: "inset(20% 20% 20% 20%)", scale: 1.1 },
      { 
        clipPath: "inset(0% 0% 0% 0%)", 
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          end: "top 20%",
          scrub: true,
        }
      }
    );

    // 2. TEXT PILLAR PARALLAX
    gsap.to(".text-pillar", {
      y: -150,
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // 3. GOLDEN ROPE DRAWING
    gsap.fromTo(".manifesto-rope-path", 
      { strokeDasharray: 500, strokeDashoffset: 500 },
      { 
        strokeDashoffset: 0, 
        duration: 2.5, 
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".text-pillar",
          start: "top 70%",
        }
      }
    );

    // 4. Safe Autoplay
    if (videoRef.current) {
      ScrollTrigger.create({
        trigger: videoRef.current,
        start: "top 80%",
        onEnter: () => videoRef.current?.play(),
        onLeave: () => videoRef.current?.pause(),
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-bridal-ivory overflow-hidden">
      
      {/* Background Leaves (Deepest Layer) */}
      <div className="absolute inset-0 z-0 opacity-20 blur-3xl mix-blend-multiply">
        <Image src="/leaves.webp" alt="" fill className="object-cover" />
      </div>

      <div ref={triggerRef} className="relative w-full min-h-[120vh] flex items-center justify-center py-40">
        
        {/* --- MODIFIED: PORTRAIT VIDEO CONTAINER --- */}
        {/* Changed width from 75% to 45% for a narrow portrait look.
            Changed from landscape height to aspect-[3/4].
        */}
        <div className="video-reveal-container absolute right-[5%] lg:right-[10%] top-1/2 -translate-y-1/2 w-[85%] lg:w-[40%] aspect-[3/4] z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-bridal-charcoal">
          <video
            ref={videoRef}
            playsInline loop muted preload="auto"
            className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
            poster="/p-7.webp" 
          >
            <source src="/mvid.mp4" type="video/mp4" />
          </video>
          
          {/* Internal Sharp Border */}
          <div className="absolute inset-0 border-[16px] border-white pointer-events-none" />
          
          {/* Subtle Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-bridal-ivory/20" />
        </div>

        {/* --- TEXT PILLAR (Unchanged) --- */}
        <div className="text-pillar relative z-30 lg:-ml-[35%] w-[90%] max-w-xl bg-white p-10 md:p-20 shadow-[40px_40px_100px_-20px_rgba(0,0,0,0.15)] border-t-[8px] border-bridal-gold">
          
          <div className="flex items-center gap-3 text-bridal-gold mb-10">
            <Sparkles size={18} />
            <span className="font-sans text-[11px] uppercase tracking-[0.6em] font-bold text-bridal-charcoal/60">The Signature Soul</span>
          </div>

          <div className="relative mb-16">
            <h2 className="font-serif text-6xl md:text-[5.5rem] text-bridal-charcoal leading-[0.8] uppercase tracking-tighter">
              Defining <br/>
              <span className="italic text-bridal-gold font-light lowercase">Elegance.</span>
            </h2>
            
            {/* Golden Rope */}
            <svg 
              className="absolute -bottom-12 -left-4 w-80 h-20 pointer-events-none" 
              viewBox="0 0 350 60" 
              fill="none" 
            >
              <path 
                className="manifesto-rope-path text-bridal-gold" 
                d="M10 30C100 60 250 60 340 10" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
                opacity="1"
              />
            </svg>
          </div>

          <div className="space-y-10 mt-20">
            <p className="font-serif text-2xl md:text-3xl text-bridal-charcoal/90 leading-tight italic">
              "We don't just apply; <br/> we curate a legacy."
            </p>
            
            <p className="font-sans text-base text-bridal-charcoal/60 leading-relaxed font-light">
              Bridal artistry is an act of engineering. Every brushstroke is calculated to move with you, ensuring your confidence remains unshakeable.
            </p>

            <div className="pt-10 flex flex-col gap-6">
              <p className="font-sans text-[10px] uppercase tracking-[0.8em] text-bridal-charcoal/20 font-bold">
                Est. 1995 • Atelier
              </p>
              
              <div className="flex items-center gap-4 text-bridal-gold/40">
                 <div className="w-12 h-px bg-current" />
                 <ArrowDown size={14} className="animate-bounce" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}