"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import PageHero from "@/components/global/PageHero";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Form Field Reveal (Staggered)
    gsap.from(".form-field", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".contact-form-section",
        start: "top 70%",
      }
    });

    // 2. Info Block Reveal
    gsap.from(".info-item", {
       x: -30,
       opacity: 0,
       duration: 1,
       stagger: 0.2,
       ease: "power2.out",
       scrollTrigger: {
          trigger: ".contact-info-section",
          start: "top 80%",
       }
    });

    // 3. The "Signature" Line Animation (The Pen Stroke)
    gsap.fromTo(".signature-line",
      { strokeDasharray: 600, strokeDashoffset: 600 },
      {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-form-section",
          start: "top 60%",
        }
      }
    );

    // 4. Floating Stamp Animation
    gsap.to(".contact-float", {
       y: 15,
       rotation: 3,
       duration: 6,
       repeat: -1,
       yoyo: true,
       ease: "sine.inOut"
    });

  }, { scope: container });

  return (
    <main ref={container} className="bg-bridal-ivory min-h-screen pb-0 text-bridal-charcoal overflow-hidden">

      {/* 1. HERO */}
      <PageHero
        title="Begin The Conversation"
        subtitle="Inquiries & Appointments"
        image="/book.webp" // Sketch/Paper vibe image
      />

      <section className="relative py-32 px-6 max-w-7xl mx-auto">
         {/* Background Glow */}
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-bridal-sage/5 rounded-full blur-[100px] pointer-events-none" />

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">

            {/* --- LEFT: CONTACT INFO (The 'Info Card') --- */}
            <div className="contact-info-section space-y-16">
               <div className="info-item">
                  <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block">
                     Visit The Atelier
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl mb-8">
                     By Appointment <br/> <span className="italic text-bridal-gold/90">Only</span>
                  </h2>
                  <p className="font-sans text-base leading-loose text-bridal-charcoal/70 mb-8 max-w-md">
                     To ensure privacy and undivided attention for every bride, our atelier is open exclusively for scheduled consultations.
                  </p>
               </div>

               <div className="space-y-8">
                  <div className="info-item flex gap-6 items-start group">
                     <div className="w-12 h-12 rounded-full border border-bridal-charcoal/10 flex items-center justify-center text-bridal-sage group-hover:bg-bridal-sage group-hover:text-white transition-colors duration-500">
                        <MapPin size={20} />
                     </div>
                     <div>
                        <h4 className="font-serif text-xl mb-2">The Address</h4>
                        <p className="font-sans text-sm text-bridal-charcoal/60 leading-relaxed">
                           123 Couture Blvd, Fashion District<br/>
                           New York, NY 10012
                        </p>
                     </div>
                  </div>

                  <div className="info-item flex gap-6 items-start group">
                     <div className="w-12 h-12 rounded-full border border-bridal-charcoal/10 flex items-center justify-center text-bridal-sage group-hover:bg-bridal-sage group-hover:text-white transition-colors duration-500">
                        <Mail size={20} />
                     </div>
                     <div>
                        <h4 className="font-serif text-xl mb-2">Direct Inquiries</h4>
                        <p className="font-sans text-sm text-bridal-charcoal/60 leading-relaxed">
                           hello@bridalatelier.com<br/>
                           press@bridalatelier.com
                        </p>
                     </div>
                  </div>

                  <div className="info-item flex gap-6 items-start group">
                     <div className="w-12 h-12 rounded-full border border-bridal-charcoal/10 flex items-center justify-center text-bridal-sage group-hover:bg-bridal-sage group-hover:text-white transition-colors duration-500">
                        <Phone size={20} />
                     </div>
                     <div>
                        <h4 className="font-serif text-xl mb-2">Concierge</h4>
                        <p className="font-sans text-sm text-bridal-charcoal/60 leading-relaxed">
                           +1 (555) 012-3456<br/>
                           Mon - Sat, 9am - 6pm
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* --- RIGHT: THE FORM (Stationery/Letter Style) --- */}
            <div className="contact-form-section relative bg-white p-8 md:p-16 rounded-[2rem] shadow-2xl shadow-bridal-charcoal/5 border border-bridal-charcoal/5">
               {/* Decorative 'Wax Seal' Stamp */}
               <div className="contact-float absolute -top-6 -right-6 w-24 h-24 bg-bridal-sage rounded-full flex items-center justify-center shadow-lg text-white z-10 rotate-12">
                   <div className="text-center">
                      <span className="block font-serif text-xs italic">Est.</span>
                      <span className="block font-serif text-xl">2024</span>
                   </div>
               </div>

               <h3 className="font-serif text-3xl mb-2">Request Consultation</h3>
               <p className="font-sans text-xs uppercase tracking-widest text-bridal-charcoal/50 mb-12">Please allow 24-48 hours for a response</p>

               {/* The Signature SVG Line */}
               <div className="absolute top-32 left-8 w-1/2 h-10 pointer-events-none opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 200 50" fill="none">
                      <path className="signature-line" d="M0,25 Q50,0 100,25 T200,25" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
                  </svg>
               </div>

               <form className="space-y-10 relative z-10">
                  {/* Name Input */}
                  <div className="form-field group">
                     <label className="block font-sans text-xs uppercase tracking-widest text-bridal-charcoal/60 mb-2 group-focus-within:text-bridal-sage transition-colors">Full Name</label>
                     <input type="text" className="w-full bg-transparent border-b border-bridal-charcoal/20 py-2 font-serif text-xl focus:outline-none focus:border-bridal-sage transition-colors placeholder:text-bridal-charcoal/20" placeholder="Jane Doe" />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="form-field group">
                        <label className="block font-sans text-xs uppercase tracking-widest text-bridal-charcoal/60 mb-2 group-focus-within:text-bridal-sage transition-colors">Email Address</label>
                        <input type="email" className="w-full bg-transparent border-b border-bridal-charcoal/20 py-2 font-serif text-xl focus:outline-none focus:border-bridal-sage transition-colors placeholder:text-bridal-charcoal/20" placeholder="jane@example.com" />
                     </div>
                     <div className="form-field group">
                        <label className="block font-sans text-xs uppercase tracking-widest text-bridal-charcoal/60 mb-2 group-focus-within:text-bridal-sage transition-colors">Phone Number</label>
                        <input type="tel" className="w-full bg-transparent border-b border-bridal-charcoal/20 py-2 font-serif text-xl focus:outline-none focus:border-bridal-sage transition-colors placeholder:text-bridal-charcoal/20" placeholder="+1 (555) 000-0000" />
                     </div>
                  </div>

                  {/* Date & Service Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="form-field group">
                        <label className="block font-sans text-xs uppercase tracking-widest text-bridal-charcoal/60 mb-2 group-focus-within:text-bridal-sage transition-colors">Wedding Date</label>
                        <input type="date" className="w-full bg-transparent border-b border-bridal-charcoal/20 py-2 font-serif text-xl focus:outline-none focus:border-bridal-sage transition-colors text-bridal-charcoal/80" />
                     </div>
                     <div className="form-field group">
                        <label className="block font-sans text-xs uppercase tracking-widest text-bridal-charcoal/60 mb-2 group-focus-within:text-bridal-sage transition-colors">Service Interest</label>
                        <select className="w-full bg-transparent border-b border-bridal-charcoal/20 py-2 font-serif text-xl focus:outline-none focus:border-bridal-sage transition-colors text-bridal-charcoal/80">
                           <option>Bespoke Couture</option>
                           <option>Bridal Alterations</option>
                           <option>Heirloom Restoration</option>
                           <option>Bridal Beauty / Artistry</option>
                           <option>Other</option>
                        </select>
                     </div>
                  </div>

                  {/* Message Input */}
                  <div className="form-field group">
                     <label className="block font-sans text-xs uppercase tracking-widest text-bridal-charcoal/60 mb-2 group-focus-within:text-bridal-sage transition-colors">Your Vision / Message</label>
                     <textarea rows={3} className="w-full bg-transparent border-b border-bridal-charcoal/20 py-2 font-serif text-xl focus:outline-none focus:border-bridal-sage transition-colors placeholder:text-bridal-charcoal/20 resize-none" placeholder="Tell us about your dream dress..." />
                  </div>

                  {/* Submit Button */}
                  <div className="form-field pt-6">
                     <button type="button" className="w-full bg-bridal-charcoal text-white py-4 rounded-full text-xs uppercase tracking-widest hover:bg-bridal-sage transition-colors duration-500 flex items-center justify-center gap-2">
                        Send Request <Send size={16} />
                     </button>
                  </div>
               </form>
            </div>

         </div>
      </section>

      {/* 2. MAP/LOCATION (Full Width, Cinematic) */}
      <section className="relative w-full h-[50vh] bg-bridal-charcoal overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-40 grayscale">
             {/* Note: In a real project, use a map image or embed here. Using a placeholder for the vibe. */}
             <Image src="/wail.webp" alt="Location Map" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/30" />
          
          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-center text-white">
              <h3 className="font-serif text-3xl mb-2">New York Flagship</h3>
              <p className="font-sans text-xs uppercase tracking-widest opacity-80">Fashion District</p>
              <button className="mt-6 px-6 py-2 bg-white text-bridal-charcoal rounded-full text-[10px] uppercase tracking-widest hover:bg-bridal-sage hover:text-white transition-colors">
                  Get Directions
              </button>
          </div>
      </section>

    </main>
  );
}