"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
    image: "/knits.webp"
  }
];

export default function ComprehensiveServices() {
  const container = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // New state to track hover

  // --- Auto-Scroll Logic ---
  useEffect(() => {
    // If user is hovering (paused), do nothing.
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % SERVICES.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  useGSAP(() => {
    gsap.fromTo(".service-item", 
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-bridal-ivory py-32 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* --- LEFT: The Service List --- */}
        {/* Added onMouseEnter/Leave to the PARENT container to handle pausing */}
        <div 
          className="lg:col-span-5 flex flex-col justify-center relative z-20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-12 block">
            Our Services
          </span>
          
          <div className="">
            {SERVICES.map((service, index) => (
              <div 
                key={service.id}
                onMouseEnter={() => setActiveService(index)} // Manual override
                className={cn(
                  "service-item group cursor-pointer border-b border-bridal-charcoal/10 py-8 transition-[padding,border-color] duration-500 relative",
                  activeService === index ? "border-bridal-charcoal/40 pl-4" : "hover:border-bridal-charcoal/20"
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className={cn(
                    "font-serif text-3xl transition-colors duration-500",
                    activeService === index ? "text-bridal-charcoal italic" : "text-bridal-charcoal/50"
                  )}>
                    {service.title}
                  </h3>
                  <ArrowRight 
                    className={cn(
                      "transition-all duration-500",
                      activeService === index ? "opacity-100 -rotate-45 text-bridal-sage" : "opacity-0 -translate-x-4"
                    )} 
                    size={24} 
                  />
                </div>
                <p className={cn(
                  "mt-2 font-sans text-sm text-bridal-charcoal/60 overflow-hidden transition-all duration-500",
                  activeService === index ? "max-h-20 opacity-100 pt-2" : "max-h-0 opacity-0"
                )}>
                  {service.description}
                </p>
                
                {/* Progress Bar for Auto-Scroll Visualization (Optional but nice) */}
                {activeService === index && !isPaused && (
                  <div className="absolute bottom-0 left-0 h-[1px] w-full bg-bridal-charcoal/5">
                    <div className="h-full bg-bridal-sage animate-progress origin-left" style={{ animationDuration: '4000ms' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT: The Image Showcase --- */}
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
               <div className="relative h-full w-full rounded-t-[15rem] overflow-hidden shadow-2xl shadow-bridal-charcoal/5">
                 <Image
                   src={service.image}
                   alt={service.title}
                   fill
                   className="object-cover transition-transform duration-[4000ms] ease-linear scale-100 hover:scale-105"
                   // Added a subtle slow zoom to the image itself while it is active
                 />
                 <div className="absolute inset-0 bg-bridal-charcoal/10" />
                 
                 <div className="absolute bottom-12 left-12 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-bridal-charcoal">
                      {service.title}
                    </span>
                 </div>
               </div>
            </div>
          ))}

          <div className="absolute -right-12 -top-30 z-20 h-64 w-64 opacity-20 pointer-events-none">
             <Image
                src="/leaves.webp"
                alt="Leaf"
                fill
                className="object-contain blur-[2px]"
             />
          </div>
        </div>
      </div>
    </section>
  );
}