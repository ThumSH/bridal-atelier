"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const container = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Lock scroll on mount, unlock on complete
  useEffect(() => {
    if (!isComplete) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
  }, [isComplete]);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsComplete(true),
    });

    // 1. Text Stagger Reveal
    tl.fromTo(".preloader-text", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.1 }
    );

    // 2. Line Expansion (The "Thread")
    tl.fromTo(".preloader-line", 
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: "power2.inOut", transformOrigin: "left" }, 
      "-=0.8"
    );

    // 3. Content Exit (Fade Out)
    tl.to(".preloader-content", {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power2.in",
      delay: 0.2
    });

    // 4. The Curtain Lift (Slide Up)
    tl.to(container.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut", // The "Luxury" Ease
    }, "-=0.2");

  }, { scope: container });

  // Do not render if complete (to allow clicking elements underneath)
  if (isComplete) return null;

  return (
    <div 
      ref={container} 
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-bridal-charcoal text-bridal-ivory"
    >
      <div className="preloader-content flex flex-col items-center relative z-10 mix-blend-difference">
        {/* Brand Name */}
        <div className="overflow-hidden mb-6">
          <h1 className="font-serif text-5xl md:text-7xl tracking-widest uppercase flex items-center gap-4">
            <span className="preloader-text block">Bonitha</span>
            <span className="preloader-text block text-bridal-sage italic">&</span>
            <span className="preloader-text block">Co.</span>
          </h1>
        </div>
        
        {/* Subtitle */}
        <div className="overflow-hidden mb-12">
           <p className="preloader-text font-sans text-xs uppercase tracking-[0.6em] text-white/50">
             Couture • Artistry • Grace
           </p>
        </div>

        {/* Loading Line */}
        <div className="w-48 h-px bg-white/10 relative overflow-hidden">
          <div className="preloader-line absolute top-0 left-0 h-full w-full bg-bridal-sage shadow-[0_0_15px_#8A9A5B]" />
        </div>
      </div>

      {/* Background Noise for Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
    </div>
  );
}