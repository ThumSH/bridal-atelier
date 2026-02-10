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
    const mm = gsap.matchMedia();

    // --- 1. DESKTOP ANIMATIONS ---
    mm.add("(min-width: 1024px)", () => {
      // Reveal Video
      gsap.fromTo(".video-reveal-container", 
        { clipPath: "inset(10% 10% 10% 10%)", scale: 1.05 },
        { 
          clipPath: "inset(0% 0% 0% 0%)", 
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          }
        }
      );

      // Golden Line Growth
      gsap.fromTo(".golden-line-vertical", 
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: {
          trigger: triggerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }}
      );

      // Parallax Text
      gsap.to(".text-pillar", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });

    // --- 2. MOBILE ANIMATIONS ---
    mm.add("(max-width: 1023px)", () => {
      gsap.from(".video-reveal-container", {
        y: 30, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: triggerRef.current, start: "top 70%" }
      });
      gsap.from(".text-pillar", {
        y: 30, opacity: 0, duration: 1, delay: 0.2,
        scrollTrigger: { trigger: ".video-reveal-container", start: "bottom 80%" }
      });
    });

    // --- 3. SHARED (Rope & Video) ---
    gsap.fromTo(".manifesto-rope-path", 
      { strokeDasharray: 500, strokeDashoffset: 500 },
      { 
        strokeDashoffset: 0, duration: 2.5, ease: "power2.inOut",
        scrollTrigger: { trigger: ".manifesto-rope-path", start: "top 90%" }
      }
    );

    if (videoRef.current) {
      ScrollTrigger.create({
        trigger: videoRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => videoRef.current?.play().catch(() => {}),
        onLeave: () => videoRef.current?.pause(),
        onEnterBack: () => videoRef.current?.play().catch(() => {}),
        onLeaveBack: () => videoRef.current?.pause(),
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-bridal-ivory overflow-hidden">
      
      {/* Background Leaves */}
      <div className="absolute inset-0 z-0 opacity-20 blur-3xl mix-blend-multiply pointer-events-none">
        <Image src="/leaves.webp" alt="" fill className="object-cover" />
      </div>

      {/* --- DECORATIVE GOLDEN LINES --- */}
      {/* Vertical Thread (Desktop) */}
      <div className="hidden lg:block absolute left-1/2 top-0 w-px h-full bg-linear-to-b from-transparent via-bridal-gold/40 to-transparent origin-top golden-line-vertical z-0" />
      
      {/* Floating Accent Line (Left side) */}
      <div className="absolute left-0 top-1/4 w-20 lg:w-40 h-px bg-bridal-gold/30 z-10" />

      <div ref={triggerRef} className="relative w-full min-h-screen lg:min-h-[130vh] py-20 lg:py-0 flex flex-col lg:flex-row lg:items-center">
        
        {/* --- VIDEO CONTAINER --- */}
        <div className="video-reveal-container relative w-[90%] mx-auto lg:mx-0 aspect-3/4 lg:aspect-9/16 lg:absolute lg:right-[8%] lg:w-[35%] lg:h-[95vh] z-10 shadow-2xl bg-bridal-charcoal mb-8 lg:mb-0">
          
          {/* Animated Golden Frame Corner (Top Right) */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-bridal-gold/60 z-20 pointer-events-none" />
          
          <video
            ref={videoRef}
            playsInline loop muted preload="auto"
            className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
            poster="/p-7.webp" 
          >
            <source src="/mvi.webm" type="video/webm" />
          </video>

          {/* Inner Matte Border */}
          <div className="absolute inset-0 border-12 md:border-16 border-white pointer-events-none" />
          
          {/* Sublte Golden Inner Glow */}
          <div className="absolute inset-0 border border-bridal-gold/20 m-3.25 md:m-4.25 pointer-events-none" />
          
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent lg:bg-linear-to-l lg:from-transparent lg:to-bridal-ivory/10" />
        </div>

        {/* --- TEXT PILLAR --- */}
        <div className="text-pillar relative z-20 w-[90%] mx-auto lg:mx-0 lg:w-[45%] lg:ml-[10%] bg-white p-8 md:p-14 lg:p-16 shadow-xl border-t-8 border-bridal-gold">
          
          {/* Decorative Sideline */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-32 bg-bridal-gold/20 hidden lg:block" />

          <div className="flex items-center gap-3 text-bridal-gold mb-6 lg:mb-8">
            <Sparkles size={18} />
            <span className="font-sans text-[11px] uppercase tracking-[0.6em] font-bold text-bridal-charcoal/60">The Signature Soul</span>
          </div>

          <div className="relative mb-10 lg:mb-14">
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-bridal-charcoal leading-[0.9] lg:leading-[0.85] uppercase tracking-tighter">
              Defining <br/>
              <span className="italic text-bridal-gold font-light lowercase">Elegance.</span>
            </h2>
            
            <svg className="absolute -bottom-8 lg:-bottom-10 -left-2 lg:-left-4 w-48 lg:w-72 h-16 pointer-events-none" viewBox="0 0 350 60" fill="none">
              <path className="manifesto-rope-path text-bridal-gold" d="M10 30C100 60 250 60 340 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>

          <div className="space-y-6 lg:space-y-8 mt-12 lg:mt-16">
            <p className="font-serif text-xl lg:text-3xl text-bridal-charcoal/90 leading-tight italic">
              "We don't just apply; <br/> we curate a legacy."
            </p>
            
            <p className="font-sans text-sm lg:text-base text-bridal-charcoal/60 leading-relaxed font-light max-w-md">
              Bridal artistry is an act of engineering. Every brushstroke is calculated to move with you, ensuring your confidence remains unshakeable.
            </p>

            <div className="pt-6 lg:pt-8 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <p className="font-sans text-[10px] uppercase tracking-[0.8em] text-bridal-charcoal/20 font-bold whitespace-nowrap">
                  Est. 1995 • Atelier
                </p>
                {/* Horizontal Golden Accent */}
                <div className="w-full h-px bg-bridal-gold/20" />
              </div>
              
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