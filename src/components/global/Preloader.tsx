"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const container = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Lock scroll on mount, unlock on complete
  useEffect(() => {
    if (!isComplete) {
      document.body.style.overflow = "hidden";
      document.body.style.cursor = "wait"; // UX: Show loading cursor
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
      document.body.style.cursor = "default";
    }
  }, [isComplete]);

  useGSAP(() => {
    const tl = gsap.timeline({
      // Wait for the whole sequence to finish before unmounting
      onComplete: () => setIsComplete(true),
    });

    // 1. Text Stagger Reveal
    tl.fromTo(".preloader-text", 
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "power3.out", stagger: 0.1 }
    );

    // 2. Line Expansion
    tl.fromTo(".preloader-line", 
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power2.inOut", transformOrigin: "left" }, 
      "-=0.6"
    );

    // 3. OPTIMIZATION: Fade out HEAVY content (Text + Noise) FIRST
    // This prevents the browser from having to re-render noise/blend-modes during the slide
    tl.to([contentRef.current, ".preloader-noise"], {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: "power2.in",
      delay: 0.2 // Short pause to read text
    });

    // 4. The Curtain Lift (Now it's just a solid color block = 60fps)
    tl.to(container.current, {
      yPercent: -100,
      duration: 1.0,
      ease: "power4.inOut", 
      // Hardware acceleration hint
      willChange: "transform", 
    });

  }, { scope: container });

  // Do not render if complete (clean DOM removal)
  if (isComplete) return null;

  return (
    <div 
      ref={container} 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bridal-charcoal text-bridal-ivory"
    >
      {/* Wrapper for content to fade it out separately */}
      <div ref={contentRef} className="flex flex-col items-center relative z-10 mix-blend-difference">
        {/* Brand Name */}
        <div className="overflow-hidden mb-6">
          <h1 className="font-serif text-5xl md:text-7xl tracking-widest uppercase flex items-center gap-4">
            <span className="preloader-text block">Bonitha SALON</span>
          </h1>
        </div>
        
        {/* Subtitle */}
        <div className="overflow-hidden mb-12">
           <p className="preloader-text font-sans text-xs uppercase tracking-[0.6em] text-white/50">
             Hair  • Beauty
           </p>
        </div>

        {/* Loading Line */}
        <div className="w-48 h-px bg-white/10 relative overflow-hidden">
          <div className="preloader-line absolute top-0 left-0 h-full w-full bg-bridal-sage shadow-[0_0_15px_#8A9A5B]" />
        </div>
      </div>

      {/* Background Noise - Fade target added class 'preloader-noise' */}
      <div className="preloader-noise absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
    </div>
  );
}