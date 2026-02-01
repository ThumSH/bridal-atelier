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

      // 2. Signature Animation
      tl.fromTo(".signature-path", 
        { strokeDasharray: 300, strokeDashoffset: 300 },
        { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" },
        "-=0.5"
      );

      // 3. Stats Grid Reveal
      tl.from(".intro-stat", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      }, "-=1.5");

      // 4. Leaf Parallax (Straight Vertical Movement Only)
      // REMOVED: rotation: 5
      gsap.to(".intro-leaf", {
        y: 40,
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
      
      <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-multiply" />
      
      {/* Golden Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Watermark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[20rem] md:text-[30rem] font-serif text-bridal-charcoal/5 leading-none select-none pointer-events-none z-0">
        B
      </div>

      <div className="max-w-4xl w-full px-6 relative z-10 flex flex-col items-center">
        
        {/* Main Text Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="intro-text font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block font-medium">
            Since 2024
          </span>
          
          <h2 className="intro-text font-serif text-4xl md:text-5xl text-bridal-charcoal mb-8 leading-tight drop-shadow-sm">
            We craft not just dresses, <br />
            <span className="italic text-bridal-gold/90 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">but memories.</span>
          </h2>
          
          <p className="intro-text font-sans text-sm md:text-base leading-loose text-bridal-charcoal/70 mb-8">
            Located in the heart of the city, our atelier is a sanctuary for the modern bride. 
            Every stitch is a promise, every drape a work of art. We invite you to experience 
            the quiet luxury of true craftsmanship.
          </p>

           {/* Signature */}
            <div className="intro-text flex flex-col items-center gap-4">
            <svg width="150" height="40" viewBox="0 0 150 40" className="stroke-bridal-charcoal fill-none opacity-80">
                <path className="signature-path" d="M10,30 Q40,5 60,30 T120,20" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-sans text-[10px] uppercase tracking-widest text-bridal-sage">
                Founder & Creative Director
            </span>
            </div>
        </div>

        {/* --- VALUES STRIP --- */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-bridal-charcoal/10">
            
            <div className="intro-stat flex flex-col items-center text-center gap-3 group">
                <div className="p-4 bg-white rounded-full shadow-sm text-bridal-sage transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(138,154,91,0.3)] group-hover:scale-110">
                    <Scissors strokeWidth={1} size={22} />
                </div>
                <h4 className="font-serif text-lg text-bridal-charcoal group-hover:text-bridal-sage transition-colors">Handcrafted</h4>
                <p className="font-sans text-[10px] uppercase tracking-widest text-bridal-charcoal/50">
                    100+ Hours Per Gown
                </p>
            </div>

            <div className="intro-stat flex flex-col items-center text-center gap-3 group">
                <div className="p-4 bg-white rounded-full shadow-sm text-bridal-sage transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(138,154,91,0.3)] group-hover:scale-110">
                    <Globe strokeWidth={1} size={22} />
                </div>
                <h4 className="font-serif text-lg text-bridal-charcoal group-hover:text-bridal-sage transition-colors">Global</h4>
                <p className="font-sans text-[10px] uppercase tracking-widest text-bridal-charcoal/50">
                    Serving Brides Worldwide
                </p>
            </div>

            <div className="intro-stat flex flex-col items-center text-center gap-3 group">
                <div className="p-4 bg-white rounded-full shadow-sm text-bridal-sage transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(138,154,91,0.3)] group-hover:scale-110">
                    <HeartHandshake strokeWidth={1} size={22} />
                </div>
                <h4 className="font-serif text-lg text-bridal-charcoal group-hover:text-bridal-sage transition-colors">Bespoke</h4>
                <p className="font-sans text-[10px] uppercase tracking-widest text-bridal-charcoal/50">
                    Tailored To Your Soul
                </p>
            </div>

        </div>

      </div>

      {/* --- DECORATION: Straightened Leaves --- */}
      
      {/* Top Left: Removed 'rotate-180'. It now hangs/stands naturally. */}
      <div className="intro-leaf absolute -top-20 -left-20 z-0 h-[400px] w-[500px] opacity-15 pointer-events-none">
         <Image src="/leaves.webp" alt="Leaf Accent" fill className="object-contain blur-[3px]" />
      </div>

      {/* Bottom Right: Removed '-rotate-45'. Now perfectly upright. */}
      <div className="intro-leaf absolute -bottom-10 -right-10 z-0 h-[200px] w-[200px] opacity-30 pointer-events-none">
         <Image src="/leaves.webp" alt="Leaf Accent" fill className="object-contain blur-[1px]" />
      </div>

    </section>
  );
}