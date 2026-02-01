"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ChevronRight, ChevronLeft, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SLIDES = [
  {
    id: 1,
    image: "/img2.webp",
    subtitle: "Est. 2024 • Nationwide",
    titleLine1: "Elegance",
    titleLine2: "Softly",
    titleLine3: "Spoken.",
    description: "We believe the most beautiful things in life are felt, not just seen. Experience the artistry of bespoke couture and hand-knitted heirlooms.",
    button: "Start Your Journey",
    link: '/contact'
  },
  {
    id: 2,
    image: "/wail.webp",
    subtitle: "The Collection • 2025",
    titleLine1: "Heirlooms",
    titleLine2: "Woven in",
    titleLine3: "Time.",
    description: "Every stitch tells a story. Discover our exclusive collection of hand-knitted shawls and intricate lace veils designed for generations.",
    button: "View The Collection",
    link: "/couture"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  const isReversed = currentSlide % 2 !== 0; 
  const slide = SLIDES[currentSlide];

  // --- 1. Transition Logic ---
  const handleSlideChange = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 0 });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlide((prev) => {
          if (direction === 'next') return (prev + 1) % SLIDES.length;
          return (prev - 1 + SLIDES.length) % SLIDES.length;
        });
      }
    });

    tl.to(".hero-text-line", { y: -50, opacity: 0, duration: 0.5, stagger: 0.05, ease: "power2.in" })
      .to(".hero-desc", { y: -20, opacity: 0, duration: 0.4 }, "<0.1")
      .to(".hero-meta", { opacity: 0, duration: 0.3 }, "<")
      .to(".hero-image-mask", { 
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.8, 
        ease: "power4.inOut" 
      }, "<");

  }, [isAnimating]);

  // --- 2. Auto-Scroll with Progress Bar ---
  useEffect(() => {
    if (isAnimating) return;
    
    if (progressRef.current) {
        gsap.fromTo(progressRef.current, 
            { scaleX: 0 }, 
            { scaleX: 1, duration: 5, ease: "linear" }
        );
    }

    const timer = setTimeout(() => {
      handleSlideChange('next');
    }, 5000); 

    return () => {
        clearTimeout(timer);
        if (progressRef.current) gsap.killTweensOf(progressRef.current);
    };
  }, [currentSlide, isAnimating, handleSlideChange]);

  // --- 3. Enter Animation ---
  useGSAP(() => {
    const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false)
    });

    tl.fromTo(".hero-image-mask", 
      { clipPath: "inset(100% 0% 0% 0%)" }, 
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.out" }
    );

    tl.fromTo(".hero-image-inner",
        { scale: 1.2 },
        { scale: 1, duration: 1.5, ease: "power2.out" },
        "<"
    );

    tl.fromTo(".hero-text-line", 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }, 
        "-=0.8"
    );

    tl.fromTo([".hero-desc", ".hero-meta"],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1 },
        "-=0.6"
    );
    
  }, { scope: container, dependencies: [currentSlide] });

  return (
    <section ref={container} className="relative min-h-screen w-full bg-bridal-ivory overflow-hidden flex items-center justify-center py-20 lg:py-0">
      <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-multiply" />

      <div className={cn("relative w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-700", isReversed ? "lg:grid-flow-dense" : "")}>
        
        {/* IMAGE SIDE */}
        <div className={cn("relative w-full h-[60vh] lg:h-[80vh] transition-all duration-700", isReversed ? "lg:col-start-2" : "lg:col-start-1")}>
           <div className="hero-image-mask absolute inset-0 w-full h-full rounded-[3rem] overflow-hidden shadow-2xl shadow-bridal-charcoal/5">
              <div className="hero-image-inner relative w-full h-full">
                <Image src={slide.image} alt="Bridal Imagery" fill className="object-cover" priority key={slide.image} />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
              </div>
           </div>
           <div className="hero-meta absolute -bottom-6 -right-6 lg:bottom-10 lg:-right-10 bg-white p-6 rounded-[2rem] shadow-xl z-20 flex flex-col items-center gap-2">
              <span className="font-serif text-3xl text-bridal-charcoal">0{currentSlide + 1}</span>
              <div className="w-px h-8 bg-bridal-charcoal/20" />
              <span className="font-sans text-xs text-bridal-charcoal/40">0{SLIDES.length}</span>
           </div>
        </div>

        {/* TEXT SIDE */}
        <div className={cn("relative flex flex-col justify-center items-start transition-all duration-700", isReversed ? "lg:col-start-1 lg:items-end lg:text-right" : "lg:col-start-2 lg:items-start lg:text-left")}>
          <div className="hero-meta w-32 h-1 bg-bridal-charcoal/10 mb-8 rounded-full overflow-hidden">
             <div ref={progressRef} className="h-full bg-bridal-sage origin-left" />
          </div>
          <p className="hero-meta mb-6 font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage">{slide.subtitle}</p>
          <div className="mb-8 overflow-hidden">
            {/* ADDED: shadow-glow class to H1 */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-bridal-charcoal shadow-glow">
                <div className="overflow-hidden"><span className="hero-text-line block">{slide.titleLine1}</span></div>
                <div className="overflow-hidden"><span className="hero-text-line block italic text-bridal-gold/90">{slide.titleLine2}</span></div>
                <div className="overflow-hidden"><span className="hero-text-line block">{slide.titleLine3}</span></div>
            </h1>
          </div>
          <p className={cn("hero-desc mb-10 font-sans text-sm leading-loose text-bridal-charcoal/70 max-w-md", isReversed ? "lg:ml-auto" : "")}>
            {slide.description}
          </p>
          
          <div className="hero-desc inline-block">
            <Link href={slide.link}>
                <button className="group relative flex items-center gap-4 px-8 py-4 bg-bridal-charcoal text-white rounded-full overflow-hidden transition-all hover:bg-bridal-sage hover:shadow-[0_0_20px_rgba(138,154,91,0.4)]">
                    <span className="relative z-10 text-xs uppercase tracking-widest">{slide.button}</span>
                    <div className="relative z-10 bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                        <MoveRight size={14} />
                    </div>
                </button>
            </Link>
          </div>

          <div className="hero-meta mt-16 flex items-center gap-4">
            <button onClick={() => handleSlideChange('prev')} disabled={isAnimating} className="p-4 border border-bridal-charcoal/10 rounded-full hover:bg-white hover:shadow-lg hover:border-transparent transition-all disabled:opacity-50">
                <ChevronLeft size={20} className="text-bridal-charcoal" />
            </button>
            <button onClick={() => handleSlideChange('next')} disabled={isAnimating} className="p-4 border border-bridal-charcoal/10 rounded-full hover:bg-white hover:shadow-lg hover:border-transparent transition-all disabled:opacity-50">
                <ChevronRight size={20} className="text-bridal-charcoal" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}