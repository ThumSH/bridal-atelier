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
import { PenTool, Heart, Star } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. "Floating Gallery" Parallax (Images moving at different speeds)
    gsap.utils.toArray<HTMLElement>(".float-img").forEach((img, i) => {
      const speed = i % 2 === 0 ? 50 : 150; // Alternating speeds
      gsap.to(img, {
        y: -speed,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // 2. Text Fade-Ins
    gsap.utils.toArray<HTMLElement>(".reveal-text").forEach((text) => {
      gsap.from(text, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
        }
      });
    });

    // 3. THE SKETCH LINE (Rough Pencil Animation)
    gsap.fromTo(".sketch-line", 
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".sketch-section",
          start: "top 60%",
        }
      }
    );

    // 4. Ink Blot Reveal
    gsap.from(".ink-blot", {
       scale: 0,
       opacity: 0,
       duration: 1.5,
       ease: "elastic.out(1, 0.5)",
       scrollTrigger: {
          trigger: ".sketch-section",
          start: "top 70%",
       }
    });

  }, { scope: container });

  return (
    <main ref={container} className="bg-bridal-ivory min-h-screen pb-0 text-bridal-charcoal overflow-hidden">
      
      {/* 1. HERO */}
      <PageHero 
        title="The Visionary" 
        subtitle="Behind The Brand" 
        image="/ab.webp" 
      />

      {/* 2. THE FOUNDER (Asymmetrical Split) */}
      <section className="relative py-32 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text Block (Wide) */}
            <div className="lg:col-span-7 relative z-10">
               <span className="reveal-text font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block">
                  Est. 2024
               </span>
               <h2 className="reveal-text font-serif text-5xl md:text-7xl mb-8 leading-[0.9]">
                  "Fashion fades,<br/> only <span className="italic text-bridal-gold/90">style</span> remains."
               </h2>
               <div className="reveal-text w-24 h-1 bg-bridal-charcoal/10 mb-8" />
               <p className="reveal-text font-sans text-base leading-loose text-bridal-charcoal/70 mb-8 max-w-xl">
                  Founded in the heart of the city, our atelier was born from a rebellion against fast fashion. 
                  We believe in the slow, deliberate art of couture—where a dress is not manufactured, but sculpted.
               </p>
               <p className="reveal-text font-sans text-base leading-loose text-bridal-charcoal/70 max-w-xl">
                  Led by a passion for architectural silhouettes and romantic detailing, we have created a sanctuary 
                  where modern brides can find their unique voice through fabric.
               </p>
               
               {/* Signature */}
               <div className="reveal-text mt-12 opacity-60">
                   <svg width="200" height="60" viewBox="0 0 200 60" fill="none" stroke="currentColor" className="text-bridal-charcoal">
                      <path d="M10,40 Q30,10 50,40 T100,30 T150,50 T190,20" strokeWidth="2" strokeLinecap="round" />
                   </svg>
                   <p className="font-sans text-[10px] uppercase tracking-widest mt-2">Founder & Creative Director</p>
               </div>
            </div>

            {/* Image Block (Narrow & Tall) - Parallax */}
            <div className="lg:col-span-5 relative h-[600px] w-full lg:translate-y-20">
               <div className="float-img absolute inset-0 rounded-full overflow-hidden border border-bridal-charcoal/5 shadow-2xl">
                  <Image src="/couture.webp" alt="The Founder" fill className="object-cover" />
               </div>
               {/* Floating Element */}
               <div className="float-img absolute -bottom-10 -left-10 w-48 h-48 bg-white p-4 shadow-xl rotate-3">
                  <div className="relative w-full h-full border border-bridal-charcoal/10">
                     <Image src="/er.jpg" alt="Sketch" fill className="object-cover p-2" />
                  </div>
               </div>
            </div>

         </div>
      </section>

      {/* 3. THE SKETCHBOOK (Raw/Artistic Layout) */}
      <section className="sketch-section relative py-40 bg-[#fdfdfd]">
         {/* Background Texture (Paper) */}
         <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

         {/* --- THE PENCIL SKETCH SVG --- */}
         {/* A rough, jagged line connecting the elements */}
         <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
               <path 
                 className="sketch-line"
                 d="M-100 100 C 200 200, 400 0, 600 200 S 1000 600, 1440 300" 
                 stroke="#2C2C2C" 
                 strokeWidth="1" 
                 fill="none" 
                 strokeOpacity="0.1"
                 // This makes it look like a pencil stroke
                 strokeDasharray="4 2" 
               />
            </svg>
         </div>

         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-24">
               <div className="ink-blot mx-auto w-12 h-12 mb-6 text-bridal-charcoal opacity-80">
                  <PenTool size={48} />
               </div>
               <h2 className="reveal-text font-serif text-4xl md:text-5xl">From Concept to Canvas</h2>
            </div>

            {/* Scatter Grid */}
            <div className="relative h-[800px] w-full">
               
               {/* Item 1: Top Left */}
               <div className="float-img absolute top-0 left-0 md:left-20 w-64 md:w-80 aspect-[3/4] bg-white p-3 shadow-lg rotate-[-4deg]">
                  <div className="relative w-full h-full bg-bridal-charcoal/5">
                     <Image src="/flower.webp" alt="Moodboard 1" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <p className="font-serif text-xl mt-4 text-center italic text-bridal-charcoal/60">Inspiration</p>
               </div>

               {/* Item 2: Center Right */}
               <div className="float-img absolute top-40 right-0 md:right-20 w-72 md:w-96 aspect-square bg-white p-3 shadow-xl rotate-[2deg] z-10">
                  <div className="relative w-full h-full bg-bridal-charcoal/5">
                     <Image src="/makeup.jpg" alt="Moodboard 2" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <p className="font-serif text-xl mt-4 text-center italic text-bridal-charcoal/60">Texture</p>
               </div>

               {/* Item 3: Bottom Left */}
               <div className="float-img absolute bottom-20 left-10 md:left-[30%] w-56 md:w-72 aspect-[4/5] bg-white p-3 shadow-lg rotate-[-2deg]">
                  <div className="relative w-full h-full bg-bridal-charcoal/5">
                     <Image src="/floral.webp" alt="Moodboard 3" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <p className="font-serif text-xl mt-4 text-center italic text-bridal-charcoal/60">Detail</p>
               </div>

            </div>
         </div>
      </section>

      {/* 4. VALUES (Minimal List) */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center">
         <h2 className="reveal-text font-serif text-3xl md:text-4xl mb-16">Our Core Values</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="reveal-text flex flex-col items-center gap-4">
               <div className="w-12 h-12 rounded-full border border-bridal-charcoal/20 flex items-center justify-center text-bridal-sage">
                  <Heart size={20} />
               </div>
               <h3 className="font-serif text-xl">Intention</h3>
               <p className="font-sans text-sm text-bridal-charcoal/60">Every detail serves a purpose.</p>
            </div>
            <div className="reveal-text flex flex-col items-center gap-4">
               <div className="w-12 h-12 rounded-full border border-bridal-charcoal/20 flex items-center justify-center text-bridal-sage">
                  <Star size={20} />
               </div>
               <h3 className="font-serif text-xl">Quality</h3>
               <p className="font-sans text-sm text-bridal-charcoal/60">Uncompromising material standards.</p>
            </div>
            <div className="reveal-text flex flex-col items-center gap-4">
               <div className="w-12 h-12 rounded-full border border-bridal-charcoal/20 flex items-center justify-center text-bridal-sage">
                  <PenTool size={20} />
               </div>
               <h3 className="font-serif text-xl">Artistry</h3>
               <p className="font-sans text-sm text-bridal-charcoal/60">Fashion as a form of expression.</p>
            </div>
         </div>
      </section>

      {/* 5. FOOTER CTA */}
      <div className="text-center py-24 bg-bridal-charcoal text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
         
         <h2 className="font-serif text-4xl text-white mb-6 relative z-10">Create With Us</h2>
         <p className="font-sans text-sm text-white/50 mb-10 max-w-md mx-auto relative z-10">
            Let's write the next chapter of our story together.
         </p>
         <Link href="/contact" className="relative z-10 inline-block px-10 py-4 border border-white/30 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-bridal-charcoal transition-all duration-500">
            Start Your Journey
         </Link>
      </div>

    </main>
  );
}