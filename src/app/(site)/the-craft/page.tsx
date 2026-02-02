/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/global/PageHero";
import { Scissors, Ruler, Fingerprint, Gem, Search } from "lucide-react"; // Added Search

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CRAFT_METRICS = [
  { id: 1, value: "300+", label: "Hours per Gown", icon: <Scissors size={24} /> },
  { id: 2, value: "25", label: "Measurements", icon: <Ruler size={24} /> },
  { id: 3, value: "100%", label: "Natural Fibers", icon: <Gem size={24} /> },
  { id: 4, value: "1/1", label: "Unique Pattern", icon: <Fingerprint size={24} /> },
];

const MATERIALS = [
  {
    id: "silk",
    name: "Mulberry Silk",
    origin: "Como, Italy",
    desc: "100% organic silk habotai lining. Breathable, hypoallergenic, and feels like second skin.",
    image: "/mulberry.webp"
  },
  {
    id: "lace",
    name: "Chantilly Lace",
    origin: "Calais, France",
    desc: "Woven on 19th-century Leavers looms. Delicate, intricate, and impossibly soft.",
    image: "/chan.webp" 
  },
  {
    id: "beads",
    name: "Glass Beads",
    origin: "Kyoto, Japan",
    desc: "Precision-cut glass beads that catch light without looking heavy or costume-like.",
    image: "/bead.webp"
  },
  {
    id: "tulle",
    name: "Illusion Tulle",
    origin: "Somerset, UK",
    desc: "Ultra-fine mesh that disappears against the skin, creating the signature 'floating' lace effect.",
    image: "/illusion.webp" 
  }
];

