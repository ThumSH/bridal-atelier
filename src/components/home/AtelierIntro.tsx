"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AtelierIntro() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Parallax for the main image
    gsap.to(".intro-image-parallax", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // 2. Leaf Parallax (Floating movement)
    gsap.to(".intro-leaf", {
      y: -60,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // 3. Signature Drawing Animation
    gsap.fromTo(".signature-path", 
      { strokeDasharray: 300, strokeDashoffset: 300 },
      { 
        strokeDashoffset: 0, 
        duration: 2.5, 
        ease: "power2.inOut",
        scrollTrigger: {
            trigger: ".signature-wrap",
            start: "top 90%",
        }
      }
    );

    // 4. Staggered Text Reveal
    gsap.from(".intro-reveal", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative py-32 md:py-48 bg-bridal-ivory overflow-hidden">
      
      {/* --- LUXURY BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-multiply" />
      
      {/* Golden Halo Background */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* The 'B' Watermark */}
      <div className="absolute top-20 left-10 text-[25rem] md:text-[35rem] font-serif text-bridal-charcoal/5 leading-none select-none pointer-events-none z-0">
        B
      </div>

      {/* Blurred Leaf Parallax Accents */}
      <div className="intro-leaf absolute -top-10 -right-20 z-0 h-80 w-80 opacity-20 pointer-events-none">
         <Image src="/leaves.webp" alt="Leaf Accent" fill className="object-contain blur-[4px]" />
      </div>
      <div className="intro-leaf absolute bottom-10 left-1/2 z-0 h-40 w-40 opacity-10 pointer-events-none">
         <Image src="/leaves.webp" alt="Leaf Accent" fill className="object-contain blur-[2px] rotate-180" />
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* LEFT: The Visual Centerpiece */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-bridal-charcoal/5">
            <div className="intro-image-parallax absolute inset-0 w-full h-full scale-110">
              <Image 
                src="/h-p1.webp" 
                alt="The Masterpiece" 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          {/* Award Badge (World Class Flex) */}
          <div className="intro-reveal absolute -bottom-8 -right-8 bg-white p-8 rounded-full shadow-2xl border border-bridal-gold/20 z-20 hover:scale-105 transition-transform duration-500">
             <div className="flex flex-col items-center text-center">
                <span className="font-serif text-3xl text-bridal-gold italic leading-none">Award</span>
                <span className="font-sans text-[7px] uppercase tracking-[0.3em] text-bridal-charcoal/50 mt-1">Winning Studio</span>
             </div>
          </div>
        </div>

        {/* RIGHT: The Brand Story */}
        <div className="lg:col-span-7 lg:pl-16">
          <span className="intro-reveal inline-block mb-6 font-sans text-xs uppercase tracking-[0.5em] text-bridal-sage font-bold">
            Established 2024
          </span>
          
          <h2 className="intro-reveal font-serif text-5xl md:text-7xl text-bridal-charcoal leading-[1.05] mb-8">
            Every Stitch <br />
            <span className="italic text-bridal-gold drop-shadow-sm">A Promise Made.</span>
          </h2>
          
          <div className="intro-reveal space-y-6 text-bridal-charcoal/70 font-sans text-base leading-relaxed max-w-xl mb-12">
            <p>
              Located in the heart of the city, Bonitha & Co. is a sanctuary for the bride who values the intersection of tradition and avant-garde artistry. We believe your gown and your beauty should tell a story that lasts generations.
            </p>
            <p>
              Whether it is the hand-knitted intricate veils or the world-class makeup artistry, our award-winning team treats every detail as a masterpiece in the making.
            </p>
          </div>

          {/* Signature & CTA Section */}
          <div className="intro-reveal flex flex-col md:flex-row items-center gap-12">
            <Link href="/about" className="group flex items-center gap-4 px-8 py-4 border border-bridal-charcoal/10 rounded-full hover:bg-bridal-charcoal hover:text-white transition-all duration-500">
              <span className="font-sans text-[10px] uppercase tracking-widest font-bold">The Full Story</span>
              <MoveRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>

            <div className="signature-wrap flex flex-col items-center gap-2 opacity-80">
              <svg width="140" height="40" viewBox="0 0 150 40" className="stroke-bridal-charcoal fill-none">
                  <path className="signature-path" d="M10,30 Q40,5 60,30 T120,20" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="font-sans text-[8px] uppercase tracking-[0.4em] text-bridal-sage">
                  Founder & Creative Director
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}