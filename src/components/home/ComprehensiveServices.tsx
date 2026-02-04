"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- CONFIGURATION ---
const SERVICES = [
  {
    id: "makeup",
    number: "01",
    title: "Master Artistry",
    category: "Makeup",
    description: "Award-winning HD artistry tailored to your unique skin tone. We sculpt light and shadow to create a radiant, tear-proof look.",
    image: "/makeup.jpg",
    bgColor: "bg-[#E6D5C3]", 
    textColor: "text-[#5C4D41]",
    borderColor: "border-[#5C4D41]/10",
    widthImage: "lg:w-1/2", 
    widthText: "lg:w-1/2",
    minHeight: "min-h-[600px]"
  },
  {
    id: "hair",
    number: "02",
    title: "Signature Hair",
    category: "Styling",
    description: "From structural avant-garde updos to romantic, flowing waves. Our engineering ensures your style withstands the wind and the veil.",
    image: "/ch.webp",
    bgColor: "bg-[#D1D9D4]", 
    textColor: "text-[#3D4A43]",
    borderColor: "border-[#3D4A43]/10",
    widthImage: "lg:w-[65%]", 
    widthText: "lg:w-[35%]",
    minHeight: "min-h-[700px]"
  },
  {
    id: "dressing",
    number: "03",
    title: "The Silhouette",
    category: "Draping",
    description: "The art of the reveal. Expert saree draping, jewelry setting, and corset adjustments to ensure a flawless fit from every camera angle.",
    image: "/bridal.jpg",
    bgColor: "bg-[#DFD3D3]", 
    textColor: "text-[#594242]",
    borderColor: "border-[#594242]/10",
    widthImage: "lg:w-[40%]", 
    widthText: "lg:w-[60%]",
    minHeight: "min-h-[550px]"
  },
  {
    id: "prep",
    number: "04",
    title: "Skin Rituals",
    category: "Preparation",
    description: "Advanced clinical facials and luxury manicures weeks before the big day. We prepare your canvas for that inner glow.",
    image: "/er.jpg",
    bgColor: "bg-[#D0DEE4]", 
    textColor: "text-[#3F525C]",
    borderColor: "border-[#3F525C]/10",
    widthImage: "lg:w-1/2", 
    widthText: "lg:w-1/2",
    minHeight: "min-h-[600px]"
  }
];

