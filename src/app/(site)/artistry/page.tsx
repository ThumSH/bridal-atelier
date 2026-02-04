"use client";

import { useRef } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, Camera } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Configuration
const ARTISTRY_SERVICES = [
  {
    id: "01",
    title: "Couture Makeup",
    subtitle: "Light-Sculpting & Skin Architecture",
    desc: "Our makeup artistry is a masterclass in light-sculpting and skin architecture. We move away from standard application to a process of custom-blending pigments that mirror your biological undertones. Utilizing high-definition technology, we create a second-skin finish that appears flawless under the glare of professional flash. Every stroke is a deliberate act of engineering, designed to remain unshakeable.",
    mainImage: "/p-11.webp",
    gallery: ["/m-1.webp", "/m-2.webp", "/m-3.webp"]
  },
  {
    id: "02",
    title: "Haute Coiffure",
    subtitle: "Structural Movement & Security",
    desc: "Bridal hair is the structural crown of your silhouette. We approach styling with a focus on mathematical symmetry and structural integrity. From the meticulous priming of the hair shaft to the anchor-point setting that secures heavy veils and heirloom jewelry, our coiffure is built to endure. We ensure your look is locked in a humidity-proof embrace.",
    mainImage: "/test.jpeg",
    gallery: ["/m-4.webp", "/m-5.webp", "/m-6.webp"]
  },
  {
    id: "03",
    title: "Heirloom Embroidery",
    subtitle: "The Detail Atelier",
    desc: "The Bonitha embroidery atelier is where fabric becomes a canvas for your personal history. Our master artisans dedicate hundreds of collective hours to a single piece, employing ancient hand-stitching techniques. We utilize real gold thread, freshwater pearls, and intricate zardosi work to create textures rich in story and weight—a wearable heirloom tailored with a mathematical focus.",
    mainImage: "/m-x.webp",
    gallery: ["/m-7.webp", "/m-8.webp", "/m-9.webp"]
  },
  {
    id: "04",
    title: "Skin Artistry",
    subtitle: "Acne & Texture Refinement",
    desc: "True beauty begins with a healthy canvas. For brides struggling with acne, hyperpigmentation, or uneven texture, we offer a specialized protocol that balances high-coverage concealment with medical-grade breathability. We do not believe in masking; we believe in refining. Our techniques ensure that even the most textured skin appears smooth and radiant, providing unshakeable confidence.",
    mainImage: "/m-10.webp",
    gallery: ["/m-11.webp", "/m-12.webp", "/m-13.webp"],
    isClinical: true
  }
];

