"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoShowcase() {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    // Parallax Logic: Moves the video slightly slower than the scroll speed
    gsap.to(videoRef.current, {
      yPercent: 20, // Moves down 20%
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Text Reveal Animation
    gsap.from(".hero-text", {
      y: 60,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5
    });
  }, { scope: container });

  return (
    // CHANGE 1: Use h-dvh (Dynamic Viewport Height) for full mobile coverage
    <section ref={container} className="fixed  h-dvh w-full overflow-hidden bg-black">
      
      {/* CHANGE 2: Height set to 120% to allow parallax movement without gaps */}
      {/* -top-[10%] centers the 120% height so there is room on top and bottom */}
      <div className="absolute inset-0 h-[120%] w-full -top-[0.1%]">
        <video
          ref={videoRef}
          className="h-full w-full object-cover opacity-90"
          autoPlay
          muted
          loop
          playsInline // Essential for iOS mobile fullscreen behavior
          preload="auto"
          poster="/hero-poster.jpg" 
        >
          <source src="/wed-vid.webm" type="video/webm" /> 
        </video>
        
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        
        <div className="hero-text">
            <p className="mb-4 font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/80">
            The 2026 Collection
            </p>

            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight mix-blend-screen drop-shadow-2xl">
            <span className="italic">BONITHA SALON</span> 
            </h1>
            <span className="mt-2 md:mt-4 font-serif italic text-2xl md:text-5xl text-bridal-sage tracking-wide">
                Hair & Beauty
              </span>
        </div>

        <div className="absolute bottom-10 left-0 w-full flex flex-col items-center gap-3 opacity-70 animate-pulse">
          <span className="font-sans text-[9px] uppercase tracking-widest">Scroll to Explore</span>
          <ChevronDown size={24} />
        </div>

      </div>
    </section>
  );
}