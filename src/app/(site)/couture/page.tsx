/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/global/PageHero";
import { Scissors, Ruler, PenTool, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROCESS_STEPS = [
  { id: 1, title: "The Consultation", icon: <PenTool size={20} />, desc: "We begin with a blank page. Sketches, fabric swatches, and your vision." },
  { id: 2, title: "The Toile", icon: <Ruler size={20} />, desc: "A mock-up gown is built in cotton muslin to perfect the fit before cutting real fabric." },
  { id: 3, title: "The Construction", icon: <Scissors size={20} />, desc: "Hand-cutting silk, structural boning, and the initial assembly of your gown." },
  { id: 4, title: "The Embellishment", icon: <Sparkles size={20} />, desc: "Lace placement, hand-beading, and the final finishing touches." },
];

export default function CouturePage() {
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

    // 3. THE COUTURE THREAD (Rope Animation)
    // Connecting the process steps
    gsap.fromTo(".thread-line", 
      { strokeDasharray: 2000, strokeDashoffset: 2000 },
      {
        strokeDashoffset: 0,
        duration: 4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".process-section",
          start: "top 60%",
        }
      }
    );

    // 4. Leaf Float
    gsap.to(".couture-leaf", {
        y: 20,
        rotation: 5,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

  }, { scope: container });

  return (
    <main ref={container} className="bg-bridal-ivory min-h-screen pb-0">
      
      {/* 1. HERO */}
      <PageHero 
        title="The Couture Atelier" 
        subtitle="Artistry in Motion" 
        image="/ch.webp" 
      />

      {/* 2. PHILOSOPHY INTRO */}
      <section className="py-32 px-6 max-w-5xl mx-auto text-center relative">
         {/* Leaf Decoration Top Left */}
         <div className="couture-leaf absolute -top-20 -left-32 w-100 h-100 opacity-30 pointer-events-none">
            <Image src="/leaves.webp" alt="Leaf" fill className="object-contain blur-[3px]" />
         </div>

         <span className="reveal-text font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-8 block">
            Our Philosophy
         </span>
         <h2 className="reveal-text font-serif text-3xl md:text-5xl text-bridal-charcoal leading-relaxed">
            "We curate a personal transformation. Every fabric, every cut, and every fitting is a deliberate step towards your most authentic self."
         </h2>
      </section>

      {/* 3. SECTION: BESPOKE DESIGN (Sticky Layout) */}
      <section className="relative px-6 md:px-12 max-w-7xl mx-auto mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
           
           {/* Sticky Image Side */}
           <div className="md:sticky md:top-32 h-[80vh] w-full rounded-4xl overflow-hidden shadow-2xl shadow-bridal-charcoal/10">
              <Image 
                src="/art.webp" 
                alt="Sketching" 
                fill 
                className="parallax-img object-cover scale-110" 
              />
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-xl border-l-4 border-bridal-sage">
                 <p className="font-serif text-2xl text-bridal-charcoal">Bespoke Design</p>
                 <p className="font-sans text-xs uppercase tracking-widest text-bridal-charcoal/50">From Sketch to Stitch</p>
              </div>
           </div>

           {/* Content Side */}
           <div className="flex flex-col justify-center py-12 md:py-32">
              <h3 className="reveal-text font-serif text-5xl md:text-6xl text-bridal-charcoal mb-8">
                 The Art of <br/><span className="italic text-bridal-gold/90">Creation</span>
              </h3>
              <p className="reveal-text font-sans text-base leading-loose text-bridal-charcoal/70 mb-12">
                 The pinnacle of our atelier. We start with a blank page and your dreams. Over a series of private consultations, we sketch, drape, and construct a one-of-a-kind gown that exists only for you.
              </p>
              
              <div className="reveal-text space-y-8">
                 <div className="flex gap-6 items-start">
                    <span className="font-serif text-4xl text-bridal-sage/40">01</span>
                    <div>
                       <h4 className="font-serif text-xl text-bridal-charcoal mb-2">Personalized Sketches</h4>
                       <p className="font-sans text-sm text-bridal-charcoal/60">Hand-drawn illustrations to visualize your silhouette.</p>
                    </div>
                 </div>
                 <div className="flex gap-6 items-start">
                    <span className="font-serif text-4xl text-bridal-sage/40">02</span>
                    <div>
                       <h4 className="font-serif text-xl text-bridal-charcoal mb-2">Fabric Sourcing</h4>
                       <p className="font-sans text-sm text-bridal-charcoal/60">Silks from Italy, Lace from France, curated for you.</p>
                    </div>
                 </div>
                 <div className="flex gap-6 items-start">
                    <span className="font-serif text-4xl text-bridal-sage/40">03</span>
                    <div>
                       <h4 className="font-serif text-xl text-bridal-charcoal mb-2">Muslin Fittings</h4>
                       <p className="font-sans text-sm text-bridal-charcoal/60">A prototype dress to perfect the fit before cutting fabric.</p>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </section>

      {/* 4. SECTION: RESTORATION (Cinematic Full Width) */}
      <section className="relative w-full py-32 bg-bridal-charcoal text-white overflow-hidden mb-40">
         {/* Background Texture */}
         <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
         
         <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
               <span className="reveal-text font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block">
                  Heirloom Services
               </span>
               <h3 className="reveal-text font-serif text-5xl md:text-6xl mb-8">
                  Restoration & <span className="italic text-bridal-sage">Reimagining</span>
               </h3>
               <p className="reveal-text font-sans text-base leading-loose text-white/70 mb-10">
                  For the bride who wishes to wear a piece of history. We delicately restore and resize vintage gowns—whether it is your mother's dress or a vintage find—reimagining them for the modern era while preserving their original soul.
               </p>
               <ul className="reveal-text grid grid-cols-2 gap-4">
                  <li className="flex items-center gap-2 text-sm text-white/60"><span className="w-1.5 h-1.5 bg-bridal-sage rounded-full"/> Vintage Cleaning</li>
                  <li className="flex items-center gap-2 text-sm text-white/60"><span className="w-1.5 h-1.5 bg-bridal-sage rounded-full"/> Structural Repair</li>
                  <li className="flex items-center gap-2 text-sm text-white/60"><span className="w-1.5 h-1.5 bg-bridal-sage rounded-full"/> Modern Resizing</li>
                  <li className="flex items-center gap-2 text-sm text-white/60"><span className="w-1.5 h-1.5 bg-bridal-sage rounded-full"/> Lace Mending</li>
               </ul>
            </div>

            <div className="order-1 md:order-2 relative h-150 w-full">
               {/* Collage Effect */}
               <div className="absolute top-0 right-0 w-[80%] h-[90%] rounded-tl-[10rem] overflow-hidden border border-white/10">
                  <Image src="/bridal.jpg" alt="Vintage" fill className="object-cover" />
               </div>
               <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-tr-[5rem] overflow-hidden border-4 border-bridal-charcoal shadow-2xl">
                  <Image src="/flower.webp" alt="Detail" fill className="object-cover" />
               </div>
            </div>
         </div>
      </section>

      {/* 5. NEW SECTION: THE PROCESS (With Rope Animation) */}
      <section className="process-section relative py-32 px-6 overflow-hidden">
         {/* Leaf Decoration Right */}
         <div className="couture-leaf absolute top-10 right-0 w-125 h-125 opacity-20 pointer-events-none">
            <Image src="/leaves.webp" alt="Leaf" fill className="object-contain blur-xs -rotate-90" />
         </div>

         {/* --- THE ROPE SVG BACKGROUND --- */}
         <div className="absolute top-[30%] left-0 w-full h-[400px] pointer-events-none z-0 opacity-40">
            <svg className="w-full h-full" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="none">
               <path 
                 className="thread-line"
                 d="M0 200 C 300 100, 600 300, 900 200 S 1440 200, 1440 200" 
                 stroke="#D4AF37" 
                 strokeWidth="2" 
                 fill="none" 
                 strokeDasharray="10 10"
               />
            </svg>
         </div>

         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
               <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-4 block">The Journey</span>
               <h2 className="font-serif text-4xl text-bridal-charcoal">The 4 Steps to Perfection</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {PROCESS_STEPS.map((step) => (
                  <div key={step.id} className="reveal-text flex flex-col items-center text-center group">
                     <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-bridal-charcoal mb-6 group-hover:bg-bridal-sage group-hover:text-white transition-colors duration-500 relative z-10">
                        {step.icon}
                     </div>
                     <h3 className="font-serif text-xl text-bridal-charcoal mb-4">{step.title}</h3>
                     <p className="font-sans text-sm text-bridal-charcoal/60 leading-relaxed">
                        {step.desc}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. ALTERATIONS (Overlap Layout) */}
      <section className="py-20 px-6 max-w-7xl mx-auto mb-20">
         <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl shadow-bridal-charcoal/5 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3 relative h-[400px] rounded-2xl overflow-hidden">
               <Image src="/gown.jpg" alt="Alterations" fill className="object-cover" />
            </div>
            <div className="w-full md:w-2/3">
               <h3 className="font-serif text-3xl md:text-4xl text-bridal-charcoal mb-6">Expert Alterations</h3>
               <p className="font-sans text-base leading-loose text-bridal-charcoal/70 mb-8">
                  A gown is only as beautiful as its fit. Even if you didn't buy your dress with us, we offer expert alteration services. We apply the same couture techniques—boning adjustment, lace matching, and structural re-engineering—to ensure the garment molds perfectly to your body.
               </p>
               <Link href="/contact" className="text-xs uppercase tracking-widest text-bridal-sage border-b border-bridal-sage pb-1 hover:text-bridal-charcoal hover:border-bridal-charcoal transition-all">
                  Book an Alteration Fit
               </Link>
            </div>
         </div>
      </section>

      {/* 7. FOOTER CTA */}
      <div className="text-center py-24 bg-bridal-charcoal text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
         <h2 className="font-serif text-4xl mb-6 relative z-10">Your Dream Dress Awaits</h2>
         <p className="font-sans text-sm text-white/60 mb-10 max-w-md mx-auto relative z-10">
            From custom designs to expert tailoring, we are here to make you look breathtaking.
         </p>
         <Link href="/contact" className="relative z-10 inline-block px-10 py-4 border border-white/30 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-bridal-charcoal transition-all duration-500">
            Book Consultation
         </Link>
      </div>

    </main>
  );
}