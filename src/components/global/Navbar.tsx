"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Define pages that are "Light" at the top (require dark text initially)
  const isLightPage = pathname === "/declarations" || pathname === "/about" || pathname === "/gowns" || pathname === "/artistry" || pathname === "/contact";
  const NAV_ITEMS = ['Artistry', 'Gowns', 'Declarations', 'About'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animation for Mobile Menu
  useGSAP(() => {
    gsap.set(".mobile-link", { y: 40, opacity: 0 });
    
    tl.current = gsap.timeline({ paused: true })
      .to(menuRef.current, { 
        y: "0%", 
        duration: 0.7, 
        ease: "power4.inOut",
        display: "flex"
      })
      .to(".mobile-link", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.3");
  }, { scope: menuRef });

  // Toggle Logic
  useEffect(() => {
    if (isMobileMenuOpen) {
      tl.current?.play();
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      tl.current?.reverse();
      document.body.style.overflow = ""; // Enable scrolling
    }
  }, [isMobileMenuOpen]);

  // Dark text if: Menu is Open OR Scrolled OR Light Page
  const useDarkTheme = isMobileMenuOpen || isScrolled || (isLightPage && !isScrolled);

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      <div className="fixed top-0 left-0 w-full z-100 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
        <header
          className={cn(
            "pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
            isScrolled
              ? "w-[95%] md:w-[70%] max-w-5xl bg-[#EBEBE8]/80 backdrop-blur-xl shadow-lg rounded-full py-3 px-6 border border-white/40"
              : "w-full max-w-350 bg-transparent py-2 px-0 border-transparent",
            useDarkTheme ? "text-bridal-charcoal" : "text-white"
          )}
        >
          {/* LOGO */}
         <Link 
            href="/" 
            className="relative z-50" 
            onClick={(e) => {
              setIsMobileMenuOpen(false); // Close menu if open
              
              // If we are already on the homepage, smooth scroll to top
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
             <div className="flex flex-col items-center leading-none">
                <span className="font-serif text-xl md:text-3xl tracking-wide">
                   BONITHA SALON<span className="text-bridal-gold">.</span>
                </span>
                <span className="font-sans text-[8px] uppercase tracking-[0.3em] opacity-70">
                   Hair & Beauty
                </span>
             </div>
          </Link>

          {/* DESKTOP NAV - INCREASED FONT SIZE */}
          <nav className="hidden md:flex items-center gap-8">
             {NAV_ITEMS.map((item) => (
               <Link 
                 key={item} 
                 href={`/${item.toLowerCase().replace(' ', '-')}`}
                 className="text-[12px] uppercase tracking-widest font-bold hover:opacity-70 transition-opacity" // Changed from 10px to 11px
               >
                  {item}
               </Link>
             ))}
          </nav>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-4 z-50">
             <Link 
               href="/contact"
               className={cn(
                 "hidden md:flex items-center px-6 py-2.5 rounded-full transition-all duration-500 shadow-md",
                 useDarkTheme 
                    ? "bg-bridal-charcoal text-white hover:bg-bridal-gold" 
                    : "bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black"
               )}
             >
                <span className="font-sans text-[10px] uppercase tracking-widest font-bold"> {/* Changed from 9px to 10px */}
                   Book Your Date
                </span>
             </Link>

             {/* HAMBURGER BUTTON */}
             <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden transition-transform active:scale-90"
             >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
             </button>
          </div>
        </header>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-90 bg-bridal-ivory flex flex-col justify-center px-8 -translate-y-full"
      >
         <div className="flex flex-col gap-8">
            {NAV_ITEMS.map((item) => (
               <Link 
                 key={item}
                 href={`/${item.toLowerCase().replace(' ', '-')}`}
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="mobile-link flex items-center justify-between border-b border-black/5 pb-4 group"
               >
                  <span className="font-serif text-4xl text-bridal-charcoal group-hover:italic transition-all">
                     {item}
                  </span>
                  <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-bridal-gold" />
               </Link>
            ))}
            
            <Link 
               href="/contact"
               onClick={() => setIsMobileMenuOpen(false)}
               className="mobile-link mt-4 bg-bridal-charcoal text-white py-4 rounded-full text-center uppercase tracking-widest font-bold text-xs"
            >
               Book Your Date
            </Link>
         </div>
      </div>
    </>
  );
}