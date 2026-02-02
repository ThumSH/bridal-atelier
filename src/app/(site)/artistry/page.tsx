/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import PageHero from "@/components/global/PageHero";
import {  Palette, Flower2, Scissors, Sun } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    id: "makeup",
    title: "Bridal Makeup",
    subtitle: "The Canvas",
    desc: "We engineer radiance. Our makeup is not just applied; it is designed to withstand humidity, tears, and 4K photography. From skin prep to the final setting mist, we create a look that feels weightless but lasts an eternity.",
    features: ["Skin Analysis & Prep", "Waterproof Formulation", "Lighting-Adaptive Pigments"],
    image: "/makeup.jpg", // Ensure this exists or use /makeup-3.png
    align: "right"
  },
  {
    id: "hair",
    title: "Hair Couture",
    subtitle: "The Sculpture",
    desc: "Architectural updos, romantic waves, or traditional braids. We treat hair as a sculpture, ensuring it frames your face perfectly and holds its structure from the ceremony to the final dance.",
    features: ["Structural Pinning", "Extension Blending", "Veil Security"],
    image: "/qfc.webp",
    align: "left"
  },
  {
    id: "draping",
    title: "Draping & Styling",
    subtitle: "The Silhouette",
    desc: "The perfect saree pleat or the flawless fall of a veil. Our styling team ensures you are pinned to perfection. We specialize in Kandyan, Indian, and modern fusion draping styles.",
    features: ["Saree Pleating", "Dupatta Setting", "Jewelry Placement"],
    image: "/mermaid.webp",
    align: "right"
  }
];

const FLORALS = [
  { id: 1, title: "The Bouquet", img: "/flower.webp", desc: "Hand-tied heirloom roses." },
  { id: 2, title: "Hair Florals", img: "/floral-2.jpg", desc: "Fresh jasmine and baby's breath." },
  { id: 3, title: "Bridesmaid Bouquets", img: "/floral.webp", desc: "Complementary blooms for your party." },
  { id: 4, title: "Flower Crowns", img: "/fl-crown.webp", desc: "Whimsical halos for flower girls." },
];

