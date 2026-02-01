"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Template({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // This runs every time the route changes
    gsap.fromTo(container.current,
      { 
        y: 20, 
        opacity: 0, 
        filter: "blur(10px)" 
      },
      { 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)", 
        duration: 0.8, 
        ease: "power3.out",
        clearProps: "all" // Cleanup after animation
      }
    );
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-bridal-ivory">
      {children}
    </div>
  );
}