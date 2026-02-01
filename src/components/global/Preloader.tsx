"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const container = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsComplete(true),
    });

    // 1. Logo Reveal
    tl.fromTo(".preloader-text", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.1 }
    );

    // 2. Line Expansion
    tl.to(".preloader-line", {
      width: "100%",
      duration: 1.5,
      ease: "power2.inOut",
    }, "-=0.5");

    // 3. Exit Animation (Slide Up)
    tl.to(".preloader-content", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.in",
      delay: 0.5
    });

    tl.to(container.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
    }, "-=0.3");

  }, { scope: container });

  // Remove from DOM after animation prevents clicking issues
  if (isComplete) return null;

  return (
    <div 
      ref={container} 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bridal-charcoal text-bridal-ivory overflow-hidden"
    >
      <div className="preloader-content flex flex-col items-center relative z-10">
        <h1 className="font-serif text-4xl md:text-6xl tracking-widest uppercase mb-4 overflow-hidden">
          <span className="preloader-text inline-block">Bonitha</span>
          <span className="preloader-text inline-block mx-4 text-bridal-sage">&</span>
          <span className="preloader-text inline-block">Co.</span>
        </h1>
        
        <p className="preloader-text font-sans text-xs uppercase tracking-[0.5em] text-white/50 mb-8">
          Est. 2024
        </p>

        {/* Loading Line */}
        <div className="w-64 h-[1px] bg-white/10 overflow-hidden relative">
          <div className="preloader-line absolute top-0 left-0 h-full w-0 bg-bridal-sage shadow-[0_0_10px_#8A9A5B]" />
        </div>
      </div>

      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
    </div>
  );
}