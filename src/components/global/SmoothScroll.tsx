"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation"; // Import usePathname

// Register ScrollTrigger to avoid errors
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname(); // Track the current page URL

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // 2. Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Sync GSAP Ticker with Lenis RAF
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 4. Disable Lag Smoothing (prevents jitters)
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  // --- THE FIX: RESET SCROLL ON ROUTE CHANGE ---
  useEffect(() => {
    if (lenisRef.current) {
        // immediate: true forces an instant jump (no animation) to top
        lenisRef.current.scrollTo(0, { immediate: true }); 
    }
  }, [pathname]); // Runs every time 'pathname' changes

  return <>{children}</>;
}