"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"; // Uses your existing utility

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to toggle styles
  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls down more than 50px, switch to "Solid" mode
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
        // CONDITIONAL STYLES:
        // If Scrolled: Glassmorphism (Ivory background, Charcoal text, Shadow)
        // If Top: Transparent (No background, White text)
        isScrolled 
          ? "border-b border-bridal-charcoal/5 bg-bridal-ivory/90 backdrop-blur-md py-4 text-bridal-charcoal shadow-sm" 
          : "border-b border-transparent bg-transparent py-6 text-white"
      )}
    >
      <div className="mx-auto flex items-center justify-between px-6 lg:px-12 max-w-7xl">
        
        {/* Logo */}
        <Link href="/" className="font-serif text-3xl tracking-widest uppercase">
          Bonitha <span className={cn("transition-colors duration-500", isScrolled ? "text-bridal-sage" : "text-white/80")}>&</span> Co.
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-12 md:flex">
          {["Couture", "Artistry", "The Craft", "About"].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              className={cn(
                "font-sans text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:text-bridal-sage",
                // Dynamic text color for links
                isScrolled ? "text-bridal-charcoal/70" : "text-white/90"
              )}
            >
              {item}
            </Link>
          ))}
          
          <button 
            className={cn(
              "px-8 py-3 font-sans text-xs uppercase tracking-widest transition-all duration-300",
              // Button changes style based on scroll
              isScrolled 
                ? "bg-bridal-charcoal text-bridal-ivory hover:bg-bridal-sage"
                : "bg-white text-bridal-charcoal hover:bg-bridal-sage hover:text-white"
            )}
          >
            Book Consultation
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button className={cn("md:hidden", isScrolled ? "text-bridal-charcoal" : "text-white")}>
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
}