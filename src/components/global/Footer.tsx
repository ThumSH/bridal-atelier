import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-bridal-charcoal text-bridal-ivory overflow-hidden">
      
      {/* --- BACKGROUND TEXTURE --- */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* --- DECORATION: Leaf Rising from Bottom --- */}
      <div className="absolute -bottom-20 -right-20 z-0 h-[400px] w-[400px] opacity-30 pointer-events-none">
         <Image
            src="/leaves.webp"
            alt="Leaf Accent"
            fill
            className="object-contain blur-[3px] rotate-[-45deg]"
         />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 border-b border-white/10 pb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-serif text-3xl tracking-widest uppercase block mb-6">
              Atelier <span className="text-bridal-sage">&</span> Co.
            </Link>
            <p className="font-sans text-xs text-white/60 tracking-wider leading-loose">
              Bridal couture, artistry, and heirlooms woven by hand.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h4 className="font-serif text-lg italic text-bridal-sage mb-6">Explore</h4>
            <ul className="space-y-4 font-sans text-xs tracking-widest uppercase text-white/70">
              <li><Link href="/couture" className="hover:text-white transition-colors">Couture</Link></li>
              <li><Link href="/artistry" className="hover:text-white transition-colors">Artistry</Link></li>
              <li><Link href="/craft" className="hover:text-white transition-colors">The Craft</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
             <h4 className="font-serif text-lg italic text-bridal-sage mb-6">Visit Us</h4>
             <ul className="space-y-4 font-sans text-xs tracking-widest uppercase text-white/70">
              <li>New York • Nationwide</li>
              <li>By Appointment Only</li>
              <li><a href="mailto:hello@atelier.co" className="hover:text-white transition-colors">hello@atelier.co</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="col-span-1">
            <h4 className="font-serif text-lg italic text-bridal-sage mb-6">Follow</h4>
            <div className="flex space-x-6 text-white/70">
              <a href="#" className="hover:text-bridal-sage transition-colors"><Instagram strokeWidth={1} /></a>
              <a href="#" className="hover:text-bridal-sage transition-colors"><Facebook strokeWidth={1} /></a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 flex flex-col md:flex-row justify-between font-sans text-[10px] uppercase tracking-widest text-white/30">
          <span>© 2024 Atelier & Co.</span>
          <span className="mt-2 md:mt-0">Designed with Elegance</span>
        </div>

      </div>
    </footer>
  );
}