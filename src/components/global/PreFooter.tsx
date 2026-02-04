"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight, Calendar } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PreFooter() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // 1. Parallax Background Scale (The "Breathing" Effect)
    gsap.fromTo(".prefooter-bg", 
      { scale: 1.2, opacity: 0.5 }, 
      { 
        scale: 1, 
        opacity: 0.2, 
        ease: "none", 
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

    // 2. Text Reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      }
    });

    tl.from(".prefooter-reveal", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out"
    });

    // 3. Button Magnetism (Visual cue only)
    gsap.from(".cta-button-wrap", {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
      delay: 0.5,
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full py-32 md:py-48 bg-bridal-charcoal overflow-hidden flex flex-col items-center justify-center text-center px-6">
      
      {/* Background Texture (Parallax) */}
      <div className="prefooter-bg absolute inset-0 bg-[url('/img2.webp')] bg-cover bg-center mix-blend-overlay opacity-20 pointer-events-none grayscale" />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        
        <div className="overflow-hidden mb-6">
           <span className="prefooter-reveal inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.4em] text-bridal-gold font-bold border border-bridal-gold/30 px-4 py-2 rounded-full">
              <Calendar size={12} />
              Now Booking 2026/2027
           </span>
        </div>

        <h2 ref={textRef} className="font-serif text-5xl md:text-8xl text-white leading-[0.9] mb-10">
          <div className="overflow-hidden">
            <span className="prefooter-reveal block">Ready to be a</span>
          </div>
          <div className="overflow-hidden">
            <span className="prefooter-reveal block italic text-bridal-sage">Bonitha Bride?</span>
          </div>
        </h2>

        <p className="prefooter-reveal font-sans text-white/60 text-sm md:text-base max-w-lg mx-auto leading-loose mb-16">
          Your transformation begins with a conversation. Let us craft a look that is as timeless as your love story.
        </p>

        <div className="cta-button-wrap relative group inline-block">
           <div className="absolute -inset-4 bg-bridal-sage/20 rounded-full blur-xl group-hover:bg-bridal-sage/40 transition-all duration-500" />
           
           <Link href="/contact" className="relative flex items-center gap-6 px-12 py-6 bg-bridal-ivory text-bridal-charcoal rounded-full overflow-hidden transition-all duration-300 hover:scale-105">
              <span className="relative z-10 font-sans text-xs uppercase tracking-[0.2em] font-bold">
                Book Your Consultation
              </span>
              <div className="w-10 h-10 rounded-full bg-bridal-charcoal text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                 <MoveRight size={16} />
              </div>
           </Link>
        </div>

      </div>

      {/* Decorative Footer Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}