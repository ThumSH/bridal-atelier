"use client";

import { ReactNode, useEffect, useRef, useLayoutEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // 1. THE NUCLEAR FIX: Use useLayoutEffect to intercept the browser paint
  // We disable the browser's ability to remember scroll positions.
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      // A. Kill native scroll restoration
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      
      // B. Force the window to the top instantly
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    // 2. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // 3. Double-Check: Force Lenis to 0 immediately on mount
    lenis.scrollTo(0, { immediate: true });

    // 4. Connect to GSAP
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(500,33);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  // 5. Handle Route Changes (Next.js Navigation)
  useEffect(() => {
    if (lenisRef.current) {
        // Force instant jump to top when URL changes
        lenisRef.current.scrollTo(0, { immediate: true }); 
    }
  }, [pathname]);

  return <>{children}</>;
}