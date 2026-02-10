"use client";

import { useRef } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- CONFIGURATION ---
const HEADER_IMAGE = "/p-1.webp"; 
const COLLAGE_IMAGES = [
  { src: "/p-7.webp", alt: "Horizontal Main" }, 
  { src: "/p-3.webp", alt: "Vertical Side 1" }, 
  { src: "/p-4.webp", alt: "Vertical Side 2" }, 
  { src: "/p-5.webp", alt: "Vertical Side 3" }, 
  { src: "/p-9.webp", alt: "Right Accent" }, 
];
const CENTERED_BW_IMAGE = "/p-6.webp"; 
const BIG_END_IMAGE = "/p-2.webp"; 

const QUOTES = [
  { text: "ALL MY NERVES WENT AWAY WHEN I MET JACOB AND I JUST FELT CALM AND SO LOVED." },
  { text: "MI VESTIDO FUE UN SUEÑO HECHO REALIDAD." }
];

export default function DeclarationsPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. IMPROVED LEAF PARALLAX
    const leaves = document.querySelectorAll(".leaf-overlay");
    leaves.forEach((leaf, i) => {
      gsap.to(leaf, {
        yPercent: 25 * (i + 1),
        rotation: i % 2 === 0 ? 15 : -15,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });
    });

    // 2. REVEAL ANIMATIONS
    const revealItems = document.querySelectorAll(".reveal-item");
    revealItems.forEach((item) => {
      // OPTIMIZATION: From 0 opacity to 1
      gsap.fromTo(item, 
        { y: 60, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
            trigger: item,
            start: "top 92%",
            },
        }
      );
    });
  }, { scope: container });

  return (
    <main ref={container} className="relative min-h-screen bg-bridal-ivory pt-32 pb-24 overflow-hidden">
      
      {/* --- LAYER 0: FILM GRAIN --- */}
      <div className="fixed inset-0 z-1 pointer-events-none opacity-[0.04] mix-blend-multiply bg-[url('/grain.png')] bg-repeat" />

      {/* --- LAYER 1: DAPPLED LEAF SYSTEM --- */}
      <div className="leaf-overlay absolute top-[2%] -left-32 w-150 h-150 z-20 pointer-events-none opacity-20 blur-md rotate-12 mix-blend-multiply">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>
      <div className="leaf-overlay absolute top-[20%] -right-40 w-200 h-200 z-20 pointer-events-none opacity-30 blur-[60px] -rotate-45 mix-blend-multiply">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>
      <div className="leaf-overlay absolute top-[40%] left-[-10%] w-175 h-175 z-20 pointer-events-none opacity-75 blur-xl rotate-90 mix-blend-multiply">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>
      <div className="leaf-overlay absolute top-[60%] right-[-10%] w-150 h-150 z-20 pointer-events-none opacity-50 blur-md -rotate-12 mix-blend-multiply">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10">
        
        {/* --- FIXED HEADER TITLE --- */}
        <div className="max-w-325 mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-40">
          <div className="reveal-item lg:col-span-5 pt-12 opacity-0">
            <div className="flex items-center gap-3 text-bridal-charcoal/60 mb-6">
               <Sparkles size={14} className="text-bridal-gold" />
               <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold">The Declarations</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] text-bridal-charcoal mb-10 leading-[1.05] tracking-tight uppercase">
               Find Your <br/>
               <span className="italic text-bridal-gold font-light lowercase">Inspiration.</span>
            </h1>
            <div className="w-16 h-px bg-bridal-gold mb-10" />
            <p className="font-sans text-base text-bridal-charcoal/70 leading-relaxed max-w-sm font-light">
               Browse a photo gallery of real brides showcasing our dresses, and see how they look in different venues, lighting and moments throughout the day.
            </p>
          </div>

          <div className="reveal-item lg:col-span-7 relative opacity-0">
             <div className="relative h-175 rounded-4xl overflow-hidden shadow-2xl border border-white/40">
                <Image 
                    src={HEADER_IMAGE} 
                    alt="Bride" 
                    fill 
                    className="object-cover" 
                    priority 
                    // OPTIMIZATION:
                    sizes="(max-width: 1024px) 100vw, 60vw"
                />
             </div>
          </div>
        </div>

        {/* --- TIGHT COLLAGE GRID --- */}
        <div className="max-w-325 mx-auto px-6 mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            
            {/* Column A */}
            <div className="flex flex-col gap-28">
              <div className="reveal-item max-w-sm border-l border-bridal-gold/30 pl-10 opacity-0">
                <p className="font-serif text-2xl md:text-3xl text-bridal-charcoal italic leading-relaxed">
                  &ldquo;{QUOTES[0].text}&rdquo;
                </p>
              </div>
              
              <div className="reveal-item relative w-full aspect-3/4 rounded-[2.5rem] overflow-hidden shadow-xl border border-white/60 opacity-0">
                 <Image src={COLLAGE_IMAGES[1].src} alt="Portrait 1" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>

              <div className="reveal-item relative w-[90%] aspect-square rounded-4xl overflow-hidden shadow-2xl ml-auto border border-white/60 opacity-0">
                 <Image src={COLLAGE_IMAGES[2].src} alt="Detail" fill className="object-cover" sizes="(max-width: 1024px) 80vw, 30vw" />
              </div>
            </div>

            {/* Column B */}
            <div className="flex flex-col gap-28 lg:pt-40">
              <div className="reveal-item relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/60 opacity-0">
                 <Image src={COLLAGE_IMAGES[0].src} alt="Landscape" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>

              <div className="reveal-item flex flex-col md:flex-row items-center gap-12 opacity-0">
                 <p className="font-serif text-xl text-bridal-charcoal/50 italic leading-snug text-right md:w-1/2 pr-6">
                    &ldquo;{QUOTES[1].text}&rdquo;
                 </p>
                 <div className="relative w-full md:w-1/2 aspect-3/4 rounded-4xl overflow-hidden shadow-xl border border-white/60">
                    <Image src={COLLAGE_IMAGES[3].src} alt="Portrait 2" fill className="object-cover" sizes="(max-width: 768px) 100vw, 20vw" />
                 </div>
              </div>

              {/* p-9.webp Accent Image */}
              <div className="reveal-item relative w-[80%] aspect-4/5 rounded-4xl overflow-hidden shadow-2xl mr-auto mt-4 border border-white/60 opacity-0">
                 <Image src={COLLAGE_IMAGES[4].src} alt="Accent" fill className="object-cover" sizes="(max-width: 768px) 80vw, 20vw" />
              </div>
            </div>

          </div>
        </div>

        {/* --- FOCUS POINT --- */}
        <div className="reveal-item max-w-md mx-auto mb-48 px-6 text-center opacity-0">
          <div className="relative aspect-3/4 rounded-t-full rounded-b-[4rem] overflow-hidden shadow-2xl border-16 border-white">
             <Image src={CENTERED_BW_IMAGE} alt="Focus" fill className="object-cover grayscale" sizes="(max-width: 768px) 100vw, 25vw" />
          </div>
          <span className="inline-block mt-10 font-sans text-[10px] uppercase tracking-[0.8em] text-bridal-charcoal/30 font-bold">
             In Pursuit of Perfection
          </span>
        </div>

        {/* --- ENDPIECE: THE CINEMATIC FRAME --- */}
      <div className="relative z-10 reveal-item max-w-6xl mx-auto px-6 mb-20 group opacity-0">
        <div className="relative w-full h-[70vh] rounded-[4rem] overflow-hidden shadow-2xl border-20 border-white">
          <Image src={BIG_END_IMAGE} alt="Final" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-black/5" />
        </div>
      </div>

      {/* --- SOCIAL MEDIA FOLLOW SECTION --- */}
      <div className="relative z-10 reveal-item flex flex-col items-center pb-32 px-6 opacity-0">
        
        {/* Decorative Divider Line */}
        <div className="w-px h-24 bg-linear-to-b from-bridal-gold to-transparent mb-12" />

        {/* Title */}
        <div className="text-center mb-10">
           <h3 className="font-serif text-4xl md:text-5xl text-bridal-charcoal mb-4">
              Follow Our <span className="italic text-bridal-gold">Journey.</span>
           </h3>
           <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-bridal-charcoal/40 font-bold">
              Stay connected with the Atelier
           </p>
        </div>

        {/* Social React Icons */}
        <div className="flex items-center gap-8 md:gap-12">
           
           {/* Instagram */}
           <Link 
             href="https://instagram.com" 
             target="_blank"
             className="group relative flex flex-col items-center gap-3 transition-all duration-500 hover:-translate-y-2"
           >
              <div className="w-16 h-16 rounded-full border border-bridal-charcoal/10 flex items-center justify-center bg-white/50 backdrop-blur-sm transition-all duration-500 group-hover:bg-bridal-gold group-hover:border-bridal-gold group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                 <Image 
                   src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" 
                   alt="Instagram" 
                   width={20} 
                   height={20} 
                   className="opacity-60 group-hover:opacity-100 group-hover:invert transition-all"
                 />
              </div>
              <span className="font-sans text-[9px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-40 transition-opacity">Instagram</span>
           </Link>

           {/* Facebook */}
           <Link 
             href="https://facebook.com" 
             target="_blank"
             className="group relative flex flex-col items-center gap-3 transition-all duration-500 hover:-translate-y-2"
           >
              <div className="w-16 h-16 rounded-full border border-bridal-charcoal/10 flex items-center justify-center bg-white/50 backdrop-blur-sm transition-all duration-500 group-hover:bg-[#1877F2] group-hover:border-[#1877F2] group-hover:shadow-[0_0_30px_rgba(24,119,242,0.3)]">
                 <Image 
                   src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg" 
                   alt="Facebook" 
                   width={20} 
                   height={20} 
                   className="opacity-60 group-hover:opacity-100 group-hover:invert transition-all"
                 />
              </div>
              <span className="font-sans text-[9px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-40 transition-opacity">Facebook</span>
           </Link>

           {/* TikTok */}
           <Link 
             href="https://tiktok.com" 
             target="_blank"
             className="group relative flex flex-col items-center gap-3 transition-all duration-500 hover:-translate-y-2"
           >
              <div className="w-16 h-16 rounded-full border border-bridal-charcoal/10 flex items-center justify-center bg-white/50 backdrop-blur-sm transition-all duration-500 group-hover:bg-black group-hover:border-black group-hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                 <Image 
                   src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tiktok.svg" 
                   alt="TikTok" 
                   width={20} 
                   height={20} 
                   className="opacity-60 group-hover:opacity-100 group-hover:invert transition-all"
                 />
              </div>
              <span className="font-sans text-[9px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-40 transition-opacity">TikTok</span>
           </Link>

        </div>

        {/* Branding Detail */}
        <div className="mb-20 flex items-center gap-4 opacity-10">
           <div className="w-12 h-px bg-bridal-charcoal" />
           <div className="w-2 h-2 rotate-45 bg-bridal-charcoal" />
           <div className="w-12 h-px bg-bridal-charcoal" />
        </div>
      </div>

        

      </div>
    </main>
  );
}