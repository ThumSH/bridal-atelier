/* src/components/home/VideoShowcase.tsx */
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

  useGSAP(
    () => {
      // 1. Text Reveal
      gsap.from(".video-title", {
        y: 100,
        opacity: 0,
        duration: 2,
        ease: "power4.out",
        delay: 0.5,
      });

      gsap.from(".video-sub", {
        y: 20,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 1,
      });

      // 2. Parallax Video
      gsap.to(".video-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden bg-bridal-charcoal">
      
      {/* --- BACKGROUND VIDEO --- */}
      <div className="video-bg absolute inset-0 h-[120%] w-full">
        {/* VIDEO OPTIMIZATION: 
            1. muted + playsInline: Required for autoplay on iOS.
            2. preload="auto": Tells browser to load this FIRST.
            3. poster: Shows this image instantly while video loads (Crucial!).
        */}
        <video
          className="h-full w-full object-cover opacity-90" // Increased opacity slightly
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          // poster="/video-poster.jpg" <--- UNCOMMENT AND ADD A REAL IMAGE PATH
        >
          <source src="/per.webm" type="video/webm" /> 
           
        </video>
        
        {/* --- LUXURY OVERLAYS (The "Makeup" for bad video quality) --- */}
        
        {/* 1. Base Darkener: Uniform dark tint */}
        <div className="absolute inset-0 bg-black/30" /> 

        {/* 2. Texture: Hides pixelation/banding */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" /> 
        
        {/* 3. The "Nav Saver": Gradient at top to make Navbar POP */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent z-10" />

        {/* 4. Vignette: Darken corners to focus attention */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
      </div>

      {/* --- CENTER CONTENT --- */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        
        <p className="video-sub mb-6 font-sans text-xs uppercase tracking-[0.5em] text-bridal-ivory/90 drop-shadow-md">
          The 2026 Collection
        </p>

        <h1 className="video-title font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight shadow-glow mix-blend-screen">
          BONITHA <span className="text-bridal-sage italic drop-shadow-[0_0_15px_rgba(138,154,91,0.8)]">&</span> CO.
        </h1>

        <div className="video-sub mt-12 flex flex-col items-center gap-4 opacity-80">
          <span className="font-sans text-[10px] uppercase tracking-widest drop-shadow-md">Scroll to Explore</span>
          <div className="p-2 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-bounce border border-white/20">
            <ChevronDown className="text-bridal-ivory" size={24} />
          </div>
        </div>

      </div>
    </section>
  );
}