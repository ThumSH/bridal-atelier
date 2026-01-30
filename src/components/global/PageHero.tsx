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
    // Parallax Effect for the Background Image
    gsap.to(".page-hero-img", {
      y: "30%",
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
    <section ref={container} className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center">
      
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="page-hero-img object-cover brightness-[0.7]"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <span className="page-hero-text font-sans text-xs uppercase tracking-[0.4em] mb-4 block text-bridal-sage">
          {subtitle}
        </span>
        <h1 className="page-hero-text font-serif text-5xl md:text-7xl">
          {title}
        </h1>
      </div>

    </section>
  );
}