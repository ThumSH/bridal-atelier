"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function FloatingLeaves() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Set initial random positions for all leaves
      gsap.set(".leaf", {
        x: () => Math.random() * window.innerWidth,
        y: () => Math.random() * window.innerHeight,
        rotation: () => Math.random() * 360,
        opacity: 5,
      });

      // 2. Animate them floating
      gsap.to(".leaf", {
        y: "+=100", // Float down
        x: "+=50",  // Drift right
        rotation: "+=45", // Gentle spin
        opacity: 0.65, // Keep it subtle (ghostly)
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true, // Float back up
        ease: "sine.inOut",
        stagger: {
          amount: 5,
          from: "random",
        },
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <svg
          key={i}
          className="leaf absolute w-12 h-12 text-bridal-sage opacity-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        >
          {/* Elegant Leaf Path */}
          <path d="M12 2C7.5 2 4 6.5 4 12C4 17.5 7.5 22 12 22C16.5 22 20 17.5 20 12C20 6.5 16.5 2 12 2ZM12 22C12 22 10 16 10 12C10 8 12 2 12 2M12 22C12 22 14 16 14 12C14 8 12 2 12 2" />
        </svg>
      ))}
    </div>
  );
}