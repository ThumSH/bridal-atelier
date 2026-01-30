"use client";

import Link from "next/link";
import { Menu, Instagram, Facebook } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"; 

// Custom TikTok Icon
const TikTokIcon = (props: React.ComponentProps<"svg">) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 4h-2a4 4 0 0 0-4 4v10" />
    <path d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    <path d="M20 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
  </svg>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to toggle styles
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

  return (
    <nav 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500 ease-in-out",
        // Conditional Styles
        isScrolled 
          ? "border-b border-bridal-charcoal/5 bg-bridal-ivory/90 backdrop-blur-md py-4 text-bridal-charcoal shadow-sm" 
          : "border-b border-transparent bg-transparent py-6 text-white"
      )}
    >
      {/* LAYOUT CHANGE: 
         Use 'w-full' instead of 'max-w-7xl' to push elements to the far corners.
         Added 'px-6 lg:px-12' for safe spacing from the edge.
      */}
      <div className="w-full flex items-center justify-between px-6 lg:px-12 relative">
        
        {/* --- LEFT: Logo --- */}
        {/* Flex 'justify-between' naturally pushes this to the start (Left) */}
        <div className="flex-shrink-0">
          <Link href="/" className="font-serif text-3xl tracking-widest uppercase">
            Bonitha <span className={cn("transition-colors duration-500", isScrolled ? "text-bridal-sage" : "text-white/80")}>&</span> Co.
          </Link>
        </div>

        {/* --- CENTER: Navigation --- */}
        {/* Absolute positioning ensures it is ALWAYS dead center of the screen */}
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
              {/* Optional: Subtle hover underline animation */}
              <span className={cn(
                "absolute -bottom-2 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full",
                isScrolled ? "bg-bridal-sage" : "bg-white"
              )} />
            </Link>
          ))}
        </div>

        {/* --- RIGHT: Actions & Icons --- */}
        {/* Flex 'justify-between' naturally pushes this to the end (Right) */}
        <div className="hidden md:flex items-center gap-8">
          
          {/* Button */}
          <Link 
            className={cn(
              "px-6 py-2 font-sans text-[10px] uppercase tracking-widest transition-all duration-300 border",
              isScrolled
                ? "border-bridal-charcoal text-bridal-charcoal hover:bg-bridal-charcoal hover:text-bridal-ivory"
                : "border-white text-white hover:bg-white hover:text-bridal-charcoal"
            )} href={"/contact"}          >
            Book Now
          </Link>

          {/* Social Icons (Far Right) */}
          <div className={cn(
            "flex items-center gap-5 pl-8 border-l",
            isScrolled ? "border-bridal-charcoal/10" : "border-white/20"
          )}>
            <a href="#" className={cn("transition-colors hover:-translate-y-1 duration-300", isScrolled ? "text-bridal-charcoal hover:text-bridal-sage" : "text-white hover:text-bridal-sage")}>
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a href="#" className={cn("transition-colors hover:-translate-y-1 duration-300", isScrolled ? "text-bridal-charcoal hover:text-bridal-sage" : "text-white hover:text-bridal-sage")}>
              <Facebook size={18} strokeWidth={1.5} />
            </a>
            <a href="#" className={cn("transition-colors hover:-translate-y-1 duration-300", isScrolled ? "text-bridal-charcoal hover:text-bridal-sage" : "text-white hover:text-bridal-sage")}>
              <TikTokIcon className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Mobile Menu Trigger (Visible only on mobile) */}
        <button className={cn("md:hidden", isScrolled ? "text-bridal-charcoal" : "text-white")}>
          <Menu className="h-6 w-6" />
        </button>

      </div>
    </nav>
  );
}