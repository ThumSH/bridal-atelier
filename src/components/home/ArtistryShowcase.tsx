"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const ARTISTRY_ITEMS = [
  {
    id: 1,
    category: "The Face",
    title: "Bridal Makeup",
    description: "High-definition, tear-proof artistry designed to look flawless in person and radiant in flash photography.",
    image: "/qfc.webp", 
    link: "/artistry"
  },
  {
    id: 2,
    category: "The Hair",
    title: "Couture Styling",
    description: "From structural updos to soft romantic waves, we engineer hairstyles that withstand weather and time.",
    image: "/r.webp",
    link: "/artistry"
  },
  {
    id: 3,
    category: "The Finish",
    title: "Draping & Polish",
    description: "The final touches. Saree draping, jewelry setting, and body glow application for the complete look.",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop",
    link: "/artistry"
  }
];

export default function ArtistryShowcase() {
  const [activeId, setActiveId] = useState<number | null>(2); // Default center open

  return (
    <section className="relative w-full bg-bridal-charcoal py-32 overflow-hidden">
      
      {/* Background Texture (Subtle Noise) */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

      <div className="max-w-[1400px] mx-auto px-6 h-[80vh] min-h-[600px] flex flex-col lg:flex-row gap-4">
        
        {/* --- THE HEADER (Desktop: Left Side, Mobile: Top) --- */}
        <div className="lg:w-1/4 flex flex-col justify-between py-8 lg:py-0 relative z-10">
           <div>
              <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block">
                 The Studio
              </span>
              <h2 className="font-serif text-5xl text-white mb-6">
                 Artistry <br/> <span className="italic text-bridal-sage">&</span> Grace
              </h2>
              <p className="font-sans text-sm text-white/60 leading-loose max-w-xs mb-8">
                 We view the face as a canvas. Our approach is not just about coverage, but about bringing your inner radiance to the surface.
              </p>
           </div>
           
           <Link 
             href="/artistry" 
             className="hidden lg:flex items-center gap-3 text-xs uppercase tracking-widest text-white hover:text-bridal-sage transition-colors group"
           >
             View Full Portfolio 
             <ArrowUpRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

        {/* --- THE INTERACTIVE PANELS (The "Lag-Free" Magic) --- */}
        <div className="lg:w-3/4 flex flex-col lg:flex-row gap-2 h-full">
           {ARTISTRY_ITEMS.map((item) => (
              <div 
                key={item.id}
                onMouseEnter={() => setActiveId(item.id)}
                className={cn(
                  "relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group",
                  // FLEX LOGIC: Active item gets flex-[3], others get flex-[1]
                  activeId === item.id ? "flex-[3] opacity-100" : "flex-[1] opacity-60 hover:opacity-80"
                )}
              >
                 {/* 1. IMAGE BACKGROUND */}
                 <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-1000",
                        activeId === item.id ? "scale-100 grayscale-0" : "scale-110 grayscale"
                      )}
                    />
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                 </div>

                 {/* 2. POWDER GLOW (Only visible when active) */}
                 <div className={cn(
                    "absolute inset-0 pointer-events-none transition-opacity duration-700",
                    activeId === item.id ? "opacity-100" : "opacity-0"
                 )}>
                    {/* Inner Vignette using your global class */}
                    <div className="absolute inset-0 powder-vignette mix-blend-screen" />
                 </div>

                 {/* 3. CONTENT */}
                 <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end">
                    
                    {/* Category Label (Always Visible) */}
                    <div className="flex items-center gap-3 mb-4">
                       <div className={cn(
                          "w-8 h-[1px] transition-all duration-500",
                          activeId === item.id ? "bg-bridal-sage w-12" : "bg-white/50"
                       )} />
                       <span className="font-sans text-[10px] uppercase tracking-widest text-white/80">
                          {item.category}
                       </span>
                    </div>

                    {/* Title & Desc (Expanded Only) */}
                    <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">
                       {item.title}
                    </h3>

                    <div className={cn(
                       "overflow-hidden transition-all duration-700 delay-100",
                       activeId === item.id ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    )}>
                       <p className="font-sans text-sm text-white/70 leading-relaxed max-w-md mb-6">
                          {item.description}
                       </p>
                       
                       <div className="flex items-center gap-2 text-bridal-sage text-xs uppercase tracking-widest">
                          <Sparkles size={14} />
                          <span>Explore Service</span>
                       </div>
                    </div>

                 </div>

              </div>
           ))}
        </div>

      </div>
    </section>
  );
}