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
    // 1. Form Field Reveal
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

    // 3. Signature Line (Draws itself)
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

    // 4. Floating Stamp (Stabilized - No Rotation)
    gsap.to(".contact-float", {
       y: 10,
       duration: 4,
       repeat: -1,
       yoyo: true,
       ease: "sine.inOut"
    });

  }, { scope: container });

  return (
    <main ref={container} className="bg-bridal-ivory min-h-screen pb-0 text-bridal-charcoal overflow-hidden">

      <PageHero
        title="Begin The Conversation"
        subtitle="Inquiries & Appointments"
        image="/book.webp" 
      />

      <section className="relative py-32 px-6 max-w-7xl mx-auto">
         {/* Living Background Glow */}
         <div className="absolute top-0 right-0 w-150 h-150 bg-bridal-sage/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">

            {/* --- LEFT: CONTACT INFO --- */}
            <div className="contact-info-section space-y-16">
               <div className="info-item">
                  <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-6 block">
                     Visit The Atelier
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
                     By Appointment <br/> <span className="italic text-bridal-gold/90 drop-shadow-sm">Only</span>
                  </h2>
                  <p className="font-sans text-base leading-loose text-bridal-charcoal/70 mb-8 max-w-md">
                     To ensure privacy and undivided attention for every bride, our atelier is open exclusively for scheduled consultations.
                  </p>
               </div>

               <div className="space-y-8">
                  {[
                      { Icon: MapPin, title: "The Address", text: "123 Couture Blvd, Fashion District\nNew York, NY 10012" },
                      { Icon: Mail, title: "Direct Inquiries", text: "hello@bonitha.co\npress@bonitha.co" },
                      { Icon: Phone, title: "Concierge", text: "+1 (555) 012-3456\nMon - Sat, 9am - 6pm" }
                  ].map((item, idx) => (
                      <div key={idx} className="info-item flex gap-6 items-start group cursor-default">
                        <div className="w-12 h-12 rounded-full border border-bridal-charcoal/10 flex items-center justify-center text-bridal-sage group-hover:bg-bridal-sage group-hover:text-white group-hover:shadow-[0_0_15px_rgba(138,154,91,0.4)] transition-all duration-500">
                            <item.Icon size={20} />
                        </div>
                        <div>
                            <h4 className="font-serif text-xl mb-2 group-hover:text-bridal-sage transition-colors">{item.title}</h4>
                            <p className="font-sans text-sm text-bridal-charcoal/60 leading-relaxed whitespace-pre-line">
                                {item.text}
                            </p>
                        </div>
                      </div>
                  ))}
               </div>
            </div>

            {/* --- RIGHT: THE FORM (Stationery Style) --- */}
            <div className="contact-form-section relative bg-white p-8 md:p-16 rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-bridal-charcoal/5">
               {/* Floating Stamp */}
               <div className="contact-float absolute -top-6 -right-6 w-24 h-24 bg-bridal-sage rounded-full flex items-center justify-center shadow-lg text-white z-10 border-4 border-white">
                   <div className="text-center">
                      <span className="block font-serif text-xs italic">Est.</span>
                      <span className="block font-serif text-xl">2024</span>
                   </div>
               </div>

               <h3 className="font-serif text-3xl mb-2">Request Consultation</h3>
               <p className="font-sans text-xs uppercase tracking-widest text-bridal-charcoal/50 mb-12">Please allow 24-48 hours for a response</p>

               {/* Background Signature Line */}
               <div className="absolute top-32 left-8 w-1/2 h-10 pointer-events-none opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 200 50" fill="none">
                      <path className="signature-line" d="M0,25 Q50,0 100,25 T200,25" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
                  </svg>
               </div>

               <form className="space-y-10 relative z-10">
                  {/* Name Input */}
                  <div className="form-field group">
                     <label className="block font-sans text-xs uppercase tracking-widest text-bridal-charcoal/60 mb-2 group-focus-within:text-bridal-sage transition-colors">Full Name</label>
                     <input type="text" className="w-full bg-transparent border-b border-bridal-charcoal/20 py-2 font-serif text-xl focus:outline-none focus:border-bridal-sage focus:shadow-[0_10px_20px_-10px_rgba(138,154,91,0.2)] transition-all placeholder:text-bridal-charcoal/20" placeholder="Jane Doe" />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="form-field group">
                        <label className="block font-sans text-xs uppercase tracking-widest text-bridal-charcoal/60 mb-2 group-focus-within:text-bridal-sage transition-colors">Email Address</label>
                        <input type="email" className="w-full bg-transparent border-b border-bridal-charcoal/20 py-2 font-serif text-xl focus:outline-none focus:border-bridal-sage focus:shadow-[0_10px_20px_-10px_rgba(138,154,91,0.2)] transition-all placeholder:text-bridal-charcoal/20" placeholder="jane@example.com" />
                     </div>
                     <div className="form-field group">
                        <label className="block font-sans text-xs uppercase tracking-widest text-bridal-charcoal/60 mb-2 group-focus-within:text-bridal-sage transition-colors">Phone Number</label>
                        <input type="tel" className="w-full bg-transparent border-b border-bridal-charcoal/20 py-2 font-serif text-xl focus:outline-none focus:border-bridal-sage focus:shadow-[0_10px_20px_-10px_rgba(138,154,91,0.2)] transition-all placeholder:text-bridal-charcoal/20" placeholder="+1 (555) 000-0000" />
                     </div>
                  </div>

                  {/* Date & Service */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="form-field group">
                        <label className="block font-sans text-xs uppercase tracking-widest text-bridal-charcoal/60 mb-2 group-focus-within:text-bridal-sage transition-colors">Wedding Date</label>
                        <input type="date" className="w-full bg-transparent border-b border-bridal-charcoal/20 py-2 font-serif text-xl focus:outline-none focus:border-bridal-sage focus:shadow-[0_10px_20px_-10px_rgba(138,154,91,0.2)] transition-all text-bridal-charcoal/80" />
                     </div>
                     <div className="form-field group">
                        <label className="block font-sans text-xs uppercase tracking-widest text-bridal-charcoal/60 mb-2 group-focus-within:text-bridal-sage transition-colors">Service Interest</label>
                        <select className="w-full bg-transparent border-b border-bridal-charcoal/20 py-2 font-serif text-xl focus:outline-none focus:border-bridal-sage focus:shadow-[0_10px_20px_-10px_rgba(138,154,91,0.2)] transition-all text-bridal-charcoal/80">
                           <option>Bespoke Couture</option>
                           <option>Bridal Alterations</option>
                           <option>Heirloom Restoration</option>
                           <option>Bridal Beauty / Artistry</option>
                           <option>Other</option>
                        </select>
                     </div>
                  </div>

                  {/* Message */}
                  <div className="form-field group">
                     <label className="block font-sans text-xs uppercase tracking-widest text-bridal-charcoal/60 mb-2 group-focus-within:text-bridal-sage transition-colors">Your Vision</label>
                     <textarea rows={3} className="w-full bg-transparent border-b border-bridal-charcoal/20 py-2 font-serif text-xl focus:outline-none focus:border-bridal-sage focus:shadow-[0_10px_20px_-10px_rgba(138,154,91,0.2)] transition-all placeholder:text-bridal-charcoal/20 resize-none" placeholder="Tell us about your dream dress..." />
                  </div>

                  {/* Submit Button */}
                  <div className="form-field pt-6">
                     <button type="button" className="w-full bg-bridal-charcoal text-white py-4 rounded-full text-xs uppercase tracking-widest hover:bg-bridal-sage hover:shadow-[0_0_20px_rgba(138,154,91,0.4)] transition-all duration-500 flex items-center justify-center gap-2">
                        Send Request <Send size={16} />
                     </button>
                  </div>
               </form>
            </div>

         </div>
      </section>

      {/* 2. MAP (Cinematic) */}
      <section className="relative w-full h-[50vh] bg-bridal-charcoal overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-40 grayscale">
             <Image src="/wail.webp" alt="Location Map" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/30" />
          
          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-center text-white shadow-2xl">
              <h3 className="font-serif text-3xl mb-2 drop-shadow-md">Galle Flagship</h3>
              <p className="font-sans text-xs uppercase tracking-widest opacity-80">Fashion District</p>
              <button className="mt-6 px-6 py-2 bg-white text-bridal-charcoal rounded-full text-[10px] uppercase tracking-widest hover:bg-bridal-sage hover:text-white transition-colors hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                  Get Directions
              </button>
          </div>
      </section>

    </main>
  );
}