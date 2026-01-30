"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scissors, Globe, HeartHandshake } from "lucide-react"; 

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AtelierIntro() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          end: "bottom top",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Text Reveal
      tl.from(".intro-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
      });

      // 2. Stats Grid Reveal
      tl.from(".intro-stat", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      }, "-=0.5");

      // 3. Leaf Parallax (Both Leaves)
      gsap.to(".intro-leaf", {
        y: 40,
        rotation: 5,
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
    <section ref={container} className="relative w-full bg-bridal-ivory py-32 md:py-48 flex justify-center items-center overflow-hidden">
      
      {/* Texture */}
      <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-multiply" />

      {/* Watermark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[20rem] md:text-[30rem] font-serif text-bridal-charcoal/5 leading-none select-none pointer-events-none z-0">
        B
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="max-w-4xl w-full px-6 relative z-10 flex flex-col items-center">
        
        {/* Main Text Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="intro-text font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block">
            Since 2024
          </span>
          
          <h2 className="intro-text font-serif text-4xl md:text-5xl text-bridal-charcoal mb-8 leading-tight">
            We craft not just dresses, <br />
            <span className="italic text-bridal-gold/80">but memories.</span>
          </h2>
          
          <p className="intro-text font-sans text-sm md:text-base leading-loose text-bridal-charcoal/70 mb-8">
            Located in the heart of the city, our atelier is a sanctuary for the modern bride. 
            Every stitch is a promise, every drape a work of art. We invite you to experience 
            the quiet luxury of true craftsmanship.
          </p>

           {/* Signature */}
            <div className="intro-text flex flex-col items-center gap-4">
            <svg width="150" height="40" viewBox="0 0 150 40" className="stroke-bridal-charcoal fill-none opacity-60">
                <path d="M10,30 Q40,5 60,30 T120,20" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-sans text-[10px] uppercase tracking-widest text-bridal-sage">
                Founder & Creative Director
            </span>
            </div>
        </div>

        {/* --- VALUES STRIP --- */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-bridal-charcoal/10">
            
            <div className="intro-stat flex flex-col items-center text-center gap-3">
                <div className="p-3 bg-white rounded-full shadow-sm text-bridal-sage">
                    <Scissors strokeWidth={1} size={20} />
                </div>
                <h4 className="font-serif text-lg text-bridal-charcoal">Handcrafted</h4>
                <p className="font-sans text-[10px] uppercase tracking-widest text-bridal-charcoal/50">
                    100+ Hours Per Gown
                </p>
            </div>

            <div className="intro-stat flex flex-col items-center text-center gap-3">
                <div className="p-3 bg-white rounded-full shadow-sm text-bridal-sage">
                    <Globe strokeWidth={1} size={20} />
                </div>
                <h4 className="font-serif text-lg text-bridal-charcoal">Global</h4>
                <p className="font-sans text-[10px] uppercase tracking-widest text-bridal-charcoal/50">
                    Serving Brides Worldwide
                </p>
            </div>

            <div className="intro-stat flex flex-col items-center text-center gap-3">
                <div className="p-3 bg-white rounded-full shadow-sm text-bridal-sage">
                    <HeartHandshake strokeWidth={1} size={20} />
                </div>
                <h4 className="font-serif text-lg text-bridal-charcoal">Bespoke</h4>
                <p className="font-sans text-[10px] uppercase tracking-widest text-bridal-charcoal/50">
                    Tailored To Your Soul
                </p>
            </div>

        </div>

      </div>

      {/* --- DECORATION: TOP LEFT (Large & Soft) --- */}
      <div className="intro-leaf absolute -top-20 -left-20 z-0 h-[400px] w-[500px] opacity-40 pointer-events-none">
         <Image
            src="/leaves.webp"
            alt="Leaf Accent"
            fill
            className="object-contain blur-[3px] rotate-180" 
         />
      </div>

      {/* --- DECORATION: BOTTOM RIGHT (Small & Sharp) --- */}
      {/* This creates the 'Frame' effect I mentioned */}
      <div className="intro-leaf absolute -bottom-10 -right-10 z-0 h-[200px] w-[200px] opacity-30 pointer-events-none">
         <Image
            src="/leaves.webp"
            alt="Leaf Accent"
            fill
            className="object-contain blur-[1px] -rotate-45" 
         />
      </div>

    </section>
  );
}