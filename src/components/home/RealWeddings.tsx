"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MapPin } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Exactly 3 Weddings
const WEDDINGS = [
  {
    id: "amara-dev",
    couple: "Amara & Dev",
    location: "The Grand Palace",
    date: "Dec 2024",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "sofia-arjun",
    couple: "Sofia & Arjun",
    location: "Sunset Cliffside",
    date: "Jan 2025",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "priya-rohan",
    couple: "Priya & Rohan",
    location: "Royal Heritage",
    date: "Feb 2025",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop"
  }
];

export default function RealWeddings() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Reveal Cards
      gsap.from(".wedding-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });

      // 2. COUTURE FLOW ANIMATION (Background Lines)
      gsap.fromTo(".wedding-flow-line", 
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 60%",
          }
        }
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative w-full bg-bridal-ivory py-32 overflow-hidden">
      
      {/* --- BACKGROUND DECORATION: Couture Flow --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40">
         <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
            {/* Wide, sweeping curves that span the whole section */}
            <path 
              className="wedding-flow-line"
              d="M-100 400 C 300 600, 1100 200, 1500 400" 
              stroke="#D4AF37" 
              strokeWidth="1" 
              strokeOpacity="0.2"
              fill="none"
            />
            <path 
              className="wedding-flow-line"
              d="M-100 450 C 300 650, 1100 250, 1500 450" 
              stroke="#8A9A5B" 
              strokeWidth="1.5" 
              strokeOpacity="0.1"
              fill="none"
            />
         </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
        <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-4 block">
          Love Stories
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-bridal-charcoal mb-8">
          Real <span className="italic text-bridal-gold/80">Moments</span>
        </h2>
        
        <Link href="/stories" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-bridal-charcoal hover:text-bridal-sage transition-colors">
          View All Stories <ArrowRight size={16} />
        </Link>
      </div>

      {/* --- THE GALLERY (Centered Layout) --- */}
      {/* Changes:
          1. Removed 'overflow-x-auto', 'snap-x' (No scrolling)
          2. Added 'justify-center' (Centers the 3 items)
          3. Added 'flex-wrap' (Ensures responsiveness on small screens)
      */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center w-full gap-8 px-6 pb-12 relative z-10 items-center">
        {WEDDINGS.map((wedding, index) => (
          <div 
            key={wedding.id} 
            // Width Logic: Full width on mobile, fixed width on Desktop to fit 3 perfectly
            className="wedding-card relative w-full md:w-87.5 aspect-3/4 group cursor-pointer"
          >
            {/* Image Wrapper */}
            <div className="relative h-full w-full overflow-hidden rounded-4xl shadow-lg shadow-bridal-charcoal/5">
              <Image
                src={wedding.image}
                alt={wedding.couple}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Dark Overlay on Hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Date Badge */}
              <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                 <span className="font-sans text-[10px] uppercase tracking-widest text-white">
                    {wedding.date}
                 </span>
              </div>
            </div>

            {/* Hover Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  <h3 className="font-serif text-4xl text-white mb-2 italic">
                     {wedding.couple}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-white/80">
                     <MapPin size={12} />
                     <span className="font-sans text-[10px] uppercase tracking-widest">
                        {wedding.location}
                     </span>
                  </div>
                  <button className="mt-8 px-6 py-2 border border-white/30 rounded-full text-xs uppercase tracking-widest text-white hover:bg-white hover:text-bridal-charcoal transition-all">
                     View Album
                  </button>
               </div>
            </div>
            
            {/* Default Label */}
            <div className="absolute -bottom-10 left-4 group-hover:opacity-0 transition-opacity duration-300">
              <span className="font-serif text-lg text-bridal-charcoal">0{index + 1} — {wedding.couple}</span>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
}