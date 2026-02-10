"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Smooth scroll to top if already on homepage
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative bg-bridal-charcoal text-bridal-ivory overflow-hidden border-t border-white/5">
      
      {/* --- BACKGROUND TEXTURE --- */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

      {/* --- Glowing Threads Background (Couture Flow) --- */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen">
         <svg className="w-full h-full drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
            <path 
              d="M-100 500 C 400 300, 1000 700, 1500 500" 
              stroke="#D4AF37" 
              strokeWidth="0.5" 
              strokeOpacity="0.4"
              fill="none"
            />
            <path 
              d="M-100 550 C 400 350, 1000 750, 1500 550" 
              stroke="#8A9A5B" 
              strokeWidth="0.5" 
              strokeOpacity="0.3"
              fill="none"
              strokeDasharray="10 10"
            />
         </svg>
      </div>

      {/* --- DECORATION: Straight Leaf (FIXED SIZE) --- */}
      {/* Corrected invalid w-100 to w-[30rem] */}
      <div className="absolute -bottom-32 -right-20 z-0 w-120 h-120 opacity-5 pointer-events-none">
         <Image
            src="/leaves.webp"
            alt="Leaf Accent"
            fill
            className="object-contain blur-[2px] rotate-[-20deg]"
         />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 border-b border-white/10 pb-16">
          
          {/* BRAND COL: TYPOGRAPHY LOGO */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="relative z-50 block mb-6 group" onClick={handleLogoClick}>
               <div className="flex flex-col leading-none">
                  {/* Main Name */}
                  <span className="font-serif text-4xl md:text-5xl tracking-wide text-white group-hover:text-bridal-gold transition-colors duration-500">
                     BONITHA SALON<span className="text-bridal-gold">.</span>
                  </span>
                  
                  {/* Tagline - Fixed Size & Spacing */}
                  <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-white/50 mt-2 group-hover:text-white/80 transition-colors duration-500">
                    Hair & Beauty
                  </span>
               </div>
            </Link>
            
            <p className="font-sans text-xs text-white/50 leading-relaxed max-w-xs">
              Where the art of hair meets the soul of couture. Redefining bridal luxury since 2026.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1 md:pl-12">
            <h4 className="font-serif text-lg italic text-bridal-sage mb-6">Explore</h4>
            <ul className="space-y-4 font-sans text-[10px] md:text-xs tracking-widest uppercase text-white/70">
              {['Artistry', 'Gowns', 'Declarations', 'About'].map((item) => (
                  <li key={item}>
                      <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-bridal-gold hover:translate-x-1 transition-all inline-block duration-300">
                        {item}
                      </Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
             <h4 className="font-serif text-lg italic text-bridal-sage mb-6">Visit Us</h4>
             <ul className="space-y-4 font-sans text-[10px] md:text-xs tracking-widest uppercase text-white/70">
              <li>Galle • Nationwide</li>
              <li>By Appointment Only</li>
              <li>
                <a href="mailto:hello@bonitha.co" className="hover:text-bridal-gold transition-colors">
                  hello@bonitha.co
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="col-span-1">
            <h4 className="font-serif text-lg italic text-bridal-sage mb-6">Follow</h4>
            <div className="flex space-x-6 text-white/70">
              <a href="#" className="hover:text-bridal-gold hover:scale-110 transition-all duration-300">
                <Instagram strokeWidth={1} size={20} />
              </a>
              <a href="#" className="hover:text-bridal-gold hover:scale-110 transition-all duration-300">
                <Facebook strokeWidth={1} size={20} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 flex flex-col md:flex-row justify-between font-sans text-[10px] uppercase tracking-widest text-white/20">
          <span>© 2026 Bonitha Saloon. All Rights Reserved.</span>
          <span className="mt-2 md:mt-0 hover:text-white/40 transition-colors cursor-default">
            Designed By Tranzix Global Impex
          </span>
        </div>

      </div>
    </footer>
  );
}