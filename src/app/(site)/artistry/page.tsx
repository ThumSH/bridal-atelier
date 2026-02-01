/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/global/PageHero";
import { Sparkles, Palette, Clock, Sun } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TIMELINE_STEPS = [
  { id: 1, title: "Skin Prep", icon: <Sun size={20} />, desc: "6 Months Out. We analyze your skin and build a regiment to ensure a radiant canvas." },
  { id: 2, title: "The Design Trial", icon: <Palette size={20} />, desc: "3 Months Out. A 3-hour session to engineer your look, testing longevity and lighting." },
  { id: 3, title: "The Final Polish", icon: <Sparkles size={20} />, desc: "1 Week Out. Brows, hydration facials, and final timeline coordination." },
  { id: 4, title: "The Wedding Day", icon: <Clock size={20} />, desc: "The Event. We arrive early, set the mood, and ensure you walk out flawless." },
];

export default function ArtistryPage() {
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

    // 3. THE BEAUTY THREAD (Rope Animation)
    gsap.fromTo(".beauty-thread-line", 
      { strokeDasharray: 2000, strokeDashoffset: 2000 },
      {
        strokeDashoffset: 0,
        duration: 4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top 60%",
        }
      }
    );

    // 4. Leaf Float
    gsap.to(".artistry-leaf", {
        y: 20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

  }, { scope: container });

  return (
    <main ref={container} className="bg-bridal-charcoal min-h-screen pb-0 text-white">
      
      {/* 1. HERO */}
      <PageHero 
        title="Couture Beauty" 
        subtitle="The Finishing Touch" 
        image="/ti.webp" 
      />

      {/* 2. PHILOSOPHY INTRO */}
      <section className="py-20 md:py-32 px-6 max-w-5xl mx-auto text-center relative">
         <div className="artistry-leaf absolute -top-10 -right-10 md:-right-20 w-40 h-40 md:w-[400px] md:h-[400px] opacity-20 pointer-events-none">
            <Image src="/leaves.webp" alt="Leaf" fill className="object-contain blur-[3px] -rotate-45" />
         </div>

         <span className="reveal-text font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-8 block">
            The Philosophy
         </span>
         <h2 className="reveal-text font-serif text-3xl md:text-5xl leading-relaxed">
            "Your face is the most photographed element of your wedding. We do not just apply makeup; we engineer a look that withstands tears, time, and camera flashes."
         </h2>
      </section>

      {/* 3. SECTION: THE TRIAL (Fixed Mobile Layout) */}
      <section className="relative px-6 md:px-12 max-w-7xl mx-auto mb-24 md:mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
           
           {/* Sticky Image Side */}
           {/* FIX: h-[50vh] on mobile */}
           <div className="md:sticky md:top-32 h-[50vh] md:h-[80vh] w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/30 relative group">
              <Image 
                src="/makeup-3.png" 
                alt="The Trial" 
                fill 
                className="parallax-img object-cover scale-110" 
              />
              
              {/* Floating Card - Fixed Position */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto bg-black/60 backdrop-blur-md px-6 py-4 rounded-xl border-l-4 border-bridal-sage">
                 <p className="font-serif text-xl md:text-2xl text-white">The Design Trial</p>
                 <p className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-white/50">3 Hours • Full Consultation</p>
              </div>
           </div>

           {/* Content Side */}
           <div className="flex flex-col justify-center py-0 md:py-32">
              <h3 className="reveal-text font-serif text-4xl md:text-6xl text-white mb-8">
                 Engineering <br/><span className="italic text-bridal-sage">Radiance</span>
              </h3>
              <p className="reveal-text font-sans text-base leading-loose text-white/70 mb-12">
                 The trial is a collaborative design session. We analyze your face shape, undertones, and wedding lighting. We test different lash styles and pigment mixtures to ensure the look is unmistakably "you."
              </p>
              
              <div className="reveal-text space-y-12">
                 <div className="group border-l border-white/10 pl-8 hover:border-bridal-sage transition-colors duration-500">
                    <h4 className="font-serif text-xl md:text-2xl text-white mb-2">Skin Analysis</h4>
                    <p className="font-sans text-sm text-white/50">We assess texture and hydration levels to choose the perfect primer and foundation combination.</p>
                 </div>
                 <div className="group border-l border-white/10 pl-8 hover:border-bridal-sage transition-colors duration-500">
                    <h4 className="font-serif text-xl md:text-2xl text-white mb-2">Lighting Stress Test</h4>
                    <p className="font-sans text-sm text-white/50">We check how the makeup reads in daylight, candlelight, and flash photography.</p>
                 </div>
                 <div className="group border-l border-white/10 pl-8 hover:border-bridal-sage transition-colors duration-500">
                    <h4 className="font-serif text-xl md:text-2xl text-white mb-2">Longevity Wear Test</h4>
                    <p className="font-sans text-sm text-white/50">We provide a specific wear-test guide to see how the look holds up over 8 hours.</p>
                 </div>
              </div>
           </div>

        </div>
      </section>

      {/* 4. SECTION: THE MORNING */}
      <section className="relative w-full py-20 md:py-32 bg-bridal-ivory text-bridal-charcoal overflow-hidden mb-24 md:mb-40">
         <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply" />
         
         <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
            <div className="order-2 md:order-1">
               <span className="reveal-text font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block">
                  The Wedding Morning
               </span>
               <h3 className="reveal-text font-serif text-4xl md:text-6xl mb-8">
                  Calm & <span className="italic text-bridal-sage">Curated</span>
               </h3>
               <p className="reveal-text font-sans text-base leading-loose text-bridal-charcoal/70 mb-10">
                  On the big day, we bring the studio to you. We curate a calm, luxurious environment where you can relax. We manage the entire beauty timeline for you and your bridal party, ensuring everyone is ready with champagne in hand.
               </p>
               <ul className="reveal-text grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                  <li className="flex items-center gap-3 font-serif text-lg"><Clock size={18} className="text-bridal-sage"/> Timeline Management</li>
                  <li className="flex items-center gap-3 font-serif text-lg"><Sparkles size={18} className="text-bridal-sage"/> Luxury Skin Prep</li>
                  <li className="flex items-center gap-3 font-serif text-lg"><Palette size={18} className="text-bridal-sage"/> Touch-up Kit Included</li>
                  <li className="flex items-center gap-3 font-serif text-lg"><Sun size={18} className="text-bridal-sage"/> Body Glow Finishing</li>
               </ul>
            </div>

            <div className="order-1 md:order-2 relative h-[400px] md:h-150 w-full">
               <div className="absolute top-0 right-0 w-[85%] h-[90%] rounded-tl-[5rem] md:rounded-tl-[10rem] overflow-hidden shadow-2xl shadow-bridal-charcoal/10">
                  <Image src="/floral-2.jpg" alt="Wedding Morning" fill className="object-cover" />
               </div>
               <div className="absolute bottom-0 md:bottom-12 left-0 w-[45%] h-[40%] rounded-tr-[2rem] md:rounded-tr-[4rem] overflow-hidden border-4 border-white shadow-xl">
                  <Image src="/floral.webp" alt="Detail" fill className="object-cover" />
               </div>
            </div>
         </div>
      </section>

      {/* 5. TIMELINE SECTION */}
      <section className="timeline-section relative py-20 md:py-32 px-6 overflow-hidden">
         <div className="artistry-leaf absolute top-10 left-0 w-60 h-60 md:w-125 md:h-125 opacity-10 pointer-events-none">
            <Image src="/leaves.webp" alt="Leaf" fill className="object-contain blur-xs rotate-90" />
         </div>

         <div className="absolute top-[30%] left-0 w-full h-[400px] pointer-events-none z-0 opacity-40">
            <svg className="w-full h-full" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="none">
               <path 
                 className="beauty-thread-line"
                 d="M0 200 C 400 300, 800 100, 1440 200" 
                 stroke="#D4AF37" 
                 strokeWidth="2" 
                 fill="none" 
                 strokeDasharray="10 10"
               />
            </svg>
         </div>

         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 md:mb-20">
               <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-4 block">The Journey</span>
               <h2 className="font-serif text-3xl md:text-4xl text-white">The Beauty Timeline</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
               {TIMELINE_STEPS.map((step) => (
                  <div key={step.id} className="reveal-text flex flex-col items-center text-center group">
                     <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6 group-hover:bg-bridal-sage group-hover:border-bridal-sage transition-colors duration-500 relative z-10">
                        {step.icon}
                     </div>
                     <h3 className="font-serif text-xl text-white mb-4">{step.title}</h3>
                     <p className="font-sans text-sm text-white/60 leading-relaxed max-w-xs">
                        {step.desc}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. DRAPING */}
      <section className="py-20 px-6 max-w-7xl mx-auto mb-20">
         <div className="bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3 relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
               <Image src="/flower.webp" alt="Draping" fill className="object-cover" />
            </div>
            <div className="w-full md:w-2/3">
               <h3 className="font-serif text-3xl md:text-4xl text-white mb-6">The Final Polish</h3>
               <p className="font-sans text-base leading-loose text-white/70 mb-8">
                  Our service extends beyond makeup. We are experts in saree draping, veil setting, and jewelry placement. We stay until you are fully dressed to ensure every pleat is precise, every pin is invisible, and you walk down the aisle with total confidence.
               </p>
               <Link href="/contact" className="text-xs uppercase tracking-widest text-bridal-sage border-b border-bridal-sage pb-1 hover:text-white hover:border-white transition-all">
                  View Styling Portfolio
               </Link>
            </div>
         </div>
      </section>

      {/* 7. FOOTER CTA */}
      <div className="text-center py-24 border-t border-white/10 relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
         
         <Sparkles className="mx-auto text-bridal-sage mb-6 animate-pulse" size={32} />
         <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 relative z-10">Secure Your Date</h2>
         <p className="font-sans text-sm text-white/50 mb-10 max-w-md mx-auto relative z-10 px-6">
            We only accept one bridal booking per day to ensure you have our undivided attention.
         </p>
         <Link href="/contact" className="relative z-10 inline-block px-10 py-4 bg-white text-bridal-charcoal rounded-full text-xs uppercase tracking-widest hover:bg-bridal-sage hover:text-white transition-all duration-500">
            Inquire Availability
         </Link>
      </div>

    </main>
  );
}