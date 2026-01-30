"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: "couture",
    title: "Couture",
    subtitle: "The Silhouettes",
    description: "Custom bridal gowns, veils, and rental collections tailored to perfection.",
    color: "bg-stone-300", // Placeholder for Dress Image
  },
  {
    id: "artistry",
    title: "Artistry",
    subtitle: "The Eternal Glow",
    description: "HD Makeup, Airbrushing, and complete bridal styling.",
    color: "bg-stone-400", // Placeholder for Makeup Image
  },
  {
    id: "craft",
    title: "The Craft",
    subtitle: "Woven Soul",
    description: "Bespoke hand-knitted shawls, embroidery, and heirloom details.",
    color: "bg-bridal-sage/40", // Highlight this specific service
  },
];

export default function ServicePillars() {
   const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

    useGSAP(
    () => {
      gsap.to(".leaf-blur", {
        y: 40,
        rotation: 15,
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
    <section ref={container} className="relative flex h-[80vh] w-full flex-col overflow-hidden bg-bridal-ivory md:flex-row">
      {services.map((service) => (
        <div
          key={service.id}
          onMouseEnter={() => setActive(service.id)}
          onMouseLeave={() => setActive(null)}
          className={cn(
            "group relative flex-1 cursor-pointer border-r border-bridal-charcoal/10 transition-all duration-700 ease-in-out",
            // If one is active, shrink the others. If this one is active, grow it.
            active && active !== service.id ? "flex-[0.5] opacity-50" : "flex-1 opacity-100",
            active === service.id ? "flex-[1.5]" : ""
          )}
        >
                    
            
          {/* Background Image Layer */}
          <div className={cn("absolute inset-0 z-0 transition-transform duration-700", service.color)} />
          
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40" />

          {/* Text Content */}
          <div className="relative z-10 flex h-full flex-col justify-end p-8 pb-20 md:p-12">
            {/* Subtitle - Slides down */}
            <span className="mb-2 block translate-y-4 font-sans text-xs uppercase tracking-[0.3em] text-white/80 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {service.subtitle}
            </span>
            
            {/* Title - Always visible */}
            <h2 className="mb-4 font-serif text-4xl text-white md:text-5xl">
              {service.title}
            </h2>
            
            {/* Description - Slides up */}
            <p className="max-w-xs translate-y-8 font-sans text-sm leading-relaxed text-white/90 opacity-0 transition-all delay-100 duration-700 group-hover:translate-y-0 group-hover:opacity-100">
              {service.description}
            </p>
            
            {/* Button - Fades in */}
            <div className="mt-8 opacity-0 transition-opacity delay-200 duration-700 group-hover:opacity-100">
               <span className="inline-block border border-white/50 px-6 py-2 text-xs uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-bridal-charcoal">
                 Explore
               </span>
            </div>
          </div>
        </div>
      ))}

      <div className="leaf-blur absolute top-0 right-0 z-20 h-[300px] w-[300px] translate-x-1/4 -translate-y-1/4 opacity-15 pointer-events-none">
        <Image
          src="/leaves.webp"
          alt="Leaf Accent"
          fill
          className="object-contain blur-[3px]"
        />
      </div>
    </section>
  );
}