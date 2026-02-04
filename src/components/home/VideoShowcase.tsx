"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoShowcase() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Intro Animation
    tl.fromTo(videoElementRef.current, 
      { scale: 1.1 }, // Reduced scale slightly for subtler effect
      { scale: 1, duration: 2.5, ease: "power2.out" }
    );

    tl.from(".hero-text", {
      y: 30, // Reduced distance for elegance
      opacity: 0,
      duration: 1.5,
      stagger: 0.15,
      ease: "power3.out"
    }, "-=2");

    // 2. Scroll Parallax
    gsap.to(textRef.current, {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0a] z-0"
    >
      <div className="w-full h-full relative">
          
          {/* BACKGROUND VIDEO LAYER */}
          <div className="absolute inset-0 w-full h-full z-0">
             <video 
               ref={videoElementRef}
               autoPlay 
               muted 
               loop 
               playsInline 
               // FIX: 'object-[center_35%]' shifts the video content DOWN so the face isn't hidden by the navbar
               className="w-full h-full object-cover object-[center_35%] opacity-100"
             >
                 <source src="per.mp4" type="video/mp4" />
             </video>
             
             {/* Gradient Overlay for Text Readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 z-10" />
          </div>

          {/* TEXT CONTENT LAYER */}
          <div 
            ref={textRef}
            className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center text-white px-6"
          >
            <div className="overflow-hidden mb-6">
              <span className="hero-text block font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-bridal-gold font-bold drop-shadow-md">
                Established in Excellence
              </span>
            </div>

            <h1 className="hero-text font-serif text-5xl md:text-8xl mb-8 leading-none tracking-tight mix-blend-overlay opacity-90">
              Bonitha <span className="italic text-bridal-gold font-light">&</span> Co.
            </h1>

            <div className="overflow-hidden">
               <p className="hero-text font-sans text-[10px] md:text-xs text-white/90 tracking-widest uppercase border-t border-white/20 pt-6 mt-2 drop-shadow-md">
                 The Art of the Bridal Muse
               </p>
            </div>

            <div className="absolute bottom-12 animate-bounce opacity-80">
               <ArrowDown size={20} className="text-white drop-shadow-md" />
            </div>
          </div>

      </div>
    </section>
  );
}