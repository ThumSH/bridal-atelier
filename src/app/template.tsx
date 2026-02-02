"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Template({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. THE CURTAIN (The Reveal)
    tl.set(".transition-curtain", { 
        scaleY: 1, 
        transformOrigin: "bottom" 
    });

    tl.to(".transition-curtain", {
        scaleY: 0,
        duration: 0.8,
        ease: "power4.inOut",
        transformOrigin: "top"
    });

    // 2. THE CONTENT (The Parallax)
    tl.fromTo(".template-content", 
        { 
          y: 50, 
          opacity: 0, 
          filter: "blur(5px)" 
        },
        { 
          y: 0, 
          opacity: 1, 
          filter: "blur(0px)", 
          duration: 1, 
          ease: "power3.out",
          // CRITICAL FIX: Removes the transform after animation so GSAP Pinning works again
          clearProps: "all" 
        },
        "-=0.6"
    );

  }, { scope: container });

  return (
    <div ref={container} className="relative min-h-screen bg-bridal-ivory">
      
      {/* THE CURTAIN */}
      <div className="transition-curtain fixed inset-0 z-50 bg-bridal-charcoal pointer-events-none" />

      {/* THE CONTENT */}
      {/* REMOVED 'will-change-transform' class to prevent pinning conflicts */}
      <div className="template-content">
         {children}
      </div>
      
    </div>
  );
}