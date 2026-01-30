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
    image: "https://images.unsplash.com/photo-1550614000-4b9519e0037a?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "The Artistry",
    description: "Watch your dream come to life. This phase includes couture fittings, hair & makeup trials, and selecting the finest blooms to match your theme.",
    image: "https://images.unsplash.com/photo-1596451190630-186aff535bf2?q=80&w=2000&auto=format&fit=crop"
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
      // 1. Initial Fade In (Standard Reveal)
      STEPS.forEach((step, index) => {
        gsap.from(`#step-card-${index}`, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `#step-card-${index}`,
            start: "top 85%", // Triggers when the top of the card hits 85% of viewport
          },
        });
      });

      // 2. The "Up & Down" Parallax (The Magic Part)
      STEPS.forEach((step, index) => {
        // Even items (0, 2) move UP (-120px)
        // Odd item (1) moves DOWN (+120px)
        // This creates a strong "separation" effect
        const moveY = index % 2 === 0 ? -120 : 120; 

        gsap.to(`#step-card-${index}`, {
          y: moveY, 
          ease: "none", // Linear ease is crucial for scrub
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom", // Start moving when section enters
            end: "bottom top",   // Stop moving when section leaves
            scrub: 1.2,          // Slight delay for smoothness
          },
        });
      });

      // 3. Leaf Rotation (Top Right)
      gsap.to(".leaf-blur", {
        rotation: 45,
        y: 50,
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
    <section ref={container} className="relative w-full bg-bridal-ivory py-40 overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-12 px-6 relative z-10">
        <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block">
          The Process
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-bridal-charcoal">
          Your Journey to <span className="italic text-bridal-gold/80">Forever</span>
        </h2>
      </div>

      {/* Steps Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
        {STEPS.map((step, index) => (
          <div 
            key={step.id} 
            // ID assigned to the WHOLE card so the text moves with the image
            id={`step-card-${index}`} 
            className="flex flex-col items-center text-center group will-change-transform"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-[10rem] mb-10 shadow-lg shadow-bridal-charcoal/5">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Step Number Badge */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-bridal-sage/20">
                 <span className="font-serif text-sm italic text-bridal-charcoal">{step.id}</span>
              </div>
            </div>

            {/* Content */}
            <h3 className="font-serif text-2xl text-bridal-charcoal mb-4">{step.title}</h3>
            <div className="w-12 h-[1px] bg-bridal-sage/50 mb-6" />
            <p className="font-sans text-sm leading-loose text-bridal-charcoal/70 max-w-xs">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Decorative Leaf - Top Right */}
      {/* Using leaves.webp as it exists in your repo */}
      <div className="leaf-blur absolute -left-32 -top-20 w-[500px] h-[500px] opacity-10 pointer-events-none">
        <Image
          src="/jk.png" 
          alt="Leaf Decoration"
          fill
          className="object-contain blur-[2px] rotate-[-55deg]"
        />
      </div>

    </section>
  );
}