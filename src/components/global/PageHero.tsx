"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function PageHero({ title, subtitle, image }: PageHeroProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Optimized Parallax using yPercent
    gsap.to(".page-hero-img", {
      yPercent: 30, // Uses GPU better than 'y: 30%'
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Text Fade In
    gsap.from(".page-hero-text", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center bg-bridal-charcoal">
      
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
        <Image
          src={image}
          alt={title}
          fill
          // Added 'will-change-transform' for smoother scrolling
          className="page-hero-img object-cover brightness-[0.7] will-change-transform"
          priority
        />
        {/* Added Noise Overlay for texture consistency */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <span className="page-hero-text font-sans text-xs font-bold uppercase tracking-[0.50em] mb-4 block text-bridal-sage drop-shadow-md">
          {subtitle}
        </span>
        {/* Added shadow-glow to title */}
        <h1 className="page-hero-text font-serif text-5xl md:text-7xl shadow-glow">
          {title}
        </h1>
      </div>

    </section>
  );
}