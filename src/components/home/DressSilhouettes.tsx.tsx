"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DRESSES = [
  {
    id: "frock",
    title: "Frock Coat",
    description: "Timeless and elegant choice, perfect for the traditional bride who wants a classic look on her wonderful day.",
    // Placeholder for a vertical, structured dress sketch
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop" 
  },
  {
    id: "princess",
    title: "Princess Style",
    description: "For brides who want to feel like royalty. With its full skirt, fitted bodice, and delicate details.",
    // Placeholder for a wide, ballgown sketch
    image: "https://images.unsplash.com/photo-1549896792-c993d0f0c055?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "mermaid",
    title: "Mermaid Cut",
    description: "The dress hugs your curves in all the right places and flares out at the knee for a stunning silhouette.",
    // Placeholder for a fitted, curvy sketch
    image: "https://images.unsplash.com/photo-1596906233156-324508db1c49?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function DressSilhouettes() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animation 1: Frock (Left) - "The Wipe Reveal"
      // Looks like it is being drawn or printed top-to-bottom
      gsap.fromTo("#dress-frock .dress-img", 
        { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.5 },
        { 
          clipPath: "inset(0% 0% 0% 0%)", 
          opacity: 1, 
          duration: 1.5, 
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#dress-frock",
            start: "top 75%",
          }
        }
      );

      // Animation 2: Princess (Center) - "The Bloom"
      // Scales up from the bottom (waist up and skirt out)
      gsap.fromTo("#dress-princess .dress-img", 
        { scaleY: 0, scaleX: 0.8, transformOrigin: "bottom center", opacity: 0 },
        { 
          scaleY: 1, 
          scaleX: 1, 
          opacity: 1, 
          duration: 1.2, 
          ease: "back.out(1.7)", // Bounce effect
          scrollTrigger: {
            trigger: "#dress-princess",
            start: "top 75%",
          }
        }
      );

      // Animation 3: Mermaid (Right) - "The Ethereal Glide"
      // Slides in with a blur, mimicking the movement of a train
      gsap.fromTo("#dress-mermaid .dress-img", 
        { x: 50, filter: "blur(10px)", opacity: 0 },
        { 
          x: 0, 
          filter: "blur(0px)", 
          opacity: 1, 
          duration: 1.5, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#dress-mermaid",
            start: "top 75%",
          }
        }
      );

      // Common Text Reveal (Staggered)
      gsap.from(".dress-info", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        }
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative w-full bg-white py-32 overflow-hidden">
      
      {/* Decorative Background Sketch Marks */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/sketch-header.png')]"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-4 block">
            The Collection
          </span>
          <h2 className="font-serif text-4xl text-bridal-charcoal">
            Signature Silhouettes
          </h2>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          
          {DRESSES.map((dress, index) => (
            <div 
              key={dress.id} 
              id={`dress-${dress.id}`}
              className="flex flex-col items-center text-center group"
            >
              {/* Image Container */}
              {/* We create a fixed aspect ratio container for the sketch */}
              <div className="dress-img relative w-64 h-96 mb-10 transition-transform duration-500 hover:-translate-y-2">
                 {/* TIP: For the real sketch look, use transparent PNGs. 
                    I'm using mix-blend-multiply to remove white backgrounds from stock photos.
                 */}
                 <Image
                   src={dress.image}
                   alt={dress.title}
                   fill
                   className="object-contain mix-blend-multiply filter grayscale contrast-125 brightness-110" 
                 />
              </div>

              {/* Text Content */}
              <div className="dress-info">
                <h3 className="font-serif text-2xl text-bridal-charcoal mb-4">
                  {dress.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-bridal-charcoal/60 max-w-xs mx-auto">
                  {dress.description}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}