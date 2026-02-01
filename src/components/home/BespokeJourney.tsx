"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    id: "01",
    title: "The Consultation",
    description: "Your journey begins with a private appointment. Over coffee or champagne, we discuss your vision, from the silhouette of your gown to the palette of your florals.",
    image: "/mea.webp"
  },
  {
    id: "02",
    title: "The Artistry",
    description: "Watch your dream come to life. This phase includes couture fittings, hair & makeup trials, and selecting the finest blooms to match your theme.",
    image: "/makeup.webp"
  },
  {
    id: "03",
    title: "The Unveiling",
    description: "On your special day, our team is there to ensure perfection. From the final button on your dress to the placement of your veil, we handle every detail.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function BespokeJourney() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // 1. Reveal Cards
      STEPS.forEach((step, index) => {
        gsap.from(`#step-card-${index}`, {
          y: 30, // Reduced distance for smoother reveal
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: `#step-card-${index}`,
            start: "top 90%", 
          },
        });
      });

      // 2. Parallax (Optimized)
      mm.add("(min-width: 768px)", () => {
        STEPS.forEach((step, index) => {
          // Use yPercent for GPU efficiency
          const moveY = index % 2 === 0 ? -15 : 15; 

          gsap.to(`#step-card-${index}`, {
            yPercent: moveY, 
            ease: "none", 
            scrollTrigger: {
              trigger: container.current,
              start: "top bottom", 
              end: "bottom top",   
              scrub: 0.5, // Faster reaction time
            },
          });
        });
      });

      // 3. Background Glow Pulse
      gsap.to(".magic-glow", {
        scale: 1.1,
        opacity: 0.5,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative w-full bg-bridal-ivory py-20 md:py-40 overflow-hidden">
      
      {/* Background Glow */}
      <div className="magic-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] rounded-full pointer-events-none z-0 will-change-transform" />

      {/* Header */}
      <div className="text-center mb-16 px-6 relative z-10">
        <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block">
          The Process
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-bridal-charcoal">
          Your Journey to <span className="italic text-bridal-gold/80">Forever</span>
        </h2>
      </div>

      {/* Steps Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
        {STEPS.map((step, index) => (
          <div 
            key={step.id} 
            id={`step-card-${index}`} 
            className="flex flex-col items-center text-center group will-change-transform backface-hidden"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-[10rem] mb-8 shadow-lg shadow-bridal-charcoal/5 transform-gpu">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              
              {/* Badge */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-bridal-sage/20 shadow-[0_0_15px_rgba(138,154,91,0.2)]">
                 <span className="font-serif text-sm italic text-bridal-charcoal">{step.id}</span>
              </div>
            </div>

            {/* Content */}
            <h3 className="font-serif text-2xl text-bridal-charcoal mb-4 group-hover:text-bridal-sage transition-colors duration-300">{step.title}</h3>
            <div className="w-12 h-px bg-bridal-sage/50 mb-6 group-hover:w-24 transition-all duration-500" />
            <p className="font-sans text-sm leading-loose text-bridal-charcoal/70 max-w-[280px]">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Static Leaf Decoration (Removed Animation to reduce load) */}
      <div className="absolute -left-32 -top-20 w-[400px] h-[400px] opacity-10 pointer-events-none z-0">
        <Image
          src="/jk.png" 
          alt="Leaf Decoration"
          fill
          className="object-contain blur-[1px]"
        />
      </div>

    </section>
  );
}