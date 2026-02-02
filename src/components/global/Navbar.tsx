/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Instagram, Facebook } from "lucide-react"; // Added X for close icon
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"; 

const TikTokIcon = (props: React.ComponentProps<"svg">) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 4h-2a4 4 0 0 0-4 4v10" />
    <path d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    <path d="M20 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
  </svg>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500 ease-in-out",
          (isScrolled || isMobileMenuOpen) 
            ? "border-b border-bridal-charcoal/5 bg-bridal-ivory/95 backdrop-blur-md py-4 text-bridal-charcoal shadow-sm" 
            : "border-b border-transparent bg-transparent py-6 text-white"
        )}
      >
        <div className="w-full flex items-center justify-between px-6 lg:px-12 relative">
          
          {/* --- LEFT: Logo --- */}
          <div className="shrink-0 z-50">
            <Link 
              href="/" 
              onClick={handleLogoClick}
              className="font-serif text-2xl md:text-3xl tracking-widest uppercase relative z-50"
            >
              Bonitha <span className={cn(
                  "transition-colors duration-500", 
                  (isScrolled || isMobileMenuOpen) ? "text-bridal-sage" : "text-white/80"
              )}>&</span> Co.
            </Link>
          </div>

          {/* --- CENTER: Desktop Navigation --- */}
          <div className="hidden md:flex items-center gap-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {["Couture", "Artistry", "The Craft", "About"].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className={cn(
                  "font-sans text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:text-bridal-sage relative group",
                  isScrolled ? "text-bridal-charcoal/80" : "text-white/90"
                )}
              >
                {item}
                <span className={cn(
                  "absolute -bottom-2 left-0 w-0 h-px transition-all duration-300 group-hover:w-full",
                  isScrolled ? "bg-bridal-sage" : "bg-white"
                )} />
              </Link>
            ))}
          </div>

          {/* --- RIGHT: Desktop Actions --- */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              className={cn(
                "px-6 py-2 font-sans text-[10px] uppercase tracking-widest transition-all duration-300 border",
                isScrolled
                  ? "border-bridal-charcoal text-bridal-charcoal hover:bg-bridal-charcoal hover:text-bridal-ivory"
                  : "border-white text-white hover:bg-white hover:text-bridal-charcoal"
              )} href={"/contact"}            >
              Book Now
            </Link>

            <div className={cn(
              "flex items-center gap-5 pl-8 border-l",
              isScrolled ? "border-bridal-charcoal/10" : "border-white/20"
            )}>
              <a href="#" className={cn("transition-colors hover:-translate-y-1 duration-300", isScrolled ? "text-bridal-charcoal hover:text-bridal-sage" : "text-white hover:text-bridal-sage")}><Instagram size={18} strokeWidth={1.5} /></a>
              <a href="#" className={cn("transition-colors hover:-translate-y-1 duration-300", isScrolled ? "text-bridal-charcoal hover:text-bridal-sage" : "text-white hover:text-bridal-sage")}><Facebook size={18} strokeWidth={1.5} /></a>
              <a href="#" className={cn("transition-colors hover:-translate-y-1 duration-300", isScrolled ? "text-bridal-charcoal hover:text-bridal-sage" : "text-white hover:text-bridal-sage")}><TikTokIcon className="h-4.5 w-4.5" strokeWidth={1.5} /></a>
            </div>
          </div>

          {/* --- MOBILE MENU TRIGGER --- */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
                "md:hidden relative z-50 p-2 transition-colors", 
                (isScrolled || isMobileMenuOpen) ? "text-bridal-charcoal" : "text-white"
            )}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div className={cn(
          "fixed inset-0 bg-bridal-ivory z-40 flex flex-col justify-center items-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          isMobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-10 pointer-events-none"
      )}>
          <div className="flex flex-col gap-8 text-center">
              {["Couture", "Artistry", "The Craft", "About", "Contact"].map((item, i) => (
                  <Link 
                    key={item}
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif text-4xl text-bridal-charcoal hover:text-bridal-sage transition-colors duration-300"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                      {item}
                  </Link>
              ))}
          </div>

          <div className="absolute bottom-12 flex gap-8 text-bridal-charcoal/50">
              <Instagram size={24} strokeWidth={1} />
              <Facebook size={24} strokeWidth={1} />
              <TikTokIcon className="h-6 w-6" strokeWidth={1} />
          </div>
      </div>
    </>
  );
}