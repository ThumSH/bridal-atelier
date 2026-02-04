"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Heart, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INSTA_POSTS = [
  { id: 1, src: "/p-1.webp", likes: "1.2k", comments: "45" },
  { id: 2, src: "/p-2.webp", likes: "856", comments: "23" },
  { id: 3, src: "/p-3.webp", likes: "2.1k", comments: "112" },
  { id: 4, src: "/p-4.webp", likes: "943", comments: "34" },
];

export default function InstaFeed() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    // 1. Header & Rope Animation
    tl.from(".insta-header-anim", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    })
    .fromTo(".insta-rope-path", 
      { strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 },
      { strokeDasharray: 300, strokeDashoffset: 0, opacity: 0.8, duration: 1.5, ease: "power2.inOut" },
      "-=0.8"
    );

    // 2. Leaf Parallax
    gsap.to(".insta-leaf", {
      yPercent: 30,
      rotation: 10,
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // 3. Grid Reveal
    tl.from(".insta-item", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=1");

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-bridal-ivory py-32 overflow-hidden">
      
      {/* --- ATMOSPHERIC LEAF OVERLAYS --- */}
      <div className="insta-leaf absolute top-10 -left-20 w-[500px] h-[500px] z-0 pointer-events-none opacity-20 blur-xl mix-blend-multiply">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>
      <div className="insta-leaf absolute bottom-10 -right-20 w-[450px] h-[450px] z-0 pointer-events-none opacity-15 blur-2xl rotate-45 mix-blend-multiply">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>

      {/* --- SECTION HEADER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-24">
         <div className="insta-header-anim flex items-center justify-center gap-3 text-bridal-gold mb-6">
            <Sparkles size={16} />
            <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold">Social Journal</span>
         </div>

         <div className="relative inline-block mb-10">
            <h2 className="insta-header-anim font-serif text-5xl md:text-7xl text-bridal-charcoal leading-none uppercase tracking-tighter">
               #Bonitha<span className="italic text-bridal-gold font-light lowercase">Brides.</span>
            </h2>
            {/* Curved Golden Rope Accent */}
            <svg 
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-8 pointer-events-none" 
              viewBox="0 0 250 40" 
              fill="none" 
            >
              <path 
                className="insta-rope-path text-bridal-gold" 
                d="M10 20C60 35 150 35 240 10" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
            </svg>
         </div>

         <p className="insta-header-anim font-sans text-sm text-bridal-charcoal/60 uppercase tracking-[0.3em] mt-4">
            A digital anthology of our shared love stories.
         </p>
      </div>

      {/* --- PROFESSIONAL GRID LAYOUT (Sharp Edges) --- */}
      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 md:gap-1 mb-24 px-1 md:px-0">
        {INSTA_POSTS.map((post) => (
          <div 
            key={post.id} 
            className="insta-item group relative w-full aspect-square rounded-none overflow-hidden cursor-pointer bg-gray-100 shadow-none"
          >
             <Image 
               src={post.src} 
               alt="Bonitha Bride" 
               fill
               sizes="(max-width: 768px) 100vw, 350px" 
               className="object-cover transition-transform duration-1000 group-hover:scale-110"
             />

             {/* Refined Interaction: Subtle contrast and white internal frame */}
             <div className="absolute inset-0 bg-bridal-charcoal/0 group-hover:bg-bridal-charcoal/20 transition-all duration-700" />
             <div className="absolute inset-8 border border-white/0 group-hover:border-white/30 transition-all duration-700 pointer-events-none" />

             {/* Hover Content */}
             <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 gap-4">
                <Instagram className="text-white w-6 h-6 opacity-60" />
                <div className="flex items-center gap-6 text-white font-sans text-xs tracking-widest font-bold">
                   <div className="flex items-center gap-2">
                      <Heart className="fill-white w-4 h-4" />
                      <span>{post.likes}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <MessageCircle className="fill-white w-4 h-4" />
                      <span>{post.comments}</span>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* --- CALL TO ACTION (Sharp Aesthetic) --- */}
      <div className="relative z-10 flex flex-col items-center gap-8">
         <Link href="/declarations" className="group">
            <div className="px-16 py-6 bg-bridal-charcoal text-white rounded-none border border-bridal-charcoal transition-all duration-500 hover:bg-transparent hover:text-bridal-charcoal hover:scale-105">
               <span className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold flex items-center gap-4">
                  Find Out More
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-2" />
               </span>
            </div>
         </Link>
         
         <div className="w-12 h-px bg-bridal-gold/40" />
         
         <p className="text-[9px] font-sans text-bridal-charcoal/30 uppercase tracking-[0.6em] font-bold">
            Explore the full bridal anthology
         </p>
      </div>

    </section>
  );
}