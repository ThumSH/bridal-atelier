import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-bridal-charcoal text-bridal-ivory flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <span className="font-sans text-xs uppercase tracking-[0.4em] text-bridal-sage mb-8 relative z-10">
         404 Error
      </span>
      
      <h1 className="font-serif text-6xl md:text-9xl mb-8 relative z-10 text-transparent bg-clip-text bg-linear-to-b from-white to-white/20">
         Lost Thread
      </h1>
      
      <p className="font-sans text-sm text-white/50 max-w-md text-center leading-loose mb-12 relative z-10 px-6">
         The page you are looking for has been unraveled. 
         Please return to the atelier to pick up the thread.
      </p>

      <Link href="/" className="relative z-10 group flex items-center gap-4 px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-bridal-charcoal transition-all duration-500">
         <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
         <span className="text-xs uppercase tracking-widest">Return Home</span>
      </Link>

      {/* Decorative */}
      <div className="absolute -bottom-20 -right-20 w-100 h-100 bg-bridal-sage/10 rounded-full blur-[100px]" />
    </div>
  );
}