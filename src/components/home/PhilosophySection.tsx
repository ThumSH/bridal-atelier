/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PhilosophySection() {
  const container = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Kinetic Typography (Horizontal Scroll)
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Background Parallax
    gsap.fromTo(".phil-video", 
      { scale: 1.3, yPercent: -10 },
      { scale: 1, yPercent: 10, scrollTrigger: { trigger: container.current, scrub: true } }
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative h-[80vh] w-full overflow-hidden bg-bridal-charcoal flex items-center">
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="phil-video w-full h-full object-cover opacity-30 grayscale">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-white-curtains-moving-in-the-wind-2244-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-bridal-charcoal via-transparent to-bridal-charcoal" />
      </div>

      <div className="relative z-10 w-full">
        <div ref={marqueeRef} className="flex whitespace-nowrap gap-20">
          {[1, 2].map((i) => (
            <h2 key={i} className="font-serif text-[10rem] md:text-[18rem] leading-none text-white/105 pointer-events-none select-none">
               Grace in <span className="italic text-bridal-gold">Motion</span> — Beauty in the <span className="italic text-bridal-sage">Details</span> — 
            </h2>
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 left-12 md:left-20 max-w-sm">
         <p className="font-sans text-[9px] uppercase tracking-[0.6em] text-white/40 mb-4 block">Manifesto</p>
         <p className="font-serif text-xl md:text-2xl text-white/80 italic leading-relaxed">
            "Artistry is the quiet conversation between the artist and the soul."
         </p>
      </div>
    </section>
  );
}