/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/global/PageHero";
import { Quote, Heart, Star, PenTool, Users } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TIMELINE = [
  { year: "2018", title: "The Inception", desc: "Founded in a small studio in Galle, born from a desire to bring slow fashion back to bridal." },
  { year: "2020", title: "The First Collection", desc: "Debuted 'Ethereal' at Colombo Fashion Week, introducing our signature corset construction." },
  { year: "2022", title: "Global Expansion", desc: "Opened our flagship atelier and began serving brides across Europe and Australia." },
  { year: "2025", title: "The New Era", desc: "Launching the 'Maison' line, focusing exclusively on bespoke, hand-embroidered haute couture." },
];

const VALUES = [
    { title: "Intention", desc: "Every stitch has a purpose. We refuse to rush art.", icon: <Heart size={20}/> },
    { title: "Quality", desc: "Sourcing only the finest silks from Como and lace from Calais.", icon: <Star size={20}/> },
    { title: "Legacy", desc: "Creating heirlooms that will be passed down for generations.", icon: <Users size={20}/> }
];

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Founder Image Parallax
    gsap.to(".founder-img", {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".founder-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // 2. Text Reveals
    gsap.utils.toArray<HTMLElement>(".reveal-text").forEach((text) => {
      gsap.from(text, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
        }
      });
    });

    // 3. Horizontal Timeline Scroll
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
        const timelineTrack = document.querySelector(".timeline-track");
        const timelineSection = document.querySelector(".timeline-section");
        
        if (timelineTrack && timelineSection) {
            const scrollAmount = timelineTrack.scrollWidth - window.innerWidth;
            
            gsap.to(timelineTrack, {
                x: -scrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: timelineSection,
                    pin: true,
                    scrub: 1,
                    end: () => `+=${scrollAmount}`,
                }
            });
        }
    });

    // 4. RESTORED: Sketchbook Floating Images (Parallax)
    if (window.innerWidth > 768) {
      gsap.utils.toArray<HTMLElement>(".float-img").forEach((img, i) => {
        const speed = i % 2 === 0 ? -30 : 30; 
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

    // 5. RESTORED: Sketch Line Animation
    const sketchPath = document.querySelector(".sketch-line") as SVGPathElement;
    if(sketchPath) {
        const length = sketchPath.getTotalLength();
        gsap.set(sketchPath, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(sketchPath, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".sketch-section",
            start: "top 60%",
          }
        });
    }

    // 6. Signature Animation
    const sigPath = document.querySelector(".signature-path") as SVGPathElement;
    if(sigPath){
        const length = sigPath.getTotalLength();
        gsap.set(sigPath, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(sigPath, {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".signature-container",
                start: "top 80%",
            }
        });
    }

  }, { scope: container });

  return (
    <main ref={container} className="bg-bridal-ivory min-h-screen pb-0 text-bridal-charcoal">
      
      {/* 1. HERO */}
      <PageHero 
        title="The Soul of the House" 
        subtitle="Our Heritage" 
        image="/ab.webp" 
      />

      {/* 2. THE FOUNDER (Split Layout) */}
      <section className="founder-section relative py-20 md:py-32 px-6 max-w-480 mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            
            {/* Image Side */}
            <div className="relative h-150 md:h-200 w-full overflow-hidden">
               <div className="absolute inset-0 md:inset-x-12 md:inset-y-0 bg-bridal-charcoal/5 rounded-t-full">
                   <Image 
                     src="/couture.webp" 
                     alt="The Founder" 
                     fill 
                     className="founder-img object-cover scale-110 grayscale hover:grayscale-0 transition-all duration-1000" 
                   />
               </div>
               
               {/* Floating Quote Card */}
               <div className="absolute bottom-12 right-6 md:right-24 bg-white/90 backdrop-blur-md p-8 max-w-sm shadow-xl border-l-4 border-bridal-sage">
                   <Quote className="text-bridal-sage mb-4" size={24} />
                   <p className="font-serif text-xl italic text-bridal-charcoal leading-relaxed">
                       "Fashion fades, but style is eternal. We do not just make dresses; we craft memories."
                   </p>
               </div>
            </div>

            {/* Text Side */}
            <div className="lg:pr-24">
               <span className="reveal-text font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-8 block">
                  Est. 2024
               </span>
               <h2 className="reveal-text font-serif text-4xl md:text-6xl mb-8 leading-tight">
                  A Rebellion Against <br/><span className="italic text-bridal-gold/90">Fast Fashion</span>
               </h2>
               <div className="reveal-text w-24 h-1 bg-bridal-charcoal/10 mb-10" />
               
               <div className="space-y-6 text-bridal-charcoal/70 font-sans text-base leading-loose reveal-text">
                   <p>
                       Founded in the heart of the city, Bonitha & Co. was born from a desire to return to the roots of dressmaking. In an era of mass production, we chose the path of resistance: slow, deliberate, and hand-crafted.
                   </p>
                   <p>
                       Led by a passion for architectural silhouettes and romantic detailing, we have created a sanctuary where modern brides can find their unique voice through fabric. Every gown that leaves our atelier is a dialogue between the designer's hand and the bride's heart.
                   </p>
               </div>

               {/* Signature */}
               <div className="signature-container mt-12 opacity-80">
                   <svg width="250" height="80" viewBox="0 0 250 80" fill="none" stroke="currentColor" className="text-bridal-charcoal">
                      <path 
                        className="signature-path"
                        d="M10,50 Q40,10 70,50 T130,40 T190,60 T240,30" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                      />
                   </svg>
                   <p className="font-sans text-[10px] uppercase tracking-widest mt-2 ml-4">Founder & Creative Director</p>
               </div>
            </div>

         </div>
      </section>

      {/* 3. RESTORED: THE SKETCHBOOK SECTION (From Concept to Canvas) */}
      <section className="sketch-section relative py-20 md:py-40 bg-[#fdfdfd] overflow-hidden">
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
               <div className="mx-auto w-12 h-12 mb-6 text-bridal-sage flex items-center justify-center border border-bridal-sage/20 rounded-full">
                  <PenTool size={24} />
               </div>
               <h2 className="reveal-text font-serif text-3xl md:text-5xl">From Concept to Canvas</h2>
            </div>

            {/* RESPONSIVE SCATTER GRID */}
            <div className="relative h-auto md:h-200 w-full flex flex-col md:block gap-12 items-center">
               
               {/* Item 1 */}
               <div className="float-img relative md:absolute md:top-0 md:left-20 w-full max-w-sm md:w-80 aspect-3/4 bg-white p-3 shadow-lg rotate-0 border border-bridal-charcoal/5">
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
               <div className="float-img relative md:absolute md:bottom-20 md:left-[30%] w-full max-w-sm md:w-72 aspect-4/5 bg-white p-3 shadow-lg border border-bridal-charcoal/5">
                  <div className="relative w-full h-full bg-bridal-charcoal/5">
                     <Image src="/floral.webp" alt="Moodboard 3" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <p className="font-serif text-xl mt-4 text-center italic text-bridal-charcoal/60">Detail</p>
               </div>

            </div>
         </div>
      </section>

      {/* 4. THE TIMELINE (Horizontal Scroll) */}
      <section className="timeline-section relative h-screen bg-bridal-charcoal text-white overflow-hidden flex flex-col justify-center">
         <div className="absolute top-12 left-6 md:left-12 z-20">
             <h2 className="font-serif text-4xl md:text-5xl">The Journey</h2>
             <p className="font-sans text-xs uppercase tracking-widest text-white/50 mt-2">A Legacy in the Making</p>
         </div>

         {/* The Track */}
         <div className="timeline-track flex items-center gap-0 w-max h-full px-6 md:px-20 pt-20">
             
             {/* Intro Spacer */}
             <div className="w-[10vw] shrink-0" />

             {TIMELINE.map((item, i) => (
                 <div key={i} className="relative w-[80vw] md:w-150 h-[60vh] shrink-0 flex flex-col justify-center border-l border-white/20 pl-12 md:pl-20 group">
                     {/* Year Background */}
                     <span className="absolute -top-10 left-4 font-serif text-[120px] md:text-[200px] text-white/5 leading-none select-none group-hover:text-white/10 transition-colors duration-500">
                         {item.year}
                     </span>
                     
                     <div className="relative z-10">
                         <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-px bg-bridal-sage" />
                            <span className="font-sans text-xs uppercase tracking-widest text-bridal-sage">Milestone 0{i+1}</span>
                         </div>
                         <h3 className="font-serif text-4xl md:text-5xl mb-6 group-hover:translate-x-4 transition-transform duration-500">{item.title}</h3>
                         <p className="font-sans text-base text-white/60 leading-loose max-w-md">
                             {item.desc}
                         </p>
                     </div>
                 </div>
             ))}

             {/* End Spacer */}
             <div className="w-[20vw] shrink-0" />
         </div>
      </section>

      {/* 5. THE MANIFESTO (Values) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
              <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-4 block">Core Beliefs</span>
              <h2 className="font-serif text-3xl md:text-4xl">The Pillars of the House</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {VALUES.map((val, i) => (
                  <div key={i} className="reveal-text group p-8 border border-bridal-charcoal/5 hover:border-bridal-sage/50 transition-colors duration-500 rounded-2xl text-center">
                      <div className="w-16 h-16 mx-auto bg-bridal-ivory border border-bridal-charcoal/10 rounded-full flex items-center justify-center text-bridal-charcoal mb-6 group-hover:bg-bridal-sage group-hover:text-white transition-all duration-500 shadow-sm">
                          {val.icon}
                      </div>
                      <h3 className="font-serif text-2xl mb-4">{val.title}</h3>
                      <p className="font-sans text-sm text-bridal-charcoal/60 leading-relaxed">
                          {val.desc}
                      </p>
                  </div>
              ))}
          </div>
      </section>

      {/* 6. THE ATELIER (Gallery) */}
      <section className="py-20 md:py-32 px-6 max-w-480 mx-auto bg-white">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 px-6 md:px-24">
             <div>
                 <h2 className="font-serif text-4xl md:text-6xl mb-6">L'Atelier</h2>
                 <p className="font-sans text-sm leading-loose text-bridal-charcoal/70 max-w-lg">
                     Behind every gown is a team of "Petites Mains" (little hands). Our studio is a place of quiet focus, where embroidery is done by hand and patterns are drafted on paper, not screens.
                 </p>
             </div>
             <div className="flex justify-end">
                 <Link href="/the-craft" className="group flex items-center gap-4 text-xs uppercase tracking-widest hover:text-bridal-sage transition-colors">
                     View The Process <PenTool size={16} className="group-hover:translate-x-1 transition-transform"/>
                 </Link>
             </div>
         </div>

         {/* Masonry Grid */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 h-200 md:h-150">
             <div className="md:col-span-2 relative h-full overflow-hidden rounded-2xl group">
                 <Image src="/knits.webp" alt="Atelier 1" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
             </div>
             <div className="relative h-full overflow-hidden rounded-2xl group">
                 <Image src="/flower.webp" alt="Atelier 2" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
             </div>
             <div className="relative h-full overflow-hidden rounded-2xl group">
                 <Image src="/art.webp" alt="Atelier 3" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
             </div>
         </div>
      </section>

      {/* 7. FOOTER CTA */}
      <div className="text-center py-24 bg-bridal-charcoal text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
         
         <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 relative z-10">Be Part of Our Story</h2>
         <p className="font-sans text-sm text-white/50 mb-10 max-w-md mx-auto relative z-10 px-6">
            We invite you to visit our atelier and witness the artistry firsthand.
         </p>
         <Link href="/contact" className="relative z-10 inline-block px-10 py-4 bg-white text-bridal-charcoal rounded-full text-xs uppercase tracking-widest hover:bg-bridal-sage hover:text-white transition-all duration-500">
            Visit the Atelier
         </Link>
      </div>

    </main>
  );
}