export default function CraftPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Parallax Images
    gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((img) => {
      gsap.to(img, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // 2. Text Reveals
    gsap.utils.toArray<HTMLElement>(".reveal-text").forEach((text) => {
      gsap.from(text, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
        }
      });
    });

    // 3. THE STITCHING THREAD (Rope Animation)
    gsap.fromTo(".stitch-thread-line", 
      { strokeDasharray: 2500, strokeDashoffset: 2500 },
      {
        strokeDashoffset: 0,
        duration: 5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".craft-section",
          start: "top 60%",
        }
      }
    );

    // 4. Leaf Float
    gsap.to(".craft-leaf", {
        y: 20,
        rotation: 3,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // 5. HORIZONTAL SCROLL (Pinned)
    // Moves logic INSIDE the hook to fix the syntax error
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
        const materialSection = document.getElementById("material-section");
        const materialTrack = document.getElementById("material-track");
        
        if(materialSection && materialTrack) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: materialSection,
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (materialTrack.scrollWidth - window.innerWidth),
                    invalidateOnRefresh: true,
                }
            });
            tl.to(materialTrack, {
                x: -(materialTrack.scrollWidth - window.innerWidth),
                ease: "none",
            });
        }
    });

  }, { scope: container });

  return (
    <main ref={container} className="bg-bridal-ivory min-h-screen pb-0 text-bridal-charcoal">
      
      {/* 1. HERO */}
      <PageHero 
        title="The Invisible Art" 
        subtitle="Craftsmanship" 
        image="/knits.webp" 
      />

      {/* 2. PHILOSOPHY INTRO */}
      <section className="py-20 md:py-32 px-6 max-w-5xl mx-auto text-center relative">
         <div className="craft-leaf absolute -top-10 -left-10 md:-left-20 w-40 h-40 md:w-75 md:h-75 opacity-20 pointer-events-none">
            <Image src="/leaves.webp" alt="Leaf" fill className="object-contain blur-[2px]" />
         </div>

         <span className="reveal-text font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-8 block">
            Inside the Atelier
         </span>
         <h2 className="reveal-text font-serif text-3xl md:text-5xl leading-relaxed">
            "True luxury is defined by what you cannot see. It is the architectural boning hidden beneath silk, the hand-rolled hems, and the uncompromising quality of materials."
         </h2>
      </section>

      {/* 3. SECTION: MATERIAL INTEGRITY (Intro) */}
      <section className="relative px-6 md:px-12 max-w-7xl mx-auto mb-24 md:mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
           
           <div className="md:sticky md:top-32 h-[50vh] md:h-[80vh] w-full rounded-tl-[5rem] md:rounded-tl-[10rem] rounded-br-4xl md:rounded-br-[5rem] overflow-hidden shadow-2xl shadow-bridal-charcoal/10 border border-bridal-charcoal/5 relative">
              <Image 
                src="/flower.webp" 
                alt="Fabric Detail" 
                fill 
                className="parallax-img object-cover scale-110" 
              />
              <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/90 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-full border border-bridal-sage/30 shadow-lg">
                 <p className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-bridal-charcoal">Sourced in Italy & France</p>
              </div>
           </div>

           <div className="flex flex-col justify-center py-0 md:py-32">
              <h3 className="reveal-text font-serif text-4xl md:text-6xl mb-8">
                 Material <br/><span className="italic text-bridal-gold/90">Integrity</span>
              </h3>
              <p className="reveal-text font-sans text-base leading-loose text-bridal-charcoal/70 mb-12">
                 We do not simply buy fabric; we commission art. Our silks are sourced from heritage mills in Como, Italy, and our lace is hand-loomed in Caudry, France. We believe that a gown must feel as exquisite against the skin as it looks to the eye.
              </p>
              
              <div className="reveal-text grid grid-cols-1 gap-6 md:gap-8">
                 <div className="flex gap-6 items-center p-6 bg-white rounded-2xl shadow-sm border border-bridal-charcoal/5">
                    <div className="w-12 h-12 rounded-full bg-bridal-sage/10 flex items-center justify-center text-bridal-sage shrink-0">
                        <Gem size={20} />
                    </div>
                    <div>
                       <h4 className="font-serif text-xl mb-1">Silk Mikado & Crepe</h4>
                       <p className="font-sans text-xs text-bridal-charcoal/50 uppercase tracking-widest">Structure & Flow</p>
                    </div>
                 </div>
                 <div className="flex gap-6 items-center p-6 bg-white rounded-2xl shadow-sm border border-bridal-charcoal/5">
                    <div className="w-12 h-12 rounded-full bg-bridal-sage/10 flex items-center justify-center text-bridal-sage shrink-0">
                        <Scissors size={20} />
                    </div>
                    <div>
                       <h4 className="font-serif text-xl mb-1">Chantilly & Guipure Lace</h4>
                       <p className="font-sans text-xs text-bridal-charcoal/50 uppercase tracking-widest">Texture & Depth</p>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </section>

      {/* 4. SECTION: THE ARCHITECTURE */}
      <section className="relative w-full py-20 md:py-32 bg-bridal-charcoal text-white overflow-hidden mb-24 md:mb-40">
         <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
         
         <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
            <div className="order-2 md:order-1">
               <span className="reveal-text font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block">
                  The Structure
               </span>
               <h3 className="reveal-text font-serif text-4xl md:text-6xl mb-8">
                  Internal <span className="italic text-bridal-sage">Architecture</span>
               </h3>
               <p className="reveal-text font-sans text-base leading-loose text-white/70 mb-10">
                  What makes a couture gown defy gravity? It is the internal corselette, the horsehair braid in the hem, and the strategic boning. We engineer the inside of the dress as meticulously as the outside, ensuring you feel supported and secure all day.
               </p>
               <div className="reveal-text p-6 border-l-2 border-bridal-sage bg-white/5">
                  <p className="font-serif text-lg md:text-xl italic text-white/90">
                     "A gown should not just hang on the body; it should sculpt it."
                  </p>
               </div>
            </div>

            <div className="order-1 md:order-2 relative h-100 md:h-150 w-full">
               <div className="absolute inset-0 rounded-4xl md:rounded-[3rem] overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000">
                  <Image src="/couture.webp" alt="Structure" fill className="object-cover" />
               </div>
               <div className="absolute -bottom-10 -left-10 w-50 h-50 bg-bridal-sage/20 blur-[50px] rounded-full pointer-events-none" />
            </div>
         </div>
      </section>

      {/* 5. METRICS & THREAD ANIMATION */}
      <section className="craft-section relative py-20 md:py-32 px-6 overflow-hidden bg-bridal-ivory">
         
         <div className="absolute top-[20%] left-0 w-full h-125 pointer-events-none z-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 1440 500" fill="none" preserveAspectRatio="none">
               <path 
                 className="stitch-thread-line"
                 d="M0 250 Q 100 100, 200 250 T 400 250 T 600 250 T 800 250 T 1000 250 T 1200 250 T 1440 250" 
                 stroke="#D4AF37" 
                 strokeWidth="2" 
                 fill="none" 
                 strokeDasharray="20 10"
               />
               <path 
                 className="stitch-thread-line"
                 d="M0 260 Q 100 110, 200 260 T 400 260 T 600 260 T 800 260 T 1000 260 T 1200 260 T 1440 260" 
                 stroke="#8A9A5B" 
                 strokeWidth="1" 
                 fill="none" 
                 strokeOpacity="0.5"
               />
            </svg>
         </div>

         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 md:mb-20">
               <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-4 block">By The Numbers</span>
               <h2 className="font-serif text-3xl md:text-4xl text-bridal-charcoal">The Dedication</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
               {CRAFT_METRICS.map((metric) => (
                  <div key={metric.id} className="reveal-text flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg shadow-bridal-charcoal/5 border border-bridal-charcoal/5 group hover:-translate-y-2 transition-transform duration-500">
                     <div className="text-bridal-sage mb-4 group-hover:scale-110 transition-transform duration-500">
                        {metric.icon}
                     </div>
                     <h3 className="font-serif text-4xl md:text-5xl text-bridal-charcoal mb-2">{metric.value}</h3>
                     <p className="font-sans text-xs uppercase tracking-widest text-bridal-charcoal/50">
                        {metric.label}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. HORIZONTAL SCROLL SECTION (DESKTOP) */}
      {/* Added proper ID 'material-section' wrapper to fix the pinning logic */}
      <section id="material-section" className="hidden md:flex h-screen w-full bg-bridal-charcoal text-white overflow-hidden items-center relative">
          <div className="absolute top-10 left-10 z-20">
              <h2 className="font-serif text-4xl">Material Library</h2>
              <p className="font-sans text-xs uppercase tracking-widest text-white/50 mt-2">Sourced Globally</p>
          </div>

          <div id="material-track" className="flex gap-20 px-20 h-[60vh] items-center w-max">
              <div className="min-w-100 pr-20">
                  <p className="font-serif text-3xl leading-relaxed text-white/80">
                      "The hand-feel of a fabric dictates the soul of the dress. We reject synthetics in favor of natural fibers that breathe."
                  </p>
              </div>

              {MATERIALS.map((mat, i) => (
                  <div key={i} className="relative min-w-87.5 h-125 group bg-white/5 border border-white/10 p-4 transition-colors hover:bg-white/10">
                      <div className="relative w-full h-[70%] mb-6 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                          <Image src={mat.image} alt={mat.name} fill className="object-cover" />
                          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                              <Search size={16} />
                          </div>
                      </div>
                      <h3 className="font-serif text-2xl mb-2">{mat.name}</h3>
                      <p className="font-sans text-[10px] uppercase tracking-widest text-bridal-sage mb-4">{mat.origin}</p>
                      <p className="font-sans text-sm text-white/60 leading-relaxed">{mat.desc}</p>
                      <span className="absolute -top-10 -left-10 font-serif text-[8rem] text-white/5 pointer-events-none select-none">0{i+1}</span>
                  </div>
              ))}
              
              <div className="min-w-50" /> 
          </div>
      </section>

      {/* 7. MOBILE MATERIALS LIST (Mobile Fallback) */}
      <section className="md:hidden py-20 px-6 bg-bridal-charcoal text-white">
          <h2 className="font-serif text-3xl mb-12">Material Library</h2>
          <div className="space-y-16">
            {MATERIALS.map((mat, i) => (
                 <div key={i} className="group">
                     <div className="relative w-full aspect-3/4 mb-6 overflow-hidden border border-white/10">
                         <Image src="/floral.webp" alt={mat.name} fill className="object-cover" />
                     </div>
                     <h3 className="font-serif text-2xl mb-2">{mat.name}</h3>
                     <p className="font-sans text-[10px] uppercase tracking-widest text-bridal-sage mb-4">{mat.origin}</p>
                     <p className="font-sans text-sm text-white/60 leading-relaxed">{mat.desc}</p>
                 </div>
             ))}
          </div>
      </section>

      {/* 8. FOOTER CTA */}
      <div className="text-center py-24 bg-bridal-charcoal text-white relative overflow-hidden border-t border-white/10">
         <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
         
         <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 relative z-10">Experience the Quality</h2>
         <p className="font-sans text-sm text-white/50 mb-10 max-w-md mx-auto relative z-10 px-6">
            Book a consultation to feel the fabrics and see the craftsmanship in person.
         </p>
         <Link href="/contact" className="relative z-10 inline-block px-10 py-4 bg-white text-bridal-charcoal rounded-full text-xs uppercase tracking-widest hover:bg-bridal-sage hover:text-white transition-all duration-500">
            Visit the Atelier
         </Link>
      </div>

    </main>
  );
}