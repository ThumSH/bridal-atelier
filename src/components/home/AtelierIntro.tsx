"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AtelierIntro() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          end: "bottom top",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Text Reveal
      tl.from(".intro-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
      });

      // 2. Leaf Parallax (Left Bottom)
      gsap.to(".intro-leaf", {
        y: -50, // Moves up slightly as you scroll down
        rotation: 10,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative w-full bg-bridal-ivory py-32 flex justify-center items-center overflow-hidden">
      
      {/* --- CONTENT --- */}
      <div className="max-w-3xl text-center px-6 relative z-10">
        <span className="intro-text font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block">
          Since 2024
        </span>
        
        <h2 className="intro-text font-serif text-4xl md:text-5xl text-bridal-charcoal mb-8 leading-tight">
          We craft not just dresses, <br />
          <span className="italic text-bridal-gold/80">but memories.</span>
        </h2>
        
        <p className="intro-text font-sans text-sm md:text-base leading-loose text-bridal-charcoal/70">
          Located in the heart of the city, our atelier is a sanctuary for the modern bride. 
          Every stitch is a promise, every drape a work of art. We invite you to experience 
          the quiet luxury of true craftsmanship.
        </p>
        
        {/* Signature Divider */}
        <div className="intro-text w-24 h-[1px] bg-bridal-sage/30 mx-auto mt-12" />
      </div>

      {/* --- DECORATION: Blurred Leaf (Left Side Bottom) --- */}
      <div className="intro-leaf absolute -center-1 -left-10 z-0 h-[300px] w-[400px] opacity-16 pointer-events-none">
         <Image
            src="/leaves.webp"
            alt="Leaf Accent"
            fill
            className="object-contain blur-[4px]" // Matches your requested style
         />
      </div>

    </section>
  );
}