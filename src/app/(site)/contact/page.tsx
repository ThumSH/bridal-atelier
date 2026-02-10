/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MoveRight, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const container = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    message: ""
  });

  useGSAP(() => {
    // 1. Image Reveal (Curtain Effect)
    gsap.fromTo(".contact-img-reveal",
      { clipPath: "inset(0% 100% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut" }
    );

    // 2. Header Line Animation
    gsap.fromTo(".header-line-path", 
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 2.0, ease: "power3.out", delay: 0.2 }
    );

    // 3. Form Content Stagger
    gsap.from(".contact-anim", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.5
    });
  }, { scope: container });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here (e.g., EmailJS or API)
    console.log("Form Submitted", formState);
  };

  return (
    <main ref={container} className="relative min-h-screen bg-bridal-ivory pt-32 pb-20 md:pt-40 md:pb-32 px-6">
      
      {/* Background Noise */}
      <div className="fixed inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

      <div className="max-w-350 mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* --- LEFT: THE VISUAL (Sticky) --- */}
        <div className="relative h-[60vh] lg:h-[80vh] w-full lg:sticky lg:top-32">
           <div className="contact-img-reveal relative w-full h-full rounded-4xl overflow-hidden shadow-2xl">
              <Image 
                src="/p-22.webp" // A strong portrait image works best here
                alt="Book Your Appointment" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/10" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-xl border border-white/30 p-6 rounded-xl text-white max-w-xs">
                 <p className="font-serif text-2xl italic mb-2">"Beauty is the promise of happiness."</p>
                 <p className="font-sans text-[10px] uppercase tracking-widest opacity-80">— Stendhal</p>
              </div>
           </div>
        </div>


        {/* --- RIGHT: THE FORM & DETAILS --- */}
        <div className="flex flex-col justify-center pt-8 lg:pt-0">
          
          <div className="mb-12 relative">
            {/* GOLDEN THREAD SVG */}
            <svg 
                className="absolute -top-10 -left-20 w-[140%] h-[200%] pointer-events-none z-0 opacity-30 overflow-visible" 
                viewBox="0 0 400 100" 
                fill="none"
                preserveAspectRatio="none"
            >
                <path 
                    className="header-line-path"
                    d="M0,80 C100,20 200,100 400,10" 
                    stroke="#D4AF37" 
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>

            <div className="contact-anim flex items-center gap-3 mb-4 relative z-10">
               <span className="h-px w-8 bg-bridal-gold"></span>
               <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-bridal-sage font-bold">
                 Reservations
               </span>
            </div>
            <h1 className="contact-anim font-serif text-5xl md:text-7xl text-bridal-charcoal mb-6 relative z-10">
               Begin Your <span className="italic text-bridal-gold">Journey.</span>
            </h1>
            <p className="contact-anim font-sans text-sm text-bridal-charcoal/60 leading-relaxed max-w-md relative z-10">
               Whether for a bridal consultation or a couture cut, appointments are essential. Please fill out the form below, and our concierge will confirm your slot within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 mb-20">
            {/* Name & Email Row */}
            <div className="grid md:grid-cols-2 gap-8">
               <div className="contact-anim group">
                  <label className="block font-sans text-[9px] uppercase tracking-widest text-bridal-charcoal/50 mb-2 group-focus-within:text-bridal-gold transition-colors">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-bridal-charcoal/20 py-3 text-lg font-serif text-bridal-charcoal focus:outline-none focus:border-bridal-gold transition-colors placeholder:text-bridal-charcoal/20 hover:border-bridal-charcoal/40"
                    placeholder="Jane Doe"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
               </div>
               <div className="contact-anim group">
                  <label className="block font-sans text-[9px] uppercase tracking-widest text-bridal-charcoal/50 mb-2 group-focus-within:text-bridal-gold transition-colors">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-bridal-charcoal/20 py-3 text-lg font-serif text-bridal-charcoal focus:outline-none focus:border-bridal-gold transition-colors placeholder:text-bridal-charcoal/20 hover:border-bridal-charcoal/40"
                    placeholder="jane@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
               </div>
            </div>

            {/* Service & Date Row */}
            <div className="grid md:grid-cols-2 gap-8">
               <div className="contact-anim group relative">
                  <label className="block font-sans text-[9px] uppercase tracking-widest text-bridal-charcoal/50 mb-2 group-focus-within:text-bridal-gold transition-colors">Service Interest</label>
                  <select 
                    className="w-full bg-transparent border-b border-bridal-charcoal/20 py-3 text-lg font-serif text-bridal-charcoal focus:outline-none focus:border-bridal-gold transition-colors appearance-none cursor-pointer hover:border-bridal-charcoal/40"
                    value={formState.service}
                    onChange={(e) => setFormState({...formState, service: e.target.value})}
                  >
                     <option value="" disabled>Select a Service</option>
                     <option value="Bridal">Bridal Consultation</option>
                     <option value="Hair">Couture Hair Styling</option>
                     <option value="Makeup">Makeup Artistry</option>
                     <option value="Other">Other Inquiry</option>
                  </select>
               </div>
               <div className="contact-anim group">
                  <label className="block font-sans text-[9px] uppercase tracking-widest text-bridal-charcoal/50 mb-2 group-focus-within:text-bridal-gold transition-colors">Preferred Date</label>
                  <input 
                    type="date" 
                    className="w-full bg-transparent border-b border-bridal-charcoal/20 py-3 text-lg font-serif text-bridal-charcoal focus:outline-none focus:border-bridal-gold transition-colors placeholder:text-bridal-charcoal/20 hover:border-bridal-charcoal/40"
                    value={formState.date}
                    onChange={(e) => setFormState({...formState, date: e.target.value})}
                  />
               </div>
            </div>

            {/* Message */}
            <div className="contact-anim group">
               <label className="block font-sans text-[9px] uppercase tracking-widest text-bridal-charcoal/50 mb-2 group-focus-within:text-bridal-gold transition-colors">Additional Notes</label>
               <textarea 
                 rows={3}
                 className="w-full bg-transparent border-b border-bridal-charcoal/20 py-3 text-lg font-serif text-bridal-charcoal focus:outline-none focus:border-bridal-gold transition-colors placeholder:text-bridal-charcoal/20 resize-none hover:border-bridal-charcoal/40"
                 placeholder="Tell us about your event..."
                 value={formState.message}
                 onChange={(e) => setFormState({...formState, message: e.target.value})}
               />
            </div>

            {/* Submit Button */}
            <div className="contact-anim pt-4">
               <button type="submit" className="group flex items-center gap-4 px-10 py-4 bg-bridal-charcoal text-white transition-all duration-500 hover:bg-bridal-gold">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Request Appointment</span>
                  <MoveRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
               </button>
            </div>
          </form>

          {/* --- CONTACT DETAILS GRID --- */}
          <div className="contact-anim grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-bridal-charcoal/10 pt-12">
             <div className="space-y-6">
                <h3 className="font-serif text-2xl text-bridal-charcoal">The Atelier</h3>
                
                <div className="flex items-start gap-4 group">
                   <div className="p-3 bg-white border border-bridal-charcoal/5 rounded-full text-bridal-gold group-hover:bg-bridal-charcoal group-hover:text-white transition-colors duration-500">
                      <MapPin size={18} />
                   </div>
                   <div>
                      <span className="block font-sans text-[10px] uppercase tracking-widest text-bridal-charcoal/50 mb-1">Visit Us</span>
                      <p className="font-serif text-lg text-bridal-charcoal">564/A, Athurugiriya Road,<br/>Galle, Sri Lanka</p>
                   </div>
                </div>

                <div className="flex items-start gap-4 group">
                   <div className="p-3 bg-white border border-bridal-charcoal/5 rounded-full text-bridal-gold group-hover:bg-bridal-charcoal group-hover:text-white transition-colors duration-500">
                      <Clock size={18} />
                   </div>
                   <div>
                      <span className="block font-sans text-[10px] uppercase tracking-widest text-bridal-charcoal/50 mb-1">Hours</span>
                      <p className="font-serif text-lg text-bridal-charcoal">Tue - Sun: 09:00 - 19:00<br/>Mon: Closed</p>
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                <h3 className="font-serif text-2xl text-bridal-charcoal">Direct Line</h3>

                <div className="flex items-start gap-4 group">
                   <div className="p-3 bg-white border border-bridal-charcoal/5 rounded-full text-bridal-gold group-hover:bg-bridal-charcoal group-hover:text-white transition-colors duration-500">
                      <Phone size={18} />
                   </div>
                   <div>
                      <span className="block font-sans text-[10px] uppercase tracking-widest text-bridal-charcoal/50 mb-1">Call Us</span>
                      <a href="tel:+94112781525" className="font-serif text-lg text-bridal-charcoal hover:text-bridal-gold transition-colors">(+94) 11 278 1525</a>
                   </div>
                </div>

                <div className="flex items-start gap-4 group">
                   <div className="p-3 bg-white border border-bridal-charcoal/5 rounded-full text-bridal-gold group-hover:bg-bridal-charcoal group-hover:text-white transition-colors duration-500">
                      <Mail size={18} />
                   </div>
                   <div>
                      <span className="block font-sans text-[10px] uppercase tracking-widest text-bridal-charcoal/50 mb-1">Email Us</span>
                      <a href="mailto:hello@bonitha.co" className="font-serif text-lg text-bridal-charcoal hover:text-bridal-gold transition-colors">hello@bonitha.co</a>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </main>
  );
}