"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
  
  // Ref for debounce timer to prevent rapid-fire state changes
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback((id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setActiveId(id);
    }, 150); 
  }, []);

  useGSAP(
    () => {
      // 1. Simple Fade In
      gsap.from(container.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      });

      // 2. SVG Line Animation
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
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative w-full bg-bridal-charcoal overflow-hidden pt-24 pb-0">
      
      {/* Static Noise Texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />

      {/* Header */}
      <div className="relative z-10 text-center mb-16 px-6">
        <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block">
          Beyond The Dress
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-white relative inline-block drop-shadow-2xl">
          Beauty & <span className="italic text-bridal-sage">Artistry</span>
          
          {/* Decorative Lines */}
          <div className="absolute -top-24 -right-32 w-100 h-75 pointer-events-none z-[-1] opacity-60">
             <div className="w-full h-full">
               <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                  <path className="artistry-flow-line" d="M50 150 C 150 50, 250 250, 350 150" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.6" fill="none" strokeLinecap="round" />
                  <path className="artistry-flow-line" d="M50 170 C 150 70, 250 270, 350 170" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.3" fill="none" strokeLinecap="round" />
               </svg>
             </div>
          </div>
        </h2>
      </div>

      {/* Accordion */}
      <div className="flex flex-col md:flex-row w-full h-[600px] md:h-[700px] border-t border-white/10">
        {ARTISTRY_ITEMS.map((item) => (
            <div
            key={item.id}
            onMouseEnter={() => handleMouseEnter(item.id)}
            className={cn(
                "relative h-full transition-[flex-grow] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 group will-change-[flex-grow]",
                activeId === item.id ? "flex-[3]" : "flex-[1] hover:flex-[1.2]"
            )}
            >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                // REMOVED: scale-110 and scale-100 classes
                // KEPT: transition-all to smooth the grayscale/brightness change
                className={cn(
                    "object-cover transition-all duration-1000",
                    activeId === item.id ? "grayscale-0" : "grayscale brightness-50"
                )}
                />
                
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-500" />
                
                {/* Powder Effects */}
                {item.id === 'makeup' && activeId === 'makeup' && (
                  <>
                    <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(circle_at_top_right,rgba(251,113,133,0.4)_0%,transparent_60%)] opacity-100 transition-opacity duration-1000 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_bottom_left,rgba(225,29,72,0.3)_0%,transparent_60%)] opacity-100 transition-opacity duration-1000 pointer-events-none" />
                  </>
                )}
                
                {/* Gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-20 pointer-events-none">
                <div className="absolute top-8 left-8 md:top-12 md:left-12">
                <span className={cn(
                    "font-sans text-xs border rounded-full px-2 py-1 transition-colors duration-500",
                    activeId === item.id ? "text-bridal-sage border-bridal-sage" : "text-white/50 border-white/20"
                )}>
                    {item.number}
                </span>
                </div>

                {/* Text Container */}
                <div className="relative overflow-hidden w-full">
                    {/* Collapsed Title */}
                    <h3 className={cn(
                        "absolute bottom-0 left-0 -rotate-90 origin-bottom-left font-serif text-3xl text-white/50 whitespace-nowrap translate-x-12 -translate-y-8 tracking-widest transition-opacity duration-500",
                        activeId === item.id ? "opacity-0" : "opacity-100 hidden md:block"
                    )}>
                        {item.title}
                    </h3>

                    {/* Expanded Content */}
                    <div className={cn(
                        "transition-all duration-700 ease-out transform",
                        activeId === item.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 absolute bottom-0 left-0"
                    )}>
                        <div className="md:min-w-[400px] pointer-events-auto">
                            <p className="font-sans text-xs uppercase tracking-[0.3em] text-bridal-sage mb-2">
                                {item.subtitle}
                            </p>
                            <h3 className="font-serif text-4xl md:text-5xl text-white mb-6 drop-shadow-md">
                                {item.title}
                            </h3>
                            <div className="w-12 h-px bg-white/30 mb-6" />
                            <p className="font-sans text-sm text-white/70 leading-relaxed max-w-md mb-8">
                                {item.description}
                            </p>
                            <Link href="/artistry" className="flex items-center gap-2 text-xs uppercase tracking-widest text-white hover:text-bridal-sage transition-colors">
                                Learn More <ArrowUpRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        ))}
      </div>
    </section>
  );
}