"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DETAILS = [
  {
    id: 1,
    src: "/lace.webp", // Lace/Texture
    alt: "Chantilly Lace",
    speed: 0.2, // Slow
    className: "top-10 left-[10%] w-48 md:w-64 aspect-[3/4]",
  },
  {
    id: 2,
    src: "/pearl.webp", // Silk/Button
    alt: "Pearl Buttons",
    speed: 0.5, // Medium
    className: "top-40 right-[15%] w-40 md:w-56 aspect-square"
  },
  {
    id: 3,
    src: "/hand-emb.webp", // Hand stitching
    alt: "Hand Embroidery",
    speed: 0.8, // Fast
    className: "bottom-20 left-[20%] w-56 md:w-72 aspect-video"
  },
  {
    id: 4,
    src: "/silk.webp", // Veil
    alt: "Silk Tulle",
    speed: 0.3, 
    className: "bottom-40 right-[10%] w-32 md:w-48 aspect-[2/3]"
  }
];

export default function CoutureDetails() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax Effect for each image
    DETAILS.forEach((item) => {
      gsap.to(`.detail-img-${item.id}`, {
        y: -100 * item.speed, // Move up based on speed
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });

    // Text Reveal
    gsap.from(".detail-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".detail-content",
        start: "top 70%",
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full min-h-[120vh] bg-bridal-ivory overflow-hidden flex items-center justify-center">
      
      {/* Background Subtle Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
         <h1 className="font-serif text-[30vw] text-bridal-charcoal leading-none">SILK</h1>
      </div>

      {/* Floating Images */}
      {DETAILS.map((item) => (
        <div 
            key={item.id} 
            className={cn(
                `detail-img-${item.id} absolute grayscale hover:grayscale-0 transition-all duration-700 ease-out z-10 shadow-xl`, 
                item.className
            )}
        >
            <div className="relative w-full h-full overflow-hidden rounded-lg">
                <Image 
                    src={item.src} 
                    alt={item.alt} 
                    fill 
                    className="object-cover hover:scale-110 transition-transform duration-1000" 
                />
            </div>
        </div>
      ))}

      {/* Central Content */}
      <div className="detail-content relative z-20 text-center max-w-xl px-6 bg-bridal-ivory/80 backdrop-blur-sm p-12 rounded-full shadow-[0_0_50px_rgba(249,247,242,1)]">
        <span className="detail-text font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-4 block">
            The Materials
        </span>
        <h2 className="detail-text font-serif text-5xl md:text-6xl text-bridal-charcoal mb-6">
            God is in the <br/><span className="italic text-bridal-gold">Details</span>.
        </h2>
        <p className="detail-text font-sans text-sm text-bridal-charcoal/70 leading-loose">
            We source our silks from Como and our lace from Calais. 
            We believe that the fabric should not just touch your skin, 
            but caress it. True luxury is the feeling of weightlessness.
        </p>
      </div>

    </section>
  );
}