export default function ComprehensiveServices() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Subtle Parallax for the leaf shadow
    gsap.to(".leaf-shadow", {
      y: 50,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // 2. GOLDEN ROPE ANIMATION (Draws the lines)
    // We select the paths inside the SVG and animate their stroke-dashoffset
    gsap.fromTo(".golden-rope-path", 
      { strokeDasharray: 2000, strokeDashoffset: 2000 }, // Start hidden
      { 
        strokeDashoffset: 0, // Draw fully
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%", // Start drawing when section is in view
          end: "top 20%",
          scrub: 2 // Smooth drawing linked to scroll
        }
      }
    );

    // 3. Service Card Parallax
    SERVICES.forEach((service) => {
      const row = document.getElementById(`service-row-${service.id}`);
      if (!row) return;

      const img = row.querySelector(".parallax-img");
      
      gsap.fromTo(img, 
        { y: -40, scale: 1.15 },
        { 
          y: 40, 
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-bridal-ivory py-24 lg:py-40 overflow-hidden">
      
      {/* LEAF SHADOW (Top Right) */}
      <div className="leaf-shadow absolute top-0 right-0 w-[200px] h-[300px] pointer-events-none z-0 opacity-80 mix-blend-multiply blur-sm">
         <Image 
            src="/jk.png" 
            alt="Nature Shadow"
            fill
            className="object-cover"
         />
      </div>

      {/* --- HEADER --- */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 mb-24 md:mb-32 text-center">
         
         {/* GOLDEN ROPES SVG (Flowing Through Title) */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[300px] pointer-events-none z-[-1] opacity-60">
            <svg width="100%" height="100%" viewBox="0 0 1400 300" preserveAspectRatio="none">
               {/* Rope 1: The Upper Swoop */}
               <path 
                 d="M0,150 C300,50 900,250 1400,100" 
                 fill="none" 
                 stroke="#D4AF37" 
                 strokeWidth="3" 
                 className="golden-rope-path opacity-50"
               />
               {/* Rope 2: The Lower Swoop (Intertwining) */}
               <path 
                 d="M0,100 C400,250 1000,50 1400,200" 
                 fill="none" 
                 stroke="#D4AF37" 
                 strokeWidth="4" 
                 className="golden-rope-path opacity-30"
               />
            </svg>
         </div>

         {/* Diamond Icon */}
         <div className="flex justify-center mb-6">
            <div className="w-2 h-2 rotate-45 bg-bridal-charcoal" />
         </div>

         {/* Tagline */}
         <div className="flex items-center justify-center gap-3 text-bridal-charcoal/60 mb-6">
           <Sparkles size={14} className="text-bridal-gold" />
           <span className="font-sans text-[11px] uppercase tracking-[0.4em] font-bold">The Experience</span>
         </div>

         {/* Main Heading */}
         <h2 className="font-serif text-6xl md:text-8xl text-bridal-charcoal leading-[0.9] tracking-tight relative">
            Curating <span className="italic text-bridal-gold font-light">Excellence.</span>
         </h2>
      </div>

      {/* --- DYNAMIC GRID --- */}
      <div className="relative z-10 max-w-[1500px] mx-auto px-4 md:px-6 flex flex-col gap-16 md:gap-24">
        {SERVICES.map((service, index) => {
          const isEven = index % 2 === 0;

          return (
            <div 
              key={service.id}
              id={`service-row-${service.id}`}
              className={cn(
                "flex flex-col lg:flex-row w-full h-auto relative rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.01]",
                isEven ? "lg:flex-row" : "lg:flex-row-reverse",
                service.minHeight
              )}
            >
              
              {/* IMAGE BLOCK */}
              <div className={cn(
                "w-full h-[50vh] lg:h-auto relative overflow-hidden transition-[width] duration-500 ease-out",
                service.widthImage 
              )}>
                 <div className="absolute inset-0 w-full h-full">
                   <Image 
                     src={service.image} 
                     alt={service.title} 
                     fill 
                     className="parallax-img object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                 </div>
              </div>

              {/* TEXT BLOCK */}
              <div className={cn(
                "w-full h-auto lg:h-auto flex flex-col justify-center p-8 md:p-20 relative transition-[width] duration-500 ease-out",
                service.bgColor,
                service.widthText
              )}>
                 
                 <div className={cn(
                    "absolute inset-6 md:inset-10 border rounded-[2rem] opacity-100 pointer-events-none",
                    service.borderColor
                 )} />

                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                 <span className={cn(
                    "absolute top-12 right-12 font-serif text-[8rem] lg:text-[10rem] leading-none opacity-5 pointer-events-none select-none mix-blend-multiply",
                    service.textColor
                 )}>
                    {service.number}
                 </span>

                 <div className="relative z-10 px-2 md:px-6">
                    <div className="flex items-center gap-3 mb-6 lg:mb-8">
                       <span className={cn(
                          "px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold border",
                          service.textColor,
                          service.borderColor
                       )}>
                          {service.category}
                       </span>
                    </div>

                    <h3 className={cn(
                      "font-serif mb-6 lg:mb-8 leading-tight",
                      service.textColor,
                      service.widthText === "lg:w-[35%]" ? "text-4xl md:text-5xl" : "text-5xl md:text-7xl"
                    )}>
                       {service.title}
                    </h3>

                    <p className={cn(
                      "font-sans text-base leading-relaxed max-w-md mb-10 opacity-80 font-medium", 
                      service.textColor,
                      service.widthText === "lg:w-[35%]" ? "text-sm" : "text-lg"
                    )}>
                       {service.description}
                    </p>

                    <div className="group/btn inline-flex items-center gap-5 cursor-pointer">
                       <div className={cn(
                          "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-md",
                          "bg-white text-black group-hover/btn:scale-110 group-hover/btn:rotate-45"
                       )}>
                          <ArrowUpRight size={20} />
                       </div>
                       <div className="flex flex-col">
                          <span className={cn("font-sans text-xs uppercase tracking-widest font-bold", service.textColor)}>
                             Explore
                          </span>
                       </div>
                    </div>
                 </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}