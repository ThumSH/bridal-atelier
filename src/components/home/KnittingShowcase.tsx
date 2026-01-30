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
    image: "https://images.unsplash.com/photo-1550614000-4b9519e0037a?q=80&w=2000&auto=format&fit=crop" // Sketching/Planning
  },
  {
    id: "02",
    title: "The Artistry",
    description: "Watch your dream come to life. This phase includes couture fittings, hair & makeup trials, and selecting the finest blooms to match your theme.",
    image: "https://images.unsplash.com/photo-1596451190630-186aff535bf2?q=80&w=2000&auto=format&fit=crop" // Fabric/Texture
  },
  {
    id: "03",
    title: "The Unveiling",
    description: "On your special day, our team is there to ensure perfection. From the final button on your dress to the placement of your veil, we handle every detail.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2000&auto=format&fit=crop" // The Bride
  }
];

export default function BespokeJourney() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate each step as you scroll down
      STEPS.forEach((step, index) => {
        gsap.from(`#step-${index}`, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `#step-${index}`,
            start: "top 80%", // Triggers when the step enters the viewport
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative w-full bg-bridal-ivory py-32 overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-24 px-6">
        <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block">
          The Process
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-bridal-charcoal">
          Your Journey to <span className="italic text-bridal-gold/80">Forever</span>
        </h2>
      </div>

      {/* Steps Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
        {STEPS.map((step, index) => (
          <div 
            key={step.id} 
            id={`step-${index}`} 
            className="flex flex-col items-center text-center group"
          >
            {/* Image Container with Elegant Arch */}
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-[10rem] mb-10 shadow-lg shadow-bridal-charcoal/5">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Step Number Overlay */}
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

      {/* Decorative Leaf (Bottom Right) */}
      <div className="absolute -right-20 bottom-20 w-80 h-80 opacity-40 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1678740889410-a2924194096d?q=80&w=1000&auto=format&fit=crop"
          alt="Leaf Decoration"
          fill
          className="object-contain blur-[3px] rotate-[-15deg]"
        />
      </div>

    </section>
  );
}