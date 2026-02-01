"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Added for route checking
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Logic: If on homepage, smooth scroll to top. Else, normal navigation.
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
    <footer className="relative bg-bridal-charcoal text-bridal-ivory overflow-hidden">
      
      {/* --- BACKGROUND TEXTURE --- */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* --- Glowing Threads Background (Couture Flow) --- */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
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

      {/* --- DECORATION: Straight Leaf --- */}
      <div className="absolute -bottom-20 -right-20 z-0 h-100 w-100 opacity-10 pointer-events-none">
         <Image
            src="/leaves.webp"
            alt="Leaf Accent"
            fill
            className="object-contain blur-[3px]"
         />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 border-b border-white/10 pb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link 
                href="/" 
                onClick={handleLogoClick} // Attached Handler
                className="font-serif text-3xl tracking-widest uppercase block mb-6 group cursor-pointer"
            >
              Bonitha <span className="text-bridal-sage transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(138,154,91,0.8)]">&</span> Co.
            </Link>
            <p className="font-sans text-xs text-white/60 tracking-wider leading-loose">
              Bridal couture, artistry, and heirlooms woven by hand.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h4 className="font-serif text-lg italic text-bridal-sage mb-6">Explore</h4>
            <ul className="space-y-4 font-sans text-xs tracking-widest uppercase text-white/70">
              {['Couture', 'Artistry', 'The Craft'].map((item) => (
                  <li key={item}>
                      <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all">
                        {item}
                      </Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
             <h4 className="font-serif text-lg italic text-bridal-sage mb-6">Visit Us</h4>
             <ul className="space-y-4 font-sans text-xs tracking-widest uppercase text-white/70">
              <li>New York • Nationwide</li>
              <li>By Appointment Only</li>
              <li><a href="mailto:hello@bonitha.co" className="hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all">hello@bonitha.co</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="col-span-1">
            <h4 className="font-serif text-lg italic text-bridal-sage mb-6">Follow</h4>
            <div className="flex space-x-6 text-white/70">
              <a href="#" className="hover:text-bridal-sage hover:drop-shadow-[0_0_8px_rgba(138,154,91,0.6)] transition-all"><Instagram strokeWidth={1} /></a>
              <a href="#" className="hover:text-bridal-sage hover:drop-shadow-[0_0_8px_rgba(138,154,91,0.6)] transition-all"><Facebook strokeWidth={1} /></a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 flex flex-col md:flex-row justify-between font-sans text-[10px] uppercase tracking-widest text-white/30">
          <span>© 2026 Bonitha & Co.</span>
          <span className="mt-2 md:mt-0">Designed with Elegance</span>
        </div>

      </div>
    </footer>
  );
}