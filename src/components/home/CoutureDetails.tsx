"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DETAILS = [
  {
    title: "Ethereal Silks",
    description: "We source only the finest mulberry silks and heavy satins, ensuring a drape that moves like water and feels like a second skin.",
    image: "/silk.webp", // Found in your public folder
    features: ["100% Organic Silk", "High-Lustre Finish", "Breathable Luxury"]
  },
  {
    title: "Hand-Knitted Lace",
    description: "Our signature. Each veil and lace insert is hand-knitted in-house, taking up to 120 hours to achieve a pattern that is entirely unique.",
    image: "/lace.webp", // Found in your public folder
    features: ["Bespoke Patterns", "Heritage Techniques", "Delicate Durability"]
  },
  {
    title: "Intricate Beadwork",
    description: "Precision-placed crystals and pearls that capture the light from every angle, hand-sewn to create a shimmering, multidimensional effect.",
    image: "/bead.webp", // Found in your public folder
    features: ["Swarovski Accents", "Reinforced Stitching", "Customizable Shine"]
  }
];

export default function CoutureDetails() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Image Zoom/Scale on Scroll
    const items = gsap.utils.toArray<HTMLElement>(".detail-item");
    
    items.forEach((item, i) => {
      const img = item.querySelector(".detail-img");
      
      gsap.fromTo(img, 
        { scale: 1.2, filter: "blur(10px)" },
        { 
          scale: 1, 
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

    // 2. Background Color Shift
    gsap.to(container.current, {
        backgroundColor: "#2C2C2C", // Shift to Charcoal for a "Premium" look
        color: "#F9F7F2",
        scrollTrigger: {
            trigger: container.current,
            start: "top 40%",
            end: "top 10%",
            scrub: true,
        }
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative bg-bridal-ivory py-32 transition-colors duration-1000 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-24 text-center">
            <span className="font-sans text-[10px] uppercase tracking-[0.6em] text-bridal-sage font-bold mb-4 block">
                The Anatomy of a Gown
            </span>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight">
                Crafted from <br /><span className="italic text-bridal-gold">The Finest Thread.</span>
            </h2>
        </div>

        {/* Content Rows */}
        <div className="space-y-32 md:space-y-64">
          {DETAILS.map((detail, i) => (
            <div 
              key={detail.title} 
              className={`detail-item flex flex-col items-center gap-12 md:gap-24 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* IMAGE SIDE - The "Lens" */}
              <div className="flex-1 w-full relative group">
                <div className="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">
                  <Image 
                    src={detail.image} 
                    alt={detail.title} 
                    fill 
                    className="detail-img object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                {/* Decoration Element */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-bridal-gold/30 rounded-br-[2rem]" />
              </div>

              {/* TEXT SIDE */}
              <div className="flex-1 max-w-lg">
                <h3 className="font-serif text-4xl md:text-5xl mb-6">{detail.title}</h3>
                <p className="font-sans text-base opacity-70 leading-loose mb-10">
                  {detail.description}
                </p>
                
                <ul className="grid grid-cols-1 gap-4">
                  {detail.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-bridal-sage/20 flex items-center justify-center text-bridal-sage">
                        <Check size={12} />
                      </div>
                      <span className="font-sans text-[10px] uppercase tracking-widest font-bold opacity-80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Background Text Watermark */}
      <div className="absolute bottom-0 right-0 text-[15vw] font-serif text-white/5 pointer-events-none select-none -mb-10">
        Couture
      </div>
    </section>
  );
}