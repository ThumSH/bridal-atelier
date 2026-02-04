/* src/components/home/VideoShowcase.tsx */
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Globe, Play } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Base64 Noise to avoid external network requests (Performance gain)
const NOISE_BASE64 = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E";

export default function VideoShowcase() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Text Reveal - Optimized to start slightly earlier
      tl.from(".video-title", {
        y: 80,
        opacity: 0,
        duration: 1.8,
        ease: "power3.out",
        delay: 0.2, // Reduced delay for perceived speed
      })
      .from(".video-sub", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      }, "-=1.2"); // Overlap animation by 1.2s

      // 2. Parallax Video
      // Using fastScrollEnd to prevent jitter on rapid scrolling
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
    <section ref={container} className="relative h-screen w-full">
      
      {/* --- BACKGROUND VIDEO --- */}
      <div className="video-bg absolute inset-0 h-[98%] w-full">
        {/* BEST PRACTICE FOR VIDEO:
           1. Poster: This image loads INSTANTLY. Crucial for LCP (Largest Contentful Paint).
           2. Fallback: Provide WebM (Light) and MP4 (Compatible).
        */}
        <video
          className="h-full w-full object-cover opacity-100"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg" // [ACTION REQUIRED] Add a high-res screenshot of your video here
        >
          {/* Prioritize WebM for Chrome/Firefox */}
          {/* Fallback for Safari/iOS if needed */}
          <source src="/wed-vid.mp4" type="video/mp4" /> 
        </video>
        



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