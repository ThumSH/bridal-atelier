/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

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
          start: "top 60%", // Triggers slightly earlier
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

      // 2. Text Reveal (Staggered)
      tl.from(".philo-text", {
        x: 30, // Slide in from right slightly
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      }, "-=0.8"); // Overlap with image

      // 3. Leaf Float (Keep existing perfect structure)
      gsap.to(".leaf-blur", {
        y: 40,
        rotation: 15,
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
    <section ref={container} className="relative w-full min-h-[60vh] flex items-center bg-bridal-ivory py-24 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-20 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT SIDE: The Image (Arch) --- */}
          {/* Adjusted to match the reference: Tall arch, clean image */}
          <div className="philo-image relative w-full h-[600px] md:h-[700px]">
            <div className="relative h-full w-full overflow-hidden rounded-t-[20rem] shadow-2xl shadow-bridal-charcoal/10">
              <Image
                src="/er.jpg"
                alt="Philosophy Texture"
                fill
                className="object-cover brightness-[0.9] saturate-[0.8]" // Increased brightness to match reference
              />
              {/* Subtle inner border */}
              <div className="absolute inset-0 rounded-t-[20rem] border border-white/20 pointer-events-none" />
            </div>
          </div>

          {/* --- RIGHT SIDE: The Text --- */}
          {/* Left aligned text, sitting aside the image */}
          <div className="relative z-10 flex flex-col justify-center items-start text-left pl-0 lg:pl-12">
            
            <div className="philo-text mb-6 text-bridal-sage">
               <span className="font-sans text-xs uppercase tracking-[0.3em] font-medium">
                 Unforgettable Wedding
               </span>
            </div>

            <h2 className="philo-text mb-8 font-serif text-5xl md:text-6xl leading-[1.1] text-bridal-charcoal">
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
               <button className="border border-bridal-charcoal px-8 py-4 text-xs uppercase tracking-widest text-bridal-charcoal transition-all hover:bg-bridal-charcoal hover:text-white">
                 Read More
               </button>
            </div>

          </div>

        </div>
      </div>

      {/* --- DECORATION: Right Side Top Leaf --- */}
      {/* Kept EXACTLY as requested - Top Right Corner */}
      <div className="leaf-blur absolute top-80 right-20 z-0 h-[300px] w-[300px] translate-x-1/4 -translate-y-1/4 opacity-10 pointer-events-none">
         <Image
            src="/leaves.webp"
            alt="Leaf Accent"
            fill
            className="object-contain blur-[3px] rotate-[60deg]"
         />
      </div>

    </section>
  );
}