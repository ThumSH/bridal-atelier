"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function PreFooter() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-bridal-charcoal">
      
      {/* Background with Parallax (Simulated via fixed attachment or just layout) */}
      <div 
        className="absolute inset-0 opacity-40 bg-[url('/silk.webp')] bg-cover bg-center bg-fixed"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

      <div className="relative z-10 text-center px-6">
        <span className="font-sans text-xs uppercase tracking-[0.4em] text-white/70 mb-6 block">
           Begin Your Story
        </span>
        
        <h2 className="font-serif text-5xl md:text-7xl text-white mb-12 shadow-glow leading-tight">
           Your Gown is <br/> 
           Waiting to be <span className="italic text-bridal-gold">Dreamt</span>.
        </h2>

        <Link href="/contact" className="inline-block group">
           <button className="relative px-12 py-6 bg-white text-bridal-charcoal rounded-full overflow-hidden transition-transform hover:scale-105 duration-300">
              <span className="relative z-10 font-sans text-xs uppercase tracking-widest flex items-center gap-4 group-hover:gap-6 transition-all">
                 Book Consultation <MoveRight size={16} />
              </span>
           </button>
        </Link>
      </div>

    </section>
  );
}