export default function ArtistryPage() {
  const container = useRef<HTMLDivElement>(null);
  const masterVideoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    // 1. Header Line Animation (New)
    gsap.fromTo(".header-line-path", 
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 2.5, ease: "power3.out", delay: 0.2 }
    );

    gsap.from(".header-desc", {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 1,
      ease: "power2.out"
    });

    // 2. Dappled Light Parallax
    gsap.to(".service-leaf", {
      yPercent: 30,
      rotation: 10,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // 3. Master Hero Video Reveal
    gsap.from(".master-hero-frame", {
      scale: 0.95,
      opacity: 0,
      duration: 1.8,
      ease: "power4.out"
    });

    // 4. Staggered Service Reveal
    const reveals = document.querySelectorAll(".service-section");
    reveals.forEach((section) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        }
      });

      tl.from(section.querySelectorAll(".anim-up"), {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      })
      .fromTo(section.querySelector(".rope-path"), 
        { strokeDasharray: 400, strokeDashoffset: 400, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 2, ease: "power2.inOut" },
        "-=1"
      );
    });
  }, { scope: container });

  return (
    <main ref={container} className="relative min-h-screen bg-bridal-ivory pt-28 pb-48 overflow-hidden">
      
      {/* --- ATMOSPHERIC LAYERS --- */}
      <div className="floating-leaf absolute top-[5%] -left-32 w-[600px] h-[600px] opacity-20 blur-2xl mix-blend-multiply z-0 pointer-events-none">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>

      <div className="floating-leaf absolute top-[25%] -right-40 w-[700px] h-[700px] opacity-30 blur-sm mix-blend-multiply z-0 pointer-events-none rotate-90">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>

      <div className="floating-leaf absolute top-[30%] -left-20 w-[550px] h-[550px] opacity-20 blur-sm mix-blend-multiply z-0 pointer-events-none -rotate-45">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>

      <div className="floating-leaf absolute top-[40%] -right-20 w-[550px] h-[550px] opacity-10 blur-sm mix-blend-multiply z-0 pointer-events-none -rotate-5">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>

      <div className="floating-leaf absolute bottom-[5%] -right-32 w-[650px] h-[650px] opacity-25 blur-sm mix-blend-multiply z-0 pointer-events-none">
        <Image src="/leaves.webp" alt="" fill className="object-contain" />
      </div>


      {/* --- 1. NEW HEADER SECTION (With Golden Thread) --- */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 mb-24">
        
        {/* GOLDEN THREAD SVG */}
        <svg 
            className="absolute top-[-50px] left-0 w-full h-[140%] pointer-events-none z-0 overflow-visible opacity-60" 
            viewBox="0 0 1000 400" 
            preserveAspectRatio="none"
        >
            <path 
                className="header-line-path"
                d="M-50,150 C150,50 300,250 500,100 S 800,20 950,150" 
                fill="none" 
                stroke="#C5A059" 
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
            />
        </svg>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Title Block */}
            <div className="lg:col-span-8">
                <div className="flex items-center gap-3 text-bridal-gold mb-8">
                    <Sparkles size={16} />
                    <span className="font-sans text-[11px] uppercase tracking-[0.5em] font-bold">The Master Showcase</span>
                </div>
                <h1 className="font-serif text-6xl md:text-[9rem] text-bridal-charcoal uppercase tracking-tighter leading-[0.8]">
                    Sculpted <br/> <span className="italic text-bridal-gold font-light lowercase">Radiance.</span>
                </h1>
            </div>

            {/* Description Block */}
            <div className="lg:col-span-4 header-desc pb-4 pl-2 lg:pl-0 border-l lg:border-l-0 border-bridal-gold/30">
                <p className="font-sans text-base md:text-lg text-bridal-charcoal/70 leading-relaxed font-light">
                    Where the precision of science meets the intuition of art. A curated anthology of transformations designed to withstand the lens, the light, and the emotion of the moment.
                </p>
            </div>
        </div>
      </section>

      {/* --- 2. THE CINEMATIC HERO (Left: Narrative | Right: Portrait Video) --- */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* --- LEFT: NARRATIVE (Removed duplicate H1, kept pure narrative) --- */}
          <div className="lg:col-span-6 reveal-item">
            <div className="flex items-center gap-3 text-bridal-gold mb-8">
               <Sparkles size={16} />
               <span className="font-sans text-[10px] uppercase tracking-[0.6em] font-bold">The Signature Soul</span>
            </div>
            
            <div className="space-y-8 max-w-xl">
              <p className="font-sans text-base md:text-lg text-bridal-charcoal/70 leading-relaxed font-light first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-bridal-gold">
                For over 25 years, the Bonitha Atelier has operated at the intersection of classical beauty and modern engineering. We do not simply follow trends; we study the unique architecture of the face and the physics of the silhouette. Every brushstroke is an act of precision, and every draping of fabric is a calculated decision to ensure your unshakeable confidence.
              </p>
              <p className="font-sans text-sm text-bridal-charcoal/50 leading-loose uppercase tracking-widest">
                The following anthology is a curation of our most complex transformations—a digital study of light, texture, and structural movement.
              </p>
            </div>
          </div>

          {/* --- RIGHT: THE PORTRAIT VIDEO (Unchanged dimensions/position) --- */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="master-hero-frame relative w-[100%] md:w-[65%] lg:w-[80%] aspect-[3/4] bg-bridal-charcoal border-[12px] md:border-[20px] border-white shadow-2xl overflow-hidden group">
               <video 
                  ref={masterVideoRef}
                  autoPlay muted loop playsInline 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-[2s]"
               >
                  <source src="/m-vid-2.mp4" type="video/mp4" />
               </video>
               
               <div className="absolute inset-0 bg-black/5" />
               
               {/* Internal Detail Badge */}
               <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2">
                  <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-white font-bold">Vol. 2026 Archive</span>
               </div>
               
               <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/60">
                  <div className="w-10 h-px bg-white/40" />
                  <span className="font-sans text-[9px] uppercase tracking-widest font-bold">Artistry in Motion</span>
                  <div className="w-10 h-px bg-white/40" />
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- 3. THE SERVICES LIST --- */}
      <div className="relative z-10 space-y-72 lg:space-y-96">
        {ARTISTRY_SERVICES.map((service, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <section key={service.id} className="service-section max-w-[1500px] mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">
                
                {/* TEXT NARRATIVE */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className={`anim-up ${!isEven ? 'lg:pl-12' : 'lg:pr-12'}`}>
                    <span className="font-serif text-4xl text-bridal-gold/30 mb-8 block">{service.id}</span>
                    
                    <div className="relative mb-14">
                      <h2 className="font-serif text-5xl md:text-8xl text-bridal-charcoal leading-none uppercase tracking-tighter">
                         {service.title.split(' ')[0]} <br/>
                         <span className="italic text-bridal-gold font-light lowercase">{service.title.split(' ').slice(1).join(' ')}</span>
                      </h2>
                      <svg className="absolute -bottom-8 left-0 w-72 h-12 pointer-events-none" viewBox="0 0 250 40">
                        <path className="rope-path text-bridal-gold" d="M2 20C50 40 150 45 248 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
                      </svg>
                    </div>

                    <div className="space-y-8 mb-14">
                        <div className="flex items-center gap-4">
                           <div className="w-8 h-px bg-bridal-gold" />
                           <p className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-charcoal font-bold">{service.subtitle}</p>
                        </div>
                        {service.isClinical && (
                        <div className="flex items-center gap-3 text-bridal-charcoal/40 mb-4">
                            <ShieldCheck size={16} />
                            <span className="font-sans text-[9px] uppercase tracking-widest font-bold">Clinical Precision</span>
                        </div>
                        )}
                        <p className="font-sans text-base text-bridal-charcoal/70 leading-relaxed font-light first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-bridal-gold">
                           {service.desc}
                        </p>
                    </div>

                    <button className="flex items-center gap-6 text-bridal-charcoal group">
                      <span className="font-sans text-[11px] uppercase tracking-[0.4em] font-bold border-b-2 border-bridal-gold pb-2 group-hover:pr-8 transition-all duration-500">Request a Consultation</span>
                      <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                  </div>
                </div>

                {/* IMAGE CLUSTER */}
                <div className={`lg:col-span-7 flex flex-col ${isEven ? 'lg:order-2 items-center lg:items-end' : 'lg:order-1 items-center lg:items-start'}`}>
                  
                  {/* Main Service Image */}
                  <div className="anim-up relative w-[85%] md:w-[75%] aspect-[3/4] bg-bridal-charcoal border-[12px] md:border-[20px] border-white shadow-2xl overflow-hidden mb-12 group">
                    <Image 
                        src={service.mainImage} 
                        alt={service.title} 
                        fill 
                        className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                    />
                    <div className="absolute top-6 right-6 text-white/40">
                       <Camera size={12} />
                    </div>
                  </div>

                  {/* Detail Grid */}
                  <div className="grid grid-cols-3 gap-4 md:gap-6 w-[85%] md:w-[75%] h-32 md:h-48">
                    {service.gallery.map((src, i) => (
                      <div key={i} className="anim-up relative h-full w-full bg-bridal-charcoal border-[4px] md:border-[8px] border-white shadow-xl overflow-hidden group">
                        <Image src={src} alt="Detail" fill className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>

        <section className="relative z-10 max-w-[900px] mx-auto px-6 text-center border-t border-bridal-charcoal/10 pt-24 pb-12">
        <div className="flex items-center justify-center gap-3 text-bridal-gold mb-8">
            <Sparkles size={16} />
            <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold">The Coda</span>
        </div>
        <h3 className="font-serif text-4xl md:text-5xl text-bridal-charcoal mb-8">
            The Unified <span className="italic text-bridal-gold">Vision.</span>
        </h3>
        <p className="font-sans text-base md:text-lg text-bridal-charcoal/70 leading-loose font-light">
            We do not see a bride in fragments. The arch of the brow must speak to the drape of the silk; the architecture of the hair must honor the neckline of the gown. This is a complete ecosystem of beauty, where every service we offer—from the clinical preparation of the skin to the final stitch of gold thread—is harmonized to create a singular, breathless moment.
        </p>
        <div className="mt-12">
            <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-bridal-charcoal/40 font-bold">Bonitha Atelier • Est. 1995</span>
        </div>
      </section>

    </main>
  );
}