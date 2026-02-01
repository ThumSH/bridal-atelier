"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; //

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    id: "couture",
    title: "Bridal Couture",
    description: "Bespoke gowns tailored to your silhouette.",
    image: "/couture.webp"
  },
  {
    id: "beauty",
    title: "Hair & Makeup",
    description: "HD artistry and styling for the modern bride.",
    image: "/makeup.jpg"
  },
  {
    id: "floral",
    title: "Floral Design",
    description: "Curated blooms, bouquets, and venue styling.",
    image: "/floral.webp"
  },
  {
    id: "knitting",
    title: "Heirloom Knits",
    description: "Hand-woven shawls and accessories.",
    image: "/knits.webp"
  },
  {
    id: "planning",
    title: "Full Planning",
    description: "Orchestrating every detail of your day.",
    image: "/planning.webp" 
  }
];

export default function ComprehensiveServices() {
  const container = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate on desktop only
  useEffect(() => {
    if (isPaused || window.innerWidth < 1024) return; 
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % SERVICES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  useGSAP(() => {
    gsap.fromTo(".service-item", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, scrollTrigger: { trigger: container.current, start: "top 70%" } }
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-bridal-ivory py-20 md:py-32 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* --- LEFT: The Service List --- */}
        <div 
          className="lg:col-span-5 flex flex-col justify-center relative z-20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-8 md:mb-12 block">
            Our Services
          </span>
          
          <div className="">
            {SERVICES.map((service, index) => (
              <div 
                key={service.id}
                // On mobile, click to expand. On desktop, hover.
                onClick={() => setActiveService(index)}
                onMouseEnter={() => window.innerWidth >= 1024 && setActiveService(index)}
                className={cn(
                  "service-item group cursor-pointer border-b border-bridal-charcoal/10 py-6 md:py-8 transition-[padding,border-color] duration-500 relative",
                  activeService === index ? "border-bridal-sage/40 pl-0 md:pl-4" : "hover:border-bridal-charcoal/20"
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className={cn(
                    "font-serif text-2xl md:text-3xl transition-all duration-500",
                    activeService === index 
                        ? "text-bridal-charcoal italic drop-shadow-[0_0_10px_rgba(138,154,91,0.2)]" 
                        : "text-bridal-charcoal/50"
                  )}>
                    {service.title}
                  </h3>
                  
                  {/* Arrow (Hidden on mobile if inactive to save space) */}
                  <div className={cn(
                      "transition-all duration-500 p-2 rounded-full",
                      activeService === index ? "opacity-100 bg-bridal-sage/10" : "opacity-0 md:opacity-0"
                  )}>
                    <ArrowRight 
                        className={cn("text-bridal-sage", activeService === index ? "rotate-90 md:-rotate-45" : "")} 
                        size={20} 
                    />
                  </div>
                </div>

                <p className={cn(
                  "mt-2 font-sans text-sm text-bridal-charcoal/60 overflow-hidden transition-all duration-500",
                  activeService === index ? "max-h-20 opacity-100 pt-2" : "max-h-0 opacity-0"
                )}>
                  {service.description}
                </p>
                
                {/* MOBILE IMAGE PREVIEW (Accordian Style) */}
                <div className={cn(
                    "lg:hidden overflow-hidden transition-all duration-700 ease-in-out mt-4",
                    activeService === index ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                )}>
                    <div className="relative h-[250px] w-full rounded-2xl overflow-hidden shadow-md">
                        <Image src={service.image} alt={service.title} fill className="object-cover" />
                    </div>
                </div>

                {/* Progress Bar (Desktop Only) */}
                {activeService === index && !isPaused && (
                  <div className="absolute bottom-0 left-0 h-[2px] w-full bg-bridal-charcoal/5 hidden lg:block">
                    <div className="h-full bg-bridal-sage animate-progress origin-left shadow-[0_0_10px_rgba(138,154,91,0.8)]" style={{ animationDuration: '4000ms' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT: The Image Showcase (Desktop Only) --- */}
        <div className="lg:col-span-7 relative h-[600px] hidden lg:block">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className={cn(
                "absolute inset-0 h-full w-full overflow-hidden transition-all duration-1000 ease-in-out",
                activeService === index 
                  ? "opacity-100 scale-100 z-10" 
                  : "opacity-0 scale-105 z-0"
              )}
            >
               <div className={cn(
                   "relative h-full w-full rounded-t-[15rem] overflow-hidden shadow-2xl transition-shadow duration-1000",
                   activeService === index ? "shadow-[0_0_50px_rgba(138,154,91,0.25)]" : "shadow-bridal-charcoal/5"
               )}>
                 <Image
                   src={service.image}
                   alt={service.title}
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-bridal-charcoal/5" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}