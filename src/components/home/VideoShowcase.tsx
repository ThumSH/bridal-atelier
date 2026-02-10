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
    // 1. Parallax Animation
    // Since the container is fixed, we need to trigger based on the scroll of the PAGE, not the element.
    // However, for this specific fix, let's focus on the Play/Pause optimization.

    // 2. OPTIMIZATION: Pause video when scrolled out of view
    // We create a trigger on the whole document or use the Spacer div logic.
    // Easier approach: Watch the scroll position.
    ScrollTrigger.create({
      trigger: document.body, // Watch the whole page
      start: "top top",
      end: "100vh top", // When we've scrolled past the first viewport (where video lives)
      onLeave: () => {
        // User has scrolled PAST the video
        if (videoRef.current) videoRef.current.pause();
      },
      onEnterBack: () => {
        // User has scrolled BACK to the video
        if (videoRef.current) videoRef.current.play();
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
   <section ref={container} className="fixed h-dvh w-full overflow-hidden bg-black z-0">
      <div className="absolute inset-0 h-[120%] w-full -top-[0.1%]">
        <video
          ref={videoRef}
          className="h-full w-full object-cover opacity-90"
          autoPlay
          muted
          loop
          playsInline
          preload="none" // CHANGED: Don't load until necessary (Next.js usually handles this, but good to be explicit)
          poster="/hero-poster.jpg" 
        >
          <source src="/wed-vid.webm" type="video/webm" /> 
        </video>
        <div className="absolute inset-0 bg-black/20" />
      </div>

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