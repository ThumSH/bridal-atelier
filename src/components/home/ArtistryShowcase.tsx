"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ARTISTRY_ITEMS = [
  {
    id: "makeup",
    number: "01",
    title: "Bridal Makeup",
    subtitle: "High Definition Artistry",
    description: "Flawless, long-lasting application designed to look perfect in person and ethereal on camera. We focus on skin-first radiance.",
    image: "/qfc.webp"
  },
  {
    id: "hair",
    number: "02",
    title: "Couture Hair",
    subtitle: "Sculpted Elegance",
    description: "From Hollywood waves to intricate updos, we sculpt hair that withstands the elements and complements your veil placement.",
    image: "/r.webp"
  },
  {
    id: "details",
    number: "03",
    title: "The Polish",
    subtitle: "Draping & Styling",
    description: "The final touch. We assist with dressing, jewelry placement, and veil setting to ensure your look is editorially perfect.",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function ArtistryShowcase() {
  const container = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>("makeup");

  useGSAP(
    () => {
      // 1. Reveal Header & Section
      gsap.from(container.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      });

      // 2. COUTURE FLOW ANIMATION (The Rope-Cloth Lines)
      // Draw the lines in
      gsap.fromTo(".artistry-flow-line", 
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: container.current,
            start: "top 60%",
          }
        }
      );

      // Gentle Floating Animation
      gsap.to(".artistry-flow-container", {
        y: 15,
        rotation: 1,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative w-full bg-bridal-charcoal overflow-hidden pt-24 pb-0">
      
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />

      {/* --- SECTION HEADER --- */}
      <div className="relative z-10 text-center mb-16 px-6">
        <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block">
          Beyond The Dress
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-white relative inline-block">
          Beauty & <span className="italic text-bridal-sage">Artistry</span>
          
          {/* --- THE ROPE-CLOTH DECORATION (Behind Title) --- */}
          <div className="absolute -top-24 -right-32 w-[400px] h-[300px] pointer-events-none z-[-1] opacity-60">
             <div className="artistry-flow-container w-full h-full">
               <svg 
                  className="w-full h-full" 
                  viewBox="0 0 400 300" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
               >
                  {/* Line 1: Main Flow (Gold) */}
                  <path 
                    className="artistry-flow-line"
                    d="M50 150 C 150 50, 250 250, 350 150" 
                    stroke="#D4AF37" 
                    strokeWidth="1.5" 
                    strokeOpacity="0.6"
                    fill="none"
                    strokeLinecap="round"
                  />
                  
                  {/* Line 2: Parallel Detail (White) */}
                  <path 
                    className="artistry-flow-line"
                    d="M50 170 C 150 70, 250 270, 350 170" 
                    stroke="#FFFFFF" 
                    strokeWidth="1" 
                    strokeOpacity="0.3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  
                  {/* Line 3: Stitch Detail (Sage Dashed) */}
                  <path 
                    className="artistry-flow-line"
                    d="M60 130 C 160 30, 260 230, 360 130" 
                    stroke="#8A9A5B" 
                    strokeWidth="0.5" 
                    strokeOpacity="0.4"
                    fill="none"
                    strokeDasharray="4 4"
                  />
               </svg>
             </div>
          </div>

        </h2>
      </div>

      {/* --- THE ACCORDION --- */}
      <div className="flex flex-col md:flex-row w-full h-[600px] md:h-[700px] border-t border-white/10">
        {ARTISTRY_ITEMS.map((item) => (
            <div
            key={item.id}
            onMouseEnter={() => setActiveId(item.id)}
            className={cn(
                "relative h-full flex-1 transition-all duration-700 ease-in-out cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 group",
                // Active Logic
                activeId === item.id ? "flex-[3]" : "flex-[1] hover:flex-[1.2]"
            )}
            >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                src={item.image}
                alt={item.title}
                fill
                className={cn(
                    "object-cover transition-transform duration-1000",
                    activeId === item.id ? "scale-100 grayscale-0" : "scale-110 grayscale brightness-50"
                )}
                />
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500",
                    activeId === item.id ? "opacity-80" : "opacity-60"
                )} />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
                
                {/* Top Number */}
                <div className="absolute top-8 left-8 md:top-12 md:left-12">
                <span className={cn(
                    "font-sans text-xs border rounded-full px-2 py-1 transition-colors duration-500",
                    activeId === item.id ? "text-bridal-sage border-bridal-sage" : "text-white/50 border-white/20"
                )}>
                    {item.number}
                </span>
                </div>

                {/* Animated Content */}
                <div className="transform transition-transform duration-500 origin-bottom-left">
                {/* Vertical Title (Collapsed State) */}
                {activeId !== item.id && (
                    <h3 className="hidden md:block absolute bottom-0 left-0 -rotate-90 origin-bottom-left font-serif text-3xl text-white/50 whitespace-nowrap translate-x-16 -translate-y-8 tracking-widest">
                        {item.title}
                    </h3>
                )}

                {/* Expanded Content */}
                <div className={cn(
                    "transition-all duration-700 ease-in-out overflow-hidden",
                    activeId === item.id ? "opacity-100 translate-y-0 max-h-[400px]" : "opacity-0 translate-y-8 max-h-0 md:opacity-0"
                )}>
                    <p className="font-sans text-xs uppercase tracking-[0.3em] text-bridal-sage mb-2">
                        {item.subtitle}
                    </p>
                    <h3 className="font-serif text-4xl md:text-5xl text-white mb-6">
                        {item.title}
                    </h3>
                    <div className="w-12 h-[1px] bg-white/30 mb-6" />
                    <p className="font-sans text-sm text-white/70 leading-relaxed max-w-md mb-8">
                        {item.description}
                    </p>
                    <Link href="/artistry" className="flex items-center gap-2 text-xs uppercase tracking-widest text-white hover:text-bridal-sage transition-colors group/btn">
   Learn More <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
</Link>
                </div>

                {/* Mobile Fallback Title */}
                <h3 className={cn(
                    "md:hidden font-serif text-2xl text-white transition-opacity duration-300",
                    activeId === item.id ? "hidden" : "block"
                )}>
                    {item.title}
                </h3>
                </div>

            </div>

            </div>
        ))}
      </div>

    </section>
  );
}