"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook to detect current page
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Define pages that have a light background at the very top
  const isLightPage = pathname === "/declarations" || pathname === "/about" || pathname === "/gowns" || pathname === "/artistry";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NAV_ITEMS = ['Artistry', 'gowns', 'Portfolio', 'Declarations', 'About'];

  // Logic: Use dark text if scrolled OR if we are on a light-background page
  const useDarkTheme = isScrolled || isLightPage;

  return (
    <div className="fixed top-0 left-0 w-full z-[100] flex justify-center pt-4 md:pt-6 px-4 transition-all duration-500">
      <header
        className={cn(
          "flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          isScrolled
            // Scrolled State: The Glass Pill
            ? "w-[98%] md:w-[70%] max-w-5xl bg-[#EBEBE8]/80 backdrop-blur-xl text-bridal-charcoal shadow-2xl rounded-full py-3 px-6 md:px-8 border border-white/40"
            // Top State: Transparent
            : "w-full max-w-[1400px] bg-transparent py-2 px-0 border-transparent",
          // Apply dark text specifically if it's a light page and NOT scrolled yet
          !isScrolled && isLightPage ? "text-bridal-charcoal" : "text-white"
        )}
      >
        
        {/* LOGO */}
        <Link href="/" className="group relative z-10 flex-shrink-0">
           <div className="flex flex-col leading-none">
              <span className={cn(
                  "font-serif text-xl md:text-2xl tracking-wide transition-colors duration-300",
                  useDarkTheme ? "text-bridal-charcoal" : "text-white drop-shadow-md"
              )}>
                 BONITHA<span className="text-bridal-gold">.</span>
              </span>
              <span className={cn(
                  "font-sans text-[8px] uppercase tracking-[0.3em] transition-opacity",
                  useDarkTheme ? "text-bridal-charcoal/60" : "text-white/80 opacity-80"
              )}>
                 Atelier
              </span>
           </div>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-6">
           {NAV_ITEMS.map((item) => (
             <Link 
               key={item} 
               href={`/${item.toLowerCase().replace(' ', '-')}`}
               className={cn(
                 "px-4 py-2 rounded-full transition-all duration-300 group relative",
                 useDarkTheme 
                    ? "hover:bg-bridal-charcoal/5 text-bridal-charcoal/80 hover:text-bridal-charcoal" 
                    : "hover:bg-white/10 text-white/90 hover:text-white"
               )}
             >
                <span className="font-sans text-[10px] uppercase tracking-widest font-bold">
                  {item}
                </span>
             </Link>
           ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
           <Link 
             href="/contact"
             className={cn(
               "hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-500 shadow-md group",
               isScrolled
                 ? "bg-[#1a1a1a] text-white hover:bg-bridal-gold hover:scale-105"
                 : isLightPage 
                    ? "bg-bridal-charcoal text-white hover:bg-bridal-gold" // Dark button for light pages at top
                    : "bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black"
             )}
           >
              <span className="font-sans text-[9px] uppercase tracking-widest font-bold">
                 Book Artistry
              </span>
           </Link>

           <button className={cn(
              "md:hidden transition-colors",
              useDarkTheme ? "text-bridal-charcoal" : "text-white"
           )}>
              <Menu size={24} />
           </button>
        </div>

      </header>
    </div>
  );
}