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
      // 1. Text Reveal (Slow & Cinematic)
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

      // 2. Parallax Video on Scroll
      // As you scroll down to the second hero, this video moves slightly to create depth
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
        <video
          className="h-full w-full object-cover opacity-80"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1549416867-0df7e20d365f?q=80&w=2070" // Fallback image
        >
          {/* Use your local file: src="/hero-video.mp4" */}
          {/* Currently using a high-quality bridal stock video */}
          <source src="/wed-vid.mp4" type="video/mp4" />
        </video>
        
        {/* Luxury Overlays */}
        <div className="absolute inset-0 bg-black/20" /> {/* Darken slightly for text */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" /> {/* Film Grain */}
      </div>

      {/* --- CENTER CONTENT --- */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        
        <p className="video-sub mb-6 font-sans text-xs uppercase tracking-[0.5em] text-bridal-ivory/80">
          The 2026 Collection
        </p>

        <h1 className="video-title font-serif text-6xl md:text-8xl lg:text-8xl tracking-tight">
          BONITHA <span className="text-bridal-sage italic">&</span> CO.
        </h1>

        <div className="video-sub mt-12 flex flex-col items-center gap-4 opacity-70">
          <span className="font-sans text-[10px] uppercase tracking-widest">Scroll to Explore</span>
          <ChevronDown className="animate-bounce text-bridal-ivory" size={24} />
        </div>

      </div>
    </section>
  );
}