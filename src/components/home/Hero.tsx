"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    id: 1,
    image: "/2.webp",
    subtitle: "Est. 2024 • Nationwide",
    titleLine1: "Elegance",
    titleLine2: "Softly",
    titleLine3: "Spoken.",
    description: "We believe the most beautiful things in life are felt, not just seen. Experience the artistry of bespoke couture and hand-knitted heirlooms.",
    button: "Start Your Journey"
  },
  {
    id: 2,
    image: "/21.webp",
    subtitle: "The Collection • 2025",
    titleLine1: "Heirlooms",
    titleLine2: "Woven in",
    titleLine3: "Time.",
    description: "Every stitch tells a story. Discover our exclusive collection of hand-knitted shawls and intricate lace veils designed for generations.",
    button: "View The Collection"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // Locks interaction during transition
  const container = useRef<HTMLDivElement>(null);
  
  // Logic to determine layout: Even = Normal, Odd = Reversed
  const isReversed = currentSlide % 2 !== 0; 
  const slide = SLIDES[currentSlide];

  // --- 1. The Transition Orchestrator ---
  const handleSlideChange = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return; // Prevent clicking while animating
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        // Only update state AFTER content has faded out
        setCurrentSlide((prev) => {
          if (direction === 'next') return (prev + 1) % SLIDES.length;
          return (prev - 1 + SLIDES.length) % SLIDES.length;
        });
        // We don't set setIsAnimating(false) here. 
        // We do it after the ENTER animation completes in useGSAP.
      }
    });

    // EXIT ANIMATION: Fade out current content
    tl.to(".hero-content", { 
      y: -30, 
      opacity: 0, 
      duration: 0.5, 
      ease: "power2.in" 
    })
    .to(".hero-image-wrapper", { 
      scale: 0.95, 
      opacity: 0, 
      duration: 0.5, 
      ease: "power2.in" 
    }, "<"); // Run simultaneously

  }, [isAnimating]);

  // --- 2. Auto-Scroll Engine ---
  useEffect(() => {
    if (isAnimating) return; // Pause timer if user is interacting
    
    const timer = setTimeout(() => {
      handleSlideChange('next');
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentSlide, isAnimating, handleSlideChange]);

  // --- 3. Enter Animation (Runs on State Change) ---
  useGSAP(() => {
    const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false) // Unlock interaction
    });

    // Force initial state for the new elements
    // We use .fromTo because React might reuse DOM nodes, so we must be explicit
    
    // IMAGE ENTER
    tl.fromTo(".hero-image-wrapper", 
      { opacity: 0, scale: 1.05 }, 
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
    );

    // TEXT ENTER (Staggered)
    tl.fromTo(".hero-content", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 
        "-=0.8" // Overlap with image
    );

    // Specific text stagger if needed, or just animate the whole block container
    
  }, { scope: container, dependencies: [currentSlide] });

  return (
    <section 
      ref={container} 
      className={cn(
        "relative flex min-h-screen w-full flex-col bg-bridal-ivory transition-all duration-700 ease-in-out",
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      
      {/* --- IMAGE SIDE --- */}
      <div className="relative h-[50vh] w-full overflow-hidden md:h-screen md:w-1/2">
        {/* Added 'hero-image-wrapper' class for GSAP targeting */}
        <div className="hero-image-wrapper absolute inset-0 h-full w-full">
           <Image 
             src={slide.image}
             alt="Bridal Imagery"
             fill
             className="object-cover blur-[3px] brightness-110 saturate-[0.8]"
             priority
             key={slide.image} // Force React to treat this as a new image
           />
        </div>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-bridal-sage/10 mix-blend-multiply" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Mobile Controls */}
        <div className="absolute bottom-4 right-4 flex space-x-2 md:hidden z-30">
          <button onClick={() => handleSlideChange('prev')} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white"><ChevronLeft size={20}/></button>
          <button onClick={() => handleSlideChange('next')} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white"><ChevronRight size={20}/></button>
        </div>
      </div>

      {/* --- TEXT SIDE --- */}
      <div className="flex h-[50vh] w-full flex-col justify-center px-8 md:h-screen md:w-1/2 md:px-20 lg:px-32 relative">
        {/* Added 'hero-content' class for GSAP targeting */}
        <div className="hero-content relative z-10 max-w-lg">
          <p className="mb-6 font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage">
            {slide.subtitle}
          </p>
          
          <h1 className="mb-8 font-serif text-5xl leading-[1.1] text-bridal-charcoal md:text-6xl lg:text-7xl">
            <span className="block">{slide.titleLine1}</span>
            <span className="block italic text-bridal-gold/80">{slide.titleLine2}</span>
            <span className="block">{slide.titleLine3}</span>
          </h1>

          <p className="mb-10 font-sans text-sm leading-loose text-bridal-charcoal/70">
            {slide.description}
          </p>

          <div className="inline-block">
            <button className="group relative overflow-hidden bg-bridal-charcoal px-8 py-4 text-xs uppercase tracking-widest text-white transition-all hover:bg-bridal-sage">
              <span className="relative z-10">{slide.button}</span>
            </button>
          </div>
        </div>

        {/* --- DESKTOP CONTROLS --- */}
        <div className={cn(
            "absolute bottom-12 hidden md:flex items-center space-x-6 transition-all duration-500",
            // Smoothly move controls left/right
            isReversed ? "left-12" : "right-12"
        )}>
           <div className="flex space-x-2">
             {SLIDES.map((_, idx) => (
               <div 
                 key={idx} 
                 className={cn(
                   "h-1 w-8 transition-all duration-500",
                   idx === currentSlide ? "bg-bridal-sage" : "bg-bridal-charcoal/20"
                 )} 
               />
             ))}
           </div>
           <div className="flex space-x-2">
             <button 
                onClick={() => handleSlideChange('prev')} 
                disabled={isAnimating}
                className="p-3 border border-bridal-charcoal/10 hover:border-bridal-sage hover:text-bridal-sage transition-all rounded-full text-bridal-charcoal disabled:opacity-50"
             >
               <ChevronLeft size={18} />
             </button>
             <button 
                onClick={() => handleSlideChange('next')} 
                disabled={isAnimating}
                className="p-3 border border-bridal-charcoal/10 hover:border-bridal-sage hover:text-bridal-sage transition-all rounded-full text-bridal-charcoal disabled:opacity-50"
             >
               <ChevronRight size={18} />
             </button>
           </div>
        </div>
      </div>
    </section>
  );
}