/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/global/PageHero";
import { PenTool, Heart, Star } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. "Floating Gallery" Parallax (Desktop Only)
    if (window.innerWidth > 768) {
      gsap.utils.toArray<HTMLElement>(".float-img").forEach((img, i) => {
        const speed = i % 2 === 0 ? -20 : 20; 
        gsap.to(img, {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }

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

    // 3. THE SKETCH LINE
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

      {/* 2. THE FOUNDER */}
      <section className="relative py-20 md:py-32 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text Block */}
            <div className="lg:col-span-7 relative z-10 order-2 lg:order-1">
               <span className="reveal-text font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block">
                  Est. 2024
               </span>
               <h2 className="reveal-text font-serif text-4xl md:text-7xl mb-8 leading-[1.1] md:leading-[0.9] drop-shadow-sm">
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

            {/* Image Block */}
            <div className="lg:col-span-5 relative h-[500px] md:h-[600px] w-full lg:translate-y-20 order-1 lg:order-2">
               <div className="float-img absolute inset-0 rounded-full overflow-hidden border border-bridal-charcoal/5 shadow-2xl">
                  <Image src="/couture.webp" alt="The Founder" fill className="object-cover" />
               </div>
               {/* Floating Element */}
               <div className="float-img absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-36 h-36 md:w-48 md:h-48 bg-white p-4 shadow-xl rotate-0 border border-bridal-charcoal/5">
                  <div className="relative w-full h-full">
                     <Image src="/er.jpg" alt="Sketch" fill className="object-cover p-1" />
                  </div>
               </div>
            </div>

         </div>
      </section>

      {/* 3. THE SKETCHBOOK (Mobile Stack / Desktop Scatter) */}
      <section className="sketch-section relative py-20 md:py-40 bg-[#fdfdfd]">
         {/* Paper Texture */}
         <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

         <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
               <path 
                 className="sketch-line"
                 d="M-100 100 C 200 200, 400 0, 600 200 S 1000 600, 1440 300" 
                 stroke="#2C2C2C" 
                 strokeWidth="1.5" 
                 fill="none" 
                 strokeOpacity="0.15"
                 strokeDasharray="4 4" 
               />
            </svg>
         </div>

         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16 md:mb-24">
               <div className="ink-blot mx-auto w-12 h-12 mb-6 text-bridal-charcoal opacity-80">
                  <PenTool size={48} />
               </div>
               <h2 className="reveal-text font-serif text-3xl md:text-5xl">From Concept to Canvas</h2>
            </div>

            {/* RESPONSIVE SCATTER GRID */}
            <div className="relative h-auto md:h-[800px] w-full flex flex-col md:block gap-12 items-center">
               
               {/* Item 1 */}
               <div className="float-img relative md:absolute md:top-0 md:left-20 w-full max-w-sm md:w-80 aspect-[3/4] bg-white p-3 shadow-lg rotate-0 border border-bridal-charcoal/5">
                  <div className="relative w-full h-full bg-bridal-charcoal/5">
                     <Image src="/flower.webp" alt="Moodboard 1" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <p className="font-serif text-xl mt-4 text-center italic text-bridal-charcoal/60">Inspiration</p>
               </div>

               {/* Item 2 */}
               <div className="float-img relative md:absolute md:top-40 md:right-20 w-full max-w-sm md:w-96 aspect-square bg-white p-3 shadow-xl z-10 border border-bridal-charcoal/5">
                  <div className="relative w-full h-full bg-bridal-charcoal/5">
                     <Image src="/makeup.jpg" alt="Moodboard 2" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <p className="font-serif text-xl mt-4 text-center italic text-bridal-charcoal/60">Texture</p>
               </div>

               {/* Item 3 */}
               <div className="float-img relative md:absolute md:bottom-20 md:left-[30%] w-full max-w-sm md:w-72 aspect-[4/5] bg-white p-3 shadow-lg border border-bridal-charcoal/5">
                  <div className="relative w-full h-full bg-bridal-charcoal/5">
                     <Image src="/floral.webp" alt="Moodboard 3" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <p className="font-serif text-xl mt-4 text-center italic text-bridal-charcoal/60">Detail</p>
               </div>

            </div>
         </div>
      </section>

      {/* 4. VALUES */}
      <section className="py-20 md:py-32 px-6 max-w-4xl mx-auto text-center">
         <h2 className="reveal-text font-serif text-3xl md:text-4xl mb-12 md:mb-16">Our Core Values</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
                { Icon: Heart, title: "Intention", text: "Every detail serves a purpose." },
                { Icon: Star, title: "Quality", text: "Uncompromising material standards." },
                { Icon: PenTool, title: "Artistry", text: "Fashion as a form of expression." }
            ].map((item, idx) => (
                <div key={idx} className="reveal-text flex flex-col items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full border border-bridal-charcoal/20 flex items-center justify-center text-bridal-sage group-hover:bg-bridal-sage group-hover:text-white transition-all duration-500">
                        <item.Icon size={20} />
                    </div>
                    <h3 className="font-serif text-xl group-hover:text-bridal-sage transition-colors">{item.title}</h3>
                    <p className="font-sans text-sm text-bridal-charcoal/60">{item.text}</p>
                </div>
            ))}
         </div>
      </section>

      {/* 5. FOOTER CTA */}
      <div className="text-center py-24 bg-bridal-charcoal text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
         
         <h2 className="font-serif text-4xl text-white mb-6 relative z-10">Create With Us</h2>
         <p className="font-sans text-sm text-white/50 mb-10 max-w-md mx-auto relative z-10 px-6">
            Let's write the next chapter of our story together.
         </p>
         <Link href="/contact" className="relative z-10 inline-block px-10 py-4 border border-white/30 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-bridal-charcoal transition-all duration-500">
            Start Your Journey
         </Link>
      </div>

    </main>
  );
}