export default function ArtistryPage() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // 1. Service Sections Parallax
    gsap.utils.toArray<HTMLElement>(".service-card").forEach((section) => {
        const img = section.querySelector(".service-img");
        
        gsap.to(img, {
            y: 50,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // 2. Horizontal Floral Scroll
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
        const floralTrack = document.querySelector(".floral-track");
        const floralSection = document.querySelector(".floral-section");
        
        if (floralTrack && floralSection) {
            const scrollAmount = floralTrack.scrollWidth - window.innerWidth;
            
            gsap.to(floralTrack, {
                x: -scrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: floralSection,
                    pin: true,
                    scrub: 1,
                    end: () => `+=${scrollAmount}`,
                }
            });
        }
    });

  }, { scope: container });

  return (
    <main ref={container} className="bg-bridal-charcoal min-h-screen pb-0 text-white">
      
      {/* 1. HERO */}
      <PageHero 
        title="Total Artistry" 
        subtitle="Beauty & Blooms" 
        image="/ti.webp" 
      />

      {/* 2. INTRO */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
         <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-8 block">
            Holistic Beauty
         </span>
         <h2 className="font-serif text-3xl md:text-5xl leading-relaxed">
            "We believe in a unified vision. From the flush on your cheeks to the flowers in your hands, every element is curated to tell a single, beautiful story."
         </h2>
      </section>

      {/* 3. CORE SERVICES (Makeup, Hair, Draping) */}
      <div className="space-y-0 md:space-y-32 pb-32">
        {SERVICES.map((service, i) => (
            <section key={service.id} className="service-card relative min-h-screen flex items-center overflow-hidden">
                {/* Background Tint */}
                <div className={cn(
                    "absolute inset-0 z-0",
                    i % 2 === 0 ? "bg-white/5" : "bg-transparent"
                )} />

                <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Text Side */}
                    <div className={cn(
                        "order-2 lg:order-1",
                        service.align === "left" ? "lg:order-2" : "lg:order-1"
                    )}>
                        <div className="flex items-center gap-4 mb-6 text-bridal-sage">
                            <span className="h-px w-12 bg-bridal-sage" />
                            <span className="font-sans text-xs uppercase tracking-widest">{service.subtitle}</span>
                        </div>
                        <h2 className="font-serif text-5xl md:text-7xl mb-8">{service.title}</h2>
                        <p className="font-sans text-base text-white/70 leading-loose mb-10 max-w-md">
                            {service.desc}
                        </p>
                        
                        <ul className="space-y-4 mb-10">
                            {service.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-3 font-serif text-lg text-white/90">
                                    <div className="w-1.5 h-1.5 rounded-full bg-bridal-sage" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Link href="/contact" className="inline-block border-b border-bridal-sage pb-1 text-xs uppercase tracking-widest hover:text-bridal-sage transition-colors">
                            Book {service.title}
                        </Link>
                    </div>

                    {/* Image Side */}
                    <div className={cn(
                        "order-1 lg:order-2 relative h-125 md:h-175 w-full",
                        service.align === "left" ? "lg:order-1" : "lg:order-2"
                    )}>
                        <div className="absolute inset-0 overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl">
                             <Image 
                                src={service.image} 
                                alt={service.title} 
                                fill 
                                className="service-img object-cover scale-110 grayscale hover:grayscale-0 transition-all duration-1000" 
                             />
                             {/* Floating Icon */}
                             <div className="absolute bottom-8 right-8 w-20 h-20 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                                 {i === 0 && <Palette size={32} className="text-bridal-sage" />}
                                 {i === 1 && <Scissors size={32} className="text-bridal-sage" />}
                                 {i === 2 && <Sun size={32} className="text-bridal-sage" />}
                             </div>
                        </div>
                    </div>

                </div>
            </section>
        ))}
      </div>

      {/* 4. FLORAL ARTISTRY (Horizontal Scroll) */}
      <section className="floral-section relative h-screen bg-bridal-ivory text-bridal-charcoal overflow-hidden flex flex-col justify-center">
         
         <div className="absolute top-12 left-6 md:left-12 z-20">
             <div className="flex items-center gap-3 text-bridal-sage mb-2">
                 <Flower2 size={20} />
                 <span className="font-sans text-xs uppercase tracking-widest">The Bloom</span>
             </div>
             <h2 className="font-serif text-4xl md:text-6xl text-bridal-charcoal">Floral Design</h2>
         </div>

         {/* The Track */}
         <div className="floral-track flex items-center gap-8 md:gap-20 px-6 md:px-20 w-max h-[60vh] md:h-[70vh] pt-20">
             
             {/* Intro Text Card */}
             <div className="w-75 md:w-100 shrink-0">
                 <p className="font-serif text-2xl md:text-3xl leading-relaxed text-bridal-charcoal/80">
                     "Flowers are the poetry of the wedding. We source rare blooms to create organic, flowing arrangements that feel gathered from a wild garden."
                 </p>
             </div>

             {/* Gallery Cards */}
             {FLORALS.map((item, i) => (
                 <div key={item.id} className="relative w-75 md:w-112.5 h-full shrink-0 group">
                     <div className="relative w-full h-[85%] rounded-2xl overflow-hidden mb-6">
                         <Image 
                            src={item.img} 
                            alt={item.title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                         />
                         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                     </div>
                     <div className="flex justify-between items-end border-b border-bridal-charcoal/20 pb-4">
                         <div>
                            <span className="font-sans text-[10px] uppercase tracking-widest text-bridal-sage block mb-1">0{i+1}</span>
                            <h3 className="font-serif text-2xl md:text-3xl text-bridal-charcoal">{item.title}</h3>
                         </div>
                         <div className="w-8 h-8 rounded-full border border-bridal-charcoal/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <span className="text-xl">+</span>
                         </div>
                     </div>
                 </div>
             ))}

             {/* End Spacer */}
             <div className="w-25 shrink-0" />
         </div>
      </section>

      {/* 5. FOOTER CTA */}
      <div className="py-32 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <h2 className="font-serif text-4xl md:text-5xl mb-8 relative z-10">Complete Your Look</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center relative z-10">
              <Link href="/contact" className="px-10 py-4 bg-white text-bridal-charcoal rounded-full text-xs uppercase tracking-widest hover:bg-bridal-sage hover:text-white transition-all duration-500">
                  Book Beauty & Florals
              </Link>
              <Link href="/couture" className="px-10 py-4 border border-white/30 rounded-full text-xs uppercase tracking-widest hover:border-white transition-all duration-500">
                  View Gowns
              </Link>
          </div>
      </div>

    </main>
  );
}