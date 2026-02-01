/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PhilosophySection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%", 
          end: "bottom top",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Arch Image Slide Up
      tl.from(".philo-image", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // 2. Text Reveal
      tl.from(".philo-text", {
        x: 30, 
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      }, "-=0.8"); 

      // 3. Leaf Float (Vertical Only - No Rotation)
      // REMOVED: rotation: 15
      gsap.to(".leaf-blur", {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      
      // 4. Parallax Background Text
      gsap.to(".bg-watermark", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative w-full min-h-[60vh] flex items-center bg-bridal-ivory py-24 overflow-hidden">
      
      {/* Background Watermark */}
      <div className="absolute top-10 left-10 pointer-events-none opacity-[0.03] z-0">
          <h1 className="bg-watermark font-serif text-[15vw] leading-none text-bridal-charcoal whitespace-nowrap">
             EXQUISITE
          </h1>
      </div>

      <div className="max-w-7xl mx-auto px-20 w-full h-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT SIDE: The Image (Arch) --- */}
          <div className="philo-image relative w-full h-150 md:h-175">
            <div className="relative h-full w-full overflow-hidden rounded-t-[20rem] shadow-[0_20px_50px_rgba(138,154,91,0.2)]">
              <Image
                src="/er.jpg"
                alt="Philosophy Texture"
                fill
                className="object-cover brightness-[0.95] saturate-[0.8]" 
              />
              <div className="absolute inset-0 rounded-t-[20rem] border border-white/20 pointer-events-none" />
              {/* Internal Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-bridal-ivory/20 to-transparent mix-blend-overlay" />
            </div>
          </div>

          {/* --- RIGHT SIDE: The Text --- */}
          <div className="relative z-10 flex flex-col justify-center items-start text-left pl-0 lg:pl-12">
            
            <div className="philo-text mb-6 text-bridal-sage">
               <span className="font-sans text-xs uppercase tracking-[0.3em] font-medium border-b border-bridal-sage/30 pb-2">
                 Unforgettable Wedding
               </span>
            </div>

            <h2 className="philo-text mb-8 font-serif text-5xl md:text-6xl leading-[1.1] text-bridal-charcoal drop-shadow-sm">
              Create <br />
              Timeless <br />
              <span className="italic text-bridal-sage/80">Memories</span>
            </h2>

            <div className="philo-text mb-10 max-w-md">
              <p className="font-sans text-sm leading-loose text-bridal-charcoal/70">
                With a stunning collection of gowns and suits, breathtaking venues, 
                and personalized attention to every detail, we'll help you create 
                the wedding of your dreams. Say "I do" in the setting of your dreams.
              </p>
            </div>

            {/* Read More Button */}
            <div className="philo-text">
               <button className="group relative border border-bridal-charcoal px-8 py-4 text-xs uppercase tracking-widest text-bridal-charcoal transition-all duration-300 hover:bg-bridal-charcoal hover:text-white hover:shadow-[0_0_25px_rgba(138,154,91,0.5)] hover:border-transparent">
                 <span className="relative z-10">Read More</span>
               </button>
            </div>

          </div>

        </div>
      </div>

      {/* --- DECORATION: Straightened Leaf --- */}
      {/* Removed 'rotate-60'. Now it stands straight up. */}
      <div className="leaf-blur absolute top-80 right-20 z-0 h-75 w-75 translate-x-1/4 -translate-y-1/4 opacity-10 pointer-events-none">
         <Image src="/leaves.webp" alt="Leaf Accent" fill className="object-contain blur-[3px]" />
      </div>

    </section>
  );
}